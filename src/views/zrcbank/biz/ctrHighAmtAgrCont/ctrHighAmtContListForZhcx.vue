
<template>
  <!--
    @created by 屈文
    @description 最高额授信协议合同
  -->
  <div class="tab-search">
  <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" ref="refForm">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户名称" ctype="input"  placeholder="模糊查询" name="cusName"  fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="担保方式" ctype="select"  name="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
                <yu-xform-item label="合同编号" ctype="input"  placeholder="模糊查询" name="contNo" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input"  placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="协议状态" ctype="select" name="contStatus" data-code="STD_CONT_STATUS" :datacode-filter="datacodeFilterFn"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            </yu-panel>
          <yu-panel title="最高额授信协议列表" :hideFilter="false" :collapseHide="false">
            <yu-toolbar>
              <yu-button type="primary" @click="infoFn">查看</yu-button>
            </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="合同编号" prop="contNo" width:="140"></yu-xtable-column>
            <yu-xtable-column label="合同类型" prop="contType" width="120" data-code="STD_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="协议币种" prop="agrType" width:="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="协议金额" prop="agrAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="已用金额" prop="useAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width:="120" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="协议起始日" prop="startDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="协议到期日" prop="endDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="是否电子用印" prop="isESeal" data-code="STD_ZB_YES_NO" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同影像是否审核" prop="isOnlineDraw" data-code="STD_ZB_YES_NO" width="140"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="协议状态" prop="contStatus" width:="120" data-code="STD_CONT_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>

  </div>
</template>
<script>
// 字典项(担保方式、协议状态、合同类型、协议币种、是否、审批状态)
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_CONT_STATUS,STD_CONT_TYPE,STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_ZB_APPR_STATUS');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/ctrhighamtagrcont/selectbyquerymodel',
      activeName: 'messageTip',
      searchFormdata: {},
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 打印
    print: function () {

    },
    // 查看
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
      let jsoPar = _this.$refs.refTable.selections[0];
      // this.$router.addTab({
      // // 路由名称
      //   name: 'zrcbank/biz/ctrHighAmtAgrCont/ctrHighAmtContInfo',
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: 'custom_info', // 必传
      //   // 页签名称
      //   title: '协议信息',
      //   // 传递的业务数据，可选配置
      //   data: {
      //     data: jsoPar
      //   }
      // });
      jsoPar['model_group_no'] = 'CMG000653';
      jsoPar['op'] = 'EDIT';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    }
  }
};
</script>
