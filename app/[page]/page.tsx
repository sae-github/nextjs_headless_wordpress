import { HomeContent } from '../components/app/Home'

const Home = ({ params }: { params: { page: string } }) => <HomeContent page={params.page} />

export default Home
