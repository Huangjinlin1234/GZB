<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="" is-collapse>
      <yu-xform ref="refForm1" label-width="100px" v-model="baseFormdata" style="text-align: center;" :form-type="viewType == 'DETAIL' ? 'details' : ''">
        <yu-xform-group>
          <yu-xform-item label="产品编号" name="prdCode" ctype="input" rules="required" icon="search" @click="onchange" disabled ></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="产品类型属性" label-width="120px" :hidden="prdType" ctype="select" name="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="更新人" name="updIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="更新机构" name="updBrIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="更新日期" name="updDate" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button type="primary" v-if="saveBtnShow" @click="doSave">保存</yu-button>
          <yu-button type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>

    <yu-panel title="注意事项提醒" v-if="tipPanel" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
        <yu-button @click="addFn" :hidden="viewType == 'DETAIL'">新增</yu-button>
        <yu-button @click="saveTb" :hidden="viewType == 'DETAIL' || viewType == 'ADD'">保存</yu-button>
        <yu-button @click="deleteFn" :hidden="viewType == 'DETAIL'">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" style="margin-top:10px" row-number  :data-url="dataUrl" :base-params="param" :default-load="false" request-type="POST">
        <yu-xtable-column label="业务阶段" prop="bizType" width="200" ctype="select" data-code="STD_BIZ_PHASE" :disabled="viewType == 'DETAIL' || viewType == 'EDIT'"></yu-xtable-column>
        <yu-xtable-column label="注意事项" prop="noticeDesc" ctype="input" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="700px">
      <yu-xform ref="refForm2" label-width="100px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="业务阶段" name="bizType" ctype="select" rules="required" data-code="STD_BIZ_PHASE"></yu-xform-item>
          <yu-xform-item label="注意事项" name="noticeDesc" ctype="input" rules="required"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>

    <yu-xdialog :title="产品信息" :visible.sync="dialogPrdVisible" width="700px">
      <yu-xform ref="refForm3" related-table-name="refTable2" form-type="search" v-model="searchFormdata" label-width="100px">
          <yu-xform-group :column="3">
            <yu-xform-item label="产品名称" name="prdName" ctype="input" fuzzy-query="both" />
          </yu-xform-group>
        </yu-xform>
        <yu-toolbar>
          <yu-button @click="backToAdd">选取返回</yu-button>
          <yu-button @click="cancelFn2">取消</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable2" selection-type="radio" :base-params="prdParams" :default-load="false" :data-url="prdDataUrl" request-type="POST" condition-key="condition" row-number>
          <yu-xtable-column label="产品编号" prop="prdId" ></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        </yu-xtable>
    </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
yufp.lookup.reg('STD_BIZ_PHASE');

