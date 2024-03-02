<template>
  <div class="container items-center align-middle w-1/5 h-1/2 p-5 border dark:default-in-dark rounded">


    <ul v-for="(card, cardId) in cards" :key="'card_'+cardId">
      <h1 class="text-xl font-bold mb-4 text-gray-600 dark:text-default-in-dark">{{card.title}}</h1>
      <form @submit.prevent="addTask(cardId)" class="mb-4">
        <input v-model="newTask" type="text" placeholder="Add a new task" class="rounded p-2 input input-bordered w-full dark:bg-default-in-dark dark:text-gray-100" />
      </form>
      <li v-for="(task, index) in card.tasks" :key="index" class="flex justify-between items-center p-2 hover:bg-gray-100">
        <div class="flex h-6 items-center">
          <input  @click="toggleCompletion(task)" :checked="task.completed"  type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
        </div>
        <span :class="{ 'line-through': task.completed }" @click="toggleCompletion(task)" class="pl-1 flex-1 cursor-pointer dark:text-default-in-dark">
          {{ task.content }}
        </span>
        <button @click="editTask(cardId,index)" class="btn btn-sm btn-warning mr-2 dark:text-default-in-dark text-sm w-4 h-4"><PencilIcon class="text-sm" /></button>
        <button @click="deleteTask(cardId,index)" class="btn btn-sm btn-erro dark:text-red-500 text-sm w-4 h-4"><TrashIcon /></button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {PencilIcon, TrashIcon} from '@heroicons/vue/24/solid'

interface Task {
  content: string;
  completed: boolean;
}

interface Card {
  title: string;
  color: string;
  tasks: Task[];
}

export default defineComponent({
  name: 'TodoCard',
  components: {
    PencilIcon,
    TrashIcon
  },
  setup() {
    const newTask = ref('');
    const cards = ref<Card[]>(JSON.parse(localStorage.getItem('cards') || '[]'));
    const saveTasks = () => {
      localStorage.setItem('cards', JSON.stringify(cards.value));
    };
    if(cards.value.length === 0) {
      cards.value.push({ title: 'Todo', color: 'blue', tasks: [] });
      saveTasks();
    }


    const addTask = (cardId: number) => {
      console.log(cardId);
      console.log(cards);
      if (!newTask.value.trim()) return;
      cards.value[cardId].tasks.push({ content: newTask.value, completed: false });
      newTask.value = '';
      saveTasks();
    };

    const editTask = (cardId: number, index: number) => {
      const newContent = prompt('Edit task:', tasks.value[index].content);
      if (newContent !== null && newContent.trim() !== '') {
        cards.value[cardId].tasks[index].content = newContent;
        saveTasks();
      }
    };

    const deleteTask = (cardId:number,index: number) => {
      cards.value[cardId].tasks.splice(index, 1);
      saveTasks();
    };

    const toggleCompletion = (task: Task) => {
      task.completed = !task.completed;
      saveTasks();
    };

    return { newTask, cards, addTask, editTask, deleteTask, toggleCompletion };
  },
});
</script>

<style scoped>
/* Add custom styles here */
</style>
