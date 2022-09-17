<template>
  <div>
    <yu-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled" :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">
    </yu-input>
    <yu-xdialog title="报表项目列表" :visible.sync="dialogVisible">
      <yu-xform v-model="formSelect" ref="refForm" related-table-name="mytable" label-width="110px">
        <yu-xform-group :column="2">
          <yu-xform-item label="项目编号" placeholder="请输入" ctype="input" name="itemId"></yu-xform-item>
          <yu-xform-item label="项目名称" placeholder="请输入" ctype="input" name="itemName"></yu-xform-item>
          <yu-xform-item v-if="isShow" label="财报类型" ctype="select" data-code="STD_ZB_FNC_CONFTYP" name="fncConfTyp" placeholder="请选择">
          </yu-xform-item>
          <yu-xform-item label=" " label-suffix=" " ctype="custom" name="custom" colspan="20" class="yu-adjust button-center">
            <yu-button type="primary" @click="saveFn">查询</yu-button>
            <yu-button @click="cancelFn">重置</yu-button>
          </yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="mytable" :data-url="dataUrl" @row-click="rowClickFn" :max-height="300">
        <yu-xtable-column label="项目编号" prop="itemId"></yu-xtable-column>
        <yu-xtable-column label="项目名称" prop="itemName"></yu-xtable-column>
        <yu-xtable-column label="财报类型" prop="fncConfTyp" min-width="120" data-code="STD_ZB_FNC_CONFTYP"></yu-xtable-column>
      </yu-xtable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg("STD_ZB_FNC_CONFTYP");
/* eslint vue/require-prop-types:0 */
export default {
  name: "checkFormula",
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
      default: ""
    },
    icon: {
      type: String,
      default: "search"
    },
    params: Object,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      selectedVal: "",
      selectConfType: "",
      // 对话框是否可见变量
      dialogVisible: false,
      // 表格请求的url
      dataUrl: this.$backend.cmisCfg + "/api/cbps/fncConfItems/q/query",
      formSelect: {}
    };
  },
  watch: {
    value: function(val) {
      // 将key转换为对应的value值
      if (!val) {
        this.selectedVal = "";
        return;
      }
      this.selectedVal = this.selectedVal ? this.selectedVal : val;
    },
    rawValue: function(val) {
      this.selectedVal = val;
    }
  },
  mounted: function() {
    // 有rawValue 时 将
    this.selectedVal = this.rawValue ? this.rawValue : this.value;
  },
  methods: {
    // input 框原生点击事件
    clickFn: function() {
      this.$emit("click-fn", this);
    },
    // input框上图标点击事件
    onIconClickFn: function(val) {
      if (this.disabled) {
        return;
      }
      this.dialogVisible = true;
    },
    // 表格行点击事件
    rowClickFn: function(row) {
      // 将表格上选中的行数据复制给变量
      this.selections = this.$refs.mytable.selections;
    },
    confirmFn: function() {
      if (this.selections.length < 1) {
        this.$message("请先选择一条数据");
      }
      // 获取 选中数据的标题等熟悉
      this.selectedVal = this.selections[0].itemName;
      this.selectConfType = this.selections[0].fncConfTyp;
      this.$emit("input", this.selections[0].itemId);
      // 这个是你自定义返回的接口事件
      this.$emit("select-fn", this.selections[0].itemId, this.selections[0]);
      this.dialogVisible = false;
    },
    // 对外提供选择器显示值
    getRawValue: function() {
      return this.selectedVal;
    },
    getConfType: function() {
      return this.selectConfType;
    },
    convertKey: function(val) {
      // 将key转换为对应的value值
      return val;
    },
    cancelFn() {
      this.$refs.refForm.resetFields();
    },
    saveFn() {
      var param = { condition: JSON.stringify(this.formSelect) };
      this.$refs.mytable.remoteData(param);
    }
  }
};
</script>
<style scoped>
.button-center {
  text-align: center;
  margin-bottom: 20px;
}
</style>
