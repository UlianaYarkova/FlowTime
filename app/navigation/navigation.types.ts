import { ComponentType } from 'react'
//типрут
export type TypeRootStackParamList = {
	Auth: undefined
	Home: undefined
	Settings: undefined
	Profile: undefined
	Statistics: undefined
}
//интерфейс
export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
}
