import {logger} from 'util';
<template>
  <!--add by shenli-->
  <div>
    <yu-panel title="基本信息" panel-type="normal">
      <yu-xform ref="refCtrLoanContForm" label-width="150px" v-model="contFormData" :form-type="formType">

        <yu-xform-group column="2">
              <yu-xform-item label="合同类型" ctype="select" name="contType" disabled="true" data-code="STD_CONT_TYPE"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" name="contNo" disabled="true" colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="cusId" colspan="1">
            <yu-button type="primary" @click="iqpView" v-if="show">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled="true"  :hidden="false"></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" name="iqpSerno" disabled="true"  :hidden="false"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled="true" colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="cusId" colspan="1">
            <yu-button type="primary" @click="cusView" >查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled="true" :hidden="false"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" name="prdName" disabled="true"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" data-code="STD_ZB_GUAR_WAY" disabled="true" :hidden="false"></yu-xform-item>
          <yu-xform-item label="合同币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" disabled="true" :hidden="false"></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="input" name="contAmt" disabled="true" :hidden="false"></yu-xform-item>
          <yu-xform-item label="合同余额" ctype="input" name="contBalance" disabled="true" :hidden="false"></yu-xform-item>
          <yu-xform-item label="合同起始日" ctype="input" name="contStartDate" disabled="true" :hidden="false"></yu-xform-item>
          <yu-xform-item label="合同到期日" ctype="input" name="contEndDate" disabled="true" :hidden="false"></yu-xform-item>
          <yu-xform-item label="合同期限" ctype="input" name="appTerm" disabled="true" :hidden="false"></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModal" disabled="true" data-code="STD_LOAN_MODAL"></yu-xform-item>
          <yu-xform-item label="签约方式" ctype="select" name="signMode" disabled="true" data-code="STD_SIGN_MODE"></yu-xform-item>

          <yu-xform-item label="纸质合同签订日期" rules="required" ctype="datepicker" name="paperContSignDate"  :picker-options="pickerOptions0" :disabled="disabledFlg"></yu-xform-item>

        </yu-xform-group>
      </yu-xform>
    </yu-panel>

    <yu-panel title="担保合同信息" panel-type="normal">
      <yu-xtable ref="refGrtGuarContTable" row-number :data="guarContTableData">

        <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="担保合同金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
        <yu-xtable-column label="担保到期日" prop="guarEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
        <yu-xtable-column label="双录编号" ctype="input" prop="guarIserchNo"></yu-xtable-column>
        <yu-xtable-column label="纸质合同签订日期" rules="required" prop="signDate" ctype="datepicker"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons align="center">
      <el-button type="primary" @click="sign" v-if="show">签订</el-button>
      <el-button type="primary" @click="cancel">返回</el-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_GUAR_CONT_STATE,STD_CONT_TYPE,STD_LOAN_MODAL');

export default {

  props: {
    bizPageData: Object
  },
  data () {
    return {

      contFormData: {},
      buff: false,
      guarContTableData: {},
      cusFormdata: {},
      replyFormdata: {},
      formType: 'edit',
      show: false,
      pickerOptions0: {
        disabledDate: function (time) {
          return time.getTime() >= Date.now();
        }
      },
      disabledFlg: true
    };
  },


  mounted () {
    var _this = this;
    var contno = '';
    if (_this.bizPageData != null) {
      // 这个时候判断是从模板工厂进来的  直接查数据就行了

      contno = _this.bizPageData.instanceInfo.bizId;
    } else {
      contno = _this.$route.meta.params.contNo;
      _this.show = _this.$route.meta.params.show;
    }
    if (_this.show) {
      _this.disabledFlg = false;
    }
    yufp.service.request({method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/xw/queryContInfo',
      data: {contNo: contno},
      callback (code, message, response) {
        yufp.clone(response.data.CtrLoanCont, _this.contFormData);
        _this.guarContTableData = response.data.GrtGuarContList;
      }
    });
  },
  methods: {

    sign () { // 签订
      var _this = this;
      var validate = false;
      _this.$refs.refCtrLoanContForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }

      var ctrLoanContInfo = {};
      yufp.clone(_this.$refs.refCtrLoanContForm.formdata, ctrLoanContInfo);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/xw/signCont',
        data: {'CtrLoanCont': ctrLoanContInfo, 'GrtGuarContList': _this.guarContTableData},
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message({ message: '签定成功', type: 'success' });
            _this.cancel();
          } else {
            _this.$message({ message: message, type: 'error' });
          }
        }
      });
    },

    cancel () { // 关闭
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },

    cusView () { // 客户查看
      var _this = this;
      // this.$dialog.open(
      //   '个人客户查看页面',
      //   'cusmanage/indivCus/indivCusQuery/indivCusQueryDetailsIndex',
      //   1200,
      //   800,
      //   {cusId: _this.contFormData.cusId},
      //   () => {}
      // );

      // var _this = this;
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = _this.contFormData.cusId;
      // 个人正式客户创建 B01
      key = 'tempCusIndivlsView' + new Date().getTime();
      title = '个人客户查看';
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    },

    iqpView () { // 合同申请查看
      var _this = this;
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: new Date().getTime(),
        title: '合同申请查看',
        data: {
          model_group_no: 'CMG000350',
          op: 'VIEW',
          iqpSerno: _this.contFormData.iqpSerno
        }
      });
    }
  }

};
</script>
