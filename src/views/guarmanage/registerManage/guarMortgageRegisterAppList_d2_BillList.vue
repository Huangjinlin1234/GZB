<template>
  <div>
    <yu-panel title="抵押登记申请历史列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="担保合同编号" ctype="input" placeholder="担保合同编号" name="guarContNo"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态"  data-code="STD_ZB_APPR_STATUS" name="approveStatus"></yu-xform-item>
          <yu-xform-item label="是否在线办理抵押" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否在线办理抵押" name="isRegOnline" ></yu-xform-item>
          <yu-xform-item label="是否先放款后抵押" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否先放款后抵押" name="beforehandInd" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('viewhis')" @click="customClick('doViewHistory')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" show-hidden-menu="true" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true" request-type="POST">
        <yu-xtable-column label="申请流水号" prop="serno" width="240"></yu-xtable-column>
        <yu-xtable-column label="抵押办理类型" prop="regType" data-code="STD_REG_TYPE" width="120"></yu-xtable-column>
        <yu-xtable-column label="是否在线办理" prop="isRegOnline" data-code="STD_ZB_YES_NO" width="120"></yu-xtable-column>
        <yu-xtable-column label="是否先放款后抵押" prop="beforehandInd" data-code="STD_ZB_YES_NO" width="140"></yu-xtable-column>
        <yu-xtable-column label="担保合同编号" prop="guarContNo" width="240">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewContNo(scope.row.guarContNo)">{{ scope.row.guarContNo }}</a>
           </template>
        </yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_GRT_TYPE" width="120" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"  width="120"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      searchData: {condition: {
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        regType: '01',
        approveStatus: '996,997,998',
        oprType: '01'
      },
      'sort': 'input_date desc'
      },
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      logicDeleteUrl: this.$backend.cmisBiz + '/api/guarmortgagemanageapp/deleteOnlogic',
      dataUrl: this.$backend.cmisBiz + '/api/guarmortgagemanageapp/queryList',
      baseParams: {}
    };
  },
  methods: {
    /**
     * 合同信息查看
     */
    viewContNo: function (contNo) {
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/grtguarcont/queryList',
        data: { condition: JSON.stringify({ oprType: '01', 'guarContNo': contNo }) },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let jsoPar = response.data[0];
            if (jsoPar == null || jsoPar == '') {
              this.$xutils.showMsgBox(
                '提示',
                '无该合同信息',
                350,
                150
              );
              return;
            }
            jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
            jsoPar['op'] = 'VIEW';
            this.$dialog.open(
              '',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              jsoPar,
              this.getDialogDataFunc,
              true,
              true
            );
          }
        }
      });
    }
  }
};
</script>
