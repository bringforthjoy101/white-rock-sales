// Api Url
export const apiUrl = process.env.REACT_APP_API_ENDPOINT

// ** Auth Endpoints
export default {
	loginEndpoint: '/jwt/login',
	registerEndpoint: '/jwt/register',
	refreshEndpoint: '/jwt/refresh-token',
	logoutEndpoint: '/jwt/logout',
	salesAppRegisterEndpoint: `${apiUrl}/register`,
	salesAppLoginEndpoint: `${apiUrl}/login`,

	// ** This will be prefixed in authorization header with token
	// ? e.g. Authorization: Bearer <token>
	tokenType: 'Bearer',

	// ** Value of this property will be used as key to store JWT token in storage
	storageTokenKeyName: 'accessToken',
	storageRefreshTokenKeyName: 'refreshToken',
}
