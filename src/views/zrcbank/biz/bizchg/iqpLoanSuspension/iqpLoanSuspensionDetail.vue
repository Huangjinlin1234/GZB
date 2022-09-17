<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="180px" :form-type="formType" v-model="formdata" :disabled="disabledForm" >
        <yu-panel title="贷款基本信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" name="ilsSerno" ctype="input" disabled placeholder="业务流水号"></yu-xform-item>
            <yu-xform-item label="借据编号" name="billNo" ctype="input" disabled placeholder="借据编号"></yu-xform-item>
            <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled placeholder="客户编号"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label="合同编号" name="contNo" ctype="input" disabled placeholder="合同编号"></yu-xform-item>
            <yu-xform-item label="产品名称" name="prdName" ctype="input" disabled placeholder="产品名称"></yu-xform-item>
            <yu-xform-item label="贷款金额" name="loanAmt" ctype="yu-currency" disabled :min="0" placeholder="贷款金额"></yu-xform-item>
            <yu-xform-item label="贷款余额" name="loanBalance" ctype="yu-currency" disabled :min="0" placeholder="贷款余额"></yu-xform-item>
            <yu-xform-item label="贷款起始日" name="loanStartDate" ctype="datepicker" disabled placeholder="贷款起始日"></yu-xform-item>
            <yu-xform-item label="贷款到期日" name="loanEndDate" ctype="datepicker" disabled placeholder="贷款到期日"></yu-xform-item>
            <yu-xform-item label="申请渠道" name="appChnl" ctype="select" data-code="STD_APP_CHNL" disabled placeholder="申请渠道"></yu-xform-item>
            <yu-xform-item label="台账状态" name="accStatus" ctype="select" data-code="STD_ACC_STATUS" disabled placeholder="台账状态"></yu-xform-item>
            <yu-xform-item label="业务条线" name="belgLine" ctype="input" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="贷款停息信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="停止操作码"  name="susOpt" rules="required" ctype="select" placeholder="请选择" data-code="STD_SUS_OPT"  @change="changeRepayMode"></yu-xform-item>
            <yu-xform-item label="是否补计提停息阶段利息" rules="required" name="isCalculateInt" ctype="radio" data-code="STD_ZB_YES_NO" v-if="make"></yu-xform-item>
            <yu-xform-item label="停息原因"  name="susReason" ctype="textarea" rules="required" v-if="show" ></yu-xform-item>
            <yu-xform-item label="生效日期"  name="susInputDate" ctype="datepicker" rules="required" value-format="yyyy-MM-dd"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled placeholder="登记人"></yu-xform-item>
            <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled placeholder="登记机构"></yu-xform-item>
            <yu-xform-item label="责任人" name="managerIdName" ctype="input" disabled placeholder="责任人"></yu-xform-item>
            <yu-xform-item label="责任机构" name="managerBrIdName" ctype="input" disabled placeholder="责任机构"></yu-xform-item>
            <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="交易日期" name="transactionDate" ctype="datepicker" disabled placeholder="交易日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button type="primary" @click="tempSave" v-if="pageParams.opType !== 'VIEW'">保存</yu-button>
      <yu-button type="primary" @click="commit" v-if="pageParams.opType !== 'VIEW'">提交</yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_YES_NO,STD_SUS_OP,STD_APP_CHNL,STD_ACC_STATUS')
