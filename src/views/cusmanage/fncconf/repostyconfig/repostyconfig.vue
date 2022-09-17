<template>
<div style="padding: 0 5px;">
  <yu-panel panel-type="normal" title="报表项目配置">
  <template slot="filter">
  <yu-xform related-table-name="refTable" form-type="search" :remove-empty="true">
    <yu-xform-group :column="3" colspan="8">
      <yu-xform-item ctype="input" name="styleId" placeholder="报表样式编号" :required="false" ></yu-xform-item>
      <yu-xform-item ctype="input" name="fncConfDisName" placeholder="显示名称" :required="false" ></yu-xform-item>
    </yu-xform-group>
  </yu-xform>
  </template>
    <yu-button-drop>
      <yu-button icon="yx-plus" @click="addFn">新增</yu-button>
      <yu-button icon="yx-pencil" @click="modifyFn">修改</yu-button>
      <yu-button icon="yx-bin" @click="deleteFn">删除</yu-button>
      <yu-button icon="yx-file-empty" @click="infoFn">查看</yu-button>
      <yu-button icon="yx-copy" @click="copyFn">复制</yu-button>
    </yu-button-drop>
  <yu-xtable ref="refTable" condition-key="condition" :data-url="dataUrl" selection-type="radio">
    <yu-xtable-column label="报表样式编号" prop="styleId" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="报表名称" prop="fncName" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="显示名称" prop="fncConfDisName" header-align="left">
    </yu-xtable-column>
    <yu-xtable-column label="所属报表种类" prop="fncConfTyp" header-align="left" data-code="STD_ZB_FNC_CONFTYP">
    </yu-xtable-column>
    <yu-xtable-column label="数据列数" prop="fncConfDataCol" header-align="left" data-code="STD_ZB_FNC_COL">
    </yu-xtable-column>
    <yu-xtable-column label="栏位" prop="fncConfCotes" header-align="left" data-code="STD_ZB_FNC_COTES">
    </yu-xtable-column>
  </yu-xtable>
  </yu-panel>
  <!-- 新增/修改/查看 -->
  <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="750px">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
      <yu-xform-group colspan="12">
        <yu-xform-item ctype="input" name="styleId" placeholder="请输入报表样式编号" label="报表样式编号" rules="required" :disabled="styleIdDisabled"></yu-xform-item>
        <yu-xform-item ctype="input" name="fncConfDisName" placeholder="请输入显示名称" label="显示名称" rules="required"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncConfTyp" placeholder="请输入所属报表种类" label="所属报表种类" data-code="STD_ZB_FNC_CONFTYP" @change="changeFn" rules="required"></yu-xform-item>
        <yu-xform-item ctype="input" name="fncName" placeholder="请输入报表名称" label="报表名称" :disabled="true"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncConfDataCol" placeholder="请输入数据列数" label="数据列数" data-code="STD_ZB_FNC_COL" rules="required"></yu-xform-item>
        <yu-xform-item ctype="select" name="fncConfCotes" placeholder="请输入栏位" label="栏位" data-code="STD_ZB_FNC_COTES" rules="required"></yu-xform-item>
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
yufp.lookup.reg('STD_ZB_FNC_CONFTYP,STD_ZB_FNC_COL, STD_ZB_FNC_COTES');
export default {
  data: function () {
    return {
      styleIdDisabled: false,
      dataUrl: backend.cmisCus + '/api/nrcs-cms/fncconfstyles/q/fncconfstyles/list',
      formdata: {},
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
      // fncOptions: []
    };
  },
  methods: {
    changeFn: function (value) {
      // 01资产负债表 FNC_STAT_BS
      // 02损益表  FNC_STAT_IS
      // 03现金流量 FNC_STAT_CFS
      // 04财务指标 FNC_INDEX_RPT
      // 05所有者权益变动表 FNC_STAT_SOE
      // 06财务简表 FNC_STAT_SL
      // 07其他财务报表  FNC_STAT_SL
      // 11资产负债表（个人）FNC_STAT_SOFP
      // 12利润表(个人)FNC_STAT_PS
      // 13资产负债简表FNC_STAT_BSS
      // 14利润简表FNC_STAT_PSS
      // 15财务分析简表FNC_STAT_FAS
      var fncName = '';
      switch (value) {
      case '01':
        fncName = 'FNC_STAT_BS';
        break;
      case '02':
        fncName = 'FNC_STAT_IS';
        break;
      case '03':
        fncName = 'FNC_STAT_CFS';
        break;
      case '04':
        fncName = 'FNC_INDEX_RPT';
        break;
      case '05':
        fncName = 'FNC_STAT_SOE';
        break;
      case '06':
        fncName = 'FNC_STAT_SL';
        break;
      case '07':
        fncName = 'FNC_STAT_SL';
        break;
      case '11':
        fncName = 'FNC_STAT_SOFP';
        break;
      case '12':
        fncName = 'FNC_STAT_PS';
        break;
      case '13':
        fncName = 'FNC_STAT_BSS';
        break;
      case '14':
        fncName = 'FNC_STAT_PSS';
        break;
      case '15':
        fncName = 'FNC_STAT_FAS';
        break;
      default:
        yufp.logger.info(value);
      }
      this.formdata.fncName = fncName;
    },
    /**
         * 复制
         */
    copyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        return yufp.util.message({ message: '请先选择一条记录', type: 'warning' });
      }
      var fncConfTyp = selectionsAry[0].fncConfTyp;
      if (fncConfTyp === '13' || fncConfTyp === '14' || fncConfTyp === '15') {
        return yufp.util.message({ message: '简表类型不可以复制!', type: 'warning' });
      }
      _this.switchStatus('COPY', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata);
        _this.formdata.styleId = selectionsAry[0] + '1';
      });
    },
    /**
         * 取消
         */
    cancelFn: function () {
      this.dialogVisible = false;
    },
    /**
         * 保存
         */
    saveFn: function () {
      var _this = this;
      if (_this.formdata.fncConfDefFmtList != null) {
        delete _this.formdata.fncConfDefFmtList;
      }
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var selectionsAry = _this.$refs.refTable.selections;
      if (_this.viewType === 'COPY' && selectionsAry[0].styleId === model.styleId) {
        return yufp.util.message({message: '请修改报表样式编号', type: 'warning'});
      }
      var url = backend.cmisCus + '/api/nrcs-cms/fncconfstyles/s/fncconfstyles/add';
      if (_this.viewType == 'EDIT') {
        url = backend.cmisCus + '/api/nrcs-cms/fncconfstyles/s/fncconfstyles/update';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        //   callback: function (code, message, response) {
        //     yufp.util.responseStatus(code, message, response, function (response) {
        //       _this.$refs.refTable.remoteData();
        //       _this.$message.success('操作成功');
        //       _this.dialogVisible = false;
        //     });
        //   }
        // });
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message.success('操作成功');
            _this.dialogVisible = false;
          } else {
            _this.$message.error(response.message);
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
      this.viewType = viewType;
      this.saveBtnShow = editable;
      this.dialogVisible = true;
      this.formDisabled = !editable;
    },
    /**
         * 新增按钮
         */
    addFn: function () {
      var _this = this;
      _this.styleIdDisabled = false;
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
      _this.styleIdDisabled = true;
      if (_this.$refs.refTable.selections.length != 1) {
        yufp.util.message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.switchStatus('EDIT', true);
      var selection = _this.$refs.refTable.selections[0];
      var fncConfTyp = selection.fncConfTyp;
      if (fncConfTyp === '13' || fncConfTyp === '14' || fncConfTyp === '15') { // 简表类型不可以修改
        yufp.util.message({ message: '简表类型不可以修改!', type: 'warning' });
        _this.formDisabled = true;
      }
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        obj.fncConfDataCol = obj.fncConfDataCol.toString();
        obj.fncConfCotes = obj.fncConfCotes.toString();
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
        yufp.util.message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        selectionsAry[0].fncConfDataCol = selectionsAry[0].fncConfDataCol.toString();
        selectionsAry[0].fncConfCotes = selectionsAry[0].fncConfCotes.toString();
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
        yufp.util.message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var fncConfTyp = selections[0].fncConfTyp;
      if (fncConfTyp === '13' || fncConfTyp === '14' || fncConfTyp === '15') {
        return yufp.util.message({ message: '简表类型不可以删除!', type: 'warning' });
      }
      var len = selections.length, arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCus + '/api/nrcs-cms/fncconfstyles/s/fncconfstyles/delete',
              data: {
                styleId: selections[0].styleId
              },
              callback: function (code, message, response) {
                if (code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$message.success('删除成功');
                  _this.dialogVisible = false;
                } else {
                  _this.$message.error(response.message);
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