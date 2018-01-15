import fetch from '../config/fetch'

/**
 * 用户登录
 */
export const login = (username, password) => fetch('/login', {
	username: username,
	password: password
});

/**
 * 获取站点信息
 */
export const getSite = (name) => fetch('/getSite', {
	name: name
});

/**
 * 新增站点信息
 */
export const addSite = (siteForm) => fetch('/addSite', {
	name: siteForm.name,
	address: siteForm.address,
	territory: siteForm.territory,
	contactName: siteForm.contactName,
	contactNickname: siteForm.contactNickname,
	contactPhone: siteForm.contactPhone,
	contactWechat: siteForm.contactWechat,
	contactHometown: siteForm.contactHometown,
	remarks: siteForm.remarks
});

/**
 * 删除站点信息
 */
export const delSite = (id) => fetch('/delSite', {
	id: id
});