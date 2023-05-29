<script setup lang="ts">
import CustomSearchbar from '@/components/custom/CustomSearchbar.vue';
import { ref } from 'vue';
const searchBar = ref('')

</script>

<template>
  <div class="main">
    <div class="main__header">
      <CustomSearchbar v-model="searchBar"/>
    </div>
    
  </div>
</template> 

<style scoped lang="scss">

</style>