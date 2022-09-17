<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="confirmFn">确定</yu-button>
      <yu-button type="primary" @click="onClose">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1Billlist from './guarMainContSelect_d1_BillList.vue';
/* 抵押登记申请-押品选取*/
let userInfo;

let parm = {};

export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {      
      var parm = this.pageParams;
      // 展示担保合同下所有抵押品
      this.d1_BillList = this.$refs.d1_BillList;      
      this.d1_BillList.baseParams = {condition: JSON.stringify({guarContNo: parm.guarContNo})};
    },

    /** *确定****/
    confirmFn () {
      // 检验必输项       
      const jsoPar = this.$refs.d1_BillList.$refs.refTable.selections[0];
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择至少一条记录进行操作!\r\n请重新操作!', -1, -1);
        return;
      }      
      this.$dialog.close(this.dialogId, jsoPar);
    },   
   

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
      // this.$dialog.closeAll();
    }  
  }
};
</script>
