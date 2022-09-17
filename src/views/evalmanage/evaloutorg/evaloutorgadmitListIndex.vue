<template>
  <div>
    <yu-panel title="外部评估机构管理列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px"
                related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="组织机构代码" ctype="input" placeholder="组织机构代码" name="outOrgCode"></yu-xform-item>
          <yu-xform-item label="评估机构名称" ctype="input" placeholder="评估机构名称" name="evalOutOrgName"></yu-xform-item>
          <yu-xform-item label="准入状态" ctype="select" data-code="STD_ZB_ADMIT_STATE" placeholder="准入状态"
                         name="outOrgAdmitStatus"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-group>
          <yu-button ref="btn_onInsert" @click="onInsert">新增</yu-button>
          <yu-button ref="btn_onUpdate" @click="onUpdate">修改</yu-button>
          <!--<yu-button ref="btn_onDelete" @click="onDelete">删除</yu-button>-->
          <yu-button ref="btn_onView" @click="onView">查看</yu-button>
          <yu-button ref="btn_byImport" @click="byImport">导入</yu-button>
          <yu-button ref="btn_byModelDown" @click="byModelDown">模板下载</yu-button>
        </yu-button-group>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio"
                 :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
        <yu-xtable-column  label="流水号"
                          prop="serno"></yu-xtable-column>
        <yu-xtable-column  label="组织机构代码" prop="outOrgCode"
                          min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="评估机构名称"
                          prop="evalOutOrgName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="联系人名称"
                          prop="outOrgLinkName" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="准入状态"
                          prop="outOrgAdmitStatus" data-code="STD_ZB_ADMIT_STATE"></yu-xtable-column>
        <yu-xtable-column  label="登记人" prop="inputName"
                          width="100"></yu-xtable-column>
        <yu-xtable-column  label="登记机构" prop="inputBrName"
                          width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";

yufp.lookup.reg("OUT_ORG_ASS_TYPE,STD_ZB_PLD_AREA,STD_ZB_ADMIT_STATE,STD_ZB_OPR_TYPE");
export default {
  mixins: [mixinUtils],
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
      dataUrl: this.$backend.cmisEval + "/api/guarevaloutorgauapp/",
      baseParams: {condition: JSON.stringify({oprType: "01"}), sort: "input_date desc"},
      deleteUrl: this.$backend.cmisEval + "/api/guarevaloutorgauapp/delete/"
    };
  },
  mounted() {
  },
  methods: {
    refreshTableData() {
      const _this = this;
      _this.$refs.refTable.remoteData();
    },
    // 新增
    onInsert() {
      let _this = this;
      _this.$dialog.open("", "evalmanage/evaloutorg/evaloutorgadmitaddIndex", -1, -1, null, _this.refreshTableData);
    },

    // 修改
    onUpdate() {
      const _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      this.$xutils.clone(selections[0], jsoPar); //克隆数据

      _this.$dialog.open("基本信息修改", "evalmanage/evaloutorg/evaloutorgadmitupdateIndex", -1, -1, jsoPar, _this.refreshTableData);
    },

    // 查看
    onView() {
      let _this = this;
      let jsoPar = _this.$refs.refTable.selections;

      if (jsoPar.length <= 0 || jsoPar[0] == "") {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        // _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }

      _this.$dialog.open("基本信息", "evalmanage/evaloutorg/evaloutorgadmitviewIndex", -1, -1, jsoPar);
    },

    // 模板下载
    byModelDown() {
      let _this = this;
      let params = {
        jsoPar: ["CFG_OUT_EVAL_ORG_TEMP"]
      };

      _this.$dialog.open("制式模板文件下载", "cfgmanage/cfgStandardTemplate/cfgStandardTemplateFileDownloadIndex", -1, -1, params);
    },

    // 外部评估机构管理批量数据导入
    byImport() {
      let _this = this;
      _this.$dialog.open("文件导入", "evalmanage/evaloutorg/evaloutorgadmitimporttemplateIndex", -1, -1, {}, () => {
        _this.refreshTableData();
      });
    },

    // 批量导入成功,回调
    backList(response) {
      let _this = this;
      _this.$refs.refTable.remoteData();
    },

    // 逻辑删除
    onDelete() {
      let _this = this;
      let row = _this.$refs.refTable.selections;
      if (row.length <= 0 || row[0] == "") {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      _this.$confirm("你真的想删除选中的记录行? 请谨慎操作!", "提示", {
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            _this
              .$request({
                // 同步请求
                method: "POST",
                url: _this.$backend.cmisEval + "/api/guarevaloutorgauapp/update/",
                data: {serno: row[0].serno, oprType: "02"}
              })
              .then(res => {
                if (res.code === "0" && res.data) {
                  _this.$message({message: '删除成功', type: 'success'});
                  _this.refreshTableData();
                } else {
                  _this.$message({message: '删除失败', type: 'error'});
                }
              });
          }
        }
      });
    }
  }
};
</script>
