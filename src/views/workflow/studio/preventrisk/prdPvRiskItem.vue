<template>
  <!--
    @created by tangxun 2021-06-22 14:08:56
    @updated by 2021-06-22 14:08:56
    @updated by 2021-06-22 14:08:56
    @description 主页面
  -->
  <div>
    <yu-panel ref="panel" title="风险拦截方案" :hideFilter="false" :collapseHide="false" >
      <template slot="filter">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata">
        <yu-xform-group :column="4">
          <yu-xform-item placeholder="项目编号" name="itemId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="项目名称" name="itemName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="是否启用" name="usedInd" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </template>
      <yu-toolBar>
          <yu-button type="primary" icon="plus" @click="addFn">新增</yu-button>
          <yu-button type="primary" icon="edit" @click="modifyFn">修改</yu-button>
          <yu-button type="primary" icon="document" @click="infoFn">详情</yu-button>
          <yu-button type="primary" icon="yx-bin" @click="deleteFn">删除</yu-button>
     </yu-toolBar>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition">
        <yu-xtable-column label="项目编号" prop="itemId"></yu-xtable-column>
        <yu-xtable-column label="项目名称" prop="itemName"></yu-xtable-column>
        <yu-xtable-column label="检查说明" prop="itemDesc"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
       <yu-xtable-column label="登记人" prop="inputId" ></yu-xtable-column>
    <yu-xtable-column label="登记机构" prop="inputBrId" ></yu-xtable-column>
    <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column> -->
        <!--<yu-xtable-column label="是否适用规则" prop="chooseOne" ></yu-xtable-column>
    <yu-xtable-column label="方案分类" prop="itemType" ></yu-xtable-column>
    <yu-xtable-column label="预警级别" prop="riskLevel" ></yu-xtable-column>
    <yu-xtable-column label="触发类别" prop="riskType" ></yu-xtable-column>
    <yu-xtable-column label="预警频度" prop="riskFreq" ></yu-xtable-column>
    <yu-xtable-column label="逻辑系统" prop="instuCde" ></yu-xtable-column> -->
      </yu-xtable>
      <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应
      width="650px" height="380px" -->
      <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
        <yu-xform ref="refForm" label-width="130px" v-model="formdata" :disabled="formDisabled">
          <yu-xform-group :column="2">
            <yu-xform-item label="项目编号" :hidden="true" name="itemId" rules="required" ctype="input"></yu-xform-item>
            <!-- <yu-xform-item label="方案分类" name="itemType"  rules="required" ctype="select" data-code="STD_ZB_ITEM_TYPE"></yu-xform-item> -->
            <yu-xform-item label="是否启用" name="usedInd" rules="required" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="项目名称" name="itemName" rules="required" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
            <yu-xform-item label="检查说明" name="itemDesc" rules="required" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
            <!-- <yu-xform-item label="预警级别" name="riskLevel" ctype="input"></yu-xform-item>
        <yu-xform-item label="触发类别" name="riskType" ctype="input"></yu-xform-item>
        <yu-xform-item label="逻辑系统" name="instuCde" ctype="input"></yu-xform-item> -->
            <yu-xform-item label="风险拦截实现API" name="itemClass" rules="required" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
            <!-- <yu-xform-item label="外部链接" name="linkUrl" ctype="textarea" :autosize="{minRows:3}" :colspan="24"></yu-xform-item>
        <yu-xform-item label="预警频度" name="riskFreq" ctype="input"></yu-xform-item>
        <yu-xform-item label="检查规则" name="itemRules"  ctype="input"></yu-xform-item>
        <yu-xform-item label="是否适用规则" name="chooseOne" ctype=""></yu-xform-item> -->
            <!-- <yu-xform-item label="登记人" name="inputId" ctype="input"></yu-xform-item>
        <yu-xform-item label="登记机构" name="inputBrId" ctype="input"></yu-xform-item>
        <yu-xform-item label="登记日期" name="inputDate" ctype="input"></yu-xform-item> -->
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
            <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('CRUD_TYPE');
export default {
  components: {},
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/prdpvriskitem/',
      formdata: {},
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisCfg + '/api/prdpvriskitem/';
      if (_this.viewType == 'EDIT') {
        url = backend.cmisCfg + '/api/prdpvriskitem/update';
      } else {
        model.inputDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },
    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
      });
    },
    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], this.formdata);
      });
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var len = selections.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(selections[i].itemId);
      }
      _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCfg + '/api/prdpvriskitem/batchdelete/' + arr.join(','),
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /**
     * 导出操作
     */
    exportFn: function () {
      var _this = this;
      yufp.util.exportExcelByTable({
        ref: _this.$refs.refTable,
        url: '/trade/example/list'
      });
    }
  }
};
</script>
