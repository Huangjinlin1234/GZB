<template>
  <!--
    @created by qiantj
    @description 人民币利率定价权限信息新增向导页面
  -->
  <div>
    <div>
      <yu-xform ref="refForm" label-width="138px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" >
          <yu-xform-group :column="2">
            <yu-xform-item label="申报事项"  ctype="select" placeholder="申报事项" name="rateAppType" rules=""  data-code="STD_RATE_APP_TYPE" colspan="24"></yu-xform-item>
           </yu-xform-group>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary"  @click="onNext">下一步</yu-button>
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('STD_RATE_APP_TYPE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function() {
    return {
      formdata: {}
    };
  },
  mounted () {
    
  },
  methods: {
    // 下一步
    onNext: function() {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      _this.$dialog.close(_this.dialogId, "success");
      var obj = _this.formdata;
      obj['op'] = 'ADD';
      obj['serno'] = _this.pageParams.serno;
      obj['oprType'] = '01';
      obj.cusId = _this.pageParams.cusId;
      obj.cusName = _this.pageParams.cusName;
      /*
      * 跳转到修改页面
      */
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppSub/otherCnyRateAppSubInfo_' + _this.formdata.rateAppType;
      //_this.$dialog.open('人民币利率定价权限信息修改', url, -1, -1, obj, () => {this.close()});
      let date = _this.$xutils.dateFormat('yyyyMMddhhmmssSSS', new Date());
      this.$router.addTab({
              // 路由名称
              name: url, // 菜单路径
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: 'custom_otherCnyRateAppSubInfo_' + date, // 必传
              // 页签名称
              title: '人民币利率定价权限信息修改',
              // 传递的业务数据，可选配置
              data: obj,
              afterTabClose: () => {
                //this.$refs.otherCnyRateAppTable.remoteData();
              }
            });
    },
    // 返回
    onBack: function() {
      this.close();
    },
    close: function() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>