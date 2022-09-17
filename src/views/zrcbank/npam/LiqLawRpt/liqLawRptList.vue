
<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法诉讼管理
  -->
  <div>
  <yu-tabs v-model="activeName">
   <yu-tab-pane label="诉讼申请" name="base">
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="当事人客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
            <yu-xform-item label="当事人客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both" ></yu-xform-item>
            <yu-xform-item label="审批状态" placeholder="——请选择——" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="诉讼申请列表" :hideFilter="false" :collapseHide="false" style="margin-top:15px">
        <yu-button-drop>
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="业务流水号" prop="appSerno" width="180"></yu-xtable-column>
        <yu-xtable-column align="center" label="申请事项" prop="appEven" width="120" data-code="STD_APP_EVEN"></yu-xtable-column>
        <yu-xtable-column align="center" label="诉讼方案名称" prop="planName" width="140"></yu-xtable-column>
        <yu-xtable-column align="center" label="当事人客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="当事人客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="标的金额（元）" prop="totalAmt" width="120" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="本金金额（元）" prop="capAmt" width="120" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息总额(元)" prop="totalTqlxAmt" width="150" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" width="160"></yu-xtable-column>
        <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="120"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
   </yu-tab-pane>
   <yu-tab-pane label="诉讼申请历史" name="two">
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTableHis" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="当事人客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
            <yu-xform-item label="当事人客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="审批状态" placeholder="——请选择——" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
     </yu-panel>
    <yu-panel title="诉讼申请列表" :hideFilter="false" :collapseHide="false" style="margin-top:15px">
       <yu-button-drop>
        <yu-button type="primary" @click="infoHisFn">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTableHis" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParamHis" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="业务流水号" prop="appSerno" width="180"></yu-xtable-column>
        <yu-xtable-column align="center" label="申请事项" prop="appEven" width="120" data-code="STD_APP_EVEN"></yu-xtable-column>
        <yu-xtable-column align="center" label="诉讼方案名称" prop="planName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="当事人客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="当事人客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="标的金额（元）" prop="totalAmt" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="本金金额（元）" prop="capAmt" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息总额（元）" prop="totalTqlxAmt"  width="150"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
   </yu-tab-pane>
  </yu-tabs>

  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixin from '@/utils/mixin';
export default {
  mixins: [mixin],
  data: function () {
    return {
      searchFormdata: {},
      activeName: 'base',
      dataUrl: backend.cmisNpam + '/api/plalawapp/queryPlaLawAppList',
      baseParams: {
        condition: {liqLawHis: 'liqLaw'},
        sort: 'update_time'
      },
      baseParamHis: {
        condition: {liqLawHis: 'liqLawHis'},
        sort: 'update_time'
      }
    };
  },
  methods: {
    getReturn: function () {
      this.$ref.refTable.remoteData();
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/npam/LiqLawRpt/liqLawRptDetail/plaLawAppGudie',
        key: 'addPlaLawApp', // 必传
        title: '诉讼申请向导',
        data: {
          getReturn: _this.getReturn
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      let selectAry = _this.$refs.refTable.selections;
      if (selectAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var statusFlag = selectAry[0].approveStatus === '000' || selectAry[0].approveStatus === '992'; // 000为待发起,992为打回
      if (!statusFlag) { // 判断是否为待发起
        _this.$message({
          message: '请选择审批状态为待发起或打回的申请',
          type: 'warning'
        });
        return;
      }
      var appSerno = _this.$refs.refTable.selections[0].appSerno;
      var userId = _this.$refs.refTable.selections[0].inputId;
      var orgId = _this.$refs.refTable.selections[0].inputBrId;
      this.$router.addTab({
        name: 'zrcbank/npam/LiqLawRpt/liqLawRptDetail/plaLawAppDetail',
        key: 'editPlaLawApp' + appSerno, // 必传
        title: '诉讼申请修改',
        data: {
          appSerno: appSerno,
          userId: userId,
          orgId: orgId,
          viewType: 'EDIT',
          getReturn: _this.getReturn
        }
      });
    },
    infoHisFn: function () {
      var _this = this;
      if (_this.$refs.refTableHis.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var appSerno = _this.$refs.refTableHis.selections[0].appSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/LiqLawRpt/liqLawRptDetail/plaLawAppDetail',
        key: 'detailPlaLawApp' + appSerno, // 必传
        title: '诉讼申请详情',
        data: {
          appSerno: appSerno,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var appSerno = _this.$refs.refTable.selections[0].appSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/LiqLawRpt/liqLawRptDetail/plaLawAppDetail',
        key: 'detailPlaLawApp' + appSerno, // 必传
        title: '诉讼申请历史详情',
        data: {
          appSerno: appSerno,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
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
      if (selectionsAry[0].approveStatus == '111' || selectionsAry[0].approveStatus == '992') {
        _this.$message({
          message: '审批中和退回的数据无法删除',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plalawapp/delete/',
              data: JSON.stringify(selectionsAry[0]),
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>
