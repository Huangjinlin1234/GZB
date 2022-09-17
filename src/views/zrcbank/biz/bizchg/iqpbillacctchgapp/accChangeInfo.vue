<template>
  <yu-row>
    <yu-col :span="4">
      <yu-menu default-active="1" @select="handleSelect">
        <yu-menu-item index="1">申请信息</yu-menu-item>
        <yu-menu-item index="2">影像资料</yu-menu-item>
        <yu-menu-item index="3">征信报告</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :span="20">
      <!--展期申请-->
      <div v-if="tabIndex == '1'">
        <yu-xform ref="refForm" label-width="180px" v-model="formdata" :disabled="disabledForm">
          <yu-panel title="贷款基本信息" panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input" disabled placeholder="业务流水号"></yu-xform-item>
              <yu-xform-item label="借据编号" name="billNo" ctype="input" disabled placeholder="借据编号"></yu-xform-item>
              <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled placeholder="客户编号"></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled placeholder="客户名称"></yu-xform-item>
              <yu-xform-item label="合同编号" name="contNo" ctype="input" disabled placeholder="合同编号"></yu-xform-item>
              <yu-xform-item label="贷款金额" name="loanAmt" ctype="yu-currency" disabled :min="0" placeholder="贷款金额"></yu-xform-item>
              <yu-xform-item label="贷款起始日" name="loanStartDate" ctype="datepicker" disabled placeholder="贷款起始日"></yu-xform-item>
              <yu-xform-item label="贷款到期日" name="loanEndDate" ctype="datepicker" disabled placeholder="贷款到期日"></yu-xform-item>
              <yu-xform-item label="业务条线" name="belgLine" ctype="input" disabled hidden></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="原还款账号信息" panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="原还款账号" name="oldRepayAccno" ctype="input" disabled placeholder="原还款账号"></yu-xform-item>
              <yu-xform-item label="原还款账户名称" name="oldRepayAcctName" ctype="input" disabled placeholder="原还款账户名称"></yu-xform-item>
              <yu-xform-item label="原还款账户子序号" name="oldRepaySubAccno" ctype="input" disabled placeholder="原还款账户子序号"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="变更后还款账号信息" panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="还款账号" name="repayAccno" ctype="input" placeholder="还款账号" rules="required" colspan="11"> </yu-xform-item>
              <yu-xform-item label="" name="custom" ctype="custom" colspan="1">
                <yu-button type="primary" :disabled="disabledForm" @click="getAccountInfo">获取</yu-button>
              </yu-xform-item>
              <yu-xform-item label="还款账户名称" name="repayAcctName" ctype="input" disabled placeholder="还款账户名称" rules="required"></yu-xform-item>
              <yu-xform-item label="还款账户子序号" name="repaySubAccno" ctype="input" disabled placeholder="还款账户子序号" :rules="formRules[0]"></yu-xform-item>
              <yu-xform-item label="申请变更理由" name="appResn" ctype="textarea" :rows="3" :colspan="24"></yu-xform-item>
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
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="tempSave" v-if="pageParams.opType != 'VIEW'">暂存</yu-button>
          <yu-button type="primary" @click="commit" v-if="pageParams.opType != 'VIEW'">提交</yu-button>
          <yu-button type="primary" @click="back" v-if="!pageParams.flowPage">返回</yu-button>
        </yu-form-buttons>
        <yufpNwfInit ref="yufpNwfInit" @success-click="back"></yufpNwfInit>
      </div>
      <!--影像-->
      <div v-if="tabIndex == '2'">
        <imageSystem authority="import;insert;download;scan;delImg" :s="1" :para="imageBizParam"></imageSystem>
      </div>
      <div v-if="tabIndex == '3'">
        <d13Billlist  v-if="show3Flag" :biz-page-data="bizData" ></d13Billlist>
      </div>

    </yu-col>
  </yu-row>
