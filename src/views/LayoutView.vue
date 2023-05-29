<script setup lang="ts">
import SidebarComponent from "@/components/SidebarComponent.vue";

</script>

<template>
  <div class="layout">
    <SidebarComponent/>
    <div class="layout__body">
      <RouterView/>
    </div>
  </div>
</template> 

<style scoped lang="scss">
.layout {
  height: 100%;
  display: grid;
  grid-template-columns: 325px 1fr;

  &__body {
    padding: 32px;
  }
}
</style>