<template>
  <!--
    @created by dongan
    @description 更多问题交流列表界面
    -->
  <div>
    <!-- <yu-xdialog title="问题交流"> -->
    <yu-panel>
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
        <yu-xform-group :column="3">
          <yu-xform-item label="问题和意见" placeholder="输入关键字模糊查询" name="content" ctype="input" fuzzy-query="both" />
          <yu-xform-item label="问题类型" placeholder="---请选择---" name="messageType" ctype="select" data-code="STD_WB_PRB_MESSAGE_TYPE" />
          <yu-xform-item label="问题状态" placeholder="---请选择---" name="status" ctype="select" data-code="STD_WB_PRB_STATUS" />
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button @click="addFn" :hidden="addDisable">发布问题</yu-button>
        <yu-button v-if="checkCtrl('viewproblem')" @click="infoFn">查看问题</yu-button>
        <yu-button v-if="checkCtrl('replyproblem')" @click="modifyFn" :hidden="modifyDisable">回复问题</yu-button>
      </yu-button-drop>
      <yu-xtable index selection-type="radio" ref="refTable" condition-key="condition" row-number :data="tableData" :base-params="params" :default-load="false" request-type="POST">
        <!--<yu-xtable-column label="流水号" prop="serno" width="" />-->
        <yu-xtable-column label="问题类型" prop="messageType" data-code="STD_WB_PRB_MESSAGE_TYPE" />
        <yu-xtable-column label="问题和意见" prop="content" width="300">
          <template slot-scope="scope">
            <a style="color:#20A0FF;" href="javaScript:void(0);" @click="$alert(scope.row.content, '详细内容', { confirmButtonText: '确定' })">
              {{ scope.row.content.length > 7 ? scope.row.content.substr(0, 7) + "..." : scope.row.content }}
            </a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="发布人姓名" prop="managerIdName" />
        <yu-xtable-column label="发布人所属机构" prop="managerBrIdName" width="150" />
        <yu-xtable-column label="发布时间" prop="pubTime" />
        <yu-xtable-column label="问题状态" prop="status" data-code="STD_WB_PRB_STATUS" />
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      dataUrl: backend.mock + '/api/wbprbcomm/',
      activeName: '1',
      searchFormdata: {}, // 查询条件框
      params: {},
      pages: 10,
      addDisable: null,
      modifyDisable: null,
      tableData: []
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    this.buttonInit();
  },
  methods: {
    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      if (viewType == 'DETAIL') {
        this.saveBtnShow2 = editable;
        this.saveBtnShow3 = editable;
      } else {
        this.saveBtnShow1 = editable;
      }
      this.viewType = viewType;
      this.dialogVisible = true;
      this.formDisabled = !editable;
    },

    /**
     * 下一步
     */
    saveFn: function () {},

    /**
     * 发布问题
     */
    addFn: function () {
      let _this = this;
      this.$dialog.open('发布问题', 'common/dashboard/bizpage/WbPrbCommAdd', 1200, 430, null, () => {
        _this.$refs.refTable.remoteData();
      });
    },

    /**
     * 查看问题
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      const WbPrbComm = {
        serno: obj.serno,
        option: '1'
      };
      this.$dialog.open('查看问题', 'common/dashboard/bizpage/WbPrbCommDetail', 1200, 600, WbPrbComm, () => {
        _this.$refs.refTable.remoteData();
      });
    },

    /**
     * 回复问题
     */
    modifyFn: function () {
      let _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      if (!(obj.status == '1' || obj.status == '3')) {
        _this.$message({
          message: '仅已提交、重新打开状态可回复',
          type: 'warning'
        });
        return;
      }
      const WbPrbComm = {
        serno: obj.serno,
        option: '2'
      };
      this.$dialog.open('回复问题', 'common/dashboard/bizpage/WbPrbCommDetail', 1200, 600, WbPrbComm, () => {
        _this.$refs.refTable.remoteData();
      });
    },
    // 按钮配置
    buttonInit () {
      let flag = false;
      let _this = this;
      // 是否系统管理员角色
      for (let i = 0; i < _this.roles.length; i++) {
        if (_this.roles[i].code == 'R001') {
          flag = true;
        }
      }
      if (flag) {
        _this.addDisable = true;// 发布按钮
        _this.modifyDisable = false;// 回复按钮
        // default 有值时，默认查询已提交、已回复、重新打开的问题
        // 管理员查所有
        _this.params = { condition: { default: '1'}, sort: 'pub_time desc,serno desc' };
      } else {
        _this.addDisable = false;// 发布按钮
        _this.modifyDisable = true;// 回复按钮
        // default 有值时，默认查询已提交、已回复、重新打开的问题
        _this.params = { condition: { default: '1', inputId: _this.loginCode}, sort: 'pub_time desc,serno desc' };
      }
    }
  }
};
</script>
