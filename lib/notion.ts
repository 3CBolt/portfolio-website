import { z } from 'zod';
import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  status: z.enum(['Shipped','Live','Prototype','Archived']).default('Prototype'),
  tags: z.array(z.string()).default([]),
  role: z.string().optional(),
  dates: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }).default({}),
  impact: z.string().optional(),
  links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  coverImage: z.string().url().optional(),
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

  const title = get('Title')?.title?.[0]?.plain_text ?? '';
  const summary = get('Summary')?.rich_text?.[0]?.plain_text ?? '';
  const status = get('Status')?.select?.name ?? 'Prototype';
  const tags = (get('Tags')?.multi_select ?? []).map((t: any) => t.name);
  const role = get('Role')?.rich_text?.[0]?.plain_text ?? undefined;
  const start = get('Dates')?.date?.start ?? undefined;
  const end = get('Dates')?.date?.end ?? undefined;
  const impact = get('Impact')?.rich_text?.[0]?.plain_text ?? undefined;
  const coverImage =
    get('CoverImage')?.files?.[0]?.external?.url ??
    get('CoverImage')?.files?.[0]?.file?.url ??
    undefined;
  const caseStudyUrl = get('CaseStudyURL')?.url ?? undefined;
  const techStack = (get('TechStack')?.multi_select ?? []).map((t: any) => t.name);
  const metrics = (get('Metrics')?.rich_text ?? []).map((r: any) => r.plain_text);
  const responsibilities = (get('Responsibilities')?.rich_text ?? []).map((r: any) => r.plain_text);
  const outcome = get('Outcome')?.rich_text?.[0]?.plain_text ?? undefined;
  const learnings = (get('Learnings')?.rich_text ?? []).map((r: any) => r.plain_text);

  const linksRel = get('Links')?.relations ?? [];
  const linksUrl = get('Links')?.rich_text ?? [];
  const links =
    linksUrl.length > 0
      ? linksUrl.map((r: any) => ({ label: r.plain_text || 'Link', url: r.href || r.plain_text }))
      : linksRel.map((l: any) => ({ label: 'Link', url: l.url || '#' }));

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
      filter: {
        or: [
          { property: 'Status', select: { equals: 'Shipped' } },
          { property: 'Status', select: { equals: 'Live' } },
        ],
      },
      sorts: [
        { property: 'Date Range', direction: 'descending' },
        { property: 'Impact', direction: 'descending' },
      ],
      page_size: 12,
    });

    const projects = (response.results as PageObjectResponse[])
      .map(projectFromNotion)
      .filter(p => !!p.title && !!p.summary);

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
  return projects.filter(project => project.status === 'Shipped' || project.status === 'Live');
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(project => project.id === slug) || null;
}