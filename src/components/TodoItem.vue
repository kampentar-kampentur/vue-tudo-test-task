<template>
  <div class="todo-item">
    <el-checkbox class="todo-item-checkbox" @change="changeTodoItemState({ id: todoItem.id, completed: $event })" :checked="todoItem.completed">
      <el-input class="todo-item-update-input" placeholder="Please input" v-model="title" @keypress.enter.native="submitTitleEdit" @blur="submitTitleEdit" v-if="isEdit" v-focus/>
      <span class="todo-item-label" v-else>{{todoItem.title}}</span>
    </el-checkbox>
    <div class="todo-item-buttons-wrapper">
      <el-button type="primary" icon="el-icon-edit" class="todo-item-edit-btn" @click="editTodoItemLabelBtnHandler()" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
      <el-button type="warning" icon="el-icon-delete" class="todo-item-remove-btn" @click="removeTodoItemFromList(todoItem.id)"></el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  data () {
    return {
      title: this.todoItem.title,
      isEdit: false,
      fullscreenLoading: false
    }
  },
  props: {
    todoItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      removeTodoItemFromList: 'removeTodoItemFromList',
      changeTodoItemState: 'changeTodoItemState'
    }),
    editTodoItemLabelBtnHandler () {
      // show edit input
      this.isEdit = true
    },
    submitTitleEdit () {
      this.isEdit = false
      if (!this.title || this.title === this.todoItem.title) return
      this.fullscreenLoading = true
      return this.changeTodoItemState({id: this.todoItem.id, title: this.title})
        .then(() => {
          this.fullscreenLoading = false
        })
        .catch(e => console.error(e))
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  .is-checked {
    .todo-item-label {
      color: #909399;
      text-decoration: line-through;
    }
  }
}
</style>