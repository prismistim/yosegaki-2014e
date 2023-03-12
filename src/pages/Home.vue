<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import YosegakiItem from '../components/YosegakiItem.vue'
import _ from 'lodash'

const URL = '/api'

const order = ref(false)
const yosegaki_data = ref([])
const loading = ref(false)

const emit = defineEmits(['COMPLETE'])

const fetchData = async () => {
  try {
    loading.value = true

    const res = await axios.get(URL)

    if (!res) {
      yosegaki_data.value = []
      return
    }

    yosegaki_data.value = res.data

    yosegaki_data.value.forEach((item, index) => {
      item.id = index
      item.attr = item.attr.replace(/open/gi, 'uc')
      let date = new Date (item.date)
      item.date = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
    })
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

const sortedData = computed(() => {
  return _.orderBy(yosegaki_data.value, 'id', order.value ? 'asc' : 'desc' )
})

fetchData()
</script>


<template>
  <div>
    <div class="info-text" v-if="loading">
      Loading...
    </div>
    <div class="yosegaki-list" v-else>
      <div class="sort-btn-field">
        <div>sort</div>
        <div class="button sort-btn" @click="order =! order">Older / Newer</div>
      </div>
      <div>
        <YosegakiItem
          v-for="{ attr, description, name, id, date } in sortedData"
          :key="id"
          :attr="attr"
          :description="description"
          :name="name"
          :date="date"
        ></YosegakiItem>
      </div>
    </div>
  </div>
</template>
