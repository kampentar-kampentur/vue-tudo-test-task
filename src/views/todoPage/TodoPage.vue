<template>
  <div class="todo-page">
    <div class="container">
      <div class="add-todo-wrapper">
        <el-input id="new-item-input" placeholder="Please input" v-model="newTodoLabel" @keypress.enter.native="addTodoItemItem" v-loading.fullscreen.lock="fullscreenLoading"/>
        <el-button id="add-new-button" type="primary" @click="addTodoItemItem" :disabled="!newTodoLabel">Add</el-button>
      </div>
      <div class="todo-items-wrapper">
        <template v-if="todoList.length">
          <TodoItem v-for="todoItem in todoList" :key="todoItem.id" :todoItem="todoItem"/>
        </template>
        <div class="no-items" v-else>No items</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem.vue'

export default {
  name: 'TodoPage',
  data() {
    return {
      newTodoLabel: '',
      userId: 1,
      fullscreenLoading: true
    }
  },
  components: {
    TodoItem
  },
  computed: {
    ...mapGetters({
      todoList: 'getAllTodoList'
    })
  },
  methods: {
    ...mapActions({
      restoreAllTodoList: 'restoreTodoList',
      addTodoItemToList: 'addTodoItemToList',
      removeTodoItemFromList: 'removeTodoItemFromList',
      changeTodoItemState: 'changeTodoItemState'
    }),
    removeTodo (id) {
      return this.removeTodoItemFromList(id)
    },
    addTodoItemItem () {
      if (!this.newTodoLabel) return
      const todo = {
        userId: this.userId,
        // fast generation UUID
        id: +new Date(),
        title: this.newTodoLabel,
        completed: false
      }
      this.newTodoLabel = ''
      this.fullscreenLoading = true
      return this.addTodoItemToList(todo)
        .then(() => {
          this.fullscreenLoading = false
        })
    },
    async init () {
      this.restoreAllTodoList(this.userId)
    }
  },
  async mounted () {
    await this.init()
    this.fullscreenLoading = false
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: block;
  margin: 0 auto;
  width: 800px;
  background-color: #fff;
  padding: 30px;
  border-radius: 30px;
}

.todo-page {
  padding: 50px;
}

.add-todo-wrapper {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px #DCDFE6 solid;
  .el-input {
    margin-right: 15px;
  }
}

.no-items {
  display: flex;
  justify-content: center;
  color: #C0C4CC;
  padding-top: 10px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
  &:not(:last-child) {
    border-bottom: 1px #EBEEF5 solid;
    padding-bottom: 5px;
  }
}
</style>