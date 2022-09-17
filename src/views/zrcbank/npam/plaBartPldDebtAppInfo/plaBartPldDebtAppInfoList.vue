<template>
  <yu-tabs type="card" v-model="active" >
    <yu-tab-pane label="以物抵债申请" name="1">
      <d1-1-billlist ref="d1_1_BillList" :active="active"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="以物抵债申请历史" name="2">
      <d1-2-billlist ref="d1_2_BillList" :active="active"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './plaBartPldDebtAppInfoList_d1_1_BillList.vue';
import d12Billlist from './plaBartPldDebtAppInfoList_d1_2_BillList.vue';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null,
      active: '1'
    };
  },
 
  methods: {
  
  }
};
</script>
