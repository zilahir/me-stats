import { filter, orderBy } from 'lodash'

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
		const arr = this.getShowHistory().map(curr => (
			{
				...curr,
				name: curr.show.title,
				value: curr.plays,
			}
		))
		return orderBy(arr, ['plays'], ['desc'])
	},
	getGenre() {
		const showHistory = this.getShowHistory()
		const ids = []
		for (let i = 0; i < showHistory.length; i += 1) {
			ids.push(showHistory[i].show.ids.tmdb)
		}
		return ids
	},
}
