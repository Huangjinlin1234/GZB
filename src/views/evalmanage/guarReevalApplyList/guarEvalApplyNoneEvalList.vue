<template>
  <yu-panel title="押品基本信息" panel-type="simple">
    <yu-xform form-type="search" v-model="searchFormData" :ref="refForm" :related-table-name="refTable" label-width="120px">
      <yu-xform-group :column="3">
        <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo"></yu-xform-item>
        <yu-xform-item label="押品名称" ctype="input" placeholder="押品名称" name="pldimnMemo"></yu-xform-item>
        <yu-xform-item label="押品所有人名称" ctype="input" placeholder="押品所有人名称" name="guarCusName"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-xtable :ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
      <yu-xtable-column  label="押品统一编号" prop="guarNo" min-width="150"></yu-xtable-column>
      <yu-xtable-column  label="担保分类名称" prop="guarTypeCdCnname" min-width="200"></yu-xtable-column>
      <yu-xtable-column  label="押品所有人编号" prop="guarCusId" min-width="150px"></yu-xtable-column>
      <yu-xtable-column  label="押品所有人名称" prop="guarCusName" min-width="170px"></yu-xtable-column>
      <yu-xtable-column  label="押品所有人证件类型" prop="guarCertType" min-width="170" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
      <yu-xtable-column  label="押品所有人证件号码" prop="guarCertCode" min-width="170"></yu-xtable-column>
      <yu-xtable-column  label="押品所在业务阶段" prop="guarBizState" data-code="STD_ZB_GUAR_BUSISTATE" min-width="170px"></yu-xtable-column>
      <yu-xtable-column  label="创建系统/来源系统" prop="sysSour"  data-code="STD_ZB_DATA_SOURCE" min-width="170px"></yu-xtable-column>
      <yu-xtable-column  label="管户人" prop="accountManagerName" min-width="80"></yu-xtable-column>
    </yu-xtable>
    <div style="text-align:center;">
      <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
      <el-button @click="clearFn" size="small">取消</el-button>
    </div>
  </yu-panel>
</template>
<script>
  yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_GUAR_BUSISTATE,STD_ZB_DATA_SOURCE');
  import popList from "@/utils/mixins/pop-list";
  export default {
    mixins: [popList],
    props: {
      pageParams: Object,
      dialogId: String,
    },
    data: function() {
      return {
        dataUrl: this.$backend.cmisGuar + "/api/guarbaseinfo/queryNoneEvalGuarInfo",
        //押品状态为已创建的押品才能估值
        baseParams: {condition:{oprType: '01', guarWay:"ZY,DY", guarStatus: '02'}},
        refForm: 'refForm' + new Date().getTime(),
        refTable: 'refTable' + new Date().getTime(),
        searchFormData: {}
      };
    },
    methods: {
      confirmFn: function () {
        const _this = this;
        let selectRow = _this.$refs[this.refTable].selections[0];
        if (!selectRow) {
          _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
          return;
        }
        _this.$dialog.close(_this.dialogId, selectRow);
      },
      clearFn: function () {
        const _this = this;
        _this.$dialog.close(_this.dialogId);
      }
    }
  };
</script>


