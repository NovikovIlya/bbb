import { TagOutlined } from '@ant-design/icons'
import { Button, Col, Input, Radio, Row, Typography } from 'antd'
import { RadioChangeEvent } from 'antd/lib'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../store'
import { addCard } from '../../store/reducers/LayoutsSlice'
import { jsxElements } from '../dnd/defaultElement'

export const ModalNav = () => {
	const { t } = useTranslation()
	const layouts = useAppSelector(state => state.Layout)
	const dispatch = useDispatch()

	const onChange = (e: RadioChangeEvent) => {
		console.log(e.target.value)
	}
	const role = useAppSelector(state => state.auth.user?.roles)
	if (!role) return <></>
	const isStudent = role[0].type === 'STUD'
	return (
		<Row>
			<Col span={24} className="mb-9">
				<Typography.Text
					className={`text-blue1f5 text-2xl font-bold leading-loose`}
				>
					{t('OurServices')}
				</Typography.Text>
			</Col>
			<Col span={20}>
				<Input.Search size="large" placeholder={t('SearchFavorite')} />
			</Col>
			<Col offset={1} span={3} className="flex justify-center items-center">
				<Button
					type="text"
					icon={<TagOutlined />}
					className={`text-blue1f5 text-base font-semibold leading-relaxed flex items-center justify-center`}
				>
					{t('Favorites')}
				</Button>
			</Col>
			<Col span={24} className="mt-8">
				<div
					className={clsx('radio mb-16 w-full h-full ', !isStudent && 'hidden')}
				>
					<Radio.Group
						onChange={onChange}
						defaultValue="monday"
						buttonStyle="solid"
						className="flex gap-1 justify-between h-9"
					>
						<Radio.Button
							className="rounded-full bg-transparent h-full flex items-center justify-center text-base w-60"
							value="monday"
						>
							{t('ToApplicant')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="tuesday"
						>
							{t('ToStudent')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="wednesday"
						>
							{t('Employee')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="thursday"
						>
							{t('ToTeacher')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="friday"
						>
							{t('ToWorker')}
						</Radio.Button>
						<Radio.Button
							className="rounded-full h-full flex items-center justify-center text-base bg-transparent w-60"
							value="saturday"
						>
							{t('ToSchool')}
						</Radio.Button>
					</Radio.Group>
				</div>
			</Col>
			{layouts.lg.length === jsxElements.length ? (
				<div className="text-3xl">Пока сервисов нет</div>
			) : (
				jsxElements.map(item => {
					const isLayout = !!layouts.lg.filter(el => el.i === item.index).length

					return (
						!isLayout && (
							<Col span={4} key={item.index} className="bg-white">
								<div
									onClick={() => dispatch(addCard(item.place))}
									className="h-28 cursor-pointer flex items-center justify-center hover:bg-[#65A1FA] hover:text-white"
								>
									{t(item.index.toString())}
								</div>
							</Col>
						)
					)
				})
			)}
		</Row>
	)
}