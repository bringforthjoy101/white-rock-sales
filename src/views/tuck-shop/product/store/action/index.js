import { paginateArray, sortCompare, apiRequest, swal } from '@utils'

export const apiUrl = process.env.REACT_APP_API_ENDPOINT

// ** Get all User Data
export const getAllData = () => {
  return async dispatch => {
    const response = await apiRequest({url:'/products', method:'GET'}, dispatch)
    if (response && response.data.data && response.data.status) {
        await dispatch({
          type: 'GET_ALL_PRODUCTS_DATA',
          data: response.data.data
        })
    } else {
      console.log(response)
      swal('Oops!', 'Something went wrong.', 'error')
    }
  }
}

// All Users Filtered Data
export const getFilteredData = (products, params) => {
  return async dispatch => {
    const { category = null, q = '', perPage = 10,  page = 1 } = params

    /* eslint-disable  */
    const queryLowered = q?.toLowerCase()
    const filteredData = products?.filter(
      product => 
        (product?.name?.toLowerCase()?.includes(queryLowered)) && product?.category === (category || product.category)
      )
  
    /* eslint-enable  */

    dispatch({
      type: 'GET_FILTERED_PRODUCT_DATA',
      data: paginateArray(filteredData, perPage, page),
      totalPages: filteredData.length,
      params
    })
  }
}

//  Get User
export const getProduct = (productId) => {
  return async dispatch => {
    const response = await apiRequest({url:`/products/get-detail/${productId}`, method:'GET'}, dispatch)
    if (response && response.data.data && response.data.status) {
        await dispatch({
          type: 'GET_A_PRODUCT',
          selectedProduct: response.data.data
        })
    } else {
      console.log(response)
      swal('Oops!', 'Something went wrong.', 'error')
    }
  }
}

export const deleteProduct = (productId) => {
  return async dispatch => {
    const response = await apiRequest({url:`/products/delete/${productId}`, method:'GET'}, dispatch)
    if (response && response.data.status) {
        return response.data
    } else {
      console.log(response)
      swal('Oops!', 'Something went wrong.', 'error')
    }
  }
}

