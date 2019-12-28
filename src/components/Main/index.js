import React from 'react'

import { watchHistory } from '../../utils/fakeApi/getViewHistory'

/**
* @author
* @function Main
* */

const Main = () => {
	const historyData = watchHistory.getWatchHistory()
	// eslint-disable-next-line no-console
	console.debug('historyData', historyData)
	return (
		<div>Main</div>
	)
}

export default Main
