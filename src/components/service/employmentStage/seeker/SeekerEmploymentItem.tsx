import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useGetChatIdByRespondIdQuery } from '../../../../store/api/serviceApi'
import {
	closeChat,
	openChat
} from '../../../../store/reducers/ChatRespondStatusSlice'
import { setRespondId } from '../../../../store/reducers/CurrentRespondIdSlice'
import { setCurrentVacancyId } from '../../../../store/reducers/CurrentVacancyIdSlice'
import { setChatId } from '../../../../store/reducers/chatIdSlice'
import { RespondItemType, respondStatus } from '../../../../store/reducers/type'

export const SeekerEmploymentItem = (props: RespondItemType) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {
		data: chatId = {
			id: 0,
			respondInfo: {},
			unreadCount: 0,
			lastMessageDate: ''
		},
		isLoading: isChatIdLoading
	} = useGetChatIdByRespondIdQuery({
		chatId: props.id,
		role: 'SEEKER'
	})

	const handleNavigate = (url: string) => {
		if (props.status) {
			if (
				props.status === respondStatus[respondStatus.INVITATION] ||
				props.status === respondStatus[respondStatus.EMPLOYMENT_REQUEST] ||
				props.status === respondStatus[respondStatus.EMPLOYMENT]
			) {
				dispatch(openChat())
			} else {
				dispatch(closeChat())
			}
		} else {
			dispatch(openChat())
		}
		dispatch(setChatId(chatId.id))
		dispatch(setRespondId(props.id))
		dispatch(setCurrentVacancyId(props.vacancyId))
		navigate(url)
	}

	return (
		<>
			<div className="w-full mb-[12px] flex items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p className="w-[30%]">{props.name}</p>
				{props.employmentStageStatus === 'FILLING' ? (
					<p className="ml-[10%]">Прохождение</p>
				) : (
					<p className="ml-[10%]">Проверка</p>
				)}
				<div className="flex gap-[12px] ml-auto">
					<Button
						className="ml-[5%] rounded-[54px] font-content-font font-normal text-[16px]/[16px]"
						type="primary"
						onClick={() => {
							navigate(
								`/services/myresponds/employment/stages/${props.vacancyId}/${props.id}`
							)
						}}
					>
						Пройти этапы
					</Button>
					<Button
						onClick={() => {
							handleNavigate(`/services/myresponds/chat/id/${chatId.id}`)
						}}
						className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
					>
						Перейти в чат
					</Button>
				</div>
			</div>
		</>
	)
}
