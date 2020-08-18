import router from '@/router'
import TodoPage from './TodoPage.vue'

// Setup routes
export default () => {
  router.addRoutes([
    {
      path: '/',
      name: 'todo-page',
      component: TodoPage
    }
  ])
}