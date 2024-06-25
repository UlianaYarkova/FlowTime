import { AppConstants } from '@/app.constants'
import { FC } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const Loader: FC = () => {
	return <ActivityIndicator color={AppConstants.primary} size='large' />
}

export default Loader
