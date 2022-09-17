/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="抵/质押物检查" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable :rules="rules" ref="refTable" row-number condition-key="condition" request-type="get" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo}}" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column align="center" label="抵/质押物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保标志" prop="guarType" v-if="badFlag"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵/质押物位置" prop="guarAddr"></yu-xtable-column>
        <yu-xtable-column align="center" label="权利金额" prop="confirmAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="评估金额" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵/质押物余值" :disabled="viewFlag||approveFlag||assistFlag" v-if="badFlag" prop="pldimnRemainValue" ctype="input" rules="required" @change="validateFn"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵/质押物是否被有关机关查封、冻结、抵押" width="250px" :disabled="viewFlag||approveFlag||assistFlag" v-if="badFlag" prop="isClose" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵/质押物说明" :disabled="viewFlag||approveFlag||assistFlag" v-if="badFlag" prop="guarRemark" ctype="textarea"></yu-xtable-column>
        <yu-xtable-column align="center" label="押品状态说明" :disabled="viewFlag||approveFlag||assistFlag" v-if="badFlag" prop="guarStsRemark" ctype="textarea" rules="required"></yu-xtable-column>
      </yu-xtable>
      <yu-panel v-if="!badFlag" title="" panel-type="simple">
      <yu-xform ref="pspPldimnCheckForm" v-model="pldimnData" label-width="340px">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否对抵（质）押物进行核实并拍照确认" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isPhotograph" ></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" placeholder="如因特殊原因无法拍照的，说明合理理由" name="noPhotoExpl" colspan="20"></yu-xform-item>
            <yu-xform-item label="抵（质）押人的担保意愿情况" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_GUAR_WISH" name="guarWishCase" ></yu-xform-item>
            <yu-xform-item ctype="textarea" label="说明" :disabled="viewFlag||approveFlag||assistFlag" name="wishCaseExpl" colspan="20"></yu-xform-item>
            <yu-xform-item label="抵/质押物是否被有关机关查封、冻结、再次抵押" :disabled="viewFlag||approveFlag||assistFlag" @change="validateFn" ctype="radio" data-code="STD_ZB_YES_NO" name="isClose" ></yu-xform-item>
            <yu-xform-item ctype="textarea" label="说明" :disabled="viewFlag||approveFlag||assistFlag" name="closeExpl" :rules="rules.closeExpl" colspan="20"></yu-xform-item>
            <yu-xform-item label="是否书面承诺放弃优先购买权及优先租赁权（如有）" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" @change="validateFn" data-code="STD_ZB_YES_NO" name="isPriRent" ></yu-xform-item>
            <yu-xform-item ctype="textarea" label="说明" :disabled="viewFlag||approveFlag||assistFlag" name="rentExpl" :rules="rules.rentExpl" colspan="20"></yu-xform-item>
            <yu-xform-item label="是否有其他重要风险事项" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" @change="validateFn" name="isOtherRiskEvent" ></yu-xform-item>
            <yu-xform-item ctype="textarea" label="说明" :disabled="viewFlag||approveFlag||assistFlag" name="riskEventExpl" :rules="rules.riskEventExpl" colspan="20"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/psppldimnlist/queryList',
      baseParams: {},
      taskNo: '',
      pldimnData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      badFlag: false, // 是否不良
      rules: {
        guarRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        closeExpl: { required: false, message: '字段不能为空', trigger: 'blur' },
        rentExpl: { required: false, message: '字段不能为空', trigger: 'blur' },
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
      // 任务编号
      _this.taskNo = data.pspTask.taskNo;
      const taskNo = _this.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取担保品信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/psppldimncheck/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.pldimnData);
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
      let isClose1 = this.pldimnData.isClose;
      let isPriRent = this.pldimnData.isPriRent;
      let isOtherRiskEvent = this.pldimnData.isOtherRiskEvent;
      console.log('isClose1', isClose1);
      if (this.$refs.refTable.tabledata.length > 0) {
        let selections = this.$refs.refTable.selections;
        let pldimnRemainValue = selections[0].pldimnRemainValue;
        let isClose = selections[0].isClose;
        if (isClose === '1' || pldimnRemainValue !== '') {
          this.rules.guarRemark.required = true;
        } else {
          this.rules.guarRemark.required = false;
        }
      }

      if (isClose1 === '1') {
        this.rules.closeExpl.required = true;
      } else {
        this.rules.closeExpl.required = false;
      }
      if (isPriRent === '0') {
        this.rules.rentExpl.required = true;
      } else {
        this.rules.rentExpl.required = false;
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
