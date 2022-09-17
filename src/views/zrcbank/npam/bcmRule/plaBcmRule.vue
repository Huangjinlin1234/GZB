
<template>
  <!--
    @created by wyh lq
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="80px">
          <yu-xform-group :column="2">
            <yu-xform-item label="规则名称" placeholder="模糊查询" name="ruleName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="规则状态" name="ruleStatus" ctype="select" data-code="STD_RULE_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="催收任务规则列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <div>
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
        <yu-button type="primary" @click="start" v-if="checkCtrl('start')">启用</yu-button>
        <yu-button type="primary" @click="end" v-if="checkCtrl('end')">停用</yu-button>
      </div>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" width="190" label="规则编号" prop="ruleId"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="规则名称" prop="ruleName"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="资产类型" prop="assetType" data-code="STD_ASSET_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="任务生成频率" prop="taskFreq" data-code="STD_TASK_FREQ"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="任务要求完成时间" prop="finishDay"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="规则状态" prop="ruleStatus" data-code="STD_RULE_STATUS"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column align="center" width="210" label="登记机构" prop="inputBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>

<script>
// 注册字典项
yufp.lookup.reg('STD_RULE_STATUS,STD_ASSET_TYPE,STD_TASK_FREQ');
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisNpam + '/api/cfgplabcmrule/queryCfgPlaBcmRuleList',
      viewType: 'DETAIL'
    };
  },
  // 监听路由,刷新页面
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
        name: 'zrcbank/npam/bcmRule/plaBcmParam',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '催收任务规则配置新增',
        // 传递的业务数据，可选配置
        data: {
          ruleId: this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'),
          viewType: 'ADD'
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      // 选取的表格数据
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 请求参数
      let ruleId = selectionsAry[0].ruleId;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmParam',
        // 自定义唯一页签key
        key: 'cfgAssistantUpdate' + new Date().getTime(), // 必传
        // 页签名称
        title: '催收任务规则配置修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          ruleId: ruleId
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

      let ruleId = selectionsAry[0].ruleId;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmParam',
        // 自定义唯一页签key
        key: 'cfgAssistant' + new Date().getTime(), // 必传
        // 页签名称
        title: '催收任务规则配置查看',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          ruleId: ruleId
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

      var ruleId = selectionsAry[0].ruleId;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/cfgplabcmrule/delete/' + ruleId,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },

    /**
     * 启用
     */
    start: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let ruleStatusOld = selectionsAry[0].ruleStatus;
      let ruleStatus = ruleStatusOld;
      if (['01', '03'].indexOf(ruleStatusOld) != -1) {
        ruleStatus = '02';
      } else {
        _this.$message({
          message: '该规则已经启用，请勿重复启用',
          type: 'warning'
        });
        return;
      }
      selectionsAry[0].ruleStatus = ruleStatus;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/cfgplabcmrule/updateByRuleStatus',
        data: JSON.stringify(selectionsAry[0]),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('操作成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },


    /**
     * 停用
     */
    end: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let ruleStatusOld = selectionsAry[0].ruleStatus;
      let ruleStatus = ruleStatusOld;
      if (['01', '02'].indexOf(ruleStatusOld) != -1) {
        ruleStatus = '03';
      } else {
        _this.$message({
          message: '该规则已经停用，请勿重复停用',
          type: 'warning'
        });
        return;
      }
      selectionsAry[0].ruleStatus = ruleStatus;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/cfgplabcmrule/updateByRuleStatus',
        data: JSON.stringify(selectionsAry[0]),
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
};
</script>
