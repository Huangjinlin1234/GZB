<template>
  <div>
    <yu-panel title="评价外部评估机构" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="押品统一编号 " ctype="input" placeholder="押品统一编号 " name="guarNo"></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="yu-xcustom-ref" placeholder="押品分类名称" name="guarClassName" @select-fn="commonSelectFn" :mapping="{ guarTypeCdCnname: 'guarClassName', guarTypeCd: 'guarClassCode' }" width="80%" height="550" :parms="{ guarTypeState: '0' }" :selectionType="radio" pagePath="guarmanage/collateralInfo/guarRef/guarClassRefDialogIndex" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="外部评估机构" ctype="input" placeholder="外部评估机构" name="outOrgRegName"></yu-xform-item>
          <yu-xform-item label="评价状态" ctype="select" data-code="STD_ZB_EVAL_STATUS" placeholder="评价状态" name="evalStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_onEval" @click="onEval()">评分</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView()">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="评价任务ID" prop="evalTaskId" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="押品统一编号 " prop="guarNo" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="押品分类代码" prop="guarClassCode" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="押品分类名称" prop="guarClassCode" min-width="120px" :options="guarTypeOption"></yu-xtable-column>
        <yu-xtable-column  label="外部评估机构" prop="evalOutOrgName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="任务发起行" prop="evalTaskStartOrgName" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="任务发起日期" prop="taskStartDate" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="任务结束日期" prop="tastEndDate" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="任务发起人" prop="evalTaskStartName" width="100"></yu-xtable-column>
        <yu-xtable-column  label="评分" prop="evalScore"></yu-xtable-column>
        <yu-xtable-column  label="评价状态" prop="evalStatus" data-code="STD_ZB_EVAL_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import Template from "../../message/template/template";
yufp.lookup.reg("STD_ZB_EVAL_STATUS");
import mixinUtils from "@/utils/mixins/mixin-utils";
import { getGuarListInfo } from "@/api/utils/treeData";
export default {
  components: { Template },
  mixins: [mixinUtils],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevaloutorgscore/",
      baseParams: { sort: "evalTaskId desc" },
      deleteUrl: this.$backend.cmisEval + "/api/guarevaloutorgscore/delete/",
      searchFormdata: "",
      guarTypeOption: []
    };
  },

  mounted() {
    const _this = this;
    _this.getGuarClassInfo();
  },
  methods: {
    //评估按钮
    onEval() {
      const _this = this;
      if (this.$refs.refTable.selections.length == 0) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      _this.$xutils.clone(_this.$refs.refTable.selections[0], jsoPar);

      if (jsoPar.evalStatus == "02") {
        _this.$message("请选择待评价的数据");
        return;
      }
      let guarClassCode = jsoPar.guarClassCode;
      let guarClassName = "";
      let guarTypeOptions = _this.guarTypeOption;
      for (let i = 0; i < guarTypeOptions.length; i++) {
        if (guarTypeOptions[i].key == guarClassCode) {
          guarClassName = guarTypeOptions[i].value;
          break;
        }
      }
      jsoPar.guarClassName = guarClassName;

      _this.$dialog.open("评分", "evalmanage/evaloutorg/evaloutorgscoreupdateIndex", -1, -1, jsoPar, () => {
        _this.$refs.refTable.remoteData();
      });
    },
    //查看按钮
    onBillListView() {
      const _this = this;
      if (this.$refs.refTable.selections.length == 0) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      _this.$xutils.clone(_this.$refs.refTable.selections[0], jsoPar);
      let guarClassCode = jsoPar.guarClassCode;

      let guarClassName = "";
      let guarTypeOptions = _this.guarTypeOption;
      for (let i = 0; i < guarTypeOptions.length; i++) {
        if (guarTypeOptions[i].key == guarClassCode) {
          guarClassName = guarTypeOptions[i].value;
          break;
        }
      }
      jsoPar.guarClassName = guarClassName;
      _this.$dialog.open("评分", "evalmanage/evaloutorg/evaloutorgscoreupdateIndex", -1, -1, jsoPar);
    },
    getGuarClassInfo() {
      const _this = this;
      getGuarListInfo({ condition: { oprType: "01" }, size: 0 }).then(res => {
        if (res.code == "0") {
          res.data.map(item => {
            let option = {};
            option.value = item.guarTypeCdCnname;
            option.key = item.guarTypeCd;
            _this.guarTypeOption.push(option);
          });
          console.log(_this.guarTypeOption);
        }
      });
    }
  }
};
</script>
