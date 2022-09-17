
<template>
  <!--
    @created by creazyCder 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11 
    @updated by 2021-05-21 15:42:11
    @description 展期申请主表-增删改查
  -->
  <div>
    <yu-panel title="历史展期协议列表" panel-type="simple">
      <yu-xform related-table-name="refContHisTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoFn">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refContHisTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams" condition-key="condition">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="contApproveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="展期状态" prop="status">
          <template slot-scope="scope">
            {{ setStatus(scope.row.status)  }}
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/iqpcontext/query',
      formdata: {},
      baseParams:{condition:JSON.stringify({
        accApplyHistory: '1'
      }),sort : 'inputDate desc'}
    };
  },
  methods: {
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
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refContHisTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refContHisTable.selections[0];
      _this.jumpToEditPageFn(obj, 'VIEW');
    },
    
     setStatus(status){
      if(status == '0'){
        return '失败'
      } else if (status == '1'){
        return '成功'
      }else{
        return ''
      }
    }
  }
};
</script>
