<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d2Billcard from './chgReprayInterestInsert_d2_BillCard.vue'
import d1Billlist from './chgReprayInterestInsert_d1_BillList.vue'
const nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
const cusHandoverGuideCard = null;
const condition = '';

export default {
  components:{d2Billcard, d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d2_BillCard: null,
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      this.d2_BillCard = this.$refs.d2_BillCard; // 创建卡片
      this.d1_BillList = this.$refs.d1_BillList;
    },

    cancel() {
      this.$dialog.close(this.dialogId);
    },

    nextStep() {
      const params = this.d1_BillList.getSelectedRowData();
      var userInfo = this.$xutils.getLoginUserInfo();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选中一条记录!');
        return;
      }

      var userInfo = this.$xutils.getLoginUserInfo();
      params['input_id'] = userInfo.loginCode;//
      params['input_name'] = userInfo.loginUserName;//
      params['input_br_id'] = userInfo.orgCode;//
      params['input_date'] = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());//
      params['input_br_name'] = userInfo.orgName;//
      const logoutDate = params.endDate;

      if (logoutDate == '' || logoutDate == null || this.$xutils.formatDate(new Date(logoutDate)) < nowDate) {
        this.$xutils.showMsgBox('提示', '选中合同的【注销日期】小于当前日期!');
        return;
      }

      const acc_status = params.accStatus;

      if (acc_status != '1') {
        this.$xutils.showMsgBox('提示', '该借据不允许进行利息减免更改!');
        return;
      }

      // 生成业务流水号
      const iqpSerno = this.$xutils.getSEQWithParamFromServer('IQP_REPAY_SERNO');

      params['iqp_serno'] = iqpSerno;//

      this.$dialog.open(
        '利息减免申请页面',
        'bizmanage/chgBiz/iqpInterestChg/iqpRepayInterestChgUpdateIndex',
        900,
        650,
        params,
        null,
        true,
        true
      );
    }
  }
};
</script>
