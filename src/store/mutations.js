export default {
  'updateTodoList'(state, payload) {
    Object.assign(state, { todoList: payload })
  },
  'updateTodoItem'(state, payload) {
    Object.assign(state.todoList[payload.index], payload.todoItem)
  }
}
