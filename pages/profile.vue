<script setup lang="ts">
const user = useUser()
</script>

<template>
	<div>
		<div class="flex justify-between">
			<div>
				<UAvatar :src="user.user_metadata.avatar" :alt="user.user_metadata.nickname"/>
				<p>{{ user.user_metadata.nickname }}</p>
			</div>

			<div class="grid grid-cols-4 gap-6">
				<div>
					<h1>Games</h1>
					<p>{{ user.user_metadata.games }}</p>
				</div>

				<div>
					<h1>Playing</h1>
					<p>{{ user.user_metadata.playing }}</p>
				</div>

				<div>
					<h1>Want</h1>
					<p>{{ user.user_metadata.want }}</p>
				</div>

				<div>
					<h1>Beaten</h1>
					<p>{{ user.user_metadata.beaten }}</p>
				</div>
			</div>
		</div>
	</div>
</template>