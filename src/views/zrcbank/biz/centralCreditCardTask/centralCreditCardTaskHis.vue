<template>
  <!--
    @created by dongan
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="信用卡任务池" class="adjust-height" show-search-input placeholder="关键字" @search="fuzzyQuery">
      <template slot="right">
        <yu-toolBar>
          <yu-button @click="infoFn">查看</yu-button>
        </yu-toolBar>
      </template>
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="refHisTable" form-type="search" v-model="searchFormdata" label-width="110px">
          <yu-xform-group :column="3">
            <yu-xform-item label="申请编号" name="serno" ctype="input"></yu-xform-item   >
            <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="证件号码" name="certType" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="任务类型" name="taskType" ctype="input"></yu-xform-item>
            <yu-xform-item label="申请渠道" name="appChnl" ctype="input"></yu-xform-item>
            <yu-xform-item label="单位名称" name="cprtName" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="申请卡产品" name="creditCardType" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refHisTable" reserve-selection request-type="POST" :default-load="false" :base-params="baseParams" selection-type="radio" @row-click="refHisTableSelect" row-key="taskNo" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="申请编号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="申请卡产品" prop="creditCardType" data-code=""></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="appChnl"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certType" ></yu-xtable-column>
        <yu-xtable-column label="单位名称" prop="cprtName" ></yu-xtable-column>
        <yu-xtable-column label="任务类型" prop="taskType" data-code=""></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      searchFormdata: {},
      formdata: {},
      dataUrl: `${backend.cmisBiz}/api/centralcreditcardtask/`,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseParams: { }
    };
  },
  mounted () {
    this.baseParams = {condition: { default: '1' }};
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  methods: {
    /**
     * 快速查询
     */
    fuzzyQuery: function (e) {
      var param = { condition: { keyWord: e.value } };
      this.$refs.refHisTable.remoteData(param);
      this.$refs.searchForm.resetFields(); // 清空精确查询条件
    },
    /** 任务查看 */
    infoFn () {
      var _this = this;
      var selections = _this.$refs.refHisTable.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }
      var model = {};
      model.taskNo = selections[0].taskNo;
      let name = 'zrcbank/biz/centralCreditCardTask/centralCreditCardTaskDetail';
      let key = 'centralCreditCardTaskDetail' + selections[0].taskNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '任务信息查看',
        // 传递的业务数据，可选配置
        data: model
      });
    }
  }
};
</script>
