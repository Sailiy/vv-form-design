<template>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="value"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FTextArea',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>

</style>
