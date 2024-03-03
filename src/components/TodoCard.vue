<template>
  <div
    class="flex space-x-2 align-middle items-center justify-center w-full h-full">


    <ul v-for="(card, cardId) in cards" :key="'card_'+cardId" @mouseover="card.inHover = true"
        @mouseleave="card.inHover = false" class="w-1/5 h-1/2 p-5 rounded border border-gray-300 shadow dark:border-default-in-dark">
      <div class="flex justify-between" v-if="!card.titleInEditMode">
      <h1 v-if="!card.titleInEditMode" class="text-xl font-bold mb-4 text-gray-600 dark:text-default-in-dark">
        {{ card.title }}</h1>
        <div>
        <button v-if="card.inHover" class="rounded ring-1 dark:ring-default-in-dark p-1 dark:text-default-in-dark text-sm"
                @click="card.titleInEditMode = true">Edit
        </button>
        </div>
      </div>
      <div class="flex space-x-2 mb-2" v-if="card.titleInEditMode">
        <input v-if="card.titleInEditMode" v-model="card.title" @blur="card.titleInEditMode = false"
               class="rounded p-2 input input-bordered w-full dark:bg-default-in-dark dark:text-gray-100" />
        <button class="rounded ring-1 dark:ring-default-in-dark p-1 dark:text-default-in-dark text-sm"
                @click="card.titleInEditMode = false">Save
        </button>
      </div>
      <form @submit.prevent="addTask(cardId)" class="mb-4">
        <input v-model="newTask" type="text" placeholder="Add a new task"
               class="rounded p-2 input input-bordered w-full dark:bg-default-in-dark dark:text-gray-100" />
      </form>
      <li v-for="(task, index) in card.tasks" :key="index"
          class="flex justify-between items-center p-2 border-b border-default-in-dark">
        <div class="flex h-6 items-center">
          <input @click="toggleCompletion(cardId,index)" :checked="task.completed" type="checkbox"
                 class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        </div>
        <span :class="{ 'line-through': task.completed }" @click="toggleCompletion(cardId,index)"
              class="pl-1 flex-1 cursor-pointer dark:text-default-in-dark">
          {{ task.content }}
        </span>
        <button v-if="card.inHover" @click="editTask(cardId,index)"
                class="btn btn-sm btn-warning mr-2 dark:text-default-in-dark text-sm w-4 h-4">
          <PencilIcon class="text-sm" />
        </button>
        <button v-if="card.inHover" @click="deleteTask(cardId,index)"
                class="btn btn-sm btn-erro dark:text-red-500 text-sm w-4 h-4">
          <TrashIcon />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCardsStore } from '@/stores/useCardsStore'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { storeToRefs } from 'pinia'


export default defineComponent({
  name: 'TodoCard',
  components: {
    PencilIcon,
    TrashIcon
  },
  setup() {
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
      cardsStore.addCard(newCard)
    }

    if (cards.value.length === 0) {
      createEmptyCard()
    }
    const addTask = (cardId: number) => {
      if (!newTask.value.trim()) return
      store.addTask(cardId, newTask.value);
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
    return { newTask, cards, addTask, editTask, deleteTask, toggleCompletion, createEmptyCard }
  }
})
</script>

<style scoped>
/* Add custom styles here */
</style>
