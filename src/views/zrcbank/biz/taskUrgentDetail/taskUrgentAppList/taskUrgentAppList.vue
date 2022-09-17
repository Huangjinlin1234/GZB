
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——tab页签+查询
  -->
  <div class="tab-search">
    <yu-panel title="加急记录" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
          <yu-xform-group :column="4">
            <yu-xform-item label="业务类型" ctype="select" data-code="STD_BIZ_SUB_TYPE_JIAJI" name="bizType"></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" name="serno"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputId"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      <template slot="right">
        <yu-toolbar>
          <yu-button v-if="checkCtrl('taskadd')" @click="launchTask">发起任务加急</yu-button>
          <yu-button v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
        </yu-toolbar>
      </template>
      <yu-xtable ref="refTable" selection-type="radio" condition-key="condition" row-number :data-url="dataUrl" :default-load="false" :base-params="params" request-type="POST">
        <yu-xtable-column label="操作流水" prop="pkId" ></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno" ></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_BIZ_SUB_TYPE_JIAJI"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="加急原因" prop="urgentResn" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>

import { lookup } from '@/utils';
lookup.reg('STD_BIZ_LINE,STD_BIZ_PHASE,STD_BIZ_SUB_TYPE_JIAJI');
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/taskurgentapp/',
      params: {}
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    this.params = { condition: {}, sort: 'input_date desc' };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    launchTask: function () {
      var _this = this;
      const pwbrSerno = {
        option: 2
      };
      _this.$dialog.open('加急信息',
        'zrcbank/biz/taskUrgentDetail/taskUrgentAppList/taskUrgentAppInput/taskUrgentAppInput',
        1200, 600, pwbrSerno,
        () => {
          _this.$refs.refTable.remoteData();
        }
      );
    },

    infoFn () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refTable.selections[0];
      const pkId = {
        pkId: obj.pkId,
        option: 1
      };
      this.$dialog.open('加急信息',
        'zrcbank/biz/taskUrgentDetail/taskUrgentAppList/taskUrgentAppInput/taskUrgentAppInput',
        1200, 600, pkId,
        null
      );
    }
  }
};
</script>
