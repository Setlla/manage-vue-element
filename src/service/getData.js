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

/**
 * 获取公司信息 公司名字  公司编码
 */
export const getCompany = (name, code, id) => fetch('/getCompany', {
	name: name,
	code: code,
	id: id
});

/**
 * 新增和编辑公司信息
 */
export const addCompany = (companyForm) => fetch('/addUpdateCompany', companyForm);

/**
 * 删除公司信息
 */
export const delCompany = (id) => fetch('/delCompany', {
	id: id
});
