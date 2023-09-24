import { Box, styled } from '@kuma-ui/core'
import { Metadata } from 'next'
import { Zen_Kaku_Gothic_New } from 'next/font/google'
import { AdminsArea } from './components/common/AdminsArea'
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
        url: '/ogp-image.png',
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
        url: '/ogp-image.png',
        width: 80,
        height: 80,
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className={kakuGothic.className}>
      <Body>
        <Header />
        <Box display='flex' flexDirection={['column', 'column', 'row']}>
          <Main>{children}</Main>
          <Aside>
            <AdminsArea />
          </Aside>
        </Box>
      </Body>
    </html>
  )
}

const Body = styled('body')`
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: md) {
    padding: 0 2rem;
  }
`

const Main = styled('main')`
  padding-bottom: 2rem;
  flex: 1;
  width: 100%;
  @media (min-width: md) {
    width: 80%;
  }
`

const Aside = styled('aside')`
  width: 100%;
  padding-bottom: 2rem;
  @media (min-width: md) {
    width: 18%;
    min-width: 160px;
  }
`
