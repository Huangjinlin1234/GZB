
<template>
  <!--
    @created by tangxun 2021-06-22 14:08:56
    @updated by 2021-06-22 14:08:56
    @updated by 2021-06-22 14:08:56
    @description 主页面
  -->
  <div>
<el-tabs>
    <el-tab-pane label="风险预警方案">
      <yu-xform ref="refForm" label-width="160px" style="margin-top: 20px;" v-model="formdata">
        <yu-xform-group>
          <yu-xform-item label="风险拦截方案编号" name="preventId" disabled="true" rules="required" ctype="input" :colspan="9"></yu-xform-item>
          <yu-xform-item label="风险拦截方案名称" name="preventDesc" rules="required" ctype="input" :colspan="9"></yu-xform-item>
          <yu-xform-item label="是否启用" name="usedInd" rules="required" ctype="select" data-code="STD_ZB_YES_NO" :colspan="9"></yu-xform-item>
          <yu-xform-item label="是否适用流程" name="usedFlow" rules="required" ctype="select" data-code="STD_ZB_YES_NO" :colspan="9"></yu-xform-item>
          <yu-xform-item label="备注" name="memo" rules="required" ctype="textarea" :autosize="{minRows:3}" :colspan="18"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="yu-grpButton">
        <yu-button icon="check" type="primary" @click="saveFn">保存</yu-button>
      </div>
      <div class="yu-toolBar">
          <yu-button icon="plus" @click="addFn">引入预警项</yu-button>
          <yu-button icon="yx-bin" @click="deleteFn">移除预警项</yu-button>
      </div>
      <yu-xtable ref="refTable" style="margin-top:10px;" @row-click="refTableSelect" selection-type="checkbox" row-number :data-url="dataUrl" :base-params="params.inParams">
        <yu-xtable-column label="项目编号" prop="itemId"></yu-xtable-column>
        <yu-xtable-column label="项目名称" prop="itemName"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="选择拦截项" close-on-press-escape="true" :visible.sync="dialogVisible" width="850px">
        <yu-xform related-table-name="refTableitem" v-model="itemformdata" ref="searchForm" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item placeholder="项目名称" name="itemName" fuzzy-query="both" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="项目编号" name="itemId" ctype="input"></yu-xform-item>
            <!-- <div slot="custom" class="btn-group" style="margin-left: 10px;">
              <yu-button-group>
                <yu-button type="primary" icon="search" @click="searchFn">查询</yu-button>
              </yu-button-group>
            </div> -->
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTableitem" @row-click="signSelect" selection-type="checkbox" row-number :data-url="dataUrl" :base-params="params.notInParams">
          <yu-xtable-column label="项目编号" prop="itemId"></yu-xtable-column>
          <yu-xtable-column label="项目名称" prop="itemName"></yu-xtable-column>
          <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        </yu-xtable>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="itemsaveFn">选择</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="itemcancelFn">取消</yu-button>
        </div>
      </yu-xdialog>
    </el-tab-pane>
    <el-tab-pane label="风险预警场景(适用流程)">
      <div class="yu-toolBar" >
          <yu-button icon="plus" @click="addScence">新增</yu-button>
          <yu-button icon="edit" @click="modifyScence">修改</yu-button>
          <yu-button icon="yx-bin" @click="deleteScence">删除</yu-button>
      </div>
      <yu-lazy>
        <yu-xtable ref="refTableDistinct" style="margin-top:10px;" row-number :data-url="dataUrlScene" :base-params="params.inParams">
          <yu-xtable-column label="方案编号" prop="preventId" width="300"></yu-xtable-column>
          <yu-xtable-column label="业务类型" prop="bizType"></yu-xtable-column>
          <yu-xtable-column label="业务类型描述" prop="bizTypeDesc"></yu-xtable-column>
          <yu-xtable-column label="流程编号" prop="flowId"></yu-xtable-column>
          <yu-xtable-column label="流程编名称" prop="flowName"></yu-xtable-column>
        </yu-xtable>
      </yu-lazy>

      <yu-xdialog :title="viewTitle[viewType]" close-on-press-escape="true" :before-close="beforeClose" :visible.sync="scencedialogVisible" width="80%">
        <yu-xform label-width="160px" v-model="formdataScence">
          <yu-xform-group>
            <!--<yu-xform-item label="流程标识" name="wfid" :disabled="wfiddisabled" filterable rules="required" ctype="select" @change="getAllNode" :options="options" :colspan="9"></yu-xform-item>-->
              <yu-xform-item label="业务类型" name="bizType" :readonly="true" :disabled="wfiddisabled"  @click.stop.native="onIconClickFnBiz" :on-icon-click="onIconClickFnBiz" @change="getAllNode" icon="search" rules="required" ctype="input" :colspan="9"></yu-xform-item>
              <yu-xform-item label="业务类型描述" name="bizTypeDesc" disabled="true" rules="required" ctype="input" :colspan="9"></yu-xform-item>
              <yu-xform-item label="流程编号" name="flowId" disabled="true" rules="required" ctype="input" :colspan="9"></yu-xform-item>
              <yu-xform-item label="流程编名称" name="flowName" disabled="true" rules="required" ctype="input" :colspan="9"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-row :gutter="24">
          <yu-col :span="5">
            <h2>流程节点</h2>
            <yu-xtree ref="menutree" node-key="id" :local-data="menutreedata" data-id="id" data-label="label" data-pid="pid" data-root="0"
              height="600" default-expand-all="true" highlight-current="true" @node-click="nodeClick">
            </yu-xtree>
          </yu-col>
          <yu-col :span="19">
            <h2>拦截方案选项</h2>
            <el-button icon="check" type="primary" @click="saveSceneItem">保存</el-button>
            <span>
              (选择流程节点后，每个节点都需要保存一次!!!)
            </span>
            <div style="height: 10px;"></div>
            <yu-xtable ref="refTableSceneItem" selection-type="checkbox" @loaded="selectItem" row-number :data-url="dataUrlSceneItem"
              :base-params="params.inParams">
              <yu-xtable-column label="项目编号" prop="itemId"></yu-xtable-column>
              <yu-xtable-column label="项目名称" prop="itemName"></yu-xtable-column>
              <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
              <yu-xtable-column label="拦截类型" prop="riskLevel" ctype="select" :rules="[
                    { required: true, message: '请选择拦截类型', trigger: 'blur' }
                  ]" :options="riskLevel" ></yu-xtable-column>
              <!-- <yu-xtable-column label="选中状态" prop="isCheck" ctype="radio" data-code="YESNO"></yu-xtable-column> -->
            </yu-xtable>
          </yu-col>
        </yu-row>
      </yu-xdialog>
          <!--流程标识及名称选取框-->
    <el-dialog-x title="选择业务类型" :visible.sync="bizdialogVisible" height="700px" width="750px">
      <yu-xform  related-table-name="flowBizList" ref="searchForm" form-type="search">
        <yu-xform-group :column="3">
          <yu-xform-item  placeholder="业务类型" ctype="input" name="bizType"></yu-xform-item>
          <yu-xform-item  placeholder="业务类型描述" ctype="input" name="ext"></yu-xform-item>
          <yu-xform-item  placeholder="流程编号" ctype="num" name="flowId"></yu-xform-item>
          <yu-xform-item  placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <el-table-x ref="flowBizList" :data-url="flowBizUrl" :base-params="flowParams" :table-columns="flowBiztableColumns">
      </el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="returnflowBiz">选取返回</el-button>
      </div>
    </el-dialog-x>
    </el-tab-pane>
  </el-tabs>
  <div class="yu-grpButton">
    <yu-button type="primary" icon="close" @click="closePage">关闭</yu-button>
  </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: backend.cmisCfg + '/api/prdpvriskitem/',
      dataUrlScene: backend.cmisCfg + '/api/prdpvriskscene/distinctScene',
      dataUrlSceneItem: backend.cmisCfg + '/api/prdpvriskscene/',
      flowBizUrl: backend.workflowService + '/api/biz/',
      formdata: {},
      itemformdata: {},
      params: {
        inParams: {condition: JSON.stringify({'preventId': this.pageParams.preventId})},
        notInParams: {condition: JSON.stringify({'notInPreventId': this.pageParams.preventId})}
      },
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      dialogVisible: false,
      scencedialogVisible: false,
      menutreedata: [],
      getFlowUrl: backend.workflowService + '/api/nwfflow/?condition=%7B%22flowState%22:%22R%22%7D&size=100',
      getNodeUrl: backend.workflowService + '/api/biz/allnode/',
      options: [],
      formdataScence: {},
      wfiddisabled: false,
      bizdialogVisible: false,
      riskLevel: [{ key: '1', value: '提示' }, { key: '2', value: '警告' }, { key: '3', value: '拦截' }],
      flowBiztableColumns: [{
        label: '业务类型',
        prop: 'bizType',
        resizable: true
      }, {
        label: '业务类型描述',
        prop: 'ext',
        resizable: true
      }, {
        label: '流程编号',
        prop: 'flowId',
        resizable: true
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true
      }]
    };
  },
  created: function () {
    let _this = this;
    _this.$nextTick(function () {
      yufp.clone(_this.pageParams, _this.formdata);
    });
  },
  methods: {
    returnflowBiz () {
      // 选取流程标识返回
      if (this.$refs.flowBizList.selections.length !== 1) {
        this.$message({
          duration: 4000,
          message: '请选择一条数据!',
          type: 'warning'
        });
        return false;
      }

      var row = this.$refs.flowBizList.selections[0];
      this.$nextTick(function () {
        this.formdataScence.bizType = row.bizType;
        this.formdataScence.bizTypeDesc = row.ext;
        this.formdataScence.flowId = row.flowId;
        this.formdataScence.flowName = row.flowName;
        this.bizdialogVisible = false;
      });
    },
    /** 选择按钮方法 */
    onIconClickFnBiz () {
      this.bizdialogVisible = true;
    },
    /**
    * 保存
    */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/prdpreventrisk/update',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },
    addFn: function () {
      if (this.$refs.refTableitem) {
        this.$refs.refTableitem.remoteData();
      }
      this.dialogVisible = true;
    },
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请至少选择一条记录', type: 'warning' });
        return;
      }
      var len = selections.length, arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(selections[i].itemId);
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/prdpvriskitemrel/delete?preventId=' + this.pageParams.preventId,
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },
    refTableSelect: function (row, event, column, index) {
      var _this = this;
      var _data = _this.$refs.refTable.selections;
      var len = _data.length;
      var arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(_data[i].itemId);
      }
      if (arr.indexOf(row.itemId) > -1) {
        _this.$refs.refTable.toggleRowSelection(row, false);
      } else {
        _this.$refs.refTable.toggleRowSelection(row, true);
      }
    },
    /**
     * pop查询方法
     */
    searchFn: function () {
      var _this = this;
      var model = _this.itemformdata;
      model['notInPreventId'] = this.pageParams.preventId;
      var param = {
        condition: JSON.stringify(model)
      };
      _this.$refs.refTableitem.remoteData(param);
    },
    itemsaveFn: function () {
      var _this = this;
      var selections = _this.$refs.refTableitem.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请至少选择一条记录', type: 'warning' });
        return;
      }
      var len = selections.length, arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(selections[i].itemId);
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/prdpvriskitemrel/?preventId=' + this.pageParams.preventId,
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },
    itemcancelFn: function () {
      this.dialogVisible = false;
    },
    signSelect: function (row, event, column, index) {
      var _this = this;
      var _data = _this.$refs.refTableitem.selections;
      var len = _data.length;
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(_data[i].itemId);
      }
      if (arr.indexOf(row.itemId) > -1) {
        _this.$refs.refTableitem.toggleRowSelection(row, false);
      } else {
        _this.$refs.refTableitem.toggleRowSelection(row, true);
      }
    },
    /**
     * 适用场景
     */
    addScence: function () {
      var _this = this;
      // 清空数组
      _this.formdataScence.bizType = '';
      _this.wfiddisabled = false;
      this.scencedialogVisible = true;
    },
    modifyScence: function () {
      var _this = this;
      var selections = _this.$refs.refTableDistinct.selections;
      if (selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.wfiddisabled = true;
      _this.scencedialogVisible = true;
      _this.$nextTick(function () {
        // _this.formdata.bizType = selections[0].bizType;
        yufp.clone(selections[0], _this.formdataScence);
      });
    },
    deleteScence: function () {
      var _this = this;
      var selections = _this.$refs.refTableDistinct.selections;
      if (selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将永久删除该流程及流程关联的节点配置信息, 是否继续?', '提示', {
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCfg + '/api/prdpvriskscene/delete?preventId=' + selections[0].preventId + '&bizType=' + selections[0].bizType,
              callback: function (code, message, response) {
                _this.$refs.refTableDistinct.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /**
    * 关闭前的回调，会暂停 Dialog 的关闭
    */
    beforeClose: function (done) {
      this.$refs.refTableDistinct.remoteData();
      done('close');
    },
    getAllNode: function () {
      var _this = this;
      if (!this.formdataScence.flowId) {
        return;
      }
      _this.menutreedata.length = 0;
      // 向后台发送请求
      yufp.service.request({
        method: 'GET',
        url: _this.getNodeUrl + '?flowId=' + this.formdataScence.flowId,
        callback: function (code, message, response) {
          let menuTree = [];
          for (let i = 0; i < response.data.length; i++) {
            let obj = {'id': response.data[i].nodeId, 'label': response.data[i].nodeId + '-' + response.data[i].nodeName, pid: '0'};
            menuTree.push(obj);
          }
          _this.menutreedata = menuTree;
          // yufp.each(response.data, function (key, value) {
          //   var obj = {'id': value.nodeId, 'label': value.nodeName, pid: '0'};
          //   _this.menutreedata.push(obj);
          // });
        }
      });
    },
    nodeClick: function () {
      var _this = this;
      var model = {};
      model.preventId = this.pageParams.preventId;
      model.sceneId = _this.$refs.menutree.getCurrentKey();
      model.bizType = _this.formdataScence.bizType;
      var param = {
        condition: JSON.stringify(model)
      };
      _this.$refs.refTableSceneItem.remoteData(param);
    },
    selectItem: function (data, total) {
      var _this = this;
      for (var i = 0; i < data.length; i++) {
        if (data[i].isCheck == 'Y') {
          _this.$refs.refTableSceneItem.toggleRowSelection(data[i], true);
        }
      }
    },
    saveSceneItem: function () {
      var _this = this;
      var status = true;
      _this.$refs.refTableSceneItem.validate(function (fields) {
        status = fields;
      }, true);
      if (status) {
        this.$message({message: '请填写拦截项', type: 'warning'});
        return;
      }
      this.$refs.refTableSceneItem.clearValidateMessage();
      if (_this.$refs.menutree.getCurrentKey() == null || _this.$refs.menutree.getCurrentKey() == '') {
        this.$message({message: '请先选择流程节点', type: 'warning'});
        return;
      }
      var selections = _this.$refs.refTableSceneItem.selections;
      var len = selections.length, arr = [];
      for (let i = 0; i < len; i++) {
        let obj = {};
        obj.itemId = selections[i].itemId;
        obj.riskLevel = selections[i].riskLevel;
        obj.bizType = _this.formdataScence.bizType;
        obj.bizTypeDesc = _this.formdataScence.bizTypeDesc;
        obj.flowId = _this.formdataScence.flowId;
        obj.flowName = _this.formdataScence.flowName;
        obj.sceneId = _this.$refs.menutree.getCurrentKey();
        obj.preventId = this.pageParams.preventId;
        arr.push(obj);
      }
      // 向后台发送请求
      yufp.service.request({
        method: 'POST',
        url: _this.dataUrlSceneItem + '?preventId=' + this.pageParams.preventId + '&sceneId=' + _this.$refs.menutree.getCurrentKey() + '&bizType=' + _this.formdataScence.bizType,
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          _this.$message('操作成功');
        }
      });
      // _this.$refs.refTableSceneItem.clearValidateMessage();
    },
    closePage: function () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
