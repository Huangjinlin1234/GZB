<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="合作方分项/项目额度">
      <yu-xform related-table-name="cusLmtTable" form-type="search" v-model="searchForInfo" label-width="100px">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="合作方类型" name="copType" ctype="select" data-code="STD_PARTNER_TYPE"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="项目名称" name="limitSubName" ctype="input" fuzzy-query="both" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="cusLmtTable" row-number condition-key="condition" row-key="pkId" :data-url="urls.coopSubInfoUrl" :base-params="Param" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="合作方类型" prop="copType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="分项编号" prop="apprSubSerno"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="limitSubName"></yu-xtable-column>
        <!--<yu-xtable-column label="产品名称" prop="lmtBizTyprProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>-->
        <yu-xtable-column label="额度起始日" prop="startDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="额度到期日" prop="endDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
        <yu-xtable-column label="是否可循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="单户限额" prop="sigAmt" width="110"></yu-xtable-column>
        <yu-xtable-column label="单笔业务限额" prop="sigBussAmt" width="110"></yu-xtable-column>
        <yu-xtable-column label="授信总额" prop="avlAmt"></yu-xtable-column>
        <yu-xtable-column label="已用额度" prop="outstndAmt"></yu-xtable-column>
        <yu-xtable-column label="可用额度" prop="createAt">
          <template slot-scope="scope">
            <span>{{ parseFloat(parseFloat(scope.row.avlAmt - scope.row.outstndAmt).toFixed(2)) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button  type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

yufp.lookup.reg('STD_ZB_APPR_ST,STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_PARTNER_TYPE,STD_PRD_TYPE_PROP');

export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object, // 接口调用方传过来的数据
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      searchForInfo: {},
      urls: {
        coopSubInfoUrl: ''
      },
      formdata: {},
      saveBtnShow: true
    };
  },

  mounted () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.pageParams;
      _this.cusId = this.data.cusId;
      _this.instuCde = this.data.instuCde;
      _this.copType = this.data.copType;
      _this.cusName = this.data.cusName;
      _this.limitSubName = this.data.limitSubName;
      _this.urls.coopSubInfoUrl =
        backend.cmisLmt + '/api/apprcoopsubinfo/queryListByCusIdAndCopType';
      _this.Param = { condition: JSON.stringify({ cusId: _this.cusId, copType: _this.copType, instuCde: _this.instuCde, cusName: _this.cusName, limitSubName: _this.limitSubName }) };
    },

    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.cusLmtTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.cusLmtTable.selections[0];
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
