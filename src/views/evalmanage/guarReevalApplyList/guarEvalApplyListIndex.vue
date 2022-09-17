<template>
  <div>
    <yu-panel title="押品初估申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="evalAppSerno"></yu-xform-item>
          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" name="guarNo"></yu-xform-item>
          <yu-xform-item
            label="经办人"
            ctype="yu-xuser"
            placeholder="经办人"
            name="inputIdName"
            @select-fn="
              data => {
                let _this = this;
                _this.searchFormdata.inputId = data.loginCode;
                _this.searchFormdata.inputIdName = data.userName;
              }
            "
          ></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" placeholder="经办日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="所有人编号" ctype="input" placeholder="所有人编号" name="guarCusId"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APP_ST" placeholder="申请状态" name="approveStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="doAdd">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate">修改</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
          <yu-button ref="btn_doDelete" @click="doDelete">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="baseParams" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="申请流水号" prop="evalAppSerno" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="押品编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column  label="所有人名称" prop="guarCusName" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="所有人编号" prop="guarCusId" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="评估方式" prop="evalWay" data-code="STD_ZB_EVAL_INOUT_TYPE"></yu-xtable-column>
        <yu-xtable-column  label="经办人" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column  label="经办日期" prop="inputDate" :formatter="dateFormat"></yu-xtable-column>
        <yu-xtable-column  label="经办机构" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column  label="申请状态" prop="approveStatus" data-code="STD_ZB_APP_ST"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg("STD_ZB_EVAL_INOUT_TYPE,STD_ZB_APP_ST");
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  components: {},
  mixins: [mixinUtils],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      pkField: "evalAppSerno",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevalapp/listQuery",
      baseParams: {
        condition: {
          oprType: "01"
        },
        sort: "eval_app_serno desc"
      },
      searchFormdata: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevalapp/delete/",
      logicDeleteUrl: this.$backend.cmisEval + "/api/guarevalapp/logicalDelete"
    };
  },
  mounted() {},
  methods: {
    /**
     *  押品价值初估申请--业务参数配置列表
     */

    // 新增申请
    doAdd() {
      this.$dialog.open("押品初估(申请)", "evalmanage/guarReevalApplyList/guarEvalApplyAddIndex", -1, -1, {}, () => {
        this.$refs.refTable.remoteData();
      });
    },

    // 修改
    doUpdate() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      this.$xutils.clone(selections[0], jsoPar); //克隆数据
      let approveStatus = jsoPar.approveStatus;
      if (approveStatus == "111" || approveStatus == "997" || approveStatus == "998") {
        this.$message.warning("状态为[审批中] [通过] [否决] 的记录不能修改!");
        return;
      }

      jsoPar["model_group_no"] = "CMG000132"; //押品价值初估
      jsoPar["op"] = "EDIT";

      // evalAppSerno
      // guarNo

      // 绘制修改页面
      this.$dialog.open("押品初估(修改)", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, jsoPar, () => {
        this.$refs.refTable.remoteData();
      });
    },

    doView() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      this.$xutils.clone(selections[0], jsoPar); //克隆数据
      jsoPar["model_group_no"] = "CMG000132"; //申请模板
      jsoPar["op"] = "VIEW";
      jsoPar["useBack"] = true;

      // 绘制修改页面
      this.$dialog.open("押品初估(查看)", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, jsoPar, null);
    },

    //逻辑删除
    doDelete() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      this.$xutils.clone(selections[0], jsoPar); //克隆数据
      const approveStatus = jsoPar.approveStatus;
      if (approveStatus != "000") {
        this.$message.warning("非待发起状态记录不能删除!");
        return;
      }

      this.onTableDataLogicDelete("refTable", () => {
        this.$refs.refTable.remoteData();
      });
    }
  }
};
</script>
