<template>
  <div id="lmtIntBankAppBaseInfo">
    <div id="lmtIntBankAppBaseInfoContent">
      <yu-panel title="同业客户授信申报-复议" panel-type="simple">
        <yu-xform ref="refOldForm" label-width="120px" :form-type="formType" v-model="formdataOld">
          <yu-xform-group :column="3">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="原授信批复信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="申请编号" ctype="input" placeholder="申请编号" name="serno" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="业务类型" name="lmtType" disabled></yu-xform-item>
              <yu-xform-item label="原授信批复流水号" ctype="input" placeholder="原授信批复流水号" name="origiLmtReplySerno" disabled hidden></yu-xform-item>
              <yu-xform-item label="授信金额(万元)" ctype="yu-num" number-formatter="0,000" placeholder="授信金额(万元)" name="lmtAmt" disabled></yu-xform-item>
              <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
              <yu-xform-item label="期限" ctype="input" placeholder="期限" name="term" hidden></yu-xform-item>
              <yu-xform-item label="同业授信准入" ctype="input" placeholder="同业授信准入" name="intbankLmtAdmit" hidden></yu-xform-item>
              <yu-xform-item label="调查结论" ctype="input" placeholder="调查结论" name="indgtRst" hidden></yu-xform-item>
              <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
        <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata">
          <yu-panel title="本次授信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="业务类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="业务类型" name="lmtType" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="授信金额(万元)" ctype="yu-num" number-formatter="0,000" placeholder="授信金额(万元)" name="lmtAmt" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="登记信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled></yu-xform-item>
              <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
              <yu-xform-item label="申请状态" ctype="select" name="appStatus" hidden data-code="STD_ZB_APP_ST" placeholder="申请状态"></yu-xform-item>
              <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
              <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
              <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
              <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
              <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'LmtIntBankApprBaseInfo',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtintbankappr/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtintbankappr/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
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
      debugger;
      _this.data = this.$route.meta.params;
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.serno = this.data.serno;
      _this.origiLmtReplySerno = this.data.origiLmtReplySerno;
      _this.formDisabled = true;
      _this.saveBtnShow = true;
      if (_this.op == 'DETAIL') {
        _this.saveBtnShow = false;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtintbankappr/selectByModel',
        data: { condition: JSON.stringify({ oprType: '01', serno: _this.origiLmtReplySerno }) },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdataOld);
          _this.formdataOld.lmtAmt = _this.formatterNum(_this.formdataOld.lmtAmt / 10000);
        }
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtintbankappr/selectByModel',
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

    // 取消按钮
    cancelFn () {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    }
  }
};
</script>