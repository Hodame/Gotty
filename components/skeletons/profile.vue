<template>
  <div>
    <div class="flex ga-3 justify-between items-center">
      <div class="flex">
        <USkeleton class="w-[56px] h-[56px] rounded-[50%] mr-2" />
        <div>
          <USkeleton class="w-[170px] h-7 mb-2" />
          <USkeleton class="w-[60px] h-5" />
        </div>
      </div>

      <div>
        <USkeleton class="w-[500px] h-[72px]" />
      </div>
    </div>

    <div class="my-6">
      <USkeleton class="w-[200px] h-[50px] mb-7"/>

      <div class="flex gap-4">
        <USkeleton v-for="item in 3"  class="rounded-xl w-[376px] h-[210px]"/>
      </div>
    </div>

    <div class="my-6">
      <USkeleton class="w-[200px] h-[50px] mb-7"/>

      <div class="flex gap-4">
        <USkeleton v-for="item in 3"  class="rounded-xl w-[376px] h-[210px]"/>
      </div>
    </div>
    
    <div class="my-6">
      <USkeleton class="w-[200px] h-[50px] mb-7"/>

      <div class="flex gap-4">
        <USkeleton v-for="item in 3"  class="rounded-xl w-[376px] h-[210px]"/>
      </div>
    </div>
  </div>
</template>