import { Metadata } from 'next'
import '../style/global.css'

export const metadata: Metadata = {
  title: 'Sae/note',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  )
}
