/**
 * @created by hanl 2021-06-15
 * @updated by waangyouhong
 * @description
 */
<template>
  <div>
    <yu-panel title="担保合同" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="true" @current-change="initGuarData">
        <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="是否授信项下" prop="isUnderLmt"></yu-xtable-column>
        <yu-xtable-column label="授信额度编号" prop="lmtAccNo"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="担保合同金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="借款人名称" prop="borrowerName"></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
        <yu-xtable-column label="分析状态" prop="analyStatus" data-code="STD_RISK_ANALY_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="担保合同分析" v-if="!autoFlag" panel-type="simple">
      <yu-xform ref="riskGuarAnalyForm" v-model="guarData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="担保合同有效性" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_VALID_FLAG" name="guarContValidFlag" rules="required"></yu-xform-item>
            <yu-xform-item label="担保合同限制性条款" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_HAVE_FLAG" name="guarContLimitFlag" rules="required"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="担保合同代偿能力说明" name="guarRepayAbiRemark" :rules="{required: !(guarData.guarContValidFlag=='1' && guarData.guarContLimitFlag=='0'), message:'必填'}">
            </yu-xform-item>
            <yu-xform-item  label="主键" name="pkId" hidden="true"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE,STD_RISK_ANALY_STATUS,STD_RISK_VALID_FLAG,STD_RISK_HAVE_FLAG');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      guarData:{},
      dataUrl: this.$backend.cmisPsp + '/api/riskguarcontanaly/queryList',
      baseParams: {},
      guarntrData: {}, // 担保基本信息
      taskNo: '', // 任务编号
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      autoFlag: false // 是否不良
    };
  },
  created () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.riskTask.taskNo;
    _this.baseParams = {'condition':{'taskNo': _this.taskNo, 'guarContState':'101'}}
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // _this.$refs.refTable.setHiddenColumns('pkId,guarContValidFlag,guarContLimitFlag,guarRepayAbiRemark');
      // 任务编号
      // const taskNo = data.riskTask.taskNo;
      // let params = {};
      // params.taskNo = taskNo;
      // // 通过任务编号获取贷款信息
      // _this.$xutils.request({
      //   // 异步请求
      //   async: true,
      //   url: _this.$backend.cmisPsp + '/api/riskguarcontanaly/querySingle',
      //   data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       // 解析返回值
      //       const data = response.data;
      //       if (data != null) {
      //         yufp.clone(data, _this.guarData);
      //         _this.updateFlag = true;
      //       }
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
      //     }
      //   },
      //   error: (result, b) => {
      //     _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //   }
      // });
    },
    initGuarData (val) {
      if (val == undefined) {
        return;
      }
      this.guarData.guarContValidFlag = val.guarContValidFlag;
      this.guarData.guarContLimitFlag = val.guarContLimitFlag;
      this.guarData.guarRepayAbiRemark = val.guarRepayAbiRemark;
      this.guarData.pkId = val.pkId;
    }
  }
};
</script>
