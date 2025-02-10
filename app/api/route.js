export async function GET() {
  return Response.json({
    name: 'API Portfolio',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      blog: '/api/blog',
      technologies: '/api/technologies',
      auth: '/api/auth'
    },
    documentation: 'Documentation à venir'
  })
} 