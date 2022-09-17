<template>
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata">
      <!--主合同信息-->
      <yu-panel title="主合同信息" padding-top :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同编号" name="contNo" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" ctype="select" data-code="STD_CONT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled :colspan="10">
         <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCusDataByCusId" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewIqpDataBySerno" :disabled="op == 'VIEW'">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" colspan="24" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input" disabled @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" placeholder="产品属性类型" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP"></yu-xform-item>
          <yu-xform-item label="担保方式" name="guarWay" ctype="select" data-code="STD_ZB_GUAR_WAY" disabled></yu-xform-item>
          <yu-xform-item label="合同币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="合同金额" name="contAmt" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="汇率" name="contRate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="折算人民币金额" name="cvtCnyAmt" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="本项合同下最高可用信金额" name="highAvlAmt" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="合同起始日" name="contStartDate" ctype="datepicker" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日" name="contEndDate" ctype="datepicker" disabled></yu-xform-item>
          <yu-xform-item label="合同期限" name="appTerm" ctype="input" disabled v-model="appTerm" autofocus unit="月"></yu-xform-item>
          <yu-xform-item label="纸质合同签订日期" name="paperContSignDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
      <!--担保合同信息-->
      <yu-panel title="担保合同信息" padding-top :collapseHide="false" v-if="showList">
        <yu-xtable ref="refDealTable" row-number :base-params="tableParams" :data-url="tableUrl" request-type="POST" condition-key="condition">
            <yu-xtable-column label="担保合同编号" prop="guarContNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同类型" prop="guarContType" width:="120" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同金额" prop="guarAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保起始日" prop="guarStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保到期日" prop="guarEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保合同状态" prop="guarContState" width:="120" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
            <yu-xtable-column label="纸质合同签订日期" prop="signDate" ctype="datepicker" width:="120"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="sign">签订</yu-button>
      <yu-button @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
// 字典项(合同类型、担保合同类型、担保方式、担保合同状态)
yufp.lookup.reg('STD_ZB_CONT_TYPE,STD_ZB_ASSURE_MEANS,STD_ZB_CUR_TYP,STD_ZB_GUAR_CONT_TYPE,STD_GUAR_WAY,STD_GUAR_CONT_STATE,STD_PRD_TYPE_PROP');
export default {
  components: { cfgAssistantTip },
  data: function () {
    return {
      appTerm: '',
      showList: true,
      tableParams: {contNo: this.$route.meta.params.data.contNo},
      tableUrl: this.$backend.cmisBiz + '/api/grtguarbizrstrel/querygrtguarcontbyparams',
      formdata: {},
      bizType: '01',
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
      prdCode: '',
      isShow: false
    };
  },
  activated () {
    let obj = this.$route.params.obj;
    yufp.clone(obj, this.formdata);
  },
  mounted: function () {
    var _this = this;
    let obj = _this.$route.meta.params;
    // 担保方式为信用类担保则不展示担保信息列表
    if (obj.data.guarWay == '00' || obj.data.guarWay == '40') {
      this.showList = false;
    }
    var startDate = obj.data.contStartDate;
    var endDate = obj.data.contEndDate;
    var s = startDate.split('-');
    var e = endDate.split('-');
    startDate = parseInt(s[0]) * 12 + parseInt(s[1]);
    endDate = parseInt(e[0]) * 12 + parseInt(e[1]);
    _this.appTerm = Math.abs(startDate - endDate) + 1;
    // this.queryDataByCondition({ serno: obj.data.serno })
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/showdetial',
      data: {contNo: obj.data.contNo},
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 签订
    sign: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let obj = _this.formdata;
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      var paperDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(obj.paperContSignDate));
      if (paperDate != '' && paperDate > openday) {
        this.$xutils.showMsgBox('提示', '纸质合同日期必须小于等于当前日期!');
        return;
      }
      _this.$confirm('是否签订?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/ctrloancont/tcont/contsign',
              dataType: 'json',
              data: JSON.stringify(obj),
              callback: function (code, message, response) {
                if (response.code == 200) {
                  _this.$message({ message: '签订成功', type: 'success' });
                  _this.cancelFn();
                } else {
                  _this.$message({ message: '签订失败', type: 'error' });
                  return;
                }
              }
            });
          }
        }
      });
    },

    // 对公客户查看
    viewCusDataByCusId: function () {
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

    // 对查看
    viewIqpDataBySerno () {
      if (this.formdata.iqpSerno == null || this.formdata.iqpSerno == '') {
        this.$xutils.showMsgBox('提示', '业务流水号为空!');
        return;
      }
      let json = {};
      json['iqpSerno'] = this.formdata.iqpSerno;
      json['model_group_no'] = 'CMG000407';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      json['biz_serno'] = this.formdata.iqpSerno;
      json['biz_op'] = 'view';
      json['period'] = '02';
      json['bizLine'] = '03';
      json['busiType'] = '04';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        json
      );
    },

    // 返回
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    show () {
      this.isShow = true;
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
