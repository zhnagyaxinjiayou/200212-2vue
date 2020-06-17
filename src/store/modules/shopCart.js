// 管理购物车相关数据的vuex子模块

import {reqShopCart,reqAddToCart,reqCeckCartItem,reqDeleteCartItem} from '@/api'
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
async getCartList({commit}){
  const result = await reqShopCart()
  if(result.code===200){
    const cartList=result.data
    // 保存数据
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
  if(result.code!==200){
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
},
 /* 
  勾选/不勾选某个购物项商品
  skuId: 商品的ID
  isChecked: 商品选中状态, '0'代表不选中, '1'代表选中
  */

  async checkCartItem({commit},{skuId,isChecked}){
    // 调用接口请求函数，提交ajax请求
    const result =await reqCeckCartItem(skuId,isChecked)
    // 请求处理如果没有成功，返回一个error对象
    if(result.code!==200){
      throw new Error(result.message || '选中商品失败')
    }
  },

  // 全部勾选、不勾选  checked:是否勾选的布尔值

  // async checkAllCartItems({commit,state,dispatch},checked){
  //   // 确定对应的isChecked值
  //   const isChecked=checked?'1':'0'

  //   let promises=[]
  //   // 遍历每个购物项
  //   state.cartList.forEach(item=>{
  //     // 购物项的状态与目标状态不一样
  //     if(item.isChecked!=isChecked){
  //       const promise=dispatch('checkCartItem',{skuId:item.skuNum.isChecked})
  //       // 保存到数组
  //       promises.push(promise)
  //     }
  //   })
  //     // 此时请求发出去没有? 已经发了
  //   // 返回promise对象(只有所有dispatch都成功了才成功, 否则就是失败的)
  //   return Promise.all(promises)
  // }
  async checkAllCartItems ({commit, state, dispatch}, checked) {
    // 确定对应的isChecked值
    const isChecked = checked ? '1' : '0'
    let promises = []

    // 遍历每个购物项
    state.cartList.forEach(item => {
      // 购物项的状态与目标状态不一样
      if (item.isChecked!=isChecked) {
        // 分发给checkCartItem, 得到其返回的promise对象
        const promise = dispatch('checkCartItem', {skuId: item.skuId, isChecked})
        // 保存到数组中
        promises.push(promise)
      }
    })

    // 此时请求发出去没有? 已经发了
    // 返回promise对象(只有所有dispatch都成功了才成功, 否则就是失败的)
    return Promise.all(promises) 
  },

  // 删除一个购物项的异步action

  async deleteCartItem(context,skuId){
    const result=await reqDeleteCartItem(skuId)
    if(result.code!==200){
      // 失败
      throw new Error('删除购物项失败')   // async函数的promise就是失败的
    }
  },

  // 删除所有勾选的购物项的异步action
  async deleteCheckedCartItems({state, dispatch}){
    // 遍历每个勾选的购物项去分发deleteCartItem
    const promises=state.cartList.reduce((pre,item)=>{
      if(item.isChecked===1){
        pre.push(dispatch('deleteCartItem',item.skuId))
      }
      return pre
    },[])

    return Promise.all(promises)

  }
  


}
const getters={
//   // 选中的总数量
//reduce 传入 两个从参数： 0初始值 、遍历每个元素进行累计累加（preTotal初始值，item当前的项，index当前项的下标） 算出总数量
  totalCount(state){
    return state.cartList.reduce((preTotal,item,index)=>preTotal+(item.isChecked===1?item.skuNum:0),0)
  },

//   // 选中的总价格
  totalPrice(state){
    return state.cartList.reduce((preTotal,item)=>preTotal+item.skuNum*item.cartPrice,0)
  },
//   // 是否全部选中
  isCheckAll(state){
    // return state.cartList.length>0 && state.cartList.every((item,index)=>item.isChecked===1)
    return state.cartList.length>0 && state.cartList.every((item) => item.isChecked===1)

  }

}



export default{
  state,
  mutations,
  actions,
  getters
}