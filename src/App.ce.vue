<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useAppStore } from './stores/app.js'

import UserCard from './components/UserCard.vue'

const appStore = useAppStore()

const fileInput = ref()
const file = ref(null)
const fetchingUsers = ref(false)

const onSelectFile = (event) => {
  const files = event.target.files
  file.value = files[0]
  console.log(files[0])
}

const process = () => {
  const formData = new FormData()
  formData.append('file', file.value)

  fetch('/api/process', {
    method: 'POST',
    body: formData
  })
}

const fetchUsers = async () => {
  fetchingUsers.value = true
  await appStore.getUsers()
  fetchingUsers.value = false
}
</script>

<template>
  <div>
    <div class="flex gap-4 w-full p-5 border rounded-md">
      <div class="w-full">
        <p class="text-lg text-gray-600">Select file</p>
        <div>
          <input type="file" ref="fileInput" @change="onSelectFile" />
          <button
            :disabled="!file"
            class="py-2 px-4 rounded shadow-sm bg-green-500 text-white"
            :class="{
              'opacity-50 cursor-not-allowed': !file
            }"
            @click="
              () => {
                console.log('hi')
                process()
              }
            "
          >
            Process
          </button>
        </div>

        <div class="flex items-center justify-between mt-5 border rounded p-2">
          <div>
            <p class="text-gray-400">Name</p>
            <p>{{ file?.name }}</p>
          </div>
          <div>
            <p class="text-gray-400">Type</p>
            <p>{{ file?.type }}</p>
          </div>
          <div>
            <p class="text-gray-400">Size</p>
            <p>{{ file?.size }}</p>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex items-center justify-between">
          <p class="text-lg text-gray-600">Users</p>
          <button
            :disabled="fetchingUsers"
            class="py-2 px-4 rounded shadow-sm border border-green-700 text-green-700"
            :class="{
              'opacity-50 cursor-not-allowed': fetchingUsers
            }"
            @click="
              () => {
                fetchUsers()
              }
            "
          >
            Get Users
          </button>
        </div>
        <div class="mt-4">
          <div
            v-if="fetchingUsers"
            class="flex items-center justify-center w-full font-bold text-2xl text-gray-500"
          >
            Loading . . .
          </div>
          <UserCard v-else v-for="user in appStore.users" :key="user.id" :user="user" />
        </div>
      </div>
    </div>
    <div class="p-4">
      <p class="flex text-lg my-2 font-bold">Route View</p>
      <nav class="flex gap-10">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <div class="border mt-5 rounded p-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
@import url('./assets/main.css');

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
