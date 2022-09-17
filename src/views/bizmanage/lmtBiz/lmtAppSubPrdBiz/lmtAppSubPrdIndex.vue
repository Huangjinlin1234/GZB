<template>
  <div>
    <div style="height:50%">
      <d1-a-billcard ref="d1_A_BillCard" v-show="isCardShow1"></d1-a-billcard>
      <d1-a-13-billcard ref="d1_A_13_BillCard" v-show="isCardShow2"></d1-a-13-billcard>
    </div>
    <div style="height:calc(100% - 50%)">
      <d1-b-billlist ref="d1_b_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './lmtAppSubPrd_d1_A_BillCard.vue'
import d1A13Billcard from './lmtAppSubPrd_d1_A_13_BillCard.vue'
import d1A14Billcard from './lmtAppSubPrd_d1_A_14_BillCard.vue'
import d1A17Billcard from './lmtAppSubPrd_d1_A_17_BillCard.vue'
import d1BBilllist from './lmtAppSubPrd_d1_B_BillList.vue'
export default {
  components:{d1ABillcard, d1A13Billcard, d1A14Billcard, d1A17Billcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_A_13_BillCard: null,
      d1_A_14_BillCard: null,
      d1_A_17_BillCard: null,
      d1_B_BillList: null,
      isCardShow1: false,
      isCardShow2: false,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      const is_pre_lmt = this.pageParams.isPreLmt;
      const flag = this.pageParams.op;

      if (flag == 'edit') {
        this.isCardShow1 = true;
        this.isCardShow2 = false;
        if (is_pre_lmt == 'Y') {
          this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        } else if (is_pre_lmt == 'N') {
          this.d1_A_BillCard = this.$refs.d1_A_BillCard;

          this.d1_A_BillCard.setBillCardItemVisible(
            'chrg_rate;chrg_collect_mode;consignor_name;consignor_type;consignor_cert_type;consignor_cert_id;consignor_cus_id',
            false
          );

          this.d1_A_BillCard.addEditChangeAction(this.isBasicChangeFn);
        }

        this.d1_A_BillCard.setBillCardValue(this.pageParams.value);
        this.d1_A_BillCard.setBillCardItemEditable('*', true);
      } else if (flag == 'view') {
        this.isCardShow1 = false;
        this.isCardShow2 = true;
        if (is_pre_lmt == 'Y') {
          this.d1_A_BillCard = this.$refs.d1_A_13_BillCard;
        } else if (is_pre_lmt == 'N') {
          this.d1_A_BillCard = this.$refs.d1_A_13_BillCard;

          this.d1_A_BillCard.setBillCardItemVisible(
            'chrg_rate;chrg_collect_mode;consignor_name;consignor_type;consignor_cert_type;consignor_cert_id;consignor_cus_id',
            false
          );

          this.d1_A_BillCard.addEditChangeAction(this.isBasicChangeFn);
        }

        this.d1_A_BillCard.setBillCardValue(this.pageParams.value);
        this.d1_A_BillCard.setBillCardItemEditable('*', false);
      }

      this.d1_A_BillCard.setBillCardItemValue('cus_id', this.pageParams.cus_id, this.pageParams.cus_id);
      this.d1_A_BillCard.setBillCardItemValue('cus_name', this.pageParams.cus_name, this.pageParams.cus_name);
      this.d1_A_BillCard.setBillCardItemValue('cus_id', this.pageParams.cus_id, this.pageParams.cus_id);
      this.d1_A_BillCard.setBillCardItemValue('guar_mode', this.pageParams.guar_mode, this.pageParams.guar_mode);
      this.d1_A_BillCard.setBillCardItemValue('sub_serno', this.pageParams.sub_serno, this.pageParams.sub_serno);
      this.d1_A_BillCard.setBillCardItemValue('is_pre_lmt', this.pageParams.is_pre_lmt, this.pageParams.is_pre_lmt);
      this.d1_A_BillCard.setBillCardItemEditable('cus_id;cus_name;guar_mode;guar_mode;is_pre_lmt', false);
    },

    onSave() {
      const checkFlag = this.d1_A_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      const jsoPar = this.d1_A_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtappsubprd/addlmtappsubprd',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;

            if ('10007' == rtnData.rtnCode) {
              this.$xutils.showMsgBox('提示', rtnData.rtnMsg, 350, 150, null);
              return;
            }

            if ('10008' == rtnData.rtnCode) {
              this.$xutils.showMsgBox('提示', rtnData.rtnMsg, 350, 150, null);
              return;
            }

            const sub_prd_serno = rtnData.sub_prd_serno;
            this.d1_A_BillCard.setBillCardItemValue('sub_prd_serno', sub_prd_serno, sub_prd_serno);
            this.$xutils.showMsgBox('提示', '新增成功!', 350, 150, this.getRefreshList);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    isBasicChangeFn(thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'repay_mode' && newVal != 'A030') {
        //YuXP.createBillList('yuxpservice', 'd1_B', 'capital_repay_plan_list',null, '新增/onAdd/;删除/onDelete');
        this.d1_B_BillList = this.$refs.d1_B_BillList;

        this.d1_B_BillList.queryDataByCondition({'serno' : this.pageParams.value.sub_prd_serno});
      } else if (itemKey == 'repay_mode' && newVal == 'A030') {
        this.$xutils.createHtml('d1_B', null);
      } else if (itemKey == 'biz_type' && newVal == '001') {
        this.d1_A_BillCard.setBillCardItemVisible(
          'chrg_rate;chrg_collect_mode;consignor_name;consignor_type;consignor_cert_type;consignor_cert_id;consignor_cus_id',
          true
        );
      } else if (itemKey == 'biz_type' && newVal != '001') {
        this.d1_A_BillCard.setBillCardItemVisible(
          'chrg_rate;chrg_collect_mode;consignor_name;consignor_type;consignor_cert_type;consignor_cert_id;consignor_cus_id',
          false
        );
        //d1_A_BillCard.setBillCardItemClearValue('chrg_rate;chrg_collect_mode;consignor_name;consignor_type;consignor_cert_type;consignor_cert_id;consignor_cus_id';
        //d1_A_BillCard.setBillCardItemClearValue('consignor_name;consignor_type;consignor_cert_type;consignor_cert_id;consignor_cus_id';
      }
    },

    // 刷新列表
    getRefreshList() {
      this.$dialog.close(this.dialogId);
    },

    onUpdate() {
      const checkFlag = this.d1_A_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      const jsoPar = this.d1_A_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtappsubprd/updatelmtappsubprd',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;

            if ('10007' == rtnData.rtnCode) {
              this.$xutils.showMsgBox('提示', rtnData.rtnMsg, 350, 150, this.getRefreshList);
              return;
            }

            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, this.getRefreshList);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    onAdd() {
      const jsoPar = this.d1_A_BillCard.getBillCardValue();

      if (jsoPar.sub_prd_serno == null || jsoPar.sub_prd_serno == '') {
        this.$xutils.showMsgBox('提示', '适用授信产品信息未保存!\r\n请保存后操作!', 350, 150);
        return;
      }

      this.$dialog.open(
        '单一客户授信申报',
        'bizmanage/lmtBiz/lmtRepayCapPlan/lmtRepayCapPlanAddIndex',
        600,
        200,
        jsoPar,
        () => {
          this.d1_B_BillList.queryDataByCondition({'serno' : this.pageParams.value.sub_prd_serno});
        }
      );
    }
  }
};
</script>
