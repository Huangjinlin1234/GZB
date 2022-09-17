
<template>
  <!--
    @created by
    @updated by  2018-8-16 修改代码规范
    @updated by  2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="formdata" label-width="120px">
          <yu-xform-group :column="2 ">
            <yu-xform-item label="破产公司编号" placeholder="精确查询" name="brokeComNo" ></yu-xform-item>
            <yu-xform-item label="破产公司名称" placeholder="模糊查询" name="brokeComName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="受理法院" placeholder="模糊查询" name="acceptCourt" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="破产案件编号" placeholder="精确查询" name="caseNo" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="破产案件列表" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <yu-button-drop>
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">进展登记</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams">
        <yu-xtable-column align="center" label="破产案件编号" prop="caseNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="破产公司编号" prop="brokeComNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="破产公司名称" prop="brokeComName"></yu-xtable-column>
        <yu-xtable-column align="center" label="受理法院" prop="acceptCourt"></yu-xtable-column>
        <yu-xtable-column align="center" label="案件进程" prop="caseProcess" data-code="STD_BROKE_CASE_PROCESS"></yu-xtable-column>
        <yu-xtable-column align="center" label="我行申报债权金额" prop="declareClaimsAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="法院裁定书落款日期" prop="courtDcmntsInscribeDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
// 注册字典项
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_GUAR_CHG_TYPE,STD_BROKE_CASE_PROCESS');
export default {
  mixins: [mixin],
  data: function () {
    return {
      formdata: {},
      baseParams:{sort:'inputDate desc'},
      dataUrl: backend.cmisNpam + '/api/plalawbrokecaseinfo/queryPlaLawBrokeCaseList'
    };
  },
  watch: {
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
        name: 'zrcbank/npam/plaLawBroke/plaLawBrokeGuide',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '破产案件新增向导',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          // recoverySerno: this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'),
          viewType: 'ADD'
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var brokeCaseNo = _this.$refs.refTable.selections[0].brokeCaseNo;
      this.$router.addTab({
        name: 'zrcbank/npam/plaLawBroke/plaLawBrokeDetil',
        key: 'editplaLawBroke' + new Date().getTime(), // 必传
        title: '破产案件修改',
        data: {
          brokeCaseNo: brokeCaseNo,
          viewType: 'EDIT',
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
      var brokeCaseNo = _this.$refs.refTable.selections[0].brokeCaseNo;
      this.$router.addTab({
        name: 'zrcbank/npam/plaLawBroke/plaLawBrokeDetil',
        key: 'detailplaLawBroke' + new Date().getTime(), // 必传
        title: '破产案件详情',
        data: {
          brokeCaseNo: brokeCaseNo,
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
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plalawbrokecaseinfo/delete/' + selectionsAry[0].brokeCaseNo,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.getReturn;
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
