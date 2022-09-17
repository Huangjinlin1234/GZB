<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './pvpLoanAppListAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      addPage: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 新增界面 下一步/取消按钮*/
    afterInit () {
      this.addPage = this.$refs.d1_BillCard;
    },

    // 新增 根据选取的合同来新增放款单
    doNextStep () {
      const params = this.addPage.getBillCardValue();

      if (params.contNo == null || params.contNo == '') {
        this.$message({message: '请选择一笔合同'});
        return;
      }
      this.$xutils.request({
        // 同步请求
        // data: JSON.stringify(YuXPUtil.toUpperCase(params,true)),
        url: this.$backend.cmisBiz + '/api/pvploanapp/addpvploanappxw',
        data: {contNo: params.contNo, loanModal: params.loanModal},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data != null) {
              // 放款参数放入
              params['pvpSerno'] = response.data.pvpSerno;
              // 合同编号放入
              params['contNo'] = response.data.contNo;
              // CMG000418  d1_BillCard.getBillCardValue()

              params['op'] = 'VIEW';
              params['PageType'] = 'edit';

              params['model_group_no'] = 'CMG000418';
              this.$router.addTab({
                name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                key: 'addfksq' + new Date().getTime(),
                title: '新增放款申请',
                data: params
              });
              this.$dialog.close(this.dialogId);
            }
          }
        }
      });
    },

    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
