import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { IDocument } from '../../../api/types'

const initialState: IDocument = {
	documentTypeId: 1,
	passportSeries: '',
	passportNumber: '',
	issuedBy: '',
	dateIssue: '',
	divisionCode: '',
	inn: '',
	snils: ''
}

export const DocumentReducer = createSlice({
	name: 'Document',
	initialState,
	reducers: {
		allData: (state, action: PayloadAction<IDocument>) => {
			state.dateIssue = action.payload.dateIssue
			state.divisionCode = action.payload.divisionCode
			state.documentTypeId = action.payload.documentTypeId
			state.inn = action.payload.inn
			state.issuedBy = action.payload.issuedBy
			state.passportNumber = action.payload.passportNumber
			state.passportSeries = action.payload.passportSeries
			state.snils = action.payload.snils
		},
		documentTypeId: (state, action: PayloadAction<number>) => {
			state.documentTypeId = action.payload
		},
		passportSeries: (state, action: PayloadAction<string>) => {
			state.passportSeries = action.payload
		},
		passportNumber: (state, action: PayloadAction<string>) => {
			state.passportNumber = action.payload
		},
		issuedBy: (state, action: PayloadAction<string>) => {
			state.issuedBy = action.payload
		},
		dateIssue: (state, action: PayloadAction<string>) => {
			state.dateIssue = action.payload
		},
		divisionCode: (state, action: PayloadAction<string>) => {
			state.divisionCode = action.payload
		},
		inn: (state, action: PayloadAction<string>) => {
			state.inn = action.payload
		},
		snils: (state, action: PayloadAction<string>) => {
			state.snils = action.payload
		}
	}
})

export const {
	documentTypeId,
	passportSeries,
	passportNumber,
	issuedBy,
	dateIssue,
	divisionCode,
	inn,
	snils,
	allData
} = DocumentReducer.actions

export default DocumentReducer.reducer

export const selectState = (state: RootState) => state.Document
