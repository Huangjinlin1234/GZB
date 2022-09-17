<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="任务编号" name="taskNo"  placeholder="任务编号"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
      
    <yu-panel title="微业贷退回申请列表" :hideFilter="false" :collapseHide="false" >
      <yu-button-drop>
        <yu-button type="primary" @click="addFn">新增</yu-button>
        <yu-button type="primary" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" @click="deleteFn">删除</yu-button>
        <yu-button type="primary" @click="doView">查看</yu-button>
      </yu-button-drop>
    <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="radio" requestType="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick">
      <yu-xtable-column align="center" label="任务编号" prop="taskNo"></yu-xtable-column>
      <yu-xtable-column align="center" label="退回原因" prop="backReason" data-code="STD_ZB_BKREASON_STATUS"></yu-xtable-column>
      <yu-xtable-column align="center" label="退回日期" prop="backDate"></yu-xtable-column>
      <yu-xtable-column align="center" label="实际经营地址" prop="relArrdess"></yu-xtable-column>
      <yu-xtable-column align="center" label="对应支行" prop="relBrIdName"></yu-xtable-column>
      <yu-xtable-column align="center" label="联系客户时间1" prop="contactTime1"></yu-xtable-column>
      <yu-xtable-column align="center" label="联系客户时间2" prop="contactTime2"></yu-xtable-column>
      <yu-xtable-column align="center" label="联系客户时间3" prop="contactTime3"></yu-xtable-column>
      <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
    </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_BKREASON_STATUS,STD_ZB_APPR_STATUS');
export default {
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisPsp + '/api/pspwydtaskback/',
      baseParams: {condition:{'approveStatusList': '000,992', 'inputId': this.$xutils.getLoginUserInfo().loginCode }, sort: 'backDate desc'}
      };
  },
  
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$dialog.open(
        '微业贷贷后任务退回新增',
        'zrcbank/psp/pspCheck/wyd/pspWydTaskBackList_dialog_BillCard',
        '1000',
        '600',
        {operate: 'ADD'},
         () => {
        // 列表刷新
        _this.$refs.refTable.remoteData();
      }
      );
    },
    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      let selectedRowData = _this.getSelectedRowData();
      if (!(selectedRowData.approveStatus == '000' || selectedRowData.approveStatus == '992')) {
        _this.$xutils.showMsgBox('提示', '审批中流程不可修改!');
        return false;
      }
      if (selectedRowData == null) {
        _this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      selectedRowData['operate'] = 'update';
      _this.$dialog.open(
        '微业贷贷后任务退回修改',
        'zrcbank/psp/pspCheck/wyd/pspWydTaskBackList_dialog_BillCard',
        '1000',
        '600',
        selectedRowData,
        () => {
        // 列表刷新
        _this.$refs.refTable.remoteData();
      }
      );

    },
    /**
     * 查看
     */
    doView () {
      var _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      // console.log(params);
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      selectionsAry = this.$refs.refTable.selections[0];
      selectionsAry['operate'] = 'details';
      this.$dialog.open(
        '微业贷贷后任务退回修改',
        'zrcbank/psp/pspCheck/wyd/pspWydTaskBackList_dialog_BillCard',
        '1000',
        '600',
        selectionsAry,
        () => {
        // 列表刷新
        _this.$refs.refTable.remoteData();
      }
      );
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      let selectedRowData = _this.getSelectedRowData();
      if (selectedRowData.approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '发起审批后流程不可删除!');
        return false;
      }
      if (selectedRowData == null) {
        _this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisPsp + '/api/pspwydtaskback/delete/' + selectedRowData.pkId,
              data: JSON.stringify(selectedRowData.pkId),
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>