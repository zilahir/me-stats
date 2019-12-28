import React from 'react'

import { watchHistory } from '../../utils/fakeApi/getViewHistory'

/**
* @author
* @function Main
* */

const Main = () => {
	// eslint-disable-next-line no-unused-vars
	const thisYearShow = watchHistory.getWatchHistory()
	return (
		<div>Main</div>
	)
}

export default Main
