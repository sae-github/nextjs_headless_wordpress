import { Box, styled } from '@kuma-ui/core'
import { AdminsArea } from '../components/common/AdminsArea'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display='flex' flexDirection={['column', 'column', 'row']}>
      <Main>{children}</Main>
      <Aside>
        <AdminsArea />
      </Aside>
    </Box>
  )
}

const Main = styled('main')`
  padding-bottom: 2rem;
  flex: 1;
  width: 100%;
  @media (min-width: md) {
    width: calc(100% - 300px);
  }
`

const Aside = styled('aside')`
  width: 100%;
  padding-bottom: 2rem;
  @media (min-width: md) {
    width: 300px;
  }
`
