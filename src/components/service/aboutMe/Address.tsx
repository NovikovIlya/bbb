import { Button, Input, Radio, Select, Space, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { RootState, useAppSelector } from '../../../store'
import {
	getAbUsAddress,
	putAbUsAddress
} from '../../../store/creators/MainCreators'
import {
	allData,
	apartment,
	city,
	country,
	house,
	index,
	street
} from '../../../store/reducers/FormReducers/AddressReducer'
import { addCountries } from '../../../store/reducers/FormReducers/CountriesEducationReducer'
import { useGetCountriesQuery } from '../../../store/slice/countrySlice'

export const Address = () => {
	const { t, i18n } = useTranslation()
	const [value, setValue] = useState(0)
	const [SkipCountriesQuery, changeQuerySkip] = useState<boolean>(true)
	const [IsError, setError] = useState<boolean>(false)
	const role = useAppSelector(
		state => state.Profile.profileData.CurrentData?.roles
	)
	const registrationAddressData = useAppSelector(
		(state: RootState) => state.Address.registrationAddress
	)
	const residenceAddressData = useAppSelector(
		(state: RootState) => state.Address.residenceAddress
	)
	const countryStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.countries
	)
	const dispatch = useDispatch()

	const { data: countries } = useGetCountriesQuery(i18n.language, {
		skip: SkipCountriesQuery
	})

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		if (!countryStorage) changeQuerySkip(false)
	}, [countryStorage])

	useEffect(() => {
		if (countries) {
			dispatch(addCountries(countries))
			changeQuerySkip(true)
		}
	}, [countries])

	const onChange = (e: RadioChangeEvent) => {
		if (e.target.value !== 0)
			dispatch(
				allData({
					registrationAddress: registrationAddressData,
					residenceAddress: {
						countryId: 1,
						city: null,
						street: null,
						house: null,
						apartment: null,
						index: null
					}
				})
			)
		if (e.target.value === 0)
			dispatch(
				allData({
					registrationAddress: registrationAddressData,
					residenceAddress: null
				})
			)
		setValue(e.target.value)
	}

	const getData = async () => {
		const response = await getAbUsAddress(dispatch)
		if (response !== null) {
			if (response.residenceAddress) {
				setValue(1)
			}
			dispatch(allData(response))
		}
	}

	const setChanges = async () => {
		/*
		const IsBadStringRegistration = [
			registrationAddressData.city,
			registrationAddressData.street
		].some(el => !el || (el && !/^[\p{L}]+$/u.test(el)))
		const IsBadStringResidence = !residenceAddressData
			? false
			: [residenceAddressData.city, residenceAddressData.street].some(
					el => el && !/^[\p{L}]+$/u.test(el)
			  )
		const IsBadNumberRegistration = [
			registrationAddressData.apartment,
			registrationAddressData.house
		].some(el => !el || (el && !/^[0-9]+$/u.test(el)))
		const IsBadNumberResidence = !residenceAddressData
			? false
			: [residenceAddressData.apartment, residenceAddressData.house].some(
					el => el && /^[0-9]+$/u.test(el)
			  )

		const IsBadIndexRegistration = [registrationAddressData.index].some(
			el => !el || (el && !/^[0-9]{5,6}$/.test(el))
		)

		const IsBadIndexResidence = !residenceAddressData
			? false
			: [residenceAddressData.index].some(el => el && !/^[0-9]{5,6}$/.test(el))

		if (
			IsBadStringRegistration ||
			IsBadStringResidence ||
			IsBadNumberResidence ||
			IsBadNumberRegistration ||
			IsBadIndexRegistration ||
			IsBadIndexResidence
		) {
			setError(true)
		} else {
		}
			*/
		const status = await putAbUsAddress(
			{
				registrationAddress: registrationAddressData,
				residenceAddress:
					value === 0
						? registrationAddressData
						: !residenceAddressData
						? null
						: residenceAddressData
			},
			dispatch
		)
		if (status === 403) {
			setError(true)
		} else {
			setError(false)
		}
	}
	if (!role) return <></>
	const isStudent = role[0].type === 'STUD'

	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Space direction="vertical" size={'small'}>
					<Typography.Title
						level={3}
						className="text-black text-2xl font-bold leading-normal"
					>
						{t('adress')}
					</Typography.Title>
					<Typography.Text ellipsis>{t('FillPassport')}</Typography.Text>
				</Space>

				<Typography.Text
					className="text-black text-sm font-bold leading-[18px]"
					ellipsis
				>
					{t('PlaceResidence')}
				</Typography.Text>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Country')}</Typography.Text>
					<Select
						disabled={isStudent}
						placeholder={t('citizen')}
						size="large"
						className="w-[624px] shadow rounded-lg"
						value={registrationAddressData.countryId}
						onChange={e =>
							dispatch(country({ target: 'registrationAddress', country: e }))
						}
						options={
							!countryStorage
								? []
								: countryStorage.map(el => ({
										value: el.id,
										label: el.shortName
								  }))
						}
					/>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('City')}</Typography.Text>
					<Input
						disabled={isStudent}
						placeholder={t('Kazan')}
						size="large"
						maxLength={200}
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.city &&
								!/^[\p{L}]+$/u.test(registrationAddressData.city) &&
								'border-rose-500'
						)}
						value={
							!registrationAddressData.city ? '' : registrationAddressData.city
						}
						onChange={e =>
							dispatch(
								city({ target: 'registrationAddress', city: e.target.value })
							)
						}
					/>
					{IsError &&
						registrationAddressData.city &&
						!/^[\p{L}]+$/u.test(registrationAddressData.city) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Street')}</Typography.Text>
					<Input
						disabled={isStudent}
						maxLength={200}
						size="large"
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.street &&
								!/^[\p{L}]+$/u.test(registrationAddressData.street) &&
								'border-rose-500'
						)}
						value={
							!registrationAddressData.street
								? ''
								: registrationAddressData.street
						}
						onChange={e =>
							dispatch(
								street({
									target: 'registrationAddress',
									street: e.target.value
								})
							)
						}
					/>
					{IsError &&
						registrationAddressData.street &&
						!/^[\p{L}]+$/u.test(registrationAddressData.street) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('House')}</Typography.Text>
					<Input
						disabled={isStudent}
						placeholder="39"
						maxLength={5}
						size="large"
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.house &&
								!/^[0-9]+$/.test(registrationAddressData.house) &&
								'border-rose-500'
						)}
						value={
							!registrationAddressData.house
								? ''
								: registrationAddressData.house
						}
						onChange={e =>
							dispatch(
								house({ target: 'registrationAddress', house: e.target.value })
							)
						}
					/>
					{IsError &&
						registrationAddressData.house &&
						!/^[0-9]+$/.test(registrationAddressData.house) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Flat')}</Typography.Text>
					<Input
						disabled={isStudent}
						placeholder="88"
						maxLength={5}
						size="large"
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.apartment &&
								!/^[0-9]+$/.test(registrationAddressData.apartment) &&
								'border-rose-500'
						)}
						onChange={e =>
							dispatch(
								apartment({
									target: 'registrationAddress',
									apartment: e.target.value
								})
							)
						}
						value={
							!registrationAddressData.apartment
								? ''
								: registrationAddressData.apartment
						}
					/>
					{IsError &&
						registrationAddressData.apartment &&
						!/^[0-9]+$/.test(registrationAddressData.apartment) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('Index')}</Typography.Text>
					<Input
						disabled={isStudent}
						placeholder="456836"
						size="large"
						className={clsx(
							'w-[624px] shadow',
							IsError &&
								registrationAddressData.index &&
								!/^[0-9]{5,6}$/.test(registrationAddressData.index) &&
								'border-rose-500'
						)}
						value={
							!registrationAddressData.index
								? ''
								: registrationAddressData.index
						}
						onChange={e =>
							dispatch(
								index({ target: 'registrationAddress', index: e.target.value })
							)
						}
						maxLength={6}
					/>
					{IsError &&
						registrationAddressData.index &&
						!/^[0-9]{5,6}$/.test(registrationAddressData.index) && (
							<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
						)}
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text ellipsis>{t('MatchAddress')}</Typography.Text>
					<Radio.Group
						defaultValue={0}
						onChange={onChange}
						value={value}
						disabled={isStudent}
					>
						<Radio value={0}>{t('Yes')}</Radio>
						<Radio value={1}>{t('No')}</Radio>
					</Radio.Group>
				</Space>
				<div className={clsx(!value && 'hidden')}>
					<Space direction="vertical" size={20}>
						<Typography.Text
							className="text-black text-sm font-bold leading-[18px]"
							ellipsis
						>
							{t('AddressStay')}
						</Typography.Text>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Country')}</Typography.Text>
							<Select
								disabled={isStudent}
								size="large"
								className="w-[624px] shadow rounded-lg"
								value={
									!residenceAddressData ? '' : residenceAddressData.countryId
								}
								onChange={e =>
									dispatch(
										country({
											target: 'residenceAddress',
											country: typeof e === 'string' ? 1 : e
										})
									)
								}
								options={
									countryStorage == null
										? []
										: countryStorage.map(el => ({
												value: el.id,
												label: el.shortName
										  }))
								}
							/>
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('City')}</Typography.Text>
							<Input
								disabled={isStudent}
								maxLength={200}
								size="large"
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData &&
										residenceAddressData.city &&
										!/^[\p{L}]+$/u.test(residenceAddressData.city) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData
										? ''
										: !residenceAddressData.city
										? ''
										: residenceAddressData.city
								}
								onChange={e =>
									dispatch(
										city({ target: 'residenceAddress', city: e.target.value })
									)
								}
							/>
							{IsError &&
								residenceAddressData &&
								residenceAddressData.city &&
								!/^[\p{L}]+$/u.test(residenceAddressData.city) && (
									<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
								)}
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Street')}</Typography.Text>
							<Input
								disabled={isStudent}
								placeholder="Арбузова"
								maxLength={200}
								size="large"
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData &&
										residenceAddressData.street &&
										!/^[\p{L}]+$/u.test(residenceAddressData.street) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData
										? ''
										: !residenceAddressData.street
										? ''
										: residenceAddressData.street
								}
								onChange={e =>
									dispatch(
										street({
											target: 'residenceAddress',
											street: e.target.value
										})
									)
								}
							/>
							{IsError &&
								residenceAddressData &&
								residenceAddressData.street &&
								!/^[\p{L}]+$/u.test(residenceAddressData.street) && (
									<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
								)}
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('House')}</Typography.Text>
							<Input
								disabled={isStudent}
								placeholder="39"
								size="large"
								maxLength={5}
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData &&
										residenceAddressData.house &&
										!/^[0-9]+$/.test(residenceAddressData.house) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData
										? ''
										: !residenceAddressData.house
										? ''
										: residenceAddressData.house
								}
								onChange={e =>
									dispatch(
										house({ target: 'residenceAddress', house: e.target.value })
									)
								}
							/>
							{IsError &&
								residenceAddressData &&
								residenceAddressData.house &&
								!/^[0-9]+$/.test(residenceAddressData.house) && (
									<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
								)}
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Flat')}</Typography.Text>
							<Input
								disabled={isStudent}
								placeholder="88"
								maxLength={5}
								size="large"
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData &&
										residenceAddressData.apartment &&
										!/^[0-9]+$/.test(residenceAddressData.apartment) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData
										? ''
										: !residenceAddressData.apartment
										? ''
										: residenceAddressData.apartment
								}
								onChange={e =>
									dispatch(
										apartment({
											target: 'residenceAddress',
											apartment: e.target.value
										})
									)
								}
							/>
							{IsError &&
								residenceAddressData &&
								residenceAddressData.apartment &&
								!/^[0-9]+$/.test(residenceAddressData.apartment) && (
									<div className="text-sm text-rose-500">{t('BadSymbols')}</div>
								)}
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Index')}</Typography.Text>
							<Input
								disabled={isStudent}
								placeholder="456836"
								size="large"
								maxLength={6}
								className={clsx(
									'w-[624px] shadow',
									IsError &&
										residenceAddressData &&
										residenceAddressData.index &&
										!/^[0-9]{5,6}$/.test(residenceAddressData.index) &&
										'border-rose-500'
								)}
								value={
									!residenceAddressData
										? ''
										: !residenceAddressData.index
										? ''
										: residenceAddressData.index
								}
								onChange={e =>
									dispatch(
										index({ target: 'residenceAddress', index: e.target.value })
									)
								}
							/>
							{IsError &&
								residenceAddressData &&
								residenceAddressData.index &&
								!/^[0-9]{5,6}$/.test(residenceAddressData.index) && (
									<div className="text-sm text-rose-500">{t('BadIndex')}</div>
								)}
						</Space>
					</Space>
				</div>
				<Space
					direction="vertical"
					size={'small'}
					className={clsx('mt-4', isStudent && 'hidden')}
				>
					<Button
						className="border-solid border-bluekfu border-[1px] text-bluekfu rounded-md"
						onClick={() => setChanges()}
					>
						{t('edit')}
					</Button>
				</Space>
			</Space>
		</div>
	)
}
