<template>
  <div>
    <h1>EventTest组件</h1>

    <!-- 原生事件 -->
    <button @click="test1">测试原生事件</button>
    <hr>
    <!-- 在组件中绑定原生事件监听，需要加.native -->
     <!-- <Event1 @click="test2"/> -->
     <!-- $event:为浏览器分发指定的数据event对象 -->
    <Event1 @click.native="test2($event)"/>
   
    <hr>
    <!-- 绑定的是自定义事件监听，自定义事件监听触发是执行$emit来触发组件对象来调用$emit -->
    <!-- $event：为分发事件是指定的数据 --> 
    <Event2 @clik='test3($event)'/>
     <!-- 加($event)和不加效果是一样的 -->
    <Event2 @clik='test3'/>
    <!-- 可以触发任意事件名事件，因为是自定义事件 -->
    <Event2 @xxx='test4($event)'/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    methods: {
      test1(event){
        // 读取标签中的文本   event事件对象  target当前属性  innerHTML读取文本
        alert(event.target.innerHTML)
      },
      test2(event){
        // alert('组件绑定原生事件监听')
        alert(event.target.innerHTML)
      },
      test3(data){
        alert('响应自定义事件，'+data)
      },
      test4(data){
         alert('响应自定义事件，'+data)
      }
    },


    components: {
      Event1,
      Event2,
    },

  }
</script>
