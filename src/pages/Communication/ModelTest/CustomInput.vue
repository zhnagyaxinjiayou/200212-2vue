<template>
  <div style="background: #ccc; height: 50px;">
    <h2>input包装组件</h2>
    <!-- 子向父通信  input分发，数据是读取输入框最新的值，读取方法$event.target.value-->
    <input type="text" :value='value' @input="$emit( 'input',$event.target.value )">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['value'],
    name: 'CustomInput',
  }
</script>
