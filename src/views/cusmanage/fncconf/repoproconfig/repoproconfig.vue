<template>
<div style="padding: 0 5px;">
  <yu-panel panel-type="normal" title="报表项目配置">
  <template slot="filter">
  <yu-xform related-table-name="refTable" form-type="search"  :remove-empty="true">
    <yu-xform-group :column="3" colspan="8">
      <yu-xform-item ctype="input" name="itemId" placeholder="项目编号" ></yu-xform-item>
      <yu-xform-item ctype="input" name="itemName" placeholder="项目名称" ></yu-xform-item>
    </yu-xform-group>
  </yu-xform>
  </template>
  <template slot="right">
    <yu-button-drop>
      <yu-button icon="yx-plus" @click="addFn">新增</yu-button>
      <yu-button icon="yx-pencil" @click="modifyFn">修改</yu-button>
      <yu-button icon="yx-bin" @click="deleteFn">删除</yu-button>
      <yu-button icon="yx-file-empty" @click="infoFn">查看</yu-button>
    </yu-button-drop>
  </template>
  <yu-xtable ref="refTable" condition-key="condition" :data-url="dataUrl" selection-type="radio" :stripe="true">
    <yu-xtable-column label="项目编号" prop="itemId" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="项目名称" prop="itemName" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="所属报表种类" prop="fncConfTyp" header-align="left" data-code="STD_ZB_FNC_CONFTYP">
    </yu-xtable-column>
    <yu-xtable-column label="新旧报表标识" prop="fncNoFlg" header-align="left" data-code="STD_ZB_FNC_ON_TYP">
    </yu-xtable-column>
  </yu-xtable>
  </yu-panel>
  <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="700px">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
      <yu-xform-group :column="2">
        <yu-xform-item ctype="input" name="itemId" placeholder="请输入项目编号" label="项目编号" rules="required" :disabled="itemIdable"></yu-xform-item>
        <yu-xform-item ctype="input" maxlength="200" name="itemName" placeholder="请输入项目名称" label="项目名称" rules="required"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncConfTyp" placeholder="请选择" label="所属报表种类" rules="required"  data-code="STD_ZB_FNC_CONFTYP"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncNoFlg" placeholder="请选择" label="新旧报表标识" data-code="STD_ZB_FNC_ON_TYP"></yu-xform-item>
        <yu-xform-item ctype="input" maxlength="60" name="itemUnit" placeholder="请输入单位" label="单位"></yu-xform-item>
        <!-- <yu-xform-item ctype="textarea" maxlength="500" name="formula"   placeholder="请输入指标公式" :rows="2" label="指标公式" :required="false" colspan="24"></yu-xform-item> -->
        <yu-xform-item ctype="textarea" maxlength="200" name="remark"   placeholder="请输入备注" :rows="2" label="备注" colspan="24"></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="yx-checkmark" type="primary" @click="saveFn">保存</yu-button>
        <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
      </div>
    </yu-xform>
  </yu-xdialog>
</div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
yufp.lookup.reg('STD_ZB_FNC_CONFTYP,STD_ZB_FNC_ON_TYP');
export default {
  data: function () {
    return {
      itemIdable: false,
      dataUrl: backend.cmisCus + '/api/nrcs-cms/fncconfitems/q/fncconfitems/list',
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
         *  取消
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
      var url = backend.cmisCus + '/api/nrcs-cms/fncconfitems/s/fncconfitems/add';
      if (_this.viewType == 'EDIT') {
        url = backend.cmisCus + '/api/nrcs-cms/fncconfitems/s/fncconfitems/update';
      }
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
            _this.dialogVisible = false;
          }
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
      _this.itemIdable = false;
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
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.itemIdable = true;
      _this.switchStatus('EDIT', true);
      var selection = _this.$refs.refTable.selections[0];
      var fncConfTyp = selection.fncConfTyp;
      if (fncConfTyp === '13' || fncConfTyp === '14' || fncConfTyp === '15') { // 简表类型不可以修改
        this.$message({ message: '简表类型不可以修改!', type: 'warning' });
        _this.formDisabled = true;
      }
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
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.itemIdable = true;
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },
    /**
         * 删除
         */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        return this.$message({ message: '请先选择一条记录!', type: 'warning' });
      }
      var fncConfTyp = selections[0].fncConfTyp;
      if (fncConfTyp === '13' || fncConfTyp === '14' || fncConfTyp === '15') {
        this.$message({ message: '简表类型不可以删除!', type: 'warning' });
        return;
      }
      var len = selections.length, arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }
      _this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCus + '/api/nrcs-cms/fncconfitems/s/fncconfitems/delete',
              data: {
                itemId: selections[0].itemId
              },
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  this.$message('操作成功');
                  _this.dialogVisible = false;
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>