import { Input } from 'antd'
import { useEffect, useState } from 'react'

import {
	LogoutSvg,
	MessageSvg,
	NotificationSvg,
	SettingSvg
} from '../../assets/svg'
import { LogoIasSvg } from '../../assets/svg/LogoIasSvg'
import { PersonSvg } from '../../assets/svg/PersonSvg'

import './Header.scss'

export const Header = () => {
	return (
		<div className="h-[8vh] my-[1vh] w-full flex items-center px-[3vh] justify-between font-sans">
			<div className="flex wrapper items-center gap-[8vh] max-lg:gap-[4vh]">
				<div>
					<LogoIasSvg />
				</div>
				<div className="search flex items-center max-md:hidden">
					<Input placeholder="Поиск" className="shadow" />
				</div>
			</div>
			<div>
				<div className="flex gap-[1vh] items-center">
					<PersonSvg />
					<div className="flex flex-col h-full justify-between max-sm:hidden">
						<div className="text-[1.5vh] font-bold">Мистер Бин Бинович</div>
						<span className="text-[1vh]">Пользователь</span>
					</div>
					<div className="flex gap-[1vh] ml-[5vh] max-sm:ml-[1vh] max-[321px]:hidden">
						<SettingSvg />
						<MessageSvg />
						<NotificationSvg />
						<LogoutSvg />
					</div>
				</div>
			</div>
		</div>
	)
}
