<template>
  <div>
    <yu-panel title="调查任务分配表列表" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">

          <yu-xform-item label="证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" ></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="surveySerno" fuzzy-query="both" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="分配状态" ctype="select" data-code="STD_DIVIS_STATUS" placeholder="分配状态" name="divisStatus" disabled value="101"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>

        </yu-button-drop>
      </template>
        <yu-button ref="btn_$query" @click="onBillListView" type="primary"  v-if="checkCtrl('view')">查看</yu-button>
      <!--2021年7月8日19:01:47  王玉坤说取消该功能    <yu-button ref="btn_queryImage" @click="customClick('queryImage')">查看影像</yu-button> -->
          <yu-button ref="btn_taskallocation" @click="customClick('taskallocation')" type="primary"  v-if="checkCtrl('taskAllocation')">任务分配</yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST"  selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="params">
        <yu-xtable-column label="主键" prop="pkId" width="100" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="业务编号" prop="surveySerno" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="110"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="获客来源" prop="cusChannel" data-code="STD_CUS_CHANNEL"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="175"></yu-xtable-column>
        <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
        <yu-xtable-column label="进件时间" prop="intoTime" width="110"></yu-xtable-column>
        <yu-xtable-column label="分配状态" prop="divisStatus" data-code="STD_DIVIS_STATUS"></yu-xtable-column>
        <yu-xtable-column label="分配时间" prop="divisTime" width="110"></yu-xtable-column>
        <yu-xtable-column label="处理人" prop="prcIdName"  :formatter="formatter"></yu-xtable-column>
        <yu-xtable-column label="贷款类别" prop="loanType" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="所属条线" prop="belgLine" data-code="STD_PLA_BIZ_LINE"></yu-xtable-column>
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
lookup.reg('STD_ZB_YES_NO,STD_BELG_LINE,STD_DATA_SOUR,STD_DIVIS_STATUS,STD_ZB_CERT_TYP,STD_ZB_SUIT_BIZ_LINE,STD_CUS_CHANNEL,STD_PLA_BIZ_LINE');
export default{
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
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
      dataUrl: this.$backend.cmisBiz + '/api/lmtsurveytaskdivis/findlistbymodel',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtsurveytaskdivis/delete/'
    };
  },
  methods: {
    formatter: function (row, column) {
      if (row.prcIdName == 'null') { return null }
    }
  }
};
</script>
