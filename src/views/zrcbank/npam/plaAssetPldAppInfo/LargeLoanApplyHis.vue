
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息历史
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform related-table-name="largeLoanApplyHisTable" form-type="search" v-model="searchFormdata" label-width="120px">
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
          <yu-button type="primary" @click="infoFn">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="largeLoanApplyHisTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl">
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
import {lookup} from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_ZB_APPR_STATUS,STD_CARD_APP_CHNL');
export default {
  name: 'LargeLoanApplyHis',
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisNpam + '/api/plaassetpldappinfo/donesignlist',
      searchFormdata: {
        papaiSerno: '',
        cusId: '',
        cusName: '',
        approveStatus: ''
      }
    };
  },
  methods: {
    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selData = _this.$refs.largeLoanApplyHisTable.selections;
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
        key: 'plaAssetPldAppInfoDetail' + papaiSerno,
        title: '抵债资产处置详情',
        data: {
          viewType: 'DETAIL', // 操作类型
          papaiSerno: papaiSerno,
        }
      });
    },
    // /**
    //  * 表格点击查看详情
    //  */
    // showFuncDetail (row) {
    //   let _this = this;
    //   let path = 'zrcbank/npam/plaAssetPldAppInfo/thingAssetDisposalManagementDetail/plaAssetPldAppInfoDetail';
    //   let papaiSerno = row.papaiSerno;
    //   _this.$router.addTab({
    //     name: path,
    //     key: 'plaAssetPldAppInfoDetail' + papaiSerno,
    //     title: '抵债资产处置详情',
    //     data: {
    //         viewType: 'DETAIL', // 操作类型
    //         papaiSerno: papaiSerno,
    //       }
    //   });
    // }
  }
};
</script>
