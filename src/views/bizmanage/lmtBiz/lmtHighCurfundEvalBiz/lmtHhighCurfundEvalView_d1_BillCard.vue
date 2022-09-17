<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="流动资金额度测算" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
            <yu-xform-item label="上年度销售收入" ctype="yu-currency" name="ltYearSaleIncome" disabled placeholder="上年度销售收入" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度销售利润率" ctype="yu-num" name="ltYearSaleProfitRate" disabled placeholder="上年度销售利润率" sign="%" :multiple="1" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="预计销售收入年增长率" ctype="yu-num" name="foreSaleIncomeGrowRate" disabled rules="required" placeholder="预计销售收入年增长率" sign="%" :multiple="100" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度预收款周转天数" ctype="yu-num" name="ltYearPpmTurnoDay" disabled placeholder="上年度预收款周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度存货周转天数" ctype="yu-num" name="ltYearIvtTurnovDay" disabled placeholder="上年度存货周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度应收款周转天数" ctype="yu-num" name="ltYearRcvTurnovDay" disabled placeholder="上年度应收款周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度应付账款周转天数" ctype="yu-num" name="ltYearAcpTurnovDay" disabled placeholder="上年度应付账款周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度预付款周转天数" ctype="yu-num" name="ltYearAdvanceTurnovDay" disabled placeholder="上年度预付款周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度营运资金周转天数" ctype="yu-num" name="ltYearOprfundsTurnovDay" disabled placeholder="上年度营运资金周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="借款人自有资金" ctype="yu-num" name="borrowerCap" disabled placeholder="借款人自有资金" :min="0" :precision="2"></yu-xform-item>
            <yu-xform-item label="现有流动资金贷款" ctype="yu-num" name="curfundLoan" rules="required" disabled placeholder="现有流动资金贷款" :min="0" :precision="2"></yu-xform-item>
            <yu-xform-item label="其他渠道提供的营运资金" ctype="yu-num" name="otherChnlProvidOprCap" rules="required" disabled placeholder="其他渠道提供的营运资金" :min="0" :precision="2"></yu-xform-item>
            <yu-xform-item label="营运资金量" ctype="yu-num" name="oprCap" disabled placeholder="营运资金量" :precision="2"></yu-xform-item>
            <yu-xform-item label="流动资金贷款额度" ctype="input" name="curfundLoanLmt" disabled placeholder="流动资金贷款额度" :precision="2"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="timepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="timepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最近修改日期"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="timepicker" name="createTime" value-format="yyyy-MM-dd" hidden placeholder="创建时间"></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="timepicker" name="updateTime" value-format="yyyy-MM-dd" hidden placeholder="修改时间"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onPrint">打印</yu-button>
      <!--<yu-button type="primary" @click="customClick('oprcapCalculation')">测算营运资金量</yu-button>-->
      <!--<yu-button type="primary" @click="customClick('lmtCalculation')">测算额度</yu-button>-->
      <!--<yu-button type="primary" @click="customClick('onSure')" v-if="flag">确定</yu-button>-->
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmthighcurfundeval/update',
      addUrl: this.$backend.cmisBiz + '/api/lmthighcurfundeval/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: { },
      File: {},
      flag: true,
      isGrp: false
    };
  },
  mounted () {
    var _this = this;
    var op = '';
    var serno = '';
    if (_this.pageParams) {
      serno = _this.pageParams.serno;
    } else if (_this.$route.params) {
      op = this.$route.params.viewType;
      serno = _this.$route.meta.params.serno;
    } else if (_this.getFactory().contextData) {
      serno = _this.pageParams.serno;
    }
    if (op == 'edit') {
      this.disabled = true;
    }
    // var serno = this.$route.params.serno;
    // var serno = _this.bizPageData.instanceInfo.bizId;
    // var serno = _this.getFactory().contextData.serno;
    _this.getFormdata(serno);
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },

    // 打印流动资金额度测算表
    onPrint () {
      var _this = this;
      var params = _this.formdata;
      if (_this.isGrp) {
        let jsoPar = params;
        jsoPar['src'] = _this.$backend.frptRptService + 'DGSX-LDZJEDCSB.cpt&op=view&serno=' + params.serno;
        this.$dialog.open(
          '成员流动资金额度测算表',
          'zrcbank/biz/pvpLoanApp/frptdemo',
          -1,
          -1,
          jsoPar
        );
      } else {
        let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
        let keydemo = 'frptdemobzrdbedcsb';
        params.src = _this.$backend.frptRptService + 'DGSX-LDZJEDCSB.cpt&op=view&serno=' + params.serno;
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: keydemo, // 必传
          // 页签名称
          title: '流动资金额度测算表',
          // 传递的业务数据，可选配置
          data: params
        });
      }
    },

    // 给基本信息赋值
    getFormdata: function (serno) {
      var _this = this;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmthighcurfundeval/selectbyserno/' + serno,
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.formdata);
            // _this.baseFormdata = response.data;
          } else {
            _this.$message('获取数据失败!');
            return;
          }
        }
      });
    }
  }
};
</script>
