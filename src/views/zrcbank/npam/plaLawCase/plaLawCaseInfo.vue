
<template>
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ctype="input"></yu-xform-item>
            <yu-xform-item label="案件编号" placeholder="精确查询" name="caseNo" ctype="input"></yu-xform-item>
            <yu-xform-item label="案件进程" placeholder="精确查询" name="caseProcess" ctype="select" data-code="STD_LAW_CASE_PROCESS"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="立案日期" placeholder="模糊查询" name="filingDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="诉讼类型" placeholder="精确查询" name="lawsuitType" ctype="select" data-code="STD_LAWSUIT_TYPE"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
       </template>
      </yu-panel>
   <yu-panel title="诉讼案件列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop type="button">
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">进展登记</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">作废</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number selection-type="radio" :data-url="urls.index" :base-params="params" condition-key="condition" style="margin-top:10px" requestType="POST">
        <yu-xtable-column align="center" label="案件编号" prop="caseNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="立案日期" prop="filingDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="案件进程" prop="caseProcess" data-code="STD_LAW_CASE_PROCESS"></yu-xtable-column>
        <yu-xtable-column align="center" label="标的金额（元）" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="本金总额（元）" prop="capAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息总额（元）" prop="totalTqlxAmt" :formatter="Currency" width="150px"></yu-xtable-column>
        <yu-xtable-column align="center" label="诉讼类型" prop="lawsuitType" data-code="STD_LAWSUIT_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_LAW_CASE_PROCESS,STD_LAWSUIT_TYPE');
export default {
  mixins: [mixin],
  data: function () {
    return {
      urls: {
        index: backend.cmisNpam + '/api/plalawcaseinfo/queryPlaLawCaseInfoList'
      },
      params: {
        condition: {oprType: '0'},
        sort: 'updateTime desc,caseSerno'}
    };
  },
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      var caseSerno = _this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ');
      _this.$router.addTab({
        name: 'zrcbank/npam/plaLawCase/plaLawCaseGuide',
        key: 'plaLawCaseGuide' + new Date().getTime(),
        title: '诉讼案件新增向导',
        data: {
          caseSerno: caseSerno,
          viewType: 'ADD',
          callback: _this.reload
        }
      });
    },
    /**
     * 进展登记
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var caseSerno = _this.$refs.refTable.selections[0].caseSerno;
      var cusId = _this.$refs.refTable.selections[0].cusId;
      this.$router.addTab({
        name: 'zrcbank/npam/plaLawCase/plaLawCaseBase',
        key: 'plaLawCaseBase' + new Date().getTime(),
        title: '进展登记',
        data: {
          viewType: 'EDIT',
          caseSerno: caseSerno,
          cusId: cusId,
          callback: _this.reload
        }
      });
    },
    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var caseSerno = _this.$refs.refTable.selections[0].caseSerno;
      var cusId = _this.$refs.refTable.selections[0].cusId;
      this.$router.addTab({
        name: 'zrcbank/npam/plaLawCase/plaLawCaseBase',
        key: 'plaLawCaseBase' + new Date().getTime() + 1,
        title: '查看进展登记',
        data: {
          viewType: 'DETAIL',
          caseSerno: caseSerno,
          cusId: cusId,
          callback: _this.reload

        }
      });
    },
    /**
     * 作废
     */
    deleteFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var caseSerno = _this.$refs.refTable.selections[0].caseSerno;
      _this.$confirm('此操作将作废当前案件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plalawcaseinfo/delete/' + caseSerno,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.reload();
                  _this.$message('操作成功');
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },
    /**
     * 刷新表格数据
     */
    reload: function () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>
