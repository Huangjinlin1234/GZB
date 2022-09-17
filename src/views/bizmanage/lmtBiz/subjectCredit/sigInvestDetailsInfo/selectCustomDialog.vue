<template>
  <div>
    <yu-tabs type="card" v-model="activeName">
      <yu-tab-pane label="同业客户" name="first">
        <yu-panel title="同业客户机构基本信息查看" panel-type="simple">
          <yu-xform ref="refForm" form-type="search" v-model="customerSearchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="3">
              <yu-xform-item label="机构客户编号" ctype="input" placeholder="机构客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="社会信用代码" ctype="input" placeholder="社会信用代码" name="socialCreditCode" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="客户状态 " ctype="input" placeholder="客户状态 " name="cusState" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button style="margin-bottom:10px;" type="primary" @click="backToAdd">选取返回</yu-button>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :default-load="true" request-type="POST">
            <yu-xtable-column label="机构客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="社会信用代码" prop="socialCreditCode" width="100px"></yu-xtable-column>
            <yu-xtable-column label="机构名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerId" width="100px"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
            <yu-xtable-column label="客户状态 " prop="cusState"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="企业法人" name="second">
        <yu-panel title="业务合同" panel-type="simple">
          <yu-xform form-type="search" ref="refForm" v-model="bussinessSearchFormdata" label-width="120px" related-table-name="refTable1">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button style="margin-bottom:10px;" type="primary" @click="backToAdd">选取返回</yu-button>
          <yu-xtable ref="refTable1" :row-number="true" selection-type="radio" :pageable="true" :data-url="bussinessDataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" request-type="post">
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
            <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
            <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="cancel">取消</yu-button>
    </div>
  </div>

</template>
<script>
yufp.lookup.reg("STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_REPLY_STATUS");
export default {
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      dataUrl: this.$backend.cmisCus + "/api/cusintbank/",
      baseParams: {},
      bussinessDataUrl: backend.cmisCus + "/api/cusbase/",
      activeName: "first",
      replySearchFormdata: {},
      bussinessSearchFormdata: {},
      customerSearchFormdata: {},
      show: 4,
    };
  },
  mounted() {
    this.show = this.pageParams.hidden;
  },
  methods: {
    /**
     * 选取返回
     */
    backToAdd() {
      var _this = this;
      let selection;
      // cusCatalog = "2"; //企业法人  3 同业客户
      // appType = "01"; //授信新增   03 授信续作
      if (this.activeName == "first") {
        selection = _this.$refs.refTable.selections;
        selectData(selection, "3", "01");
      } else if (this.activeName == "second") {
        selection = _this.$refs.refTable1.selections;
        selectData(selection, "2", "01");
      } 
      function selectData(arr, cusCatalog, appType) {
        if (arr.length !== 1) {
          _this.$message({
            message: "请先选择一条记录",
            type: "warning",
          });
          return;
        } else {
          if (cusCatalog) {
            arr[0].cusCatalog = cusCatalog; //同业客户
          }
          arr[0].appType = appType; //授信新增
          _this.$dialog.close(_this.dialogId, arr[0]);
        }
      } 
    },
    /**
     * 取消
     */
    cancel() {
      this.$dialog.close(this.dialogId);
    },
  },
};
</script>
