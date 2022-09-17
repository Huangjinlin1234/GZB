<template>
  <div>
    <div>
    <yu-xform ref="refForm" label-width="180px" :form-type="formType" v-model="formdata" :disabled="disabledForm">
      <yu-panel title="贷款基本信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="iqpSerno"  ctype="input" disabled  placeholder="业务流水号"></yu-xform-item>
          <yu-xform-item label="借据编号" name="billNo"  ctype="input" disabled placeholder="借据编号"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId"  ctype="input" disabled placeholder="客户编号"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName"  ctype="input" disabled placeholder="客户名称"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo"  ctype="input" disabled placeholder="合同编号"></yu-xform-item>
          <yu-xform-item label="贷款金额" name="loanAmt"   ctype="yu-currency" disabled :min="0" placeholder="贷款金额"></yu-xform-item>
          <yu-xform-item label="贷款起始日" name="loanStartDate"   ctype="datepicker" disabled placeholder="贷款起始日"></yu-xform-item>
          <yu-xform-item label="贷款到期日" name="loanEndDate"   ctype="datepicker" disabled placeholder="贷款到期日"></yu-xform-item>
          <yu-xform-item label="业务条线" name="belgLine" ctype="input" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="原利率信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="原利率调整方式" name="oldRateAdjMode" ctype="select" data-code="STD_IR_ADJUST_TYPE" disabled placeholder="原利率调整方式"></yu-xform-item>
          <yu-xform-item label="原LPR授信利率区间" name="oldLprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" disabled placeholder="原LPR授信利率区间"></yu-xform-item>
          <yu-xform-item label="原LPR利率" name="oldCurtLprRate" ctype="yu-num" placeholder="原LPR利率" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原浮动点数" name="oldRateFloatPoint" ctype="yu-num" placeholder="原浮动点数" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原执行利率(年)" name="oldExecRateYear" ctype="yu-num" placeholder="原执行利率(年)" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原逾期利率浮动比" name="oldOverdueRatePefloat" ctype="yu-num" placeholder="原逾期利率浮动比" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原逾期执行利率(年利率)" name="oldOverdueExecRate" ctype="yu-num" placeholder="原逾期执行利率(年利率)" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原复息利率浮动比" name="oldCiRatePefloat" ctype="yu-num" placeholder="原复息利率浮动比" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原复息执行利率(年利率)" name="oldCiExecRate" ctype="yu-num" placeholder="原复息执行利率(年利率)" disabled  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="原利率调整选项" name="oldRateAdjType" ctype="select" data-code="STD_RATE_ADJ_TYPE" placeholder="原利率调整选项" disabled ></yu-xform-item>
          <yu-xform-item label="原下一次利率调整间隔" name="oldNextRateAdjInterval" ctype="input" placeholder="原下一次利率调整间隔" disabled   colspan="8"></yu-xform-item>
          <yu-xform-item label="" name="oldNextRateAdjUnit" ctype="select" data-code="STD_RATE_ADJ_UNIT" placeholder="" disabled colspan="4"></yu-xform-item>
          <yu-xform-item label="原第一次调整日" name="oldFirstAdjDate" ctype="datepicker" placeholder="原第一次调整日" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="变更后利率信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="利率调整方式" name="rateAdjMode" rules="required"  ctype="select" data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式" @change="setChangeType"></yu-xform-item>
          <yu-xform-item label="" name="custom"  ctype="custom"><div></div></yu-xform-item>
          <yu-xform-item label="LPR授信利率区间" name="lprRateIntval" rules="required"  ctype="select" data-code="STD_LPR_RATE_INTVAL"  placeholder="LPR授信利率区间" ></yu-xform-item>
          <yu-xform-item label="LPR利率" name="curtLprRate" ctype="yu-num"  placeholder="LPR利率"  sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="yu-num" :hidden="hiddenFlag" placeholder="浮动点数"  ></yu-xform-item>
          <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" rules="required"   placeholder="执行利率(年)"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="yu-num" rules="required"   placeholder="逾期利率浮动比"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="yu-num" rules="required" placeholder="逾期执行利率(年利率)"  sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="yu-num" rules="required"  placeholder="复息利率浮动比"  sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="yu-num" rules="required"  placeholder="复息执行利率(年利率)"  sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="select" rules="required" :hidden="hiddenFlag" data-code="STD_RATE_ADJ_TYPE" placeholder="利率调整选项"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval"   ctype="input"  placeholder="下一次利率调整间隔"  colspan="8"></yu-xform-item>
          <yu-xform-item label="" name="nextRateAdjUnit"   ctype="select" data-code="STD_RATE_ADJ_UNIT"  placeholder="下一次利率调整间隔单位" colspan="4"></yu-xform-item>
           <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="datepicker"   placeholder="第一次调整日"></yu-xform-item>
          <yu-xform-item label="调整后利率生效日" name="newInureDate" ctype="datepicker" rules="required"  placeholder=""></yu-xform-item>
          <yu-xform-item label="补充协议签订日期" name="paperContSignDate" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" hidden :disabled="false" placeholder="补充协议签订日期" @change="compareDate"></yu-xform-item>
          <yu-xform-item label="利率变更原因" name="appResn" ctype="textarea" :rows="3" :colspan="24"  placeholder="利率变更原因"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled placeholder="登记人"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled placeholder="登记机构"></yu-xform-item>
          <yu-xform-item label="责任人" name="managerIdName" ctype="input" disabled placeholder="责任人"></yu-xform-item>
          <yu-xform-item label="责任机构" name="managerBrIdName" ctype="input" disabled placeholder="责任机构"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" disabled placeholder="登记日期"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="tempSave" v-if="pageParams.opType !== 'VIEW'">暂存</yu-button>
      <yu-button type="primary" @click="commit" v-if="pageParams.opType !== 'VIEW'">提交</yu-button>
      <yu-button type="primary" @click="back"  v-if="!pageParams.flowPage">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
  </div>
