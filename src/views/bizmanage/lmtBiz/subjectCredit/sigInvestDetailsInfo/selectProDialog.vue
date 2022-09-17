<template>
  <div>
        <yu-panel title="授信批复列表" panel-type="simple">
          <yu-xform v-model="replySearchFormdata" related-table-name="replyTable" form-type="search" :remove-empty="true" label-width="120px">
            <yu-xform-group :column="2">
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" ></yu-xform-item>
              <yu-xform-item label="产品类型" placeholder="产品类型" name="lmtBizType" ctype="select" data-code="STD_ZB_PRD_BIZ_TYPE" ></yu-xform-item>
              <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button style="margin-bottom:10px;" type="primary" @click="backToAdd">选取返回</yu-button>
          <yu-xtable ref="replyTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="replyUrl" :base-params="replyParam" requestType="POST" :default-load="true">
            <yu-xtable-column label="申请编号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
            <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
            <yu-xtable-column label="产品类型" prop="lmtBizType"></yu-xtable-column>
            <yu-xtable-column label="授信金额(万元)" prop="lmtAmt">
              <template slot-scope="scope">
                <span>{{ numFn(scope.row.lmtAmt) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="managerIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="managerBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_REPLY_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="cancel">取消</yu-button>
    </div>
  </div>

</template>
<script>
import {numFn} from "@/utils/unitchange";
yufp.lookup.reg("STD_REPLY_STATUS,STD_ZB_PRD_BIZ_TYPE");
export default {
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      replyUrl: this.$backend.cmisBiz + "/api/lmtsiginvestacc/selectByModel",
      replyParam: {
        condition: JSON.stringify({ oprType: "01", accStatus: "01" }),
      },
      replySearchFormdata: {},
      numFn,
    };
  },
  methods: {
    /**
     * 选取返回
     */
    backToAdd() {
      var _this = this;
      let selection;
      // appType = "01"; //授信新增   03 授信续作
      
      selection = _this.$refs.replyTable.selections;
      selectData(selection);
      
      function selectData(arr) {
        if (arr.length !== 1) {
          _this.$message({
            message: "请先选择一条记录",
            type: "warning",
          });
          return;
        } else {
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
