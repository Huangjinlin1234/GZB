<template>
  <div>
    <yu-panel title="客户日常管理任务">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务类型" ctype="select" data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" data-code="STD_TASK_STATUS" placeholder="任务状态" name="taskStatus" :datacode-filter="filterTaskStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right"> </template>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_CUS_BIZ_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="任务状态" prop="taskStatus" data-code="STD_TASK_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operrate" width="100px">
          <template slot-scope="scope">
            <yu-button-drop set-index="0" :show-length="1" type="text">
              <yu-button @click="editFn(scope.row)" type="text">处理</yu-button>
              <yu-button @click="cancleClick(scope.row)" type="text" size="small">作废</yu-button>
            </yu-button-drop>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    activeIndex: String
  },
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusmanatask/',
      baseParams: this.pageParams ? { condition: { taskStatus: '1', bizType: this.pageParams.bizType, inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode") } } : { condition: { taskStatus: '1', bizType: this.activeIndex, inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} },
      deleteUrl: this.$backend.cmisCus + '/api/cusmanatask/delete/'
    };
  },
  mounted () {
    if(this.activeIndex) {
      this.baseParams = { condition: { taskStatus: '1', bizType: this.activeIndex, inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} }
    } else {
      this.searchFormdata.bizType = this.pageParams.bizType;
      this.searchFormdata.taskStatus = '1';
    }
  },
  methods: {
    editFn (row) {
      var _this = this;
      if (row.taskStatus == '2') {
        _this.$message({
          message: '当前正在处理中，请勿重复提交',
          type: 'warning'
        });
      } else {
        _this.applySubmit(row);
      }
    },
    applySubmit (row) {
      const json = row;
      // json['op'] = 'EDIT';
      // json['opType'] = 'edit';
      // json['socialCreditCode'] = json.certCode;

      // // 类型区分
      // json['flag'] = 'update';

      // json['model_group_no'] = 'CMG000288';

      // this.$dialog.open('同业客户创建', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});

      let name = 'cusmanage/cusIntbank/cusIntbankCreate/CusIntbankCreateMain';
      let key = 'cusmanage' + json.cusId;
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '同业客户申请',
        // 传递的业务数据，可选配置
        data: json
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
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
    },
  }
};
</script>
