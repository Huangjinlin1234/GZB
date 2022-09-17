
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
          <yu-xform-item label="行名" ctype="input" placeholder="行名" name="bankName"  fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="地区代码" ctype="input" placeholder="地区代码" name="areaCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="行名行号配置" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop>
        <yu-button type="primary" @click="addFn">新增</yu-button>
        <yu-button type="primary" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" @click="deleteFn">删除</yu-button>
        <yu-button type="primary" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST">
        <yu-xtable-column label="行号" prop="bankNo"></yu-xtable-column>
        <yu-xtable-column label="行名" prop="bankName"></yu-xtable-column>
        <yu-xtable-column label="行政地区" prop="areaName"></yu-xtable-column>
        <yu-xtable-column label="地区代码" prop="areaCode"></yu-xtable-column>
        <yu-xtable-column label="联系电话" prop="phone"></yu-xtable-column>
        <yu-xtable-column label="邮政编码" prop="postcode"></yu-xtable-column>
        <yu-xtable-column label="地址" prop="addr"></yu-xtable-column>
        <yu-xtable-column label="上级行" prop="superBankNo"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>

export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisCfg + '/api/cfgbankinfo/queryList',
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
        name: 'cfgmanage/cfgBizParamInfoList/plaBcmAssignTask',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '行名行号配置新增',
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
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var bankNo = selectionsAry[0].bankNo;
      _this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/cfgBizParamInfoList/plaBcmAssignTaskUpdate',
        // 自定义唯一页签key
        key: bankNo + new Date().getTime(), // 必传
        // 页签名称
        title: '行名行号配置修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          bankNo: bankNo
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
      var bankNo = selectionsAry[0].bankNo;
      _this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/cfgBizParamInfoList/plaBcmAssignTaskUpdate',
        // 自定义唯一页签key
        key: bankNo + 1, // 必传
        // 页签名称
        title: '催收任务人工指派查看',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          bankNo: bankNo
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
      var bankNo = selectionsAry[0].bankNo;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCfg + '/api/cfgbankinfo/delete',
              data: bankNo,
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
