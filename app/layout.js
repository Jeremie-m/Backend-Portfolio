// app/layout.js
export const metadata = {
  title: 'Portfolio',
  description: 'Mon portfolio de développeur',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
} 