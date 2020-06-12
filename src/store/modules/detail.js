import {reqDetailInfo} from '@/api'

const state={
  // 定义对应的数据
  detailInfo:{}//商品详情数据
}

const mutations={
  // 接收保存商品详情信息
  RECEIVE_DETAIL_INFO(state,detailInfo){
    state.detailInfo = detailInfo
  }
}

const actions={
  // 请求获取数据，传递数据
  // 获取指定skuid商品信息的异步actions
  async getDetailInfo({commit},skuId){
    const result = await reqDetailInfo(skuId)
    if(result.code===200){
      const detailInfo=result.data
      // 取出数据，提交给mutations
      commit('RECEIVE_DETAIL_INFO',detailInfo)
    }
  }
}
const getters={
  // 包含3个分类名称的对象
  getDetailInfo(state){
    return state.detailInfo.categoryView?state.detailInfo.categoryView:{}
  },
  // 包含商品信息对象
  skuInfo(state){
    return state.detailInfo.skuInfo ? state.detailInfo.skuInfo : {}
  },

  skuImageList(state){
  // 商品图片列表
  const skuInfo=state.detailInfo.skuInfo
  return skuInfo ? skuInfo.skuImageList:[]

  }

  
}

export default{
  state,
  actions,
  mutations,
  getters
}