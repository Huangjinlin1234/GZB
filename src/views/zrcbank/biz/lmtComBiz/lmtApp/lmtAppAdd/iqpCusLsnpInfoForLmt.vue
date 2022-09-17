<template>
    <div>
    <yu-panel title="零售内评信息" panel-type="normal">
    <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdataLsnp">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" name="iqpSerno" disabled hidden="true"></yu-xform-item>
          <yu-xform-item label="数字解读值" ctype="input" name="digIntVal" disabled></yu-xform-item>
          <yu-xform-item label="综合风险等级" ctype="select" name="inteRiskLvl" disabled></yu-xform-item>
          <yu-xform-item label="数字解读值风险等级" ctype="select" name="digIntValRiskLvl" disabled></yu-xform-item>
          <yu-xform-item label="额度建议" ctype="input" name="lmtAdvice" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputId" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerId" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerIdName" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrId" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="cusLsnpInfo">发起零售内评</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
/**
 * title 客户限额及债项评级测算
 * author zhangming12
 * date 2021-04-13
 * */
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      cusId: '',
      showCusLsnp: false,
      formdataLsnp: {},
      iqpSerno: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.cusId = this.$route.meta.params.cusId;
      this.iqpSerno = this.$route.meta.params.serno;
      let serno = this.$route.meta.params.grpSerno || this.$route.meta.params.serno;
      if (!serno) {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      var _this = this;
      let cusCatalog = '';
      // 判断客户属于个人还是公司（1.对私;2.对公）
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: _this.cusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            cusCatalog = response.data.cusCatalog;
          }
        }
      });
      if (cusCatalog == '1') {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/iqpcuslsnpinfo/selectbylmtserno',
          data: serno,
          callback: function (code, message, response) {
            if (response.code == 0) {
              if (response.data) {
                yufp.clone(response.data, _this.formdataLsnp);
                _this.formdataLsnp.iqpSerno = response.data.iqpSerno;
              } else {
                _this.formdataLsnp.iqpSerno = serno;
              }
            }
          }
        });
        _this.showCusLsnp = true;
      } else if (cusCatalog == '2') {
        _this.showCusLsnp = false;
      } else {
        _this.$xutils.showMsgBox('提示', '当前客户大类未识别,请确认客户信息是否完整!');
      }
    },

    cusLsnpInfo () {
      debugger;
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpcuslsnpinfo/updatelevelforlmt',
        data: _this.iqpSerno,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data.rtnCode == '0000') {
              yufp.clone(response.data.lsnpResult, _this.formdataLsnp);
              _this.formdataLsnp.iqpSerno = response.data.lsnpResult.iqpSerno;
              _this.doMustCheck();
              _this.refForm.$refs.refTable.remoteData();
              _this.$message('零售内评发起成功!');
            } else {
              _this.$xutils.showMsgBox(response.data.rtnMsg);
            }
          }
        }
      });
    },
    doMustCheck: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.iqpSerno;
      obj.pageId = 'lsnp';
      obj.pageName = '零售内评';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    }

    // onSaveCusLsnp () {
    //   yufp.service.request({
    //     async: false,
    //     method: 'POST',
    //     url: backend.cmisBiz + '/api/iqpcuslsnpinfo/selectbylmtserno',
    //     data: serno,
    //     callback: function (code, message, response) {
    //       if (response.code == 0) {
    //         if (response.data) {
    //           _this.formdataLsnp = response.data;
    //         } else {
    //           _this.formdataLsnp.iqpSerno = serno;
    //         }
    //       }
    //     }
    //   });
    // }
    // <yu-button type="primary" @click="onSaveCusLsnp">提交</yu-button>
  }
};
</script>
