<template>
  <div>
    <yu-panel title="普通查询" is-collapse>
      <template slot="right">
        <yu-toolbar>
          <yu-button  type="primary" @click="addFn">新增</yu-button>
          <yu-button  type="primary" @click="modifyFn">修改</yu-button>
          <yu-button  type="primary" @click="infoFn">详情</yu-button>
          <yu-button  type="primary" @click="deleteFn">删除</yu-button>
          <yu-button  type="primary" @click="exportFn">导出</yu-button>
          <yu-button  type="primary" >其他</yu-button>
        </yu-toolbar>
      </template>
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item placeholder="业务流水号" name="serno" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="主管客户经理" name="managerId" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="主管机构" name="managerBrId" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl">
        <yu-xtable-column label="业务流水号" prop="serno" width="120"></yu-xtable-column>
        <yu-xtable-column label="授信类型" prop="lmtType" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="敞口额度合计" prop="openTotalLmtAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="低风险额度合计" prop="lowRiskTotalLmtAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50% ，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="授信类型" name="lmtType" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户类型" name="cusType" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";


export default {
  components: { YufpDemoSelector },
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBizService + "/api/lmtapp/",
      formdata: {},
      rule: [
        {
          required: true,
          message: "必填项",
          trigger: "blur"
        },
        {
          validator: yufp.validator.number,
          message: "数字",
          trigger: "blur"
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: "DETAIL",
      viewTitle: yufp.lookup.find("CRUD_TYPE", false),
      saveBtnShow: true
    };
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function() {
      var _this = this;

      _this.dialogVisible = false;
    },

    /**
     * 保存
     */
    saveFn: function() {
      var _this = this;

      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;

      _this.$refs.refForm.validate(function(valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      } // 向后台发送保存请求

      yufp.service.request({
        method: "POST",
        url: "/trade/example/save",
        data: model,
        callback: function(code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message("操作成功");

          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function(viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function() {
      var _this = this;

      _this.switchStatus("ADD", true);

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 修改
     */
    modifyFn: function() {
      var _this = this;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning"
        });

        return;
      }

      this.$router.addTab({
        name: "lmtAppUpdate",
        title: "单一客户授信申请修改",
        data: {
          serno: this.serno
        }
      });

    },

    /**
     * 详情
     */
    infoFn: function() {
      var _this = this;

      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning"
        });

        return;
      }

      _this.switchStatus("DETAIL", false);

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();

        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },

    /**
     * 删除
     */
    deleteFn: function() {
      var _this = this;

      var selections = _this.$refs.refTable.selections;

      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning"
        });

        return;
      }

      var len = selections.length,
        arr = [];

      for (var i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }

      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function(action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url: "/trade/example/delete",
              data: {
                ids: arr.join(",")
              },
              callback: function(code, message, response) {
                _this.$refs.refTable.remoteData();

                _this.$message("操作成功");
              }
            });
          }
        }
      });
    },

    /**
     * 导出操作
     */
    exportFn: function() {
      var _this = this;

      yufp.util.exportExcelByTable({
        fileName: "导出",
        importType: "service",
        ref: _this.$refs.refTable,
        url: "/trade/example/list"
      });
    }
  }
};
</script>
