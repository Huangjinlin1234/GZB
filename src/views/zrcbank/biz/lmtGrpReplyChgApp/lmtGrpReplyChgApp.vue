<template>
  <!--
    @created by yangwl
    @time  2021/4/22
    @description 批复变更申请列表
  -->
  <div>
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="集团客户授信批复变更申请" name="base">
        <yu-panel title="集团客户授信批复变更申请">
          <yu-xform related-table-name="refTable" form-type="search" label-width="60px">
            <yu-xform-group :column="4">
              <yu-xform-item label="集团客户名称" placeholder="名称" ctype="input" name="grpCusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="集团客户编号" placeholder="编号" ctype="input" name="grpCusId"></yu-xform-item>
              <yu-xform-item label="批复编号" placeholder="编号" ctype="input" name="grpReplySerno"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="yu-toolBar">
            <yu-button-group>
              <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
              <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
              <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl"  request-type="post" condition-key="condition" :pageable="true">
            <yu-xtable-column label="变更流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="grpReplySerno" width="200"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号" prop="grpCusId"></yu-xtable-column>
            <yu-xtable-column label="集团客户名称" prop="grpCusName"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="集团客户授信批复变更历史" name="asset">
        <yu-panel title="集团客户授信批复变更历史">
          <yu-xform related-table-name="refTableHis" form-type="search" label-width="60px">
            <yu-xform-group :column="4">
              <yu-xform-item label="集团客户名称" placeholder="名称" ctype="input" name="grpCusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="集团客户编号" placeholder="编号" ctype="input" name="grpCusId"></yu-xform-item>
              <yu-xform-item label="批复编号" placeholder="编号" ctype="input" name="grpReplySerno"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="yu-toolBar">
            <yu-button-group>
              <yu-button type="primary" @click="viewFn" v-if="checkCtrl('view')">查看</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable ref="refTableHis" row-number :data-url="dataUrl2" request-type="post" condition-key="condition">
            <yu-xtable-column label="变更流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="grpReplySerno" width="200"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号" prop="grpCusId"></yu-xtable-column>
            <yu-xtable-column label="集团客户名称" prop="grpCusName"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="100px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="变更流水号" ctype="input" name="grpSerno"></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" name="grpReplySerno"></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName"></yu-xform-item>
          <yu-xform-item label="登记人" prop="inputIdName"></yu-xform-item>
          <yu-xform-item label="登记机构" prop="inputBrIdName" width="100"></yu-xform-item>
          <yu-xform-item label="登记人" prop="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" prop="inputBrId" width="100" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" v-show="saveBtnShow" @click="saveFn">保存</yu-button>
          <yu-button type="primary"  @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');

export default {
  data: function () {
    return {
      tabName: 'base',
      expandCollapseName: 'base',
      dataUrl: backend.cmisBiz + '/api/lmtgrpreplychg/queryAll',
      dataUrl2: backend.cmisBiz + '/api/lmtgrpreplychg/queryHis',
      formdata: {},
      saveBtnShow: true,
      formDisabled: false,
      viewType: 'ADD',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      dialogVisible: false
    };
  },
  methods: {
    viewFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTableHis.selections[0];
      if (_this.$refs.refTableHis.selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // _this.switchStatus("edit", true),
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtGrpReplyChgApp/lmtGrpReplyChgDetail',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtGrpReplyChgAppDetail_' + new Date().getTime(), // 必传
        // 页签名称
        title: '详情页面',
        // 传递的业务数据，可选配置
        data: {
          op: 'view',
          saveBtnShow: false,
          viewType: 'view',
          grpSerno: selectionAry.grpSerno
        }
      });
    },
    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      _this.dialogVisible = false;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisBiz + '/api/lmtgrpreplychg/'; // 新增
      if (_this.viewType == 'EDIT') {
        url = backend.cmisBiz + '/api/lmtgrpreplychg/updateSelective'; // 修改
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
            _this.dialogVisible = false;
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },

    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    /**
     * 切换表单输入项的状态，控制表单'取消'按钮的展示/隐藏
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.formDisabled = !editable;
      _this.saveBtnShow = editable;
    },

    /**
     * 新增
     */
    addFn: function () {
      this.$dialog.open(
        '变更新增向导页面',
        'zrcbank/biz/lmtGrpReplyChgApp/lmtGrpReplyChgAppVie',
        -1,
        -1,
        null
      );


      // this.$router.addTab({
      //   // 路由名称
      //   name: 'zrcbank/biz/lmtGrpReplyChgApp/lmtGrpReplyChgAppVie',
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: 'lmtGrpReplyChgAppVie', // 必传
      //   // 页签名称
      //   title: '变更向导页面',
      //   // 传递的业务数据，可选配置
      //   data: {
      //     saveBtnShow: true,
      //     viewType: 'ADD'
      //   }
      // });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections[0];
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 判断审批状态为审批中
      if (selectionAry.approveStatus == '111') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtGrpReplyChgApp/lmtGrpReplyChgDetail',

        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtGrpReplyChgDetail_' + new Date().getTime(), // 必传
        // 页签名称
        title: '变更修改页面',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'EDIT',
          grpSerno: selectionAry.grpSerno
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections[0];
      if (_this.$refs.refTable.selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // _this.switchStatus("edit", true),
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtGrpReplyChgApp/lmtGrpReplyChgDetail',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtGrpReplyChgAppDetail_' + new Date().getTime(), // 必传
        // 页签名称
        title: '详情页面',
        // 传递的业务数据，可选配置
        data: {
          op: 'view',
          saveBtnShow: false,
          viewType: 'view',
          grpSerno: selectionAry.grpSerno
        }
      });
    },

    // 删除
    deleteFn: function () {
      var _this = this;
      var model = {};
      // 获得选中的表格数据
      var selections = _this.$refs.refTable.selections;
      yufp.clone(selections[0], model);
      // 如果未选中表格数据，则弹出提示
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      // 审批中
      if (model.approveStatus == '111') {
        _this.$message({ message: '审批中的数据不允许删除', type: 'warning' });
        return;
      }
      // 待发起
      if (model.approveStatus == '000' || model.approveStatus == '992') {
        // 在已选择表格数据的前提下，弹出消息确认框，如果点击确定按钮，则向后端发送删除请求
        _this.$confirm('是否确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          callback: function (action) {
            if (action === 'confirm') {
              // 操作类型，01--可展示   02--不可展示
              // 逻辑删除，修改状态OPR_TYPE 01变为02
              yufp.service.request({
                method: 'POST',
                data: model,
                // url: backend.cmisBiz + "/api/lmtgrpreplychg/delete/" + selections[0].pkId,
                url: backend.cmisBiz + '/api/lmtgrpreplychg/updateligicdelete',
                callback: function (code, message, response) {
                  // 删除后刷新表格数据
                  _this.$refs.refTable.remoteData();
                  // 弹出提示
                  _this.$message('操作成功');
                }
              });
            }
          }
        });
      }
    }
  }
};
</script>
