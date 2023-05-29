<script setup lang="ts">
import { GameResultInfo } from '@/global';

const props = defineProps<{
	gameInfo: GameResultInfo
}>()

console.log(props.gameInfo);

</script>

<template>
	<div class="game-card-small">
		<div class="game-card-small__poster"><img :src="gameInfo.background_image ? gameInfo.background_image : ''" alt="poster"></div>
		<div class="game-card-small__info">
			<div class="game-card-small__game-name">{{ gameInfo.name }}</div>
			<div class="game-card-small__game-metacritic">{{ gameInfo.metacritic }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.game-card-small {

&__poster {

	img {
		width: 200px;
		aspect-ratio: 174 / 233;
		object-fit: cover;
	}
}

&__info {
}

&__game-name {
}

&__game-metacritic {
}
}

</style>