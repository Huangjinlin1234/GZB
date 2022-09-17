<template>
  <div>
    <el-input
      v-model="selectedVal"
      readonly
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :name="name"
      :icon="icon"
      :on-icon-click="onIconClickFn"
      @click.native="clickFn"
    >
    </el-input>
    <el-dialog-x
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      @open="dialogOpen"
    >
      <el-form-q
        ref="refFormQ"
        :field-data="queryFields"
        :buttons="queryButtons"
        search-table="reftable"
      ></el-form-q>
      <el-table-x
        ref="reftable"
        v-if="dialogVisible"
        :data-url="url.bizType"
        :base-params="baseParams"
        :table-columns="tableColumns"
      >
      </el-table-x>
      <div style="margin-top: 20px" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose">确 定</el-button>
        <el-button type="primary" @click="afterClose">取 消</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
/**
 * yufp-subid-selector
 * 子流程业务类型选取弹窗
 *
 * 注：自定义组件规范：
 * 1、对外默认提供v-model配置,raw-value
 * 2、对外提供readonly、disabled、size属性
 * 3、对外接口事件：select-fn,具体参数请自定义
 * Created by zhouqh on 2020/2/11.
 */
/* eslint vue/require-prop-types:0 */

export default {
  name: "YufpSubidSelector",
  props: {
    // 下述字段为el-input组件中部分属性，配置文档参见element-ui
    name: {
      type: String,
    },
    value: {
      required: true,
    },
    rawValue: String,
    size: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "edit",
    },
    params: Object,
  },
  data: function () {
    var _this = this;
    return {
      url: {
        bizType: backend.workflowService + "/api/biz/",
      },
      selectedVal: "",
      dialogVisible: false,
      dialogTitle: "选取子流程业务类型",
      baseParams: {
        condition: {},
      },
      tableColumns: [
        {
          label: "流程名称",
          prop: "flowName",
          resizable: true,
          align: "center",
        },
        {
          label: "流程编号",
          prop: "flowId",
          resizable: true,
          hidden: false,
          align: "center",
        },
        {
          label: "业务类型",
          prop: "bizType",
          resizable: true,
          align: "center",
        },
        { label: "备注", prop: "ext", resizable: true, align: "center" },
      ],
      queryFields: [
        { placeholder: "业务类型", field: "bizType", type: "input" },
        { placeholder: "流程编号", field: "flowId", type: "input" },
        { placeholder: "流程名称", field: "flowName", type: "input" },
      ],
      queryButtons: [
        {
          label: "搜索",
          op: "submit",
          type: "primary",
          icon: "search",
          click: function (model, valid) {
            if (valid) {
              var params = {};
              params.flowId = model.flowId;
              if (model.bizType != "") {
                params.bizType = "%" + model.bizType + "%";
              }
              if (model.flowName != "") {
                params.flowName = "%" + model.flowName + "%";
              }
              var param = {
                condition: JSON.stringify(params),
              };
              _this.$refs.reftable.remoteData(param);
            }
          },
        },
        { label: "重置", op: "reset", type: "primary", icon: "yx-loop2" },
      ],
    };
  },
  watch: {
    value: function (val) {
      // 将key转换为对应的value值
      if (!val) {
        this.selectedVal = "";
        return;
      }
      this.selectedVal = this.selectedVal ? this.selectedVal : val;
    },
    rawValue: function (val) {
      this.selectedVal = val;
    },
  },
  mounted: function () {
    this.selectedVal = this.rawValue ? this.rawValue : this.value;
  },
  methods: {
    clickFn: function () {
      this.$emit("click-fn", this);
    },
    onIconClickFn: function (val) {
      if (this.disabled) {
        return;
      }
      this.dialogVisible = true;
      // 弹窗显示时清空查询条件
      this.$nextTick(function () {
        this.$refs["refFormQ"].$children[0].resetFields();
      });
    },
    dialogOpen: function () {
      var selection = [];
    },
    afterClose: function () {
      this.dialogVisible = false;
    },
    dialogClose: function () {
      var rows = this.$refs.reftable.selections;
      if (rows.length == 0) {
        this.$message({ message: "请选择一条数据!", type: "warning" });
      }
      var row = rows[0];
      this.selectedVal = row.bizType;
      this.$emit("input", row.bizType);
      this.$emit("select-fn", "subId", row.bizType);
      this.dialogVisible = false;
    },
    // 对外提供选择器显示值
    getRawValue: function () {
      return this.selectedVal;
    },
    convertKey: function (val) {
      // 将key转换为对应的value值
      return val;
    },
  },
};
</script>