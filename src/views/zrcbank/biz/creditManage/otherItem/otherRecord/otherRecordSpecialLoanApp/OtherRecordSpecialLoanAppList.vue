
<template>
  <!--
    @created by lixm 2021-06-10
    @description 用信审核备案申请信息-列表
  -->
  <div>
    <yu-panel panel-type="simple" title="输入查询条件">
      <yu-xform related-table-name="otherRecordSpecialLoanAppTable" form-type="search" ref="searchForm" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户编号" placeholder="客户编号 " name="cusId" ctype="input" clearable></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both" clearable></yu-xform-item>
          <yu-xform-item label="审批表编号" placeholder="审批表编号 " name="serno" ctype="input" clearable></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel panel-type="simple" title="用信审核备案申请列表">
      <yu-button-drop style="margin-bottom:10px;" >
        <yu-button type="primary"  v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
        <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
        <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="otherRecordSpecialLoanAppTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl">
        <yu-xtable-column label="审批表编号 " prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" :formatter="auditSatusFormatter"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('STD_ZB_APPR_STATUS');
export default {
  name: 'OtherRecordSpecialLoanAppList',
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/otherrecordspecialloanapp/getotherrecordspecialloanapp',
      searchFormdata: {
        cusName: '',
        cusId: '',
        serno: ''
      },
      formDisabled: false
    };
  },
  mounted: function () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshOtherRecordSpecialLoanAppTable', this.refreshOtherRecordSpecialLoanAppTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshOtherRecordSpecialLoanAppTable');
  },
  methods: {
    /**
     * 表格刷新
     */
    refreshOtherRecordSpecialLoanAppTable: function () {
      let _this = this;
      _this.$refs.otherRecordSpecialLoanAppTable.remoteData();
    },
    /**
     * 审批状态格式化
     */
    auditSatusFormatter: function (row, column, cellValue) {
      const statusArr = lookup.find('STD_ZB_APPR_STATUS');
      const obj = statusArr.find((item, index) => {
        return item.key === cellValue;
      });
      return obj ? obj.value : '';
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      let model = {};
      model.serno = _this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
      let path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordSpecialLoanApp/otherRecordSpecialLoanAppAdd/OtherRecordSpecialLoanAppAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '新增用信审核备案申请信息',
        data: {
          name: _this.$route.name,
          actionType: 'ADD', // 操作类型
          data: model
        }
      });
    },
    /**
     * 修改按钮
     */
    modifyFn: function () {
      let _this = this;
      let selData = _this.$refs.otherRecordSpecialLoanAppTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (!(selData[0].approveStatus == '000' || selData[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordSpecialLoanApp/otherRecordSpecialLoanAppAdd/OtherRecordSpecialLoanAppAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '修改用信审核备案申请信息',
        data: {
          name: this.$route.name,
          actionType: 'EDIT', // 操作类型
          data: selData[0]
        }
      });
    },
    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.otherRecordSpecialLoanAppTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (!(selections[0].approveStatus == '000' || selections[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可删除',
          type: 'warning'
        });
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
              url: _this.$backend.cmisBiz + '/api/otherrecordspecialloanapp/deleteInfo/' + selections[0].serno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.$refs.otherRecordSpecialLoanAppTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },
    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.otherRecordSpecialLoanAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordSpecialLoanApp/otherRecordSpecialLoanAppAdd/OtherRecordSpecialLoanAppAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看用信审核备案申请信息',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    }
  }
};
</script>
