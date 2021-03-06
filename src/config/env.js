/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = 'http://120.78.76.172:8000'; 
let routerMode = 'history';
let imgBaseUrl;


if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = 'http://39.108.219.59:8080';

}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = 'http://cangdu.org:8001';
    imgBaseUrl = 'http://cangdu.org:8001/img/';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}