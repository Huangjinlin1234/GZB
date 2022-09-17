<template>
  <div id="d1_B_B_A_BillCard">
    <div id="d1_B_B_A_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="operate" :hidden-rule="false" v-model="formdata" :rules="formRules">
        <yu-panel title="合作信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="总合作额度(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="totlCoopLmtAmt" rules="required" placeholder="总合作额度(元)" @blur="calculateCoopLmtAmt" :disabled="estateFlag"></yu-xform-item>
          <yu-xform-item label="一般担保额度(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="commonGrtLmtAmt" :rules="commonGrtLmtAmtRules" placeholder="一般担保额度(元)" ></yu-xform-item>
          <yu-xform-item label="合作期限(月)" ctype="num" name="coopTerm" rules="required" maxlength="5" placeholder="合作期限(月)" @change="coopTermChange"  :precision="0" :min="1" ></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
            <yu-xform-item label="单户合作限额(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="singleCoopQuota" rules="required" placeholder="单户合作限额(元)" ></yu-xform-item>
            <yu-xform-item label="单笔业务合作限额(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="sigBusiCoopQuota" rules="required" placeholder="单笔业务合作限额(元)" ></yu-xform-item>
            <yu-xform-item label="已用合作额度(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="totlCoopLmtAmtUsable" disabled placeholder="已用合作额度(元)" ></yu-xform-item>
            <yu-xform-item label="可用合作额度(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="14" name="totlCoopLmtAmtUsed" disabled placeholder="可用合作额度(元)" ></yu-xform-item>
            <yu-xform-item label="合作起始日" ctype="input" name="coopStartDate" rules="required"  placeholder="合作起始日" disabled></yu-xform-item>
            <yu-xform-item label="合作到期日" ctype="input" name="coopEndDate" rules="required" placeholder="合作到期日" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="是否白名单控制" ctype="select" name="isWhiteListCtrl" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否白名单控制" v-if="isWhiteListCtrlShow"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="代偿宽限期(天)" ctype="num" name="subpayGraper" rules="required" maxlength="5" placeholder="代偿宽限期(天)"  :precision="0" :min="1" ></yu-xform-item>
          <yu-xform-item label="代偿比例(%)" ctype="yu-num" placeholder="代偿比例(%)" name="subpayPerc" maxlength="5"  rules="required" :multiple="100"></yu-xform-item>
          <yu-xform-item label="对外担保放大倍数" ctype="num"  placeholder="对外担保放大倍数" name="outguarMultiple" maxlength="5"  rules="required" ></yu-xform-item>
          <yu-xform-item label="其他相关说明" ctype="textarea" name="otherCorreDesc" rules="required" :autosize="{ minRows: 3}" maxlength="500" :colspan="24" placeholder="其他相关说明" ></yu-xform-item>
        </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BBABillCard',
  props: {
    operate: String,
    pageParam: Object
  },
  mixins: [mixinForm],
  data: function () {
    const _this = this;
    let amtVlidate = function (rules, value, callback) {
      let m = _this.formdata.totlCoopLmtAmt == '' || !_this.formdata.totlCoopLmtAmt ? 0 : _this.formdata.totlCoopLmtAmt;
      if (Number.parseFloat(m) < Number.parseFloat(value)) {
        callback(new Error('一般担保额度不能大于总合作额度'));
      } else {
        callback();
      }
    };
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      estateFlag: false,
      commonGrtLmtAmtRules: [{required: true, message: '字段不能为空'}, {validator: amtVlidate}],
      isWhiteListCtrlShow: true
    };
  },
  computed: {
    totlCoopLmtAmt: function () {
      return this.formdata.totlCoopLmtAmt;
    },
    oprType: function () {
      return this.pageParam.oprType;
    },
    totlCoopLmtAmtUsed: function () {
      return this.formdata.totlCoopLmtAmtUsed;
    }
  },
  watch: {
    oprType: function (newValue, oldValue) {
      if (newValue == 1) {
        this.formdata.totlCoopLmtAmtUsable = 0;
      }
    }
  },
  mounted () {
    const _this = this;
    let parnterType = _this.$route.meta.params.partnerType;
    if(parnterType === '1'){
      this.estateFlag = true;
    } else if (parnterType === '3') {
      this.isWhiteListCtrlShow = false;
    }
    _this.$nextTick(function () {
      _this.calculateCoopLmtAmt(_this.formdata.totlCoopLmtAmt);
    });
    const coopPlanNo = this.pageParam.planAppData && this.pageParam.planAppData.coopPlanNo;
    if(coopPlanNo){
      this.$xutils.request({
        type: 'POST',
        url: _this.$backend.cmisLmt + '/api/lmt4inner/cmislmt0039',
        data: JSON.stringify({apprSerno: coopPlanNo}),
        success: (response, status, xhr) => {
          if (response.code == 0 && response.data) {
            _this.formdata.totlCoopLmtAmtUsable = response.data.outstndAmt;
          } else {
            _this.formdata.totlCoopLmtAmtUsable = '0.00';
          }
        },
        error: (result, status, errorThrown) => {
          _this.$xutils.showMsgBox('提示', result.erortx, 400, 300);
        }
      });
    }
  },
  methods: {
    calculateCoopLmtAmt: function () {
      this.$route.params.totlCoopLmtAmt = this.formdata.totlCoopLmtAmt;
      if (this.formdata.oprType == 1) {
        if (typeof this.formdata.totlCoopLmtAmtUsable == 'undefined' || this.formdata.totlCoopLmtAmtUsable == null) {
          this.$route.params.totlCoopLmtAmtUsable = 0;
        } else {
          this.$route.params.totlCoopLmtAmtUsable = this.formdata.totlCoopLmtAmtUsable;
        }
      }
      if (this.formdata.oprType == 1 && this.formdata.totlCoopLmtAmt) {               
        this.formdata.totlCoopLmtAmtUsed = this.formdata.totlCoopLmtAmt - this.formdata.totlCoopLmtAmtUsable;
      } else if (this.formdata.oprType == 2 && this.formdata.totlCoopLmtAmt) {
        this.checkTotlCoopLmtAmtUsed();
      }
    },
    checkTotlCoopLmtAmtUsed: function () {
      const _this = this;
      const userInfo = this.$xutils.getLoginUserInfo();
      if (_this.pageParam.oprType == 2) {
        _this.$xutils.request({
          async: false,
          type: 'POST',
          url: _this.$backend.cmisBiz + '/api/coopplanapp/totlCoopLmtAmt',
          data: JSON.stringify({accNo: _this.pageParam.partnerNo, instuCde: userInfo.instu.code}),
          success: (response, status, xhr) => {
            if (response.code == 0) {
              // 接口掉不通,模拟假数据
              _this.formdata.totlCoopLmtAmtUsable = response.data.outstandAmt || 0;
              _this.formdata.totlCoopLmtAmtUsed = _this.formdata.totlCoopLmtAmt - _this.formdata.totlCoopLmtAmtUsable;
            } else {
              _this.$xutils.showMsgBox('提示', '可用额度接口调用异常', 400, 300);
            }
          },
          error: (result, status, errorThrown) => {
            _this.$xutils.showMsgBox('提示', '可用额度接口调用异常', 400, 300);
          }
        });
      }
    },

    coopTermChange(val){
      var coopStartDate = this.formdata.coopStartDate;//合作起始日；
      var strDate = new Date(coopStartDate) ;
      strDate.setMonth(strDate.getMonth() + parseInt(val));
      strDate.setDate(strDate.getDate() - 1);
      this.formdata.coopEndDate = this.$xutils.dateFormat('yyyy-MM-dd', strDate);
    }
  }
};
</script>
