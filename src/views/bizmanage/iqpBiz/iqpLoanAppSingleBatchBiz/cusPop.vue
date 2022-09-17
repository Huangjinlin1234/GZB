<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="客户信息">
      <yu-xform related-table-name="cusLmtTable" form-type="search" v-model="searchForInfo" label-width="100px">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="请输入客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="请输入客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="请输入证件号码" name="certCode"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="cusLmtTable" row-number condition-key="condition" row-key="pkId" :data-url="urls.coopSubInfoUrl" :base-params="Param" request-type="POST">
          <yu-xtable-column label="客户编号" prop="cusId" show-overflow-tooltip="true" sortable></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP" ></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode" show-overflow-tooltip="true"></yu-xtable-column>
          <yu-xtable-column label="客户类型" prop="cusType" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="开户日期" prop="openDate" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" v-if="show"></yu-xtable-column>
          <yu-xtable-column label="主管客户经理名称" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="backToAdd">选取返回</yu-button>
        <yu-button icon="yx-undo2" type="primary" @click="cancel">取消</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
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
    // _this.Param = { condition: JSON.stringify({ instuCde: '001', copType: '3' }) };
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.urls.coopSubInfoUrl = backend.cmisCus + '/api/cusbase/selectbycondition';
      _this.Param = { condition: JSON.stringify({ certType: 'A',
        cusState: '2',
        managerId: this.$xutils.getLoginUserInfo().loginCode }) };
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
