import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../store'

export const Buttons = ({
	setError
}: {
	setError: (value: boolean) => void
}) => {
	const navigate = useNavigate()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const data = useAppSelector(state => state.Form)
	const { t } = useTranslation()
	const handleCancel = () => {
		navigate('/infoUser')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			if (userRole === 'GUEST') navigate('/user')
			else navigate('/documents')
		} else {
			setError(true)
		}
	}
	const saveInStore = () => {
		if (
			[
				data.birthDay,
				data.country,
				data.gender,
				data.name,
				data.phone,
				data.surName
			].some(el => el === '')
		) {
			setError(true)
			return true
		} else return false
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