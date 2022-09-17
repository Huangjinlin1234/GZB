
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="免追加担保" panel-type="simple">
      <div>
        <span>不符合下述条件但仍需要免追加的需填写该申请<br></span>
        <span>一、满足下列情况之一的，可免除追加法人代表配偶和成年子女保证担保：<br></span>
        <span>1、按我行抵押率规定办理抵押，未提高抵押率，且为房地产足额抵押的（光地抵押、协议价抵押、年租制土地上的房产抵押除外）；<br></span>
        <span>2、我行认定的一类担保公司保证担保的；<br></span>
        <span>3、法人代表不是实际控制人的；<br></span>
        <span>4、国有控股类经营性公司的融资；<br></span>
        <span>5、借款人为上市公司的（不含“新三板”挂牌企业）；<br></span>
        <span>6、法人代表前配偶；法人代表成年子女随前配偶生活且不参与企业生产经营的。<br></span>
        <span>7、客户内部评级在2A级以上的；<br></span>
        <span>二、下列情况可免除追加成年子女担保：<br></span>
        <span>1、成年女儿已出嫁，且不参与经营的；<br></span>
        <span>2、成年子女在异地或国外读书、工作、服兵役等。<br></span>
        <br>
      </div>
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addNoAddGuarFn" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editNoAddGuarFn" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteNoAddGuarFn" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
      <yu-xtable ref="noAddGuarTable" row-number :pageable="false" :data-url="noAddGuarUrl" :base-params="noAddGuarData" request-type="POST">
        <yu-xtable-column prop="proType" label="项目" data-code="STD_OTHER_PRD_TYPE"></yu-xtable-column>
        <yu-xtable-column prop="noAddReason" label="具体免追加理由说明"></yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="免追加担保" :visible.sync="dialogNoAddGuar" width="1000px">
        <yu-xform ref="noAddGuarDialogForm" label-width="160px" v-model="dialogFormDataNoAddGuar">
          <yu-xform-group :column="2">
            <yu-xform-item label="项目名称" name="proType" ctype="select" data-code="STD_OTHER_PRD_TYPE" :datacode-filter="datacodeFilterFn" ></yu-xform-item>
            <yu-xform-item label="具体免追加理由说明" name="noAddReason" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveNoAddGuar">保存</yu-button>
            <yu-button type="primary" @click="backNoAddGuar">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
    <yu-panel title="其他事项申请" panel-type="simple">
    <div>
    <span>免查征信申请特别提示：<br></span>
    <span>1、我行相关制度中允许免除征信查询的无须填写该表；<br></span>
    <span>2、无正当理由不得免除征信查询，总行有权驳回该申请。<br></span>
    <span>制度要求：<br></span>
    <span>1、如果企业股东是夫妻关系或是其他直系亲属关系的，应查询夫妻双方或直系亲属的个人信用报告；<br></span>
    <span>2、如果企业不愿查询法人代表及实际控制人的个人信用报告，应在调查报告中说明原因。<br></span>
    <span>3、借款人主体为国有控股类公司、镇村级经济合作社的法人代表可不提供个人征信报告。<br></span>
    <br>
    </div>
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addOtherAddFn" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editOtherAddFn" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteOtherAddFn" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
      <yu-xtable ref="otherAddTable" row-number :pageable="false" :data-url="otherAddUrl" :base-params="otherAddData" request-type="POST">
        <yu-xtable-column prop="proType" label="项目" data-code="STD_OTHER_PRD_TYPE"></yu-xtable-column>
        <yu-xtable-column prop="noAddReason" label="具体免追加理由说明"></yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="其他事项申请" :visible.sync="dialogOtherAdd" width="1000px">
        <yu-xform ref="otherAddDialogForm" label-width="160px" v-model="dialogFormDataOtherAdd">
          <yu-xform-group :column="2">
            <yu-xform-item label="项目名称" name="proType" ctype="select" data-code="STD_OTHER_PRD_TYPE"  :datacode-filter="datacodeFilterFn1"></yu-xform-item>
            <yu-xform-item label="具体免追加理由说明" name="noAddReason" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveOtherAdd">保存</yu-button>
            <yu-button type="primary" @click="backOtherAdd">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_OTHER_PRD_TYPE');

