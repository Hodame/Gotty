<script setup lang="ts">
defineProps<{
  btnText: string
}>()
</script>

<template>
  <button class="custom-button">
    <div class="custom-button__icon-left">
      <slot name="iconLeft"/>
    </div>
    <p>{{ btnText }}</p>
    <div class="custom-button__icon-right">
      <slot name="iconRight"/>
    </div>
  </button>
</template>

<style scoped lang="scss">
  .custom-button {
    background-color: var(--primary);
    border-radius: 10px;
    padding: 17px 20px;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &__icon-left{
      margin-right: 13px;
      stroke: var(--white);
    }
    &__icon-right {
      margin-left: 13px;
      stroke: var(--white);
    }

    p {
      color: var(--white);
      font-size: 18px;
      font-weight: 700;
      line-height: 120%;
    }
    
    &:hover {
      background-color: var(--primary-light);
    }
    &:active {
      background-color: var(--primary-dark);
    }
    &[disabled] {
      background-color: var(--grey-2);
      cursor: default;

      .custom-button__icon-left {
      stroke: var(--grey);
      }
      .custom-button__icon-right {
        stroke: var(--grey);
      }

      p {
        color: var(--grey);
      }
    }
  }
</style>