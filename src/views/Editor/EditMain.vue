<script>
import Vue from 'vue'
import { FInput, FRadioGroup, FSelect, FDate, FCheckBoxGroup, FButtonGroup, FSwitch, FTextArea } from '../../components/index'
export default {
  components: { FInput, FRadioGroup, FSelect, FDate, FCheckBoxGroup, FButtonGroup, FSwitch, FTextArea },
  data: function () {
    return {
      mFindPosition: '',
      allComponents: [],
      componentName: '',
      dragStartIndex: 0,
      dragOverIndex: 0,
      editComponent: null
    }
  },
  methods: {
    /* 清除操作时候生成的额外style */
    clearStyle () {
      this.$nextTick(() => {
        this.$refs.FForm.$children.forEach((item, index) => {
          item.$el.style.borderTop = 'none'
          item.$el.style.borderBottom = 'none'
        })
      })
    },
    // 子item开始拖动
    childrenDragStart (e) {
      console.log('childrenDragStart', e)
      this.dragStartIndex = e.target.dataset.index
      console.log(this.dragStartIndex)
    },
    // 函数节流
    throttle (func, delay = 100) {
      var pDate = new Date().getTime()
      return (e) => {
        var cDate = new Date().getTime()
        if ((cDate - pDate) > delay) {
          pDate = cDate
          func(e)
        }
      }
    },
    getTreeScrollTop (tdom) {
      var ttop = tdom.scrollTop
      if (tdom.parentElement) {
        ttop += this.getTreeScrollTop(tdom.parentElement)
      }
      return ttop
    },
    // 拖动过程中实时计算要插入的位置
    findPosition (e) {
      var minIndex = 0
      var minClientY = 100000000
      var treeScrollTop = this.getTreeScrollTop(this.$el)
      var dY = e.clientY + treeScrollTop
      var isTop = true
      // 排序 并计算要插入的位置
      this.$refs.FForm.$children.sort((a, b) => {
        var aIndex = a.$el.dataset.index
        var bIndex = b.$el.dataset.index
        return aIndex - bIndex
      }).forEach((children, index) => {
        children.$el.style.borderTop = 'none'
        children.$el.style.borderBottom = 'none'
        var cY = children.$el.offsetTop
        var cH = children.$el.offsetHeight
        if (Math.abs(cY - dY) < minClientY) {
          minClientY = Math.abs(cY - dY)
          minIndex = index
          isTop = minClientY < cH / 2
        }
      })
      if (this.$refs.FForm.$children[minIndex]) { this.$refs.FForm.$children[minIndex].$el.style[isTop ? 'borderTop' : 'borderBottom'] = '50px solid rgba(0,0,0,0)' }
      minIndex = isTop ? minIndex : ((minIndex + 1) > this.allComponents.length ? this.allComponents.length : minIndex + 1)
      if (this.dragStartIndex < minIndex && isTop) {
        minIndex = minIndex - 1
      }
      this.dragOverIndex = minIndex
    },
    // 画布上的拖动处理
    handleOnRootDragOver (e) {
      if (!e.dataTransfer.getData('key')) {
        this.mFindPosition(e)
      }
      e.preventDefault()
    },
    // 画布拖动停止处理
    handleOnRootDrop (e) {
      // 从组建列表拖入
      if (e.dataTransfer.getData('component')) {
        var tComponent = JSON.parse(e.dataTransfer.getData('component'))
        this.allComponents.splice(this.dragOverIndex, 0, tComponent)
      } else { // 列表内组件位置调换
        var item = this.allComponents.splice(this.dragStartIndex, 1)
        this.allComponents.splice(this.dragOverIndex, 0, ...item)
        console.log(this.allComponents)
      }
      // 清除拖动过程中产生的样式
      this.clearStyle()
      e.preventDefault()
    },
    // item 上的操作点击 处理
    handleItemClick (e, index = 0) {
      var action = e.target.dataset.action
      var tempItem
      switch (action) {
        case 'copy':
          this.allComponents.splice(index + 1, 0, JSON.parse(JSON.stringify(this.allComponents[index])))
          break
        case 'up':
          if (index < 1) return
          tempItem = this.allComponents[index - 1]
          this.allComponents[index - 1] = this.allComponents[index]
          this.allComponents[index] = tempItem
          this.allComponents = [...this.allComponents]
          break
        case 'down':
          if (index >= (this.allComponents.length - 1)) return
          tempItem = this.allComponents[index + 1]
          this.allComponents[index + 1] = this.allComponents[index]
          this.allComponents[index] = tempItem
          this.allComponents = [...this.allComponents]
          break
        case 'del':
          this.allComponents.splice(index, 1)
          break
        default:
          // 设置当前选中的元素的样式，默认添加边框
          this.allComponents.map((item, subIndex) => {
            item.isActive = index === subIndex
          })
          // 根据组件id清除当前编辑区内容
          var cvm = this.editComponent && this.editComponent.vm ? this.editComponent.vm : null
          if (cvm) {
            cvm.$destroy(true)
            cvm.$el.parentNode.removeChild(cvm.$el)
            this.editComponent.vm = null
          }
          // 拿到当前选中元素的编辑器，设置到右边显示
          var clickItem = this.$refs['formItem' + index]
          var editorComponent = clickItem.getEditor()
          var EditorConstructor = Vue.extend(editorComponent)
          var mEditor = new EditorConstructor()
          var vm = mEditor.$mount('#currentComponentEditor')
          vm.$on('dataChange', (data) => {
            console.log(clickItem.$data, data)
            Object.keys(data).map((key) => {
              console.log(key)
              clickItem.$data[key] = data[key]
            })
            console.log(clickItem)
          })
          console.log(vm, vm.$el)
          // 设置当前正在编辑组件的id
          this.editComponent = this.allComponents[index]
          this.editComponent.vm = vm

          break
      }
    }

  },
  mounted () {
    this.mFindPosition = this.throttle(this.findPosition, 100)
  },
  render: function (h) { // h 为 createElement 函数，接受三个参数
    return h('el-form', {
      props: {
        labelWidth: '80px'
      },
      nativeOn: {
        dragover: this.handleOnRootDragOver,
        drop: this.handleOnRootDrop
      },
      ref: 'FForm'
    }, this.allComponents.map((component, index) => {
      if (!component.hasOwnProperty('isActive')) this.$set(component, 'isActive', false)
      return h(component.name, {
        directives: [
          { name: 'masking' }
        ],
        attrs: {
          'data-index': index,
          draggable: true
        },
        class: {
          active: component.isActive
        },
        nativeOn: {
          click: (e) => {
            this.handleItemClick(e, index)
          },
          dragstart: this.childrenDragStart
        },
        ref: 'formItem' + index
      })
    }))
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  height: 100%;
  .active {
    outline: 2px dotted green;
  }
}
</style>