</template>

<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpratechgapp/update',
      formdata: {},
      formType: 'edit',
      formRules: { },
      disabledForm: false,
      hiddenFlag: false
    };
  },
  mounted () {
    this.initData();
    // 查询时不可编辑
    if (this.pageParams.opType == 'VIEW') {
      this.disabledForm = true;
    } else if (this.pageParams.opType == 'EDIT') {
      // 签订的时候只能修改 补充协议签订日期
      if (this.pageParams.opDetialType == 'SIGN') {
        this.disabledForm = true;
        // 显示补充协议签订日期
        this.$refs.refForm.setItemHidden('paperContSignDate', false);
      }
    }
    this.getBelgLine();
  },
  methods: {
    initData: function () {
      let _this = this;
      this.$request({
        url: this.$backend.cmisBiz + '/api/iqpratechgapp/' + this.pageParams.iqpSerno,
        method: 'post'
      }).then(({code, message, data}) => {
        if (data) {
          yufp.clone(data, _this.formdata);
        }
      });
    },
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    /** 提交 */
    commit () {
      debugger;
      this.getBelgLine();
      // 保存
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      const saveResult = this.tempSave();
      if (!saveResult || saveResult.code != '0') {
        return;
      }
      var _this = this;
      // 提交流程
      const userInfo = _this.$xutils.getLoginUserInfo();
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.bizId = _this.formdata.iqpSerno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {
        approveStatus: _this.formdata.contApproveStatus,
        contAmt: _this.formdata.loanAmt
      };
      // 利率变更协议签订审核（零售）
      if (_this.formdata.belgLine == '02') {
        startdto.bizType = 'BG033';
      }
      var contCurType = _this.search(_this.formdata.billNo, _this.formdata.contNo);
      // 利率变更协议签订审核（对公）
      if (_this.formdata.belgLine == '03') {
        startdto.bizType = 'BG032';
      }

      // 利率变更协议签订审核（小微）
      if (_this.formdata.belgLine == '01') {
        startdto.bizType = 'BG040';
      }

       // 村镇银行
      if('A' == userInfo.org.orgType){
        if (userInfo.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH04';// （寿光）
          } else if (userInfo.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH04';// （东海）
          }
      }

      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    tempSave () {
      
      let jsoRt = null;
      var jsoCardData = this.formdata; // 先取得表单的数据
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: jsoCardData,
        async: false,
        success: (response) => {
          if (response.code == '0') {
            jsoRt = response;
            this.$message('更新成功!');
            // 回调数据
            this.pageParams.callback && this.pageParams.callback();
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
      return jsoRt;
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    cancelFn: function () {
      this.back();
    },
    search (billNo, contNo) {
      let contCurType = null;
      this.$request({
        url: this.$backend.cmisBiz + '/api/accloan/selectCurType',
        method: 'post',
        data: { billNo, contNo },
        async: false,
        success: (response) => {
          if (response.code == '0') {
            contCurType = response;
          }
        }
      });
      return contCurType;
    },

    // 查询业务条线
    getBelgLine(){
      var model = {};
      var _this = this;
      model.billNo = _this.pageParams.billNo;
      _this.$request({
        async: false,
      url: _this.$backend.cmisBiz + '/api/accloan/querymodel',
        method: 'post',
        data: JSON.stringify({ condition: JSON.stringify(model) })
      }).then((response) => {
       if (response.code == '0') {
            _this.formdata.belgLine = response.data.data[0].belgLine;
       }
      })
    },

    //
    compareDate(){
      var newInureDate =  this.formdata.newInureDate;
      if(newInureDate){
        var paperContSignDate = this.formdata.paperContSignDate;
        if(paperContSignDate > newInureDate){
          this.formdata.paperContSignDate = '';
          this.$message('协议签订日期不能超过利率生效日，请重新输入！');
          return;
        }
      }
    },

    //利率调整方式
    setChangeType(){
      let _this = this;
      var rateAdjMode = _this.formdata.rateAdjMode;
      if(rateAdjMode == '01'){
        _this.hiddenFlag = true;
        _this.$refs.refForm.fields[32].rules = '';//改表单位置的时候需要同步修改！！！！！
        _this.formdata.rateAdjType = '';
        _this.formdata.rateFloatPoint = '';
      }else{
        _this.hiddenFlag = false;
        _this.$refs.refForm.fields[32].rules = 'required';
      }
    }
  }
};
</script>
