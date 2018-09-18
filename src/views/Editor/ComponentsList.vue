<template>
  <ul class="viewlist">
    <li v-for="(item,index) in views"
        :key="index"
        draggable="true"
        @dragstart="handleDrag(item,$event)">{{item.cname}}</li>
  </ul>
</template>
<script>
export default {
  name: 'ComponentsList',
  data () {
    return {
      views: [
        { name: 'FInput', cname: '输入框' },
        { name: 'FRadioGroup', cname: '单选按钮组' },
        { name: 'FSelect', cname: '下拉框' },
        { name: 'FDate', cname: '日期时间选择器' },
        { name: 'FCheckBoxGroup', cname: '复选框组' },
        { name: 'FButtonGroup', cname: '按钮组' },
        { name: 'FSwitch', cname: '开关按钮' },
        { name: 'FTextArea', cname: '多行文本框' }
      ]
    }
  },
  methods: {
    handleDrag (item, event) {
      event.dataTransfer.setData('component', JSON.stringify(item))
      // console.log(item, event)
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.viewlist {
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    margin: 0;
    padding: 0;
    height: 30px;
    line-height: 30px;
    background: aliceblue;
    cursor: move;
  }
  > li:hover {
    background: bisque;
  }
}
</style>
