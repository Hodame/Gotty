<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { GameInfoAll, Review } from '~/global';

const runtimeConfig = useRuntimeConfig()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

const gameId = ref(Number(route.params.id))
const isAddModal = ref(false)
const isEditModal = ref(false)
const userReview = ref<Review>({
  id: '',
  created_at: '',
  game_id: '',
  name: '',
  background_image: '',
  rating: 0,
  collection: '',
  text_review: '',
  user_id: ''
})

const { data: game, pending } = useLazyFetch<GameInfoAll>(() => `${runtimeConfig.public.baseUrl}/${gameId.value}`, {
  params: {
    key: runtimeConfig.public.apiKey,
  }
})

const { data: gamesReview } = await useLazyAsyncData('reviews', async () => {
  if(user.value) {
    const { data } = await supabase.from('games_review').select('*').eq('user_id', user.value.id).eq('game_id', gameId.value)

    return data as Review[]
  }

})

if(gamesReview.value !== null && gamesReview.value !== undefined) userReview.value = gamesReview.value[0]
</script>

<template>
  <div v-if="pending" class="my-6">
    <div>
      <USkeleton class="w-[350px] h-[50px]" />
      <USkeleton class="w-[50px] h-[36px] my-3" />
    </div>

    <div class="grid grid-cols-[1fr_200px] gap-10">
      <div>
        <USkeleton class="w-full h-[535px] rounded-3xl" />

        <div class="my-5">
          <USkeleton v-for="load in 5" class="w-full h-6 my-2" />
          <USkeleton class="w-44 h-6 my-2" />
        </div>
      </div>
      <div>
        <div v-for="x in 6" class="my-4">
          <USkeleton class="h-6 w-full" />
          <USkeleton class="h-5 w-28 my-3" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="my-6">
    <div class="my-4">
      <h1 class="text-5xl font-semibold">{{ game?.name }}</h1>
    </div>

    <div class="grid grid-cols-[1fr_200px] gap-10">
      <div>
        <div class="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <img :src="game?.background_image" alt="screenshots" class="aspect-[16/9] object-cover">
        </div>

        <div class="my-4">
          <div v-if="!userReview">
            <UButton @click="isAddModal = true" icon="i-heroicons-plus-20-solid" size="lg" label="Add to" block />
            <ModalsRateGame :game="{ id: game?.id, name: game?.name, background_image: game?.background_image }"
              v-model:is-modal="isAddModal" />
          </div>

          <div v-else>
            <UButton @click="isEditModal = true" icon="i-heroicons-pencil" size="lg" :label="userReview.collection"
              block />
            <ModalsRateGame :user-review="userReview"
              :game="{ id: game?.id, name: game?.name, background_image: game?.background_image }"
              v-model:is-modal="isEditModal" />
          </div>
        </div>

        <div class="my-5">
          <div v-html="game?.description" class="text-gray-900 dark:text-gray-400"></div>
        </div>

      </div>

      <GamePageInfo :game="game" />
    </div>
  </div>
  <div>
    <GamePageReviews/>
  </div>
</template>