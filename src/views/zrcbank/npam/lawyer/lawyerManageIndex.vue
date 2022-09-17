
<template>

  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search"  label-width="80px">
          <yu-xform-group :column="3">
            <yu-xform-item label="律师姓名" placeholder="精确查询" name="lawyerName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="律所名称" placeholder="精确查询" name="lawOfficeName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="律师信息列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
    <template>
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
    </template>
      <yu-xtable ref="refTable" condition-key="condition"  row-number :data-url="dataUrl" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" width="310" label="律师编号" prop="lawyerNo"></yu-xtable-column>
        <yu-xtable-column align="center" width="290" label="律师姓名" prop="lawyerName"></yu-xtable-column>
        <yu-xtable-column align="center" width="300" label="律所名称" prop="lawOfficeName"></yu-xtable-column>
        <yu-xtable-column align="center" width="290" label="联系电话" prop="lawyerTelNo"></yu-xtable-column>
        <yu-xtable-column align="center" width="290" label="律师状态" prop="lawyerStatus" data-code="STD_LAWYER_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_LAWYER_STATUS');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisNpam + '/api/plalawyerinfo/queryAll',
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
        name: 'zrcbank/npam/lawyer/lawyerMessage',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '律师信息新增',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'ADD',
          lawyerNo: this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ')
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let lawyerNo = selections[0].lawyerNo;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/lawyer/lawyerMessage',
        // 自定义唯一页签key
        key: 'EDIT' + new Date().getTime(), // 必传
        // 页签名称
        title: '维护页面',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          lawyerNo: lawyerNo
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var lawyerNo = selections[0];
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plalawyerinfo/selectByLawyerName',
              data: lawyerNo,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message(response.message);
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message({
                    message: response.message,
                    type: 'error'
                  });
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
