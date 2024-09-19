import { useDispatch } from 'react-redux'

import { EmpReadyIcon } from '../../../../assets/svg/EmpReadyIcon'
import { useAppSelector } from '../../../../store'
import { setStage } from '../../../../store/reducers/CurrentEmploymentStage'

export const NavPanelElement = (props: { id: number; text: string }) => {
	const dispatch = useDispatch()
	const { stages } = useAppSelector(state => state.employmentProgress)
	const { currentStage } = useAppSelector(state => state.currentEmploymentStage)
	const progress = stages.find(stage => stage.id === props.id)

	return (
		<div
			className="flex flex-col items-center gap-[12px] h-full z-[3] w-[10%] font-content-font font-bold text-[14px]/[14px]"
			onClick={() => {
				dispatch(setStage(props.id))
			}}
		>
			{progress?.status === 'FILLING' ? (
				<>
					<div
						className={`shrink-0 h-[28px] w-[28px] rounded-[32px] border-solid border-2 ${
							currentStage === props.id
								? 'text-[#3073D7] border-[#3073D7]'
								: 'text-[#757778] border-[#757778]'
						} flex justify-center items-center bg-[#F5F8FB]`}
					>
						{props.id}
					</div>
					<div
						className={`${
							currentStage === props.id ? 'text-[#3073D7]' : 'text-[#757778]'
						}  text-center`}
					>
						{props.text}
					</div>
				</>
			) : (
				<>
					<EmpReadyIcon />
					<div className="text-[#3073D7] text-center">{props.text}</div>
				</>
			)}
		</div>
	)
}