<template lang="pug">
  .yosegaki-item
    .img-field
      img.yosegaki-img.animated.fadeIn(v-if="attr" :src="attr")
    p.yosegaki-description {{ description }}
    .yosegaki-author {{ name }}
      span.yosegaki-date {{ date }}
</template>

<script>
export default {
  name: "yosegaki",
  props: ['attr', 'description', 'name', 'date']
}
</script>