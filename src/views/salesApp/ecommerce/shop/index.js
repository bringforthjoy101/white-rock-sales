// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'
import { getAllData } from '../../servers/store/action'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Shop = () => {
	// ** States
	const [activeView, setActiveView] = useState('grid')
	const [sidebarOpen, setSidebarOpen] = useState(false)

	// ** Vars
	const dispatch = useDispatch()
	const store = useSelector((state) => state.ecommerce)
	const servers = useSelector((state) => state.servers)

	useEffect(() => {}, [dispatch])

	// ** Get products
	useEffect(() => {
		dispatch(getAllData())
		dispatch(
			getProducts({
				q: '',
				sortBy: 'featured',
				page: 1,
			})
		)
	}, [dispatch])

	return (
		<Fragment>
			<Breadcrumbs breadCrumbTitle="Sales App" breadCrumbParent="Sales App" breadCrumbActive="Products" />
			<Products
				store={store}
				dispatch={dispatch}
				addToCart={addToCart}
				activeView={activeView}
				getProducts={getProducts}
				sidebarOpen={sidebarOpen}
				getCartItems={getCartItems}
				setActiveView={setActiveView}
				addToWishlist={addToWishlist}
				setSidebarOpen={setSidebarOpen}
				deleteCartItem={deleteCartItem}
				deleteWishlistItem={deleteWishlistItem}
			/>
			{/* <Sidebar sidebarOpen={sidebarOpen} /> */}
		</Fragment>
	)
}
export default Shop
