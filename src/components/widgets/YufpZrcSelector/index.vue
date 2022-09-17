<template>
  <div>
    <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled" :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn"> </el-input>
    <el-dialog-x :title="params.title" :visible.sync="dialogVisible">
      <el-form-q form="query" :columns="4" :field-data="params.queryFields" @search-click="infotable"></el-form-q>
      <el-table-x ref="mytable" :checkbox="params.checkbox" :reserve-selection="params.checkbox"  :row-key="params.rowkey" :data-url="dataUrl" :base-params="params.baseParams" :request-type="params.method?params.method:'POST'" @row-click="rowClickFn" :table-columns="tableColumns"  :max-height="300"> </el-table-x>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
/* eslint vue/require-prop-types:0 */
export default {
  name: 'YufpZrcSelector',
  props: {
    // 下述字段为el-input组件中部分属性，配置文档参见element-ui
    name: {
      type: String
    },
    value: {
      required: true
    },
    rawValue: String,
    size: String,
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'search'
    },
    params: Object
  },
  data: function () {
    return {
      selectedVal: '',
      // 对话框是否可见变量
      dialogVisible: false,
      // 表格请求的url
      dataUrl: this.params.dataUrl,
      // 表格是数据对象
      tableColumns: this.params.tableColumns
    };
  },
  watch: {
    value: function (val) {
      // debugger;
      // 将key转换为对应的value值
      if (!val) {
        this.selectedVal = '';
        return;
      }
      // this.selectedVal = this.selectedVal ? this.selectedVal : val;
      this.selectedVal = val;
    },
    rawValue: function (val) {
      this.selectedVal = val;
    }
  },
  mounted: function () {
    // 有rawValue 时 将
    this.selectedVal = this.rawValue ? this.rawValue : this.value;
  },
  methods: {
    infotable: function (model, valid) {
      if (valid) {
        if (this.params.baseParams) {
          yufp.clone(this.params.baseParams.condition, model);
        }
        var param = { condition: JSON.stringify(model) };
        this.$refs.mytable.remoteData(param);
        this.$emit('search', model);
      }
    },
    // input 框原生点击事件
    clickFn: function () {
      this.$emit('click-fn', this);
    },
    // input框上图标点击事件
    onIconClickFn: function (val) {
      if (this.disabled) {
        return;
      }
      this.dialogVisible = true;
    },
    // 表格行点击事件
    rowClickFn: function (row) {
      // 将表格上选中的行数据复制给变量
      this.selections = this.$refs.mytable.selections;
    },
    confirmFn: function () {
      if (this.$refs.mytable.selections.length < 1) {
        this.$message('请先选择一条数据');
      }
      // 获取 选中数据的标题等熟悉
      // console.log(this.name)
      // this.selectedVal = this.selections[0][this.name];
      // this.$emit('input', this.selections[0].id);
      // 这个是你自定义返回的接口事件
      this.$emit('select-fn', this.$refs.mytable.selections);
      this.dialogVisible = false;
    },
    // 对外提供选择器显示值
    getRawValue: function () {
      return this.selectedVal;
    },
    convertKey: function (val) {
      // 将key转换为对应的value值
      return val;
    }
  }
};
</script>
