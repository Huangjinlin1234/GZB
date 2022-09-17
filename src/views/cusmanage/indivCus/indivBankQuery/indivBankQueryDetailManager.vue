<template>
  <div style="padding:20px">
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
       <yu-xform  label-width="140px" v-model="formdata1"  disabled>
         <yu-xform-group>
           <yu-xform-item label="借据编号" name="billNo"></yu-xform-item>
           <yu-xform-item label="银承核心编号" name="coreBillNo" ></yu-xform-item>

           <yu-xform-item label="客户编号" name="cusId" :colspan="11" disabled ></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom" :colspan="1">
               <yu-button type="primary" @click="cusIdDetail">查看</yu-button>
           </yu-xform-item>
           <yu-xform-item label="合同编号" name="contNo"  :colspan="11"></yu-xform-item>
           <yu-xform-item label="" ctype="custom" name="custom" :colspan="1">
               <yu-button type="primary" @click="contNoDetail">查看</yu-button>
           </yu-xform-item>

           <yu-xform-item label="客户名称" name="cusName" :colspan="24"></yu-xform-item>
           <yu-xform-item label="产品编号" name="prdId" ></yu-xform-item>
           <yu-xform-item label="产品名称" name="prdName"></yu-xform-item>
           <yu-xform-item label="担保方式" name="guarMode" data-code="STD_ZB_GUAR_WAY" ctype="select" ></yu-xform-item>
           <yu-xform-item label="是否电子票据" name="isEDrft" data-code="STD_ZB_YES_NO" ctype="select" ></yu-xform-item>
           <yu-xform-item label="汇票号码" name="porderNo" :disabled="viewType != 'edit'"></yu-xform-item>
           <yu-xform-item label="是否他行代签" name="isOtherBankSign" data-code="STD_ZB_YES_NO" ctype="select" ></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <div style="text-align:center">
        <yu-button  type="primary" @click="doSave" :hidden="viewType != 'edit'">保存</yu-button>
    </div>
    <yu-panel title="金额期限" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata2"  disabled>
         <yu-xform-group>
           <yu-xform-item label="币种" name="curType" data-code="STD_ZB_CUR_TYP" ctype="select" ></yu-xform-item>
           <yu-xform-item label="票面金额" name="draftAmt" ></yu-xform-item>
           <yu-xform-item label="出票日期" name="isseDate" :colspan="24" ctype="datepicker"></yu-xform-item>
           <yu-xform-item label="到期日期" name="endDate" :colspan="24" ctype="datepicker"></yu-xform-item>
           <yu-xform-item label="保证金比例(%)" name="bailPerc"></yu-xform-item>
           <yu-xform-item label="保证金金额" name="bailAmt"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="收款人信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata3"  disabled>
         <yu-xform-group>
           <yu-xform-item label="收款人名称" name="pyeeName" ></yu-xform-item>
           <yu-xform-item label="收款人账号" name="pyeeAccno"></yu-xform-item>
           <yu-xform-item label="收款人开户行行号" name="pyeeAcctsvcrNo" ></yu-xform-item>
           <yu-xform-item label="收款人开户行名称：" name="pyeeAcctsvcrName"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="承兑行信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata4"  disabled>
         <yu-xform-group>
           <yu-xform-item label="承兑行类型" name="aorgType" data-code="STD_AORG_TYPE" ctype="select"></yu-xform-item>
           <yu-xform-item label="承兑行行号" name="aorgNo" ></yu-xform-item>
           <yu-xform-item label="承兑行名称" name="aorgName" :colspan="24"></yu-xform-item>
           <yu-xform-item label="出票人开户行账号" name="daorgNo" ></yu-xform-item>
           <yu-xform-item label="出票人开户户名" name="daorgName" :colspan="24"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata5"  disabled>
         <yu-xform-group>
           <yu-xform-item label="是否使用授信额度" name="isUtilLmt" data-code="STD_ZB_YES_NO" ctype="select"  ></yu-xform-item>
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
       <yu-xform label-width="140px" v-model="formdata6"  disabled>
         <yu-xform-group>
           <yu-xform-item label="财务机构编号" name="finaBrId"></yu-xform-item>
           <yu-xform-item label="财务机构名称" name="finaBrIdName" ></yu-xform-item>
           <yu-xform-item label="签发机构编号" name="issuedOrgNo" ></yu-xform-item>
           <yu-xform-item label="签发机构名称" name="issuedOrgName"></yu-xform-item>
           <yu-xform-item label="兑付机构编号" name="payOrgNo"></yu-xform-item>
           <yu-xform-item label="兑付机构名称" name="payOrgName"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="分类信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata7"  disabled>
         <yu-xform-group>
           <yu-xform-item label="十级分类" name="tenClass" data-code="STD_TEN_CLASS" ctype="select" ></yu-xform-item>
           <yu-xform-item label="五级分类" name="fiveClass" data-code="STD_FIVE_CLASS" ctype="select" ></yu-xform-item>
           <yu-xform-item label="分类日期" name="classDate"></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
       <yu-xform label-width="140px" v-model="formdata8"  disabled>
         <yu-xform-group>
           <yu-xform-item label="登记人" name="inputIdName" ctype="select"></yu-xform-item>
           <yu-xform-item label="登记机构" name="inputBrIdName"></yu-xform-item>
           <yu-xform-item label="责任人" name="managerIdName"></yu-xform-item>
           <yu-xform-item label="责任机构" name="managerBrIdName"></yu-xform-item>
           <yu-xform-item label="登记日期" name="inputDate"></yu-xform-item>
           <yu-xform-item label="台账状态" name="accStatus" data-code="STD_ACC_ACCP_STATUS" ctype="select"   ></yu-xform-item>
         </yu-xform-group>
       </yu-xform>
    </yu-panel>
    <div style="text-align:center">
        <yu-button  type="primary" @click="doBack">返回</yu-button>
    </div>

  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_AORG_TYPE,STD_TEN_CLASS,STD_FIVE_CLASS,STD_ACC_ACCP_STATUS');
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
      viewType: ''
    };
  },

  mounted () {
    this.afterint();
  },
  methods: {
    /* 页面初始化 */
    afterint () {
      var _this = this;
      var coreBillNo = _this.$route.meta.params.coreBillNo;
      var billNo = _this.$route.meta.params.billNo;
      _this.viewType = _this.$route.meta.params.viewType;
      var data = {};
      data.coreBillNo = coreBillNo;
      data.billNo = billNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/accaccpdrftsub/selectByCoreBillNo',
        data: JSON.stringify(data),
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
            _this.formdata2.bailPerc = _this.formdata2.bailPerc * 100
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
    /* 保存 */
    doSave () {
      var _this = this;
      var coreBillNo = _this.$route.meta.params.coreBillNo;
      var billNo = _this.$route.meta.params.billNo;
      var params = {};
      params.coreBillNo = coreBillNo;
      params.billNo = billNo;
      params.porderNo = _this.formdata1.porderNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/accaccpdrftsub/updateByPorderNo',
        data: params,
        callback: function (code, message, response) {
          if (response.data == 0) {
            _this.$message.success('操作成功');
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
