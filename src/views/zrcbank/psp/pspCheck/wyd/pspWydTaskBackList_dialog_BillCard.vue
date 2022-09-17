<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType"  v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled ></yu-xform-item>
          <yu-xform-item label="任务编号" ctype="yu-xwyd-task" rules="required" placeholder="任务编号" name="taskNo" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}"  :parms="parms"  width="1000" height="480" :hidden="formType==='details'"></yu-xform-item>  
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="退回原因" ctype="select" name="backReason"  data-code="STD_ZB_BKREASON_STATUS" placeholder="退回原因" @change="onChange" rules="required"></yu-xform-item>
          <yu-xform-item label="退回时间" ctype="input" placeholder="退回时间" name="backDate" hidden></yu-xform-item>
          <yu-xform-item label="实际经营地址" ctype="input" placeholder="实际经营地址" name="relArrdess" :rules="rulesValue1" :hidden="ishidden1"></yu-xform-item>
          <yu-xform-item label="对应支行" ctype="select" placeholder="对应支行" data-code="STD_WYD_RELBRTYPE" name="relBrId" :rules="rulesValue1" :hidden="ishidden1"></yu-xform-item>
          <yu-xform-item label="联系客户时间1" ctype="input" placeholder="联系客户时间1" name="contactTime1" :rules="rulesValue2" :hidden="ishidden2"></yu-xform-item>
          <yu-xform-item label="联系客户时间2" ctype="input" placeholder="联系客户时间2" name="contactTime2" :rules="rulesValue2" :hidden="ishidden2"></yu-xform-item>
          <yu-xform-item label="联系客户时间3" ctype="input" placeholder="联系客户时间3" name="contactTime3" :rules="rulesValue2" :hidden="ishidden2"></yu-xform-item>
          <yu-xform-item label="联系情况" ctype="input" placeholder="联系情况" name="contactInfo" :rules="rulesValue2" :hidden="ishidden2"></yu-xform-item>
          <yu-xform-item label="联系客户手机（座机）号" ctype="input" placeholder="联系客户手机（座机）号" name="contactPhone" :rules="rulesValue2" :hidden="ishidden2"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="saveD">保存</yu-button>
      <yu-button type="primary" v-if="formType != 'details'" @click="commitFn">提交</yu-button>
      <yu-button type="primary" v-if="backStatus" @click="cancel">返回</yu-button>
      <yufp-nwf-init ref="yufpNwfInit" @success-click="submitSuccess"></yufp-nwf-init>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { lookup } from '@/utils';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
lookup.reg('STD_ZB_BKREASON_STATUS', 'STD_WYD_RELBRTYPE');
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  components: {
    yufpNwfInit
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisPsp + '/api/pspwydtaskback/update',
      addUrl: this.$backend.cmisPsp + '/api/pspwydtaskback/insert',
      formdata: {},
      // formType: 'details',
      formType: "",
      formRules: { },
      imageUrls: {},
      backStatus: true,
      rulesValue1: {required: false},
      rulesValue2: {required: false},
      ishidden1: 'true',
      ishidden2: 'true'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      var _this = this;
      var bizPageData = _this.bizPageData || {};
      var instanceInfo = bizPageData.instanceInfo;
      // 如果流程实例存在，则说明是从流程中打开的页面
      if (instanceInfo) {
        _this.backStatus = false;
        _this.formType = 'details';
        _this.$request({
        url: _this.$backend.cmisPsp + '/api/pspwydtaskback/' + instanceInfo.bizId,
        method: 'get'
      }).then(({code, message, data}) => {
        if (data) {
          yufp.clone(data, _this.formdata);
        }
         });
      }else{
        _this.formType = this.pageParams.operate;
      if (_this.pageParams.pkId != '' && _this.pageParams.pkId != null && _this.pageParams.pkId != undefined) {
        yufp.clone(_this.pageParams, _this.formdata);
      }else{
        _this.execBillCardDefaultValueFormula();
      }
    }
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.approveStatus = '000';
      this.formdata.backDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.pkId = this.$xutils.getSEQWithParamFromServer('PK_VALUE')
    },
    cancel () {
      this.$dialog.close(this.dialogId);
    },
    saveData: function () {
      if(this.formType == 'ADD'){
       return this.saveBillCardData();
      }else{
       return this.updateBillCardData();
      }
     
    },
    saveD: function () {
      var _this = this;
      var res = _this.saveData();
      if (res.code == 0) {
        _this.formType = 'update';
      } else {
        _this.$xutils.showMsgBox('提示', '数据保存失败！请核查数据', 400, 300);
      }
    },
    submitSuccess () {
      this.cancel();
    },
    // 提交
    commitFn: function () {
      var _this = this;
       var res = _this.saveData();
      if (res.code == 0) {
      let loginUser = _this.$xutils.getLoginUserInfo();
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'DH056';
      startdto.bizId = _this.formdata.pkId;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {};
      _this.$refs.yufpNwfInit.wfInit(startdto);
      } else {
          _this.$xutils.showMsgBox('提示', '数据保存失败！请核查数据', 400, 300);
        }
    },
    onChange: function (backReason) {
      if (backReason == '01'){
        this.rulesValue1 = {required: true, message: "必输项"};
        this.rulesValue2 = {required: false};
        this.ishidden1 = false;
        this.ishidden2 = true;
        this.formdata.contactTime1 = '';
        this.formdata.contactTime2 = '';
        this.formdata.contactTime3 = '';
        this.formdata.contactInfo = '';
        this.formdata.contactPhone = '';
      }else if (backReason == '02'){
        this.rulesValue1 = {required: false};
        this.rulesValue2 = {required: true, message: "必输项"};
        this.ishidden1 = true;
        this.ishidden2 = false;
        this.formdata.relArrdess = '';
        this.formdata.relBrId = '';
      }
    }
  }
};
</script>