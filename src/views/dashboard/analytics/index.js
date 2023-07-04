import { useContext, useState, useEffect } from 'react'
import { apiRequest, swal, kFormatter, isUserLoggedIn } from '@utils'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col, Spinner } from 'reactstrap'
import ContactsCount from '@src/views/ui-elements/cards/statistics/ContactsCountInfo'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import StatsVertical from '@components/widgets/stats/StatsVertical'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import { Eye, TrendingUp } from 'react-feather'

import '@styles/react/libs/charts/apex-charts.scss'

const AnalyticsDashboard = () => {
	const { colors } = useContext(ThemeColors)

	const [userData, setUserData] = useState(null)
	const [dashData, setDashData] = useState({})

	useEffect(() => {
		if (isUserLoggedIn) {
			setUserData(JSON.parse(localStorage.getItem('userData')))
		}
	}, [])

	// ** Get all Dashboard Data
	const dashboardData = async () => {
		const response = await apiRequest({ url: '/dashboard', method: 'GET' })
		if (response) {
			if (response?.data?.data && response?.data?.status) {
				await setDashData(response.data.data)
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}

	// ** Get admin activities
	useEffect(() => {
		dashboardData()
	}, [])

	const numFormatter = (num) => {
		if (num > 999 && num < 1000000) {
			return `${(num / 1000).toFixed(1)}K`
		} else if (num > 1000000) {
			return `${(num / 1000000).toFixed(1)}M`
		} else if (num < 900) {
			return num
		}
	}

	return (
		<div id="dashboard-analytics">
			<Row className="match-height">
				<Col lg="5" sm="12">
					<CardCongratulations userData={userData} />
				</Col>
				<Col xl="7" md="6" xs="12">
					<StatsCard cols={{ xl: '4', sm: '6' }} statsData={dashData?.topSelling} />
				</Col>
				{/* <Col lg="3" sm="6">
					<SubscribersGained kFormatter={kFormatter} dashData={dashData} />
				</Col>
				<Col lg="3" sm="6">
					<ContactsCount kFormatter={kFormatter} warning={colors.warning.main} dashData={dashData} />
				</Col> */}
			</Row>
			<Row className="match-height">
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<Eye size={21} />}
						color="primary"
						stats={numFormatter(dashData.totalProducts) || <Spinner className="mr-25" size="sm" />}
						statTitle="Products"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<Eye size={21} />}
						color="warning"
						stats={numFormatter(dashData.totalSales) || <Spinner className="mr-25" size="sm" />}
						statTitle="Sales"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<Eye size={21} />}
						color="secondary"
						stats={numFormatter(dashData.totalUsers) || <Spinner className="mr-25" size="sm" />}
						statTitle="Users"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales.totalSales) || 0}` : <Spinner className="mr-25" size="sm" />}
						statTitle="Sales"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales?.maxSales) || 0}` : <Spinner className="mr-25" size="sm" />}
						statTitle="Max Sales"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales?.avgSales?.toFixed(0) || 0)}` : <Spinner className="mr-25" size="sm" />}
						statTitle="Avg Sales"
					/>
				</Col>
			</Row>
			<Row className="match-height">
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales?.salesToday) || 0}` : <Spinner className="mr-25" size="sm" />}
						statTitle="Today"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales?.salesYesterday) || 0}` : <Spinner className="mr-25" size="sm" />}
						statTitle="Yesterday"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales?.salesThisWeek) || 0}` : <Spinner className="mr-25" size="sm" />}
						statTitle="This Week"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales?.salesThisMonth) || 0}` : <Spinner className="mr-25" size="sm" />}
						statTitle="This Month"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales?.salesThisYear) || 0}` : <Spinner className="mr-25" size="sm" />}
						statTitle="This Year"
					/>
				</Col>
				<Col xl="2" md="4" sm="6">
					<StatsVertical
						icon={<TrendingUp size={21} />}
						color="primary"
						stats={dashData.sales ? `₦${numFormatter(dashData.sales?.salesSoFar) || 0}` : <Spinner className="mr-25" size="sm" />}
						statTitle="So Far"
					/>
				</Col>
			</Row>
		</div>
	)
}

export default AnalyticsDashboard
