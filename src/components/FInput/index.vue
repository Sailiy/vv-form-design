<template>
  <el-form-item :label="labelName"
                :style="styles">
    <el-input v-model="result"></el-input>
  </el-form-item>
</template>

<script>
import Editor from './editor'
export default {
  name: 'FInput',
  data () {
    return {
      result: '',
      labelName: '名称',
      validator: [], // 验证规则
      styles: []
    }
  },
  methods: {
    getEditor () {
      return Editor
    }
  }
}
</script>

<style scoped>
</style>
