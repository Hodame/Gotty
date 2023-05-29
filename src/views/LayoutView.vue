<script setup lang="ts">
import SidebarComponent from "@/components/SidebarComponent.vue";
import InfinityScrollView from "./InfinityScrollView.vue";

</script>

<template>
  <div class="layout">
    <SidebarComponent/>
    <div class="layout__body">
      <!-- <RouterView/> -->
      <InfinityScrollView/>
    </div>
  </div>
</template> 

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-columns: 325px 1fr;

  &__body {
    padding: 32px;
  }
}
</style>