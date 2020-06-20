<template>
  <div>
    小明的爸爸现在有{{money}}元
    
    <h2>不使用sync修改符</h2>
    <!-- $event获取数据，自定义事件的数据-->
     <Child :money='money' @update:money="money=$event"/>
     <br>
    <h2>使用sync修改符</h2>
    <!-- sync同步：告诉子组件把数据同步到父组件里边来，实现了子向父的同步 -->
    <!-- :money可以实现父向子通信传递数据，.sync可以实现子向父通信传递数据 ===> 实现了双向的同步通信-->
     <Child :money.sync='money' />
     <br>

    <h2>使用v-model修改符</h2>
     <Child2 v-model='money' />

    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',
    data(){
      return{
        money:1000
      }

    },
    components: {
      Child,
      Child2
    }
  }
</script>
