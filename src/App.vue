<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
import './assets/main.css'
import TodoCard from '@/components/TodoCard.vue'
</script>

<template>


  <main>
    <div class="flex flex-col w-full h-screen bg-gray-200 dark:bg-gray-800">
      <ThemeToggle />
      <div class="flex justify-center items-center h-full">
        <TodoCard />
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
