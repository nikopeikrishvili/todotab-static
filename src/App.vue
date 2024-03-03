<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
import './assets/main.css'
import TodoCard from '@/components/TodoCard.vue'
import { useCardsStore } from '@/stores/useCardsStore'


const store = useCardsStore()
const createEmptyCard = () => {
  const newCard = {
    title: 'New Card',
    color: 'bg-blue-200',
    tasks: [],
    inHover: false,
    titleInEditMode: true
  }
  store.addCard(newCard)
}
</script>

<template>


  <main>
    <div class="flex flex-col w-full h-screen bg-gray-200 dark:bg-gray-800">
      <div class="flex items-center gap-4 justify-end h-12">
        <span>
          <button class="rounded ring-1 dark:ring-default-in-dark p-1 dark:text-default-in-dark text-sm" @click="createEmptyCard()">Add new card</button>
        </span>
        <span class="mr-4">
        <ThemeToggle />
        </span>
      </div>
      <div class="flex justify-center items-center h-full">
        <TodoCard />
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