</template>
<script>
import { validator } from '@/utils/validate';
import d13Billlist from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {validator, imageSystem, d13Billlist},
  data () {
    return {
      tabIndex: '1',
      activeName: 'first',
      show3Flag: false,
      pageParams: this.$route.meta.params,
      updateUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/update',
      formdata: {},
      formRules: [{validator: validator.number, required: true, trigger: 'blur'}],
      disabledForm: false,
      bizData: {}
    };
  },
  props: {
    bizPageData: Object
  },
  created () {
    var _this = this;
    let params;
    if (this.bizPageData) {
      this.pageParams = {};
      this.pageParams.iqpSerno = _this.bizPageData.instanceInfo.bizId;
      if (!this.bizPageData.instanceInfo.flowEdit) {
        this.pageParams.opType = 'VIEW';
        this.pageParams.flowPage = true;
      }
      params = this.bizPageData;
    } else {
      this.pageParams = this.$route.meta.params;
      params = this.$route.meta.params;
    }
    this.bizData = this.pageParams;

    this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'XXD_YWBGSQ',
        outsystem_code:"XXD_HKZHBGSQZL01",
        index: {
          businessid: params.iqpSerno,
          custconduct: '',
          operid: '',
          maintaindate: '',
          custtype: params.curType,
          custconductname: params.updIdName,
          orgid: params.inputBrId,
          orgname: params.inputBrIdName,
          opername: params.updIdName,
          custid: params.cusId,
          custname: params.inputIdName
          // custname: params.updBrIdName,
        }
      }
    ];
  },
  mounted: function () {
    this.initData();
    // 查询时不可编辑
    if (this.pageParams.opType == 'VIEW') {
      this.disabledForm = true;
    }
    this.getBelgLine();
  },
  methods: {
    /** 查询账户信息 */
    getAccountInfo () {
      let _this = this;
      let model = {};
      if (!_this.formdata.repayAccno) {
        _this.$message({
          message: '请先填写还款账号',
          type: 'warning'
        });
        return;
      }
      model.kehuhao = _this.formdata.repayAccno;
      model.zixuhao = _this.formdata.repaySubAccno;
      yufp.service.request({
        method: 'POST',
        url: this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/queryBailAcctInfo',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if(response.data.zhhuztai == 'A' ){//账户状态正常
              _this.formdata.repayAcctName = response.data.zhhuzwmc;
              _this.formdata.repaySubAccno = response.data.zhaoxhao;
            }else{//账户状态非正常
              _this.formdata.repayAccno = '';
              _this.$message('还款账户状态非正常，请重新输入！');
              return;
            }
            // console.log(response.data);
          } else {
            _this.$message({ message: message, type: 'error' });
          }
        }
      });
    },
    handleSelect: function (index) {
      this.tabIndex = index;
      if(index == '1'){
        this.initData();
        this.getBelgLine();
      }
      if (index == '3') {
        this.show3Flag = true;
      }
    },
    initData: function () {
      let _this = this;
      this.$request({
        url: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/' + this.pageParams.iqpSerno,
        method: 'post'
      }).then(({ code, message, data }) => {
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

      // 还款账户变更为本人本行其他账号,不需要审批
      if(this.formdata.repayAcctName == this.formdata.cusName){
          this.$request({
              url: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/batchdelete/updateApproveStatus',
              method: 'post',
              data: this.formdata.iqpSerno,
              async: false,
              success: response => {
                console.log("返回信息------------>",response);
                if (response.code == '0') {
                  this.$message('更新成功!');
                  yufp.frame.removeTab(this.$route.path);
                } else {
                  // 处理请求失败的情况
                  this.$message({ message: response.erortx, type: 'error' });
                }
              },
              error: () => {
                // 处理请求失败的情况
                this.$message({ message: "接口调用失败!", type: 'error' });
              }
          });
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
      startdto.param = {};
      // 小微
      if (_this.formdata.belgLine == '01') {
        startdto.bizType = 'BG014';
      }
      // 零售
      if (_this.formdata.belgLine == '02') {
        startdto.bizType = 'BG013';
      }
      // 对公
      if (_this.formdata.belgLine == '03') {
        startdto.bizType = 'BG012';
      }  
      if('A' == userInfo.org.orgType){
        // 是否保全客户经理岗
        startdto.param.duty = '0';
        const dutysList = userInfo.dutys;
        if (dutysList != undefined && dutysList.length > 0) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
              startdto.param.duty = '1';
              break;
            }
          }
        }
        if (userInfo.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH09';// （寿光）
          } else if (userInfo.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH09';// （东海）
          }
      }
       console.log('业务类型--->', startdto.bizType);
        console.log('参数--->', startdto.param);
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
      this.getFactory.back();
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
       }
      })
    }
  }
};
</script>
