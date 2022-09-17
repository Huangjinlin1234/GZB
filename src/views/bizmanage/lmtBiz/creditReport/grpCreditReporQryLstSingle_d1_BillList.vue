<template>
  <div>
    <yu-panel title="征信查询申请表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsect" v-if="!onlyView" @click="customClick('doInsect')">新增</yu-button>
          <yu-button ref="btn_doUpdate" v-if="!onlyView" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$delete" v-if="!onlyView" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_doCreditReportView" @click="customClick('doCreditReportView')">查看征信报告</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ qryCls: '0' }" :default-load="true">
        <yu-xtable-column label="与主借款人关系" prop="borrowRel" :options="dicOptions.borrowRelOptions"></yu-xtable-column>
        <yu-xtable-column label="征信查询原因" prop="qryResn" :options="dicOptions.qryResnOptions"></yu-xtable-column>
        <yu-xtable-column label="征信查询对象名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="查询对象证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" :options="dicOptions.approveStatusOptions"></yu-xtable-column>
        <yu-xtable-column label="是否成功发起" prop="isSuccssInit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="报告生成时间" prop="reportCreateTime"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operate" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import dialogBillcard from "./grpCreditReporQryLstSingle_dialog_BillCard";
export default {
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "crqlSerno",
      dicOptions: { borrowRelOptions: [{ key: "001", value: "主借款人" }, { key: "005", value: "共同借款人" }, { key: "007", value: "担保人" }, { key: "008", value: "法定代表，出资人及关联人等" }, { key: "009", value: "其他关系人" }], qryClsOptions: [{ key: "0", value: "个人" }, { key: "1", value: "企业" }, { key: "3", value: "苏州地方" }], qryResnOptions: [{ key: "02", value: "贷款审批" }, { key: "08", value: "担保资格审查" }, { key: "22", value: "法人代表，出资人及关联人等资信查询" }, { key: "25", value: "资信审查" }, { key: "27", value: "贷后管理" }], authbookContentOptions: [{ key: "001", value: "审核本人贷款申请" }, { key: "002", value: "审批本人贷记卡" }, { key: "003", value: "审核本人作为担保人" }, { key: "004", value: "对已发放的信贷业务进行贷后风险管理" }, { key: "005", value: "受理法人或其他组织的贷款申请或其作为担保人，需要查询本人作为法定代表人、出资人及关联人信用情况" }, { key: "006", value: "对公业务贷后管理需要查询本人作为法定代表人、出资人及关联人信用状况" }, { key: "007", value: "特约商户实名审查" }, { key: "008", value: "处理本人的征信异议" }, { key: "009", value: "其他支行认为需要查询本人的信用状况" }, { key: "010", value: "资信审查" }], approveStatusOptions: [{ key: "000", value: "待发起" }, { key: "111", value: "审批中" }, { key: "997", value: "审批通过" }], qryStatusOptions: [{ key: "001", value: "查询中" }, { key: "002", value: "查询失败" }, { key: "003", value: "已查询" }], qryFlagOptions: [{ key: "01", value: "人工" }, { key: "02", value: "业务发起" }] },
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisBiz + "/api/creditreportqrylst/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/creditreportqrylst/delete/",
      onlyView: false
    };
  },
  mounted() {
    console.log(this.getFactory().contextData);
    if (this.getFactory().contextData.op == "VIEW") {
      this.onlyView = true;
    }
  }
};
</script>
