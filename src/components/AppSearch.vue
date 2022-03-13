<template>
  <div class="search subtitle">
    <label>
      Поиск
      <IconSearch class="search__icon" />
      <input
        placeholder="По названию и коду подразделения"
        class="search__input"
        :value="value"
        @input="$emit('changeSearchValue', $event.target.value)"
      />
    </label>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

import IconSearch from '@/components/icons/IconSearch.vue'

const props = defineProps({
  value: {
    default: '',
    type: String,
  },
})
const { value } = toRefs(props)
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  width: 100%;

  label {
    width: 100%;
  }

  &__icon {
    margin: 0 17px -4px 11px;
    cursor: pointer;
  }

  &__input {
    background: #ffffff;
    border: 2px solid #ebebeb;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 15px;
    max-width: 845px;
    width: 50%;
  }
}
</style>
