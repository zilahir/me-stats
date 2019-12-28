import movies from '../movies.json'
import shows from '../shows.json'

export const watchHistory = {
	list: {
		movies,
		shows,
	},
	getWatchHistory: () => watchHistory.list,
}
