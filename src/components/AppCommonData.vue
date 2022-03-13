<template>
  <section class="common">
    <div class="common__main">
      <div class="common__info">
        <div class="subtitle">Общие данные</div>
        <div class="common__units" v-if="isShowGraph">
          <div v-for="unit in units" :key="unit.type" class="common__unit body">
            <div class="number">{{ unitCount[unit.type] || 0 }}</div>
            <span class="common__body">{{ unit.title }}</span>
            <div class="common__link" @click="unitSelection(unit.type)">
              <IconArrow class="common__arrow" />
              Перейти
            </div>
          </div>
        </div>
        <div v-else class="common__error">Совпадений нет</div>
      </div>
      <AppSearch
        class="common__search"
        :value="searchValue"
        @changeSearchValue="changeSearchValue($event)"
      />
      <AppDiagram
        :labels="unitList"
        :values="unitValues"
        :colors="graphColors"
        type="BarChart"
        v-if="isShowGraph"
        class="common__bar"
      />
    </div>
    <AppDiagram
      :labels="unitList"
      :values="unitValues"
      :colors="graphColors"
      type="DoughnutChart"
      v-if="isShowGraph"
      class="common__doughnut"
    />
  </section>
</template>

<script setup>
import { computed, toRefs } from 'vue'

import AppSearch from './AppSearch.vue'

import AppDiagram from '@/components/AppDiagram.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { units, colors } from '~/constants.js'

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

const unitList = units.map((unit) => unit.title)
const unitCount = computed(() =>
  data.value.reduce((acc, el) => {
    acc[el.data.type] = (acc[el.data.type] || 0) + 1

    return acc
  }, {})
)

const unitValues = computed(() => {
  let arrayValues = []
  for (let i = 0; i < unitList.length; i++) {
    arrayValues.push(unitCount.value[i] || 0)
  }

  return arrayValues
})

let isShowGraph = computed(() =>
  unitValues.value.reduce((sum, el) => sum + el, 0)
)

const emit = defineEmits(['unitSelection', 'changeSearchValue'])
const unitSelection = (type) => emit('unitSelection', type)

const graphColors = colors.slice(0, unitList.length)

const changeSearchValue = (value) => {
  emit('changeSearchValue', value)
}
</script>

<style lang="scss" scoped>
.common {
  display: flex;
  width: 100%;

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__error {
    margin-top: 40px;
  }

  &__info {
    padding: 35px 40px;
    background: var(--sub-background);
    flex: 1;
    height: max-content;
  }

  &__units {
    display: flex;
    justify-content: space-between;
    margin-top: 11px;
    flex-wrap: wrap;
  }

  &__unit {
    max-width: 240px;
    margin-left: 20px;
  }

  &__link {
    margin-top: 28px;
    cursor: pointer;
  }

  &__arrow {
    margin-right: 18px;
  }

  &__search {
    margin: 16px 0;
  }

  &__bar {
    margin-top: 52px;
  }

  &__doughnut {
    margin-left: 32px;
  }
}
</style>
