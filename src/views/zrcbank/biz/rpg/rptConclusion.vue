
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="结论" panel-type="simple">
      <div v-if="!isGrp">
        <yu-xform ref="baseForm" label-width="120px" v-model="baseFormData" :disabled="op =='VIEW'">
          <yu-xform-group :clomn="1">
            <yu-xform-item label="主要优势" name="mainAdvant" ctype="textarea" rules="required"></yu-xform-item>
            <yu-xform-item label="风险点及对应的风控措施" name="riskMainPacmDesc" ctype="textarea" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
      <yu-panel title="一般授信额度" panel-type="simple">
        <yu-xtable ref="normalLmtTable" row-number :data="baseLmtData" :pageable="false" row-key="subPrdSerno"  border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" request-type="POST" >
          <yu-xtable-column label="展开/收起" prop="" width="120"></yu-xtable-column>
          <yu-xtable-column prop="subPrdSerno" label="授信分项编号" width="120"></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="成员名称" width="120" v-if="isGrp"></yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="授信品种" width="100"></yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeProp" label="产品类型属性" width="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
          <yu-xtable-column prop="lmtAmt" label="授信额度" width="100"></yu-xtable-column>
          <yu-xtable-column prop="lmtTerm" label="额度期限" width="100"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="isPreLmt" label="是否预授信额度" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="rateYear" label="年利率" width="100">
            <template slot-scope="scope">
               {{ isNaN(formatterNum(scope.row.rateYear))? '':formatterNum(scope.row.rateYear *100)+'%' }}
               </template>
          </yu-xtable-column>
          <yu-xtable-column prop="bailPreRate" label="最低保证金比例" width="120">
          <template slot-scope="scope">
               {{ isNaN(formatterNum(scope.row.bailPreRate))? '':formatterNum(scope.row.bailPreRate *100)+'%' }}
               </template>
          </yu-xtable-column>
          <yu-xtable-column prop="guarMode" label="担保方式" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="eiMode" label="结息方式" width="100" data-code="STD_EI_MODE"></yu-xtable-column>
          <yu-xtable-column prop="repayMode" label="还款方式" width="100" data-code="STD_REPAY_MODE"></yu-xtable-column>
          <yu-xtable-column prop="repayPlanDesc" label="还款计划描述" width="120" ></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <div v-if="wtdk">
      <yu-panel title="委托贷款额度" panel-type="simple">
        <yu-xtable ref="bailTable" row-number :data="baseLmtBailData" :pageable="false" row-key="subPrdSerno" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}"  request-type="POST">
          <yu-xtable-column label="展开/收起" prop="" width="120"></yu-xtable-column>
          <yu-xtable-column prop="subPrdSerno" label="授信分项编号" width="120"></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="成员名称" width="120" v-if="isGrp"></yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="授信品种" width="120"></yu-xtable-column>
          <yu-xtable-column prop="lmtAmt" label="授信额度" width="100"></yu-xtable-column>
          <yu-xtable-column prop="lmtTerm" label="额度期限" width="100"></yu-xtable-column>
          <yu-xtable-column prop="chrgRate" label="手续费率" width="100"></yu-xtable-column>
          <yu-xtable-column prop="chrgCollectMode" label="手续费率收取方式" data-code="STD_CHRG_COLLECT_MODE"></yu-xtable-column>
          <yu-xtable-column prop="rateYear" label="年利率" width="100">
            <template slot-scope="scope">
               {{ isNaN(formatterNum(scope.row.rateYear))? '':formatterNum(scope.row.rateYear *100)+'%' }}
               </template>
          </yu-xtable-column>
          <yu-xtable-column prop="isPreLmt" label="是否循环额度" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="bailPreRate" label="最低保证金比例" width="120">
            <template slot-scope="scope">
               {{ isNaN(formatterNum(scope.row.bailPreRate))? '':formatterNum(scope.row.bailPreRate *100)+'%' }}
               </template>
          </yu-xtable-column>
          <yu-xtable-column prop="guarMode" label="担保方式" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="eiMode" label="结息方式"  width="100" data-code="STD_EI_MODE"></yu-xtable-column>
          <yu-xtable-column prop="repayMode" label="还款方式" width="100" data-code="STD_REPAY_MODE"></yu-xtable-column>
          <yu-xtable-column prop="repayPlanDesc" label="还款计划描述" width="120" ></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      </div>
      <yu-panel title="还款计划" panel-type="simple">
        <yu-xtable ref="repayTable" row-number :data-url="repayUrl" :pageable="false" :default-load="false" :base-params="repayParam" request-type="POST">
          <yu-xtable-column prop="serno" label="授信分项编号"></yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="授信品种"></yu-xtable-column>
          <yu-xtable-column prop="repayDate" label="还款时间"></yu-xtable-column>
          <yu-xtable-column prop="repayAmt" label="还款金额"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xform ref="loanForm" label-width="120px" v-model="loanData" :disabled="op =='VIEW'">
        <yu-xform-group :clomn="1">
          <yu-xform-item label="用信条件" name="creditConditions" ctype="textarea" rules="required"></yu-xform-item>
          <yu-xform-item label="风控建议" name="riskControl" ctype="textarea" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg(
  'STD_PRD_TYPE_PROP,STD_ZB_GUAR_WAY,STD_EI_MODE,STD_REPAY_MODE,STD_CHRG_COLLECT_MODE,STD_ZB_YES_NO'
);

