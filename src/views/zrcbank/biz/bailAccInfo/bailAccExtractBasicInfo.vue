<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" :disabled="formIsDisabled">
        <yu-panel title="保证金账户" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="流水号" ctype="input" name="serno" disabled placeholder="----" hide-column></yu-xform-item>
            <yu-xform-item label-width="180px" label="客户编号" ctype="input" name="cusId" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="客户名称" ctype="input" name="cusName" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="资产池协议编号" ctype="input" name="contNo" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="保证金账户编号" ctype="input" name="bailAccNo" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="账户状态" ctype="input" name="acctStatus" disabled placeholder="----" data-code="STD_ACCT_STATUS"></yu-xform-item>
            <yu-xform-item label-width="180px" label="保证金比例" ctype="input" name="bailRate" disabled placeholder="----" ></yu-xform-item>
            <yu-xform-item label-width="180px" label="保证金开户行名称" ctype="input" name="acctsvcrName" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="保证金币种" ctype="input" name="bailCurType" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="保证金金额" ctype="input" name="bailAmt" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="保证金计息方式" ctype="input" name="bailInterestMode" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="结算账号" ctype="input" name="settlAccno" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="结算户名" ctype="input" name="settlAccname" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="支付方式" ctype="input" name="zhfutojn" disabled placeholder="----"></yu-xform-item>
            <yu-xform-item label-width="180px" label="账户类型" ctype="input" name="accountAmount" disabled placeholder="----"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="金额计算结果" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="保证金账户余额（核心获取）" label-width="210px" ctype="yu-num" number-formatter="0,000.00"  name="assetPoolBailAmt" disabled placeholder="----" colspan="10">
              <yu-input v-model="bailAccNoBal"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="" colspan="2">
              <yu-button type="primary" @click="sendCoreQueryBail">发核心查询</yu-button>
            </yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="可提取保证金金额" label-width="210px" ctype="yu-num" number-formatter="0,000.00"  name="bailAvalAmt" disabled placeholder="----" colspan="10">
              <yu-input v-model="bailAccNoBal"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button type="primary" @click="computeAvalBail">实时计算</yu-button>
            </yu-xform-item>
          </yu-xform-group>
          <yu-row>
            <yu-col :span="15">
              <div id="title-body">
                <div id="heartMsg"><span id="title-Msg">可提取保证金金额计算公式：MIN（（已质押入池资产 * 质押率 + 保证金账户余额 - 资产池下融资余额），（保证金账户余额 * 保证金可提取比例））</span></div>
              </div>
            </yu-col>
            <yu-col :span="9"></yu-col>
          </yu-row>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    <yu-form-buttons align="center">
      <yu-button @click="back">返回</yu-button>
    </yu-form-buttons>
    <router-view :key="$route.params.Id"></router-view>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_IR_ADJUST_TYPE,STD_LPR_RATE_INTVALdisabled');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      formIsDisabled: false,
      formdata: {},
      formType: 'edit'
    };
  },

  mounted () {
    var _this = this;
    let jsoPar = {};
    var serno = '';
    // 判断是否流程进入
    if (_this.bizPageData) {
      jsoPar = _this.bizPageData.instanceInfo;
      serno = jsoPar.bizId;
      _this.formIsDisabled = true;
    } else {
      jsoPar = _this.$route.meta.params.data;
      serno = jsoPar.serno;
    }
    // 查看
    if (_this.$route.meta.params) {
      if (_this.$route.meta.params.op == 'VIEW') {
        _this.formIsDisabled = true;
      }
    }
    // 初始化资产池基本信息
    _this.initForm(serno);
  },

  methods: {
    // 初始化表单
    initForm: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/selectInfoBySerno',
        data: {condition: JSON.stringify({serno: serno})},
        callback: function (code, message, response) {
          debugger
          var isInit = response.code;
          if (isInit == 0) {
            yufp.clone(response.data, _this.formdata);
          } else { 
            return;
          }
        }
      });
    },

    // 返回
    back: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    // 核心计算
    sendCoreQueryBail: function(){
      let _this = this;
      let serno = _this.formdata.serno;
      _this.formdata.assetPoolBailAmt = '10000'; 
    //  yufp.service.request({
    //    method: 'POST',
    //    url: backend.cmisBiz + '/api/bailaccinfo/sendCoreQueryBail',
    //    data: {serno: serno},
    //    callback: function (code, message, response) {
    //      debugger
    //      let isInit = response.code;
    //      if (isInit == 0) {
    //        _this.formdata.assetPoolBailAmt = response.data.assetPoolBailAmt;
    //        _this.$message({
    //          message: response.message,
    //          type: 'success'
    //        })
    //      } else { 
    //        _this.$message({
    //          message: '获取数据异常:' + response.message.substring(0, 100),
    //          type: 'error'
    //        });
    //      }
    //    }
    //  });
    },
    // 实时计算
    computeAvalBail: function(){
      let _this = this;
      let serno = _this.formdata.serno;
      let assetPoolBailAmt = _this.formdata.assetPoolBailAmt;
      let bailRate = _this.formdata.bailRate;
      let data = {};
      data.serno = serno;
      data.bailRate = bailRate;
      _this.formdata.bailAvalAmt = '1111';
      // 判断是否已经去核心查询
     // if(assetPoolBailAmt){
     //   data.assetPoolBailAmt = assetPoolBailAmt;
    //  }
    //  yufp.service.request({
    //    method: 'POST',
    //    url: backend.cmisBiz + '/api/bailaccinfo/computeAvalBail',
    //    data: data,
    //    callback: function (code, message, response) {
    //      debugger
    //      let isInit = response.code;
    //      if (isInit == 0) {
    //        _this.formdata.bailAvalAmt = response.data.bailAvalAmt;
     //       _this.$message({
     //         message: response.message,
     //         type: 'success'
    //        })
     //     } else { 
     //       _this.$message({
     //         message: '获取数据异常:' + response.message.substring(0, 100),
     //         type: 'error'
     //       });
     //     }
     //   }
    //  });
    }  
  }
};
</script>
<style>
#heartMsg{
  color:#FF4949;
  text-align:center;
  display:block;
}
#title-Msg{
  padding-left: 20px;
  display:inline-block;
}
#title-body{
}
</style>
