import { FC, useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { AppConstants } from '@/app.constants'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from './timer.inteface'

const flowDuration = 5
const sessionCount = 7
const breakDuration = 1 * 60

const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)
	const [currentSession, setCurrentSession] = useState(1)
	const [key, setKey] = useState(0)

	useEffect(() => {
		if (isPlaying && status === EnumStatus.REST) {
			setKey(prev => prev + 1)
		}
	}, [isPlaying])

	const isAllSessionComplete = currentSession === sessionCount

	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<Text className='text-center text-7xl pt-1.5 mb-10'>
					{status === EnumStatus.WORK ? '🔥' : '😋'}
				</Text>

				<CountdownCircleTimer
					key={key}
					isPlaying={isPlaying}
					duration={flowDuration}
					colors={['#003931', '#5CEBD3', '#A5EBDF']}
					colorsTime={[flowDuration, 0]}
					trailColor='#002621'
					onComplete={() => {
						setIsPlaying(false)
						setCurrentSession(prev => prev + 1)
						setStatus(EnumStatus.REST)

						if (isAllSessionComplete) {
							setStatus(EnumStatus.COMPLETED)
						}
					}}
					size={320}
					strokeWidth={10}
					onUpdate={remainingTime => {
						if (!!remainingTime) setStatus(EnumStatus.WORK)
					}}
				>
					{({ remainingTime }) => {
						let minutes = Math.floor(remainingTime / 60)
						let seconds = remainingTime % 60

						if (status === EnumStatus.REST) {
							minutes = Math.floor(flowDuration / 60)
							seconds = flowDuration % 60
						}

						minutes = minutes < 10 ? '0' + minutes : minutes
						seconds = seconds < 10 ? '0' + seconds : seconds

						return (
							<View className='mt-5'>
								<Text className='text-white text-6xl font-semibold'>{`${minutes}:${seconds}`}</Text>
								<Text className='text-center text-2xl text-white mt-0.5'>
									{status}
								</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>
				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point${index}`}>
							<View
								className={cn(
									'w-5 h-5 rounded-full border-[3px] ',

									index + 1 === currentSession
										? 'border-primary bg-transparent'
										: 'border-transparent bg-[#2B3B38]',
									{
										'bg-primary opacity-75':
											index + 1 <= currentSession &&
											index + 1 != currentSession,
									},
								)}
							/>
							{index + 1 != sessionCount && (
								<View
									className={cn('w-7 h-0.5 bg-[#2B3B38]', {
										'bg-primary opacity-75': index + 2 <= currentSession,
									})}
								/>
							)}
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
