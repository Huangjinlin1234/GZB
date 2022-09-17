<template>
  <div>
    <yu-panel title="同业客户授信批复" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="批复编号" placeholder="批复编号" ctype="input" name="replySerno"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="批复编号" prop="replySerno" width="200"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
        <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="accStatus" data-code="STD_REPLY_STATUS"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_REPLY_STATUS,STD_REPLY_STATUS,STD_APPR_MODE,STD_ZB_APPR_STATUS,STD_FINAL_APPR_BR_TYPE');
export default{
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/lmtintbankacc/getReplySerno',
      baseParams: {}
    };
  },
  methods: {
    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.refTable.selections[0];
      //获取机构类型
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprelcusinfo/selectBySerno',
        data: {
          cusId: params.cusId,
          serno: params.serno
        },
        callback(code, message, response) {
          if (response.data) {
            params.intbankOrgType = response.data.intbankOrgType;
            _this.$dialog.close(_this.dialogId, params);
          } else {
            _this.$message({
              message: '机构类型获取失败！',
              type: 'warning'
            });
            return;
          }
        }
      });
      //this.$dialog.close(this.dialogId, params);
    },
    /**
     * 取消
     */
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
