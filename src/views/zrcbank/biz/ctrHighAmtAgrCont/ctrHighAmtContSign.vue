<template>
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata">
      <!--主合同信息-->
      <yu-panel title="主合同信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同编号" name="contNo" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" ctype="input" data-code="STD_CONT_TYPE" disabled></yu-xform-item>
          <!--<yu-xform-item label="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>-->

          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCusDataByCusId" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
          <!--<yu-xform-item label="业务流水号" name="serno" ctype="input" disabled></yu-xform-item>-->

          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewIqpDataBySerno" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>

          <yu-xform-item label="客户名称" name="cusName" ctype="input" colspan="24" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY" disabled></yu-xform-item>
          <yu-xform-item label="协议币种" name="agrType" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="协议金额" name="agrAmt" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="协议起始日" name="startDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="协议到期日" name="endDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="合同期限" name="agrTerm" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="纸质合同签订日期" name="paperContSignDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="双录编号" name="doubleRecordNo" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
      <!--担保合同信息-->
      <yu-panel title="担保合同信息" padding-top :collapseHide="false" v-show="isGrtContInfoHidden" >
        <yu-xtable ref="refDealTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST" :base-params="baseParams">
            <yu-xtable-column label="担保合同编号" prop="guarContNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同类型" prop="guarContType" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同金额" prop="guarAmt" width:="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="担保起始日" prop="guarStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保到期日" prop="guarEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同状态" prop="guarContState" width:="120"></yu-xtable-column>
            <yu-xtable-column label="纸质合同签订日期" prop="signDate" width:="120" ctype="datepicker"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="sign">签订</yu-button>
      <yu-button @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
// 字典项(担保方式、协议币种、合同类型、协议币种、审批状态)
yufp.lookup.reg('STD_ZB_ASSURE_MEANS,STD_ZB_CONT_TYP,STD_ZB_CONT_TYPE,STD_ZB_CUR_TYP');
export default {
  data: function () {
    return {
      pkdata: {},
      baseParams: {contNo: this.$route.meta.params.data.contNo},
      dataUrl: backend.cmisBiz + '/api/grtguarbizrstrel/querygrtguarcontbyparams',
      formdata: {},
      isGrtContInfoHidden: true,
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
      ]
    };
  },
  activated () {
    let obj = this.$route.params.obj;
    yufp.clone(obj, this.formdata);
  },
  mounted: function () {
    var _this = this;
    let obj = _this.$route.meta.params;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrhighamtagrcont/showdetial',
      data: {contNo: obj.data.contNo},
      callback: function (code, message, response) {
        if ((response.data.guarMode && response.data.guarMode == '00') || (response.data.guarWay && response.data.guarWay == '00')) {
          _this.isGrtContInfoHidden = false;
        }
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },

    // 签订
    sign: function () {
      var _this = this;
      // var model = {};
      // yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let obj = _this.formdata;

      _this.$confirm('是否签订?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/ctrhighamtagrcont/contsign',
              dataType: 'json',
              data: JSON.stringify(obj),
              callback: function (code, message, response) {
                if (code == '0') {
                  if (response.data.rtnCode == '000000') {
                    _this.$xutils.showMsgBox('提示', '签订成功', 350, 150);
                    yufp.router.removeTab(this.$route.path);
                  } else {
                    _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
                    return;
                  }
                } else {
                  _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
                  return;
                }
              }
            });
          }
        }
      });
    },

    // 对公客户查看
    viewCusDataByCusId () {
      if (this.formdata.cusId == null || this.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },

    // 对业务流水号的查看
    viewIqpDataBySerno () {
      if (this.formdata.serno == null || this.formdata.serno == '') {
        this.$xutils.showMsgBox('提示', '业务流水号为空!');
        return;
      }
      let json = {};
      json['serno'] = this.formdata.serno;
      json['model_group_no'] = 'CMG000334';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      json['biz_serno'] = this.formdata.serno;
      json['biz_op'] = 'view';
      json['period'] = '02';
      json['bizLine'] = '03';
      json['busiType'] = '01';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        json
      );
    }
  }
};
</script>