export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      baseFormData: {},
      baseLmtUrl: '',
      normalLmtParam: {},
      bailParam: {},
      repayUrl: '',
      repayParam: {},
      loanData: {},
      isGrp: false,
      op: '',
      baseLmtData: [],
      baseLmtBailData: [],
      wtdk: true
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    _this.isGrp = _this.param.isGrp;
    if (_this.param.isGrp) {
      _this.initConclusion();
    }
  },
  methods: {
    initConclusion: function () {
      var _this = this;
      if (_this.param.isGrp) {
        _this.isGrp = _this.param.isGrp;
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtappsubprd/getGrpNormalOrBailLmt',
          data: {
            condition: JSON.stringify({
              grpSerno: _this.param.grpSerno,
              type: 'normal'
            })
          },
          callback: function (code, message, response) {
            _this.baseLmtData = response.data;
          }
        });
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtappsubprd/getGrpNormalOrBailLmt',
          data: {
            condition: JSON.stringify({
              grpSerno: _this.param.grpSerno,
              type: 'bail'
            })
          },
          callback: function (code, message, response) {
            _this.baseLmtBailData = response.data;
            if (response.data == null || response.data.length == 0) {
              _this.wtdk = false;
            }
          }
        });
        _this.bailParam = {
          condition: JSON.stringify({
            grpSerno: _this.param.grpSerno,
            type: 'bail'
          })
        };
        _this.repayUrl = this.$backend.cmisBiz + '/api/repaycapplan/selectByGrpSerno';
        _this.repayParam = {grpSerno: _this.param.grpSerno};
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptbasic/selectBySerno',
          data: JSON.stringify({ serno: _this.param.grpSerno }),
          callback: function (code, message, response) {
            if (code == 0) {
              yufp.clone(response.data, _this.loanData);
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
      } else {
        _this.init();
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtappsubprd/getNormalOrBailLmt',
          data: {
            condition: JSON.stringify({
              serno: _this.param.serno,
              type: 'normal'
            })
          },
          callback: function (code, message, response) {
            _this.baseLmtData = response.data;
          }
        });
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtappsubprd/getNormalOrBailLmt',
          data: {
            condition: JSON.stringify({
              serno: _this.param.serno,
              type: 'bail'
            })
          },
          callback: function (code, message, response) {
            _this.baseLmtBailData = response.data;
            if (response.data == null || response.data.length == 0) {
              _this.wtdk = false;
            }
          }
        });
        _this.repayUrl = this.$backend.cmisBiz + '/api/repaycapplan/selectByLmtSerno';
        _this.repayParam = {serno: _this.param.serno};
      }
    },
    formatterNum: function (value) {
      return parseFloat(parseFloat(value).toFixed(2));
    },
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasic/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.baseFormData);
            yufp.clone(response.data, _this.loanData);
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
    saveBtn: function () {
      var _this = this;
      var validate1 = false;
      var validate2 = false;
      if (_this.param.isGrp) {
        validate1 = true;
      } else {
        _this.$refs.baseForm.validate(function (valid) {
          validate1 = valid;
        });
      }
      _this.$refs.loanForm.validate(function (valid) {
        validate2 = valid;
      });
      if (
        validate1 == false ||
        validate2 == false
      ) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      if (_this.param.isGrp) {
        _this.baseFormData.serno = _this.param.grpSerno;
      } else {
        _this.baseFormData.serno = _this.param.serno;
      }
      var obj = _this.baseFormData;
      obj.creditConditions = _this.loanData.creditConditions;
      obj.riskControl = _this.loanData.riskControl;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasic/updateRptBasic',
        data: _this.baseFormData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.doMustCheck();
            _this.$message({
              message: '保存成功'
            });
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
      obj.pageId = 'sxdcxx';
      obj.pageName = '授信调查信息';
      var url = '';
      if (_this.param.isGrp) {
        url = backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck';
        obj.serno = _this.param.grpSerno;
      } else {
        url = backend.cmisBiz + '/api/bizmustcheckdetails/rptCheck';
        obj.serno = _this.param.serno;
      }
      yufp.service.request({
        method: 'POST',
        url: url,
        data: obj,
        callback: function (code, message, response) {
        }
      });
    }
  }
};
</script>