export default {
  components: { yufpNwfInit },
  props: {
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      pageParams: this.$route.meta.params,
      updateUrl: this.$backend.cmisBiz + '/api/iqploansuspension/update',
      formdata: {},
      formType: 'edit',
      formRules: {},
      disabledForm: false,
      showDymic: false,
      hiddenFlag: false,
      repayModeDescOpt: [],
      show:false,
      make:false,
      ilsSerno:''
    };
  },
  created () {
    let _this = this;
    // this.pageParams = this.$route.meta.params;
    if (_this.bizPageData) {
      _this.pageParams = {};
      _this.ilsSerno = _this.bizPageData.instanceInfo.bizId;
      _this.pageParams.opType = 'VIEW';
      _this.pageParams.flowPage = true;
    } else {
      _this.ilsSerno = _this.pageParams.ilsSerno
      if (_this.pageParams.opType == 'VIEW') {
          _this.disabledForm = true;
      }
    }
  },
  mounted () {
    this.initData();
    // 查询时不可编辑
    if (this.pageParams.opType == 'VIEW') {
      this.disabledForm = true;
    }
  },
  methods: {
    changeRepayMode:function(){
      if(this.formdata.susOpt =='01'){
        this.show = true;
        this.make = false
        this.formdata.isCalculateInt='';
      }else if(this.formdata.susOpt =='02'){
        this.make = true;
        this.show = false;
        this.formdata.susReason = '';
      }
    },
    initData: function (opendTab) {
      let _this = this;
      this.$request({
        url: _this.$backend.cmisBiz + '/api/iqploansuspension/querySingle' ,
        method: 'post',
        data:_this.ilsSerno
      }).then(({ code, message, data }) => {
        if (data) {
          yufp.clone(data, _this.formdata);
         if(!data.susInputDate){
           _this.formdata.susInputDate = new Date();
         }
        }
      });
    },



    /** 选择账户子序号 */
    onIconClickFn () {},
    /** 关闭页面 */
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    /** 提交 */
    commit () {
      var _this = this;
      // 保存
      _this.tempSave();
      // 获取业务条线
      this.getBelgLine();
      // 提交流程
      const userInfo = _this.$xutils.getLoginUserInfo();
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.bizId = _this.formdata.ilsSerno;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {isCalculateInt: _this.formdata.isCalculateInt};

      let belgLine = _this.formdata.belgLine;
      if(_this.formdata.susOpt == '01'){
          if (belgLine == '02') {// 贷款停息申请（零售）
            startdto.bizType = 'BG042';
          }else if (belgLine == '03') {// 贷款停息申请（对公）
            startdto.bizType = 'BG041';
          }
          // 村镇贷款停息 
        if('A' == userInfo.org.orgType){
            // 是否保全客户经理岗
            startdto.param.isZCBQB = '0';
            const dutysList = userInfo.dutys;
            if (dutysList != undefined && dutysList.length > 0) {
              for (let i = 0; i < dutysList.length; i++) {
                let item = dutysList[i];
                if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
                  startdto.param.isZCBQB = '1';
                  break;
                }
              }
            }
            if (userInfo.orgCode.startsWith('80')) {
              startdto.bizType = 'SGH17';// （寿光）
            } else if (userInfo.orgCode.startsWith('81')) {
              startdto.bizType = 'DHH17';// （东海）
            }
         }

      }else if(_this.formdata.susOpt == '02'){
          if (belgLine == '02') {// 贷款取消停息申请（零售）
            startdto.bizType = 'BG044';
          }else if (belgLine == '03') {// 贷款取消停息申请（对公）
            startdto.bizType = 'BG043';
          }
          // 村镇贷款取消停息 
        if('A' == userInfo.org.orgType){
           // 是否保全客户经理岗
            startdto.param.isZCBQB = '0';
            const dutysList = userInfo.dutys;
            if (dutysList != undefined && dutysList.length > 0) {
              for (let i = 0; i < dutysList.length; i++) {
                let item = dutysList[i];
                if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
                  startdto.param.isZCBQB = '1';
                  break;
                }
              }
            }
            if (userInfo.orgCode.startsWith('80')) {
              startdto.bizType = 'SGH18';// （寿光）
            } else if (userInfo.orgCode.startsWith('81')) {
              startdto.bizType = 'DHH18';// （东海）
            }
         }
      }else{
        this.$message({ message: '停止操作码为空,无法发起流程!', type: 'warning' });
        return;
      }
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    tempSave () {
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
    getAccNoT () {
      var _this = this;
      let jsoPar = _this.formdata;
      let repayAcctNo = jsoPar.repayAcctNo;
      if (repayAcctNo == null || repayAcctNo == '') {
        _this.$xutils.showMsgBox('提示', '账号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      var data = { loanPayoutAccno: jsoPar.repayAcctNo };
      _this.$dialog.open('', 'bizmanage/iqpBiz/iqpEntrustLoanApp/singleAccountSelectApp', 1000, 800, data, params => {
        // console.log(params);
        _this.$refs.refForm.formdata.repayAcctName = params.zhhuzwmc;
        _this.$refs.refForm.formdata.repaySubAccno = params.zhhaoxuh;
      });
    },
    // 查询业务条线
    getBelgLine(){
      var model = {};
      var _this = this;
      model.billNo = _this.formdata.billNo;
      _this.$request({
        async: false,// 同步
        url: _this.$backend.cmisBiz + '/api/accloan/querymodel',
        method: 'post',
        data: JSON.stringify({ condition: JSON.stringify(model) })
      }).then((response) => {
       if (response.code == '0') {
            _this.formdata.belgLine = response.data.data[0].belgLine;
       }
      })
    },
  }
};
</script>
