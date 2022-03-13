<template>
  <div class="diagram">
    <keep-alive>
      <component
        :is="diagramType"
        :chartData="chartData"
        :options="componentOptions"
      />
    </keep-alive>
  </div>
</template>

<script setup>
import { Chart, registerables } from 'chart.js'
import { computed, toRefs } from 'vue'
import { DoughnutChart, BarChart } from 'vue-chart-3'

Chart.register(...registerables)

const props = defineProps({
  values: {
    default: () => [],
    type: Array,
  },
  labels: {
    default: () => [],
    type: Array,
  },
  colors: {
    default: () => [],
    type: Array,
  },
  type: {
    default: 'bar',
    type: String,
  },
})
const { values, labels, colors, type } = toRefs(props)

const diagramTypes = {
  BarChart,
  DoughnutChart,
}

const diagramType = computed(() => diagramTypes[type.value])

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      data: values.value,
      backgroundColor: colors.value,
      label: 'график подразделений',
    },
  ],
}))

const baseOptions = {
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

const barOptions = Object.assign(
  {
    scales: {
      y: {
        stacked: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  },
  baseOptions
)

const componentOptions = computed(() =>
  type.value === 'BarChart' ? barOptions : baseOptions
)
</script>

<style lang="scss" scoped>
.diagram {
  background: white;
  height: 430px;
  padding: 20px;

  div {
    height: 100%;
  }
}
</style>
