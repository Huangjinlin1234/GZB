
<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 以物抵债登记
  -->
  <div>
  <yu-tabs v-model="activeName">
   <yu-tab-pane label="以物抵债申请" name="base">
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
              <yu-xform-item label="业务流水号" name="pdraiSerno" placeholder="精确查询"></yu-xform-item>
              <yu-xform-item label="客户编号" name="cusId"  placeholder="精确查询"></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" placeholder="模糊查询"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="——请选择——" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="以物抵债登记申请列表" :hideFilter="false" :collapseHide="false" style="margin-top:15px">
        <yu-button-drop>
          <yu-button type="primary" @click="addFn">新增</yu-button>
          <yu-button type="primary" @click="modifyFn">修改</yu-button>
          <yu-button type="primary" @click="deleteFn">删除</yu-button>
          <yu-button type="primary" @click="infoFn">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl"
      :base-params="baseParams" selection-type="radio" requestType="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick">
        <yu-xtable-column align="center" label="业务流水号" prop="pdraiSerno"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息" prop="totalTqlxAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵押物编号" prop="pldimnNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵债物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column align="center" label="接收价值" prop="rcvValue"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="审批状态" prop="approveStatus"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
   </yu-tab-pane>
   <yu-tab-pane label="以物抵债申请历史" name="two">
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
              <yu-xform-item label="业务流水号" name="pdraiSerno" placeholder="精确查询"></yu-xform-item>
              <yu-xform-item label="客户编号" name="cusId"  placeholder="精确查询"></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" placeholder="模糊查询"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="——请选择——" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="以物抵债登记申请历史列表" :hideFilter="false" :collapseHide="false" style="margin-top:15px">
       <yu-button-drop>
        <yu-button type="primary" @click="infoHisFn">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrlHis"
      :base-params="baseParam" selection-type="radio" requestType="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick">
        <yu-xtable-column align="center" label="业务流水号" prop="pdraiSerno"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息" prop="totalTqlxAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵押物编号" prop="pldimnNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵债物名称" prop="resistDebtType"></yu-xtable-column>
        <yu-xtable-column align="center" label="接收价值" prop="rcvValue"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="审批状态" prop="approveStatus"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
   </yu-tab-pane>
  </yu-tabs>

  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  data: function () {
    return {
      searchFormdata: {},
      activeName: 'base',
      dataUrl: backend.cmisNpam + '/api/plabartplddebtappinfo/tosignlist',
      dataUrlHis: backend.cmisNpam + '/api/plabartplddebtappinfo/doneSignlist',
      baseParams: {
        sort: 'update_time'
      }

    };
  },
  methods: {
    getReturn: function () {
      this.$ref.refTable.remoteData();
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppGoDetail',
        key: 'addPlaLawApp', // 必传
        title: '以物抵贷登记向导',
        data: {
          getReturn: _this.getReturn
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var appSerno = _this.$refs.refTable.selections[0].appSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppInfoDetail',
        key: 'editPlaLawApp' + appSerno, // 必传
        title: '诉讼申请修改',
        data: {
          appSerno: appSerno,
          viewType: 'EDIT',
          getReturn: _this.getReturn
        }
      });
    },
    infoHisFn: function () {
      var _this = this;
      if (_this.$refs.refTableHis.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var appSerno = _this.$refs.refTableHis.selections[0].appSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppInfoDetail',
        key: 'detailPlaLawApp' + appSerno, // 必传
        title: '以物抵债详情',
        data: {
          appSerno: appSerno,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var appSerno = _this.$refs.refTable.selections[0].appSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppInfoDetail',
        key: 'detailPlaLawApp' + appSerno, // 必传
        title: '以物抵债申请历史详情',
        data: {
          appSerno: appSerno,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plalawapp/delete/',
              data: JSON.stringify(selectionsAry[0]),
              callback: function (code, message, response) {
                _this.$ref.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>
