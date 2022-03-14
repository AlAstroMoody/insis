<template>
  <section class="unit">
    <AppSearch
      :value="searchValue"
      @changeSearchValue="changeSearchValue($event)"
    />

    <el-table :data="pageData" style="width: 100%" class="unit__table table">
      <el-table-column prop="data.code" label="Код подразделения" width="180" />
      <el-table-column prop="data.name" label="Название" />
      <el-table-column
        prop="data.region_code"
        label="Код региона"
        width="150"
      />
      <el-table-column label="Вид подразделения" width="180">
        {{ unitType }}
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="data.length"
      :hide-on-single-page="true"
      :page-size="pageSize"
      :current-page="currentPage + 1"
      @current-change="currentPageChange"
      prev-text="В начало"
      next-text="В конец"
      background
      class="table"
    />
  </section>
</template>

<script setup>
import { ElTable, ElPagination } from 'element-plus'
import { computed, ref, toRefs } from 'vue'

import AppSearch from '@/components/AppSearch.vue'
import { units } from '~/constants.js'

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
const currentPage = ref(0)
const pageSize = 5

const unitType = computed(() => {
  for (const unit of units) {
    if (
      data.value.length &&
      unit.type === units[data.value[0].data.type].type
    ) {
      return unit.title
    }
  }

  return ''
})

const pageData = computed(() =>
  data.value.slice(
    currentPage.value * pageSize,
    (currentPage.value + 1) * pageSize
  )
)

const emit = defineEmits(['changeSearchValue'])

const changeSearchValue = (value) => {
  emit('changeSearchValue', value)
}

const currentPageChange = (value) => {
  currentPage.value = value - 1
}
</script>

<style lang="scss" scoped>
.unit {
  width: 100%;

  &__table {
    margin-top: 40px;
  }
}
</style>
