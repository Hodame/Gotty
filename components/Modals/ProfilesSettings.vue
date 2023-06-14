<script setup lang="ts">
import { updateProfile } from 'firebase/auth';
import { uploadString, ref as storageRef, getStorage, getDownloadURL } from 'firebase/storage';
import { useFirebaseStorage } from 'vuefire';

const props = defineProps<{
	isModal: boolean
}
>()
const emits = defineEmits<{
	(e: 'update:isModal', v: boolean): void
}>()

const value = computed({
	get() {
		return props.isModal
	},
	set(value: boolean) {
		emits('update:isModal', value)
	}
})

const firebase = useFirebaseApp()
const storage = useFirebaseStorage()
const user = useCurrentUser()

const { open, files, reset, onChange} = useFileDialog({ multiple: false })

onChange(async function (files) {
	const avatarRef = storageRef(storage, 'user_avatars/' + user.value?.uid)
	const userAvatar = files?.item(0)
	
	if(files !== null && userAvatar !== null && userAvatar !== undefined) {		
		const { base64: file } = useBase64(userAvatar)

		watch(file, async function () {	
			uploadString(avatarRef, file.value,  'data_url').then(async function (newAvatar) {			
				const link = await getDownloadURL(newAvatar.ref)
					
				updateProfile(user.value!, { 
					photoURL: link
				})
			})		
		})
		
	} 
})
</script>

<template>
	<UModal v-model="value">
		<UCard>
			<template #header>
				<div class="flex justify-between items-center">
					<p class="text-lg font-semibold">Update profile</p>

					<UButton @click="$emit('update:isModal', false)" icon="i-heroicons-x-mark-20-solid" size="sm" color="primary"
						square variant="solid" />
				</div>
			</template>

			<div>
				<div class="grid grid-cols-2 gap-4">
					<UFormGroup label="Email">
						<UInput disabled icon="i-heroicons-envelope" />
					</UFormGroup>
					<UFormGroup label="Nickname" hint="Must be unique">
						<UInput icon="i-heroicons-user" />
					</UFormGroup>
					<UFormGroup label="Discord id">
						<UInput placeholder="john#4021" icon="i-bi-discord" />
					</UFormGroup>
					<UFormGroup label="Steam id">
						<UInput icon="i-bi-steam" />
					</UFormGroup>
					<UTextarea placeholder="Your bio" :rows="4" class="col-span-full" />

					<div class="col-span-full flex items-center gap-4">
						<UAvatar size="xl" :src="user!.photoURL ? user!.photoURL : ''" :alt="user!.displayName ? user!.displayName : '...'"/>
						<UButton @click="open" label="Upload file"/>
					</div>
				</div>
			</div>

			<template #footer>

			</template>
		</UCard>
	</UModal>
</template>