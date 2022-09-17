<!--
    @created by xiamc
    @description 预授信列表界面
-->
<template>
  <div>
    <yu-panel title="预授信明细列表" is-collapse>
      <template slot="right">
      </template>
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item label="标题" placeholder="标题" ctype="input" name="title"></yu-xform-item>
            <yu-xform-item label="时间" placeholder="时间" ctype="datepicker" name="createAt"></yu-xform-item>
            <yu-xform-item label="类型" placeholder="类型" ctype="select" name="type" data-code="NATIONALITY"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" @row-click="onSelected">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtType" sortable></yu-xtable-column>
            <yu-xtable-column label="集团客户编号" prop="grpCusId" sortable></yu-xtable-column>
            <yu-xtable-column label="集团客户名称" prop="grpCusName" sortable></yu-xtable-column>
            <yu-xtable-column label="客户类型" prop="cusType" data-code="NATIONALITY"></yu-xtable-column>
            <yu-xtable-column label="敞口额度合计（元）" prop="openTotalLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskTotalLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="updId" data-code="PUBLISH_STATUS"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"> </yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="apprStatus"> </yu-xtable-column>
        </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";

yufp.lookup.reg("CRUD_TYPE,NATIONALITY,PUBLISH_STATUS");

export default {
  components: { YufpDemoSelector },
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + "/api/lmtgrpapp/query",
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

      _this.switchStatus("EDIT", true);

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();

        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
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

     onSelected: function(row, event, column, index) {
      // alert("选择并跳转");
      console.log("************************");
      // //2.选择传送参数serno并跳转
      this.$router.addTab({
        name: "zrcbank/biz/lmtGrpApp/lmtAppDetail/lmtAppDetail",
        title: "授信细化",
        key: "1",
        data: {
          userId: "121",
          keyId: 12324,
          formData: {
            name: 'ST0001',
            gender: '4'
          }
        }
      });
    }
  }
};
</script>
