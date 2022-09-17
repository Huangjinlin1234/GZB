<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusCreateDefend_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
      客户基础信息
      */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;

      if (this.getFactory().contextData != null && this.getFactory().contextData != 'undefined') {
        // 客户编号
        if (this.getFactory().contextData.cusId != null && this.getFactory().contextData.cusId != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('cus_id', this.getFactory().contextData.cusId);

          // 查询表单数据
          this.d1_BillCard.queryDataByCondition({cus_id: this.getFactory().contextData.cusId});
        }
        /*        // 客户名称
                  if(frameContext.cusName != null && frameContext.cusName != "undefined"){
                      d1_BillCard.setBillCardItemValue("cus_name",frameContext.cusName);
                  }
                  // 证件类型
                  if(frameContext.certType != null && frameContext.certType != "undefined"){
                      d1_BillCard.setBillCardItemValue("cert_type",frameContext.certType);
                  }
                  // 证件号码
                  if(frameContext.certCode != null && frameContext.certCode != "undefined"){
                      d1_BillCard.setBillCardItemValue("cert_no",frameContext.certCode);
                  }
                  // 业务类型
                  if(frameContext.bizType != null && frameContext.bizType != "undefined"){
                      d1_BillCard.setBillCardItemValue("biz_type",frameContext.bizType);
                  }*/
      }

      // 加载默认值
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 暂存
    save () {
      const Data = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: true,

        url: this.$backend.cmisCus + '/api/cusindiv/saveCusIndiv',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '暂存成功', 220, 140, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);


            // exit;// ajax中return不生效，可以用exit
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 返回
    doBack () {
      this.getFactory().back();
      // window.parent.back();
    },

    commit () {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      this.save();
    }
  }
};
</script>
