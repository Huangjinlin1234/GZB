// eslint-disable-next-line vue/valid-template-root
<template>
  <yu-panel title="额度结构配置维护" panel-type="simple">
    <el-row>
      <el-col :span="6">
        <yu-xtree ref="refTree" @node-click="nodeClickFn" :data-url="url" data-id="id" data-label="label" data-root="" :data-params="baseParams" request-type="post" :render-custom-content="contentMenu"> </yu-xtree>
      </el-col>
      <el-col :span="18">
        <yu-tabs v-model="tabName" type="card">
          <yu-tab-pane label="基本信息" name="1">
            <yu-xform ref="refForm" label-width="140px" v-model="formdata" :disabled="!saveBtnShow">
              <yu-xform-group :column="3">
                <yu-xform-item label="结构分项编号" name="limitSubNo" disabled></yu-xform-item>
                <yu-xform-item label="结构分项名称" name="limitSubName"></yu-xform-item>
                <yu-xform-item label="是否低风险授信" name="isLriskLmt" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="是否循环" name="isRevolv" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="额度类型" name="limitType" ctype="select" data-code="STD_ZB_LIMIT_TYPE"></yu-xform-item>
                <yu-xform-item label="分项类型" name="lmtSubType" ctype="select" data-code="STD_ZB_LMT_SUB_TYPE"></yu-xform-item>
                <yu-xform-item label="是否专项授信" name="isExpertLmt" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="适用业务条线" name="suitBizLine" ctype="checkbox" data-code="STD_ZB_SUIT_BIZ_LINE"></yu-xform-item>
                <yu-xform-item label="是否允许突破总体授信期限" name="isOverLmtTerm" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="登记人" name="inputIdName" disabled></yu-xform-item>
                <yu-xform-item label="登记机构" name="inputBrIdName" disabled></yu-xform-item>
                <yu-xform-item label="登记日期" name="inputDate" disabled ctype="datepicker"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </yu-tab-pane>
          <yu-tab-pane label="使用产品配置" name="2">
            <yu-xtree ref="refTreeDetail" :data-url="urlDetail" data-id="id" data-label="label" data-root="" :show-checkbox="true" :data-params="baseParamsDetail" request-type="post" node-key="id" @load-all-data="loadTreeData"> </yu-xtree>
          </yu-tab-pane>
        </yu-tabs>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="backFn">返回</yu-button>
        </div>
      </el-col>
    </el-row>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <yu-xform ref="refFormLeft" label-width="120px" v-model="formdataLeft">
        <yu-xform-group :column="1">
          <yu-xform-item label="额度品种编号" name="limitSubNo" rules="required" ctype="input" :disabled="disabledNo"></yu-xform-item>
          <yu-xform-item label="额度品种名称" name="limitSubName" rules="required" ctype="input"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveLeftTreeData">保存</yu-button>
          <yu-button  type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </yu-panel>
