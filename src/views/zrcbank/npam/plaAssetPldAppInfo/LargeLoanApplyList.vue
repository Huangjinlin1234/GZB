
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息-列表
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform related-table-name="largeLoanApplyListTable" form-type="search" ref="searchForm" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="papaiSerno" placeholder="精确查询"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId"  placeholder="精确查询"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" placeholder="模糊查询"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="——请选择——" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="抵债资产处置列表" :hideFilter="false" :collapseHide="false">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary"  @click="addFn">新增</yu-button>
          <yu-button type="primary" @click="modifyFn">修改</yu-button>
          <yu-button type="primary" @click="deleteFn">删除</yu-button>
          <yu-button type="primary" @click="infoFn">查看</yu-button>
       </yu-button-drop>
       <yu-xtable ref="largeLoanApplyListTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams">
          <yu-xtable-column label="业务流水号" prop="papaiSerno"></yu-xtable-column>
          <yu-xtable-column label="抵债资产编号" prop="pldimnNo"></yu-xtable-column>
          <yu-xtable-column label="抵债资产名称" prop="pldimnName"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="处置方式" prop="dispMode" data-code="STD_DISP_TYPE"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
          <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
       </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
// import {lookup} from '@/utils';
yufp.lookup.reg('STD_DISP_TYPE,STD_ZB_APPR_STATUS');
export default {
  name: 'LargeLoanApplyList',
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisNpam + '/api/plaassetpldappinfo/tosignlist',
      batchDeleteUrl: this.$backend.cmisNpam + '/api/plaassetpldappinfo/delete/',
      searchFormdata: {
        papaiSerno: '',
        cusId: '',
        cusName: '',
        approveStatus: ''
      },
      baseParams: {

      }
    };
  },
  mounted: function () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshLargeLoanApplyListTable', this.refreshLargeLoanApplyListTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshLargeLoanApplyListTable');
  },
  methods: {
    /**
     * 表格刷新
     */
    refreshLargeLoanApplyListTable: function () {
      let _this = this;
      _this.$refs.largeLoanApplyListTable.remoteData();
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaAssetPldAppInfo/thingAssetDisposalManagementDetail/plaAssetPldAppInfoGo',
        key: new Date().getTime(), // 必传
        title: '抵债资产处置向导',
        data: {
          // getReturn: _this.getReturn,
          viewType: 'ADD',
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      let selData = _this.$refs.largeLoanApplyListTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let statusFlag = selData[0].approveStatus === '000' || selData[0].approveStatus === '992'; // 000为待发起,992为打回
      if (!statusFlag) { // 判断是否为待发起
        _this.$message({
          message: '请选择审批状态为待发起或打回的申请',
          type: 'warning'
        });
        return;
      }
      let papaiSerno = selData[0].papaiSerno;
      let path = 'zrcbank/npam/plaAssetPldAppInfo/thingAssetDisposalManagementDetail/plaAssetPldAppInfoDetail';
      _this.$router.addTab({
        name: path,
        key: 'plaAssetPldAppInfoEdit' + new Date().getTime(),
        title: '抵债资产处置修改',
        data: {
          viewType: 'EDIT', // 操作类型
          papaiSerno: papaiSerno,
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selData = _this.$refs.largeLoanApplyListTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let papaiSerno = selData[0].papaiSerno;
      let path = 'zrcbank/npam/plaAssetPldAppInfo/thingAssetDisposalManagementDetail/plaAssetPldAppInfoDetail';
      _this.$router.addTab({
        name: path,
        key: 'plaAssetPldAppInfoDetail' + new Date().getTime(),
        title: '抵债资产处置详情',
        data: {
          viewType: 'DETAIL', // 操作类型
          papaiSerno: papaiSerno,
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      let selections = _this.$refs.largeLoanApplyListTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let statusFlag = selections[0].approveStatus === '000' || selections[0].approveStatus === '992'; // 000为待发起,992为打回
      if (!statusFlag) { // 判断是否为待发起
        _this.$message({
          message: '请选择审批状态为待发起或打回的申请',
          type: 'warning'
        });
        return;
      }
      let papaiSerno = selections[0].papaiSerno;
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plaassetpldappinfo/delete/' + papaiSerno
        }).then(({code, message, data}) => {
          if (code == 0) {
            this.$message({ message: "删除成功！", type: 'success' });
            this.$refs.largeLoanApplyListTable.remoteData();
          } else {
            // 操作失败
            this.$message({ message: "删除失败！", type: 'warning' });
            this.$refs.largeLoanApplyListTable.remoteData();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
</script>
