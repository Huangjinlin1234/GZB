
<template>
    <yu-panel title="请选择贷款借据" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTableOld">
        <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group :column="3">
        <yu-xform-item label="借据编号" :colspan="8" ctype="yu-xloan" name="billNo" rules="required" placeholder="借据编号" :parms="{condition:{'managerId':managerId}}" :mapping="{'billNo':'billNo','accStatus':'accStatus'}" @select-fn="commonSelectFn" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNextStep">下一步</yu-button>
      <yu-button type="primary" @click="doBack">返回</yu-button>
    </yu-form-buttons>  
    </yu-xform>
    </yu-panel>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      formdata: {},
      managerId: this.$xutils.getDefaultformulaData("$LoginLoginCode")
    };
  },

methods:{
     /**
     * 返回
     */
    doBack: function () {
      yufp.router.removeTab(this.$route.path);
    },
    doNextStep () {
      let _this = this;
      let row = {};
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let selPars = this.formdata;
      selPars.approveStatus = '000'
      selPars.recordStatus = '01'
      const date = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let current_id = jsoUser['loginCode']; // 当前登录人
      let orgCode = jsoUser['orgCode'];//当前登录机构
      this.formdata.inputId = current_id;
      this.formdata.inputBrId = orgCode;
      this.formdata.updId = current_id;
      this.formdata.updBrId = orgCode;
      this.formdata.managerId = current_id;
      this.formdata.managerBrId = orgCode;
      this.formdata.inputDate = date;
      this.formdata.updDate = date;
      this.formdata.appChnl = '02'; // 申请渠道 02-PC端
      // 调用序列号生成的规则，生成放款申请序列号 后台生成
      // const rateCHGSerno = this.$xutils.getSEQWithParamFromServer('RATE_CHG_SERNO');
      // const data = {
      //   'billNo': selPars.billNo
      // };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqploansuspension/create',
        data: selPars,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            yufp.clone(response.data, row);
            row['opType'] = 'EDIT';
            // row['iqpSerno'] = rateCHGSerno;
            this.doBack();
            this.opendTab(row, '贷款停息申请新增', row.billNo);
            _this.visiable = false;
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqpLoanSuspension/iqpLoanSuspensionDetail',
        key: 'custom_view_' + key + '_' + new Date().getTime(),
        title: title,
        data: params
      });
    },

     commonSelectFn: function (row, mapping) {
      this.formdata = row
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
  }
}
</script>
