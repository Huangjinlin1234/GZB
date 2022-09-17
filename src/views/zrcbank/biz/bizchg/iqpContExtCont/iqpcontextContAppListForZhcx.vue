
<template>
  <!--
    @created by creazyCder 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11 
    @updated by 2021-05-21 15:42:11
    @description 展期申请主表-增删改查
  -->
  <div>
    <yu-panel title="查询条件" panel-type="simple">
      <yu-xform related-table-name="refContTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" placeholder="模糊查询" name="iqpSerno" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="模糊查询" name="cusId" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="模糊查询" name="contNo" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
    <yu-panel title="展期协议列表" panel-type="simple">
        <yu-button-drop>
          <yu-button type="primary" @click="infoFn">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refContTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams" condition-key="condition">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="contApproveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>   
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  components: {},
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/iqpcontext/queryforzhcx',
      baseParams:{}
    };
  },
  methods: {
    /** 
     * 打印 TODO
     */
    printFn: function () {
      this.$message({
        message: '请先选择一条记录--开发中~~~~',
        type: 'warning'
      });
    },
    /**
     * 进入修改页面
     */
    jumpToEditPageFn: function (dataParam, op) {
      let params = yufp.clone(dataParam, {});
      params.op = op;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/bizchg/iqpContExtCont/iqpcontextContDetailMain', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_iqpContExtCont_' + op + '_' + dataParam.iqpSerno, // 必传
        // 页签名称
        title: '展期申请详情',
        // 传递的业务数据，可选配置
        data: params,
        afterTabClose: () => {
        }
      });
    },

    /**
     * 修改
     */
    signFn: function () {
      let _this = this;
      if (_this.$refs.refContTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refContTable.selections[0];
      //不是待发起和打回 不能修改
      if(obj.contApproveStatus != '000' && obj.contApproveStatus != '992'){
        _this.$message({
          message: '该条记录不是待发起或打回状态，无法签订！',
          type: 'warning'
        });
        return;
      }
      
      _this.jumpToEditPageFn(obj, 'EDIT');
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refContTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refContTable.selections[0];
      _this.jumpToEditPageFn(obj, 'VIEW');
    },  
  }
};
</script>
