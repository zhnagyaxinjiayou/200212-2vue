//包含项目中所有接口的ajax请求函数
//函数的返回值是promise，函数内部调用ajax模块发送请求

//需要掌握一个技能：根据接口文档，定义接口请求函数

import ajax from './ajax'
import mockAjax from './mockAjax'



//首页三级分类
///api/product/getBaseCategoryList  GET请求（默认为GET请求）
export const reqCategoryList = () => ajax('/product/getBaseCategoryList')

// export function reqCategoryList() {
//     return ajax('/product/getBaseCategoryList')
// }


//定义访问mock接口的接口请求函数
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')

//获取商品列表
//options包含所有需要传递的搜索请求参数的对象
export const reqProductList = (options) => ajax.post('/list',options)

// 获取商品详情，发送ajax请求
export const reqDetailInfo=(skuId)=>ajax.get(`/item/${skuId}`)

// 获取购物车列表 /api/cart/cartList GET
export const reqShopCart=()=>ajax.get('/cart/cartList')

// 添加到购物车(对已有物品进行数量改动) /api/cart/addToCart/{ skuId }/{ skuNum }  POST
// skuId: 商品ID
// skuNum: 商品数量, 正数代表增加, 负数代表减少
// /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddToCart=(skuId,skuNum)=>ajax.post(`/cart/addToCart/${ skuId }/${ skuNum }`)

// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}  GET
export const reqCeckCartItem=(skuId,isChecked)=>ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 删除购物车商品 /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteCartItem=(skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)


//登录
///api/user/passport/login
export function reqLogin(mobile, password) {
    //将ajax作为函数使用
    // ajax({
    //     url: '/user/passport/login',
    //     method: 'POST',
    //     data: {mobile, password}
    // })

    //将Ajax作为对象使用
    return ajax.post('/user/passport/login',{mobile, password})
}

// 登录
// export const reqLogin=(mobile, password)=>ajax.post('/user/passport/login',{mobile, password})

// 注册用户 /api/user/passport/register POST
// userInfo: 包含以下属性的对象
//   mobile
//   password
//   code
export const  reqRegister=(userInfo)=>ajax.post('/user/passport/register',userInfo)

// 退出登录  /api/user/passport/logout  GET
export const reqLogout=()=>ajax('/user/passport/logout')

