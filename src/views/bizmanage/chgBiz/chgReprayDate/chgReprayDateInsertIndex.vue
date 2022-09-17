<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './chgReprayDateInsert_d1_BillList.vue'
const nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
const cusHandoverGuideCard = null;
const condition = '';

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
      /*
          YuXP.createBillCard('yuxpservice', 'd2', 'acc_loan_pop', null, '下一步/nextStep;取消/cancel'); // 创建卡片
        */
      this.d1_BillList = this.$refs.d1_BillList;
    },

    cancel() {
      this.$dialog.close(this.dialogId);
    },

    nextStep() {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选中一条记录!');
        return;
      }

      const logoutDate = params.endDate;

      if (logoutDate == '' || logoutDate == null || this.$xutils.formatDate(new Date(logoutDate)) < nowDate) {
        this.$xutils.showMsgBox('提示', '选中合同的【注销日期】小于当前日期!');
        return;
      }

      const acc_status = params.accStatus;

      if (acc_status != '1') {
        this.$xutils.showMsgBox('提示', '该借据不允许进行还款日变更!');
        return;
      }

      //还款间隔为周的数据字典为01

      const odlRepayTerm = params.oldRepayTerm;

      if (odlRepayTerm == '01') {
        this.$xutils.showMsgBox('提示', '该借据还款间隔周期为周,不允许进行还款日变更!');
        return;
      }

      const repay_way = params.repayWay;

      if (repay_way == '7') {
        this.$xutils.showMsgBox('提示', '该借据还款方式为自定义还款,不允许进行还款日变更!');
        return;
      }
      // 生成业务流水号

      const iqpSerno = this.$xutils.getSEQWithParamFromServer('IQP_REPAY_SERNO');
      const userInfo = this.$xutils.getLoginUserInfo();
      params['input_id'] = userInfo.loginCode;//
      params['input_name'] = userInfo.loginUserName;//
      params['input_br_id'] = userInfo.orgCode;//
      params['input_date'] = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());//
      params['input_br_name'] = userInfo.orgName;//
      params['iqp_serno'] = iqpSerno;//
      params['iqp_serno'] = iqpSerno;//
      params['iqp_serno'] = iqpSerno;//
      params['old_stop_pint_term'] = params.stopPintTerm;
      params['old_repay_term'] = params.repayTerm;
      params['old_repay_space'] = params.repaySpace;
      params['old_repay_date'] = params.repayDate;
      params['old_Repay_Mode'] = params.repayWay;
      params['repay_Mode'] = params.repayWay;

      this.$dialog.open(
        '还款日变更申请',
        'bizmanage/chgBiz/chgReprayDate/iqpRepayDateChgUpdateIndex',
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
