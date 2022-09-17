<template>
  <div>
    <yu-panel title="外部评估机构准入管理列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="组织机构代码" ctype="input" placeholder="组织机构代码" name="outOrgCode"></yu-xform-item>
          <yu-xform-item label="评估机构名称" ctype="input" placeholder="评估机构名称" name="evalOutOrgName"></yu-xform-item>
          <yu-xform-item label="准入状态" ctype="select" data-code="STD_ZB_ADMIT_STATE" placeholder="准入状态" name="outOrgAdmitStatus"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-group>
          <yu-button ref="btn_onInsert" @click="onInsert">新增</yu-button>
          <yu-button ref="btn_onUpdate" @click="onUpdate">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="onDelete">删除</yu-button>
          <yu-button ref="btn_onView" @click="onView">查看</yu-button>
          <yu-button ref="btn_byImport" @click="byImport">导入</yu-button>
          <yu-button ref="btn_byModelDown" @click="byModelDown">模板下载</yu-button>
        </yu-button-group>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column  label="组织机构代码" prop="outOrgCode" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="评估机构名称" prop="evalOutOrgName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="联系人名称" prop="outOrgLinkName" min-width="100px"></yu-xtable-column>
        <yu-xtable-column  label="准入状态" prop="outOrgAdmitStatus" data-code="STD_ZB_ADMIT_STATE"></yu-xtable-column>
        <yu-xtable-column  label="登记人" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column  label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
yufp.lookup.reg("OUT_ORG_ASS_TYPE", "STD_ZB_PLD_AREA", "STD_ZB_ADMIT_STATE", "STD_ZB_OPR_TYPE");
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
      baseParams: {},
      deleteUrl: this.$backend.cmisEval + "/api/guarevaloutorgauapp/delete/"
    };
  },
  provide() {
    let _this = this;
    return {
      onInsert: _this.onInsert,
      onUpdate: _this.onUpdate,
      onDelete: _this.onDelete,
      onView: _this.onView,
      byImport: _this.byImport,
      byModelDown: _this.byModelDown
    };
  },
  mounted() {
    let _this = this;
    _this.baseParams = { condition: JSON.stringify({ oprType: "01", outOrgAdmitStatusIsSignOut: "1" }) };
    _this.$refs.refTable.remoteData(_this.baseParams);
  },
  methods: {
    // 新增
    onInsert() {
      let _this = this;
      _this.$dialog.open("", "evalmanage/evaloutorg/evaloutorgsignoutaddIndex", -1, -1, null);
    },

    // 修改
    onUpdate() {
      let _this = this;
      let jsoPar = _this.$refs.refTable.selections;

      if (jsoPar.length <= 0 || jsoPar[0] == "") {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        // this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      _this.$dialog.open("基本信息修改", "evalmanage/evaloutorg/evaloutorgsignoutupdateIndex", -1, -1, jsoPar);
    },

    // 查看
    onView() {
      let _this = this;
      let jsoPar = _this.$refs.refTable.selections;

      if (jsoPar.length <= 0 || jsoPar[0] == "") {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        // this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      this.$dialog.open("基本信息", "evalmanage/evaloutorg/evaloutorgsignoutviewIndex", -1, -1, jsoPar);
    },
    // 模板下载
    byModelDown() {
      let _this = this;
      _this.$dialog.open("制式模板文件下载", "cfgmanage/cfgStandardTemplate/cfgStandardTemplateFileDownloadIndex", -1, -1, null);
    },
    // 利率配置批量数据导入
    byImport() {
      let _this = this;
      _this.$dialog.open("文件导入", "evalmanage/evaloutorg/evaloutorgsignoutimporttemplateIndex", -1, -1, null);
    },
    // 逻辑删除
    onDelete() {
      let _this = this;
      let row = _this.$refs.refTable.selections;

      if (row.length <= 0 || row.length[0] == "") {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        // this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      _this
        .$request({
          // 同步请求
          async: false,
          method: "POST",
          url: _this.$backend.cmisEval + "/api/guarevaloutorgauapp/delete/" + row[0].pkId
        })
        .then(({ code, message, data }) => {
          if (code == "0" && data.data) {
            _this.$message({ message: '删除成功', type: 'success' });
          } else {
            _this.$message.error("删除失败!");
          }
        });
    }
  }
};
</script>
