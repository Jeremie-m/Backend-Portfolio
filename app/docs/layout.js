export default function DocsLayout({ children }) {
  return (
    <div className="docs-layout">
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            margin: 0;
            padding: 0;
            background: #f8f9fa;
          }
          .docs-layout {
            min-height: 100vh;
          }
        `
      }} />
      {children}
    </div>
  );
} 