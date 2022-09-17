
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-xform ref="baseForm" label-width="120px" v-model="baseFormData" :disabled="op =='VIEW'">
      <yu-xform-group :clomn="2">
        <yu-xform-item label="申请提交日期" name="inputDate" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="业务性质" name="lmtType" ctype="select" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
        <yu-xform-item label="集团编号" name="grpCusId" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="集团名称" name="grpCusName" ctype="input" disabled></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-panel title="上期授信的基本情况" panel-type="simple">
      <yu-panel title="一般额度" panel-type="simple">
        <yu-panel title="上期授信情况" panel-type="simple">
          <yu-xtable ref="lastLmtTable" row-number :summary-method="getSummaries1" show-summary  :pageable="false" :data="lastLmtData" row-key="subPrdSerno" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
            <yu-xtable-column prop="subPrdSerno" label="分项流水号" ></yu-xtable-column>
            <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
            <yu-xtable-column prop="lmtBizTypeName" label="品种"></yu-xtable-column>
            <yu-xtable-column prop="lmtAmt" label="授信敞口"></yu-xtable-column>
            <yu-xtable-column prop="lmtTerm" label="授信期限"></yu-xtable-column>
            <yu-xtable-column prop="rateYear" label="年利率"></yu-xtable-column>
            <yu-xtable-column prop="bailPreRate" label="最低保证金比例"></yu-xtable-column>
            <yu-xtable-column prop="loanBalance" label="目前用信余额"></yu-xtable-column>
            <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="存量客户附加审查" panel-type="simple">
          <yu-xform ref="surveyForm" label-width="120px" v-model="surveydata" :disabled="op =='VIEW'">
            <yu-xform-group :clomn="2">
              <yu-xform-item label="上期授信要求" name="" ctype="textarea" disabled></yu-xform-item>
              <yu-xform-item label="落实情况" name="lastLmtNeedPactCase" ctype="textarea" rules="required"></yu-xform-item>
              <yu-xform-item label="压降计划" name="" ctype="textarea" disabled></yu-xform-item>
              <yu-xform-item label="落实情况" name="lastPdoActCaseMemo" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-panel>
      <yu-panel title="低风险额度" panel-type="simple">
        <yu-panel title="现有授信情况" panel-type="simple">
          <yu-xtable ref="lowTable" row-number show-summary :summary-method="getSummaries" :pageable="false" :data="lastLowData" row-key="subPrdSerno" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
            <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" ></yu-xtable-column>
            <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
            <yu-xtable-column prop="lmtBizTypeName" label="品种"></yu-xtable-column>
            <yu-xtable-column prop="lmtAmt" label="授信总额度"></yu-xtable-column>
            <yu-xtable-column prop="loanBalance" label="用信余额"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-panel>
    </yu-panel>
    <yu-panel title="有效预警情况" panel-type="simple">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="updateFn" v-show="op!='VIEW'">修改</yu-button>
      </yu-toolbar>
      <yu-xtable ref="effWarTable" row-number :data-url="effWarUrl" :pageable="false" :base-params="effWarParam" request-type="POST">
        <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
        <yu-xtable-column prop="altTime" label="预警时间"></yu-xtable-column>
        <yu-xtable-column prop="altType" label="预警种类"></yu-xtable-column>
        <yu-xtable-column prop="altSubType" label="预警子项"></yu-xtable-column>
        <yu-xtable-column prop="altOutDesc" label="预警输出描述"></yu-xtable-column>
        <yu-xtable-column prop="altRiskLvl" label="指标风险等级"></yu-xtable-column>
        <yu-xtable-column prop="altRiskEffectCus" label="预警信号对企业影响"></yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="有效预警情况修改" :visible.sync="dialogVisible" width="1000px">
        <yu-xform ref="refFormDialog" label-width="160px" v-model="formdataDialog">
          <yu-xform-group :column="2">
            <yu-xform-item label="成员名称" name="cusName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="预警时间" name="altTime" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="预警种类" name="altType" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="预警子项" name="altSubType" ctype="input"></yu-xform-item>
            <yu-xform-item label="预警输出描述" name="altOutDesc" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="指标风险等级" name="altRiskLvl" ctype="input"></yu-xform-item>
            <yu-xform-item label="预警信号对企业影响" name="altRiskEffectCus" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveEffWar">保存</yu-button>
            <yu-button type="primary" @click="canclFn">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      <yu-xform ref="surveyForm1" label-width="200px" v-model="surveydata1" :disabled="op =='VIEW'">
        <yu-xform-group>
          <yu-xform-item label="其他风险信息及处置情况" name="otherRiskEventExpl" ctype="textarea" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="本期授信申请情况" panel-type="simple">
      <yu-panel title="一般额度" panel-type="simple">
        <yu-xtable ref="thisLmtTable" row-number show-summary :summary-method="getSummaries" :pageable="false" :data="thisLmtData"  row-key="subPrdSerno" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
          <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" ></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="品种"></yu-xtable-column>
          <yu-xtable-column prop="lmtAmt" label="授信敞口"></yu-xtable-column>
          <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="rateYear" label="年利率"></yu-xtable-column>
          <yu-xtable-column prop="bailPreRate" label="最低保证金比例"></yu-xtable-column>
          <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="lmtTerm" label="授信期限"></yu-xtable-column>
        </yu-xtable>
        <yu-xform ref="surveyForm2" label-width="120px" v-model="surveydata2" :disabled="op =='VIEW'">
          <yu-xform-group :clomn="2">
            <yu-xform-item label="新增融资理由" name="newFinaReason" ctype="textarea" rules="required"></yu-xform-item>
            <yu-xform-item label="其他需说明的事项" name="otherNeedDesc" ctype="textarea" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="低风险额度" panel-type="simple">
        <yu-xtable ref="lowTable" row-number  show-summary :summary-method="getSummaries" :pageable="false" :data="thisLowData"  row-key="subPrdSerno" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
          <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" ></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="品种"></yu-xtable-column>
          <yu-xtable-column prop="lmtAmt" label="授信总额度"></yu-xtable-column>
          <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        </yu-xtable>
        <yu-xform ref="surveyForm3" label-width="300px" v-model="surveydata3" :disabled="op =='VIEW'">
          <yu-xform-group>
            <yu-xform-item label="额度的合理性分析和其他需说明事项" name="lmtRationAnaly" ctype="textarea" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
      <yu-button type="primary" @click="goBackFn" v-show="op!='VIEW'">返回</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_SX_LMT_TYPE');

