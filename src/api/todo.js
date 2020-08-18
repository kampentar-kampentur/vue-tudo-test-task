import { jsonPlaceholderAPI } from '../api'

export const getAllTodoList = userId => jsonPlaceholderAPI.get(`/users/${userId}/todos`)
export const addTodoItemToListItem = todoItem => jsonPlaceholderAPI.post(`/todos`, todoItem)
export const deleteTodoFromList = todoId => jsonPlaceholderAPI.delete(`/todos/${todoId}`)
export const changeTodoItem = todoItem => jsonPlaceholderAPI.put('/todos/1', todoItem)
