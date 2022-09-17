<template>
  <div>
    <el-input ref="cstInput" v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled" :size="size" :name="displayKey" :on-icon-click="onIconClickFn" icon="search"></el-input>
  </div>
</template>
<script>
/* eslint no-eq-null:0 */
/* eslint vue/require-prop-types:0 */
export default {
  name: 'YuXcustomRef',
  componentName: 'YuXcustomRef',
  props: {
    otherParams: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 输入框属性
    disabled: Boolean,
    placeholder: String,
    value: {
      required: true
    },
    // 字段id
    name: String,
    // 显示的字段
    displayKey: String,
    // 子弹映射
    mapping: Object,
    // 宽度
    width: [String, Number],
    // 高度
    height: [String, Number],
    // 参照页面
    pagePath: String,
    // 弹出框标题
    title: String,
    // 参照参数
    params: Object,
    idField: String
  },
  data: function () {
    return {
      selectedVal: ''
    };
  },
  watch: {
    value: function (val) {
      if (!val) {
        this.selectedVal = '';
      } else {
        this.selectedVal = val;
      }
    }
  },
  methods: {
    onIconClickFn: function () {
      if (this.disabled) {
        return;
      }
      this.$dialog.open(this.title, this.pagePath, this.width, this.height, this.params, data => {
        if (data) {
          this.selectedVal = data[this.displayKey || this.name || this.idField];
          this.$emit('input', data[this.name || this.idField]);// 输入框处理
          this.$emit('change', data[this.name || this.idField]);// change事件处理
          this.$emit('select-fn', data, this.mapping); // 选取返回处理
        }
      });
    }
  }
};
</script>
