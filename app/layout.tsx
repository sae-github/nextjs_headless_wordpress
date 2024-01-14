import { styled } from '@kuma-ui/core'
import { Metadata } from 'next'
import { Header } from './components/common/Header'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
  title: 'Sae/note',
  description: '',
  icons: './favicon.ico',
  openGraph: {
    images: [
      {
        url: '/ogp.png',
        width: 80,
        height: 80,
      },
    ],
    title: 'Sae/note',
  },
  twitter: {
    title: 'Sae/note',
    description: '',
    card: 'summary',
    images: [
      {
        url: '/ogp.png',
        width: 80,
        height: 80,
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Html lang='ja'>
      <Body>
        <Header />
        {children}
      </Body>
    </Html>
  )
}

const Html = styled('html')`
  scroll-behavior: smooth;
  scroll-padding-top: 40px;
`

const Body = styled('body')`
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1rem;
  font-family: 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'MS Pゴシック',
    'MS PGothic', sans-serif;
  @media (min-width: md) {
    padding: 0 2rem;
  }
`
