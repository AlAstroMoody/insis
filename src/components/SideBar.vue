<template>
  <div class="sidebar">
    <img src="@/assets/images/logo-big.png" />
    <div class="sidebar__title">виртуальная АТС</div>

    <div class="sidebar__links">
      <button
        v-for="item in menuLinks"
        :key="item.type"
        class="link sidebar__link"
        :class="{ sidebar__link_active: unit === item.type }"
        @click="unitSelection(item.type)"
      >
        {{ item.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

import { units } from '~/constants.js'

const props = defineProps({
  unit: {
    default: null,
    type: String,
  },
})
const { unit } = toRefs(props)

const menuLinks = [{ title: 'Главная', type: 'main' }, ...units]

const emit = defineEmits(['unitSelection'])
const unitSelection = (type) => {
  emit('unitSelection', type)
}
</script>
<style scoped lang="scss">
.sidebar {
  min-width: 220px;

  &__title {
    font-size: 14px;
    line-height: 20px;
    color: var(--sub-color);
  }

  &__link {
    display: block;
    padding: 21px 0;
    transition: all 0.3s;

    &_active {
      color: var(--dark-color);
    }

    &:first-child {
      padding: 42px 0 21px;
    }
  }
}
</style>
