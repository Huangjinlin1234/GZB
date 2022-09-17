<template>
  <div>
    <yu-panel title="同业客户任务管理历史" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务类型" ctype="select" data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" data-code="STD_TASK_STATUS" placeholder="任务状态" name="taskStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button type="primary" ref="btn-doView" @click="doView">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_CUS_BIZ_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="任务状态" prop="taskStatus" data-code="STD_TASK_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CUS_BIZ_TYPE,STD_ZB_APPR_STATUS,STD_ZB_CERT_TYP');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusmanatask/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusmanatask/delete/'
    };
  },

  mounted () {
    this.afterInit();
  },

  methods: {
    afterInit () {
      // debugger;
      var data = this.$route.meta.params;
      this.searchFormdata.bizType = data.bizType
      this.baseParams['condition'] = {'bizType': data.bizType, 'taskStatusList': '3,4', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")};
      this.$refs.refTable.remoteData();
    },
    doView () {
      const data = this.$refs.refTable.selections;
      if (data.length !== 1) {
        this.$message({
          message: '请先选择一条记录！',
          type: 'warning'
        });
        return;
      }
      var json = {};
      json = data[0];
      json.viewType = 'VIEW'
      // json['model_group_no'] = 'CMG000288';
      // json['op'] = 'VIEW';
      // json['opType'] = 'details';
      // json['data'] = data;

      // this.$dialog.open(
      //   '同业客户查看',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   -1,
      //   -1,
      //   json,
      //   () => {}
      // );
      let name = 'cusmanage/cusIntbank/cusIntbankCreate/CusIntbankCreateMain';
      let key = 'cusmanage' + json.cusId;
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '同业客户历史查看',
        // 传递的业务数据，可选配置
        data: json
      });
    }
  }
};
</script>
