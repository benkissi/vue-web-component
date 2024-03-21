<script setup>
import { defineProps } from 'vue'

defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="p-2 border rounded-md shadow-md">
    <div class="font-bold">{{ user.name }}</div>
    <div class="flex flex-wrap gap-4 mt-2">
      <div>
        <p class="text-gray-400">Phone</p>
        <p>{{ user.phone }}</p>
      </div>
      <div>
        <p class="text-gray-400">Email</p>
        <p>{{ user.email }}</p>
      </div>

      <div>
        <p class="text-gray-400">Company</p>
        <p>{{ user?.company?.name }}</p>
      </div>
    </div>
  </div>
</template>
