<template>

  <div>
    <yu-panel title="清收计划详情" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" v-model="searchFormdata" form-type="search" label-width="80px">
          <yu-xform-group :column="4">
            <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="清收年份" name="recoveryYear" ctype="datepicker" align="center" type="year"   ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-button-drop style="margin-top:30px">
        <yu-button type="primary" @click="payBackFn" v-if="checkCtrl('view')">还款情况</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="清收计划编号" prop="recoverySerno" hide-column ></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额(元)" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额(元)" prop="loanBalance" :formatter="Currency" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="资产类型" prop="assetType" data-code="STD_ASSET_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="处置方式" prop="dispMode" data-code="STD_DISP_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="预计清收金额(元)" prop="recoveryAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="清收年份"  prop="recoveryYear" :formatter="Formatter"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import { dateFormat } from '@/utils';
// 获取仓库数据
yufp.lookup.reg('STD_DISP_TYPE, STD_ASSET_TYPE');
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisNpam + '/api/plaplandetail/queryAll'
    };
  },

  methods: {
    /**
     *接收时间格式化
     */
    Formatter: function (row, column) {
      var dt = '';
      if (row.recoveryYear) {
        var timeDt = new Date(row.recoveryYear);
        dt = dateFormat(timeDt, '{y}');
      } else {
        dt = '';
      }
      return dt;
    },

    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },

    /* 删除 */
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

      var ppdSerno = selectionsAry[0].ppdSerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plaplandetail/delete/' + ppdSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      _this.$refs.refTable.remoteData();
                    }
                  });
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
    },
    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.refTable.remoteData();
    },
    /* 还款详情 */
    payBackFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var billNo = selectionsAry[0].billNo;
      _this.$router.addTab({
        name: 'zrcbank/npam/recoveryPlan/planForXd',
        key: 'cfgAssistantUpdate' + new Date().getTime(), // 必传
        title: '还款详情',
        data: {
          viewType: 'EDIT',
          billNo: billNo
        }
      });
    }

  }
};
</script>
