// header组件
<template>
  <div>
    <div>{{ addTodo }}，你好世界</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addTodo: ""
      }
    },
    created() {
      this.$pcBus.on('add-todo', (val) => {
        this.addTodo = val
      });
    }
  }
</script>
