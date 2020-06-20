<template>
  <div>
    <h2>深入v-model</h2>
  <!-- 原生标签上的v-model的本质：动态value属性和原生input事件监听 -->
    <input type="text" v-model="name1">
    <span>{{name1}}</span>
    <br>

    <!-- 不使用v-model如何实现双向绑定 -->
    <!-- 1.动态的value值，实现单项数据绑定，初始显示了，但是改变输入没有变化-->
    <!-- <input type="text" :value="name2" > -->
    <!-- 2.绑定原生的input事件监听，在监听的回调里给name2重新赋值，赋当前input的value -->
    <input type="text" :value="name2" @input="name2=$event.target.value">
    <span>{{name2}}</span>
    <br>

  <!-- 
    组件标签上的v-model的本质：动态value属性和自定义input事件监听
   -->

   <CustomInput v-model="name3"/>
   <span>{{name3}}</span>
   <br>

   <!-- 本质 -->
   <!-- @input是自定的监听  $event是数据，自定义的数据是由谁传过来的呢：是子组件传过来的-->
   <!-- @input="$event"  把$event(自定义事件数据)赋值给name4变量 -->

   <!-- 父向子通信 -->
  <CustomInput :value='name4' @input="name4=$event"/>
   <span>{{name4}}</span>






  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    data(){
      return{
        name1:'桂花味可乐',
        name2:'我要喝',
        name3:'组件标签',
        name4:'组件标签本质'
      }
    },
    name: 'ModelTest',
    components: {
      CustomInput
    }
  }
</script>
