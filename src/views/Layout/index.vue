<template>
  <el-container>
    <el-aside width="200px">
      <ComponentsList></ComponentsList>
    </el-aside>
    <el-container>
      <el-main>
        <EditMain></EditMain>
      </el-main>
      <el-aside width="300px">
        <el-tabs type="border-card">
          <el-tab-pane label="当前组件">
            <div id="currentComponentEditor"></div>
          </el-tab-pane>
          <el-tab-pane label="表单">
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import ComponentsList from '../Editor/ComponentsList'
import EditMain from '../Editor/EditMain'
export default {
  name: 'index',
  components: { ComponentsList, EditMain }
}
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background: beige;
}
</style>