</template>
<script>
import backend from '@/config/constant/app.data.service';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_YES_NO,STD_ZB_LIMIT_TYPE,STD_ZB_LMT_SUB_TYPE,STD_ZB_SUIT_BIZ_LINE');
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
export default {
  data: function () {
    console.log(this.$route.params.limitStrNo);
    return {
      url: backend.cmisLmt + '/api/lmtsubbasicconf/selectTreeList',
      urlDetail: '',
      baseParams: this.$route.meta.params,
      baseParamsDetail: { limitSubNo: '' }, // 内容区域的树参数
      tabName: '1', // tab页签激活name
      formdata: {}, // 页面内表单
      formdataLeft: {}, // 左侧树的维护表单
      dialogTitle: '新增',
      disabledNo: false, // 左侧树的维护界面中的disable控制
      dialogVisible: false, // 左侧树的弹框
      saveBtnShow: true,
      checkedNodes: []
    };
  },
  computed: {
    ...mapState({
      org: state => state.oauth.org,
      loginCode: state => state.oauth.loginCode
    })
  },
  mounted: function () {
    // 表单数据初始化
    this.formdata.inputId = this.loginCode;
    this.formdata.inputBrId = this.org.code;
    this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
    if (this.$route.meta.params.viewType == 'DETAIL') {
      this.saveBtnShow = false;
    }
  },
  methods: {
    // 页面保存
    saveFn: function () {
      // 根据激活的页签判断 保存内容
      if (this.tabName == '1') {
        this.saveFormData();
      } else {
        this.saveTreeData();
      }
    },
    // 页面返回（关闭tab）
    backFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存内容区域的表单
    saveFormData: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      } // 向后台发送保存请求
      model.suitBizLine = model.suitBizLine.toString();
      var strurl = backend.cmisLmt + '/api/lmtsubbasicconf/updateConfInfoByLimitSubNo';
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTree.remoteData();
            _this.$message({ tyep: 'success', message: '保存成功！' });
          }
        }
      });
    },
    saveTreeData: function () {
      let _this = this;
      let strurl = backend.cmisLmt + '/api/lmtsubprdmappconf/saveLmtSubPrdMappConfList';
      let nodes = _this.$refs.refTreeDetail.getCheckedNodes();
      let checkVal = [];
      for (let i = 0; i < nodes.length; i++) {
        checkVal.push({ prdId: nodes[i].id, prdName: nodes[i].label });
      }
      let leftNode = this.$refs.refTree.getCurrentNode();
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: { limitSubNo: leftNode.id, lmtSubPrdMappConfListDto: checkVal },
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTree.remoteData();
            _this.$message({ tyep: 'success', message: '保存成功！' });
          }
        }
      });
    },
    // 树右键功能
    contentMenu: function (h, node) {
      window.event ? window.event.cancelBubble = true : window.event.stopPropagation();
      let _this = this;
      return h('ul', { style: { position: 'fixed', left: window.event.clientX + 'px', top: window.event.clientY + 'px', border: '1px solid #d1dbe5', 'z-index': '1', 'background-color': 'white' } }, [
        h('div', { style: { width: '60px', lineHeight: '30px', marginLeft: '5px' } }, [
          h('li', {
            domProps: { innerText: '新增' },
            on: {
              click: function () {
                _this.dialogTitle = '新增';
                _this.dialogVisible = true;
                _this.$nextTick(function () {
                  _this.disabledNo = false;
                  _this.$refs.refFormLeft.resetFields();
                });
              }
            }
          }),
          h('li', {
            domProps: { innerText: '修改' },
            on: {
              click: function () {
                _this.dialogTitle = '修改';
                _this.dialogVisible = true;
                _this.$nextTick(function () {
                  _this.disabledNo = true;
                  _this.$refs.refFormLeft.resetFields();
                  _this.formdataLeft.limitSubNo = node.data.id;
                  _this.formdataLeft.limitSubName = node.data.label;
                });
              }
            }
          }),
          h('li', {
            domProps: { innerText: '删除' },
            on: {
              click: function () {
                if (!node.data.parentId) {
                  _this.$message({ type: 'error', message: '不能删除根节点' });
                  return;
                }
                _this.deleteLeftTreeData(node);
              }
            }
          })
        ])
      ]);
    },
    cancelFn: function () {
      this.dialogVisible = false;
    },
    nodeClickFn: function (node) {
      const strurl = backend.cmisLmt + '/api/lmtsubbasicconf/queryConfInfoByLimitSubNo';
      const _this = this;
      // 查询右侧表单数据
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: { limitSubNo: node.id },
        callback: function (code, message, response) {
          yufp.clone(response.data && response.data[0], _this.formdata);
        }
      });
      this.baseParamsDetail = { limitSubNo: node.id };
      if (!this.urlDetail) {
        this.urlDetail = backend.cmisLmt + '/api/lmtsubbasicconf/selectCheckTreeList';
      }
    },
    setTreeChecked: function (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node.children && node.children.length > 0) {
          this.setTreeChecked(node.children);
        }
        if (node.check) {
          this.checkedNodes.push(node);
        }
      }
    },
    // 设置树选中数据
    loadTreeData: function (orginalData, response) {
      var _this = this;
      this.$nextTick(function () {
        _this.checkedNodes = [];
        _this.setTreeChecked(response.data);
        _this.$refs.refTreeDetail.setCheckedNodes(_this.checkedNodes);
      });
    },
    // 树维护的保存操作
    saveLeftTreeData: function () {
      let node = this.$refs.refTree.getCurrentNode();
      if (this.dialogTitle == '新增') {
        this.newLeftTreeData(node);
      } else if (this.dialogTitle == '修改') {
        this.updateLeftTreeData(node);
      }
    },
    newLeftTreeData: function (node) {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataLeft, model);
      var validate = false;
      _this.$refs.refFormLeft.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      } // 向后台发送保存请求
      var strurl = backend.cmisLmt + '/api/lmtsubbasicconf/create';
      model.parentId = node.id; // 父节点id
      model.limitStrNo = this.baseParams.limitStrNo; // 类型编码
      model.oprType = '01'; // 操作类型（新增,修改，删除）
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.dialogVisible = false;
          _this.$refs.refTree.remoteData();
        }
      });
    },
    updateLeftTreeData: function (node) {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataLeft, model);
      var validate = false;
      _this.$refs.refFormLeft.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      } // 向后台发送保存请求
      var strurl = backend.cmisLmt + '/api/lmtsubbasicconf/updateConfInfoByLimitSubNo';
      model.parentId = node.parentId; // 父节点id
      model.limitStrNo = this.baseParams.limitStrNo; // 类型编码
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.dialogVisible = false;
          _this.$refs.refTree.remoteData();
        }
      });
    },
    deleteLeftTreeData: function (node) {
      const _this = this;
      var model = {};
      model.parentId = node.data.parentId;
      model.limitStrNo = this.baseParams.limitStrNo;
      model.limitSubNo = node.data.id;
      var strurl = backend.cmisLmt + '/api/lmtsubbasicconf/deleteConfInfoByLimitSubNo';
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTree.remoteData();
        }
      });
    }
  }
};
</script>
