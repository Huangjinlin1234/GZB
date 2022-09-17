<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="180px" :form-type="formType" v-model="formdata" :disabled="disabledForm">
        <yu-panel title="贷款基本信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" name="agrSerno" ctype="input" disabled hidden placeholder="业务流水号"></yu-xform-item>
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
            <yu-xform-item label="审批状态" name="approveStatus" ctype="input" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="还款情况信息" panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="还款间隔" name="repayInterval" rules="required" disabled ctype="yu-num" @change="setDelayEndDate" ></yu-xform-item>
              <yu-xform-item label="生效截止日" name="delayEndDate" rules="required" disabled ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="是否立即生效" name="validImmeFlag" rules="required" disabled ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
              <yu-xform-item label="补充协议签订日期" name="agrSignDate" rules="required"  ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="申请变更理由" name="delayResn" rules="required" disabled ctype="textarea" row="2"  colspan="24" ></yu-xform-item>
            </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" name="inputId" ctype="input" disabled placeholder="登记人"></yu-xform-item>
            <yu-xform-item label="登记机构" name="inputBrId" ctype="input" disabled placeholder="登记机构"></yu-xform-item>
            <yu-xform-item label="责任人" name="managerId" ctype="input" disabled placeholder="责任人"></yu-xform-item>
            <yu-xform-item label="责任机构" name="managerBrId" ctype="input" disabled placeholder="责任机构"></yu-xform-item>
            <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" disabled placeholder="登记日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button type="primary" @click="tmpSave" v-if="pageParams.opType !== 'VIEW'">暂存</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/iqpdelayagreement/update',
      formdata: {},
      formType: 'edit',
      formRules: {},
      disabledForm: false,
      showDymic: false,
      hiddenFlag: false,
      repayModeDescOpt: []
    };
  },
  mounted () {
    this.initData();
    // 查询时不可编辑
    if (this.pageParams.opType == 'VIEW') {
      this.disabledForm = true;
    }
    this.getBelgLine();
  },
  methods: {
    initData: function () {
      let _this = this;
      yufp.service.request({
      method: 'GET',
      url: _this.$backend.cmisBiz + '/api/iqpdelayagreement/'+_this.pageParams.agrSerno ,
      callback: function (code, message, response) {
        if (response.code == '0') {
          yufp.clone(response.data, _this.formdata);
        } else {
          _this.$message({ message: '延期还款申请信息查询失败！', type: 'error'});
        }
      }
      });
    },
    /** 关闭页面 */
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    /** 提交 */
    commit () {
      const saveResult = this.tmpSave();
      if (!saveResult || saveResult.code != '0') {
        return;
      }
      var _this = this;
      // 提交流程
      const userInfo = this.$xutils.getLoginUserInfo();
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.bizId = _this.formdata.agrSerno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {};
      //小微
      if(_this.formdata.belgLine == '01'){
          startdto.bizType = 'BG037';
      }
      //零售
      if(_this.formdata.belgLine == '02'){
          startdto.bizType = 'BG039';
      }
      //对公
      if(_this.formdata.belgLine == '03'){
          startdto.bizType = 'BG038';
          startdto.param = {
            approveStatus: _this.formdata.approveStatus,
            contAmt: _this.formdata.loanAmt
          };
      }
      if('A' == userInfo.org.orgType){
        if (userInfo.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH13';// （寿光）
          } else if (userInfo.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH13';// （东海）
          }
      }
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    tmpSave () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
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
    setDelayEndDate(){
      // var _this = this;
      // debugger;
      // var repayInterval = _this.formdata.repayInterval;
      // if(repayInterval){
      //   var date = new Date();
      //   date.setMonth(parseInt(date.getMonth()) + parseInt(repayInterval));
      //   _this.formdata.delayEndDate = date;
      // }
    }
  }
};
</script>
