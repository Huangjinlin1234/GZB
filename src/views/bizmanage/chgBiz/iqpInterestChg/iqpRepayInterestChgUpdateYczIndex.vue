<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpRepayInterestChgUpdateYcz_d1_BillCard.vue'
let par = {};

export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      par = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition({billNo:this.pageParams.billNo});
      this.d1_BillCard.setBillCardValue(par);
    },

    onInsert() {
      const params = this.d1_BillCard.getBillCardValue();

      if ((params.reducNormalInt == null || params.reducNormalInt == '') && (params.reducOverdueInt == null || params.reducOverdueInt == '') && (params.reducCi == null || params.reducCi == '')) {
        this.$xutils.showMsgBox('提示', '利息减免项不能全部为空,请核对!');
        return;
      }

      if (params.reducResn == null || params.reducResn == '') {
        this.$xutils.showMsgBox('提示', '减免原因不能为空,请核对!');
        return;
      }

      if (params.reducNormalInt != null && params.reducNormalInt != '' && params.reducNormalInt < 0) {
        this.$xutils.showMsgBox('提示', '减免正常利息金额不能为负数,请核对!');
        return;
      }

      if (params.reducCi != null && params.reducCi != '' && params.reducCi < 0) {
        this.$xutils.showMsgBox('提示', '减免复利金额不能为负数,请核对!');
        return;
      }

      if (params.reducOverdue_int != null && params.reducOverdueInt != '' && params.reducOverdueInt < 0) {
        this.$xutils.showMsgBox('提示', '减免逾期利息金额不能为负数,请核对!');
        return;
      }

      if (params.reducNormalInt != null && params.reducNormalInt != '' && params.reducNormalInt > params.recNormalInt - params.hasbcNormalInt) {
        this.$xutils.showMsgBox('提示', '减免正常利息金额不能大于应还正常利息和已还正常利息的差额,请核对!');
        return;
      }

      if (params.reducCi != null && params.reducCi != '' && params.reducCi > params.recCiInt - params.hasbcCiInt) {
        this.$xutils.showMsgBox('提示', '减免复利金额不能大于应还正常复利和已还正常复利的差额,请核对!');
        return;
      }

      if (params.reducOverdueInt != null && params.reducOverdueInt != '' && params.reducOverdueInt > params.recOwerdueInt - params.hasbcOverdueInt) {
        this.$xutils.showMsgBox('提示', '减免逾期利息金额不能大于本期应还正常逾期利息和本期已还正常逾期利息的差额,请核对!');
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/IqpRepayInterestChg/updateCommit',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.data != null && response.data > 0) {
            this.$xutils.showMsgBox('保存成功');
          } else {
            this.$xutils.showMsgBox('保存失败,请重试!');
          }
        }
      });
    },

    //点击提交按钮的业务逻辑代码实现
    onSubmit() {
      const params = this.d1_BillCard.getBillCardValue();
      const result = this.d1_BillCard.validateBillCardValue();

      if (result == false) {
        this.$xutils.showMsgBox('表单必输项未完成填写,请核对!');
        return;
      }

      //校验表单数据
      if ((params.reduc_normal_int == null || params.reduc_normal_int == '') && (params.reduc_overdue_int == null || params.reduc_overdue_int == '') && (params.reduc_ci == null || params.reduc_ci == '')) {
        this.$xutils.showMsgBox('提示', '利息减免项不能全部为空,请核对!');
        return;
      }

      if (params.reduc_resn == null || params.reduc_resn == '') {
        this.$xutils.showMsgBox('提示', '减免原因不能为空,请核对!');
        return;
      }

      if (params.reduc_normal_int != null && params.reduc_normal_int != '' && params.reduc_normal_int < 0) {
        this.$xutils.showMsgBox('提示', '减免正常利息金额不能为负数,请核对!');
        return;
      }

      if (params.reduc_ci != null && params.reduc_ci != '' && params.reduc_ci < 0) {
        this.$xutils.showMsgBox('提示', '减免复利金额不能为负数,请核对!');
        return;
      }

      if (params.reduc_overdue_int != null && params.reduc_overdue_int != '' && params.reduc_overdue_int < 0) {
        this.$xutils.showMsgBox('提示', '减免逾期利息金额不能为负数,请核对!');
        return;
      }

      if (params.reduc_normal_int != null && params.reduc_normal_int != '' && params.reduc_normal_int > params.rec_normal_int - params.hasbc_normal_int) {
        this.$xutils.showMsgBox('提示', '减免正常利息金额不能大于应还正常利息和已还正常利息的差额,请核对!');
        return;
      }

      if (params.reduc_ci != null && params.reduc_ci != '' && params.reduc_ci > params.rec_ci_int - params.hasbc_ci_int) {
        this.$xutils.showMsgBox('提示', '减免复利金额不能大于应还正常复利和已还正常复利的差额,请核对!');
        return;
      }

      if (params.reduc_overdue_int != null && params.reduc_overdue_int != '' && params.reduc_overdue_int > params.rec_owerdue_int - params.hasbc_overdue_int) {
        this.$xutils.showMsgBox('提示', '减免逾期利息金额不能大于本期应还正常逾期利息和本期已还正常逾期利息的差额,请核对!');
        return;
      }

      const loginUser = this.$xutils.getLoginUserInfo();
      params['upd_id'] = loginUser.loginCode;
      params['upd_br_id'] = loginUser.orgCode;
      params['upd_date'] = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/IqpRepayInterestChg/updateCommit',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.data != null && response.data > 0) {
            this.commit(params);
          } else {
            this.$xutils.showMsgBox('提交失败,请重试!');
          }
        }
      });
    },

    onCancel() {
      this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
      this.$dialog.close(this.dialogId);
    },

    commit(params) {
      const result = this.d1_BillCard.validateBillCardValue();

      if (result == false) {
        this.$xutils.showMsgBox('表单必输项未完成填写,请核对!');
        return;
      }

      //权限校验
      const bill_no = params.bill_no;

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/IqpRepayInterestChg/checkIsExistIqpRepayWayChgBizByBillNo',
        data: JSON.stringify(this.$xutils.toUpperCase(bill_no, true)),

        success: (response, status, xhr) => {
          if (response.data != null && response.data > 0) {
            this.$xutils.showMsgBox('该借据正在进行其他业务变更，不能发起利息减免变更申请！');
          }
        }
      });

      const loginUser = this.$xutils.getLoginUserInfo();

      //设置流程提交参数
      const rsPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': params.iqp_serno,
        'bizType': 'IQP_REPAY_INTEREST_CHG',
        'userId': loginUser.loginCode,
        'bizUserName': params.cus_name,
        'bizUserId': params.cus_id
      };

      this.$xutils.wfInit(rsPars, this.onCancelPage);
    },

    // 提交返回
    onCancelPage() {
      this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
      this.$dialog.close(this.dialogId);
    },

    // 借据查看
    viewLoan() {
      const billNo = this.d1_BillCard.getItemValue('bill_no');

      if (!(billNo && billNo != '')) {
        this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
        return;
      }

      const params = this.findAccInfoFromBackend(billNo);

      if (params) {
        params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';//贷款台账模块
        params['op'] = 'VIEW';

        this.$dialog.open(
          '贷款台账',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      }
    },

    //获取借据信息
    findAccInfoFromBackend(billNo) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisBiz + '/api/accloan/' + billNo,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return returnData;
    },

    // 客户信息查看
    viewCus() {
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const params = {};

      if (jsoPar.cus_id == '' || jsoPar.cus_id == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }

      params['cus_id'] = jsoPar.cus_id;
      const cus_catalog = par.cus_catalog;

      if (cus_catalog == '1') {
        //对公
        params['model_group_no'] = 'CMG000114';

        params['flag'] = 'view';

        this.$dialog.open(
          '企业客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      } else if (cus_catalog == '2') {
        //对私
        params['model_group_no'] = 'CMG000013';

        params['flag'] = 'view';

        this.$dialog.open(
          '个人客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params,
          null,
          true,
          true
        );
      } else {
        this.$xutils.showMsgBox('提示', '无法确定客户大类！');
        return;
      }
    }
  }
};
</script>
