<template>
  <el-form-item label="即时配送">
    <el-switch v-model="value"></el-switch>
  </el-form-item>
</template>

<script>
export default {
  name: 'FSwitch',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>

</style>
