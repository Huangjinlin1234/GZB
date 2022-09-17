<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './coopPlanOther_d1_BillCard.vue';
/**
 * 合作方案申请详情
 * author yumeng@yusys.com.cn
 * date 2021-04-15
 **/
// 页面全局参数
let param = null;

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
    AfterInit () {
      param = this.getFactory().contextData.param;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(param);
    },

    /**
       * 日期校验（平台事件处理还有bug暂不启用此校验）
       **/
    dateValidate (thisCard, key, oldValue, newValue) {
      const date = new Date();
      const end = thisCard.getItemValue('coop_end_date');
      const start = thisCard.getItemValue('coop_start_date');

      if (key == 'coop_end_date' && newValue < date) {
        this.$xutils.showMsgBox('提示', '结束日期必须大于当前日期');

        // thisCard.setItemValue("coop_end_date", "", "");
        return;
      }

      if (key == 'coop_start_date' && end && newValue >= end) {
        this.$xutils.showMsgBox('提示', '起始日期必须小于结束日期');

        // thisCard.setItemValue("coop_start_date", "", "");
        return;
      }

      if (key == 'coop_end_date' && start && newValue <= start) {
        // thisCard.setItemValue("coop_end_date", "", "");
        return;
      }
    },

    /**
       * 关闭并刷新父页面列表
       **/
    back () {
      this.$xutils.getParentPage(this, null, 'back');
    },

    /**
       * 保存数据
       **/
    saveData () {
      const result = this.d1_BillCard.validateBillCardValue();
      const card = this.d1_BillCard.getBillCardValue();

      if (!result) {
        return false;
      }

      // 将三个表单的数据拼接到一个对象中
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopplanapp/update',
        data: JSON.stringify(this.$xutils.toUpperCase(card, true)),
        type: 'POST',
        async: true,

        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.$xutils.showMsgBox('提示', '保存成功');
          }
        }
      });
    }
  }
};
</script>
