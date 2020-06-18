//应用的所有路由配置的数组
import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
// import Login from '../pages/Login'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from '@/pages/ShopCart';

import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import GroupBuy from '@/pages/Center/GroupBuy';
import MyOrder from '@/pages/Center/MyOrder';


export default [
    {
        path: '/',
        component: Home
    },
    {
        name: 'search', //一旦有params参数，想用push的对象写法，必须有name配置
        path: '/search/:keyword?', // 带：的对应的部分就是params参数
        component: Search,
        //props: (route) => ({ query: route.query.q })
        //将路由参数映射成props传递给路由组件对象
        props:route => ({keyword3: route.params.keyword,keyword4: route.query.keyword2})
    },
    {
        path: '/register',
        component: Register,
        meta: { 
            isHideFooter:true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: { 
            isHideFooter:true
        }
    },
    {
        name:'detail',
        path:"/detail/:id",
        component:Detail
    },
    {

        // 添加购物车成功
        path: '/addcartsuccess',
        component: AddCartSuccess,
        // // 路由守卫
    // 只有携带的skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
        beforeEnter: (to, from, next) => {
        //    有值  to目标路由对象
            const skuNum=to.query.skuNum
            const skuInfo=JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
            // 只有两条都满足才放行
            if(skuNum&&skuInfo instanceof Object){
                // 放行
                next()
            }else{
                // 如果没有，自动跳转到购物车（强制跳转）
                next('/shopcart')
            }
        }
    },
    {
        // 购物车的组件
        path:'/shopcart',
        component:ShopCart
    },
    {
    //  交易页面
        path:'/trade',
        component:Trade,
        // 路由守卫
        beforeEnter: (to, from, next) => {
        // 必须是从购物车页面过来的才行  from当前路由对象
        if(from.path==='/shopcart'){
            next()
        }else{
            // 否则自动跳到购物车界面
            next('/shopcart')
        }
        
       }
    },
    {
        // 支付
        path:'/pay',
        component:Pay,
      // 必须是从trade界面过来的才行
      beforeEnter: (to, from, next) => {
          if(from.path==='/trade'){
              next()
          }else{
              next('/trade')
          }
      }

    },
    {
    //   支付成功
        path:'/paysuccess',
        component:PaySuccess,
      // 必须是从pay界面过来的才行
      beforeEnter: (to, from, next) => {
          if(from.path==='/pay'){
              next()
          }else{
              next('/pay')
          }
      }

    },
    {
       
        path:'/center',
        component:Center,

        children:[
            {
                path:'groupbuy',
                component:GroupBuy
            },
            {
                path:'myorder',
                component:MyOrder
            },
            // 自动跳转路由
            {
                path:'',
                redirect:'/center/myorder'
            }

        ]
    },
   
]