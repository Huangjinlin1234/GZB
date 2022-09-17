<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 福费廷合同签订页面
  -->
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata">
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
          <yu-xform-item label="合同币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="合同金额" name="contAmt" ctype="yu-num" disabled></yu-xform-item>
          <yu-xform-item label="汇率" name="contRate" ctype="yu-num" disabled></yu-xform-item>
          <yu-xform-item label="折算人民币金额" name="cvtCnyAmt" ctype="yu-num" disabled></yu-xform-item>
          <yu-xform-item label="本合同项下最高可用信金额" name="highAvlAmt" ctype="yu-num" disabled></yu-xform-item>
          <yu-xform-item label="合同起始日" name="contStartDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日" name="contEndDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="合同期限" name="appTerm" ctype="input" disabled v-model="appTerm" autofocus unit="月"></yu-xform-item>
          <yu-xform-item label="纸质合同签订日期" name="paperContSignDate" ctype="datepicker" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="signFn">签订</yu-button>
      <yu-button @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
// 字典项(合同类型、合同币种)
yufp.lookup.reg('STD_ZB_CONT_TYPE,STD_ZB_CUR_TYP');
export default {
  components: { cfgAssistantTip },
  data: function () {
    return {
      appTerm: '',
      pkdata: {},
      bizType: '01',
      formdata: {},
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
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/showdetial',
      data: { contNo: obj.data.contNo },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });

    var startDate = obj.data.contStartDate;
    var endDate = obj.data.contEndDate;
    var s = startDate.split('-');
    var e = endDate.split('-');
    startDate = parseInt(s[0]) * 12 + parseInt(s[1]);
    endDate = parseInt(e[0]) * 12 + parseInt(e[1]);
    _this.appTerm = Math.abs(startDate - endDate);
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 签订
    signFn: function () {
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
              url: backend.cmisBiz + '/api/ctrloancont/forftin/contsign',
              dataType: 'json',
              data: JSON.stringify(obj),
              callback: function (code, message, response) {
                if (code == 200) {
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
    // 返回
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
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
      if (this.formdata.serno == null || this.formdata.serno == '') {
        this.$xutils.showMsgBox('提示', '业务流水号为空!');
        return;
      }
      let json = {};
      json['iqpSerno'] = this.formdata.serno;
      json['model_group_no'] = 'CMG000007';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      json['biz_serno'] = this.formdata.serno;
      json['biz_op'] = 'view';
      json['period'] = '02';
      json['bizLine'] = '03';
      json['busiType'] = '05';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        json
      );
    },
    
    show() {
      this.isShow = true;
    },
    hideNow() {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
