<template>
  <div>
    <yu-xform ref="refForm" label-width="120px" :form-type="formType" :disabled="viewType=='VIEW' || onlyView" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="2">
          <yu-xform-item label="基本存款账户是否在本机构" ctype="select" data-code="STD_ZB_YES_NO" placeholder="基本存款账户是否在本机构" name="isBankBasicDepAccNo" rules="required" @change="isBankBasicDepAccNoChange"></yu-xform-item>
          <yu-xform-item label="基本存款账户开户许可证（核准号）" ctype="input" placeholder="基本存款账户开户许可证（核准号）" name="basicDepAccNoOpenLic" rules="required"></yu-xform-item>
          <yu-xform-item label="基本存款账户账号" ctype="input" placeholder="基本存款账户账号" name="basicDepAccNo" rules="required" :colspan="cosSize"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="2" :hidden="showAble">
            <yu-button @click="getAcctinfo" type="primary" size="small" >获取</yu-button>
          </yu-xform-item>
          <yu-xform-item label="基本存款账户开户行" ctype="input" placeholder="基本存款账户开户行" name="basicDepAccob" rules="required"></yu-xform-item>
          <!--<yu-xform-item label="基本存款账户开户行" ctype="input" placeholder="基本存款账户开户行" name="basicDepAccobName" rules="required"></yu-xform-item>-->
          <yu-xform-item label="基本账户开户日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="基本账户开户日期" name="basicAccNoOpenDate" rules="required"></yu-xform-item>
          <!--<yu-xform-item label="一般账户开户日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="一般账户开户日期" name="commonAccNoOpenDate"></yu-xform-item>
          <yu-xform-item label="信用证垫款账号" ctype="input" placeholder="信用证垫款账号" name="creditPadAccNo"></yu-xform-item>
          <yu-xform-item label="建立信贷关系时间" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="建立信贷关系时间" name="initLoanDate"></yu-xform-item>-->
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_B_3_BillCard",
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String,
    viewType: String,
    onlyView: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.AfterInit();
  },
  data: function() {
    return {
      showAble: false,
      cosSize: 10,
      updateUrl: this.$backend.cmisCus + "/api/cuscorp/update",
      addUrl: this.$backend.cmisCus + "/api/cuscorp/",
      formdata: {},
      formType: "edit",
      formRules: {},
    };
  },
  methods: {
    AfterInit() {
      var _this = this;
      if(_this.cusCorp){
        _this.copyExsitFieldValue(_this.cusCorp, _this.formdata);
      }
      // _this.$request({
      //     url: _this.$backend.appOcaService + '/api/adminsmorg/info/' + _this.formdata.basicDepAccob,
      //     method: 'GET',
      // }).then((response) => {
      //     _this.formdata.basicDepAccobName = response.data && response.data.orgName;
      // }).catch((result, b) => {
      //     //this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //     _this.formdata.basicDepAccobName = _this.formdata.basicDepAccob;
      // })

    },
    copyExsitFieldValue(source, target){
      for(let i in source){// 仅赋值表单存在的字段
        if(target.hasOwnProperty(i)){
          target[i] = source[i];
        }
      }
    },
    isBankBasicDepAccNoChange () {
      var isBankBasicDepAccNo = this.formdata.isBankBasicDepAccNo;
      if (isBankBasicDepAccNo == '0') {
        this.showAble = true;
        this.cosSize = 12;
      } else if (isBankBasicDepAccNo == '1') {
        this.showAble = false;
        this.cosSize = 10;
      }
    },
    getAcctinfo () {
      var _this = this;
      var isBankBasicDepAccNo = this.formdata.isBankBasicDepAccNo;
      var basicDepAccNo = this.formdata.basicDepAccNo;
      if (!isBankBasicDepAccNo || !basicDepAccNo) {
        this.$xutils.showMsgBox('提示', '请先填写：基本存款账户账号、基本存款账户是否在本机构！', 350, 150);
        return;
      }
      if (isBankBasicDepAccNo == '0') {
        this.$xutils.showMsgBox('提示', '基本存款账户必须是本机构！', 350, 150);
        return;
      }
      var rqData = {};
      rqData['loanPayoutAccno'] = basicDepAccNo;
      this.$request({
        // 同步请求
        //async: true,
        url: this.$backend.cmisBiz + '/api/ctrloancont/opanorgname',
        method: 'post',
        data: rqData
        }).then((response) => {
          if (response.data == null) {
            _this.$xutils.showMsgBox('提示', '账号不存在，获取名称失败'); // 弹出提示
            return;
          } else {
            _this.formdata.basicAccNoOpenDate = response.data.kaihriqi;
            _this.formdata.basicDepAccob = response.data.zhkhjigo;

            return _this.$request({
              url: _this.$backend.appOcaService + '/api/adminsmorg/info/' + _this.formdata.basicDepAccob,
              method: 'GET',
            });
          }
        }).then((response) => {
          _this.formdata.basicDepAccob = response.data && response.data.orgName;

        }).catch((result, b) => {
          //this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        })
    }
  },
};
</script>
