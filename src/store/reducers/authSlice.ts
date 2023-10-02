import { RootState } from '..'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { InitialState } from '../type'

const initialState: InitialState = {
	accessToken: localStorage.getItem('access'),
	refreshToken: localStorage.getItem('refresh'),
	user: JSON.parse(localStorage.getItem('user') || '{}'),
	edit: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<InitialState>) => {
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
			if (state.user && action.payload.user)
				state.user.roles = [...action.payload.user.roles]
			state.user = action.payload.user
		},
		logOut: state => {
			state.user = null
			state.accessToken = null
			state.refreshToken = null
		},
		setEdit: state => {
			state.edit = !state.edit
		}
	}
})

export const { logOut, setCredentials, setEdit } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.accessToken
