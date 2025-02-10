import { projectController } from '@/controllers/projectController';

export async function GET(request) {
  try {
    // Récupération des projets via le controller
    const result = await projectController.getAllProjects();
    
    if (!result.success) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json(result.data);
  } catch (error) {
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const result = await projectController.createProject(data);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json(result.data, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 