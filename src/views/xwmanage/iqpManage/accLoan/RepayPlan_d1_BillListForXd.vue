<template>
<div>
  <div v-if="prdTypeProp != 'P042'">
    <d1-A-billlist  ref="d1_A_BillList" :default-load="false"></d1-A-billlist>
  </div>
  <div v-else>
    <d1-B-billlist  ref="d1_B_BillList"  :default-load="false"></d1-B-billlist>
  </div>
</div>
</template>
<script>
import d1ABilllist from './RepayPlan_d1_A_BillListForXd.vue';
import d1BBilllist from './RepayPlan_d1_B_BillListForXd.vue';


export default {
  components: { d1ABilllist, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      prdTypeProp : ''
    };
  },
  created: function () {
    this.prdTypeProp = this.getFactory().contextData.prd_type_prop;
  }
};
</script>