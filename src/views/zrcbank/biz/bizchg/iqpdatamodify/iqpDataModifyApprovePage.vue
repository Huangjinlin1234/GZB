<template>
  <div>
    <div>
    <yu-xform ref="refForm" label-width="180px"  v-model="formdata" :disabled="disabledForm">
      <yu-panel title="数据修改基本信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="serno"  ctype="input" disabled  placeholder="业务流水号"></yu-xform-item>
          <yu-xform-item label="修改类型" name="modifyType"  ctype="select" disabled  placeholder="修改类型" data-code="STD_MODIFY_TYPE"></yu-xform-item>
          <yu-xform-item label="借据编号" name="billNo"   rules="required"  placeholder="借据编号" ctype="yu-xloan"  :parms="{condition:{'accStatus': 1 }}" :mapping="{'billNo':'billNo','cusId':'cusId','cusName':'cusName'
          ,'loanTypeDetail':'loanTypeDetail'
          ,'isPactLoan':'isPactLoan','isGreenIndustry':'isGreenIndustry','isOperPropertyLoan':'isOperPropertyLoan','isSteelLoan':'isSteelLoan','isStainlessLoan':'isStainlessLoan'
          ,'isPovertyReliefLoan':'isPovertyReliefLoan','isLaborIntenSbsyLoan':'isLaborIntenSbsyLoan','goverSubszHouseLoan':'goverSubszHouseLoan'
          ,'engyEnviProteLoan':'engyEnviProteLoan','isCphsRurDelpLoan':'isCphsRurDelpLoan','realproLoan':'realproLoan','realproLoanRate':'realproLoanRate','guarDetailMode':'guarDetailMode'
           }"  @select-fn="commonSelectFn"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId"  ctype="input" disabled placeholder="客户编号"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName"  ctype="input" disabled placeholder="客户名称"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="统计分类明细" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="贷款类别" name="loanTypeDetail"  ctype="input"   placeholder="贷款类别" data-code="STD_LOAN_TYPE_DETAIL"></yu-xform-item>
          <yu-xform-item label="是否落实贷款" name="isPactLoan"  ctype="select"   placeholder="是否落实贷款" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否绿色产业" name="isGreenIndustry"   ctype="select"   placeholder="是否绿色产业" data-code="STD_ZB_YES_NO">></yu-xform-item>
          <yu-xform-item label="是否经营性物业贷款" name="isOperPropertyLoan"  ctype="select"  placeholder="是否经营性物业贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
          <yu-xform-item label="是否钢贸行业贷款" name="isSteelLoan"  ctype="select"  placeholder="是否钢贸行业贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
          <yu-xform-item label="是否不锈钢行业贷款" name="isStainlessLoan"  ctype="select"  placeholder="是否不锈钢行业贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
          <yu-xform-item label="是否扶贫贴息贷款" name="isPovertyReliefLoan"   ctype="select"  placeholder="是否扶贫贴息贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
          <yu-xform-item label="是否劳动密集型小企业贴息贷款" name="isLaborIntenSbsyLoan"   ctype="select"  placeholder="是否劳动密集型小企业贴息贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
          <yu-xform-item label="保障性安居工程贷款" name="goverSubszHouseLoan"   ctype="input"  placeholder="保障性安居工程贷款"></yu-xform-item>
          <yu-xform-item label="项目贷款节能环保" name="engyEnviProteLoan"   ctype="input"  placeholder="项目贷款节能环保"></yu-xform-item>
          <yu-xform-item label="是否农村综合开发贷款标志" name="isCphsRurDelpLoan"   ctype="select"  placeholder="是否农村综合开发贷款标志" data-code="STD_ZB_YES_NO">></yu-xform-item>
          <yu-xform-item label="房地产贷款" name="realproLoan"   ctype="input"  placeholder="房地产贷款"></yu-xform-item>
          <yu-xform-item label="房产开发贷款资本金比例" name="realproLoanRate"   ctype="input"  placeholder="房产开发贷款资本金比例"></yu-xform-item>
          <yu-xform-item label="担保方式明细" name="guarDetailMode"   ctype="input"  placeholder="担保方式明细" data-code="STD_GUAR_DETAIL_MODE"></yu-xform-item>
          <yu-xform-item label="修改原因" name="modifycation_reason" rules="required" ctype="textarea" :rows="3" :colspan="24"  placeholder="修改原因"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
      <yu-xform ref="refForm1" label-width="180px"  v-model="formdata1" :disabled="disabledForm">
        <yu-panel title="原统计分类明细" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="贷款类别" name="oldLoanTypeDetail"  ctype="input" disabled  placeholder="贷款类别" data-code="STD_LOAN_TYPE_DETAIL"></yu-xform-item>
            <yu-xform-item label="是否落实贷款" name="oldIsPactLoan"  ctype="select" disabled  placeholder="是否落实贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
            <yu-xform-item label="是否绿色产业" name="oldIsGreenIndustry"   ctype="select"  disabled placeholder="是否绿色产业" data-code="STD_ZB_YES_NO">></yu-xform-item>
            <yu-xform-item label="是否经营性物业贷款" name="oldIsOperPropertyLoan"  ctype="select" disabled placeholder="是否经营性物业贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
            <yu-xform-item label="是否钢贸行业贷款" name="oldIsSteelLoan"  ctype="select" disabled placeholder="是否钢贸行业贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
            <yu-xform-item label="是否不锈钢行业贷款" name="oldIsStainlessLoan"  ctype="select" disabled placeholder="是否不锈钢行业贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
            <yu-xform-item label="是否扶贫贴息贷款" name="oldIsPovertyReliefLoan"   ctype="select" disabled placeholder="是否扶贫贴息贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
            <yu-xform-item label="是否劳动密集型小企业贴息贷款" name="oldIsLaborIntenSbsyLoan"   ctype="select" disabled placeholder="是否劳动密集型小企业贴息贷款" data-code="STD_ZB_YES_NO">></yu-xform-item>
            <yu-xform-item label="保障性安居工程贷款" name="oldGoverSubszHouseLoan"   ctype="input" disabled placeholder="保障性安居工程贷款"></yu-xform-item>
            <yu-xform-item label="项目贷款节能环保" name="oldEngyEnviProteLoan"   ctype="input" disabled placeholder="项目贷款节能环保"></yu-xform-item>
            <yu-xform-item label="是否农村综合开发贷款标志" name="oldIsCphsRurDelpLoan"   ctype="select" disabled placeholder="是否农村综合开发贷款标志" data-code="STD_ZB_YES_NO">></yu-xform-item>
            <yu-xform-item label="房地产贷款" name="oldRealproLoan"   ctype="input" disabled placeholder="房地产贷款"></yu-xform-item>
            <yu-xform-item label="房产开发贷款资本金比例" name="oldRealproLoanRate"   ctype="input" disabled placeholder="房产开发贷款资本金比例"></yu-xform-item>
            <yu-xform-item label="担保方式明细" name="oldGuarDetailMode"   ctype="input" disabled placeholder="担保方式明细" data-code="STD_GUAR_DETAIL_MODE"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-xform ref="refForm2" label-width="180px"  v-model="tableData" :disabled="disabledForm">
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled placeholder="登记人"></yu-xform-item>
            <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled placeholder="登记机构"></yu-xform-item>
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
yufp.lookup.reg('STD_MODIFY_TYPE','STD_ZB_YES_NO','STD_LOAN_TYPE_DETAIL','STD_GUAR_DETAIL_MODE');
export default {
  components: {yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/datamodify/update',
      formdata: {},
      formdata1: {},
      formType: 'edit',
      formRules: { },
      tableData:{},
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
    } 
  },
  methods: {
    initData: function () {
      let _this = this;
      this.$request({
        url: this.$backend.cmisBiz + '/api/datamodify/' + this.pageParams.serno,
        method: 'post'
      }).then(({code, message, data}) => {
        if (data) {
          if(_this.pageParams.opType !='ADD'){
            yufp.clone(data, _this.formdata);
            yufp.clone(data, _this.formdata1);
            yufp.clone(data, _this.tableData);
          }else{
            _this.formdata.serno = this.pageParams.serno
            _this.formdata.modifyType = this.pageParams.modifyType
            yufp.clone(data, _this.tableData);
          }
        }
      });
    },
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    /** 提交 */
    commit () {
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
            powerFlag: '0', 
            orgType: _this.$store.state.oauth.org.orgType
        };
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
      let jsoRt = null;
      // var jsoCardData = this.formdata; // 先取得表单的数据
      // var jsoCardData1= this.formdata1; // 先取得表单的数据
      var jsoCardData = {}
      yufp.clone(this.formdata, jsoCardData);
      yufp.clone(this.formdata1, jsoCardData);
      console.log('this.formdata',this.formdata)
      console.log('this.formdata1',this.formdata1)
      console.log('jsoCardData',jsoCardData)
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
    cancelFn: function () {
      this.back();
    },
    commonSelectFn: function (row, mapping) {
      // this.formdata = row
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
      this.formdata1.oldLoanTypeDetail = this.formdata.loanTypeDetail //贷款类别
      this.formdata1.oldIsPactLoan = this.formdata.isPactLoan //是否落实贷款
      this.formdata1.oldIsGreenIndustry = this.formdata.isGreenIndustry //是否绿色产业
      this.formdata1.oldIsOperPropertyLoan = this.formdata.isOperPropertyLoan //是否经营性物业贷款
      this.formdata1.oldIsSteelLoan = this.formdata.isSteelLoan //是否钢贸行业贷款
      this.formdata1.oldIsStainlessLoan = this.formdata.isStainlessLoan //是否不锈钢行业贷款
      this.formdata1.oldIsPovertyReliefLoan = this.formdata.isPovertyReliefLoan //是否扶贫贴息贷款
      this.formdata1.oldIsLaborIntenSbsyLoan = this.formdata.isLaborIntenSbsyLoan //是否劳动密集型小企业贴息贷款
      this.formdata1.oldGoverSubszHouseLoan = this.formdata.goverSubszHouseLoan //保障性安居工程贷款
      this.formdata1.oldEngyEnviProteLoan = this.formdata.engyEnviProteLoan //项目贷款节能环保
      this.formdata1.oldIsCphsRurDelpLoan = this.formdata.isCphsRurDelpLoan //是否农村综合开发贷款标志
      this.formdata1.oldRealproLoan = this.formdata.realproLoan  //房地产贷款
      this.formdata1.oldRealproLoanRate = this.formdata.realproLoanRate  //房产开发贷款资本金比例
      this.formdata1.oldGuarDetailMode = this.formdata.guarDetailMode  //担保方式明细
    }
  }
};
</script>
