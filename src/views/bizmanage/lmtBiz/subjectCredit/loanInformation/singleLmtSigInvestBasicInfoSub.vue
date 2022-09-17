<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="单笔投资关联底层信息明细表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search">
        <yu-xform-group :column="4">
          <yu-xform-item placeholder="申请流水号" name="serno" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="底层客户编号" name="basicCusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="底层客户名称" name="basicCusName" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="yu-toolBar">
        <yu-button-group>
        </yu-button-group>
      </div>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" request-type="POST">
        <yu-xtable-column label="申请流水号" prop="serno" width="120"></yu-xtable-column>
        <yu-xtable-column label="底层客户编号" prop="basicCusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="底层客户名称" prop="basicCusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="底层客户大类" prop="basicCusCatalog" width="120" data-code="STD_ZB_CUS_CATALOG"></yu-xtable-column>
        <yu-xtable-column label="底层客户类型" prop="basicCusType" width="120" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="是否申报底层授信" prop="isAppBasicLmt" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="占用底层授信分项编号" prop="useBasicLmtSubSerno" width="120"></yu-xtable-column>
        <yu-xtable-column label="底层资产类型" prop="basicAssetType" width="120" data-code="STD_ZB_BOTT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="本项底层资产余额" prop="basicAssetBalanceAmt" width=""></yu-xtable-column>
        <yu-xtable-column label="底层资产名称" prop="basicAssetName" width="120"></yu-xtable-column>
        <yu-xtable-column label="底层资产到期日" prop="basicAssetEndDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="底层资产剩余期限" prop="basicAssetBalanceTerm" width=""></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType" width="120" data-code="STD_ZB_OPR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="最近更新人" prop="updId" width="120"></yu-xtable-column>
        <yu-xtable-column label="最近更新机构" prop="updBrId" width="120"></yu-xtable-column>
        <yu-xtable-column label="最近更新日期" prop="updDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" width="100"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="cancel">取消</yu-button>
      </div>
      <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应
          width="650px" height="380px" -->
      <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
        <yu-xform ref="refForm" label-width="100px" v-model="formdata" :disabled="formDisabled">
          <yu-xform-group>
            <yu-xform-item label="申请流水号" name="serno" rules="required" ctype="input"></yu-xform-item>
            <yu-xform-item label="底层客户编号" name="basicCusId" ctype="input"></yu-xform-item>
            <yu-xform-item label="底层客户名称" name="basicCusName" ctype="input"></yu-xform-item>
            <yu-xform-item label="底层客户大类" name="basicCusCatalog" ctype="select" data-code="STD_ZB_CUS_CATALOG"></yu-xform-item>
            <yu-xform-item label="底层客户类型" name="basicCusType" ctype="select" data-code="STD_ZB_CUS_TYP"></yu-xform-item>
            <yu-xform-item label="是否申报底层授信" name="isAppBasicLmt" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="占用底层授信分项编号" name="useBasicLmtSubSerno" ctype="input"></yu-xform-item>
            <yu-xform-item label="底层资产类型" name="basicAssetType" ctype="select" data-code="STD_ZB_BOTT_TYPE"></yu-xform-item>
            <yu-xform-item label="本项底层资产余额" name="basicAssetBalanceAmt" ctype=""></yu-xform-item>
            <yu-xform-item label="底层资产名称" name="basicAssetName" ctype="input"></yu-xform-item>
            <yu-xform-item label="底层资产到期日" name="basicAssetEndDate" ctype="input"></yu-xform-item>
            <yu-xform-item label="底层资产剩余期限" name="basicAssetBalanceTerm" ctype=""></yu-xform-item>
            <yu-xform-item label="操作类型" name="oprType" ctype="select" data-code="STD_ZB_OPR_TYPE"></yu-xform-item>
            <yu-xform-item label="登记人" name="inputId" ctype="input"></yu-xform-item>
            <yu-xform-item label="登记机构" name="inputBrId" ctype="input"></yu-xform-item>
            <yu-xform-item label="登记日期" name="inputDate" ctype="input"></yu-xform-item>
            <yu-xform-item label="最近更新人" name="updId" ctype="input"></yu-xform-item>
            <yu-xform-item label="最近更新机构" name="updBrId" ctype="input"></yu-xform-item>
            <yu-xform-item label="最近更新日期" name="updDate" ctype="input"></yu-xform-item>
            <yu-xform-item label="创建时间" name="createTime" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="修改时间" name="updateTime" ctype="datepicker"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

yufp.lookup.reg('STD_ZB_CUS_CATALOG,STD_ZB_CUS_TYP,STD_ZB_YES_NO,STD_ZB_BOTT_TYPE,STD_ZB_OPR_TYPE');

export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object, // 接口调用方传过来的数据
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/lmtsiginvestbasicinfosub/selectByModel',
      formdata: {},
      dialogVisible: false,
      Param: { condition: JSON.stringify({oprType: '01'}) },
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  methods: {
    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.refTable.selections[0];
      this.$dialog.close(this.dialogId, params);
    },
    /**
     * 取消
     */
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
