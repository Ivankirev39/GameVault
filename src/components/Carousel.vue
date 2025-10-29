<template>
  <div>
    <div class="flex items-center justify-between">
      <slot name="header"></slot>
      <div class="flex w-[250px] h-[60px] items-center justify-between rounded-md bg-[#121212] p-2">
        <button
          class="cursor-pointer rounded-md bg-[#1a1a1a] p-2"
          @click="prevPage"
          :disabled="currentPage === 0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#f4f4f4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="flex items-center space-x-2">
          <span
            v-for="n in totalPages"
            :key="n"
            :class="[
              'h-2',
              n - 1 === currentPage ? 'w-8 bg-[#A80ADD]' : 'w-5 bg-gray-700',
              'rounded-full'
            ]"
          ></span>
        </div>
        <button
          class="cursor-pointer rounded-md bg-[#1a1a1a] p-2"
          @click="nextPage"
          :disabled="currentPage === totalPages - 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#f4f4f4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex flex-wrap gap-5 mt-4">
      <slot :pagedItems="pagedItems"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  pageSize: { type: Number, default: 4 }
})

const currentPage = ref(0)

const totalPages = computed(() =>
  Math.ceil(props.items.length / props.pageSize)
)

const pagedItems = computed(() => {
  const start = currentPage.value * props.pageSize
  return props.items.slice(start, start + props.pageSize)
})

function prevPage() {
  if (currentPage.value > 0) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
}

// Reset page if items change
watch(() => props.items, () => {
  currentPage.value = 0
})
</script>
