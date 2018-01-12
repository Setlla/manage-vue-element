import fetch from '../config/fetch'

/**
 * 用户登录
 */
export const login = (username, password) => fetch('/login',{
	username: username,
	password: password
});

/**
 * 
 */