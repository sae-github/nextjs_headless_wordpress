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
  title: 'Sae/note',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className={kakuGothic.className}>
      <Body>
        <Header />
        <Box display='flex'>
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
  padding: 0 2rem;
`

const Main = styled('main')`
  padding-bottom: 2rem;
  flex: 1;
  width: 80%;
`

const Aside = styled('aside')`
  width: 18%;
`
