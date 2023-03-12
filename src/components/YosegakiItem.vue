<script setup>
const props = defineProps(['attr', 'description', 'name', 'date'])
</script>

<template>
  <div class="template-item">
    <div class="img-field"><img :src="attr" alt="yosegaki-img" class="yosegaki-img"></div>
    <p class="yosegaki-description">{{ description }}</p>
    <div class="yosegaki-author">
      {{ name }}
      <span class="yosegaki-date">{{ date }}</span>
    </div>
  </div>
</template>