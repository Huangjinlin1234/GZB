<template>
  <div id="lmtIntBankAppBaseInfo">
    <div id="lmtIntBankAppBaseInfoContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="授信基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请编号" ctype="input" placeholder="申请编号" name="serno" disabled></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="业务类型" name="lmtType" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" :span="10" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="授信金额(万元)" ctype="yu-num" number-formatter="0,000" placeholder="授信金额(万元)" name="lmtAmt" disabled></yu-xform-item>
            <yu-xform-item label="审批权限" ctype="select" placeholder="审批权限" name="apprMode" data-code="STD_APPR_MODE" disabled></yu-xform-item>
            <yu-xform-item label="是否大额授信" placeholder="是否大额授信" name="isLargeLmt" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
            <yu-xform-item label="是否需报备董事长" placeholder="是否需报备董事长" name="isReportChairman" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>

            <yu-xform-item label="原授信批复流水号" ctype="input" placeholder="原授信批复流水号" name="origiLmtReplySerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
            <yu-xform-item label="期限" ctype="input" placeholder="期限" name="term" hidden></yu-xform-item>
            <yu-xform-item label="同业授信准入" ctype="input" placeholder="同业授信准入" name="intbankLmtAdmit" hidden></yu-xform-item>
            <yu-xform-item label="调查结论" ctype="input" placeholder="调查结论" name="indgtRst" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

        <lmtIntBankAppSubInfo :children="childrenData" @init="init"></lmtIntBankAppSubInfo>

        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerIdName" disabled></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>

            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
      <div class="yu-grpButton">
        <yu-button v-show="dataParam.op=='EDIT'" type="primary" @click="doSubmit">提交</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import lmtIntBankAppSubInfo from './lmtIntBankAppSubInfo';
yufp.lookup.reg('STD_SX_LMT_TYPE,STD_ZB_YES_NO');
export default{
  components: { yufpNwfInit, lmtIntBankAppSubInfo },
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  name: 'LmtIntBankAppBaseInfo',
  mixins: [mixinForm],
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
      File: {},
      showlmt: false
    };
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
    this.childrenData = this.dataParam;
    this.init();
  },
  mounted: function () {

  },
  destroyed: function () {
    yufp.globalEventBus.$off('subjectAnalyse');
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.op = this.data.op;
      _this.serno = this.data.serno;
      _this.formDisabled = true;
      _this.saveBtnShow = true;
      if (_this.op == 'DETAIL') {
        _this.saveBtnShow = false;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtintbankapp/selectByModel',
        data: { condition: JSON.stringify({ oprType: '01', serno: _this.serno }) },
        callback: function (code, message, response) {
          let subjectAnalyse = response.data[0];
          yufp.clone(subjectAnalyse, _this.formdata);
          _this.$emit('changed', subjectAnalyse);
          // yufp.globalEventBus.$emit("subjectAnalyse", subjectAnalyse)
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

      yufp.globalEventBus.$emit('refreshLmtIntbankTable');
      this.$emit('changed', false);
    }
  }
};
</script>
