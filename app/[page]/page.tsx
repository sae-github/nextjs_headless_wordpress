import { HomeContent } from '../components/app/Home'

const Home = ({ params }: { params: { page: string } }) => {
  return <HomeContent page={params.page} />
}

export default Home