export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/cfgassistantdetailinfo/',
      addUrl: backend.cmisBiz + '/api/cfgassistantdetailinfo/create',
      addUrl2: backend.cmisBiz + '/api/cfgassistantinfo/create',
      updateUrl: backend.cmisBiz + '/api/cfgassistantinfo/update',
      batchUpdateUrl: backend.cmisBiz + '/api/cfgassistantdetailinfo/batchupdate',
      deleteUrl: backend.cmisBiz + '/api/cfgassistantdetailinfo/delete/',
      prdDataUrl: backend.cmisCfg + '/api/cfgprdbasicinfo/selectbymodel',
      formdata: {},
      param: {
        condition: JSON.stringify({"serno" : this.$route.meta.params.serno})
      },
      prdParams: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      dialogPrdVisible: false,
      formDisabled: false,
      viewType: '',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      serno: '',
      tipPanel: true,
      prdType: true, //产品类型属性
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    this.initInfo();
    if(this.viewType == 'ADD') {
      this.baseFormdata.prdCode = '';
      this.baseFormdata.prdName = '';
    }
  },
  methods: {
    initInfo () {
      var _this = this;
      var serno = _this.$route.meta.params.serno;
      _this.serno = serno;
      var _viewType = _this.$route.meta.params.viewType;
      _this.viewType = _viewType;
      if (_viewType == 'ADD') {
        _this.baseFormdata.inputId = _this.loginCode;
        _this.baseFormdata.inputIdName = _this.userName;
        _this.baseFormdata.updIdName = _this.userName;
        _this.baseFormdata.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
        _this.baseFormdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
        _this.baseFormdata.updId = _this.loginCode;
        _this.baseFormdata.updBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
        _this.baseFormdata.updBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
        _this.baseFormdata.inputDate = _this.$xutils.getDefaultformulaData('$CURRTIME');
        _this.baseFormdata.updDate = _this.$xutils.getDefaultformulaData('$CURRTIME');
      } else {
        let model = {};
        model.serno = serno;
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/cfgassistantinfo/',
          data: JSON.stringify({ condition: JSON.stringify(model) }),
          callback: function (code, message, response) {
            if(response.data[0].prdTypeProp) {
              _this.prdType = false
            }
            yufp.clone(response.data[0], _this.baseFormdata);
          }
        });
        _this.param = { condition: JSON.stringify(model) };
        _this.dataUrl = backend.cmisBiz + '/api/cfgassistantdetailinfo/';
        _this.$refs.refTable.remoteData();
      }
      if (_viewType == 'DETAIL' || _viewType == 'EDIT') {
        _this.saveBtnShow = false;
      }
    },

    // 返回
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },

    // 新增
    addFn () {
      this.dialogVisible = true;
    },

    // 取消
    cancelFn () {
      this.dialogVisible = false;
    },

    // 产品选择 取消
    cancelFn2 () {
      this.dialogPrdVisible = false;
    },

    // 注意事项提醒 保存
    saveFn () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      if(!_this.serno) {
        _this.$message({ message: '请先保存配置信息', type: 'error' });
        return false;
      }
      model.serno = _this.serno;
      let validate = false;
      _this.$refs.refForm2.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.addUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '数据新增成功！', type: 'info' });
            if(_this.viewType == 'ADD') {
              _this.dialogVisible = false;
              let modelBase = {
                serno: model.serno
              }
              _this.param = { condition: JSON.stringify(modelBase) };
              // _this.$refs.refTable.remoteData();
              _this.formdata.bizType = '';
              _this.formdata.noticeDesc = '';
              // yufp.router.removeTab(_this.$route.path);
            } else {
              //解决修改不更新更新人和机构的问题
              let modelBase = {};
              if(_this.$route.meta.params.viewType === 'EDIT') {
                _this.baseFormdata.updIdName = _this.userName;
                _this.baseFormdata.updId = _this.loginCode;
                _this.baseFormdata.updBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
                _this.baseFormdata.updBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
                _this.baseFormdata.updDate = _this.$xutils.getDefaultformulaData('$CURRTIME');
              }
              yufp.clone(_this.baseFormdata, modelBase);
              // 向后台发送保存请求
              yufp.service.request({
                method: 'POST',
                url: _this.updateUrl,
                data: modelBase,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.dialogVisible = false;
                    _this.$refs.refForm2.resetFields();
                    _this.$refs.refTable.remoteData();
                  } else {
                    _this.$message({ message: '数据保存失败！', type: 'error' });
                  }
                }
              });
            }
          } else {
            _this.$message({ message: '数据新增失败！', type: 'error' });
          }
        }
      });
    },

    // 详情信息保存
    doSave () {
      let _this = this;
      let model = {};
      if(_this.$route.meta.params.viewType === 'EDIT') {
        _this.baseFormdata.updIdName = _this.userName;
        _this.baseFormdata.updId = _this.loginCode;
        _this.baseFormdata.updBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
        _this.baseFormdata.updBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
        _this.baseFormdata.updDate = _this.$xutils.getDefaultformulaData('$CURRTIME');
      }
      yufp.clone(_this.baseFormdata, model);
      let validate = false;
      _this.$refs.refForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.viewType == 'ADD') {
      // 向后台发送保存请求
        yufp.service.request({
          method: 'POST',
          url: _this.addUrl2,
          data: model,
          callback: function (code, message, response) {
            if (response.code == '0') {
              // _this.$refs.refForm1.resetFields();
              _this.serno = response.data.serno;
              _this.$message({ message: '数据新增成功！', type: 'info' });
            } else {
              _this.$message({ message: '数据新增失败！', type: 'error' });
            }
          }
        });
      } else {
        let model = {};
        yufp.clone(_this.baseFormdata, model);
        // 向后台发送保存请求
        yufp.service.request({
          method: 'POST',
          url: _this.updateUrl,
          data: model,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$refs.refForm1.resetFields();
              yufp.router.removeTab(_this.$route.path);
              _this.$message({ message: '数据保存成功！', type: 'info' });
            } else {
              _this.$message({ message: '数据保存失败！', type: 'error' });
            }
          }
        });
      }
    },

    // 注意事项提醒 批量保存
    saveTb () {
      let _this = this;
      let arr = [];
      let len = _this.$refs.refTable.tabledata.length;
      for (let i = 0; i < len; i++) {
        let model = {};
        model = _this.$refs.refTable.tabledata[i];
        arr.push(model);
      }
      yufp.service.request({
        method: 'POST',
        url: _this.batchUpdateUrl,
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          if (response.code == '0') {

            //解决修改不更新更新人和机构的问题
            let modelBase = {};
            _this.baseFormdata.updIdName = _this.userName;
            _this.baseFormdata.updId = _this.loginCode;
            _this.baseFormdata.updBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
            _this.baseFormdata.updBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
            _this.baseFormdata.updDate = _this.$xutils.getDefaultformulaData('$CURRTIME');
            yufp.clone(_this.baseFormdata, modelBase);
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: _this.updateUrl,
              data: modelBase,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message({ message: '数据保存失败！', type: 'error' });
                }
              }
            });
          } else {
            _this.$message({ message: '操作失败！', type: 'error' });
          }
        }
      });
    },

    deleteFn () {
      let _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.deleteUrl + obj.pkId,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },


    /** 产品选择方法 */
    onchange () {
      let _this = this;
      _this.prdParams = {};
      _this.$request({
        method: 'POST',
        url: _this.prdDataUrl,
        data: JSON.stringify({ condition: JSON.stringify(_this.prdParams) })
      }).then(({ code, message, data }) => {
        if (data) {
          _this.$refs.refTable2.remoteData();
        }
      });
      _this.dialogPrdVisible = true;
    },

    // 选取返回
    backToAdd () {
      var _this = this;
      if (_this.$refs.refTable2.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable2.selections[0];
      _this.baseFormdata.prdCode = obj.prdId;
      _this.baseFormdata.prdName = obj.prdName;
      _this.dialogPrdVisible = false;

      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/cfg4inner/cmiscfg0002',
        data: {prdId : obj.prdId},
        callback: function (code, message, response) {
          if(response.data.cfgPrdTypePropertiesList.length > 0) {
            _this.prdType = false
          } else {
            _this.prdType = true
          }
        }
      });
    },
  }
};
</script>
