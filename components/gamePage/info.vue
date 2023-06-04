<script setup lang="ts">
import { GameInfoAll } from '~/global';

defineProps<{
  game: GameInfoAll | null
}>()

const items = ref({
  
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="font-semibold">Platform</h1>
      <ul class="my-1">
        <li v-for="(platform, idx) in game?.platforms" :key="idx" class="text-gray-700 dark:text-gray-400 inline">{{
          platform.platform.name + " " }}</li>
      </ul>
    </div>

    <div>
      <h1 class="font-semibold">Play time</h1>
      <p class="text-gray-700 dark:text-gray-400 inline">{{ game?.playtime === 0 ? '-' : game?.playtime + 'hours' }}</p>
    </div>

    <div>
      <h1 class="font-semibold">Release date</h1>
      <p class="text-gray-700 dark:text-gray-400 inline">{{ game?.released ? useDateFormat(game?.released, 'MMM D, YYYY', { locales: 'en-US' }).value : '-' }}</p>
    </div>

    <div>
      <h1 class="font-semibold">Genres</h1>
      <ul>
        <li v-for="(genre, idx) in game?.genres" :key="idx" class="text-gray-700 dark:text-gray-400 inline">{{ genre.name + " " }}</li>
      </ul>
    </div>

    <div>
      <h1 class="font-semibold">Developer</h1>
      <ul>
        <li v-for="(dev, idx) in game?.developers" class="text-gray-700 dark:text-gray-400 inline">{{ dev.name }}</li>
      </ul>
    </div>

    <div>
      <h1 class="font-semibold">Publisher</h1>
      <ul>
        <li v-for="(pub, idx) in game?.publishers" class="text-gray-700 dark:text-gray-400 inline">{{ pub.name }}</li>
      </ul>
    </div>
  </div>
</template>