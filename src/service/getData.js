import fetch from '../config/fetch'

/**
 * 
 */
export const getMenuData = () => fetch('/productList',{},'POST');
