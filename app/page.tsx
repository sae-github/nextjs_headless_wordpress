import { Box, styled } from '@kuma-ui/core'
import { AdminsArea } from './components/common/AdminsArea'
import { HomeContent } from '@/app/components/app/Home'

const Home = () => (
  <Box display='flex' flexDirection={['column', 'column', 'row']}>
    <Main>
      <HomeContent page={'1'} />
    </Main>
    <Aside>
      <AdminsArea />
    </Aside>
  </Box>
)

export default Home

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
