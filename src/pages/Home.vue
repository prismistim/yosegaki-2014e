<template lang="pug">
  div
    .info-text.animated.pulse(v-if="loading") Loading...
    .yosegaki-list(v-else)
      .sort-btn-field
        div sort
        button.sort-btn(v-on:click="order=!order") Older / Newer
      transition-group(tag="div" name="vue-yosegaki-list" enter-active-class="fadeInUp" leave-active-class="fadeOutDown")
        YosegakiItem(
          v-for = "{ attr, description, name, id, date } in this.sorted"
          v-bind:attr = "attr"
          v-bind:description = "description"
          v-bind:name = "name"
          v-bind:date = "date"
          :key = "id"
          stagger = "50"
        )
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
