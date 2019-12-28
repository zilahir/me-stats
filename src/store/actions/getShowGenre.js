import axios from 'axios'

import { apiEndpoints } from '../../utils/apiEndpoints'

export const refreshToken = id => new Promise(resolve => {
	axios.get(`${apiEndpoints.getShowDetails}/${id}/?api_key=0c004f5db97316ffa457e3a3ff03e6c2`)
		.then(resp => {
			resolve(resp.data)
		})
})
