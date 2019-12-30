/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import {
	PieChart, Pie, Cell,
} from 'recharts'
import styled from 'styled-components'
import { useDispatch, useStore } from 'react-redux'

import { watchHistory } from '../../utils/fakeApi/getViewHistory'
import { getShowDetails, setShowDetails } from '../../store/actions/getShowDetails'
import styles from './Main.module.scss'

/**
* @author
* @function Main
* */

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const ColoredLabel = styled.div`
	display: flex;
	position: relative;
	margin-top: 10px;
	&:before {
		content: '';
		width: 20px;
		height: 20px;
		background-color: ${props => props.color};
		position: absolute;
	}
	p {
		margin: 0;
		padding: 0;
		margin-left: 25px;
	}
`

const Main = () => {
	const dispatch = useDispatch()
	const store = useStore()
	const [genresData, setGenresData] = useState(null)
	const [thisYearShow, setThisYearShow] = useState(null)
	useEffect(() => {
		const thisYearGenre = watchHistory.getGenre()
		setThisYearShow(watchHistory.getShowPlayCount())
		Promise.all([
			getShowDetails(thisYearGenre),
		]).then(result => {
			dispatch(setShowDetails(result[0]))
			const shows = store.getState().showDetails.showDetails
			const genres = []
			shows.forEach(currShow => {
				currShow.genres.forEach(currGenres => {
					genres.push(currGenres)
				})
			})
			let distinctGenres = genres.reduce((acc, curr) => {
				acc[curr.name] = acc[curr.name] ? acc[curr.name] + 1 : 1
				return acc
			}, {})
			distinctGenres = Object.keys(distinctGenres).map(currGenre => ({
				name: currGenre,
				count: distinctGenres[currGenre],
			}))
			setGenresData(distinctGenres)
		})
	}, [dispatch, store])
	return (
		<>
			<div className={styles.chartContainer}>
				<PieChart
					width={400}
					height={400}
				>
					<Pie
						data={thisYearShow ? thisYearShow.slice(0, 10) : null}
						cx={180}
						cy={200}
						innerRadius={60}
						outerRadius={120}
						fill="#8884d8"
						paddingAngle={0}
						dataKey="value"
						label
					>
						{
							thisYearShow ? thisYearShow.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />) : null
						}
					</Pie>
				</PieChart>
				<div>
					{
						thisYearShow
							? (
								thisYearShow.slice(0, 10).map((curr, index) => (
									<ColoredLabel key={`block-${index}`} color={COLORS[index % COLORS.length]}>
										<p>
											{thisYearShow[index].name}
											<small>
												{
													`(${thisYearShow[index].value})`
												}
											</small>
										</p>
									</ColoredLabel>
								))
							)
							: null
					}
				</div>
			</div>
			<div className={styles.chartContainer}>
				<PieChart
					width={400}
					height={400}
				>
					<Pie
						data={genresData}
						cx={180}
						cy={200}
						innerRadius={60}
						outerRadius={120}
						fill="#8884d8"
						paddingAngle={0}
						dataKey="count"
						label
					>
						{
							genresData ? genresData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />) : null
						}
					</Pie>
				</PieChart>
				<div>
					{
						genresData
							? (
								genresData.map((curr, index) => (
									<ColoredLabel key={`block-${index}`} color={COLORS[index % COLORS.length]}>
										<p>
											{curr.name}
										</p>
									</ColoredLabel>
								))
							)
							: null
					}
				</div>
			</div>
		</>
	)
}

export default Main
