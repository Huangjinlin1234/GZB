<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpTermChgApproveAdd_d1_BillList.vue'
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
    /**
       * 业务初始加载
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    /**
       * 取消
       */
    doNextStep() {
      const selPars = this.d1_BillList.getSelectedRowData();

      if (selPars == null || selPars == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据', 350, 150);
        return;
      } else if (selPars.acc_status != '1') {
        this.$xutils.showMsgBox('提示', '该借据不允许进行利率调整', 350, 150);
        return;
      }

      // 调用序列号生成的规则，生成放款申请序列号
      const rateCHGSerno = this.$xutils.getSEQWithParamFromServer('RATE_CHG_SERNO', {});

      // 获取当前登录信息
      const userInfo = this.$xutils.getLoginUserInfo();

      const iqpTermChg = {
        'bill_no': selPars.billNo,
        'iqp_serno': rateCHGSerno,
        'input_id': userInfo.loginCode,
        'input_br_id': userInfo.orgCode,
        'input_date': this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
      };

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqptermchg/iqpTermChgApp/saveLeadIqpTermChgInfo',
        data: JSON.stringify(this.$xutils.toUpperCase(iqpTermChg, true)),

        success: (response, status, xhr) => {
          if (response.data == 1) {
            const row = {
              'model_group_no': 'CMG000061',
              'op': 'EDIT',
              'iqp_serno': rateCHGSerno
            };

            this.$dialog.open(
              '期限调整申请',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              row,
              () => {
                this.d1_BillList.queryDataByCondition();
              }
            );
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示

          // bol = false;
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },

    /* 取消按钮*/
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
