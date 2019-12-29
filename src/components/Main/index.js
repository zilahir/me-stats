/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import {
	PieChart, Pie, Cell,
} from 'recharts'
import styled from 'styled-components'

import { watchHistory } from '../../utils/fakeApi/getViewHistory'
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
	const thisYearShow = watchHistory.getShowPlayCount()
	const thisYearGenre = watchHistory.getGenre()
	console.debug('thisYearGenre', thisYearGenre)
	return (
		<div className={styles.chartContainer}>
			<PieChart
				width={400}
				height={400}
			>
				<Pie
					data={thisYearShow.slice(0, 10)}
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
						thisYearShow.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
			</PieChart>
			<div>
				{
					thisYearShow.slice(0, 10).map((curr, index) => (
						<ColoredLabel key={`block-${index}`} color={COLORS[index % COLORS.length]}>
							<p>
								{thisYearShow[index].name}
								<smalL>
									{
										`(${thisYearShow[index].value})`
									}
								</smalL>
							</p>
						</ColoredLabel>
					))
				}
			</div>
		</div>
	)
}

export default Main
