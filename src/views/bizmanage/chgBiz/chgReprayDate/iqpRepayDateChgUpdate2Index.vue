<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpRepayDateChgUpdate2_d1_BillCard.vue'
const nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
let pars = {};

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
      pars = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;

      this.d1_BillCard.setBillCardValue(pars);
    },

    //点击提交按钮的业务逻辑代码实现
    onSubmit() {
      //校验表单必输项
      const result = this.d1_BillCard.validateBillCardValue();

      if (!result) {
        return;
      }

      const params = this.d1_BillCard.getBillCardValue();

      if (params.repay_date == null || params.repay_date == '') {
        this.$xutils.showMsgBox('提示', '还款日不能为空,请核对!');
        return;
      }

      if (params.change_resn == null || params.change_resn == '') {
        this.$xutils.showMsgBox('提示', '变更原因不能为空,请核对!');
        return;
      }

      const odlRepayTerm = params.old_repay_term;

      if (odlRepayTerm == '01') {
        this.$xutils.showMsgBox('提示', '该借据还款间隔周期为周,不允许进行还款日变更!');
        return;
      }

      const repay_way = params.old_repay_mode;

      if (repay_way == '7') {
        this.$xutils.showMsgBox('提示', '该借据还款方式为自定义还款,不允许进行还款日变更!');
        return;
      }

      const loginUser = this.$xutils.getLoginUserInfo();
      params['upd_id'] = loginUser.loginCode;
      params['upd_br_id'] = loginUser.orgCode;
      params['upd_date'] = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/IqpRepayDateChg/updateCommit',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.data != null && response.data > 0) {
            this.$xutils.showMsgBox('提交成功');
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
      //权限校验
      const result = this.d1_BillCard.validateBillCardValue();

      if (!result) {
        return;
      }

      const bill_no = params.bill_no;
      let flag = true;

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/IqpRepayDateChg/checkIsExistIqpRepayWayChgBizByBillNo',
        data: JSON.stringify(this.$xutils.toUpperCase(bill_no, true)),

        success: (response, status, xhr) => {
          if (response.data != null && response.data > 0) {
            flag = false;
          }
        }
      });

      if (!flag) {
        this.$xutils.showMsgBox('该借据正在进行其他业务变更，不能发起还款日变更！');
        return;
      }

      const loginUser = this.$xutils.getLoginUserInfo();

      //设置流程提交参数
      const rsPars = {
        'op': 'view',
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': params.iqp_serno,
        'bizType': 'IQP_REPAY_DATE_CHG',
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

    onInsert() {
      const params = this.d1_BillCard.getBillCardValue();

      //还款间隔为周的数据字典为01
      const odlRepayTerm = params.old_repay_term;

      if (odlRepayTerm == '01') {
        this.$xutils.showMsgBox('提示', '该借据还款间隔周期为周,不允许进行还款日变更!');
        return;
      }

      const oldRepayMode = params.old_repay_mode;

      if (oldRepayMode == '7') {
        this.$xutils.showMsgBox('提示', '该借据还款方式为自定义还款,不允许进行还款日变更!');
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/IqpRepayDateChg/updateCommit',
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
      const cus_catalog = pars.cus_catalog;

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
