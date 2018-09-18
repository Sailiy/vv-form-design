<template>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="value">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
export default {
  name: 'FRadio',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>

</style>
