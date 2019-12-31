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
	getShowHistoryLastYear: () => filter(
		watchHistory.list.shows, c => new Date(c.last_watched_at).getFullYear()
			=== currentDate.getFullYear() - 1,
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
		const showHistory = this.getShowPlayCount().slice(0, 10)
		const ids = []
		for (let i = 0; i < showHistory.length; i += 1) {
			ids.push(showHistory[i].show.ids.tmdb)
		}
		return ids
	},
	getMostViewDays() {
		const showHistory = this.getShowPlayCount()
		let distinctDates = showHistory.reduce((acc, curr) => {
			curr.seasons.reduce((acc2, curr2) => {
				curr2.episodes.reduce((acc3, curr3) => {
					const thisDate = curr3.last_watched_at.split('T')
					if (new Date(thisDate[0]).getFullYear() === currentDate.getFullYear()) {
						acc[thisDate[0]] = acc[thisDate[0]] ? acc[thisDate[0]] + 1 : 1
					}
					return acc3
				})
				return acc2
			})
			return acc
		}, {})
		delete distinctDates['2019-11-10']
		distinctDates = Object.keys(distinctDates).map(key => ({
			name: key,
			episodes: distinctDates[key],
		}))
		return distinctDates
	},
	getTotalPlayCount() {
		const showHistory = this.getShowPlayCount()
		const prevYearHistory = this.getShowHistoryLastYear()
		let sum = 0
		let sumLastYear = 0
		showHistory.forEach(currShow => {
			sum += currShow.plays
		})
		prevYearHistory.forEach(currShow => {
			sumLastYear += currShow.plays
		})
		const thisYear = {
			name: currentDate.getFullYear(),
			sum,
		}
		const lastYear = {
			name: currentDate.getFullYear() - 1,
			sum: sumLastYear,
		}
		return [thisYear, lastYear]
	},
}
