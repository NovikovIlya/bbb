import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../store'
import { setForm } from '../../../../store/creators/MainCreators'

export const Buttons = ({
	changeIsEmpty
}: {
	changeIsEmpty: (IsEmpty: boolean) => void
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const data = useAppSelector(state => state.Form)
	const { t } = useTranslation()
	const handleCancel = () => {
		navigate('/infoUser')
	}
	const handleOk = async () => {
		if (await IsOK()) {
			if (userRole === 'GUEST') navigate('/user')
			else navigate('/documents')
		}
	}
	const IsOK = async () => {
		const IsCorrectNS = [data.name, data.surName].some(el =>
			/^\p{L}+$/u.test(el)
		)

		const IsCorrectPatronymic =
			/^\p{L}+$/u.test(data.patronymic) || data.patronymic === ''

		const IsCorrectPhone =
			/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(data.phone)
		if (
			!IsCorrectNS ||
			!IsCorrectPatronymic ||
			!IsCorrectPhone ||
			data.birthDay === ''
		) {
			changeIsEmpty(true)
			return false
		}
		const response = await setForm(data, dispatch)
		if (response === 200) return true
		else {
			if (response === 403) {
				navigate('/')
			}
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
				<Button
					onClick={handleCancel}
					type="default"
					className="w-[200px] font-bold h-[50px] rounded-full border-[#3073D7] text-[#3073D7]"
				>
					{t('back')}
				</Button>
				<Button
					onClick={handleOk}
					type="primary"
					className="w-[200px] font-bold h-[50px] rounded-full"
				>
					{t('next')}
				</Button>
			</div>
			<Button
				onClick={handleSkip}
				type="text"
				className="rounded-full w-[200px] h-[50px] mt-8"
			>
				{t('fillLater')}
			</Button>
		</div>
	)
}
