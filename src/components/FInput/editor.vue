<template>
  <el-form ref="form"
           :model="source"
           label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="source.name"></el-input>
    </el-form-item>
    <el-form-item label="必填">
      <el-radio v-model="source.isMust"
                label="1">是</el-radio>
      <el-radio v-model="source.isMust"
                label="2">否</el-radio>
    </el-form-item>
    <el-form-item label="必填提示">
      <el-input v-model="source.mustTip"></el-input>
    </el-form-item>
    <el-form-item label="字符最大长度">
      <el-input-number v-model="source.charLength"
                       :min="0"
                       :max="10000"
                       label="控制文本框长度"></el-input-number>
    </el-form-item>
    <el-form-item label="超长提示">
      <el-input v-model="source.charLengthTip"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FInputEditor',
  data () {
    return {
      source: {
        name: '名称',
        isMust: false,
        mustTip: '',
        charLength: 50,
        charLengthTip: ''
      }
    }
  },
  methods: {
    generateResult () {
      var result = {
        labelName: '名称',
        validator: [], // 验证规则
        styles: {}
      }
      result.labelName = this.source.name
      if (this.isMust) {
        result.validator.push({ required: true, message: this.mustTip, trigger: 'blur' })
      }
      result.validator.push({ min: 0, max: this.charLength ? 10000 : this.charLength, message: `不能超过${this.charLength}个字符`, trigger: 'blur' })
      return result
    }
  },
  watch: {
    source: {
      handler: function (n, o) {
        var result = this.generateResult()
        this.$emit('dataChange', result)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
