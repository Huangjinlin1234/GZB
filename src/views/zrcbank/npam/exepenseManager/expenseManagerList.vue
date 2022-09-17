
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <!--
              <yu-xform-item label="规则名称" placeholder="精确查询" name="ruleName" ></yu-xform-item>
              <yu-xform-item label="规则状态" name="ruleStatus" ctype="select" data-code="STD_RULE_STATUS"></yu-xform-item>
          -->
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" placeholder="模糊匹配" name="periSerno" ></yu-xform-item>
            <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="处置阶段" name="dispStage" ctype="select" data-code="STD_DISP_STAGE"></yu-xform-item>
            <yu-xform-item label="关联业务流水号" placeholder="精确匹配" name="serno" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>

      <div>
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
      </div>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="{sort:'createTime desc'}">
      <!--<yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :default-sort="{prop: 'inputDate', order: 'descending'}"-->
        <yu-xtable-column align="center" width="180" label="业务流水号" prop="periSerno"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column align="center" width="" label="处置阶段" prop="dispStage" data-code="STD_DISP_STAGE"></yu-xtable-column>
        <yu-xtable-column align="center" width="180" label="关联业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column align="center" width="" label="费用总额" prop="expenseTotalAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" width="" label="垫支总额" prop="advanceExpenAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" width="" label="列支总额" prop="rankAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" width="" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" width="150" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" width="" label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>

<script>
import mixin from '@/utils/mixin';
// 注册字典项
yufp.lookup.reg('STD_DISP_STAGE');
export default {
  mixins: [mixin],
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisNpam + '/api/plaexpenseregiinfo/selectByCondition',
      viewType: 'DETAIL'
    };
  },
  /* 列表数据更改后刷新 */
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
        name: 'zrcbank/npam/exepenseManager/addGudie',
        key: new Date().getTime(), // 必传
        title: '费用管理新增向导',
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
      let periSerno = selectionsAry[0].periSerno;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/exepenseManager/expenseRegister',
        // 自定义唯一页签key
        key: 'expenseRegister' + new Date().getTime(), // 必传
        // 页签名称
        title: '费用登记修改',
        data: {
          viewType: 'EDIT',
          periSerno: periSerno
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

      let periSerno = selectionsAry[0].periSerno;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/exepenseManager/expenseRegister',
        // 自定义唯一页签key
        key: 'expenseRegister' + new Date().getTime(), // 必传
        // 页签名称
        title: '费用登记查看',
        data: {
          viewType: 'DETAIL',
          periSerno: periSerno
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
      var periSerno = _this.$refs.refTable.selections[0].periSerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              // url: backend.cmisNpam + '/api/cfgplabcmrule/delete/' + ruleId,
              url: backend.cmisNpam + '/api/plaexpenseregiinfo/delete/' + periSerno,
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
