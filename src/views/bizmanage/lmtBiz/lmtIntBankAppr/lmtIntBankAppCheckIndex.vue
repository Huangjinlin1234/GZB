<template>
  <div class="tab-form">
  <yu-panel title="同业客户授信申报审批" panel-type="simple">
  <yu-tabs type="card">
  <yu-tab-pane label="授信申报详情"  >
  <lmtIntBankApprDetails></lmtIntBankApprDetails>
  </yu-tab-pane>
  <yu-tab-pane label="核查报告" >
    <lmtIntBankAppCheckReport></lmtIntBankAppCheckReport>
  </yu-tab-pane>
  </yu-tabs>
  </yu-panel>
  </div>
</template>

<script>

import lmtIntBankAppCheckReport from './lmtIntBankAppCheckReport';
import lmtIntBankApprDetails from './lmtIntBankApprDetails';
export default {
    components: { lmtIntBankAppCheckReport, lmtIntBankApprDetails},
    data: function(){
        return {
            

        }
    },
    mounted () {

  },
   methods: {
       
   }
}
</script>

<style>

</style>