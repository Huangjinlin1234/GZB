<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <d1-billlist ref="d1_BillList"></d1-billlist>
  </div>
</template>
<script>
import d1Billcard from './cusBaseFindOneList_d1_BillCard.vue'
import d1Billlist from './cusBaseFindOneList_d1_BillList.vue'
export default {
  components:{d1Billcard, d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      // YuXP.createBillCard("yuxpservice", "d1", "cus_base_list_pop");  //创建card
      this.d1_BillList = this.$refs.d1_BillList;
  
      //客户名称
  
      // console.log(jsoOpenPars);
      const strName = this.pageParams.cob_name;
  
      // 证件号码 cert_code
      const certCode = this.pageParams.cob_cert_no;
  
      //搜索条件 进来默认搜索
      this.d1_BillList.queryDataByCondition('cus_name=\'' + strName + '\' and cert_code=\'' + certCode + '\'');
  
      if (this.d1_BillList.getBillListData() == null || this.d1_BillList.getBillListData().length == 0) {
        this.$xutils.showConfirmBox('提示', '未查询到该客户,是否快捷新增', 300, 200, _isOK => {
          if (_isOK) {
            this.d1_BillCard = this.$refs.d1_BillCard;
            this.d1_BillCard.execBillCardDefaultValueFormula();
            this.d1_BillCard.setBillCardItemValue('cus_name', strName);
            this.d1_BillCard.setBillCardItemValue('cert_code', certCode);
          } else {
            this.$dialog.close(this.dialogId);
          }
        });
      }
    },
  
    doNextStep() {
      const params = this.d1_BillList.getSelectedRowData();
  
      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
  
      this.$dialog.close(this.dialogId, params);
    },
  
    save() {
      const flag = this.d1_BillCard.saveBillCardData();
  
      if (flag) {
        this.$xutils.showMsgBox('提示', '创建成功!', 300, 200, () => {
          this.$dialog.close(this.dialogId, this.d1_BillCard.getBillCardValue());
        }, 'success');
      }
    },
  
    cancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
