/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="保证人检查" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="get" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo}}" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column align="center" label="担保人名称" prop="guarName"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保标志" prop="guarType"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="报告期净资产" disabled v-if="badFlag" prop="netAssets"></yu-xtable-column>
        <yu-xtable-column align="center" label="已对外担保金额" :disabled="viewFlag||approveFlag||assistFlag" v-if="badFlag" prop="curtGuarAmt" ctype="input" rules="required"></yu-xtable-column>
        <yu-xtable-column align="center" label="测算担保人可担保金额" prop="evalGuarAmt" v-if="badFlag" width="250px"></yu-xtable-column>
        <yu-xtable-column align="center" label="是否具担保能力" :disabled="viewFlag||approveFlag||assistFlag" v-if="badFlag" prop="guarAbi" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保人说明" :disabled="viewFlag||approveFlag||assistFlag" v-if="badFlag" prop="guarAbiExpl" ctype="textarea" rules="required"></yu-xtable-column>
      </yu-xtable>
      <yu-panel v-if="!badFlag" title="" panel-type="simple">
      <yu-xform :rules="rules" ref="pspGuarntrCheckForm" v-model="guarntrData" label-width="200px">
          <yu-xform-group :column="2">
            <yu-xform-item label="目前保证人经营是否正常" :disabled="viewFlag||approveFlag||assistFlag" v-if="corpFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isOperNormal"  rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="operExpl" v-if="corpFlag" colspan="20"></yu-xform-item>
            <yu-xform-item label="保证人担保能力" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_GUAR_ABI" name="guarAbi"  rules="required"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="guarAbiExpl" colspan="20"></yu-xform-item>
            <yu-xform-item label="保证人担保意愿" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_GUAR_WISH" name="guarWish"  rules="required"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="guarWishExpl" colspan="20"></yu-xform-item>
            <yu-xform-item label="是否有其他重要风险事项" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isOtherRiskEvent" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="说明" name="riskEventExpl" :rules="rules.riskEventExpl"  colspan="20"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_YES_NO, STD_ZB_GUAR_ABI, STD_ZB_GUAR_WISH');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/pspguarntrlist/queryList',
      baseParams: {},
      guarntrData: {}, // 担保基本信息
      taskNo: '', // 任务编号
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      badFlag: false, // 是否不良
      corpFlag: false, // 是否对公
      rules: {
        operExpl: { required: false, message: '字段不能为空', trigger: 'blur' },
        guarAbiExpl: { required: false, message: '字段不能为空', trigger: 'blur' },
        guarWishExpl: { required: false, message: '字段不能为空', trigger: 'blur' },
        riskEventExpl: { required: false, message: '字段不能为空', trigger: 'blur' }
      }
    };
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.pspTask.taskNo;
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      _this.badFlag = data.pspTask.rptType == '3';
      _this.corpFlag = data.pspTask.checkType == '21' || data.pspTask.checkType == '31';
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取保证人信息
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
      let isOperNormal = this.guarntrData.isOperNormal;
      let guarAbi = this.guarntrData.guarAbi;
      let guarWish = this.guarntrData.guarWish;
      let isOtherRiskEvent = this.guarntrData.isOtherRiskEvent;
      if (isOperNormal === '0') {
        this.rules.operExpl.required = true;
      } else {
        this.rules.operExpl.required = false;
      }
      if (guarAbi === '3') {
        this.rules.guarAbiExpl.required = true;
      } else {
        this.rules.guarAbiExpl.required = false;
      }
      if (guarWish === '3') {
        this.rules.guarWishExpl.required = true;
      } else {
        this.rules.guarWishExpl.required = false;
      }
      if (isOtherRiskEvent === '1') {
        this.rules.riskEventExpl.required = true;
      } else {
        this.rules.riskEventExpl.required = false;
      }
    }
  }
};
</script>
