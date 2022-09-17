/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="保证人情况分析" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-panel title="" panel-type="simple">
      <yu-xform :rules="rules" ref="pspGuarntrCheckForm" v-model="guarntrData" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保人经营（工作）是否正常" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isGuarOperNormal" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="unnormalDesc" colspan="20"></yu-xform-item>
            <yu-xform-item label="担保人担保能力是否下降" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isChangeAbi" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="changeAbiRemark" colspan="20"></yu-xform-item>
            <yu-xform-item label="是否超过担保人实际担保能力" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isAddAbi" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="addAbiRemark" colspan="20"></yu-xform-item>
            <yu-xform-item label="担保人及其家庭是否发生意外（包括担保人死亡、被拘留、家庭破裂、涉及黄赌毒等）" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isAccident" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="accidentRemark" colspan="20"></yu-xform-item>
            <yu-xform-item label="担保人是否面临重大诉讼" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isInvolveLawsuit" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="involveLawsuitRemark" colspan="20"></yu-xform-item>
            <yu-xform-item label="是否具备担保资格和能力" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isOwnGuarAbi" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="ownGuarAbiRemark" colspan="20"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="select" data-code="STD_PSP_GUAR_EVLU" label="对担保人的总体评价" name="totlEvlu" colspan="12" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_YES_NO ,STD_PSP_GUAR_EVLU');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      guarntrData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      badFlag: false, // 是否不良
      rules: {
        unnormalDesc: { required: false, message: '字段不能为空', trigger: 'blur' },
        changeAbiRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        addAbiRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        accidentRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        involveLawsuitRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        ownGuarAbiRemark: { required: false, message: '字段不能为空', trigger: 'blur' }
      }
    };
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.meta.params;
      _this.viewFlag = data.opType === 'view';
      _this.badFlag = data.pspTask.rptType == '3';
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过客户号获取保证人信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspguarntrcheck/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.guarntrData);
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
    },
    validateFn: function () {
      let isGuarOperNormal = this.guarntrData.isGuarOperNormal;
      let isChangeAbi = this.guarntrData.isChangeAbi;
      let isAddAbi = this.guarntrData.isAddAbi;
      let isAccident = this.guarntrData.isAccident;
      let isInvolveLawsuit = this.guarntrData.isInvolveLawsuit;
      let isOwnGuarAbi = this.guarntrData.isOwnGuarAbi;
      if (isGuarOperNormal === '1') {
        this.rules.unnormalDesc.required = false;
      } else {
        this.rules.unnormalDesc.required = true;
      }
      if (isChangeAbi === '1') {
        this.rules.changeAbiRemark.required = true;
      } else {
        this.rules.changeAbiRemark.required = false;
      }
      if (isAddAbi === '1') {
        this.rules.addAbiRemark.required = true;
      } else {
        this.rules.addAbiRemark.required = false;
      }
      if (isAccident === '1') {
        this.rules.accidentRemark.required = true;
      } else {
        this.rules.accidentRemark.required = false;
      }
      if (isInvolveLawsuit === '1') {
        this.rules.involveLawsuitRemark.required = true;
      } else {
        this.rules.involveLawsuitRemark.required = false;
      }
      if (isOwnGuarAbi === '1') {
        this.rules.ownGuarAbiRemark.required = false;
      } else {
        this.rules.ownGuarAbiRemark.required = true;
      }
    }
  }
};
</script>
