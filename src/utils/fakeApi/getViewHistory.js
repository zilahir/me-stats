import { filter } from 'lodash'

import movies from '../movies.json'
import shows from '../shows.json'

const currentDate = new Date()
export const watchHistory = {
	list: {
		movies,
		shows,
	},
	getShowHistory: () => filter(
		watchHistory.list.shows, c => new Date(c.last_watched_at).getFullYear()
			=== currentDate.getFullYear(),
	),
	getMovieHistory: () => filter(
		watchHistory.list.movies, c => new Date(c.last_watched_at).getFullYear()
			=== currentDate.getFullYear(),
	),
	getShowPlayCount() {
		return this.getShowHistory().map(curr => (
			{
				...curr,
				name: curr.show.title,
				value: curr.plays,
			}
		))
	},
}
