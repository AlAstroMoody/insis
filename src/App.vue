<template>
  <SideBar @unit-selection="changeUnit" :unit="activeUnit" />
  <transition-group name="shift" mode="out-in">
    <AppCommonData
      :data="fmsData"
      @unit-selection="changeUnit"
      :searchValue="searchValue"
      @changeSearchValue="changeSearchValue"
      v-if="activeUnit === 'main'"
    />
    <AppUnit
      v-else
      :data="unitInformation"
      :searchValue="searchValue"
      @changeSearchValue="changeSearchValue"
    />
  </transition-group>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { getUnitsFromAPI } from '@/api/fms.js'
import AppCommonData from '@/components/AppCommonData.vue'
import AppUnit from '@/components/AppUnit.vue'
import SideBar from '@/components/SideBar.vue'

const searchValue = ref('Норильск')
let fmsData = ref([])
const changeSearchValue = async (query) => {
  fmsData.value = await getUnitsFromAPI(query)
}

const searchInfo = async (query) => {
  fmsData.value = await getUnitsFromAPI(query)
}

onMounted(async () => {
  searchInfo(searchValue.value)
})

const activeUnit = ref('main')
const changeUnit = (type) => {
  activeUnit.value = type
}

const unitInformation = computed(() =>
  activeUnit.value !== 'main'
    ? fmsData.value.filter((item) => item.data.type === activeUnit.value)
    : fmsData.value
)
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 40px;
  display: flex;
}
</style>
