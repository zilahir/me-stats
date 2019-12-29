import axios from 'axios'

import { SET_SHOW_DETAILS } from './actionTypes'
import { apiEndpoints } from '../../utils/apiEndpoints'

export const setShowDetails = showDetails => ({
	type: SET_SHOW_DETAILS,
	payload: showDetails,
})

export const getShowDetails = ids => dispatch => new Promise(resolve => {
	const promiseArr = []
	for (let i = 0; i < ids.length; i += 1) {
		promiseArr.push(new Promise(res => {
			axios.get(`${apiEndpoints.getShowDetails}/${ids[i]}?api_key=0c004f5db97316ffa457e3a3ff03e6c2`)
				.then(resp => {
					res(resp.data)
				})
		}))
	}
	Promise.all(promiseArr)
		.then(res => {
			dispatch(setShowDetails(res[0]))
			resolve()
		})
})
