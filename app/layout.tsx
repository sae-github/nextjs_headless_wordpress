import { styled } from '@kuma-ui/core'
import { Metadata } from 'next'
import { Zen_Kaku_Gothic_New } from 'next/font/google'
import { Header } from './components/common/Header'

const kakuGothic = Zen_Kaku_Gothic_New({
  weight: '400',
  subsets: ['latin'],
})

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
    <Html lang='ja' className={kakuGothic.className}>
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
  @media (min-width: md) {
    padding: 0 2rem;
  }
`
