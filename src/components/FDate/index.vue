<template>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="date" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="time" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
</template>

<script>
export default {
  name: 'FDate',
  data () {
    return {
      date: '',
      time: ''
    }
  }
}
</script>

<style scoped>

</style>
