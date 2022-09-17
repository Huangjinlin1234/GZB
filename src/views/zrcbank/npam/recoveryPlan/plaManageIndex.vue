
<template>
  <!--
    @created by wyh  lq
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="80px">
          <yu-xform-group :column="4">
            <yu-xform-item label="清收年份" name="recoveryYear" ctype="datepicker" align="center" type="year"></yu-xform-item>
            <yu-xform-item label="登记日期" placeholder="精确查询" name="inputDate" ctype="datepicker"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="清收计划管理" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop>
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams">
        <yu-xtable-column align="center" label="清收计划编号" prop="recoverySerno"></yu-xtable-column>
        <yu-xtable-column align="center" label="清收年份" prop="recoveryYear" :formatter="formatter"></yu-xtable-column>
        <yu-xtable-column align="center" label="预计清收金额(元)" prop="recoveryTotalAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
export default {
  mixins: [mixin],
  data: function () {
    return {
      searchFormdata: {},
      baseParams:{sort:'inputDate desc'},
      dataUrl: backend.cmisNpam + '/api/plaplan/queryAll',
      viewType: 'DETAIL'
    };
  },

  methods: {
    formatter (row) {
      var res = row.recoveryYear.split('-');
      return res[0];
    },
    /* 更新页面表格数据 */
    updateFn () {
      this.$refs.refTable.remoteData();
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/recoveryPlan/plaManageDetail',
        // 自定义唯一页签key
        key: new Date().getTime() + 1, // 必传
        // 页签名称
        title: '清收新增',
        // 传递的业务数据，可选配置
        data: {
          updateFn: _this.updateFn,
          recoverySerno: this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'),
          viewType: 'ADD'
        }
      });
    },

    /**
     * 修改
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
      var recoverySerno = selectionsAry[0].recoverySerno;
      _this.$router.addTab({
        name: 'zrcbank/npam/recoveryPlan/plaManageDetail',
        key: 'cfgAssistantUpdate' + recoverySerno, // 必传
        title: '维护页面',
        data: {
          viewType: 'EDIT',
          recoverySerno: recoverySerno
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

      var recoverySerno = selectionsAry[0].recoverySerno;
      _this.$router.addTab({
        name: 'zrcbank/npam/recoveryPlan/plaManageDetail',
        key: 'cfgAssistant' + recoverySerno, // 必传
        title: '查看页面',
        data: {
          viewType: 'DETAIL',
          recoverySerno: recoverySerno
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
      var recoverySerno = selectionsAry[0].recoverySerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plaplan/delete/' + recoverySerno,
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
    }
  }
};
</script>
