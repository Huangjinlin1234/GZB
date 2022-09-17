<template>
  <yu-tabs type="card" v-model="active" >
    <yu-tab-pane label="微业贷退回申请" name="1">
      <d1-1-billlist ref="d1_1_BillList" :active="active"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="微业贷退回申请历史" name="2">
      <d1-2-billlist ref="d1_2_BillList" :active="active"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './pspWydTaskBackList_d1_1_BillList.vue';
import d12Billlist from './pspWydTaskBackList_d1_2_BillList.vue';
import { lookup } from '@/utils';
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
