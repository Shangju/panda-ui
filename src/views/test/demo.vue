// footer组件
<template>
  <div>
    <div @click="send()">dsad</div>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        userName:null,
        newTodoText:''
      }
    },
    methods: {
      send () {
        this.newTodoText = 'hello world'
        this.$pcBus.emit('add-todo', this.newTodoText );

      },
    }
  }
</script>
