import { Box, styled } from '@kuma-ui/core'
import { Posts } from './_components/Posts'
import { AdminsArea } from './_components/common/AdminsArea'
const Home = () => (
  <Box display='flex' flexDirection={['column', 'column', 'row']}>
    <Main>
      <Posts page={'1'} />
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
    width: calc(100% - 280x);
  }
`

const Aside = styled('aside')`
  width: 100%;
  padding-bottom: 2rem;
  @media (min-width: md) {
    width: 300px;
  }
`
