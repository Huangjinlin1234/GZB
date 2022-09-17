<template>
  <div>
    <yu-row>
      <d1-a-billcard ref="d1_A_BillCard" :page-params="pageParams"></d1-a-billcard>
    </yu-row>
    <yu-row v-if="showList">
      <d1-b-billlist ref="d1_B_BillList" :page-params="pageParams"></d1-b-billlist>
    </yu-row>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onSign">签订</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1ABillcard from './ctrLoanContAdd_d1_A_BillCard.vue';
import d1BBilllist from './ctrLoanContAdd_d1_B_BillList.vue';
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

      // 获取表单数据
      this.getContFormData();
    },
    // 合同详情
    getContFormData () {
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/ctrloancont/selectbycontno',
        data: this.pageParams.contNo
      })
        .then(response => {
          // 重置表单数据
          this.d1_A_BillCard.form.resetFields();
          // 给表单数据赋值
          this.$utils.clone(response.data, this.d1_A_BillCard.formdata);
          var guarWay = this.d1_A_BillCard.formdata.guarWay;
          if (guarWay == '00' || guarWay == '40') {
            this.showList = false;
          }
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },
    // 签订
    onSign () {
      let validateFlag = this.d1_A_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      let jsoPar = this.d1_A_BillCard.formdata;
      let jsonListData = [];
      // let jsonListData = this.$refs.refTable.tabledata;
      var guarWay = jsoPar.guarWay;
      if (guarWay == '00' || guarWay == '40') {
        jsonListData = [];
      } else {
        jsonListData = this.d1_B_BillList.$refs.refTable.tabledata;
      }

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);

      let paperDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.d1_A_BillCard.getBillCardItemValue('paperContSignDate')));

      if (paperDate != '' && paperDate > openday) {
        this.$xutils.showMsgBox('提示', '纸质合同日期必须小于等于当前日期!');
        return;
      }
      let ctrLoanCont = jsoPar;
      let guarCont = jsonListData;
      let reqData = {ctrLoanCont, guarCont};
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/ctrloancont/updateContStatus',
        data: JSON.stringify(reqData, true),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data.rtnCode == '000000') {
              this.$xutils.showMsgBox('提示', '签订成功!', 350, 150, this.getRefreshList);
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
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
