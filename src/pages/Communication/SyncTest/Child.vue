<template>
  <div style="background: #ccc; height: 50px;">
    <span>小明每次花100元</span>
    <!-- 子向父通信，指定一个自定义的属性名，告诉父亲更新:更新的是谁 -->
    <button @click="$emit('update:money',money-100)">花钱</button>
    爸爸还剩 {{money}} 元
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['money'],
    name: 'Child'
  }
</script>
