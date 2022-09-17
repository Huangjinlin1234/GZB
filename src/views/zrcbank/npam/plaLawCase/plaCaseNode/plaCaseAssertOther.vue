<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-button-drop>
        <yu-button type="primary" @click="addPresasset" v-if="viewType == 'EDIT'">新增</yu-button>
        <yu-button type="primary" @click="saveAssertFn" v-if="viewType == 'EDIT'">保存</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="viewType == 'EDIT'">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number :data-url="dataUrl" selection-type="radio" condition-key="condition" :base-params="baseParam">
        <yu-xtable-column align="center" label="资产分类" prop="assetType" ctype="select" data-code="STD_ASSET_CLASS"></yu-xtable-column>
        <yu-xtable-column align="center" label="权属人" prop="autho" ctype="input"></yu-xtable-column>
        <yu-xtable-column align="center" label="剩余价值(元)" prop="surplusValue" ctype="input"></yu-xtable-column>
        <yu-xtable-column align="center" label="保全起始日期" prop="presStartDate" ctype="datepicker"></yu-xtable-column>
        <yu-xtable-column align="center" label="保全到期日期" prop="presEndDate" ctype="datepicker"></yu-xtable-column>
        <yu-xtable-column align="center" label=" 是否抵(质)押等优先权" prop="isPldPriWrr" ctype="select" data-code="YESNO"></yu-xtable-column>
        <yu-xtable-column align="center" label="保全顺位" prop="presOrder" ctype="input"></yu-xtable-column>
        <yu-xtable-column align="center" label="首保全法院/机关" prop="firstInsuCourt" ctype="input"></yu-xtable-column>
        <yu-xtable-column align="center" label="保全标的(元)" prop="presAmt" ctype="input"></yu-xtable-column>
        <yu-xtable-column align="center" label="备注" prop="memo" ctype="input"></yu-xtable-column>
      </yu-xtable>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
// 注册字典项
yufp.lookup.reg('YESNO,STD_ASSET_CLASS');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String
  },
  created () {
    var _this = this;
    if (_this.cusCorp) {
      _this.baseParam = { condition: JSON.stringify({ caseSerno: _this.cusCorp.caseSerno, isOtherPresAsset: '0' }) };
      _this.assertParam = { condition: JSON.stringify({ caseSerno: _this.cusCorp.cusId }) };
      _this.viewType = _this.cusCorp.viewType;
    }
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit;
    }
  },
  data: function () {
    return {
      dataUrl: backend.cmisNpam + '/api/plalawpresassetinfo/',
      // TODO 查询押品的接口
      assertUrl: '',
      baseParam: '',
      assertParam: '',
      viewType: 'EDIT',
      authDialogVisible: false
    };
  },
  methods: {
    addPresasset: function () {
      var _this = this;
      var row = {
        caseSerno: _this.cusCorp.caseSerno,
        isOtherPresAsset: '0'
      };
      _this.$refs['refTable']._data.tabledata.push(row);
      _this.$refs['refTable'].setCurrentRow(row);
    },
    deletePresasset: function () {
      var _this = this;
      var selections = _this.$refs['refTable'].selections;
      if (selections.length != 1) {
        _this.$message({ message: '请先选择一条数据', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plalawpresassetinfo/delete/' + selections[0].plpaiSerno,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs['refTable'].remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message({ message: '操作失败：', type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    savePresasset: function () {
      var _this = this;
      var selections = _this.$refs['refTable'].getEditRows();
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawpresassetinfo/batchInsert',
        data: JSON.stringify(selections),
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$refs['refTable'].remoteData();
            _this.$message('保存成功');
          } else {
            _this.$message({ message: '保存失败', type: 'error' });
          }
        }
      });
    },

    /*
     保存
     */
    saveAssertFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.getEditRows();
      var url;
      url = backend.cmisNpam + '/api/plalawpresassetinfo/batchInsert';
      var model = selectionsAry;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // _this.authDialogVisible = false;
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },

    deleteFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var url;
      url = backend.cmisNpam + '/api/plalawpresassetinfo/delete/' + selectionsAry[0].plpaiSerno;
      yufp.service.request({
        method: 'POST',
        url: url,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    }
  }
};
</script>
