import { getPayload } from 'payload';
import config from '@payload-config';
import { Project } from '@/payload-types';

export async function fetchProjects() {
  const payload = await getPayload({ config });

  let projects: Project[] = [];

  try {
    const { docs } = await payload.find({
      collection: 'projects',
      limit: 100,
      sort: 'createdAt',
    });
    if (docs && Array.isArray(docs)) {
      projects = docs;
    }

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}
