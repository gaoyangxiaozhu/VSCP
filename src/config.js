export const API_ROOT = (process.env.NODE_ENV === 'production')
			? 'http://10.103.242.128:2377:8000'
			:'http://localhost:9000'

export const CookieDomain = (process.env.NODE_ENV === 'production')
			? '.gyyzyp.com'
			:''
