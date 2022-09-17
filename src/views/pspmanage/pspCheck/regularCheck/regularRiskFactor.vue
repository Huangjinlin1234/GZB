/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="风险成因" panel-type="simple">
      <yu-xform ref="pspRiskFactorForm" v-model="riskData" label-width="120px">
          <yu-xform-group :column="2" v-if="!consumeFlag">
            <yu-xform-item label="账户是否查封" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" @change="isAcctAttach" data-code="STD_ZB_YES_NO" name="isAcctAttachment"></yu-xform-item>
            <yu-xform-item ctype="textarea" :disabled="viewFlag||approveFlag||assistFlag" label="查封原因（如有）" name="acctAttachmentRemark" :rules="rule"></yu-xform-item>
            <yu-xform-item label="是否已向总行提交人工风险预警" rules="required" :disabled="viewFlag||approveFlag||assistFlag" @change="submit" ctype="radio" data-code="STD_ZB_YES_NO" name="isSubmitManualAlt"></yu-xform-item>
            <yu-xform-item ctype="datepicker" label="提交时间" :disabled="viewFlag||approveFlag||assistFlag" name="submitDate" :rules="need"></yu-xform-item>
            <yu-xform-item ctype="textarea" label="涉诉情况" rules="required" :disabled="viewFlag||approveFlag||assistFlag" colspan="24" name="lawsuitSitu"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item ctype="textarea" label="不良成因" rules="required" :disabled="viewFlag||approveFlag||assistFlag" colspan="24" name="badReason"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      riskData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      consumeFlag: false, // 是否消费贷
      need: false,
      rule: false
    };
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  methods: {
    // 判断查封原因是否必填
    isAcctAttach () {
      if (this.riskData.isAcctAttachment == '1') {
        this.rule = 'required';
      } else if (this.riskData.isAcctAttachment == '0') {
        this.rule = false;
      }
    },
    // 判断提交时间是否必填
    submit () {
      if (this.riskData.isSubmitManualAlt == '1') {
        this.need = 'required';
      } else if (this.riskData.isSubmitManualAlt == '0') {
        this.need = false;
      }
    },
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      _this.consumeFlag = data.pspTask.checkType === '23' || data.pspTask.checkType === '33';
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取客户信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspriskfactor/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.riskData);
              console.log(_this.riskData.badReason);
              _this.updateFlag = true;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
