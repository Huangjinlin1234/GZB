<template>
  <!--
    @created by tangxun 2021-06-11
    @updated by
    @description 页面
  -->
  <div class="yu-menu-config clear">
    <div class="left-content frame-height">
      <div class="content-title">
        <span>目录</span>
      </div>
      <div class="content-box">
        <yu-toolBar>
          <div class="clear">
            <yu-input class="filter-textrepo" v-model="filterText" :placeholder="$t('menuConfig.gjz')" size="small" icon="search"></yu-input>
            <div class="handle-box">
              <yu-button v-if="check" plain icon="yu-icon-plus5" title="新增" @click="confirmAddMenu"></yu-button>
              <yu-button v-if="check" plain icon="yu-icon-edit" title="修改" @click="editMenu"></yu-button>
              <yu-button v-if="check" plain icon="yu-icon-delete2" title="删除" @click="deleteMenu"></yu-button>
              <!-- <yu-button v-norepeat.disabled plain :icon="!isManaging?'yu-icon-setting3':'yu-icon-cancel'" title="管理" @click="isManaging=!isManaging"></yu-button> -->
            </div>
          </div>
        </yu-toolBar>
        <yu-xtree ref="refMenuTree" class="menu-tree" :local-data="menuTreeData" @node-click="treeNodeClick" :filter-node-method="filterMenuTreeNode" data-id="id" data-label="label" data-pid="pid" data-root="0"></yu-xtree>
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="menudialogVisible">
          <yu-xform ref="refMenuForm" label-width="130px" v-model="menuformdata" :disabled="formDisabled">
            <yu-xform-group :column="1">
              <yu-xform-item label="目录编号" placeholder="目录编号" name="enName" ctype="input" disabled :hidden="!menuformdata.enName"></yu-xform-item>
              <yu-xform-item label="目录名称" placeholder="目录名称" name="cnName" ctype="input" rules="required"></yu-xform-item>
              <yu-xform-item label="创建人" placeholder="创建人" name="inputIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="创建机构" placeholder="创建机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveMenuFn">保存</yu-button>
              <yu-button icon="yx-undo2" type="primary" @click="menudialogVisible = !menudialogVisible">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </div>
    </div>
    <div class="right-content frame-height">
      <div class="content-title">知识库列表</div>
      <div class="content-box" style="padding: 19px 24px 24px 24px;">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="3">
            <yu-xform-item placeholder="标题" name="title" ctype="input" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item placeholder="内容简述" name="content" ctype="input" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div class="yu-toolBar">
          <yu-button v-if="check" @click="addFn">新增</yu-button>
          <yu-button v-if="check" @click="modifyFn">修改</yu-button>
          <yu-button v-if="check" @click="infoFn">详情</yu-button>
          <yu-button v-if="check" @click="deleteFn">删除</yu-button>
        </div>
        <yu-xtable ref="refTable" style="margin-top:10px;" request-type="POST" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="param" :default-load="true">
          <yu-xtable-column label="标题" prop="title"></yu-xtable-column>
          <yu-xtable-column label="内容简述" prop="content">
            <template slot-scope="scope">
            <a style="color:#20A0FF;" href="javaScript:void(0);" @click="$alert(scope.row.content,'详细内容',{confirmButtonText:'确定'})">
            {{ scope.row.content.length>7?scope.row.content.substr(0,7)+'...':scope.row.content }}
            </a>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="发布人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column label="发布人所属机构" prop="inputBrIdName"></yu-xtable-column>
          <yu-xtable-column label="发布时间" prop="inputDate"></yu-xtable-column>
          <yu-xtable-column label="状态" prop="status" data-code="STD_WB_REPO_STATUS"></yu-xtable-column>
        </yu-xtable>
        <!-- 新增、修改、查看表单弹窗 -->
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata" :form-type="formDisabled?'details':''" :disabled="formDisabled">
            <yu-xform-group>
              <yu-xform-item label="内容流水号" placeholder="内容流水号" disabled name="serno" ctype="input"></yu-xform-item>
              <yu-xform-item label="所属目录" placeholder="所属目录" disabled name="catalogName" ctype="input"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group>
              <yu-xform-item label="标题" placeholder="标题" rules="required" name="title" ctype="input" ></yu-xform-item>
              <yu-xform-item label="内容简述" placeholder="内容"  rules="required" name="content" ctype="textarea" :autosize="{ minRows: 3 }" colspan="24" maxlength="500"></yu-xform-item>
              <yu-xform-item label="角色权限" placeholder="角色权限"  rules="required" name="roleRight" ctype="select" data-code="STD_WB_RIGHT_RANGE" ></yu-xform-item>
              <yu-xform-item label="部分角色范围" placeholder="部分角色范围" rules="required" name="roleRange" ctype="YufpZrcSelector" :params="roleParms" @select-fn="selectRole" colspan="24" :hidden="formdata.roleRight==1"></yu-xform-item>
              <yu-xform-item label="机构权限" placeholder="机构权限"  rules="required" name="orgRight" ctype="select" data-code="STD_WB_RIGHT_RANGE"></yu-xform-item>
              <yu-xform-item label="部分机构范围" placeholder="部分机构范围" rules="required" name="orgRange" ctype="YufpZrcSelector" :params="orgParms" @select-fn="selectOrg" colspan="24" :hidden="formdata.orgRight==1"></yu-xform-item>
              <yu-xform-item label="发布人姓名" placeholder="登记人" name="inputIdName" disabled ctype="input"></yu-xform-item>
              <yu-xform-item label="发布人工号" placeholder="登记人" name="inputId" disabled ctype="input"></yu-xform-item>
              <yu-xform-item label="发布人所属机构" placeholder="登记机构" name="inputBrIdName" disabled ctype="input"></yu-xform-item>
              <yu-xform-item label="附件" ctype="custom" colspan="24">
                <yu-single-upload  :file="fileListInfo" :disabled="formDisabled" upload-text="请使用平台上传附件组件（可以传多个附件,点击文件可以下载）" @uploaded="uploadedFn" @delete="deleteFileFn"></yu-single-upload>
              </yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button v-show="saveBtnShow" icon="el-icon-yx-floppy-disk" type="primary" @click="saveFn(1)">暂存</yu-button>
              <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn(2)">发布</yu-button>
              <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </div>
    </div>
  </div>
