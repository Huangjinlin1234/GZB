<template>
  <div>
    <yu-panel title="无还本续贷-资产负债">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="调查流水号" prop="indgtNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusNo"></yu-xtable-column>
        <yu-xtable-column label="查询对象名" prop="qryObjName"></yu-xtable-column>
        <yu-xtable-column label="查询对象证件号码" prop="qryObjCertNo"></yu-xtable-column>
        <yu-xtable-column label="与主借款人关系" prop="withMborrowRela"></yu-xtable-column>
        <yu-xtable-column label="查询原因描述" prop="qryResnDec"></yu-xtable-column>
        <yu-xtable-column label="发起查询时间" prop="initQryTime"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus"></yu-xtable-column>
        <yu-xtable-column label="有无报告" prop="flgReport"></yu-xtable-column>
        <yu-xtable-column label="报告生成日期" prop="reportCreateDate"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operation" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './noRepayDebtPage_dialog_BillCard';
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpriskqrybatch/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/iqpriskqrybatch/delete/'
    };
  },
  mounted () {
  }
};
</script>