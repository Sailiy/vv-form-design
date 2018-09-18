<template>
  <el-form-item label="按钮">
    <el-button type="primary"
               @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</template>
<script>
export default {
  name: 'FButton',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSubmit () { }
  }
}
</script>

<style scoped>
</style>
