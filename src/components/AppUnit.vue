<template>
  <section class="unit">
    <AppSearch
      :value="searchValue"
      @changeSearchValue="changeSearchValue($event)"
    />
    {{ pageData }}
  </section>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'

import AppSearch from '@/components/AppSearch.vue'

const props = defineProps({
  data: {
    default: () => [],
    type: Array,
  },
  searchValue: {
    default: '',
    type: String,
  },
})
const { data } = toRefs(props)
const page = ref(0)
const lineInPage = 5

const pageData = computed(() =>
  data.value.slice(page.value * lineInPage, page.value + 1 * lineInPage)
)

const emit = defineEmits(['changeSearchValue'])

const changeSearchValue = (value) => {
  emit('changeSearchValue', value)
}
</script>

<style lang="scss" scoped>
.unit {
  width: 100%;
}
</style>
