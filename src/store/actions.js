/* eslint-disable */
import { getAllTodoList, addTodoItemToListItem, deleteTodoFromList, changeTodoItem } from '@/api/todo'

export default {
  async 'restoreTodoList' (context, payload) {
    let response = await getAllTodoList (payload)
    context.commit('updateTodoList', response.data)
  },
  async 'addTodoItemToList' (context, payload) {
    await addTodoItemToListItem(payload)
    const todoList = [...context.state.todoList, payload]
    context.commit('updateTodoList', todoList)
  },
  async 'removeTodoItemFromList' (context, payload) {
    const todoList = [...context.state.todoList ]
    const index = todoList.findIndex(el => el.id === payload)
    if (index === -1) return
    await deleteTodoFromList(payload)
    todoList.splice(index, 1)
    context.commit('updateTodoList', todoList)
  },
  async 'changeTodoItemState' (context, payload) {
    const todoList = [ ...context.state.todoList ]
    const index = todoList.findIndex(el => el.id === payload.id)
    if (index === -1) return
    await changeTodoItem(payload)
    context.commit('updateTodoItem', { index, todoItem: payload})
  }
}
