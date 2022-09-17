<template>
  <div style="padding:10px">
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
       <yu-xform  label-width="140px" v-model="formdata1" disabled>
         <yu-xform-group>
           <yu-xform-item label="借据编号" name="billNo" ></yu-xform-item>

           <yu-xform-item label="合同编号" name="contNo" :colspan="11"></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
               <yu-button type="primary" @click="contNoDetail">查看</yu-button>
           </yu-xform-item>
           <yu-xform-item label="客户编号" name="cusId" colspan="11"></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
               <yu-button type="primary" @click="cusIdDetail">查看</yu-button>
           </yu-xform-item>

           <yu-xform-item label="担保方式" name="guarMode"  data-code="STD_ZB_GUAR_WAY" ctype="select"></yu-xform-item>
           <yu-xform-item label="客户名称" name="cusName"  :colspan="24"></yu-xform-item>
           <yu-xform-item label="产品编号" name="prdId" ></yu-xform-item>
           <yu-xform-item label="产品名称" name="prdName"  ></yu-xform-item>
           <yu-xform-item label="票据种类" name="drftType" data-code="STD_DRFT_TYPE"></yu-xform-item>
           <yu-xform-item label="是否电子票据" name="isEDrft"  data-code="STD_ZB_YES_NO" ctype="select" ></yu-xform-item>
           <yu-xform-item label="持票人结算账号" name="drfthldSettlAccno"  ></yu-xform-item>
           <yu-xform-item label="持票人结算账户名称" name="drfthldSettlAcctName" ></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="贴现票据" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata2" disabled >
         <yu-xform-group>
           <yu-xform-item label="汇票号码" name="porderNo"></yu-xform-item>
           <yu-xform-item label="币种" name="curType" data-code="STD_ZB_CUR_TYP" ctype="select"></yu-xform-item>
           <yu-xform-item label="票面金额" name="drftAmt"></yu-xform-item>
           <yu-xform-item label="实付贴现金额" name="rpayDscntAmt"></yu-xform-item>
           <yu-xform-item label="票据签发日期" name="draftStartDate"></yu-xform-item>
           <yu-xform-item label="票据到期日期" name="draftEndDate" ></yu-xform-item>
           <yu-xform-item label="贴现年利率(%)" name="dscntRateYear" ></yu-xform-item>
           <yu-xform-item label="贴现利息" name="dscntInt" ></yu-xform-item>
           <yu-xform-item label="贴现类型" name="dscntType" data-code="STD_DSCNT_TYPE" ctype="select"></yu-xform-item>
           <yu-xform-item label="是否可转让" name="isAllowTakeover" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
           <yu-xform-item label="票据签发地" name="draftSignAddr"></yu-xform-item>
           <yu-xform-item label="贴现日期" name="dscntDate"></yu-xform-item>
           <yu-xform-item label="调整天数" name="adjDay"></yu-xform-item>
           <yu-xform-item label="贴现天数" name="dscntDay"></yu-xform-item>
           <yu-xform-item label="回购日期" name="rebuyDate"></yu-xform-item>
           <yu-xform-item label="托收日期" name="collectDate"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="出票人信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata3" disabled >
         <yu-xform-group>
           <yu-xform-item label="出票人名称" name="drwrName" ></yu-xform-item>
           <yu-xform-item label="出票人账号" name="drwrAccno"></yu-xform-item>
           <yu-xform-item label="出票人开户行行号" name="drwrAcctsvcrNo" ></yu-xform-item>
           <yu-xform-item label="出票人开户行行名" name="drwrAcctsvcrnm"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="收款人信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata4" disabled >
         <yu-xform-group>
           <yu-xform-item label="收款人名称" name="pyeeName" ></yu-xform-item>
           <yu-xform-item label="收款人账号" name="pyeeAccno"></yu-xform-item>
           <yu-xform-item label="收款人开户行行号" name="pyeeAcctsvcrNo" ></yu-xform-item>
           <yu-xform-item label="收款人开户行名称：" name="pyeeAcctsvcrName"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="承兑行信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata5" disabled >
         <yu-xform-group>
           <yu-xform-item label="承兑行类型" name="aorgType" data-code="STD_AORG_TYPE" ctype="select"></yu-xform-item>
           <yu-xform-item label="承兑行行号" name="aorgNo" ></yu-xform-item>
           <yu-xform-item label="承兑行名称" name="aorgName" :colspan="24"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata6" disabled >
         <yu-xform-group>
           <yu-xform-item label="是否使用授信额度" name="isUtilLmt" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
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
       <yu-xform label-width="140px" v-model="formdata7" disabled >
         <yu-xform-group>
           <yu-xform-item label="财务机构编号" name="finaBrId"  ctype="select"></yu-xform-item>
           <yu-xform-item label="财务机构名称" name="finaBrIdName"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="分类信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata8" disabled >
         <yu-xform-group>
           <yu-xform-item label="十级分类" name="tenClass" data-code="STD_TEN_CLASS" ctype="select" ></yu-xform-item>
           <yu-xform-item label="五级分类" name="fiveClass" data-code="STD_FIVE_CLASS" ctype="select" ></yu-xform-item>
           <yu-xform-item label="分类日期" name="classDate" ></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata9" disabled >
         <yu-xform-group>
           <yu-xform-item label="登记人" name="inputId" ctype="select"></yu-xform-item>
           <yu-xform-item label="登记机构" name="inputBrId"></yu-xform-item>
           <yu-xform-item label="责任人" name="managerId"></yu-xform-item>
           <yu-xform-item label="责任机构" name="managerBrId"></yu-xform-item>
           <yu-xform-item label="登记日期" name="inputDate"></yu-xform-item>
           <yu-xform-item label="台账状态" name="accStatus" data-code="STD_ACC_STATUS" ctype="select"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <div style="text-align:center">
        <yu-button  type="primary" @click="doBack">返回</yu-button>
    </div>

  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_DSCNT_TYPE,STD_AORG_TYPE,STD_TEN_CLASS,STD_FIVE_CLASS,STD_ACC_STATUS,STD_DRFT_TYPE');
export default {
  data: function () {
    return {
      formdata1: {},
      formdata2: {},
      formdata3: {},
      formdata4: {},
      formdata5: {},
      formdata6: {},
      formdata7: {},
      formdata8: {},
      formdata9: {}
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
        url: backend.cmisBiz + '/api/accdisc/selectByBillNo',
        data: billNo,
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata1);
            yufp.clone(response.data, _this.formdata2);
            yufp.clone(response.data, _this.formdata3);
            yufp.clone(response.data, _this.formdata4);
            yufp.clone(response.data, _this.formdata5);
            yufp.clone(response.data, _this.formdata6);
            yufp.clone(response.data, _this.formdata7);
            yufp.clone(response.data, _this.formdata8);
            yufp.clone(response.data, _this.formdata9);
            _this.formdata2.dscntRateYear = _this.formdata2.dscntRateYear * 100
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
