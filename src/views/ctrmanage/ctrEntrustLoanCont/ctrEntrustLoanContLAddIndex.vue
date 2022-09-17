<template>
  <div>
    <d1-billcard ref="d1_BillCard" :page-params="pageParams"></d1-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button v-show="allowWrite" type="primary" @click="onSign">签订</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1Billcard from './ctrEntrustLoanContLAdd_d1_BillCard.vue';
import mixinForm from '@/utils/mixins/mixin-form';
/**
 * 委托贷款合同签订页面
 */
let selfPar = {};

export default {
  components: { d1Billcard },
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      allowWrite: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      selfPar = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片

      // 执行配置的默认值公式
      // this.d1_BillCard.execBillCardDefaultValueFormula();
      const param = this.pageParams;
      // this.d1_BillCard.queryDataByCondition({ serno: param.serno });
      this.$nextTick(() => {
        this.$utils.clone(selfPar, this.d1_BillCard.formdata);
      });

      // 查看页面进入或者流程页面进入
      if (selfPar.opType == 'view') {
        this.allowWrite = false;
        // d1_BillCard.setButtonVisiable('onSign', false);
      }
    },

    // 签订
    onSign () {
      let rtnData = {};
      const validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      const jsoPar = this.d1_BillCard.getBillCardValue();

      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);

      let paperDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(jsoPar.paperContSignDate));

      if (paperDate != '' && paperDate > openday) {
        this.$xutils.showMsgBox('提示', '纸质合同日期必须小于等于当前日期!');
        return;
      }
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['contStatus'] = '200';

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/ctrentrustloancont/updateSign',
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
