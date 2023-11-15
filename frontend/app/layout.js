import '../styledComponents/styled.css'

export const metadata = {
  title: 'Clube do Livro Fantástico',
  description: 'A cada leitura um mundo novo!',
}

export default function RootLayout({ children }) {
 return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