</template>
<script>
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
yufp.lookup.reg('CRUD_TYPE,STD_WB_REPO_STATUS,DATA_STS');
import { mapGetters } from 'vuex';
import { isLoginEdit } from '@/utils/unitchange';
export default {
  components: { YuSingleUpload },
  data () {
    return {
      data: [{ id: '0', label: '根节点', pid: '-1', children: [{ id: '1', label: '一级-1', pid: '0', children: [{ id: '4', label: '二级-1-1', pid: '1', children: [{ id: '9', label: '三级-1-1-1', pid: '4' }] }, { id: '5', label: '二级-1-2', pid: '1' }] }, { id: '2', label: '一级-2', pid: '0', children: [{ id: '6', label: '二级-2-1', pid: '2' }, { id: '7', label: '二级-2-2', pid: '2' }] }, { id: '3', label: '一级-3', pid: '0', children: [{ id: '8', label: '二级-3-1', pid: '3' }] }] }],
      dataUrl: `${backend.cmisCfg}/api/wbrepobase/`,
      param: {},
      treeUrl: `${backend.cmisCfg}/api/adminsmtreedic/treeInput`,
      formdata: {
        serno: this.$xutils.getSEQWithParamFromServer('CRQL_SERNO')
      },
      check: false,
      menuTreeData: [],
      menuformdata: {},
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      isManaging: false,
      upMenuId: '0',
      upLocate: '0',
      filterText: '',
      menudialogVisible: false,
      roleStr: '',
      fileListInfo: [],
      fileList: [],
      roleParms: {
        title: '选择角色',
        method: 'get',
        checkbox: true,
        rowkey: 'roleCode',
        queryFields: [{ placeholder: '角色编号', field: 'roleCode', type: 'input', fuzzyQuery: 'both' }, { placeholder: '角色名称', field: 'roleName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: `${backend.appOcaService}/api/selectAllRole`,
        tableColumns: [{ label: '角色编号', prop: 'roleCode' }, { label: '角色名称 ', prop: 'roleName' }]
      },
      orgParms: {
        title: '选择机构',
        method: 'get',
        checkbox: true,
        rowkey: 'orgCode',
        queryFields: [{ placeholder: '机构编号', field: 'orgCode', type: 'input', fuzzyQuery: 'both' }, { placeholder: '机构名称', field: 'orgName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: `${backend.appOcaService}/api/selectAllOrg`,
        tableColumns: [{ label: '机构编号', prop: 'orgCode' }, { label: '机构名称 ', prop: 'orgName' }, { label: '状态 ', prop: 'orgSts', dataCode: 'DATA_STS'}]
      }
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  watch: {
    filterText: function (val) {
      this.$refs.refMenuTree.filter(val);
    }
  },
  created () {
    // 此处，可根据用户角色信息，动态绑定对应的组件
    // this.currentRole = 'DefaultDashboard'
    this.getTreeData();
    let roles = [];
    for (let i = 0; i < this.roles.length; i++) {
      roles.push(this.roles[i].code);
    }
    this.roleStr = roles.join(',');
    this.param = { condition: { locate: '0,', roles: this.roleStr, orgCode: this.org.code } };
    const loginUser = this.$xutils.getLoginUserInfo();
    for (let i = 0; i < loginUser.roles.length; i++) {
      if (loginUser.roles[i].code.indexOf('R9000') > -1 || loginUser.roles[i].code.indexOf('R1038') > -1 || loginUser.roles[i].code.indexOf('R001') > -1) {
        this.check = true;
      }
    }
  },
  mounted () {},
  methods: {
    selectRole (rows) {
      let roles = [];
      for (let i = 0; i < rows.length; i++) {
        roles.push(rows[i].roleCode);
      }
      this.formdata.roleRange = roles.join(',');
    },
    selectOrg (rows) {
      let roles = [];
      for (let i = 0; i < rows.length; i++) {
        roles.push(rows[i].orgCode);
      }
      this.formdata.orgRange = roles.join(',');
    },
    /** 上传文件 */
    uploadedFn (fileItem, num) {
      fileItem.icon && delete fileItem.icon;
      this.fileList.push(fileItem);
    },
    /** 删除文件 */
    deleteFileFn (file) {
      this.fileList.forEach((item, index) => {
        if (item.filePath === file.filePath) {
          this.fileList.splice(index, 1);
        }
      });
    },
    /** 获取目录树树数据 */
    getTreeData () {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          url: this.treeUrl,
          data: { root: '', optType: 'STD_WB_REPO_BASE' }
        })
        .then(({ code, message, data }) => {
          if (code === '0') {
            _this.menuTreeData = data;
          }
        });
    },
    /** 目录树过滤方法 */
    filterMenuTreeNode: function (value, data) {
      if (!value) {
        return true;
      }
      return data.label.indexOf(value) !== -1;
    },
    /** 目录树保存方法 */
    saveMenuFn () {
      let _this = this;
      let model = {};
      let validate = false;
      _this.$refs.refMenuForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.clone(_this.menuformdata, model);
      model.optType = 'STD_WB_REPO_BASE';
      model.comSts = 'A';
      model.memo = '知识库分类（树形字典）';
      let url = `${backend.cmisCfg}/api/adminsmtreedic/create`;
      if (model.pkId) {
        url = `${backend.cmisCfg}/api/adminsmtreedic/update`;
      } else {
        // 新增时设置目录上一级
        model.abvenName = this.upMenuId;
        model.locate = this.upLocate;
      }
      // 向后台发送保存请求
      yufp.service.request({
        url: url,
        method: 'POST',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            // _this.$refs.refMenuTree.remoteData();
            _this.getTreeData();
            _this.$message({ message: '操作成功！', type: 'info' });
            _this.menudialogVisible = false;
          } else {
            _this.$message({ message: message, type: 'error' });
          }
        }
      });
    },
    /** 删除菜单 */
    deleteMenu () {
      let _this = this;
      let node = _this.$refs.refMenuTree.getCurrentNode();
      if (!node) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (this.$refs.refTable.tabledata.length > 0) {
        _this.$message({ message: '该目录下已存在内容，不允许删除', type: 'warning' });
        return;
      }
      let model = {};
      yufp.clone(node, model);
      model.optType = 'STD_WB_REPO_BASE';
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: `${backend.cmisCfg}/api/adminsmtreedic/deleteTree`,
              data: model,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info' });
                  _this.getTreeData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    /** 目录节点树修改 */
    editMenu () {
      let _this = this;
      let node = _this.$refs.refMenuTree.getCurrentNode();
      if (node) {
        _this.menudialogVisible = true;
        _this.$nextTick(function () {
          _this.$refs.refMenuForm.resetFields();
          _this.menuformdata.pkId = node.pkId;
          _this.menuformdata.enName = node.id;
          _this.menuformdata.cnName = node.label;
          _this.menuformdata.inputIdName = node.inputIdName;
          _this.menuformdata.inputBrIdName = node.inputBrIdName;
        });
      } else {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
      }
    },
    /** 节点树新增 */
    confirmAddMenu () {
      let _this = this;
      _this.menudialogVisible = true;
      _this.$nextTick(function () {
        _this.$refs.refMenuForm.resetFields();
        _this.menuformdata.inputIdName = _this.userName;
        _this.menuformdata.inputBrIdName = _this.org.name;
      });
    },
    /** 树节点点击事件 */
    treeNodeClick (nodeData, node, self) {
      //   var _this = this;
      // 如果当前表单为编辑模式 且 已改动过部分字段数据
      this.upMenuId = nodeData.id;
      this.upLocate = nodeData.locate;
      this.param = { condition: { locate: nodeData.locate, roles: this.roleStr, orgCode: this.org.code } };
    },
    /**
     * 取消
     */
    cancelFn: function () {
      this.dialogVisible = false;
    },
    /**
     * 保存按钮
     */
    saveFn: function (index) {
      if (this.viewType == 'ADD') {
        this.addSaveFn(index);
      } else {
        this.editSaveFn(index);
      }
    },

    /**
     * 新增-保存
     */
    addSaveFn: function (index) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      model.status = index;
      model.accessory = JSON.stringify(this.fileList);
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisCfg}/api/wbrepobase/create`,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message({ message: '数据新增成功！', type: 'info' });
            _this.dialogVisible = false;
          } else {
            _this.$message({ message: '数据新增失败！', type: 'error' });
          }
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function (index) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.accessory = JSON.stringify(this.fileList);
      model.status = index;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisCfg}/api/wbrepobase/update`,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message({ message: '数据更新成功！', type: 'info' });
            _this.dialogVisible = false;
          } else {
            _this.$message({ message: '数据更新失败！', type: 'error' });
          }
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      this.viewType = viewType;
      this.saveBtnShow = editable;
      this.dialogVisible = true;
      this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      let node = _this.$refs.refMenuTree.getCurrentNode();
      if (!node) {
        _this.$message({ message: '请先选择一个目录', type: 'warning' });
        return;
      }
      let params = {
        roles: this.roles,
        status: '新增'
      };
      if (!isLoginEdit(params)) {
        return;
      }
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        _this.formdata.catalogId = node.id;
        _this.formdata.catalogName = node.label;
        _this.formdata.inputIdName = _this.userName;
        _this.formdata.inputId = _this.loginCode;
        _this.formdata.inputBrIdName = _this.org.name;
        _this.formdata.roleRight = '1'; // 默认值
        _this.formdata.orgRight = '1'; // 默认值
      });
    },

    /**
     * 修改
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
      let params = {
        roles: this.roles,
        status: '修改'
      };
      if (!isLoginEdit(params)) {
        return;
      }
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        let obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
        _this.fileListInfo = JSON.parse(obj.accessory);
      });
    },

    /**
     * 详情
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

      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata);
        _this.fileListInfo = JSON.parse(selectionsAry[0].accessory);
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let params = {
        roles: this.roles,
        status: '删除'
      };
      if (!isLoginEdit(params)) {
        return;
      }
      if (selections[0].status == '3') {
        _this.$message({
          message: '该笔已作废,不允许删除',
          type: 'warning'
        });
        return;
      }
      let arr = [];
      for (let i = 0; i < selections.length; i++) {
        arr.push(selections[i].serno);
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            if (selections[0].status == '1') {
              yufp.service.request({
                method: 'POST',
                url: `${backend.cmisCfg}/api/wbrepobase/batchdelete/` + arr.join(','),
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$message({ message: '数据删除成功！', type: 'info' });
                    _this.$refs.refTable.remoteData();
                  } else {
                    _this.$message({ message: '数据删除失败！', type: 'error' });
                  }
                }
              });
            } else {
              let model = {};
              model.status = '3';
              model.serno = selections[0].serno;
              yufp.service.request({
                method: 'POST',
                url: `${backend.cmisCfg}/api/wbrepobase/update`,
                data: model,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$refs.refTable.remoteData();
                    _this.$message({ message: '数据更新成功！', type: 'info' });
                    _this.dialogVisible = false;
                  } else {
                    _this.$message({ message: '数据更新失败！', type: 'error' });
                  }
                }
              });
            }
          }
        }
      });
    }
  }
};
</script>
<style>
.yu-menu-config .filter-textrepo {
  float: left;
  width: 192px;
}
</style>
