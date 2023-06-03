<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import './assets/css/reset.css';
@import './assets/css/common.css';
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
.amap-logo,.amap-copyright {
display:none !important;
}
</style>
