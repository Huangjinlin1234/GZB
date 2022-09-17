<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpIdtAdjAppAdd_d1_BillCard.vue'
/**授信审批通知书有效期增页面**/
// const nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());没有用到干嘛要定义？

const condition = '';

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
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    save() {
      // 校验必输
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      const params = this.d1_BillCard.getBillCardValue();
      const iqp_serno = this.$xutils.getSEQWithParamFromServer('IQP_REPAY_SERNO');
      const loginUser = this.$xutils.getLoginUserInfo();
      params['iqp_serno'] = iqp_serno;
      params['upd_id'] = loginUser.loginCode;
      params['upd_br_id'] = loginUser.orgCode;
      params['upd_date'] = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqpIdtAdj/saveIqpIdtAdj',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, _rt => {
              this.$xutils.getParentPage(this, null, 'refreshBillListData');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (response, result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    //保存并提交
    submit() {
      // 校验必输
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        return;
      }

      //保存
      const saveResult = this.d1_BillCard.updateBillCardData();

      if (!saveResult || saveResult.code != 'ok') {
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,

        // 校验是否存在同类业务
        url: this.$backend.cmisBiz + '/api/iqpIdtAdj/checkIsExistWFBizByBillNo',

        data: JSON.stringify(this.$xutils.toUpperCase(this.d1_BillCard.getBillCardValue(), true)),

        success: (response, status, xhr) => {
          if (response.data == 0) {
            //提交
            const rsPars = this.sendSubmit();

            if (!rsPars.handleFlag) {
              return;
            } else {
              this.$xutils.showMsgBox('提示', '提交成功!', 350, 150, _rt => {
                this.$xutils.getParentPage(this, null, 'back');
              });
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    sendSubmit(saveResult) {
      const info = this.d1_BillCard.getBillCardValue();

      //提交
      const loginUser = this.$xutils.getLoginUserInfo();

      const sendPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.d1_BillCard.getItemValue('iqp_serno'),
        'bizType': 'IQP_IDT_ADJ_APP',
        'userId': loginUser.loginCode,
        'bizUserName': info.cus_name,
        'bizUserId': info.cus_id
      };

      this.$xutils.wfInit(sendPars, this.onCancelPage);
    },

    //返回操作
    cancel() {
      //刷新父级页面数据
      this.$xutils.getParentPage(this, null, 'queryDataByCondition');
      this.$dialog.close(this.dialogId);
    },

    // 提交返回
    onCancelPage() {
      //刷新父级页面数据
      this.$xutils.getParentPage(this, null, 'back');

      this.$xutils.getParentPage(this, null, 'refreshBillListData');
    }
  }
};
</script>
