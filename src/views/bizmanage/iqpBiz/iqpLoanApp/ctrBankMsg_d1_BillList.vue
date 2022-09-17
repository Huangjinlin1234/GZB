<template>
  <div>
    <yu-panel title="参与行信息" panel-type="simple">
      <yu-toolBar>
        <yu-button ref="btn_onAdd" @click="customClick('onAdd')" :hidden="!isShowButton">新增</yu-button>
        <yu-button ref="btn_onUpdate" @click="customClick('onUpdate')" :hidden="!isShowButton">修改</yu-button>
        <yu-button ref="btn_onDelete" @click="customClick('onDelete')" :hidden="!isShowButton">删除</yu-button>
        <yu-button ref="btn_onCheck" @click="customClick('onCheck')" >查看</yu-button>
      </yu-toolBar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="post">
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="合同申请业务号" prop="serno" hide-column></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" hide-column></yu-xtable-column>
        <yu-xtable-column label="参与行行号" prop="prtcptBankNo"></yu-xtable-column>
        <yu-xtable-column label="参与行名称" prop="prtcptBankName"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="参与行类型" prop="prtcptType" data-code="STD_PRTCPT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="参与比例" prop="prtcptRate"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
        <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
        <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId" hide-column></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/iqploanappprtcptbanksub/selectBySerno',
      baseParams: {condition: {'serno': this.getFactory().contextData.iqpSerno} },
      isShowButton: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let op = this.getFactory().contextData.op;
      if (op === 'VIEW') {
        this.isShowButton = false;
      }
    }
  }
};
</script>