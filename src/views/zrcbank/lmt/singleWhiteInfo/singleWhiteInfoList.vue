
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="承兑行白名单额度列表">
      <yu-xform related-table-name="cusLmtTable" form-type="search" v-model="searchForInfo" label-width="100px">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="承兑行行号" name="aorgNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="cusLmtTable" row-number condition-key="condition" row-key="pkId" :data-url="urls.coopSubInfoUrl" :base-params="Param">
        <yu-xtable-column label="分项编号" prop="subAccNo"></yu-xtable-column>
        <yu-xtable-column label="承兑行客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="承兑行行号" prop="aorgNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="承兑行客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="白名单额度类型" prop="lmtWhiteType" width="120" data-code="STD_ZB_LMT_WHITE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="机构类型" prop="cusType" data-code="STD_ZB_INTB_SUB_TYPE"></yu-xtable-column>
        <yu-xtable-column label="限额（万元）" prop="sigAmt" width="120">
          <template slot-scope="scope">
            <span>{{ parseFloat(parseFloat(scope.row.sigAmt / 10000).toFixed(6)) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="已用金额" prop="sigUseAmt"></yu-xtable-column>
        <yu-xtable-column label="可用金额" prop="createAt">
          <template slot-scope="scope">
            <span>{{ parseFloat(parseFloat(scope.row.sigAmt - scope.row.sigUseAmt).toFixed(2)) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="生效日期" prop="startDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="endDate" width="100"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';


yufp.lookup.reg('STD_ZB_LMT_WHITE_TYPE,STD_ZB_INTB_SUB_TYPE');

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
    _this.Param = { condition: JSON.stringify({ oprType: '01' }) };
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.pageParams;
      _this.cusId = this.data.cusId;
      _this.aorgNo = this.data.aorgNo;
      _this.cusName = this.data.cusName;
      _this.urls.coopSubInfoUrl =
        backend.cmisLmt + '/api/lmtwhiteinfo/selectByModel';
      _this.Param = { condition: JSON.stringify({ cusId: _this.cusId, aorgNo: _this.aorgNo, cusName: _this.cusName }) };
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