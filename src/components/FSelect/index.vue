<template>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'FSelect',
  data () {
    return {
      region: ''
    }
  }
}
</script>

<style scoped>

</style>
