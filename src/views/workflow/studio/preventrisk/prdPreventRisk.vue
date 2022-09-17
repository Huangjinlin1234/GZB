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
          <yu-xform-item placeholder="风险拦截方案编号" name="preventId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="风险拦截方案名称"  name="preventDesc" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="是否启用" name="usedInd" ctype="select" data-code="YESNO"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </template>


      <yu-toolBar>
          <yu-button  type="primary" icon="plus" @click="addFn">新增</yu-button>
          <yu-button  type="primary" icon="edit" @click="modifyFn">修改</yu-button>
          <yu-button  type="primary" icon="document" @click="infoFn">详情</yu-button>
          <yu-button  type="primary" icon="yx-bin" @click="deleteFn">删除</yu-button>
      </yu-toolBar>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition">
        <yu-xtable-column label="风险拦截方案编号" prop="preventId"></yu-xtable-column>
        <yu-xtable-column label="风险拦截方案名称" prop="preventDesc"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
         <yu-xtable-column label="登记人" prop="inputId" ></yu-xtable-column>
    <yu-xtable-column label="登记机构" prop="inputBrId" ></yu-xtable-column>
    <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
        <!-- <yu-xtable-column label="备注" prop="memo" ></yu-xtable-column>
    <yu-xtable-column label="是否适用流程" prop="usedFlow" data-code="YESNO"></yu-xtable-column>
    <yu-xtable-column label="方案分类" prop="itemType" ></yu-xtable-column>
    <yu-xtable-column label="逻辑系统" prop="instuCde"></yu-xtable-column> -->
      </yu-xtable>
      <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应
      width="650px" height="380px" -->
      <yu-xdialog :title="viewTitle[viewType]" close-on-press-escape="true" :visible.sync="dialogVisible" width="850px">
        <yu-xform ref="refForm" label-width="130px" v-model="formdata" :disabled="formDisabled">
          <yu-xform-group>
            <yu-xform-item label="风险拦截方案编号" :hidden="true" name="preventId" rules="required" ctype="input"></yu-xform-item>
            <yu-xform-item label="方案名称" name="preventDesc" :colspan="24" rules="required" ctype="input"></yu-xform-item>
            <yu-xform-item label="是否启用" name="usedInd" rules="required" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <!-- <yu-xform-item label="登记人" name="inputId" rules="required" ctype="input"></yu-xform-item>
        <yu-xform-item label="登记机构" name="inputBrId" ctype="input"></yu-xform-item>
        <yu-xform-item label="登记日期" name="inputDate" ctype="input"></yu-xform-item> -->
            <yu-xform-item label="是否适用流程" name="usedFlow" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <!-- <yu-xform-item label="方案分类" name="itemType"  ctype="select" data-code="STD_ZB_ITEM_TYPE"></yu-xform-item> -->
            <yu-xform-item label="备注" name="memo" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
            <!-- <yu-xform-item label="逻辑系统" name="instuCde" ctype="input"></yu-xform-item> -->
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
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  components: {},
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisCfg + '/api/prdpreventrisk/',
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
      var url = backend.cmisCfg + '/api/prdpreventrisk/';
      if (_this.viewType == 'EDIT') {
        url = backend.cmisCfg + '/api/prdpreventrisk/update';
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
      // yufp.frame.addTab({
      //   id: 'addPreventRisk', // 菜单功能ID（路由ID）
      //   key: 'addPreventRisk', // 自定义唯一页签key,请统一使用custom_前缀开头
      //   title: '新增风险拦截方案', // 页签名称
      //   data: {} // 传递的业务数据，可选配置
      // });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var row = _this.$refs.refTable.selections[0];
      //   yufp.frame.addTab({
      //     id: 'addPreventRisk', // 菜单功能ID（路由ID）
      //     key: 'addPreventRisk' + row.preventId, // 自定义唯一页签key,请统一使用custom_前缀开头
      //     title: '新增风险拦截方案', // 页签名称
      //     data: { row: row } // 传递的业务数据，可选配置
      //   });
      this.$dialog.open('风险拦截方案', 'workflow/studio/preventrisk/addPreventRisk', 1200, 630, row, () => {
        _this.$refs.refTable.remoteData();
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
        arr.push(selections[i].preventId);
      }
      _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCfg + '/api/prdpreventrisk/batchdelete/' + arr.join(','),
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
