// 管理购物车相关数据的vuex子模块

import {reqShopCart,reqAddToCart} from '@/api'
const state={
  // 购物车购物项的列表,返回是一个数组数据
  cartList:[]
}

const mutations={
// 接收保存购物 项列表
RECEIVE_CART_LIST(state,cartList){
  state.cartList=cartList
}

}
const actions={
  // 发送请求都是异步的promise
// 获取购物车列表数据的异步action
async getCarList({commit}){
  const result = await reqShopCart()
  if(result.code===200){
    const cartList=result.data
    commit('RECEIVE_CART_LIST',cartList)
  }
},

// 添加到购物车的异步
async addToCart({commit},{skuId,skuNum,callback}){
  //async返回的是promise  await右边一般都是promise,如果是成功的那将返回是成功的promise，如果为失败的promise将抛出异常
  const result=await reqAddToCart(skuId,skuNum)
  // 在ascyn这里知道数据的成功或失败，但是成功失败的处理应该在组件里去做
  if(result.code===200){
    // 通知组件成功
    callback() //成功了不传数据
  }else{
    // 通知组件失败
    callback('数据传递失败了')
  }
},


// 添加到购物车的异步
async addToCart2({commit},{skuId,skuNum}){
  //async返回的是promise  await右边一般都是promise,如果是成功的那将返回是成功的promise，如果为失败的promise将抛出异常
  const result=await reqAddToCart(skuId,skuNum)
  // 在ascyn这里知道数据的成功或失败，但是成功失败的处理应该在组件里去做
  if(result.code===200){
    // 通知组件成功
    return undefined //action函数的promise成功了，value为undefined
  }else{
    // 通知组件失败
    throw new Error('添加购物车失败') //action函数的promise失败了，reason为error
  }
},

async addToCart3({commit},{skuId,skuNum}){
  //async返回的是promise  await右边一般都是promise,如果是成功的那将返回是成功的promise，如果为失败的promise将抛出异常
  const result=await reqAddToCart(skuId,skuNum)
  // 在ascyn这里知道数据的成功或失败，但是成功失败的处理应该在组件里去做
  if(result.code!==200){
    // 通知失败
    return'添加购物车失败'
  }else{
    // 这里的else完全可以不用写
    return undefined
  }
}
}
const getters={


}



export default{
  state,
  mutations,
  actions,
  getters
}