<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="180px" :form-type="formType" v-model="formdata" :disabled="disabledForm">
        <yu-panel title="贷款基本信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" name="delaySerno" ctype="input" disabled hidden placeholder="业务流水号"></yu-xform-item>
            <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled placeholder="客户编号"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label="合同编号" name="contNo" ctype="input" disabled placeholder="合同编号"></yu-xform-item>
            <yu-xform-item label="借据编号" name="billNo" ctype="input" disabled placeholder="借据编号"></yu-xform-item>
            <yu-xform-item label="贷款金额" name="loanAmt" ctype="yu-currency" disabled :min="0" placeholder="贷款金额"></yu-xform-item>
            <yu-xform-item label="贷款余额" name="loanBalance" ctype="yu-currency" disabled :min="0" placeholder="贷款余额"></yu-xform-item>
            <yu-xform-item label="贷款起始日" name="loanStartDate" ctype="datepicker" disabled placeholder="贷款起始日"></yu-xform-item>
            <yu-xform-item label="贷款到期日" name="loanEndDate" ctype="datepicker" disabled placeholder="贷款到期日"></yu-xform-item>
            <yu-xform-item label="台账状态" name="accStatus" ctype="select" data-code="STD_ACC_STATUS" disabled placeholder="台账状态"></yu-xform-item>
            <yu-xform-item label="业务条线" name="belgLine" ctype="input" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="还款情况信息" panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="还款间隔(月)" name="repayInterval" rules="required" ctype="yu-num" @change="setDelayEndDate" ></yu-xform-item>
              <yu-xform-item label="生效截止日" name="delayEndDate" rules="required"  ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="是否立即生效" name="validImmeFlag" rules="required"  ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
              <yu-xform-item label="申请变更理由" name="delayResn" rules="required"  ctype="textarea" row="2"  colspan="24" ></yu-xform-item>
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
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button type="primary" @click="save" v-if="pageParams.opType !== 'VIEW'">保存</yu-button>
      <yu-button type="primary" @click="commit" v-if="pageParams.opType !== 'VIEW'">提交</yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { yufpNwfInit },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpdelaypayment/update',
      formdata: {},
      formType: 'edit',
      formRules: {},
      disabledForm: false,
      showDymic: false,
      hiddenFlag: false,
      repayModeDescOpt: [],
      isSmconCus: ''
    };
  },
  mounted () {
    this.initData();
    // 查询时不可编辑
    if (this.pageParams.opType == 'VIEW') {
      this.disabledForm = true;
    }
    this.getBelgLine();
    this.getIsSmconCus();
  },
  methods: {
    initData: function () {
      let _this = this;
      this.$request({
        url: this.$backend.cmisBiz + '/api/iqpdelaypayment/' + this.pageParams.delaySerno,
        method: 'post'
      }).then(({ code, message, data }) => {
        if (data) {
          yufp.clone(data, _this.formdata);
        }
      });
    },
    /** 关闭页面 */
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    /** 提交 */
    commit () {
      // 校验生效截止日期不能小于当前营业日期!   生效截止日期大于贷款到期日，还款周期就不变回去了
      var openday =  this.$xutils.dateFormat('yyyy-MM-dd', new Date(yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2)));  
      var delayEndDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.delayEndDate));
      if (delayEndDate != '' && delayEndDate < openday) {
        this.$xutils.showMsgBox('提示', '生效截止日期不能小于当前营业日期!');
        return;
      }
      const saveResult = this.save();
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
      startdto.bizId = _this.formdata.delaySerno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {};
      var isLsOrg = '0';
      if(userInfo.org.orgType == '7'){
            isLsOrg = '1';
      }
      //小微
      if(_this.formdata.belgLine == '01'){
          startdto.bizType = 'BG020';
      }
      //零售
      if(_this.formdata.belgLine == '02'){
          startdto.bizType = 'BG019';
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
            isRaise: '0', // 是否上调权限:1-是,0-否
            isSgh16: '0', // 是否资产保全客户经理  0-否,1-是
          };
      }
      //对公
      if(_this.formdata.belgLine == '03'){
          startdto.bizType = 'BG018';
          startdto.param = {
            orgId: userInfo.orgCode, // 是否pc端发起:1-是,0-否
            isSmconCus : _this.isSmconCus //是否小企业客户
          };
      }

      // 岗位校验
      const loginUser = _this.$xutils.getLoginUserInfo();
        const dutysList = loginUser.dutys;
        if (dutysList != undefined) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'FZH01' && _this.formdata.belgLine != '03') { //  对公客户经理但条线不是对公的则不给提交
             this.$message('非对公条线请确认!');
             return;
            }
            if (item.code === 'FZH02' && _this.formdata.belgLine != '02') { //  零售客户经理但条线不是零售的则不给提交
             this.$message('非零售条线请确认!');
             return;
            }
            if (item.code === 'XWB01' && _this.formdata.belgLine != '01') { //  小微客户经理但条线不是小微的则不给提交
             this.$message('非小微条线请确认!');
             return;
            }
          };
        }
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
        if (loginUser.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH12';// （寿光）
          } else if (loginUser.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH12';// （东海）
          }
      }
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    save () {
      // 保存
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }

      let jsoRt = null;
      var jsoCardData = this.formdata; // 先取得表单的数据
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: jsoCardData,
        async: false,
        success: response => {
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

    // 查询业务条线
    getBelgLine(){
      var model = {};
      var _this = this;
      model.billNo = _this.pageParams.billNo;
      _this.$request({
      url: _this.$backend.cmisBiz + '/api/accloan/querymodel',
        method: 'post',
        data: JSON.stringify({ condition: JSON.stringify(model) })
      }).then((response) => {
       if (response.code == '0') {
            _this.formdata.belgLine = response.data[0].belgLine;
            _this.formdata.loanStartDate = response.data[0].loanStartDate;
            _this.formdata.loanEndDate = response.data[0].loanEndDate;
            _this.formdata.accStatus = response.data[0].accStatus;
       }
      })
    },

    //日期联动
    setDelayEndDate(val){
      // if(val){
      //   var date = new Date();
      //   date.setMonth(parseInt(date.getMonth()) + parseInt(val));
      //   this.formdata.delayEndDate = date;
      //   this.formdata.repayInterval = parseFloat(val).toFixed()
      // }
    },

    //获取是否小企业
    getIsSmconCus(){
      var _this = this;
      _this.$request({
        url: _this.$backend.cmisCus + '/api/cuscorp/'+_this.pageParams.cusId,
        method: 'post'
      }).then((response) => {
       if (response.code == '0') {
            _this.isSmconCus = response.data.isSmconCus;
       }
      })
    }
  }
};
</script>
