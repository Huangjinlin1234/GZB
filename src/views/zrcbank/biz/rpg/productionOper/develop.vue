
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="房地产行业" panel-type="simple">
      <yu-xform ref="basicForm" label-width="160px" v-model="basicFormData" :disabled="op =='VIEW'">
        <yu-xform-group :clomn="4">
          <yu-xform-item label="公司整体经营情况介绍" name="busiCase" ctype="textarea" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-panel title="已开发项目" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addDevelopedFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editDevelopedFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="deleteDevelopedFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="developedTable" row-number show-summary :pageable="false" :data-url="baseUrl" :base-params="developedData" request-type="POST">
          <yu-xtable-column prop="proName" label="项目名称"></yu-xtable-column>
          <yu-xtable-column prop="investScale" label="投资占比"></yu-xtable-column>
          <yu-xtable-column label="建设周期" align="center">
            <yu-xtable-column prop="startWorkDate" label="开工日期"></yu-xtable-column>
            <yu-xtable-column prop="endWorkDate" label="竣工日期"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column label="销售规模" align="center" width="200px">
            <yu-xtable-column prop="coverArea" label="占地面积"></yu-xtable-column>
            <yu-xtable-column prop="buildArea" label="建筑面积"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column label="建设规模" align="center" width="200px">
            <yu-xtable-column prop="soldArea" label="已售面积"></yu-xtable-column>
            <yu-xtable-column prop="unsoldArea" label="未售面积"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column prop="totalCost" label="开发总成本"></yu-xtable-column>
          <yu-xtable-column label="销售收入情况" align="center" width="300px">
            <yu-xtable-column prop="realSale" label="已实现销售"></yu-xtable-column>
            <yu-xtable-column prop="unrealSale" label="未实现销售"></yu-xtable-column>
          </yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="已开发项目" :visible.sync="dialogDeveloped" width="1000px">
          <yu-xform ref="developedDialogForm" label-width="160px" v-model="dialogFormDataDeveloped" >
            <yu-xform-group :column="2">
              <yu-xform-item label="项目名称" name="proName" ctype="input"></yu-xform-item>
              <yu-xform-item label="投资占比" name="investScale" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="开工日期" name="startWorkDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="竣工日期" name="endWorkDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="占地面积" name="coverArea" ctype="input"></yu-xform-item>
              <yu-xform-item label="建筑面积" name="buildArea" ctype="input"></yu-xform-item>
              <yu-xform-item label="已售面积" name="soldArea" ctype="input"></yu-xform-item>
              <yu-xform-item label="未售面积" name="unsoldArea" ctype="input"></yu-xform-item>
              <yu-xform-item label="开发总成本" name="totalCost" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="已实现销售" name="realSale" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="未实现销售" name="unrealSale" ctype="yu-num"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveDeveloped">保存</yu-button>
              <yu-button type="primary" @click="backDeveloped">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
      <yu-panel title="在开发楼盘" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addDevelopingFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editDevelopingFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="deleteDevelopingFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="developingTable" row-number show-summary :pageable="false" :data-url="baseUrl" :base-params="developingData" request-type="POST">
          <yu-xtable-column prop="proName" label="项目名称" width="100px"></yu-xtable-column>
          <yu-xtable-column prop="investScale" label="投资占比" width="100px"></yu-xtable-column>
          <yu-xtable-column label="预计建设周期" align="center" width="250px">
            <yu-xtable-column prop="startWorkDate" label="开工日期"></yu-xtable-column>
            <yu-xtable-column prop="endWorkDate" label="竣工日期"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column label="建设规模" align="center" width="100px">
            <yu-xtable-column prop="coverArea" label="占地面积"></yu-xtable-column>
            <yu-xtable-column prop="buildArea" label="建筑面积"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column prop="estimateInvest" label="预计总投资"></yu-xtable-column>
          <yu-xtable-column label="资金来源" align="center" width="100px">
            <yu-xtable-column prop="selfAmt" label="自有资金"></yu-xtable-column>
            <yu-xtable-column prop="bankFinance" label="银行融资"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column label="预计销售情况" align="center" width="200px">
            <yu-xtable-column prop="realSale" label="已实现销售"></yu-xtable-column>
            <yu-xtable-column prop="unrealSale" label="预计还可实现销售"></yu-xtable-column>
          </yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="在开发楼盘" :visible.sync="dialogDeveloping" width="1000px">
          <yu-xform ref="developingDialogForm" label-width="160px" v-model="dialogFormDataDeveloping">
            <yu-xform-group :column="2">
              <yu-xform-item label="项目名称" name="proName" ctype="input"></yu-xform-item>
              <yu-xform-item label="投资占比" name="investScale" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="开工日期" name="startWorkDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="竣工日期" name="endWorkDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="占地面积" name="coverArea" ctype="input"></yu-xform-item>
              <yu-xform-item label="建筑面积" name="buildArea" ctype="input"></yu-xform-item>
              <yu-xform-item label="自有资金" name="selfAmt" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="银行融资" name="bankFinance" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="预计总投资" name="estimateInvest" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="已实现销售" name="realSale" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="预计还可实现销售" name="unrealSale" ctype="yu-num"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveDeveloping">保存</yu-button>
              <yu-button type="primary" @click="backDeveloping">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
      <yu-panel title="土地储备情况" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addLandFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editLandFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="deleteLandFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="landTable" row-number show-summary :pageable="false" :data-url="baseUrl" :base-params="landData" request-type="POST">
          <yu-xtable-column prop="proName" label="项目名称"></yu-xtable-column>
          <yu-xtable-column prop="investScale" label="投资占比"></yu-xtable-column>
          <yu-xtable-column label="土地情况" align="center" width="600px">
            <yu-xtable-column prop="area" label="面积"></yu-xtable-column>
            <yu-xtable-column prop="cha" label="性质"></yu-xtable-column>
            <yu-xtable-column prop="planStarDate" label="预计开发时间"></yu-xtable-column>
            <yu-xtable-column prop="pledgeInd" label="是否抵押"></yu-xtable-column>
            <yu-xtable-column prop="pledgeBank" label="抵押行"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column label="土地费交纳情况" align="center" width="300px">
            <yu-xtable-column prop="landFeePayable" label="应付"></yu-xtable-column>
            <yu-xtable-column prop="landFeeNoPay" label="未付"></yu-xtable-column>
          </yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="土地储备情况" :visible.sync="dialogLand" width="1000px">
          <yu-xform ref="landDialog" label-width="160px" v-model="dialogFormLand">
            <yu-xform-group :column="2">
              <yu-xform-item label="项目名称" name="proName" ctype="input"></yu-xform-item>
              <yu-xform-item label="投资占比" name="investScale" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="面积" name="area" ctype="input"></yu-xform-item>
              <yu-xform-item label="性质" name="cha" ctype="select" data-code="STD_LAND_CHA"></yu-xform-item>
              <yu-xform-item label="预计开发时间" name="planStarDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="是否抵押" name="pledgeInd" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="抵押行" name="pledgeBank" ctype="input"></yu-xform-item>
              <yu-xform-item label="土地费交纳应付" name="landFeePayable" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="土地费交纳未付" name="landFeeNoPay" ctype="yu-num"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveLand">保存</yu-button>
              <yu-button type="primary" @click="backLand">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
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
      dialogDeveloped: false,
      dialogDeveloping: false,
      dialogLand: false,
      baseUrl:
        this.$backend.cmisBiz + '/api/rptoperdeveloprealestate/selectByModel',
      developedData: { condition: JSON.stringify({ proCha: '01' }) },
      developingData: { condition: JSON.stringify({ proCha: '02' }) },
      landData: { condition: JSON.stringify({ proCha: '03' }) },
      developedType: '',
      developingType: '',
      landType: '',
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
  },
  methods: {
    addDevelopedFn: function () {
      var _this = this;
      _this.dialogDeveloped = true;
      _this.developedType = 'add';
    },
    editDevelopedFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.developedTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogDeveloped = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataDeveloped);
      });
      _this.developedType = 'edit';
    },
    deleteDevelopedFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.developedTable.selections;
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
              url:
                backend.cmisBiz + '/api/rptoperdeveloprealestate/deleteDevelop',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.developedTable.remoteData();
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
    saveDeveloped: function () {
      var _this = this;
      if (_this.developedType == 'add') {
        _this.dialogFormDataDeveloped.serno = _this.param.serno;
        _this.dialogFormDataDeveloped.proCha = '01';
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperdeveloprealestate/insertDevelop',
          data: _this.dialogFormDataDeveloped,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogDeveloped = false;
              _this.$refs.developedDialogForm.resetFields();
              _this.$refs.developedTable.remoteData();

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
      } else if (_this.developedType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperdeveloprealestate/updateDevelop',
          data: _this.dialogFormDataDeveloped,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogDeveloped = false;
              _this.$refs.developedDialogForm.resetFields();
              _this.$refs.developedTable.remoteData();
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
    backDeveloped: function () {
      var _this = this;
      _this.dialogDeveloped = false;
      _this.$refs.developedDialogForm.resetFields();
    },
    addDevelopingFn: function () {
      var _this = this;
      _this.dialogDeveloping = true;
      _this.developingType = 'add';
    },
    editDevelopingFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.developingTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogDeveloping = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataDeveloping);
      });
      _this.developingType = 'edit';
    },
    deleteDevelopingFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.developingTable.selections;
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
              url:
                backend.cmisBiz + '/api/rptoperdeveloprealestate/deleteDevelop',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.developingTable.remoteData();
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
    saveDeveloping: function () {
      var _this = this;
      if (_this.developingType == 'add') {
        _this.dialogFormDataDeveloping.serno = _this.param.serno;
        _this.dialogFormDataDeveloping.proCha = '02';
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperdeveloprealestate/insertDevelop',
          data: _this.dialogFormDataDeveloping,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogDeveloping = false;
              _this.$refs.developingDialogForm.resetFields();
              _this.$refs.developingTable.remoteData();

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
      } else if (_this.developingType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperdeveloprealestate/updateDevelop',
          data: _this.dialogFormDataDeveloping,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogDeveloping = false;
              _this.$refs.developingDialogForm.resetFields();
              _this.$refs.developingTable.remoteData();
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
    backDeveloping: function () {
      var _this = this;
      _this.dialogDeveloping = false;
      _this.$refs.developingDialogForm.resetFields();
    },
    addLandFn: function () {
      var _this = this;
      _this.dialogLand = true;
      _this.landType = 'add';
    },
    editLandFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.landTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogLand = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormLand);
      });
      _this.landType = 'edit';
    },
    deleteLandFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.landTable.selections;
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
              url:
                backend.cmisBiz + '/api/rptoperdeveloprealestate/deleteDevelop',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.landTable.remoteData();
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
    saveLand: function () {
      var _this = this;
      if (_this.landType == 'add') {
        _this.dialogFormLand.serno = _this.param.serno;
        _this.dialogFormLand.proCha = '03';
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperdeveloprealestate/insertDevelop',
          data: _this.dialogFormLand,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogLand = false;
              _this.$refs.landDialog.resetFields();
              _this.$refs.landTable.remoteData();

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
      } else if (_this.landType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperdeveloprealestate/updateDevelop',
          data: _this.dialogFormLand,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogLand = false;
              _this.$refs.landDialog.resetFields();
              _this.$refs.landTable.remoteData();
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
    backLand: function () {
      var _this = this;
      _this.dialogLand = false;
      _this.$refs.landDialog.resetFields();
    }
  }
};
</script>
