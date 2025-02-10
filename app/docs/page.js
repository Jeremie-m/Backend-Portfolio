'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// Import dynamique de SwaggerUI pour éviter les problèmes de SSR
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  return (
    <div className="swagger-container">
      <style dangerouslySetInnerHTML={{
        __html: `
          .swagger-ui .topbar {
            display: none;
          }
          .swagger-container {
            margin: 20px;
            padding: 20px;
            border-radius: 4px;
            background: white;
          }
        `
      }} />
      <SwaggerUI url="/api/docs" docExpansion="list" />
    </div>
  );
} 