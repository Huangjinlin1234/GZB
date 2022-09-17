<template>
  <div>
    <yu-panel title="" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="input" name="contNo"></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" name="bizType" data-code="STD_BUSI_TYPE" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" :base-params="baseParams" :pageable="true">
        <yu-xtable-column label="申请流水号" prop="serno" width="100" hide-column></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" width="100" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" width="100" data-code="STD_DISCCONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" width="100" data-code="STD_BUSI_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="contStartDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="批复编号" prop="replyNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId" width="100" hide-column></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrId" width="100" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onContinue">下一步</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CONT_STATUS,STD_CONT_TYPE,STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_BUSI_TYPE,STD_DISCCONT_TYPE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctrloancont/selectctrloanCyrRel',
      baseParams: {}
    };
  },
  created () {
    if (this.pageParams) {
      this.baseParams = {condition: {cusId: this.pageParams.cusId}};
    }
  },
  methods: {
    // 下一步
    onContinue () {
      var _this = this;
      var op = 'ADD';
      // console.log(_this);
      const selPars = _this.$refs.refTable.selections;
      if (selPars.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      // 不支持多条数据
      if (selPars.length != 1) {
        _this.$message('仅支持操作单条数据！');
        return;
      }
      debugger;
      selPars[0].subPrdSerno = this.pageParams.subPrdSerno;
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsubprdctrloancontrel/savectrLoancontdtodata',
        data: selPars[0]
      }).then(({ code, message, data }) => {
        if (code == 0) {
          if (data == true) {
            this.$message({ message: '操作成功', type: 'success' });
            this.$dialog.close(this.dialogId);
          } else {
            this.$message({ message: message, type: 'warning' });
          }
        }
      });
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
