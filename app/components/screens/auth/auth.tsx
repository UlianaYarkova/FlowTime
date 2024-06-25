import { useAuth } from '@/hooks/useAuth'
import { IAuthFormData } from '@/types/auth.interface'
import React, { FC, useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import {
	Keyboard,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import Button from '@/components/ui/Buttom'
import Loader from '@/components/ui/Loader'

import AuthFields from './AuthFields'
// novoe dlya 2 otcheta
const Auth: FC = () => {
	const [isReg, setIsReg] = useState(false)

	const { control, reset, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange',
	})

	const { setUser } = useAuth()

	const onSumbit: SubmitHandler<IAuthFormData> = data => {
		setUser({
			///предварительное решение без бекенда, так же во 2 отчет
			_id: '',
			...data,
		})
		reset()
	}

	const isLoading = false
	//скрытие клавиатуры кликом по экрану так же 2 отчет
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className='items-center justify-center flex-1'>
				<View className='w-3/4'>
					<Text className='text-white text-5xl font-bold text-center mb-5'>
						{isReg ? 'Sign up' : 'Sign in'}
					</Text>

					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} />

							<Button onPress={handleSubmit(onSumbit)}>Let's go</Button>

							<Pressable
								onPress={() => setIsReg(!isReg)}
								className='w-16 self-end'
							>
								<Text className='text-opacity-60 text-white text-base mt-3 text-right'>
									{isReg ? 'Login' : 'Register'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Auth
