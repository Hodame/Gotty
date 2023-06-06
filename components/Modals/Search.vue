<script setup lang="ts">
import { UseImage } from "@vueuse/components";
import { PageableList, GameCardInfo } from '~/global';

defineEmits<{
  (e: 'closeModal'): void
}>()

const runtimeConfig = useRuntimeConfig()

const searchKeyword = ref('')
const searchResults = ref<PageableList<GameCardInfo> | null>(null)
const searchLoading = ref(false)

const gamesPoster = ref([{
  poster: '',
  isLoading: false
}])

watchDebounced(searchKeyword, async () => {
  if (searchKeyword.value.length > 0) {
    searchLoading.value = true
    const { data } = await useLazyFetch<PageableList<GameCardInfo>>(() => runtimeConfig.public.baseUrl, {
      params: {
        key: runtimeConfig.public.apiKey,
        search: searchKeyword.value,
        page_size: 6
      }
    })
    searchLoading.value = false
    if (data.value !== null) searchResults.value = data.value
  }
  else {
    searchResults.value = null
  }
}, { debounce: 400 })

</script>

<template>
  <UCard :ui="{ divide: '', body: { padding: 'px-4 pb-5' } }">
    <template #header>
      <UInput :loading="searchLoading" v-model="searchKeyword" placeholder="Search"
        icon="i-heroicons-magnifying-glass-20-solid" />
    </template>

    <div>
      <div v-if="searchResults !== null">
        <div v-if="searchResults.count !== 0" v-for="(game, idx) in           searchResults?.results          " :key="idx">
          <UButton :to="`/game/${game.id}`" @click="$emit('closeModal'); searchKeyword = ''" class="w-full"
            variant="link">
            <UseImage v-if="game.background_image" :src=" game.background_image " class="object-cover w-12 aspect-3-4 rounded-lg border border-color"
              :alt=" game.name ">
              <template #loading>
                <USkeleton class="w-12 aspect-3-4 border border-color" />
              </template>
            </UseImage>
            <div v-else class="w-12 aspect-3-4 border border-color rounded-lg flex justify-center items-center">
              <UIcon name="i-heroicons-photo" class="w-6 h-6"/>
            </div>
            <h1 class="text-lg ml-3">{{ game.name }}</h1>
          </UButton>
        </div>
        <div v-else class="text-center py-24">
          We couldn't find something  
        </div>
      </div>
      <div v-else class="py-24 flex items-center justify-center gap-2">
        <UIcon name="i-heroicons-magnifying-glass"/>
        <span>Start typing to search</span>
      </div>
    </div>
  </UCard>
</template>