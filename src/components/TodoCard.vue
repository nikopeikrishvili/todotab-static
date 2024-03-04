<template>
  <div
    class="flex space-x-2 align-middle items-center justify-center w-full h-full">


    <div v-for="(card, cardId) in cards" :key="'card_'+cardId" @mouseover="card.inHover = true"
        @mouseleave="card.inHover = false" class="w-1/5 h-1/2 p-5 rounded border border-gray-300 shadow dark:border-default-in-dark">
        <CardComponent :card-id="cardId" :card="card" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCardsStore } from '@/stores/useCardsStore'
import { storeToRefs } from 'pinia'
import CardComponent from '@/components/CardComponent.vue'


export default defineComponent({
  name: 'TodoCard',
  components: {
    CardComponent
  },
  setup() {
    const store = useCardsStore()
    const newTask = ref('')
    const { cards } = storeToRefs(store)
    return {  cards }
  }
})
</script>

<style scoped>
/* Add custom styles here */
</style>
