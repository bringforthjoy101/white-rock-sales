// ** Third Party Components
import { Badge, Card, CardBody, CardText, Row, Col, Table, Media } from 'reactstrap'
import moment from 'moment'

const PreviewCard = ({ data }) => {
	const renderTable = (products) => {
		// products = process.env.NODE_ENV === 'production' ? JSON.parse(products) : products
		// products = JSON.parse(products)
		return products.map((product) => {
			return (
				<tr key={product.id}>
					<td className="py-1">
						<p className="card-text font-weight-bold mb-25">{product.name}</p>
					</td>
					<td className="py-1">
						<span className="font-weight-bold">₦{product.price.toLocaleString()}</span>
					</td>
					<td className="py-1">
						<span className="font-weight-bold">{product.qty.toLocaleString()}</span>
					</td>
					<td className="py-1">
						<span className="font-weight-bold">₦{product.total.toLocaleString()}</span>
					</td>
				</tr>
			)
		})
	}

	const statusObj = {
		PAID: 'light-warning',
		PAID: 'light-success',
	}

	// const discountedAmount = (Number(data.amount) - Number(orderData.discount))
	// const taxedAmount = ((Number(orderData.tax) / 100) * Number(discountedAmount))
	// const totalAmount = Number(discountedAmount) + Number(taxedAmount) + Number(orderData.shipping)

	return data !== null ? (
		<Card className="invoice-preview-card">
			<CardBody className="invoice-padding pb-0">
				{/* Header */}
				<div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
					<div>
						<h4 className="invoice-title">WHITE ROCK</h4>
						{/*<div className="logo-wrapper">*/}
						{/*	<Media className="mr-25" left>*/}
						{/*		<Media*/}
						{/*			object*/}
						{/*			className="rounded mr-50"*/}
						{/*			src={'https://res.cloudinary.com/bringforthjoy/image/upload/v1661904167/house178_fyddgi.jpg'}*/}
						{/*			alt="Generic placeholder image"*/}
						{/*			height="80"*/}
						{/*		/>*/}
						{/*	</Media>*/}
						{/*</div>*/}
						<CardText className="mb-25">{data.business?.name || ''}</CardText>
						<CardText className="mb-25">{data.business?.address || ''}</CardText>
						<CardText className="mb-0">{data.business?.phone || ''}</CardText>
					</div>
					<div className="mt-md-0 mt-2">
						<h4 className="invoice-title">
							RECEIPT <span className="invoice-number">#{data.saleNumber}</span>
						</h4>
						<div className="invoice-date-wrapper">
							<p className="invoice-date-title">Date Issued:</p>
							<p className="invoice-date">{moment(data.createdAt).format('LL')}</p>
						</div>
						<div className="invoice-date-wrapper">
							<p className="invoice-date-title">Due Date:</p>
							<p className="invoice-date">{moment(data.createdAt).format('LL')}</p>
						</div>
						<div className="invoice-date-wrapper">
							<p className="invoice-date-title">Amount Paid:</p>
							<p className="invoice-date">₦{data.amountPaid.toLocaleString()}</p>
						</div>
						<div className="invoice-date-wrapper">
							<p className="invoice-date-title">Balance:</p>
							<p className="invoice-date">₦{data.balance.toLocaleString()}</p>
						</div>
						<div className="invoice-date-wrapper">
							<p className="invoice-date-title">Status:</p>
							<p className="invoice-date">
								<Badge className="text-capitalize" color={statusObj[data.status]} pill>
									{data.status}
								</Badge>
							</p>
						</div>
					</div>
				</div>
				{/* /Header */}
			</CardBody>

			<hr className="invoice-spacing" />

			{/* Address and Contact */}
			{/* <CardBody className="invoice-padding pt-0">
				<Row className="invoice-spacing">
					<Col className="p-0" lg="6">
						<h6 className="mb-2">Invoice To:</h6>
						<h6 className="mb-25">{data.client.names}</h6>
						<CardText className="mb-25">{data.client.phone}</CardText>
						<CardText className="mb-25">{data.client.location}</CardText>
					</Col>
					<Col className="p-0 mt-xl-0 mt-2" lg="6">
						<h6 className="mb-2">Payment Details:</h6>
						<table>
							<tbody>
								<tr>
									<td className="pr-1">Total Due:</td>
									<td>
										<span className="font-weight-bolder">{data.amount.toLocaleString()}</span>
									</td>
								</tr>
								<tr>
									<td className="pr-1">Bank Name:</td>
									<td>{data.business.bankName}</td>
								</tr>
								<tr>
									<td className="pr-1">Account Name:</td>
									<td>{data.business.accountName}</td>
								</tr>
								<tr>
									<td className="pr-1">Account Number:</td>
									<td>{data.business.bankAccountNumber}</td>
								</tr>
							</tbody>
						</table>
					</Col>
				</Row>
			</CardBody> */}
			{/* /Address and Contact */}

			{/* Invoice Description */}
			<Table responsive>
				<thead>
					<tr>
						<th className="py-1">Product</th>
						<th className="py-1">Price</th>
						<th className="py-1">Quantity</th>
						<th className="py-1">Total</th>
					</tr>
				</thead>
				<tbody>{renderTable(data.products)}</tbody>
			</Table>
			{/* /Invoice Description */}

			{/* Total & Sales Person */}
			<CardBody className="invoice-padding pb-0">
				<Row className="invoice-sales-total-wrapper">
					<Col className="mt-md-0 mt-3" md="6" order={{ md: 1, lg: 2 }}>
						<CardText className="mb-0">
							<span className="font-weight-bold">Waiter:</span> <span className="ml-75">{data.server.fullName}</span>
						</CardText>
						<CardText className="mb-0">
							<span className="font-weight-bold">Initiated By:</span> <span className="ml-75">{data.user.fullName}</span>
						</CardText>
					</Col>
					<Col className="d-flex justify-content-end" md="6" order={{ md: 2, lg: 1 }}>
						<div className="invoice-total-wrapper">
							<div className="invoice-total-item">
								<p className="invoice-total-title">Subtotal:</p>
								<p className="invoice-total-amount">₦{data.subTotal.toLocaleString()}</p>
							</div>
							<div className="invoice-total-item">
								<p className="invoice-total-title">Discount:</p>
								<p className="invoice-total-amount">₦{data.discount.toLocaleString()}</p>
							</div>
							<hr className="my-50" />
							<div className="invoice-total-item">
								<p className="invoice-total-title">Total:</p>
								<p className="invoice-total-amount">₦{data.amountPaid.toLocaleString()}</p>
							</div>
						</div>
					</Col>
				</Row>
			</CardBody>
			{/* /Total & Sales Person */}

			<hr className="invoice-spacing" />

			{/* Invoice Note */}
			<CardBody className="invoice-padding pt-0">
				<Row>
					<Col sm="12">
						<span className="font-weight-bold">Note: </span>
						<span>Thank you for your patronage, We hope to see you again.</span>
					</Col>
				</Row>
			</CardBody>
			{/* /Invoice Note */}
		</Card>
	) : null
}

export default PreviewCard
