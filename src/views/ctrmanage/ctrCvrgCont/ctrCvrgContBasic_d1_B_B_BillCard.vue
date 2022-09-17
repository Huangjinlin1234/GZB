<template>
  <div id="d1_B_B_BillCard">
    <div id="d1_B_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" disabled>
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"  :colspan="12" disabled ></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType"  data-code="STD_ZB_CONT_TYPE"  disabled placeholder="合同类型" :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xpersonal-info" name="cusId"  disabled placeholder="客户编号" :colspan="12" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="900" height="480" ></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="流水号" name="serno"   disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"   disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId"   disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"   disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="保函类型" ctype="input" placeholder="保函类型" name="guarantType"   disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="保函种类" ctype="input" placeholder="保函种类" name="guarantMode"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode"  disabled data-code="STD_ZB_ASSURE_MEANS" placeholder="担保方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" name="isRenew"  disabled data-code="STD_ZB_YES_NO" placeholder="是否续签" @change="isRenew"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled v-if="ocHidden"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="合同币种" ctype="input" placeholder="合同币种" name="curType"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="合同金额" name="contAmt"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="汇率" ctype="yu-num" name="exchangeRate"  placeholder="汇率" :colspan="12" sign="%" :multiple="100" :precision="0" :min="0" disabled></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="折算人民币金额" name="cvtCnyAmt"  :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="本合同项下最高可用信金额" name="contHighAvlAmt"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" placeholder="合同起始日" name="startDate"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" placeholder="合同到期日" name="endDate"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="input" placeholder="保证金比例" name="bailPerc"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="保证金币种" ctype="select" placeholder="保证金币种" name="bailCurType" :colspan="12" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
            <yu-xform-item label="保证金金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="保证金金额" name="bailLmt" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="保证金汇率" ctype="input" placeholder="保证金汇率" name="bailExchangeRate" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="保证金折算人民币金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="保证金折算人民币金额" name="bailCvtCnyAmt" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="手续费金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="手续费金额" name="chrgAmt"  :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false">
          <yu-toolbar>
            <yu-button @click="addFn" :hidden="isHidden">新增</yu-button>
            <yu-button @click="deleteFn" :hidden="isHidden">删除</yu-button>
            <yu-button @click="saveFn" :hidden="isHidden">保存</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number border :data="bailaccinfo" :pageable="false">
            <yu-xtable-column label="保证金账号" :disabled="isDisabled" prop="bailAccNo" ctype="YufpZrcSelector" :params="bailParms" @select-fn="selectBail"></yu-xtable-column>
            <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
            <yu-xtable-column label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
            <yu-xtable-column label="保证金计息方式" prop="bailInterestMode" ctype="select" data-code="STD_BAIL_INTEREST_MODE" :disabled="isDisabled"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" :colspan="12"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtNo" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" disabled hidden data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" disabled hidden data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="所属条线" ctype="input" placeholder="所属条线" name="belgLine" disabled hidden></yu-xform-item>
            <yu-xform-item label="双录编号" ctype="input" placeholder="双录编号" name="doubleRecordNo" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="qq" ctype="input" placeholder="qq" name="qq" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr" disabled :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项评级情况" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="select" name="debtLevel" disabled data-code="DEBT_GRADE" placeholder="债项等级" :colspan="12"></yu-xform-item>
            <yu-xform-item label="违约损失率lgd" ctype="input" placeholder="违约损失率lgd" name="lgd" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="违约风险暴露ead" ctype="input" placeholder="违约风险暴露ead" name="ead" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="转敞口对象的pd" ctype="input" placeholder="转敞口对象的pd" name="pd" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" disabled hidden data-code="STD_ZB_OPER_TYPE" placeholder="操作类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled :colspan="12" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled :colspan="12" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled :colspan="12" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerIdName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled :colspan="12" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrIdName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同状态" ctype="select" name="contStatus" disabled data-code="STD_ZB_CONT_STATUS" placeholder="合同状态" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BBBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      ocHidden: false,
      updateUrl: this.$backend.cmisBiz + '/api/ctrcvrgcont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrcvrgcont/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      bailaccinfo: [],
      tableParams: {},
      bailParms: {
        title: '选择保证金信息',
        dataUrl: `${backend.cmisBiz}/api/bailaccinfo/sendcoreforbail`,
        tableColumns: [
          { label: '保证金账号', prop: 'bailAccNo' },
          { label: '客户号', prop: 'cusId' },
          { label: '客户名称', prop: 'cusName' },
          { label: '保证金账号子序号 ', prop: 'bailAccNoSub' },
          { label: '开户行名称 ', prop: 'acctsvcrName' }
        ],
        baseParams: {
          condition: JSON.stringify({
            cusId: this.getFactory().contextData.cusId
          })
        }
      }
    };
  },

  mounted () {
    var _this = this;
    let data = _this.getFactory().contextData;
    // 进入初始化
    _this.serno = data.serno;
    _this.op = data.op;
    if (_this.op == 'VIEW') {
      this.isHidden = true;
      this.isDisabled = true;
    }
    this.tableParams = { serno: _this.serno };
    this.getAllBailData(this.tableParams);
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    },

    getAllBailData: function (tableParams) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/getList/',
        data: tableParams,
        callback: function (code, message, response) {
          _this.bailaccinfo = response.data;
        }
      });
    },
    /**
     * 选择保证金账号信息
     */
    selectBail: function (arr) {
      // var _this = this;
      this.bailaccinfo[this.bailaccinfo.length - 1].bailAccNo = arr[0].bailAccNo;
      this.bailaccinfo[this.bailaccinfo.length - 1].bailAccNoSub = arr[0].bailAccNoSub;
      this.bailaccinfo[this.bailaccinfo.length - 1].acctsvcrName = arr[0].acctsvcrName;
      // _this.bailaccinfo.bailAccNo = arr[0].bailAccNo;
      // _this.bailaccinfo.bailAccNoSub = arr[0].bailAccNoSub;
      // _this.bailaccinfo.acctsvcrName = arr[0].acctsvcrName;
      // _this.bailaccinfo = arr[0];
    }
  }
};
</script>