import { notFound } from 'next/navigation';
import { Program } from '@/payload-types';
import { fetchPayload } from '@/app/lib/payload/fetchPayload';
import OurProgramClientSide from './ClientSidePage';
import { fetchProjects } from '@/app/lib/payload/fetchProjects';

async function fetchProgram(slug: string): Promise<Program | null> {
  const data = await fetchPayload<Program>(`/api/programs?where[slug][equals]=${slug}&depth=2`);
  return data[0] || null;
}

export default async function OurProgram({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await fetchProgram(slug);
  const projects = await fetchProjects();

  if (!program) {
    return notFound();
  }

  return <OurProgramClientSide projects={projects} program={program} slug={slug} />;
}
