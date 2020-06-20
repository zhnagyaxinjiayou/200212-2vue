<template>
  <div style="background: #ccc; height: 80px;">
    <h2>Event2组件</h2>
    <!-- 原生的  自定义的clik事件，传递一个数据给他atguigu-->
    <!-- 分发事件传递的数据会自动交给事件监听的回调函数 -->
    <button @click="$emit('clik','atguigu')">分发自定义click事件</button><br>
    <button @click="$emit('xxx',{m:1})">分发自定义xxx事件</button><br>
  </div>
</template>
