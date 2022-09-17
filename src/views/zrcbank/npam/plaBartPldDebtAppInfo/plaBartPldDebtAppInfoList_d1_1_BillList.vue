<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="pdraiSerno"  placeholder="精确查询"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" placeholder="精确查询"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" placeholder="模糊查询" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="——请选择——" name="approveStatus" ctype="select" :options="dicOptions.docTypeOptions"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>

    <yu-panel title="以物抵债登记申请列表" :hideFilter="false" :collapseHide="false" >
      <yu-button-drop>
      <!--
        <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        <yu-button ref="btn_queryImage" @click="customClick('queryImage')"
          >查看影像</yu-button
        >
        <yu-button ref="btn_taskallocation" @click="customClick('taskallocation')">任务分配</yu-button>-->
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="doView" v-if="checkCtrl('view')">查看</yu-button>
      </yu-button-drop>
    <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="radio" requestType="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick">
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
      <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
    </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './surveyTaskDivisList_dialog_BillCard';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_APPR_STATUS');
export default {
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      dicOptions: {docTypeOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '992', value: '退回'}]},
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      params: {
        condition: {
          divisStatus: '101'
          // whData: '101,997'
        }
      },
      searchFormdata: {},
      dataUrl: this.$backend.cmisNpam + '/api/plabartplddebtappinfo/tosignlist',
      baseParams: {condition: JSON.stringify({'inputId': this.$xutils.getLoginUserInfo().loginCode }), sort:'createTime desc' },
      deleteUrl: this.$backend.cmisNpam + '/api/plabartplddebtappinfo/delete/'
    };
  },
  // created() {
  //   var _this = this;
  //   var appSerno = _this.$route.meta.params.appSerno;
  //   this.viewType = _this.$route.meta.params.viewType;
  //   yufp.service.request({
  //     method: "GET",
  //     url: backend.cmisNpam + "/api/plabartplddebtappinfo/tosignlist" + appSerno,
  //     callback: function (code, message, response) {
  //       if (response.code == 0) {
  //         _this.$nextTick(function () {
  //           yufp.clone(response.data, _this.formdata);
  //         });
  //       } else {
  //         _this.$message({
  //           message: response.message,
  //           type: "error",
  //         });
  //       }
  //     },
  //   });
  // },

  /* 列表数据更改后刷新 */
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppGoDetail',
        key: new Date().getTime() + 1, // 必传
        title: '以物抵债登记向导',
        data: {
          getReturn: _this.getReturn,
          viewType: 'ADD'
        }
      });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var selectAry = _this.$refs.refTable.selections;
      if (selectAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var statusFlag = selectAry[0].approveStatus === '000' || selectAry[0].approveStatus === '992'; // 000为待发起,992为打回
      if (!statusFlag) { // 判断是否为待发起
        _this.$message({
          message: '请选择审批状态为待发起或打回的申请',
          type: 'warning'
        });
        return;
      }

      var pdraiSerno = _this.$refs.refTable.selections[0].pdraiSerno;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaLawArbitrateDetil',
        key: 'plaBartPldDebtAppInfo' + new Date().getTime() + 1, // 必传
        title: '以物抵债登记修改',
        data: {
          getReturn: _this.getReturn,
          viewType: 'EDIT',
          pdraiSerno: pdraiSerno
        }
      });
      /*
      this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppInfoDetail',
        key: 'editPlaLawApp' + appSerno, // 必传
        title: '以物抵债修改',
        data: {
          appSerno: appSerno,
          viewType: 'EDIT',
          getReturn: _this.getReturn
        }
      });
      */
    },
    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // var pdraiSerno = _this.$refs.refTable.selections[0].pdraiSerno;
      let pdraiSerno = selectionsAry[0].pdraiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppInfoDetail',
        key: 'detailPlaLawApp' + new Date().getTime(), // 必传
        title: '以物抵债申请历史详情',
        data: {
          pdraiSerno: pdraiSerno,
          viewType: 'DETAIL'
          // getReturn: _this.getReturn
        }
      });
    },
    /**
     * 查看
     */
    doView () {
      var _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      // console.log(params);
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let pdraiSerno = selectionsAry[0].pdraiSerno;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaLawArbitrateDetil',
        key: 'plaLawArbitrateDetil' + new Date().getTime(), // 必传
        title: '以物抵债登记查看',
        data: {
          viewType: 'DETAIL',
          pdraiSerno: pdraiSerno
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
      if (selectionsAry[0].approveStatus == '111' || selectionsAry[0].approveStatus == '992') {
        _this.$message({
          message: '审批中和退回的数据无法删除',
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
              url: backend.cmisNpam + '/api/plabartplddebtappinfo/delete/' + selectionsAry[0].pdraiSerno,
              data: JSON.stringify(selectionsAry[0].pdraiSerno),
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
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
