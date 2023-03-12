<template>
  <div class="wrap">
    <div class="header">
      <h1 class="header-title animated fadeIn">
        Yosegaki
      </h1>
      <div class="container">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
