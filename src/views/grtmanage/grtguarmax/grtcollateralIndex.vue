<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './grtcollateral_d1_BillList.vue'
//引入担保品、保证人押品
let pars = {};

export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      pars = this.pageParams;
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition('guar_cus_id = \'' + pars.borrower_id + '\'');
    },
  
    //引入
    onImport() {
      let selfPars = this.d1_BillList.getSelectedRowData();
  
      if (selfPars == null || selfPars == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
      }
  
      let rtnData = {};
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        url: this.$backend.cmisBiz + '/api/grtguarcontrel/queryIqpGuarBizRelAppExists',
        data: JSON.stringify(this.$xutils.toUpperCase(selfPars, true)),
  
        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', b + '；错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });
    }
  }
};
</script>
