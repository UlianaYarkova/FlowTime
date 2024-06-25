import Button from '@/components/ui/Buttom'
import Layout from '@/components/ui/layout/Layout'
import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import { Text, View } from 'react-native'

const Profile: FC = () => {
	const { setUser } = useAuth()

	return (
		<Layout title='Profile'>
			<Button onPress={() => setUser(null)}> Logout </Button>
		</Layout>
	)
}

export default Profile
