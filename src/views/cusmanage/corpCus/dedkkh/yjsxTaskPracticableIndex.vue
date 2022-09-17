<template>
  <div>
    <div style="height: 87%">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height: calc(100% - 87%)">
      <div style="display: table; height: 100%; margin: 0 auto">
        <yu-button @click="submit">提交</yu-button>
        <yu-button @click="back">返回</yu-button>
      </div>
    </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="back"></yufpNwfInit>
  </div>
</template>
<script>
import d1ABillcard from './yjsxTaskPracticable_d1_A_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { d1ABillcard, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 压降任务落实
     */

    AfterInit () {
      const param = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_A_BillCard.setBillCardValue(param);
    },

    // 提交
    submit () {
      const cardData = this.d1_A_BillCard.getBillCardValue();
      if (cardData.planPdoAmt != cardData.actPdoAmt) {
        this.$xutils.showMsgBox(
          '提示',
          '压降结果与计划不一致，请发起授信变更！'
        );
        return;
      }
      let _this = this;
      this.d1_A_BillCard.updateBillCardData(function () {
        // 设置流程提交参数
        const loginUser = _this.$xutils.getLoginUserInfo();
        let startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.code;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'KH015';
        startdto.bizId = _this.d1_A_BillCard.getItemValue('taskNo');
        startdto.bizUserName = _this.d1_A_BillCard.getItemValue('cusName');
        startdto.bizUserId = _this.d1_A_BillCard.getItemValue('cusId');
        startdto.param = {};
        _this.$refs.yufpNwfInit.wfInit(startdto);
      });

      // const date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // // 放入更新时间
      // this.d1_A_BillCard.setBillCardItemValue('update_time', date);
      // // 更新数据
      // this.d1_A_BillCard.updateBillCardData();
      // this.$dialog.close(this.dialogId);
    },

    // 返回
    back () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
