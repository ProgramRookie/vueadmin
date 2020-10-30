<!--
 * @Author: 肥仔
 * @Date: 2020-10-27 16:04:33
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-28 09:29:23
 * @Description: file content
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
