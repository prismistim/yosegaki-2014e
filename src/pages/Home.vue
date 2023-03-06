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
          v-for="{ attr, description, name, id, date } in sorted"
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

<script>
import axios from 'axios'
import YosegakiItem from '../components/YosegakiItem.vue'
import _ from 'lodash'

const URL = 'https://script.google.com/macros/s/AKfycbwFKVhBBWQHUOWHD0rX04CawhBzuzXMo2uibJlj1ZnC4DjDChLC/exec'

export default {
  name: 'index',
  components: {
    YosegakiItem,
  },
  data() {
    return {
      order: false,
      yosegaki_data: [],
      loading: true
    }
  },
  created() {
    axios.get(URL)
      .then((res) => {
        this.yosegaki_data = res.data
        this.yosegaki_data.forEach((item, index) => {
          item.id = index
          item.attr = item.attr.replace(/open/gi, 'uc')
          let date = new Date (item.date)
          item.date = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
          // item.description = item.description.replace(/\n/gi, '<br>')
        })
        this.yosegaki_data = this.yosegaki_data.slice().reverse()
        this.$emit('COMPLETE')
      })
    this.$on('COMPLETE', () => {
      this.loading = false
    })
  },
  computed: {
    sorted: function () {
      return _.orderBy(this.yosegaki_data, 'id', this.order ? 'asc' : 'desc' )
    }
  }
}
</script>
