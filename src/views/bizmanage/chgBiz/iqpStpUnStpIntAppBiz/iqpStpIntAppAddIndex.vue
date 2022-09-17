<template>
  <div>
    <yu-xform ref="refForm" label-width="120px" form-type="edit" v-model="formdata">
      <yu-xform-group :column="3">
        <yu-xform-item label="原借据编号" colspan="24" ctype="yu-xloan" name="oldBillNo" rules="required" placeholder="原借据编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','curType':'fountCurType','overdueRateY':'oldOverdueRateY','serno':'serno','cusName':'cusName','prdName':'prdName','endDate':'fountEndDate','defaultRateY':'oldDefaultRateY','oldLoanBalance':'extAmt','contNo':'oldContNo','loanAmt':'fountLoanAmt','realityIrY':'oldRealityIrY','loanBalance':'fountLoanBalance','cusId':'cusId','realityIrM':'oldRealityIrM','billNo':'oldBillNo','startDate':'fountStartDate'}" width="960" height="480" :parms="baseParamsBillNo" ></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button ref="btn_doNextStep" @click="doNextStep">下一步</yu-button>
      <yu-button ref="btn_cancel" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_FIVE_SORT,STD_ZB_ACC_TYP');
/**
 * title 停息新增引导界面
 * author 马顺
 * date 2021-01-13
 * */

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      formdata:{}
    };
  },
  created: function () {
  },
  mounted () {
    this.$refs.refTable.remoteData();
  },
  methods: {
    // 下一步
    doNextStep () {
       var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if(!validate){
        return ;
      }
      // 借据编号
      let billNo = {};
      // 调用后端生成放款申请记录的ajax请求
      let rtnData = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/iqpstpunstpintapp/saveIqpStpIntAppLeadInfo/' + billNo,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(rtnData) == '{}') {
        return;
      }
      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + '；错误信息：' + rtnData.rtnMsg); // 弹出提示
        return;
      }
      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        this.$xutils.getParentPage(this, null, 'refreshBillListData');
        // params['model_group_no'] = 'CMG000036';// 停息申请模板组
        // params['iqpSerno'] = rtnData.iqpSerno;
        // params['op'] = 'EDIT';
        this.$dialog.open(
          '',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          null,
          null,
          true,
          true
        );
      });
    },
    // 返回操作
    cancel () {
      // 刷新父级页面数据
      this.$xutils.getParentPage(this, null, 'refreshBillListData');
      this.$dialog.close(this.dialogId);
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
