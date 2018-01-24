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
 * 编辑和编辑站点信息
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
 * 编辑和编辑公司信息
 */
export const addCompany = (companyForm) => fetch('/addUpdateCompany', companyForm);

/**
 * 删除公司信息
 */
export const delCompany = (id) => fetch('/delCompany', {
	id: id
});


/**
 * 获取快递员信息 名字   站点   id
 */
export const getCourier = (name, siteID, id) => fetch('/getCourier', {
	name: name,
	siteID: siteID,
	id: id
});

/**
 * 编辑和编辑快递员信息
 */
export const addCourier = (courierForm) => fetch('/addUpdateCourier', courierForm);

/**
 * 删除快递员信息
 */
export const delCourier = (id) => fetch('/delCourier', {
	id: id
});

/**
 * 获取客户信息 姓名、手机号码、所属站点、等级
 */
export const getCustomer = (searchForm) => fetch('/getCustomer', searchForm);

/**
 * 编辑和编辑客户信息
 */
export const addCustomer = (customerForm) => fetch('/addUpdateCustomer', customerForm);

/**
 * 删除客户信息
 */
export const delCustomer = (id) => fetch('/delCustomer', {
	id: id
});