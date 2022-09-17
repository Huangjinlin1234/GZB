<template>
  <div>
    <yu-panel title="作业流关联节点配置列表" panel-type="normal">
      <template>
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert" v-show="btnShow">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate" v-show="btnShow">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete" v-show="btnShow">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="节点编号" prop="nodeId"></yu-xtable-column>
        <yu-xtable-column label="节点名称" prop="nodeName"></yu-xtable-column>
        <yu-xtable-column label="审批查看模板组" prop="apprViewUrl"></yu-xtable-column>
        <yu-xtable-column label="审批调整模板组" prop="apprAdjustTpl"></yu-xtable-column>
        <yu-xtable-column label="是否需要打回/退回原因" prop="isOptTyp" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="业务规则方案编号" prop="planId"></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="customClick('onSave')" v-show="saveBtnShow">保存</yu-button>
        <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
      </yu-form-buttons>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import dialogBillcard from "./cfgJobFlowDetail_dialog_BillCard";
export default {
  name: "d1_B_BillList",
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgjobflownode/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgjobflownode/delete/",
      btnShow: true,
      saveBtnShow: true
    };
  },
  methods: {
    dealEditButton(flag) {
      this.btnShow = flag;
      this.saveBtnShow = flag;
      this.disabled = true;
    }
  }
};
</script>
