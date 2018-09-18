<template>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="value">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
export default {
  name: 'FCheckBox',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>

</style>
