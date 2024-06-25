import Layout from '@/components/ui/layout/Layout'
import { FC } from 'react'
import { Text, View } from 'react-native'
import Timer from './timer/Timer'

const Home: FC = () => {
    return (
        <Layout title='Timer'>
        <Timer />
        </Layout>
    )
}

export default Home