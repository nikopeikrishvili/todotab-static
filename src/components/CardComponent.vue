<script setup lang="ts">

import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'
import type { Card, Task } from '@/Interfaces/Cards'
import { useCardsStore } from '@/stores/useCardsStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

defineProps<{
  card: Card
  cardId: number
}>()
const title = ref('');
const store = useCardsStore()
const newTask = ref('')
const { cards } = storeToRefs(store)
const saveTasks = () => {
  store.saveCards()
}


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

if (cards.value.length === 0) {
  createEmptyCard()
}
const addTask = (cardId: number) => {
  if (!newTask.value.trim()) return
  store.addTask(cardId, newTask.value);
  newTask.value = '';
}

const editTask = (cardId: number, index: number) => {
  const task = cards.value[cardId].tasks[index].content
  const newContent = prompt('Edit task:', task)
  if (newContent !== null && newContent.trim() !== '') {
    store.updateTask(cardId, index, newContent);
  }
}

const deleteTask = (cardId: number, index: number) => {
  store.deleteTask(cardId, index);
}

const toggleCompletion = (cardId: number, taskId: number) => {
  store.toggleTaskCompletion(cardId, taskId);
}

const setTitleEditMode = (cardId: number, mode: boolean) => {
  const card = cards.value[cardId]
  card.titleInEditMode = mode;
  if(mode){
    title.value = card.title;
  }
  else{
    card.title = title.value;
  }
  store.updateCard(cardId, card);
}
</script>

<template>
  <div class="flex justify-between" v-if="!card.titleInEditMode">
    <h1 v-if="!card.titleInEditMode" class="text-xl font-bold mb-4 text-gray-600 dark:text-default-in-dark">
      {{ card.title }}</h1>
    <div>
      <button v-if="card.inHover" class="rounded ring-1 dark:ring-default-in-dark p-1 dark:text-default-in-dark text-xs"
              @click="setTitleEditMode(cardId, true)">Edit
      </button>
    </div>
  </div>
  <div class="flex space-x-2 mb-2" v-if="card.titleInEditMode">
    <input v-if="card.titleInEditMode" v-model="title" @blur="setTitleEditMode(cardId, false)"
           class="rounded p-1 input input-bordered w-full dark:bg-default-input-dark text-sm dark:text-gray-100" />
    <button class="rounded ring-1 dark:ring-default-in-dark p-1 dark:text-default-in-dark text-xs"
            @click="setTitleEditMode(cardId, false)">Save
    </button>
  </div>
  <form @submit.prevent="addTask(cardId)" class="mb-4">
    <input v-model="newTask" type="text" placeholder="> Add a new task"
           class="rounded p-1 input input-bordered w-full dark:bg-default-input-dark text-sm dark:text-gray-100" />
  </form>
  <ul>
    <li v-for="(task, index) in card.tasks" :key="index"
        class="flex justify-between items-center p-2 border-b border-default-in-dark">
      <div class="flex h-6 items-center">
        <input @click="toggleCompletion(cardId,index)" :checked="task.completed" type="checkbox"
               class="h-4 w-4 rounded  dark:bg-default-input-dark dark:text-gray-100" />
      </div>
      <span :class="{ 'line-through': task.completed }" @click="toggleCompletion(cardId,index)"
            class="pl-1 flex-1 cursor-pointer dark:text-default-in-dark text-xs">
          {{ task.content }}
        </span>
      <button v-if="card.inHover" @click="editTask(cardId,index)"
              class="btn btn-sm btn-warning mr-2 dark:text-default-in-dark text-xs w-4 h-4">
        <PencilIcon class="text-xs" />
      </button>
      <button v-if="card.inHover" @click="deleteTask(cardId,index)"
              class="btn btn-sm btn-error dark:text-red-500 text-xs w-4 h-4">
        <TrashIcon />
      </button>
    </li>
  </ul>
</template>

<style scoped>

</style>