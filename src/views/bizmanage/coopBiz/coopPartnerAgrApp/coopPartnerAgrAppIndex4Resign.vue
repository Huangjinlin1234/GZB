<template>
  <div>
    <yu-panel panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px"  related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="协议编号" ctype="input" placeholder="协议编号" name="coopAgrNo"></yu-xform-item>
          <yu-xform-item label="协议起始日" ctype="datepicker" placeholder="协议起始日" name="coopAgrStartDate" ></yu-xform-item>
          <yu-xform-item label="协议到期日" ctype="datepicker" placeholder="协议到期日" name="coopAgrEndDate" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" :data-url="dataUrl" :base-params="baseParams" :default-load="false" request-type="post">
        <yu-xtable-column label="协议编号" prop="coopAgrNo"></yu-xtable-column>
        <yu-xtable-column label="合作类型" prop="coopType" data-code="STD_COOP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="协议金额" prop="coopAgrAmt" :formatter="Currency" width="140"></yu-xtable-column>
        <yu-xtable-column label="协议起始日" prop="coopAgrStartDate"></yu-xtable-column>
        <yu-xtable-column label="协议到期日" prop="coopAgrEndDate"></yu-xtable-column>
        <yu-xtable-column label="协议签订日" prop="coopAgrSignDate"></yu-xtable-column>
        <yu-xtable-column label="经办日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <div style="text-align:center;">
      <yu-toolBar>
        <yu-button type="primary" @click="confirmFn">确认</yu-button>
        <yu-button type="primary" @click="returnFn">返回</yu-button>
      </yu-toolBar>
    </div>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  mixins: [mixin],
  data () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/cooppartneragraccinfo/query',
      addUrl: this.$backend.cmisBiz + '/api/cooppartneragraddrel/',
      baseParams: {
        condition: {}
      }
    };
  },
  mounted() {
    this.searchFn();
  },
  methods: {
    /**
     * 将表格的数据，赋值给表单字段
     */
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    confirmFn: function () {
      let selections = this.$refs.refTable.selections;
      if (selections.length === 0) {
        return this.$message({ message: '必须选择至少一条记录进行操作!', type: 'warning' });
      }
      var _this = this;
      let serno = this.$route.params.serno;
      let coopPlanNo = this.$route.params.coopPlanNo;
      selections.forEach(row => {
        row.pkId = null;
        row.serno = serno;
        row.coopPlanNo = coopPlanNo;
        _this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.addUrl,
          data: row,
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
            } else {
              this.$xutils.showMsgBox('提示', '错误信息：' + response.message);
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox('提示', '错误信息：' + b); // 弹出提示
          }
        });
      });
      _this.$dialog.close(this.dialogId);
    },
    // 条件查询
    searchFn: function () {
      this.searchFormdata.coopPlanNo = this.$route.params.coopPlanNo;
      this.$refs.refTable.remoteData({
        condition: JSON.stringify(this.searchFormdata)
      });
    },
    // 重置
    resetFn: function () {
      // 清空条件
      this.$refs.searchForm.resetFields();
    },
    // 返回
    returnFn: function () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
