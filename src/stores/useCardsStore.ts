// src/stores/useCardsStore.ts
import { defineStore } from 'pinia'
import type { Card, Task } from './../Interfaces/Cards';


export const useCardsStore = defineStore('cards', {
  state: () => ({
    cards: loadInitialCards(),
  }),
  actions: {
    addCard(card: Card) {
      this.cards.push(card);
      this.saveCards();
    },
    addTask(cardIndex: number, taskContent: string) {
      const newTask: Task = {
        content: taskContent,
        completed: false,
      };
      this.cards[cardIndex].tasks.push(newTask);
      this.saveCards();
    },
    updateTask(cardIndex: number, taskIndex: number, newContent: string) {
      this.cards[cardIndex].tasks[taskIndex].content = newContent;
      this.saveCards();
    },
    deleteTask(cardIndex: number, taskIndex: number) {
      this.cards[cardIndex].tasks.splice(taskIndex, 1);
      this.saveCards();
    },
    toggleTaskCompletion(cardIndex: number, taskIndex: number) {
      const task = this.cards[cardIndex].tasks[taskIndex];
      task.completed = !task.completed;
      this.saveCards();
    },
    saveCards() {
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },
  },
});

function loadInitialCards(): Card[] {
  const cardsFromStorage = localStorage.getItem('cards');
  if (cardsFromStorage) {
    return JSON.parse(cardsFromStorage);
  } else {
    const defaultCard: Card = {
      title: 'Todo',
      color: 'bg-gray-200', // This is a default color, adjust as needed
      tasks: [],
      inHover: false,
      titleInEditMode: true,
    };
    return [defaultCard];
  }
}
