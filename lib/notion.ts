import { Client } from '@notionhq/client';
import { Project, NotionProject } from '@/types/project';
import { slugify } from '@/lib/utils';

const notion = process.env.NOTION_TOKEN ? new Client({
  auth: process.env.NOTION_TOKEN,
}) : null;

export async function getProjects(): Promise<Project[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_PROJECTS_DB_ID) {
    console.warn('Notion environment variables not configured. Using empty project list.');
    return [];
  }

  if (!notion) {
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECTS_DB_ID!,
      sorts: [
        {
          property: 'Featured',
          direction: 'descending',
        },
        {
          property: 'Date Range',
          direction: 'descending',
        },
      ],
    });

    const projects: Project[] = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        projectName: getProperty(properties, 'Project Name', 'title'),
        oneLiner: getProperty(properties, 'Short Description', 'rich_text') || getProperty(properties, 'One-liner', 'rich_text'),
        status: getProperty(properties, 'Status', 'select'),
        role: getProperty(properties, 'Role', 'multi_select').join(', ') || getProperty(properties, 'Role', 'rich_text'),
        category: getProperty(properties, 'Category', 'select'),
        techSkills: getProperty(properties, 'Tech/Skills', 'multi_select').length > 0 
          ? getProperty(properties, 'Tech/Skills', 'multi_select')
          : getProperty(properties, 'Tech Stack', 'rich_text').split(',').map(tech => tech.trim()).filter(Boolean),
        dateRange: getProperty(properties, 'Date Range', 'date') || getProperty(properties, 'Date Range', 'rich_text') || 'Date TBD',
        featured: getProperty(properties, 'Featured', 'checkbox'),
        demoLink: getProperty(properties, 'Demo Link', 'url'),
        repoLink: getProperty(properties, 'Repo Link', 'url') || getProperty(properties, 'GitHub Repo', 'rich_text'),
        impact: getProperty(properties, 'Impact', 'rich_text').split('\n').filter(Boolean),
        responsibilities: getProperty(properties, 'Responsibilities', 'rich_text').split('\n').filter(Boolean),
        coverPath: getProperty(properties, 'CoverPath', 'rich_text'),
        slug: slugify(getProperty(properties, 'Project Name', 'title')),
      };
    });

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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_PROJECTS_DB_ID) {
    return null;
  }

  const projects = await getProjects();
  return projects.find(project => project.slug === slug) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_PROJECTS_DB_ID) {
    return [];
  }

  const projects = await getProjects();
  return projects.filter(project => project.featured);
}

function getProperty(properties: any, name: string, type: string): any {
  const prop = properties[name];
  if (!prop) return getDefaultValue(type);

  switch (type) {
    case 'title':
      return prop.title?.[0]?.plain_text || '';
    case 'rich_text':
      return prop.rich_text?.map((text: any) => text.plain_text).join('') || '';
    case 'select':
      return prop.select?.name || '';
    case 'multi_select':
      return prop.multi_select?.map((item: any) => item.name) || [];
    case 'checkbox':
      return prop.checkbox || false;
    case 'url':
      return prop.url || '';
    case 'date':
      if (prop.date?.start) {
        const startDate = new Date(prop.date.start);
        if (prop.date.end) {
          const endDate = new Date(prop.date.end);
          return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
        }
        return startDate.toLocaleDateString();
      }
      return '';
    default:
      return '';
  }
}

function getDefaultValue(type: string): any {
  switch (type) {
    case 'multi_select':
      return [];
    case 'checkbox':
      return false;
    default:
      return '';
  }
}