export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object,
    serno: String
  },
  data: function () {
    return {
      noAddGuarUrl:
        this.$backend.cmisBiz + '/api/rptotherappnoaddguar/selectByModel',
      noAddGuarData: {},
      otherAddUrl:
        this.$backend.cmisBiz + '/api/rptotherappnoaddguar/selectByModel',
      otherAddData: {},
      dialogNoAddGuar: false,
      dialogFormDataNoAddGuar: {},
      noAddGuarType: '',
      dialogOtherAdd: false,
      dialogFormDataOtherAdd: {},
      otherAddType: '',
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
  },
  methods: {
    init: function () {
      var _this = this;
      _this.noAddGuarData = {
        condition: JSON.stringify({ serno: _this.param.serno, proList: ['01', '02', '03', '04']})
      };
      _this.otherAddData = {
        condition: JSON.stringify({ serno: _this.param.serno, proList: ['05', '06']})
      };
    },
    addNoAddGuarFn: function () {
      var _this = this;
      _this.dialogNoAddGuar = true;
      _this.noAddGuarType = 'add';
    },
    editNoAddGuarFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.noAddGuarTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogNoAddGuar = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataNoAddGuar);
      });
      _this.noAddGuarType = 'edit';
    },
    deleteNoAddGuarFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.noAddGuarTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptotherappnoaddguar/deleteGuar',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.noAddGuarTable.remoteData();
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    saveNoAddGuar: function () {
      var _this = this;
      if (_this.noAddGuarType == 'add') {
        if (_this.serno) {
          _this.dialogFormDataNoAddGuar.serno = _this.serno;
        } else {
          _this.dialogFormDataNoAddGuar.serno = _this.param.serno;
        }

        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptotherappnoaddguar/insertGuar',
          data: _this.dialogFormDataNoAddGuar,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogNoAddGuar = false;
              _this.$refs.noAddGuarDialogForm.resetFields();
              _this.$refs.noAddGuarTable.remoteData();

              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else if (_this.noAddGuarType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptotherappnoaddguar/updateGuar',
          data: _this.dialogFormDataNoAddGuar,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogNoAddGuar = false;
              _this.$refs.noAddGuarDialogForm.resetFields();
              _this.$refs.noAddGuarTable.remoteData();
              _this.$message({
                message: '操作成功！'
              });
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    backNoAddGuar: function () {
      var _this = this;
      _this.dialogNoAddGuar = false;
      _this.$refs.noAddGuarDialogForm.resetFields();
    },
    addOtherAddFn: function () {
      var _this = this;
      _this.dialogOtherAdd = true;
      _this.otherAddType = 'add';
    },
    editOtherAddFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.otherAddTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogOtherAdd = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataOtherAdd);
      });
      _this.otherAddType = 'edit';
    },
    deleteOtherAddFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.otherAddTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptotherappnoaddguar/deleteGuar',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.otherAddTable.remoteData();
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    saveOtherAdd: function () {
      var _this = this;
      if (_this.otherAddType == 'add') {
        if (_this.serno) {
          _this.dialogFormDataOtherAdd.serno = _this.serno;
        } else {
          _this.dialogFormDataOtherAdd.serno = _this.param.serno;
        }
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptotherappnoaddguar/insertGuar',
          data: _this.dialogFormDataOtherAdd,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogOtherAdd = false;
              _this.$refs.otherAddDialogForm.resetFields();
              _this.$refs.otherAddTable.remoteData();

              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else if (_this.otherAddType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptotherappnoaddguar/updateGuar',
          data: _this.dialogFormDataOtherAdd,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogOtherAdd = false;
              _this.$refs.otherAddDialogForm.resetFields();
              _this.$refs.otherAddTable.remoteData();
              _this.$message({
                message: '操作成功！'
              });
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    backOtherAdd: function () {
      var _this = this;
      _this.dialogOtherAdd = false;
      _this.$refs.otherAddDialogForm.resetFields();
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == '01' || op.key == '02' || op.key == '03' || op.key == '04') {
          return true;
        }
        return false;
      });
    },
    datacodeFilterFn1: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == '05' || op.key == '06') {
          return true;
        }
        return false;
      });
    }
  }
};
</script>
