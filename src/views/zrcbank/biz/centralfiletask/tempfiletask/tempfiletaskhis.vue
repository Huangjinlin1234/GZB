<template>
  <!--
    @created by tangxun
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="临时档案台账历史查询" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="refTable2" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="3">
            <yu-xform-item placeholder="客户名称" name="cusName" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item placeholder="客户编号" name="cusId" ctype="input" ></yu-xform-item>
            <yu-xform-item placeholder="档案编号" name="fileNo" ctype="input" ></yu-xform-item>
            <yu-xform-item placeholder="资料类型" name="bizType" ctype="select" data-code="STD_BIZ_SUB_TYPE_TAIZHANG" filterable></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <template>
        <div style="margin-bottom:10px;">
          <yu-button type="primary" @click="viewop">查看操作记录</yu-button>
        </div>
      </template>
      <yu-lazy>
        <yu-xtable ref="refTable2" reserve-selection :base-params="baseParams" request-type="POST" selection-type="radio" row-key="fileNo" condition-key="condition" row-number :data-url="dataUrl">
          <yu-xtable-column label="档案编号" prop="fileNo"></yu-xtable-column>
          <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
          <yu-xtable-column label="全局流水号" prop="traceId"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="资料类型" prop="bizType" data-code="STD_BIZ_SUB_TYPE_TAIZHANG"></yu-xtable-column>
          <yu-xtable-column label="临时库位号" prop="tempLocationNo"></yu-xtable-column>
          <yu-xtable-column label="出库人" prop="outIdName"></yu-xtable-column>
          <yu-xtable-column label="出库日期" prop="fileOutDate"></yu-xtable-column>
          <yu-xtable-column label="档案上送日期" prop="fileReceiverDate"></yu-xtable-column>
          <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_FILE_ACC_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-lazy>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
yufp.lookup.reg('STD_FILE_TASK_TYPE,STD_BIZ_SUB_TYPE_TAIZHANG,STD_OPT_TYPE,STD_FILE_TASK_TYPE');
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: `${backend.cmisBiz}/api/centralfileinfo/query`,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      // 分配页面
      dialogdistributionVisible: false,
      // 作废页面
      dialoginvalidVisible: false,
      baseParams: {condition: JSON.stringify({accStatus: '03,04'}), sort: 'fileOutDate desc'}
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  methods: {
    /** 查看操作记录 */
    viewop () {
      var _this = this;
      var selections = _this.$refs.refTable2.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }

      let name = 'zrcbank/biz/centralfiletask/tempfiletask/tempfileoptrecord';
      let model = {};
      model.fileNo = selections[0].fileNo;
      model.viewType = 'VIEW';
      this.$dialog.open('操作记录信息查看', name, -1, -1, model, null);
      // let key = 'tempfiletaskDetail' + selections[0].fileNo;
      // model.key = `/${name}/${key}`;
      // _this.$router.addTab({
      //   // 路由名称
      //   name: name,
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: key, // 必传
      //   // 页签名称
      //   title: '操作记录信息查看',
      //   // 传递的业务数据，可选配置
      //   data: model
      // });
    },
    /**
     * 快速查询
     */
    fuzzyQuery: function (e) {
      var param = { condition: { keyWord: e.value } };
      this.$refs.refTable2.remoteData(param);
      this.$refs.searchForm.resetFields(); // 清空精确查询条件
    }
  }
};
</script>
