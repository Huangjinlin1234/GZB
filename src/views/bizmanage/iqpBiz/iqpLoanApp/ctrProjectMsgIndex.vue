<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="isShowButton">
      <yu-button type="primary" @click="tempSave">暂存</yu-button>
      <yu-button type="primary" @click="save">保存</yu-button>
      <!--<yu-button type="primary" @click="commit">提交</yu-button>-->
      <yu-button type="primary" @click="back">返回</yu-button>
  </yu-form-buttons>
  </div>
</template>
<script>
import d1Billcard from './ctrProjectMsg_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      isShowButton: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 项目类信息
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      var data = {};
      var serno = '';
      var op = '';
      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        serno = data.bizId;
        op = data.param.op;
      } else if (this.$route.meta.params) {
        data = this.$route.meta.params;
        serno = data.iqpSerno;
        op = data.op;
      } else if (this.getFactory().contextData) {
        data = this.getFactory().contextData;
        serno = data.iqpSerno;
        op = data.op;
      }
      if (op == 'VIEW' || op == 'view') {
        this.isShowButton = false;
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqploanapppro/selectBySerno',
        data: {serno: serno}
      })
        .then(response => {
          this.$utils.clone(response.data, this.d1_BillCard.formdata);
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '当前数据为空，请手动填写项目信息并保存！'); // 弹出提示
        });
    },

    // 暂存
    tempSave () {
      let reqData = this.d1_BillCard.formdata;
      // 每次保存时，校验流水号是否有值,没有则赋值
      if (reqData.serno == '' || reqData.serno == null || reqData == 'undefined') {
        reqData.serno = this.getFactory().contextData.iqpSerno;
      }
      if (reqData) {
        this.$xutils.request({
          // 同步请求
          async: false,
          // 修改
          url: this.$backend.cmisBiz + '/api/iqploanapppro/addOrUpdateIqpLoanAppProDataBySerno',
          // data: JSON.stringify(YuXPUtil.toUpperCase(par, true)),
          data: JSON.stringify(reqData),
          success: (response, status, xhr) => {
            if (response.data != null) {
              this.$xutils.showMsgBox('提示', '暂存成功！');
            }
          }
        });
      } else {
        return;
      }
    },

    // 保存
    save () {
      let reqData = this.d1_BillCard.formdata;
      if (reqData.serno == '' || reqData.serno == null || reqData == 'undefined') {
        reqData.serno = this.getFactory().contextData.iqpSerno;
      }
      let checkFlag = this.d1_BillCard.validateBillCardValue();
      if (!checkFlag) {
        return;
      }
      if (reqData) {
        this.$xutils.request({
          // 同步请求
          async: false,
          // 修改
          url: this.$backend.cmisBiz + '/api/iqploanapppro/addOrUpdateIqpLoanAppProDataBySerno',
          // data: JSON.stringify(YuXPUtil.toUpperCase(par, true)),
          data: JSON.stringify(reqData),
          success: (response, status, xhr) => {
            if (response.code == '0') {
              this.$xutils.showMsgBox('提示', '保存成功！');
            } else {
              this.$xutils.showMsgBox('提示', response.message);
            }
          },
          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      } else {
        return;
      }
    },

    /* 取消按钮*/
    back () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
