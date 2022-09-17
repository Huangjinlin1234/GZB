<template>
  <div>
    <yu-row>
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </yu-row>
    <yu-row v-if="showList">
      <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </yu-row>
    <yu-row>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="onSign">签订</yu-button>
        <yu-button type="primary" @click="onCancel">返回</yu-button>
      </yu-form-buttons>
    </yu-row>
  </div>
</template>
<script>
import d1ABillcard from './ctrTfLocContAdd_d1_A_BillCard.vue';
import d1BBilllist from './ctrTfLocContAdd_d1_B_BillList.vue';
export default {
  components: { d1ABillcard, d1BBilllist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null,
      showList: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 开证合同签订页面
     */
    AfterInit () {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard; // 创建卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      // 执行配置的默认值公式
      // this.d1_A_BillCard.execBillCardDefaultValueFormula();

      const param = this.pageParams;
      // this.d1_A_BillCard.queryDataByCondition({ serno: param.serno });
      // this.d1_B_BillList.queryDataByCondition({ cusId: param.cusId });
      this.$nextTick(() => {
        this.$utils.clone(param, this.d1_A_BillCard.formdata);
        // 担保类型为信用时，隐藏担保信息
        const guarMode = this.d1_A_BillCard.getBillCardItemValue('guar_mode');
        if (guarMode == '00' || guarMode == '40') {
          this.showList = false;
        }
      });
    },

    // 签订
    onSign () {
      let rtnData = {};
      const validateFlag = this.d1_A_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      const jsoPar = this.d1_A_BillCard.getBillCardValue();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);

      const paperDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.d1_A_BillCard.getBillCardItemValue('paper_cont_sign_date')));

      if (paperDate != '' && paperDate > openday) {
        this.$xutils.showMsgBox('提示', '纸质合同日期必须小于等于当前日期!');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/ctrtfloccont/onSign',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '签订成功!', 350, 150, this.getRefreshList);
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 刷新列表
    getRefreshList () {
      this.$dialog.close(this.dialogId);
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
