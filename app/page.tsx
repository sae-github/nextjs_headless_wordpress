import { Metadata } from 'next'
import { HomeContent } from '@/app/components/app/Home'

export const metadata: Metadata = {
  title: 'Sae/Blog',
  description: '駆け出しフロントエンドエンジニアの積み上げブログです',
}

const Home = () => {
  return <HomeContent />
}

export default Home
