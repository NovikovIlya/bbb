import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'

import { IDocumentsRequest } from './../../api/types'

export const documentsAPi = createApi({
	reducerPath: 'documentsAPi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.63.96:8080/api' }),
	endpoints: build => ({
		getDocuments: build.query<IDocumentsRequest[], string>({
			query: language => ({
				url: endpoints.USER.DOCUMENTS,
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Accept-Language': language
				}
			})
		})
	})
})

export const { useGetDocumentsQuery } = documentsAPi
