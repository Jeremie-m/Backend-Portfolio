import { NextResponse } from 'next/server';
import YAML from 'yamljs';
import path from 'path';

export async function GET() {
  try {
    // Charger le fichier YAML
    const swaggerDoc = YAML.load(path.join(process.cwd(), 'swagger.yaml'));
    
    return NextResponse.json(swaggerDoc);
  } catch (error) {
    console.error('Erreur lors du chargement de la documentation Swagger:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement de la documentation' },
      { status: 500 }
    );
  }
} 