<script setup lang="ts">
import { getDocs } from 'firebase/firestore';

const db = useFirestore()
const user = useCurrentUser()
const route = useRoute()

const gameId = ref(Number(route.params.id))

const reviews = await getDocs(gamesReviewsCollection(db))


// try {
//   if(!user.value) throw new Error()
//   const reviews = await getDocs(query(collection(db, 'profiles', user.value.uid, 'games_reviews'), where('game_id', '==', gameId.value)))
// } catch (error) {
  
// }
</script>

<template>
  <div v-if="!reviews.empty">
    <h1 class="title">Reviews</h1>

    <Swiper :autoplay="{
      delay: 8000,
      disableOnInteraction: true
    }" :slides-per-view="4" :space-between="20" class="main__popular-cards">
      <SwiperSlide v-for="(review, idx) in reviews.docs" :key="idx">
        <CardsReviewGamePage :review="review.data()" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>