export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      baseUrl: '',
      baseParam: {},
      baseFormData: {},
      lastLmtData: [],
      lastLowData: [],
      effWarUrl: '',
      effWarParam: {},
      thisLmtData: [],
      thisLowData: [],
      cusId: '',
      dialogVisible: false,
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
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
        url: _this.$backend.cmisBiz + '/api/lmtgrpapp/querylmtgrpappbygrpserno',
        data: JSON.stringify({ grpSerno: _this.param.grpSerno }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.baseFormData);
            _this.lmtType = response.data.lmtType;
            _this.grpCusId = response.data.grpCusId;
            if (_this.lmtType != '01') {
              _this.initLastLmt();
              _this.initEffWar();
            }
            _this.initThisLmt();
            _this.initRptBasic();
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
    },
    // 上期授信详情(一般额度和低风险额度)
    initLastLmt: function () {
      var _this = this;
      // 一般额度
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlastlmtappsubprd/initGrpLastLmt',
        data: {
          condition: JSON.stringify({
            grpCusId: _this.param.grpCusId,
            oprType: '01',
            type: 'normal'
          }),
          sort: 'replyInureDate desc'
        },
        callback: function (code, message, response) {
          if (code == 0) {
            _this.lastLmtData = response.data;
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
      // 低风险额度
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlastlmtappsubprd/initGrpLastLmt',
        data: {
          condition: JSON.stringify({
            grpCusId: _this.param.grpCusId,
            oprType: '01',
            type: 'low'
          }),
          sort: 'replyInureDate desc'
        },
        callback: function (code, message, response) {
          if (code == 0) {
            _this.lastLowData = response.data;
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
    // 有效预警情况
    initEffWar: function () {
      var _this = this;
      _this.effWarUrl =
        _this.$backend.cmisBiz + '/api/rptappinfoeffwar/selectGrpEffWar';
      _this.effWarParam = {
        condition: JSON.stringify({
          grpSerno: _this.param.grpSerno
        })
      };
    },
    // 本期授信情况
    initThisLmt: function () {
      var _this = this;
      // 一般额度
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtgrpmemrel/selectThisLmt',
        data: {
          condition: JSON.stringify({
            grpSerno: _this.param.grpSerno,
            type: 'normal'
          })
        },
        callback: function (code, message, response) {
          if (code == 0) {
            _this.thisLmtData = response.data;
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
      // 低风险额度
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtgrpmemrel/selectThisLmt',
        data: {
          condition: JSON.stringify({
            grpSerno: _this.param.grpSerno,
            type: 'low'
          })
        },
        callback: function (code, message, response) {
          if (code == 0) {
            _this.thisLowData = response.data;
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
    // 修改有效预警情况
    updateFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.effWarTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisible = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataDialog);
      });
    },
    goBackFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    saveEffWar: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refFormDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptappinfoeffwar/updateEffWar',
        data: _this.formdataDialog,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogVisible = false;
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
    },
    initRptBasic: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasic/selectBySerno',
        data: JSON.stringify({ serno: _this.param.grpSerno }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.surveydata);
            yufp.clone(response.data, _this.surveydata1);
            yufp.clone(response.data, _this.surveydata2);
            yufp.clone(response.data, _this.surveydata3);
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
    },
    // 弹窗关闭
    canclFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    // 保存按钮
    saveBtn: function () {
      var _this = this;
      var validate = false;
      var validate1 = false;
      var validate2 = false;
      var validate3 = false;
      _this.$refs.surveyForm.validate(function (valid) {
        validate = valid;
      });
      _this.$refs.surveyForm1.validate(function (valid) {
        validate1 = valid;
      });
      _this.$refs.surveyForm2.validate(function (valid) {
        validate2 = valid;
      });
      _this.$refs.surveyForm3.validate(function (valid) {
        validate3 = valid;
      });
      if (
        validate == false ||
        validate1 == false ||
        validate2 == false ||
        validate3 == false
      ) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var param = {};
      param.serno = _this.param.grpSerno;
      param.lastLmtNeedPactCase = _this.surveydata.lastLmtNeedPactCase;
      param.lastPdoActCaseMemo = _this.surveydata.lastPdoActCaseMemo;
      param.otherRiskEventExpl = _this.surveydata1.otherRiskEventExpl;
      param.newFinaReason = _this.surveydata2.newFinaReason;
      param.otherNeedDesc = _this.surveydata2.otherNeedDesc;
      param.lmtRationAnaly = _this.surveydata3.lmtRationAnaly;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasic/updateRptBasic',
        data: param,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.doMustCheck();
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
    },
    doMustCheck: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.grpSerno;
      obj.pageId = 'jtsxdcxx';
      obj.pageName = '集团授信调查信息';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    getSummaries: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) {
          if (item.children) {
            return Number(item[column.property]);
          }
        });
        if (
          !values.every(function (value) {
            return isNaN(value);
          })
        ) {
          if (index === 5) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '元';
          }
        }
      });
      return sums;
    },
    getSummaries1: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) {
          if (item.children) {
            return Number(item[column.property]);
          }
        });
        if (
          !values.every(function (value) {
            return isNaN(value);
          })
        ) {
          if (index === 5) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '元';
          }
          if (index === 9) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '元';
          }
        }
      });
      return sums;
    }
  }
};
</script>
