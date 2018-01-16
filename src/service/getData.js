import fetch from '../config/fetch'

/**
 * 用户登录
 */
export const login = (username, password) => fetch('/login', {
	username: username,
	password: password
});

/**
 * 获取站点信息 站点名字  id
 */
export const getSite = (name, id) => fetch('/getSite', {
	name: name,
	id: id
});

/**
 * 新增和编辑站点信息
 */
export const addSite = (siteForm) => fetch('/addUpdateSite', siteForm);

/**
 * 删除站点信息
 */
export const delSite = (id) => fetch('/delSite', {
	id: id
});