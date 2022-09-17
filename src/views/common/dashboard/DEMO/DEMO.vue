
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="普通查询" is-collapse>
      <template slot="right">
        <yu-button-drop>
          <yu-button @click="addFn">新增</yu-button>
          <yu-button @click="modifyFn">修改</yu-button>
          <yu-button @click="infoFn">详情</yu-button>
          <yu-button @click="deleteFn">删除</yu-button>
          <yu-button @click="exportFn">导出</yu-button>
          <yu-button>其他</yu-button>
        </yu-button-drop>
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
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" selection-type="radio">
        <yu-xtable-column label="编码" prop="id"></yu-xtable-column>
        <yu-xtable-column label="名称" prop="title" sortable></yu-xtable-column>
        <yu-xtable-column label="类型" prop="type" data-code="NATIONALITY"></yu-xtable-column>
        <yu-xtable-column label="参与人" align="center">
          <yu-xtable-column label="作者" prop="author"></yu-xtable-column>
          <yu-xtable-column label="审核人" prop="auditor"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="阅读数" prop="pageviews"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="PUBLISH_STATUS"></yu-xtable-column>
        <yu-xtable-column label="时间" prop="createAt"> </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="编码" ctype="num" name="id" :hidden="true"></yu-xform-item>
          <yu-xform-item label="名称" ctype="input" name="title" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="时间" ctype="datepicker" name="createAt"></yu-xform-item>
          <yu-xform-item label="作者" ctype="input" name="author"></yu-xform-item>
          <yu-xform-item label="审核人" ctype="input" name="auditor"></yu-xform-item>
          <yu-xform-item label="类型" ctype="select" name="type" data-code="NATIONALITY"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="status" data-code="PUBLISH_STATUS"></yu-xform-item>
          <yu-xform-item label="阅读数" ctype="input" name="pageviews" :rules="rule[1]"></yu-xform-item>
          <yu-xform-item label="自定义" ctype="yufp-demo-selector" name="yourField"></yu-xform-item>
          <yu-xform-item label="点评" ctype="textarea" name="remark" :rows="3" :colspan="24" placeholder="2000个字符以内"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
          <yu-button @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
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
      dataUrl: "/trade/example/list",
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
