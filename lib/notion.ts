import { z } from 'zod';
import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  status: z.enum(['Complete','Ideation','Shipped']).default('Ideation'),
  tags: z.array(z.string()).default([]),
  role: z.string().optional(),
  dates: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }).default({}),
  impact: z.string().optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  coverImage: z.string().optional(),
  caseStudyUrl: z.string().url().optional(),
  techStack: z.array(z.string()).default([]),
  metrics: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  outcome: z.string().optional(),
  learnings: z.array(z.string()).optional(),
});
export type Project = z.infer<typeof projectSchema>;

const notion = new Client({ auth: process.env.NOTION_TOKEN! });
const DB_ID = process.env.NOTION_PROJECTS_DB_ID!;

export function projectFromNotion(page: PageObjectResponse): Project {
  const props: any = (page as any).properties ?? {};
  const get = (name: string) => props[name];
  

  const title = get('Project Name')?.title?.[0]?.plain_text ?? '';
  const summary = get('Short Description')?.rich_text?.[0]?.plain_text ?? '';
  const status = get('Status')?.select?.name ?? 'Ideation';
  const tags = (get('Tech Stack')?.multi_select ?? []).map((t: any) => t.name);
  const role = (get('Role')?.multi_select ?? []).map((r: any) => r.name).join(', ') || undefined;
  const start = get('Date Range')?.date?.start ?? undefined;
  const end = get('Date Range')?.date?.end ?? undefined;
  const impact = get('Impact')?.rich_text?.[0]?.plain_text ?? undefined;
  const coverImage =
    get('CoverPath')?.rich_text?.[0]?.plain_text ??
    get('CoverImage')?.files?.[0]?.external?.url ??
    get('CoverImage')?.files?.[0]?.file?.url ??
    undefined;
  const caseStudyUrl = get('CaseStudyURL')?.url ?? undefined;
  const techStack = (get('Tech Stack')?.multi_select ?? []).map((t: any) => t.name);
  const metrics = (get('Metrics')?.rich_text ?? []).map((r: any) => r.plain_text);
  const responsibilities = (get('Responsibilities')?.rich_text ?? []).map((r: any) => r.plain_text);
  const outcome = get('Outcome')?.rich_text?.[0]?.plain_text ?? undefined;
  const learnings = (get('Learnings')?.rich_text ?? []).map((r: any) => r.plain_text);

  const demoLink = get('Demo Link')?.url ?? '';
  const repoLink = get('Repo Link')?.url ?? get('GitHub Repo')?.rich_text?.[0]?.plain_text ?? '';
  const links = [];
  if (demoLink) links.push({ label: 'Live Demo', url: demoLink });
  if (repoLink) links.push({ label: 'View Code', url: repoLink });

  const data = {
    id: page.id,
    title,
    summary,
    status,
    tags,
    role,
    dates: { start, end },
    impact,
    links,
    coverImage,
    caseStudyUrl,
    techStack,
    metrics: metrics?.length ? metrics : undefined,
    responsibilities: responsibilities?.length ? responsibilities : undefined,
    outcome,
    learnings: learnings?.length ? learnings : undefined,
  };

  return projectSchema.parse(data);
}

export async function getProjects(): Promise<Project[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_PROJECTS_DB_ID) {
    console.warn('Notion environment variables not configured. Using empty project list.');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DB_ID,
      sorts: [
        { property: 'Date Range', direction: 'descending' },
      ],
      page_size: 12,
    });

    const projects = (response.results as PageObjectResponse[])
      .map((page, index) => {
        try {
          return projectFromNotion(page);
        } catch (error) {
          console.warn(`Error processing project ${index}:`, error);
          return null;
        }
      })
      .filter((p): p is Project => p !== null && !!p.title && !!p.summary);

    return projects;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Could not find database')) {
        console.warn('Notion database not found or not shared with integration. Please check your NOTION_PROJECTS_DB_ID and ensure the integration has access to the database.');
      } else if (error.message.includes('Unauthorized')) {
        console.warn('Notion integration unauthorized. Please check your NOTION_TOKEN.');
      } else {
        console.warn('Error fetching projects from Notion:', error.message);
      }
    } else {
      console.warn('Unknown error fetching projects from Notion');
    }
    return [];
  }
}

// Legacy compatibility functions
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.status === 'Complete' || project.status === 'Shipped');
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(project => project.id === slug) || null;
}