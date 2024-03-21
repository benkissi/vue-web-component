import { defineStore, createPinia, setActivePinia } from 'pinia'

setActivePinia(createPinia())

export const useAppStore = defineStore('counter', {
  state: () => ({
    users: [{ id: 1, name: 'Ben' }]
  }),
  getters: {},
  actions: {
    async getUsers() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      this.users = data
    }
  }
})
