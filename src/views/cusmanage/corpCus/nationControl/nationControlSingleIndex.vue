<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './nationControlSingle_d1_BillCard.vue';
export default {
  components: { d1Billcard },
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
    /**
     * 国控类单笔调整
     * @constructor
     */
    AfterInit () {
      const param = this.pageParams || [];
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(param[0]);
    },

    // 确认转换
    convert () {
      const data = this.d1_BillCard.getBillCardValue();
      const date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()); // 获取当前时间
      const userInfo = this.$xutils.getLoginUserInfo(); // 获取登陆人信息

      const iqpRepayWayChg = {
        cusId: data.cusId,
        isNatctl: data.isNatctl,
        natctlLevel: data.natctlLevel,
        updateTime: date,
        updId: userInfo.loginCode,
        updBrId: userInfo.orgCode,
        updDate: date
      };

      this.sendState(iqpRepayWayChg);
      this.$dialog.close(this.dialogId);
    },

    back () {
      this.$dialog.close(this.dialogId);
    },

    sendState (data) {
      const rsPars = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisCus + '/api/cuscorp/updateselective',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['data'] = response.data;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.data.status + '；错误信息：' + result.message); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      return rsPars;
    }
  }
};
</script>
