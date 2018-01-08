import fetch from '../config/fetch'

/**
 * 用户登录
 */
export const login = (phone, password) => fetch('/login',{
	phone: phone,
	password: password
});

/**
 * 
 */