<script  lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Switch } from '@headlessui/vue'
import {MoonIcon, SunIcon} from '@heroicons/vue/24/solid'

export default defineComponent({
  name: 'ThemeToggle',
  components: {
    Switch,
    MoonIcon,
    SunIcon
  },
  setup() {
    const isDarkMode = ref(false);

    const toggleDarkMode = (value: any) => {
      console.log(value)
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value.toString());
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Check and apply theme on component mount
    onMounted(() => {
      isDarkMode.value = localStorage.getItem('darkMode') === 'true';
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
      }
    });

    return { isDarkMode, toggleDarkMode };
  },
});
</script>

<template>
  <Switch @click="toggleDarkMode" :class="[isDarkMode ? 'bg-indigo-600' : 'bg-gray-200', 'right-2  inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-2']">
    <span class="sr-only">Use setting</span>
    <span :class="[isDarkMode ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
      <span :class="[isDarkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
        <MoonIcon></MoonIcon>
      </span>
      <span :class="[isDarkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
      <SunIcon class="text-indigo-800"></SunIcon>
      </span>
    </span>
  </Switch>
</template>

<style scoped>

</style>