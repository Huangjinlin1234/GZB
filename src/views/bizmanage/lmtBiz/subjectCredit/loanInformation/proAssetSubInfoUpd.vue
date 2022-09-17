<template>
  <div>
    <yu-panel title="底层基础资产明细修改" panel-type="simple">
      <yu-xform label-width="120px" ref="refForm" :disabled="formDisabled" :form-type="formType" v-model="formdata">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户名称" ctype="input" name="basicCusName" rules="required" disabled>
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" name="basicCusId" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="是否申报底层授信" ctype="select" name="isAppBasicLmt" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="占用底层授信分项编号" ctype="input" name="useBasicLmtSubSerno" :colspan="10" disabled></yu-xform-item>
          <yu-xform-item label="" :hidden="basicLmtflag" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="handleLook">查看</yu-button>
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="占用底层授信品种编号" ctype="input" name="useBasicLmtItemNo" disabled></yu-xform-item>
          <yu-xform-item label="占用底层授信品种名称" ctype="input" name="useBasicLmtItemName" disabled></yu-xform-item>
          <yu-xform-item label="底层资产类型" ctype="select" name="basicAssetType" data-code="STD_ZB_BOTT_TYPE" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="我行在该底层的投资金额（万元）" ctype="yu-num" number-formatter="0,000" v-model="basicAssetLmtAmt" disabled></yu-xform-item>
          <yu-xform-item label="本项底层资产余额（万元）" ctype="yu-num" number-formatter="0,000" name="basicAssetBalanceAmt" @blur="changebasicAssetBalanceAmt" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="底层资产名称" ctype="input" name="basicAssetName" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="底层资产到期日" ctype="datepicker" name="basicAssetEndDate" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="本项底层资产余额/占产品总额比例(%)" ctype="yu-num" sign="%" :multiple="100" v-model="basicAssetPercent" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-show="saveBtnShow" type="primary" @click="doSave">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_ZB_BOTT_TYPE');
export default {
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  components: { YufpDemoSelector },
  data: function () {
    return {
      formdata: {},
      dataParam: {},
      dataUrl: backend.cmisBiz + '/api/lmtintbankappsub/selectByModel',
      Param: { condition: { oprType: '01', serno: this.children.serno } },
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      peerDisabled: false,
      basicAssetPercent: '',
      basicAssetLmtAmt: '',
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: false,
      formDisabled: true,
      editDisabled: true,
      dialogBtnShow: true
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
      _this.basicSerno = this.data.basicSerno;
      _this.lmtAmt = this.data.lmtAmt ? parseFloat(this.data.lmtAmt / 10000).toFixed() : 0;
      _this.prdTotalAmt = this.data.prdTotalAmt ? parseFloat(this.data.prdTotalAmt / 10000).toFixed() : 0 ;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestbasicinfosub/selectByModel',
        data: { condition: JSON.stringify({ oprType: '01', basicSerno: _this.basicSerno }) },
        callback: function (code, message, response) {
          let obj = response.data[0];
          obj.basicAssetBalanceAmt = parseFloat(obj.basicAssetBalanceAmt / 10000).toFixed();
          yufp.clone(obj, _this.formdata);
          _this.changebasicAssetBalanceAmt();
        }
      });
      if (_this.op == 'EDIT') {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
      }
    },

    changebasicAssetBalanceAmt () {
      if (this.formdata.basicAssetBalanceAmt) {
        let basicAssetBalanceAmt = this.formdata.basicAssetBalanceAmt;
        if(this.prdTotalAmt == 0){
          this.basicAssetLmtAmt = 0;
          this.basicAssetPercent = 0;
        }else if(this.lmtAmt == 0){
          this.basicAssetLmtAmt = 0;
          this.basicAssetPercent = parseFloat(parseFloat(basicAssetBalanceAmt / this.prdTotalAmt).toFixed(2));
        }else{
          this.basicAssetPercent = parseFloat(parseFloat(basicAssetBalanceAmt / this.prdTotalAmt).toFixed(2));
          this.basicAssetLmtAmt = parseFloat(parseFloat(basicAssetBalanceAmt * this.lmtAmt / this.prdTotalAmt).toFixed(2));
        }
      }
    },

    // 授信分项编号查看
    handleLook: function () {
      let _this = this;
      let useBasicLmtSubSerno = this.formdata.useBasicLmtSubSerno;
      let cusId = this.formdata.basicCusId;
      if (useBasicLmtSubSerno == null || useBasicLmtSubSerno == '') {
        _this.$xutils.showMsgBox('提示', '占用底层授信分项编号为空!', 350, 150);
        return;
      }
      var data = { cusId: cusId, apprSubSerno: useBasicLmtSubSerno, op: 'VIEW' };
      this.$dialog.open('', 'bizmanage/lmtBiz/subjectCredit/loanInformation/singleBasicCusApp', -1, -1, data, params => {
      });
    },

    /**
     * 保存
     */
    doSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.basicAssetBalanceAmt = parseFloat(model.basicAssetBalanceAmt * 10000).toFixed();
      var strurl = backend.cmisBiz + '/api/lmtsiginvestbasicinfosub/synchronizelmtamt';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$emit('changed', 'doSave');
          // _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
        }
      });
    },

    // 返回
    cancelFn () {
      this.$emit('changed', false);
    }
  }
};
</script>