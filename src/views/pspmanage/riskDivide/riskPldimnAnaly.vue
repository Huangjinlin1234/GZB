/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="抵质押物列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="true" @current-change="initPldimnData">
        <yu-xtable-column label="押品编号" prop="pldimnNo"></yu-xtable-column>
        <yu-xtable-column label="押品类型" prop="pldimnType" data-code="STD_GRT_FLAG"></yu-xtable-column>
        <yu-xtable-column label="抵质押类别" prop="guarType" ></yu-xtable-column>
        <yu-xtable-column label="押品名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column label="所有权人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="评估金额" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column label="认定价值" prop="confirmAmt"></yu-xtable-column>
        <yu-xtable-column label="抵质押率" prop="mortagageRate"></yu-xtable-column>
        <yu-xtable-column label="分析状态" prop="analyStatus" data-code="STD_RISK_ANALY_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="抵质押情况分析" v-if="!autoFlag" panel-type="simple">
      <yu-xform ref="riskPldimnAnalyForm" v-model="pldimnData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="抵（质）押品可执行能力" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_PLDIMN_EXE_ABI" name="pldimnExeAbi" rules="required"></yu-xform-item>
            <yu-xform-item label="抵质押品价值(元)" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_GUAR_VALUE_SITU" name="guarValueSitu" rules="required"></yu-xform-item>
            <yu-xform-item label="抵（质）押品的实际价值（采用以下三种方式之一）" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" name="guarEvalType" data-code="STD_RISK_GUAR_EVAL" rules="required"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="抵押/质押品情况备注" name="pldimnRemark" :rules="{required:!(pldimnData.pldimnExeAbi == '1' && pldimnData.guarValueSitu == '1' && pldimnData.guarEvalType == '1'), message:'必填'}"
></yu-xform-item>
            <yu-xform-item label="主键" name="pkId" :hidden="true"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_GAGE_TYPE,STD_RISK_ANALY_STATUS,STD_RISK_PLDIMN_EXE_ABI,STD_RISK_GUAR_VALUE_SITU,STD_RISK_GUAR_EVAL');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pldimnData:{},
      dataUrl: this.$backend.cmisPsp + '/api/riskpldimnlist/queryList',
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
  computed:{
    ispldimnRemark: function () {
      return this.pldimnData.pldimnExeAbi == '1' && this.pldimnData.guarValueSitu == '1' && this.pldimnData.guarEvalType == '1';
    }
  },
  created () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.riskTask.taskNo;
    _this.baseParams = {'condition':{'taskNo':_this.taskNo}};
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // _this.$refs.refTable.setHiddenColumns('pkId,pldimnExeAbi,guarValueSitu,guarEvalType,pldimnRemark');
      // 任务编号
      // const taskNo = data.riskTask.taskNo;
      // let params = {};
      // params.taskNo = taskNo;
      // // 通过任务编号获取贷款信息
      // _this.$xutils.request({
      //   // 异步请求
      //   async: true,
      //   url: _this.$backend.cmisPsp + '/api/riskpldimnlist/querySingle',
      //   data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       // 解析返回值
      //       const data = response.data;
      //       if (data != null) {
      //         yufp.clone(data, _this.pldimnData);
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
    initPldimnData: function (val) {
      if (val == undefined) {
        return;
      }
      this.pldimnData.pldimnExeAbi = val.pldimnExeAbi;
      this.pldimnData.guarValueSitu = val.guarValueSitu;
      this.pldimnData.guarEvalType = val.guarEvalType;
      this.pldimnData.pldimnRemark = val.pldimnRemark;
      this.pldimnData.pkId = val.pkId;
    }
  }
};
</script>
