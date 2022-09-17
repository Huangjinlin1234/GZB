
<template>
  <!--
    @created by 屈文
    @description 担保合同信息
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-panel title="担保合同信息" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" ref="refForm"></yu-xform>
            <yu-toolbar>
              <yu-button @click="infoFn">查看</yu-button>
            </yu-toolbar>
          <!--以下列表字段暂不确定-->
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST" :base-params="baseParams">
            <yu-xtable-column label="担保合同编号" prop="guarContNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="是否授信项下" prop="isUnderLmt" width:="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="是否追加担保" prop="isSuperaddGuar" width:="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保合同类型" prop="guarContType" width:="120" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarWay" width:="120" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="担保合同金额" prop="guarAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保起始日" prop="guarStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保到期日" prop="guarEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE');
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
import { mapGetters } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  data: function () {
    return {
      baseParams: {},
      dataUrl: backend.cmisBiz + '/api/grtguarbizrstrel/querygrtguarcontbyparams',
      activeName: 'messageTip',
      searchFormdata: {},
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  created () {
    var _this = this;
    var data = {};
    var contNo = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      contNo = data.param.contNo;
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      contNo = data.contNo;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      contNo = data.contNo;
    }
    this.baseParams = {contNo: contNo};
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 查看
    infoFn: function () {
      var _this = this;
      var jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      // _this.$dialog.open('', 'xwmanage/iqpManage/accLoan/accLoanListIndexForXd', 1000, 1000, jsoPar);
      jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      jsoPar['op'] = 'VIEW';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        jsoPar,
      );
    }
  }
};
</script>
