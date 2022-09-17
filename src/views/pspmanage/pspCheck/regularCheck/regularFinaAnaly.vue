/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="财务状况检查" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="get" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo,'cusType':'1'}}" :pageable="false" :data-url="dataUrl" :default-load="false" @loaded="loadData" @current-change="validateFn">
        <yu-xtable-column label="科目" prop="idxName"></yu-xtable-column>
        <yu-xtable-column label="上年末数据" prop="l1yEndValue"></yu-xtable-column>
        <yu-xtable-column label="本期数据" prop="curtValue"></yu-xtable-column>
        <yu-xtable-column label="上年同期数据" prop="l1yCurtValue"></yu-xtable-column>
        <yu-xtable-column label="本期数据和上年同期数变化" prop="l1yRiseRate" disabled ctype="yu-num" :multiple="100" :precision="6" sign="%"></yu-xtable-column>
        <yu-xtable-column label="说明" prop="idxRemark" ctype="textarea" :rules="idxRemark"></yu-xtable-column>
        <yu-xtable-column label="提示信息" prop="hintInfo"></yu-xtable-column>
        <yu-xtable-column label="提示代码" prop="hintValue" hidden="true"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="财务情况分析" v-if="!badFlag" panel-type="simple">
      <yu-xform ref="pspFinaAnalyForm" v-model="finaData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="借款人综合财务情况评价" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="finaAnaly" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_RISK_CASH_ANALY, STD_RISK_FINA_ANALY');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/pspfinsitucheck/queryList',
      updateUrl: this.$backend.cmisPsp + '/api/pspfinsitucheck/updateList',
      baseParams: {},
      finaData: {}, // 财务基本信息
      taskNo: '', // 任务编号
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      badFlag: false, // 是否不良
      tableData: {},
      idxRemark: { required: false, message: '字段不能为空', trigger: 'blur' }
    };
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.pspTask.taskNo;
    _this.$refs.refTable.setHiddenColumns('hintValue');
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
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取贷款信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspcusbasecase/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.finaData);
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
    loadData: function (data, total, response){
      this.tableData = data;
    },
    validateFn: function (currentRow, oldCurrentRow) {
      let row = currentRow;
      let hintValue = row.hintValue;
      if (hintValue === '1') {
        this.idxRemark.required = true;
      } else {
        this.idxRemark.required = false;
      }
    },
    saveFn: function (){
      // var validate = false;
      // // 校验表格数据
      // this.$refs.refTable.validate(function(fields) {
      //   validate = fields;
      // });
      // if (!validate) {
      //   this.$xutils.showMsgBox('提示', '录入信息不完整！');
      //   return false;
      // }
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.updateUrl,
        data: JSON.stringify({ 'pspFinSituCheckList': this.tableData }),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            // 自动刷新列表数据
            // this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
            // });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
          }
        }
      });
    }
  }
};
</script>
