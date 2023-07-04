// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import moment from 'moment'
import { getAllData, deleteProduct } from '../store/action'
import { store } from '@store/storeConfig/store'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'


// ** Third Party Components

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.image) {
    return <Avatar className='mr-1' img={row.image} width='32' height='32' />
  } else {
    return <Avatar color={color || 'primary'} className='mr-1' content={`${row.name}` || 'Sample Product'} initials />
  }
}

const handleDelete = async (id) => {
  // const dispatch = useDispatch()
  return MySwal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ml-1'
    },
    buttonsStyling: false
  }).then(async function (result) {
    if (result.value) {
      const deleted = await store.dispatch(deleteProduct(id))
      if (deleted.status) {
        await store.dispatch(getAllData())
          MySwal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Product has been deleted.',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
          })
      }
    }
  })
}

export const columns = [
  {
    name: 'Product Name',
    minWidth: '297px',
    selector: 'id',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/product/view/${row.id}`}
            className='user-name text-truncate mb-0'
          >
            <span className='font-weight-bold'>{row.name}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Price',
    minWidth: '150px',
    selector: 'price',
    sortable: true,
    cell: row => <span>{(row.price || 0).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</span>
  },
  {
    name: 'Qty',
    minWidth: '150px',
    selector: 'qty',
    sortable: true,
    cell: row => <span className="text-capitalize">{row.qty}</span>
  },
  {
    name: 'Unit',
    minWidth: '150px',
    selector: 'unit',
    sortable: true,
    cell: row => <span className="text-capitalize">{row.unit}</span>
  },
  {
    name: 'Category',
    minWidth: '150px',
    selector: 'category',
    sortable: true,
    cell: row => <span className="text-capitalize">{row.category}</span>
  },
  {
    name: 'Cretaed Date',
    minWidth: '250px',
    selector: 'createdAt',
    sortable: true,
    cell: row => moment(row.createdAt).format('lll')
  },
  {
    name: 'Actions',
    minWidth: '100px',
    selector: 'name',
    sortable: true,
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/product/view/${row.id}`}
            className='w-100'
          >
            <FileText size={14} className='mr-50' />
            <span className='align-middle'>Details</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/product/edit/${row.id}`}
            className='w-100'
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <Archive size={14} className='mr-50' />
            <span className='align-middle'>Edit</span>
          </DropdownItem>
          <DropdownItem 
            className='w-100' 
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 size={14} className='mr-50' />
            <span className='align-middle'>Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
