<template>
    <div>
        <yu-xform ref="refForm" label-width="200px" v-model="data" :disabled="formType != 'edit' ? true : false">
            <yu-panel title="基本情况" panel-type="simple">
                <yu-xform-group>
                    <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>
                    <yu-xform-item name="cusId" label="客户编号" disabled></yu-xform-item>
                    <yu-xform-item name="cusName" label="客户名称" disabled></yu-xform-item>
                    <yu-xform-item name="operAddrAct" label="经营地址" colspan="24" rules="required"></yu-xform-item>
                    <yu-xform-item name="ownshipStr" label="股权结构" colspan="24" rules="required" ctype="textarea"></yu-xform-item>
                    <yu-xform-item name="mainOptScp" label="主营业务" colspan="24" rules="required" ctype="textarea"></yu-xform-item>
                    <yu-xform-item name="buildDate" label="成立日期" ctype="datepicker" disabled></yu-xform-item>
                    <yu-xform-item name="fjobNum" label="员工人数" ctype="yu-num" :precision="0" :min="0" rules="required"></yu-xform-item>
                    <yu-xform-item name="regiCapAmt" label="注册资本（万元）" ctype="yu-num" number-formatter="0,000.00" rules="required"></yu-xform-item>
                    <yu-xform-item name="paidCapAmt" label="实收资本（万元）" ctype="yu-num" number-formatter="0,000.00" rules="required"></yu-xform-item>
                    <!--
                    <yu-xform-item name="tradeClass" label="行业分类" colspan="24" rules="required"></yu-xform-item>
                    -->
                    <yu-xform-item name="tradeClass" label="行业分类" ctype="yu-xdic-tree" rules="required" colspan="24"
                                  :parms="{ optType: 'STD_ZB_TRADE_CLASS' }">
                    </yu-xform-item>

                    <yu-xform-item name="legalRepresent" label="法人代表" rules="required"></yu-xform-item>
                    <yu-xform-item name="realOperCusName" label="实际控制人" label-width="230px"  rules="required"></yu-xform-item>
                    <yu-xform-item name="corpQlty" label="企业性质" rules="required" ctype="select" data-code="STD_ZB_CORP_OWNERS"></yu-xform-item>
                    <yu-xform-item name="isDataChg" label="内外部数据系统校验是否有变化" label-width="230px" ctype="radio" data-code="STD_ZB_YES_NO" colspan="10">
                    </yu-xform-item>
                     <yu-xform-item name="button" ctype="custom" label="" colspan="2">
                      <yu-button type="primary" @click="checkFn">校验</yu-button>
                     </yu-xform-item>
                    <yu-xform-item name="dataChgExpl" label="具体说明" colspan="24" ctype="textarea" :rules="{required: isDataChg, message: '必输项不允许为空'}"></yu-xform-item>
                    <!--<yu-xform-item name="freqModifyInfo" label="频率修改信息" colspan="24" ctype="textarea" rules="required" ></yu-xform-item>-->
                    <yu-xform-item name="isRealpro" label="房地产开发贷检查" :hidden="true"></yu-xform-item>
                    <yu-xform-item name="isProperty" label="经营性物业贷检查" :hidden="true"></yu-xform-item>
                    <yu-xform-item name="isFixed" label="固定资产贷款、项目贷款检查" :hidden="true"></yu-xform-item>
                </yu-xform-group>
            </yu-panel>
            <yu-panel title="企业标签" panel-type="simple">
                <yu-xform-group>
                    <yu-xform-item name="riskClass" label="风险分类" disabled data-code="STD_FIVE_CLASS" ctype="select"  v-if="isCom == '1'"></yu-xform-item>
                    <yu-xform-item name="riskClass" label="风险分类" disabled data-code="STD_TEN_CLASS" ctype="select" v-if="!(isCom == '1')"></yu-xform-item>
                    <yu-xform-item name="riskLevel" label="风险预警等级" disabled data-code="STD_CUST_RISK_STATUS" ctype="select"></yu-xform-item>
                    <yu-xform-item name="creditRank" label="客户信用评级" disabled data-code="STD_ZB_GRADE_RANK" ctype="select"></yu-xform-item>
                </yu-xform-group>
            </yu-panel>
        </yu-xform>
    </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_FIVE_CLASS,STD_TEN_CLASS,STD_ZB_CORP_OWNERS,STD_CUST_RISK_STATUS,STD_ZB_GRADE_RANK');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],
  props: {
    formData: Object,
    formType: String
  },

  data: function () {
    return {
      isCom: this.formData.isCom,
      data: {},
      updateUrl: backend.cmisPsp + '/api/pspcusbasecase/updateSelective'
    };
  },
  computed: {
    isDataChg: function () {
      return this.data.isDataChg == '1';
    }
  },

  watch: {
    formData: function () {
      for (var item in this.formData) {
        this.data[item] = this.formData[item];
      }
    }
  },
  mounted () {
    var _this = this;
    if (!_this.data.pkId) {
      _this.data.pkId = _this.$xutils.getUUID();
      _this.data.taskNo = _this.$route.params.pspTask.taskNo;
    }
  },

  methods: {

    checkFn: function () {
      this.$request({
        url: backend.cmisPsp + '/api/pspcusbasecase/checkInfo',
        method: 'post', // 默认get请求
        data: this.data
      }).then((response) => {
        debugger;
        if (response.code == '0') {
          if (response.data == 'isChange') {
            this.data.isDataChg = '1';
          } else {
            this.data.isDataChg = '0';
          }
        }
      });
    },
    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.data
      });
    }
  }

};
</script>
