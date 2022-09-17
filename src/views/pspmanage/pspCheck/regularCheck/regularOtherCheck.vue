/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
      <yu-panel title="其他情况" panel-type="simple">
      <yu-xform rules="rules" ref="pspOtherCaseCheckBlemishForm" :disabled="viewFlag||approveFlag||assistFlag" v-model="blemishData" label-width="160px">
          <yu-xform-group :column="2">
            <yu-xform-item label="瑕疵贷款的形成原因" ctype="textarea" colspan="24" name="blemishReason" rules="required"></yu-xform-item>
            <yu-xform-item label="是否会形成不良" ctype="radio" data-code="STD_ZB_YES_NO" name="isNotFine" rules="required" colspan="4" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" ctype="textarea" name="notFineRemark" :rules="rules.notFineRemark" colspan="20"></yu-xform-item>
            <yu-xform-item label="借款合同、保证合同、抵（质）押合同等重要法律文本是否合法、有效" ctype="radio" data-code="STD_ZB_YES_NO" name="isVld" colspan="4" @change="validateFn" rules="required"></yu-xform-item>
            <yu-xform-item label="说明" ctype="textarea" name="vldRemark" :rules="rules.vldRemark" colspan="20"></yu-xform-item>
            <yu-xform-item label="主从合同能否衔接，无法律瑕疵" ctype="radio" data-code="STD_ZB_YES_NO" name="isLnk" colspan="4" @change="validateFn" rules="required"></yu-xform-item>
            <yu-xform-item label="说明" ctype="textarea" name="lnkRemark" :rules="rules.lnkRemark" colspan="20"></yu-xform-item>
            <yu-xform-item label="本次检查后拟采取的措施等情况说明" ctype="textarea" colspan="24" name="caseRemark" rules="required"></yu-xform-item>
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
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      formType: 'ADD',
      rules: {
        notFineRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        vldRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        lnkRemark: { required: false, message: '字段不能为空', trigger: 'blur' }
      }
    };
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
    // 从借据信息中获取 是否受托支付、交易对手名称
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      // 任务编号
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过客户号获取客户评级信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspothercasecheckblemish/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.blemishData);
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    validateFn: function () {
      let isNotFine = this.blemishData.isNotFine;
      let isVld = this.blemishData.isVld;
      let isLnk = this.blemishData.isLnk;
      if (isNotFine === '1') {
        this.rules.notFineRemark.required = true;
      } else {
        this.rules.notFineRemark.required = false;
      }
      if (isVld === '1') {
        this.rules.vldRemark.required = false;
      } else {
        this.rules.vldRemark.required = true;
      }
      if (isLnk === '1') {
        this.rules.lnkRemark.required = false;
      } else {
        this.rules.lnkRemark.required = true;
      }
    }
  }
};
</script>
