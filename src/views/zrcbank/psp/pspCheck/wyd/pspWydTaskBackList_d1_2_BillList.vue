<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="任务编号" name="taskNo"  placeholder="任务编号"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="微业贷退回申请历史列表" :hideFilter="false" :collapseHide="false">
      <div>
        <yu-button type="primary" @click="doView">查看</yu-button>
      </div>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="radio" requestType="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick">
        <yu-xtable-column align="center" label="任务编号" prop="taskNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="退回原因" prop="backReason" data-code="STD_ZB_BKREASON_STATUS"></yu-xtable-column>
        <yu-xtable-column align="center" label="退回日期" prop="backDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="实际经营地址" prop="relArrdess"></yu-xtable-column>
        <yu-xtable-column align="center" label="对应支行" prop="relBrId"></yu-xtable-column>
        <yu-xtable-column align="center" label="联系客户时间1" prop="contactTime1"></yu-xtable-column>
        <yu-xtable-column align="center" label="联系客户时间2" prop="contactTime2"></yu-xtable-column>
        <yu-xtable-column align="center" label="联系客户时间3" prop="contactTime3"></yu-xtable-column>
        <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_BKREASON_STATUS,STD_ZB_APPR_STATUS');
export default {
  name: 'D11BillList',
  mixins: [mixinList],
  props: {
    active:String
  },
  data: function () {
    return {
      baseParams: {condition:{'approveStatusList': '998,997,111', 'inputId': this.$xutils.getLoginUserInfo().loginCode}, sort: 'backDate desc'},
      searchFormdata: '',
      dataUrl: this.$backend.cmisPsp + '/api/pspwydtaskback/'
    };
  },
  watch:{
    active(newVal){
      if(newVal == "2") {
         this.$refs.refTable.remoteData()
      }
     
    }
  },
  methods: {
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

      selectionsAry = this.$refs.refTable.selections[0];
      selectionsAry['operate'] = 'details';
      this.$dialog.open(
        '微业贷贷后任务退回修改',
        'zrcbank/psp/pspCheck/wyd/pspWydTaskBackList_dialog_BillCard',
        '1000',
        '600',
        selectionsAry,
        () => {
        // 列表刷新
        _this.$refs.refTable.remoteData();
      }
      );
    }
  }
};
</script>