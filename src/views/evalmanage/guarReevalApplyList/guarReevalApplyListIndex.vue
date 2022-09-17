<template>
  <div>
    <yu-panel title="押品价值重估申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" name="guarNo"></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" placeholder="经办日期" name="inputDate"></yu-xform-item>
          <yu-xform-item
            label="所有人编号"
            ctype="yu-xcustom"
            placeholder="所有人编号"
            name="guarCusId"
            @select-fn="
              data => {
                let _this = this;
                _this.searchFormdata.guarCusName = data.cusName;
              }
            "
            :mapping="{ cusId: 'guarCusId', cusName: 'guarCusName' }"
            width="1080px"
            height="480"
            :parms="{ belgLine: 'bl300', cusState: '20', oprType: '01' }"
          ></yu-xform-item>
          <yu-xform-item label="所有人名称" ctype="input" placeholder="所有人名称" name="guarCusName" disabled></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APP_ST" placeholder="审批状态" name="approveStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="doAdd">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate">修改</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
          <yu-button ref="btn_doDelete" @click="doDelete">删除</yu-button>
          <yu-button ref="btn_doCancel" @click="doCancel">取消</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
        <yu-xtable-column  label="申请流水号" prop="serno" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="押品编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column  label="经办人名称" prop="inputIdName" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="经办日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column  label="所有人名称" prop="guarCusName" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="所有人编号" prop="guarCusId" min-width="100"></yu-xtable-column>
        <yu-xtable-column  label="任务来源" prop="dataSour" min-width="100" data-code="STD_ZB_EVE_DATASOUR"></yu-xtable-column>
        <yu-xtable-column  label="经办机构" prop="inputBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column  label="审批状态" prop="approveStatus" data-code="STD_ZB_APP_ST"></yu-xtable-column>
      </yu-xtable>
    </yu-panel></div
></template>
<script>
yufp.lookup.reg("STD_ZB_EVAL_INOUT_TYPE,STD_ZB_APP_ST,STD_ZB_OPR_TYPE,STD_ZB_EVE_DATASOUR");
import mixiUtils from "@/utils/mixins/mixin-utils";
export default {
  components: {},
  mixins: [mixiUtils],
  props: {
    pageParams: Object,
    dialogId: String
  },

  data() {
    return {
      pkField: "serno",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/listQuery",
      baseParams: { condition: { oprType: "01" }, sort: "inputDate desc" },
      searchFormdata: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/delete/",
      logicDeleteUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/logicalDelete",
      cancelUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/updateSelectiveInfo"
    };
  },
  mounted() {},
  methods: {
    /**
     *  押品价值重估申请业务参数配置列表
     */
    // 新增申请
    doAdd() {
      this.$dialog.open("押品重估(申请)", "evalmanage/guarReevalApplyList/guarReevalApplyAddIndex", -1, -1, {}, () => {
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
      if ("111,997,998".indexOf(approveStatus) !== -1) {
        // this.$alert("该状态记录不能修改!", "提示");
         _this.$message.warning("该状态记录不能修改");
        return;
      }

      //guarNo
      //serno
      jsoPar["evalAppSerno"] = jsoPar.serno; //统一转成evalAppSerno
      jsoPar["model_group_no"] = "CMG000135"; //押品价值重估
      jsoPar["op"] = "EDIT";
      // 绘制修改页面
      this.$dialog.open("押品重估(修改)", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, jsoPar, () => {
        this.$refs.refTable.remoteData();
      });
    },

    doView() {
      //查看详情
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      this.$xutils.clone(selections[0], jsoPar); //克隆数据
      jsoPar["evalAppSerno"] = jsoPar.serno; //统一转成evalAppSerno
      jsoPar["model_group_no"] = "CMG000135"; //押品价值重估
      jsoPar["op"] = "VIEW";
      jsoPar["useBack"] = true;

      // 绘制修改页面
      this.$dialog.open("押品重估(查看)", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, jsoPar, null);
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
    },

    //取消重估
    doCancel() {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      this.$xutils.clone(selections[0], jsoPar); //克隆数据

      const approveStatus = jsoPar.approveStatus;
      if (approveStatus !== "000") {
        // this.$alert("非待发起状态记录不能取消重估!", "提示");
         _this.$message.warning("非待发起状态记录不能取消重估!");
        return;
      }
      let userInfo = this.$store.state.oauth;
      let dataParam = {};
      dataParam.serno = jsoPar.serno;
      dataParam.approveStatus = "990";
      dataParam.updId = userInfo.loginCode;
      dataParam.updBrId = userInfo.org.code;
      dataParam.updDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
      this.$request({
        async: false,
        url: this.cancelUrl,
        method: "POST",
        data: dataParam
      }).then(res => {
        if (res.data.code !== "0") {
          // this.$alert("取消失败，错误代码：" + res.code + ",错误信息：" + res.message, "提示");
          _this.$message.error("取消失败，错误代码：" + res.code + ",错误信息：" + res.message);
        } else {
          // this.$alert("取消成功", "提示");
          _this.$message.success("取消成功");
        }
      });
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
