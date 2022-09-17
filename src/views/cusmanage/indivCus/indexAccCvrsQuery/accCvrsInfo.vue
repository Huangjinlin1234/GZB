<template>
  <div style="padding:20px">
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
       <yu-xform  label-width="140px" v-model="formdata1"  disabled>
         <yu-xform-group>
           <yu-xform-item label="借据编号" name="billNo"></yu-xform-item>

           <yu-xform-item label="合同编号" name="contNo" :colspan="11"></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
               <yu-button type="primary" @click="contNoDetail">查看</yu-button>
           </yu-xform-item>
           <yu-xform-item label="客户编号" name="cusId" colspan="11"></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
               <yu-button type="primary" @click="cusIdDetail">查看</yu-button>
           </yu-xform-item>

           <yu-xform-item label="担保方式" name="guarMode"  data-code="STD_ZB_GUAR_WAY" ctype="select" ></yu-xform-item>
           <yu-xform-item label="客户名称" name="cusName"  :colspan="24"></yu-xform-item>
           <yu-xform-item label="产品编号" name="prdId"></yu-xform-item>
           <yu-xform-item label="产品名称" name="prdName"  ></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="保函信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata2"  disabled >
         <yu-xform-group>
           <yu-xform-item label="保函类型" name="guarantType" data-code="STD_GUARANT_TYPE"></yu-xform-item>
           <yu-xform-item label="保函种类" name="guarantMode" data-code="STD_GUARANT_TYPE"></yu-xform-item>
           <yu-xform-item label="币种" name="curType" data-code="STD_ZB_CUR_TYP" ctype="select"  ></yu-xform-item>
           <yu-xform-item label="汇率" name="exchangeRate" ></yu-xform-item>
           <yu-xform-item label="保函金额" name="guarantAmt" ></yu-xform-item>
           <yu-xform-item label="折算人民币金额" name="exchangeRmbAmt" ></yu-xform-item>
           <yu-xform-item label="敞口余额" name="spacBal" ></yu-xform-item>
           <yu-xform-item label="折算人民币敞口" name="exchangeRmbSpac"  ></yu-xform-item>
           <yu-xform-item label="保证金比例(%)" name="bailPerc"></yu-xform-item>
           <yu-xform-item label="保证金币种" name="bailCurType" data-code="STD_ZB_YES_NO" ctype="select" ></yu-xform-item>
           <yu-xform-item label="保证金金额" name="bailAmt"></yu-xform-item>
           <yu-xform-item label="保证金汇率" name="bailExchangeRate"></yu-xform-item>
           <yu-xform-item label="保证金折算人民币金额" name="bailCvtCnyAmt"></yu-xform-item>
           <yu-xform-item label="保证金计算方式" name="bailCalType"></yu-xform-item>
           <yu-xform-item label="手续费率（‰）" name="chrgRate"></yu-xform-item>
           <yu-xform-item label="手续费金额" name="chrgAmt"></yu-xform-item>
           <yu-xform-item label="生效日期" name="inureDate"></yu-xform-item>
           <yu-xform-item label="失效日期" name="invlDate"></yu-xform-item>
           <yu-xform-item label="逾期垫款年利率(%)" name="overdueRate"></yu-xform-item>
           <yu-xform-item label="保函付款方式" name="guarantPayMode" data-code="STD_GUARANT_PAY_MODE"></yu-xform-item>
           <yu-xform-item label="受益人名称" name="beneficiarName"></yu-xform-item>
           <yu-xform-item label="结算账号" name="settlAccno"></yu-xform-item>
           <yu-xform-item label="结算账户名称" name="settlAcctName"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata3" disabled>
         <yu-xform-group>
           <yu-xform-item label="是否使用授信额度" name="isUtilLmt" data-code="STD_ZB_YES_NO" ctype="select" ></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom"></yu-xform-item>

           <yu-xform-item label="授信额度编号" name="lmtAccNo" colspan="10"></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button type="primary" @click="lmtAccNoDetail">查看授信影像</yu-button>
           </yu-xform-item>
           <yu-xform-item label="批复编号" name="replyNo" colspan="11"></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
              <yu-button type="primary" @click="replyNoDetail">查看</yu-button>
           </yu-xform-item>

         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="财务信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata4"  disabled>
         <yu-xform-group>
           <yu-xform-item label="财务机构编号" name="finaBrId"  ctype="select" ></yu-xform-item>
           <yu-xform-item label="财务机构名称" name="finaBrIdName"   ></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="分类信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata5"  disabled>
         <yu-xform-group>
           <yu-xform-item label="十级分类" name="tenClass"  data-code="STD_TEN_CLASS" ctype="select"></yu-xform-item>
           <yu-xform-item label="五级分类" name="fiveClass"  data-code="STD_FIVE_CLASS" ctype="select"></yu-xform-item>
           <yu-xform-item label="分类日期" name="classDate"  ></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata6"  disabled>
         <yu-xform-group>
           <yu-xform-item label="登记人" name="inputId"  ></yu-xform-item>
           <yu-xform-item label="登记机构" name="inputBrId"   ></yu-xform-item>
           <yu-xform-item label="责任人" name="managerId"  ></yu-xform-item>
           <yu-xform-item label="责任机构" name="managerBrId"  ></yu-xform-item>
           <yu-xform-item label="登记日期" name="inputDate"  ></yu-xform-item>
           <yu-xform-item label="台账状态" name="accStatus" data-code="STD_ACC_STATUS" ctype="select"  ></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <div style="text-align:center">
        <yu-button  type="primary" @click="doBack">返回</yu-button>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ACC_STATUS,STD_TEN_CLASS,STD_FIVE_CLASS,STD_ZB_YES_NO,STD_GUARANT_PAY_MODE,STD_GUARANT_TYPE');
export default {
  data: function () {
    return {
      formdata1: {},
      formdata2: {},
      formdata3: {},
      formdata4: {},
      formdata5: {},
      formdata6: {}
    };
  },

  mounted () {
    this.afterint();
  },
  methods: {
    /* 页面初始化 */
    afterint () {
      var _this = this;
      var billNo = _this.$route.meta.params.billNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/acccvrs/selectByBillNo',
        data: billNo,
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata1);
            yufp.clone(response.data, _this.formdata2);
            yufp.clone(response.data, _this.formdata3);
            yufp.clone(response.data, _this.formdata4);
            yufp.clone(response.data, _this.formdata5);
            yufp.clone(response.data, _this.formdata6);
            _this.formdata2.bailPerc = _this.formdata2.bailPerc * 100;
            _this.formdata2.chrgRate = _this.formdata2.chrgRate * 1000;
            _this.formdata2.overdueRate = _this.formdata2.overdueRate * 1000;

          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /* 合同编号详情 */
    contNoDetail () {
      this.$xutils.showMsgBox('提示', '合同编号详情');
    },
    /* 客户编号详情 */
    cusIdDetail () {
      this.$xutils.showMsgBox('提示', '客户编号详情');
    },
    /* 查看授信影像 */
    lmtAccNoDetail () {
      this.$xutils.showMsgBox('提示', '查看授信影像');
    },
    /* 批复编号 */
    replyNoDetail () {
      this.$xutils.showMsgBox('提示', '批复编号详情');
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
