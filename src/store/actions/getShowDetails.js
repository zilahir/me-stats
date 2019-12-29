import axios from 'axios'

import { SET_SHOW_DETAILS } from './actionTypes'
import { apiEndpoints } from '../../utils/apiEndpoints'

export const setShowDetails = showDetails => dispatch => new Promise(resolve => {
	dispatch({
		type: SET_SHOW_DETAILS,
		payload: {
			showDetails,
		},
	})
	resolve()
})

export const getShowDetails = ids => new Promise(resolve => {
	const promiseArr = []
	const result = []
	for (let i = 0; i < ids.length; i += 1) {
		promiseArr.push(new Promise(res => {
			if (ids[i]) {
				axios.get(`${apiEndpoints.getShowDetails}/${ids[i]}?api_key=0c004f5db97316ffa457e3a3ff03e6c2`)
					.then(resp => {
						result.push(resp.data)
						res()
					})
			} else {
				result.push(null)
				res()
			}
		}))
	}
	Promise.all(promiseArr)
		.then(() => {
			resolve(result)
		})
})
