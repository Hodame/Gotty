<script setup lang="ts">
import { useAxiosService } from '@/api/service';
import GameCardSmall from '@/components/GameCardSmall.vue';
import CustomSearchbar from '@/components/custom/CustomSearchbar.vue';
import { GameResultInfo, PagableList } from '@/global';
import { useInfiniteScroll, useOffsetPagination } from '@vueuse/core';
import { onMounted, ref } from 'vue';


const searchBar = ref('')
const trends = ref<HTMLElement | null>(null)
const games = ref<PagableList<GameResultInfo>>({
  count: 0,
  next: '',
  previous: '',
  results: [{
    id: '',
    name: '',
    background_image: '',
    metacritic: ''
  }]
})


onMounted(async () => {
  games.value = await useAxiosService().get<PagableList<GameResultInfo>>('/games')

  console.log(games.value);
  
})
</script>

<template>
  <div class="main">
    <div class="main__header">
      <CustomSearchbar v-model="searchBar"/>
    </div>
    <div ref="trends" class="main__trends">
      <div v-for="(game, idx) in games.results" :key="idx" class="main__trend">
        <GameCardSmall :game-info="game"/>
      </div>
    </div>
    
    
  </div>
</template> 

<style scoped lang="scss">
.main {
}
.main__header {
}
.main__trends {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.main__trend {
}
</style>