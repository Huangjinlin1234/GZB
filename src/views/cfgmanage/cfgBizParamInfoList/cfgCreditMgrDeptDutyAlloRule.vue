
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
          <yu-xform-item label="规则类型" ctype="select" data-code="STD_RULE_TYPE" placeholder="规则类型" name="ruleType"></yu-xform-item>
          <yu-xform-item label="适用机构代码" ctype="input" placeholder="适用机构代码" name="brId"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="信贷管理部核查岗分配规则配置" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop>
        <yu-button type="primary" @click="addFn">新增</yu-button>
        <yu-button type="primary" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" @click="deleteFn">删除</yu-button>
        <yu-button type="primary" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="规则类型" prop="ruleType" data-code="STD_AUTO_ASIM_RULE_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="适用机构" prop="brId"></yu-xtable-column>
        <yu-xtable-column align="center" label="评审人员" prop="reviewId"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputId"  hide-column></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" label="创建日期" prop="createTime" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" label="修改日期" prop="updateTime"  hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_AUTO_ASIM_RULE_TYPE')
export default {
  data: function () {
    return {
      searchFormdata: {},                   
      dataUrl: backend.workflowService + '/api/creditapproveallotrule/queryListByParams',
      viewType: 'DETAIL'
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },

  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/cfgBizParamInfoList/creditMgrDeptDutyAlloRuleIndex',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '授信管理部审核岗分配规则配置新增',
        data: {
          viewType: 'ADD'
        }
      });
    },
    /*
     修改按钮
    */
    modifyFn: function () {
      var _this = this;
      var selectionsAry = this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var selectData = selectionsAry[0];
      _this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/cfgBizParamInfoList/creditMgrDeptDutyAlloRuleIndex',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '授信管理部审核岗分配规则配置修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          selectData: selectData
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var selectData = selectionsAry[0];
      _this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/cfgBizParamInfoList/creditMgrDeptDutyAlloRuleIndex',
        // 自定义唯一页签key
        key: new Date().getTime() + 1, // 必传
        // 页签名称
        title: '授信管理部审核岗分配规则配置查看',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          selectData: selectData
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var selectData = selectionsAry[0];
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.workflowService + '/api/creditapproveallotrule/deleteListByParams',
              data: selectData,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message.success('操作成功');
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
