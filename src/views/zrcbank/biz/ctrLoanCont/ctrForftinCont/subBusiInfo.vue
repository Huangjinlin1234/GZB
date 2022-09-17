
<template>
  <!--
    @created by
    @description 项下业务信息
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-panel title="项下业务信息" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" ref="refForm"></yu-xform>
            <yu-toolbar>
              <yu-button @click="infoFn">查看</yu-button>
            </yu-toolbar>
          <!--以下列表字段暂不确定-->
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="借据编号" prop="billNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width:="120" data-code="STD_ZB_ASSURE_MEANS"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="contCurType" width:="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="金额" prop="loanAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="起始日" prop="startDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="到期日" prop="endDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ZB_BIZ_ACC_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    </yu-tabs>
  </div>
</template>
<script>
// 字典项(担保方式、协议状态、合同类型、协议币种、是否、审批状态)
yufp.lookup.reg('STD_ZB_ASSURE_MEANS,STD_ZB_CONT_TYP,STD_CONT_TYPE,STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_ZB_APPR_STATUS');
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
import { mapGetters } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/accloan/selectaccloanrepay',
      activeName: 'messageTip',
      searchFormdata: {},
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 查看
    infoFn: function () {

    }
  }
};
</script>
