<script setup lang="ts">
import SearchIcon from '@/assets/icons/SearchIcon.vue';

type Props = {
  modelValue?: string
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'update:modelValue', v: Props['modelValue']): void
}>()

const inputModel = (e: Event) => {
  if(e.target != null) {
    emits('update:modelValue', (e.target as HTMLTextAreaElement).value)
  }
}
</script>

<template>
  <div class="custom-searchbar">
    <div class="custom-searchbar__icon"><SearchIcon/></div>
    <input @input="inputModel" placeholder="Search" type="text">
  </div>
</template>

<style scoped lang="scss">
.custom-searchbar {
  width: 230px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  &__icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  input {
    padding: 5px 10px 5px 35px;
    width: 100%;
    height: 100%;
  }
}
</style>