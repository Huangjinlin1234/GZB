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
          <yu-xform-item label="产品名称" name="prdId" ctype="input" disabled hidden></yu-xform-item>
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
          <yu-xform-item label="LPR授信利率区间" name="lprRateIntval" rules="required"  ctype="select" data-code="STD_LPR_RATE_INTVAL" @change="getLprRate"  placeholder="LPR授信利率区间" ></yu-xform-item>
          <yu-xform-item label="LPR利率" name="curtLprRate" ctype="yu-num"  placeholder="LPR利率"  sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="input" :hidden="hiddenFlag"  placeholder="浮动点数" @change="setExecRateYear"></yu-xform-item>
          <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" rules="required"   placeholder="执行利率(年)" sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="yu-num" rules="required"   placeholder="逾期利率浮动比"  sign="%" :multiple="100" @change="setOverdueExecRate"></yu-xform-item>
          <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="yu-num"  rules="required"   placeholder="逾期执行利率(年利率)"  sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="yu-num" rules="required"  placeholder="复息利率浮动比"  sign="%" :multiple="100" @change="setCiExecRate"></yu-xform-item>
          <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="yu-num" rules="required"  placeholder="复息执行利率(年利率)"  sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="select" rules="required" :hidden="hiddenFlag" data-code="STD_RATE_ADJ_TYPE" placeholder="利率调整选项" @change="setrateAdjType"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" :rules="rules1"  ctype="input"  placeholder="下一次利率调整间隔"  colspan="8" :disabled="rules2"></yu-xform-item>
          <yu-xform-item label="" name="nextRateAdjUnit" :rules="rules1"  ctype="select" data-code="STD_RATE_ADJ_UNIT"  placeholder="下一次利率调整间隔单位" colspan="4" :disabled="rules2"></yu-xform-item>
          <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="datepicker" :rules="rules1"  placeholder="第一次调整日" :disabled="rules2" ></yu-xform-item>
          <yu-xform-item label="调整后利率生效日" name="newInureDate" :picker-options="startOptions" ctype="datepicker" rules="required"  placeholder=""></yu-xform-item>
          <yu-xform-item label="补充协议签订日期" name="paperContSignDate" ctype="datepicker" rules="required" hidden :disabled="false" placeholder="补充协议签订日期"></yu-xform-item>
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
      hiddenFlag: false,
      rules1 : '',
      rules2 : false,
      startOptions: {
        disabledDate: function (time) {
          let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2) + ' ' + '00:00:00';
          openday = new Date(openday).getTime()
          return time.getTime() < openday;
        }
      },
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
          // 利率调整方式
          _this.formdata.rateAdjMode = _this.formdata.oldRateAdjMode;
          // lpr利率授信区间 oldLprRateIntval
          _this.formdata.lprRateIntval = _this.formdata.oldLprRateIntval;
        }
      });
    },
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    /** 提交 */
    commit () {
      // 获取业务条线
      this.getBelgLine();
      //debugger;
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

       // 岗位校验
      const loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys;
      if (dutysList != undefined) {
        for (let i = 0; i < dutysList.length; i++) {
          let item = dutysList[i];
          if (item.code === 'FZH01' && _this.formdata.belgLine != '03') { //  对公客户经理但条线不是对公的则不给提交
            this.$xutils.showMsgBox('提示','非对公条线请确认!');
            return;
          }
          if (item.code === 'FZH02' && _this.formdata.belgLine != '02') { //  零售客户经理但条线不是零售的则不给提交
            this.$xutils.showMsgBox('提示','非零售条线请确认!');
            return;
          }
          if (item.code === 'XWB01' && _this.formdata.belgLine != '01') { //  小微客户经理但条线不是小微的则不给提交
            this.$xutils.showMsgBox('提示','非小微条线请确认!');
            return;
          }
        };
      }
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.userCode;
      startdto.bizId = _this.formdata.iqpSerno; ;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {};
      // 小微
      if (_this.formdata.belgLine == '01') {
        startdto.bizType = 'BG004';
        startdto.param = {lmtAmt: "0", openTotalLmtAmt: "0", orgType: _this.$store.state.oauth.org.orgType  };
      }
      // 零售
      if (_this.formdata.belgLine == '02') {
        startdto.bizType = 'BG003';
        startdto.param = {
            isPc: '1', // 是否pc端发起:1-是,0-否
            isLsOrg: '1', // 是否零售支行:1-是,0-否
            isZh: '1', // 是否支行:1-是,0-否
            approvalModel: '01', // 审批模式：01单签模式 07双签模式一 08双签模式二 05贷审会模式
            isInteRiskLvl: '0', // 是否综合风险等级为A
            isLimitFlag: '0', // 是否自动审批
            isOfferRateMax: '0', // 是否大于等于报价利率
            ruleRiskLvl: 'D', // 规则风险等级
            isRelationSuperPower: '0', // 关联方交易是否超权 0-否,1-是
            appAmt: '0', // 授信申请金额
            prdT: '11', // 10-按揭，11-非按揭
            isSgh16: '0', // 是否资产保全客户经理  0-否,1-是
            isRaise: '0', // 是否上调权限:1-是,0-否
            powerFlag: 'false', 
            orgType: _this.$store.state.oauth.org.orgType
        };
      }
      var contCurType = _this.search(_this.formdata.billNo, _this.formdata.contNo);
      // 外币
      if (_this.formdata.belgLine == '03' && contCurType != 'CNY') {
        startdto.bizType = 'BG002';
        startdto.param = {lmtAmt: "0", openTotalLmtAmt: "0", orgType: _this.$store.state.oauth.org.orgType  };
      }
      // 对公人民币
      if (_this.formdata.belgLine == '03' && contCurType == 'CNY') {
        startdto.bizType = 'BG001';
        startdto.param = {lmtAmt: "0", openTotalLmtAmt: "0", orgType: _this.$store.state.oauth.org.orgType, authorZHHZ: "N", authorFZR: "N", authorFHHZ: "N" };
      }


        // 村镇银行
      if('A' == loginUser.org.orgType){
        // 是否保全客户经理岗
        startdto.param.duty = '0';
        const dutysList = loginUser.dutys;
        if (dutysList != undefined && dutysList.length > 0) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
              startdto.param.duty = '1';
              break;
            }
          }
        }
        console.log('是否保全客户经理岗--->', startdto.param.duty);
        if (loginUser.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH01';// （寿光）
          } else if (loginUser.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH01';// （东海）
          }
      }
       console.log('产品编号--->', _this.formdata.prdId);
       console.log('业务类型--->', startdto.bizType);
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    tempSave () {
      //日期校验
      const date = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      const firstAdjDate = this.formdata.firstAdjDate;
      const newInureDate = this.formdata.newInureDate;
      if ( newInureDate < date) {
        this.$xutils.showMsgBox('提示', '调整后利率生效日必须大于等于当日日期');
        return;
      }
      if(firstAdjDate!=null && newInureDate < firstAdjDate){
        this.$xutils.showMsgBox('提示', '调整后利率生效日必须大于等于第一次调整日');
        return;
      }
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
            contCurType = response.data;
            console.log(contCurType);
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
           console.log("条线查询----->",response.data.data[0]);
           console.log("条线----->",response.data.data[0].belgLine);
            _this.formdata.belgLine = response.data.data[0].belgLine;
       }
      })
    },

    //查询LPR利率
    getLprRate: function (value) {
      if (value == 'A1' || value == 'A2') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getlprrate';
        let rqData = {};
        rqData['lprRate'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: rqData
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.curtLprRate = response.data.rate;

              //联动
              this.setExecRateYear();
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
      } else { }
    },

    //利率调整方式
    setChangeType(){
      let _this = this;
      var rateAdjMode = _this.formdata.rateAdjMode;
      if(rateAdjMode == '01'){//固定lilv
        _this.hiddenFlag = true;
        _this.$refs.refForm.fields[32].rules = '';//改表单位置的时候需要同步修改！！！！！
        _this.formdata.rateAdjType = '';
        _this.formdata.rateFloatPoint = '';
        this.rules2 = true;
        _this.rules1 = [
          {
            required: false,
            message: '必填项',
            trigger: 'blur'
          }
        ];
      }else{
        _this.hiddenFlag = false;
        _this.$refs.refForm.fields[32].rules = 'required';
      }
    },


    setrateAdjType(){
      let _this = this;
      var rateAdjType = _this.formdata.rateAdjType;
      if(rateAdjType != 'FIX'){
        this.rules2 = true;
         _this.rules1 = [
          {
            required: false,
            message: '非必填项',
            trigger: 'blur'
          }
        ];
      }else{
        this.rules2 = false;
        _this.rules1 = [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ];
      }
    },

    //计算执行年利率
    setExecRateYear(){
      let _this = this;
      var rateFloatPoint = _this.formdata.rateFloatPoint;
      var curtLprRate = parseFloat(_this.formdata.curtLprRate);
      if(rateFloatPoint){
        _this.formdata.execRateYear = parseFloat(rateFloatPoint)/10000 + curtLprRate
        _this.setOverdueExecRate();
        _this.setCiExecRate();
      }
    },

    //计算逾期利率
    setOverdueExecRate(){
      let _this = this;
      var overdueRatePefloat = _this.formdata.overdueRatePefloat;
      var execRateYear = parseFloat(_this.formdata.execRateYear);
      if(overdueRatePefloat){
        _this.formdata.overdueExecRate = execRateYear * (1+ parseFloat(overdueRatePefloat))
      }
    },

    //计算复息利率
    setCiExecRate(){
      let _this = this;
      var ciRatePefloat = _this.formdata.ciRatePefloat;
      var execRateYear = parseFloat(_this.formdata.execRateYear);
      if(ciRatePefloat){
        _this.formdata.ciExecRate = execRateYear * (1+ parseFloat(ciRatePefloat))
      }
    }

  }
};
</script>
