<!--个人客户维护待处理-->
<template>
  <div>
    <yu-panel title="客户日常管理任务" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" >
        <yu-xform-group :column="3">
          <yu-xform-item label="业务类型" ctype="select" data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType" :datacode-filter="datacodeFilterFn" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" ></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" ></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" data-code="STD_TASK_STATUS" placeholder="任务状态" name="taskStatus" :datacode-filter="filterTaskStatus"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_CUS_BIZ_TYPE" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP" ></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="任务状态" prop="taskStatus" data-code="STD_TASK_STATUS" ></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="100px" ></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100px" ></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operrate" width="100px">
          <template slot-scope="scope">
            <yu-button @click="handleClick(scope.row)" type="text" size="small">处理</yu-button>
            <yu-button @click="cancleClick(scope.row)" type="text" size="small">作废</yu-button>
          </template>
        </yu-xtable-column >
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_TASK_STATUS,STD_ZB_CUS_BIZ_TYPE,STD_ZB_APPR_STATUS,STD_ZB_CERT_TYP');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dicOptions: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusmanatask/',
      baseParams: { condition: { taskStatusList: '1,2', bizType:'B03,B04,B05,B06,B07,B08', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} },
      deleteUrl: this.$backend.cmisCus + '/api/cusmanatask/delete/'
    };
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == 'B03' || op.key == 'B04' || op.key == 'B05' || op.key == 'B06' || op.key == 'B07' || op.key == 'B08') {
          return true;
        }
        return false;
      });
    },

    // 字典项过滤
    filterTaskStatus: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '1' || op.key === '2' || op.key === '3') {
          return true;
        }
        return false;
      });
    },

    handleClick (row) {
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if(loginCode != row.inputId && loginCode != row.managerId){
        this.$xutils.showMsgBox('提示', '非管户客户无法进行处理!');
        return;
      }
      let _this = this;
      const bizType = row.bizType;
      let data = {};
      this.$utils.clone(row, data);
      data['op'] = 'EDIT';
      data['bizType'] = bizType;
      // 类型区分
      data['flag'] = 'edit';
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndivDefend';
      let title = '';
      let key = '';
      // 个人正式客户创建 B01
      if (bizType == 'B03') {
        key = 'tempCusIndiv' + new Date().getTime();
        title = '个人正式客户维护';
        data.cusRankCls = '01';
        // 个人临时客户创建 B02
      } else if (bizType == 'B04') {
        key = 'tempCusIndivTemp' + new Date().getTime();
        title = '个人临时客户维护';
        data.cusRankCls = '02';
      }else if(bizType == 'B05'){ // 个人客户财务报表新增
        name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        key = 'custom_report_' + data.cusId;
        title = '个人客户财务报表新增';
      }else if(bizType == 'B06'){ // 个人客户财务报表修改
        name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        key = 'custom_report_' + data.cusId;
        title = '个人客户财务报表修改';
      }else if(bizType == 'B07'){ // 个人客户财务报表新增（集中作业）
        name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        key = 'custom_report_' + data.cusId;
        title = '个人客户财务报表新增（集中作业）';
      }else if(bizType == 'B08'){ // 个人客户财务报表修改（集中作业）
        name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        key = 'custom_report_' + data.cusId;
        title = '个人客户财务报表修改（集中作业）';
      }
      data.key = `/${name}/${key}`;
      if (row.taskStatus == '2' && row.approveStatus !== '992') {
        _this.$message({
          message: '当前正在处理中，请勿重复提交',
          type: 'warning'
        });
      } else {
        _this.$refs.refForm.resetFields();
        _this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key,
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: data
        });
      }
      // var currentPath = _this.$route.path;
      // setTimeout(function () {
      //   yufp.router.removeTab(currentPath);
      // }, 100);
    },
    //作废
    cancleClick (row) {
      var _this = this;
      let data = row;
      if (data.approveStatus === '111') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      data.taskStatus = '4'; // 4-作废
      _this.$xutils.request({
          type: 'POST',
          url: _this.$backend.cmisCus + '/api/cusmanatask/updateSelective',
          data: data,
          success: (response, status, xhr) => {
            var param = {
              bizId: data.serno
            };
            yufp.service.request({
              method: 'GET',
              url: backend.workflowService + '/api/core/deleteByBizId',
              data: param,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  if (response.data != null) {
                    var param = {
                      bizId: data.serno
                    };
                    yufp.service.request({
                      method: 'GET',
                      url: backend.workflowService + '/api/core/deleteByBizId',
                      data: param,
                      callback: function (code, message, response) {
                        if (response.code == 0) {
                          if (response.data != null) {
                            // 自动刷新列表数据
                            _this.$xutils.showMsgBox('提示', '作废成功', 500, 300, () => {
                              _this.$refs.refTable.remoteData();
                            });
                          }
                        } else {
                          _this.$message({
                            duration: 4000,
                            message: '获取数据异常:' + response.message.substring(0, 100),
                            type: 'error'
                          });
                        }
                      }
                    });
                  }
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '获取数据异常:' + response.message.substring(0, 100),
                    type: 'error'
                  });
                }
              }
            });
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
    },
  }
};
</script>

