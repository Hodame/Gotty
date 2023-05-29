<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const isDark = useDark()
const tabs = ref([
  'Main',
  'My games',
  'Popular',
  'Settings',
])

const toggleDark = useToggle(isDark)

</script>

<template>
  <div class="sidebar">
      <div class="sidebar__list">
        <RouterLink :to="{ name: tab}" v-for="(tab, idx) in tabs" :key="idx" class="sidebar__list-item" :class="{ selected: route.name === tab}">
            <span>{{ tab }}</span>
        </RouterLink>
      </div>
      <div class="sidebar__footer">
        <div @click="toggleDark()" class="sidebar__dark-mode">
          darkmode
        </div>
        
      </div>
      
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  border-right: 1px solid var(--light);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  &__list {
    margin: 10px 0px;
    flex: 1 1 100%;
  }
  &__list-item {
    display: block;
    font-weight: 600;
    line-height: 150%;
    padding: 12px 8px;
    border-radius: 4px;
    &.selected {
      background-color: var(--light);
      color: var(--primary);
    }
  }
  &__dark-mode {

  }
}

html.dark .sidebar {
  border-right: none;
}

</style>