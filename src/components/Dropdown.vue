<template>
  <div class="relative">
    <button
      @click="toggle"
      class="inline-flex items-center rounded-lg border-2 border-[#A80ADD] bg-[#121212] px-5 py-2.5 text-center text-lg font-medium text-[#f4f4f4]"
      type="button"
    >
      {{ selectedLabel || placeholder }}
      <svg class="ms-3 h-5 w-5 text-[#A80ADD]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>
    <div
      v-if="open"
      class="absolute z-10 mt-2 w-56 divide-y divide-gray-100 rounded-lg bg-gray-900 shadow-lg"
    >
      <ul class="py-2 text-sm text-gray-200">
        <li v-if="showAllOption">
          <button
            @click="select(null, allLabel)"
            class="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
          >
            {{ allLabel }}
          </button>
        </li>
        <li v-for="option in options" :key="option.id ?? option.value">
          <button
            @click="select(option.id ?? option.value, option.name)"
            class="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
          >
            {{ option.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  options: { type: Array, required: true }, // [{ id, name }] or [{ value, name }]
  selected: { type: [String, Number, null], default: null },
  selectedLabel: { type: String, default: '' },
  placeholder: { type: String, default: 'Select' },
  showAllOption: { type: Boolean, default: false },
  allLabel: { type: String, default: 'All' }
})

const emit = defineEmits(['select'])

const open = ref(false)

const toggle = () => {
  open.value = !open.value
}

const select = (id, name) => {
  emit('select', id, name)
  open.value = false
}

// Close dropdown on outside click
const onClickOutside = (e) => {
  if (!e.target.closest('.relative')) open.value = false
}
watch(open, (val) => {
  if (val) window.addEventListener('click', onClickOutside)
  else window.removeEventListener('click', onClickOutside) // change to use Vue own event handling
})
</script>
