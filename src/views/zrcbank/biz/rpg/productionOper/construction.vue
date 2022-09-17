
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="建筑业" panel-type="simple">
      <yu-xform ref="basicForm" label-width="160px" v-model="basicFormData" :disabled="op =='VIEW'">
        <yu-xform-group :clomn="2">
          <yu-xform-item label="所属性质" name="landCha" ctype="select" data-code="STD_LAND_CHA" disabled></yu-xform-item>
          <yu-xform-item label="施工或安装资质" name="consLic" ctype="textarea" disabled></yu-xform-item>
          <yu-xform-item label="经营模式" name="operMode" ctype="select" disabled></yu-xform-item>
          <yu-xform-item label="是否存在他人挂靠" name="otherDependInd" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="是否存在施工质量问题  " name="qualityIssueInd" data-code="STD_ZB_YES_NO" ctype="select" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="近年工程量情况" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item label="录入年月" name="inputYear" ctype="input" disabled colspan="8"></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="自建" panel-type="simple">
            <yu-panel title="最近三年" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="承接" name="nearThirdSelfBuildProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="已完工" name="nearThirdSelfFinProjcet" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="最近两年" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="承接" name="nearSecondSelfBuildProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="已完工" name="nearSecondSelfFinProjcet" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="最近一年" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="承接" name="nearFirstSelfBuildProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="已完工" name="nearFirstSelfFinProjcet" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="目前" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="在建工程" name="currSelfBuildProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="尚未动工工程" name="currSelfFinProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="意向性工程" name="currOtherDependBuildProjcet" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-panel>
          <yu-panel title="他人挂靠" panel-type="simple">
            <yu-panel title="最近三年" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="承接" name="nearThirdOtherDependBuildProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="已完工" name="nearThirdOtherDependFinProjcet" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="最近两年" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="承接" name="nearSecondOtherDependBuildProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="已完工" name="nearSecondOtherDependFinProjcet" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="最近一年" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="承接" name="nearFirstOtherDependBuildProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="已完工" name="nearFirstOtherDependFinProjcet" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="目前" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="在建工程" name="currOtherDependFinProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="尚未动工工程" name="currOtherDependNobuildProjcet" ctype="textarea"></yu-xform-item>
                <yu-xform-item label="意向性工程" name="currOtherDependReadyProjcet" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-panel>
        </yu-panel>
      </yu-xform>
      <yu-panel title="前几大工程完工回款情况" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addPayColFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editPayColFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="delectPayColFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="payColTable" row-number :pageable="false" :data-url="payColUrl" :base-params="payColData" request-type="POST">
          <yu-xtable-column prop="projectName" label="工程名称"></yu-xtable-column>
          <yu-xtable-column prop="projectAmt" label="工程金额"></yu-xtable-column>
          <yu-xtable-column prop="projectSpeed" label="工程进度"></yu-xtable-column>
          <yu-xtable-column prop="payRevicedAmt" label="已回款金额"></yu-xtable-column>
          <yu-xtable-column prop="" label="应收账款"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="前几大工程完工回款情况" :visible.sync="dialogPayCol" width="1000px">
          <yu-xform ref="payColDialog" label-width="160px" v-model="dialogFormPayCol">
            <yu-xform-group :column="2">
              <yu-xform-item label="工程名称" name="projectName" ctype="input"></yu-xform-item>
              <yu-xform-item label="工程金额" name="projectAmt" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="工程进度" name="projectSpeed" ctype="input"></yu-xform-item>
              <yu-xform-item label="已回款金额" name="payRevicedAmt" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="应收账款" name="" ctype="yu-num"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="savePayCol">保存</yu-button>
              <yu-button type="primary" @click="backPayCol">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-xform ref="otherDescForm" label-width="160px" v-model="otherDescFormData" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他需说明事项" name="otherNeedDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_LAND_CHA,STD_ZB_YES_NO');

export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      basicFormData: {},
      payColUrl: '',
      payColData: {},
      dialogPayCol: false,
      dialogFormPayCol: {},
      payColType: '',
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperconstruct/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.basicFormData);
            yufp.clone(response.data, _this.otherDescFormData);
            _this.payColUrl =
              _this.$backend.cmisBiz +
              '/api/rptoperconstructpaycol/selectByModel';
            _this.payColData = {
              condition: JSON.stringify({ serno: _this.param.serno })
            };
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
    },
    addPayColFn: function () {
      var _this = this;
      _this.dialogPayCol = true;
      _this.payColType = 'add';
    },
    editPayColFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.payColTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogPayCol = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormPayCol);
      });
      _this.payColType = 'edit';
    },
    delectPayColFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.payColTable.selections;
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
              url: backend.cmisBiz + '/api/rptoperconstructpaycol/deletePayCol',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.init();
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
    savePayCol: function () {
      var _this = this;
      if (_this.payColType == 'add') {
        _this.dialogFormPayCol.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptoperconstructpaycol/insert',
          data: _this.dialogFormPayCol,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogPayCol = false;
              _this.$refs.payColDialog.resetFields();
              _this.init();
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
      } else if (_this.payColType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptoperconstructpaycol/updatePayCol',
          data: _this.dialogFormPayCol,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogPayCol = false;
              _this.$refs.payColDialog.resetFields();
              _this.init();
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
    backPayCol: function () {
      var _this = this;
      _this.dialogPayCol = false;
      _this.$refs.payColDialog.resetFields();
    },
    saveBtn: function () {
      var _this = this;

      _this.basicFormData.otherNeedDesc = _this.otherDescFormData.otherNeedDesc;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperconstruct/updateConstruct',
        data: _this.basicFormData,
        callback: function (code, message, response) {
          if (response.data > 0) {
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
  }
};
</script>
