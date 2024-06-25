import { FC, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState(false)

	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<CountdownCircleTimer
					isPlaying={isPlaying}
					duration={65}
					colors={['#003931', '#5CEBD3', '#A5EBDF', '#FFFFFF']}
					colorsTime={[7, 5, 2, 0]}
					trailColor='#002621'
					onComplete={() => setIsPlaying(false)}
					size={320}
					strokeWidth={10}
				>
					{({ remainingTime }) => {
						let minutes = Math.floor(remainingTime / 60)
						minutes = minutes < 10 ? '0' + minutes : minutes
						let seconds = remainingTime % 60
						seconds = seconds < 10 ? '0' + seconds : seconds

						return (
							<Text className='mt-4 text-white text-7xl font-bold'>{`${minutes}:${seconds}`}</Text>
						)
					}}
				</CountdownCircleTimer>
				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(7)).map((_, index) => (
						<View className='flex-row items-center' key={`point${index}`}>
							<View className='w-5 h-5 bg-primary rounded-full' />
							{index + 1 != 7 && <View className='w-7 h-0.5 bg-primary' />}
						</View>
					))}
				</View>
			</View>
			<Pressable
				onPress={() => setIsPlaying(!isPlaying)}
				className={cn(
					'mt-10 self-center bg-primary w-[60px] h-[60px] items-center justify-center rounded-full',
					{
						'pl-1.5': !isPlaying,
					},
				)}
				style={{
					shadowColor: AppConstants.primary,
					shadowOffset: {
						width: 0,
						height: 3,
					},
					shadowOpacity: 0.76,
					shadowRadius: 10,

					elevation: 20,
				}}
			>
				<Foundation
					name={isPlaying ? 'pause' : 'play'}
					color='white'
					size={35}
				/>
			</Pressable>
		</View>
	)
}

export default Timer
