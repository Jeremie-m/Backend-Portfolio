import { blogController } from '@/controllers/blogController';

export async function GET(request) {
  try {
    // Vérifier si on demande un article spécifique
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const result = await blogController.getPostById(id);
      if (!result.success) {
        return Response.json({ error: result.error }, { status: 400 });
      }
      return Response.json(result.data);
    }

    // Sinon, retourner tous les articles
    const result = await blogController.getAllPosts();
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
    const result = await blogController.createPost(data);

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

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await blogController.updatePost(id, data);

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

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return Response.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const result = await blogController.deletePost(id);

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