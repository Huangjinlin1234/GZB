<template>
  <div>
    <yu-panel title="摇号结果" panel-type="simple">
      <yu-xform related-table-name="refTable" ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="重摇编号" ctype="input" placeholder="重摇编号" name="relotAppNo"></yu-xform-item>
          <yu-xform-item label="评估公司名称" ctype="input" placeholder="评估公司名称" name="evalOutOrgName"></yu-xform-item>
          <yu-xform-item label="客户经理" ctype="yu-xuser" placeholder="客户编号" name="managerId" @select-fn="commonSelectFn" :mapping="{ loginCode: 'managerId', userName: 'userName' }" width="80%" height="550"></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="yu-xorg" placeholder="所属机构" name="managerBrId" @select-fn="commonSelectFn" :mapping="{ orgName: 'orgName', orgCode: 'managerBrId' }" width="80%" height="550"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_viewRelot" @click="viewRelot">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
        <yu-xtable-column  label="摇号编号" prop="relotAppNo"></yu-xtable-column>
        <yu-xtable-column  label="估值申请流水号" prop="evalAppSerno" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="押品统一编号" prop="guarNo" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="评估公司名称" prop="evalOutOrgName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="摇号时间" prop="relotDate"></yu-xtable-column>
        <yu-xtable-column  label="客户经理" prop="managerName"></yu-xtable-column>
        <yu-xtable-column  label="所属机构" prop="managerBrName" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="摇号状态" prop="relotStatus" data-code="STD_ZB_RELOT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog title="摇号信息明细" :visible.sync="dialogVisible" width="80%">
      <div style="overflow:hidden auto;height:100%">
        <yu-xform ref="refForm2" v-model="formdata1" label-width="140px" disabled>
          <yu-xform-group :column="2">
            <yu-xform-item label="摇号编号" ctype="input" placeholder="重摇编号" name="relotAppNo"></yu-xform-item>
            <yu-xform-item label="申请流水号" ctype="yu-xguar-eval" placeholder="申请流水号" name="evalAppSerno" @select-fn="commonSelectFn" :mapping="{ evalAppSerno: 'evalAppSerno', guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', inputId: 'inputId', inputBrId: 'inputBrId' }" width="80%" height="550" :parms="{}"></yu-xform-item>
            <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo"></yu-xform-item>
            <yu-xform-item label="担保分类名称" ctype="input" placeholder="担保分类名称" name="guarTypeCdCnname"></yu-xform-item>
            <yu-xform-item label="摇号时间" ctype="input" placeholder="摇号时间" name="relotDate"></yu-xform-item>
            <yu-xform-item label="评估公司编号" ctype="input" placeholder="评估公司编号" name="outOrgCode"></yu-xform-item>
            <yu-xform-item label="评估公司名称" ctype="input" placeholder="评估公司名称" name="evalOutOrgName" @select-fn="commonSelectFn" :mapping="{ evalAppSerno: 'evalAppSerno', guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', inputId: 'inputId', inputBrId: 'inputBrId' }" width="80%" height="550" :parms="{}"></yu-xform-item>
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="outOrgLinkName"></yu-xform-item>
            <yu-xform-item label="联系方式" ctype="input" placeholder="联系方式" name="outOrgLinkTelNo"></yu-xform-item>
            <yu-xform-item label="客户经理" ctype="input" placeholder="客户经理" name="managerName"></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrName"></yu-xform-item>
            <yu-xform-item label="摇号状态" ctype="select" data-code="STD_ZB_RELOT_STATUS" placeholder="摇号状态" name="relotStatus"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="cancelFn">关闭</yu-button>
          </div>
        </yu-xform>
      </div></yu-xdialog
    >
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
yufp.lookup.reg("STD_ZB_RELOT_STATUS");
export default {
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      formdata: {},
      formdata1: {},
      dialogVisible: false,
      dataUrl: this.$backend.cmisEval + "/api/guarevalrelotrst/selectRelotRst",
      baseParams: { condition: { relotStatus: "07" }, sort: "relot_date desc" }
    };
  },
  methods: {
    viewRelot() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let selectRowData = {};
      this.$xutils.clone(selections[0], selectRowData); //克隆数据
      this.dialogVisible = true;
      let params = { condition: { relotAppNo: selectRowData.relotAppNo } };
      this.$nextTick(() => {
        this.$refs.refForm2.resetFields();
        yufp.service.request({
          method: "GET",
          data: params,
          url: backend.cmisEval + "/api/guarevalrelotrst/selectRelotRst",
          callback: function(code, message, response) {
            if (response.code == 0) {
              yufp.clone(response.data[0], _this.formdata1);
            }
          }
        });
      });
    },

    /* 返回按钮*/
    cancelFn() {
      this.dialogVisible = false;
    }
  }
};
</script>
