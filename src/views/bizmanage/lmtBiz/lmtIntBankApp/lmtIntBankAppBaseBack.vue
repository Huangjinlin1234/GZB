<template>
  <div id="lmtIntBankAppBaseInfo">
    <div id="lmtIntBankAppBaseInfoContent">
      <yu-panel title="同业客户授信申报-复议" panel-type="simple">
        <yu-xform ref="refOldForm" label-width="150px" :form-type="formType" v-model="formdataOld">
          <yu-xform-group :column="3">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="原授信批复信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="原授信批复流水号" ctype="input" placeholder="原授信批复流水号" name="origiLmtReplySerno" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="1">
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="原授信金额(万元)" ctype="yu-num" number-formatter="0,000" placeholder="授信金额(万元)" name="origiLmtAmt" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
        <yu-xform ref="refForm" label-width="150px" :form-type="formType" v-model="formdata">
          <yu-panel title="本次授信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" disabled></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="业务类型" name="lmtType" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="授信金额(万元)" ctype="yu-num" number-formatter="0,000" placeholder="授信金额(万元)" name="lmtAmt" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="审批权限" ctype="select" placeholder="审批权限" name="apprMode" data-code="STD_APPR_MODE" disabled></yu-xform-item>
              <yu-xform-item label="是否大额授信" placeholder="是否大额授信" name="isLargeLmt" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
              <yu-xform-item label="是否需报备董事长" placeholder="是否需报备董事长" name="isReportChairman" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <lmtIntBankAppSubInfo :children="childrenData"></lmtIntBankAppSubInfo>
          <yu-panel title="登记信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrIdName" disabled></yu-xform-item>
              <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerIdName" disabled></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
      </yu-panel>
      <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
      <div class="yu-grpButton">
        <yu-button v-show="dataParam.op=='EDIT'" type="primary" @click="doSubmit">提交</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_APPR_MODE,STD_ZB_YES_NO,STD_SX_LMT_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import lmtIntBankAppSubInfo from './lmtIntBankAppSubInfo';
export default{
  components: { yufpNwfInit, lmtIntBankAppSubInfo },
  name: 'LmtIntBankAppBaseInfo',
  mixins: [mixinForm],
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtintbankapp/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtintbankapp/',
      formdata: {},
      formType: 'edit',
      op: 'DETAIL',
      formRules: {},
      dataParam: {},
      imageUrls: {},
      File: {}
    };
  },
  created () {
    debugger;
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
    this.childrenData = this.dataParam;
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.serno = this.data.serno;
      _this.origiLmtReplySerno = this.data.origiLmtReplySerno;
      _this.formDisabled = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtintbankapp/selectByModel',
        data: { condition: JSON.stringify({ oprType: '01', serno: _this.serno }) },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdataOld);
          _this.$emit('changed', response.data[0]);
          _this.formdataOld.origiLmtAmt = _this.formatterNum(_this.formdataOld.origiLmtAmt / 10000);
        }
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtintbankapp/selectByModel',
        data: { condition: JSON.stringify({ oprType: '01', serno: _this.serno }) },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdata);
          _this.formdata.lmtAmt = _this.formatterNum(_this.formdata.lmtAmt / 10000);
        }
      });
    },

    // 数字精度
    formatterNum: function (value) {
      return parseFloat(parseFloat(value).toFixed());
    },

    // 提交操作
    doSubmit () {
      var obj = this.formdata;
      const loginUser = this.$xutils.getLoginUserInfo();
      let dutysArry = []; //  loginUser.dutys
      for (let i = 0; i < loginUser.dutys.length; i++) {
        dutysArry.push(loginUser.dutys[i].code);
      }
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.org.code;
      startdto.userId = this.$store.state.oauth.loginCode;
      startdto.bizId = obj.serno; // this.getFactory().contextData.surveySerno;
      startdto.bizUserName = obj.cusName; // this.d1_A_BillCard.getItemValue('cusName');
      startdto.bizUserId = obj.cusId; // this.d1_A_BillCard.getItemValue('cusId');
      startdto.bizPkId = obj.pkId;
      if (obj.lmtType == '01') {
        startdto.bizType = 'TY004';
      }
      if (obj.lmtType == '05') {
        startdto.bizType = 'TY006';
      }
      if (obj.lmtType == '03') {
        startdto.bizType = 'TY004';
      }

      startdto.param = {
        'userId': this.$store.state.oauth.loginCode,
        'BizPkId': obj.pkId,
        'tableName': 'lmtIntbankApp',
        'lmtType': obj.lmtType,
        'dutyOrgType': loginUser.org.orgType, // 客户经理所属机构类型  分行、支行、小微、非客户经理
        'dutys': dutysArry.join(',')
      };
      this.$refs.yufpNwfInit.wfInit(startdto);
    },

    forceUpdate () {
      this.cancelFn();
    },

    // 取消按钮
    cancelFn () {
      // this.$store.dispatch('tagsView/delView', this.$route);
      // this.$router.go(-1);
      this.$emit('changed', false);
    }
  }
};
</script>
