<template>
  <div>
    <d1-billcard v-show="!selectFlag" ref="d1_BillCard"></d1-billcard>
    <d1-billlist v-show="selectFlag" ref="d1_BillList" @loaded="loadedFn"></d1-billlist>
  </div>
</template>
<script>
import d1Billcard from './hxdPage2-addCob_d1_BillCard.vue'
import d1Billlist from './hxdPage2-addCob_d1_BillList.vue'
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
      selectFlag: true
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      //不同页面都要替换掉这个
      const strName = this.pageParams.commonDebitCusName;
      // 证件号码 cert_code
      const certCode = this.pageParams.commonDebitCertCode;
      //搜索条件 进来默认搜索
      this.d1_BillList.queryDataByCondition('cus_name=\'' + strName + '\' and cert_code=\'' + certCode + '\'');
    },

    /**
     * 查询不出来数据时，要提示是否创建数据
     */
    loadedFn(data, total) {
      if (total == 0) {
        //不同页面都要替换掉这个
        const strName = this.pageParams.commonDebitCusName;
        // 证件号码 cert_code
        const certCode = this.pageParams.commonDebitCertCode;
        this.$xutils.showConfirmBox('提示', '未查询到该客户,是否快捷新增', 300, 200, _isOK => {
          if (_isOK) {
            this.selectFlag = false
            this.d1_BillCard = this.$refs.d1_BillCard;
            // d1_BillCard.execBillCardDefaultValueFormula();
            this.d1_BillCard.setBillCardItemValue('cusId', this.$xutils.getSEQWithParamFromServer('INDIV_CUS_NO_SEQ'));
  
            this.d1_BillCard.setBillCardItemValue('cusRankCls', '02');
            this.d1_BillCard.setItemEditable('cusRankCls', false);
            this.d1_BillCard.setBillCardItemValue('cusName', strName);
            this.d1_BillCard.setBillCardItemValue('certCode', certCode);
            this.d1_BillCard.setBillCardItemValue('bizType', 'B02');
            //赋值业务类型  biz_type
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
