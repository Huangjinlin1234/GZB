<template>
  <div class="tab-form">
    <yu-panel title="同业客户授信申报审批" panel-type="simple">
      <yu-tabs type="card">
        <yu-tab-pane label="授信申报详情">
          <lmtIntBankAppDetails :pageParams="pageParams"></lmtIntBankAppDetails>
        </yu-tab-pane>
        <yu-tab-pane label="审查报告">
          <lmtIntBankAppReport :pageParams="pageParams"></lmtIntBankAppReport>
        </yu-tab-pane>
      </yu-tabs>
    </yu-panel>
  </div>
</template>

<script>
import lmtIntBankAppReport from "./lmtIntBankAppReport";
import lmtIntBankAppDetails from "../lmtIntBankApp/lmtIntBankAppDetails";
export default {
  components: { lmtIntBankAppReport, lmtIntBankAppDetails },
  props: {
    bizPageData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: function() {
    return {
      pageParams: ""
    };
  },
  created() {
    console.log(this.bizPageData);
    let instanceInfo = this.bizPageData.instanceInfo;
    let lmtType = this.bizPageData.flowParam.lmtType;
    let serno, cusId, op;
    op = 'DETAIL';
    serno = instanceInfo.bizId;
    cusId = instanceInfo.bizUserId;  
    let selectType = 'Info';
    if(lmtType == '05'){
        selectType = 'Back';
    }
    this.pageParams = {
      serno: serno,
      cusId: cusId,
      op: op,
      selectType: selectType
      
    };
  },
  mounted: function() {
    
  },
  methods: {}
};
</script>

<style></style>
