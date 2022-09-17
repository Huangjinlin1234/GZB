<template>
  <div>
    <yu-panel title="征信查询申请表" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="征信查询对象名称" ctype="input" placeholder="征信查询对象名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="查询对象证件号码" ctype="input" placeholder="查询对象证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doInsect" v-if="checkCtrl('add')" @click="customClick('doInsect')">新增</yu-button>
        <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
        <yu-button type="primary" ref="btn_doUpdate" v-if="checkCtrl('edit')" @click="customClick('doUpdate')">修改</yu-button>
        <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="doDelete">删除</yu-button>
        <yu-button type="primary" ref="btn_doCreditReportView" v-if="checkCtrl('report')" @click="customClick('doCreditReportView')">查看征信报告</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST" :base-params="baseParams" :default-load="true">
        <yu-xtable-column label="征信查询对象名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="查询对象证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="与主借款人关系" prop="borrowRel" :options="dicOptions.borrowRelOptions"></yu-xtable-column>
        <yu-xtable-column label="征信查询原因" prop="qryResn" :options="dicOptions.qryResnOptions"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="是否成功发起" prop="isSuccssInit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="报告生成时间" prop="reportCreateTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'crqlSerno',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], qryResnOptions: [{key: '02', value: '贷款审批'}, {key: '08', value: '担保资格审查'}, {key: '22', value: '法人代表，出资人及关联人等资信查询'}, {key: '25', value: '资信审查'}, {key: '27', value: '贷后管理'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}], authbookContentOptions: [{key: '001', value: '审核本人贷款申请'}, {key: '002', value: '审批本人贷记卡'}, {key: '003', value: '审核本人作为担保人'}, {key: '004', value: '对已发放的信贷业务进行贷后风险管理'}, {key: '005', value: '受理法人或其他组织的贷款申请或其作为担保人，需要查询本人作为法定代表人、出资人及关联人信用情况'}, {key: '006', value: '对公业务贷后管理需要查询本人作为法定代表人、出资人及关联人信用状况'}, {key: '007', value: '特约商户实名审查'}, {key: '008', value: '处理本人的征信异议'}, {key: '009', value: '其他支行认为需要查询本人的信用状况'}, {key: '010', value: '资信审查'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/',
      baseParams: {'condition': {'qryCls': '0'}, 'sort': 'isnull(approve_status),field(approve_status,000,992,111,997,993,996,998,991),if(isnull(report_create_time),0,1),report_create_time desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/delete/'
    };
  },
  methods: {
    doDelete () {
      var _this = this;
      let params = _this.$refs.refTable.selections[0];

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.approveStatus != '000') {
        _this.$xutils.showMsgBox('提示', '非待发起状态不允许删除。');
        return;
      }
      _this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            if (params.approveStatus == '992') {
              // 更新审批状态 -> 自行退出
              params.approveStatus = '996';
              yufp.service.request({
                method: 'POST',
                url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/update`,
                data: JSON.stringify(params),
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$xutils.showMsgBox('提示', '自行退出成功!', 500, 300, function () {
                      _this.$refs.refTable.remoteData();
                    });
                  } else {
                    _this.$message({ message: response.message, type: 'error' });
                  }
                }
              });
            } else {
              // 删除数据
              yufp.service.request({
                method: 'POST',
                url: `${_this.$backend.cmisBiz}/api/creditreportqrylst/delete/${params.crqlSerno}`,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$xutils.showMsgBox('提示', '删除成功!', 500, 300, function () {
                      _this.$refs.refTable.remoteData();
                    });
                  } else {
                    _this.$message({ message: response.message, type: 'error' });
                  }
                }
              });
            }
          }
        }
      });
    }
  }
};
</script>
