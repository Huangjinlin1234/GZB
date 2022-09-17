<template>
  <div>
    <div v-if="!reportType" style="margin-top:200px">
      <yu-xform ref="refForm" label-width="500px" v-model="formReport">
        <yu-xform-group :column="1">
          <yu-xform-item label="请选择报告类型" name="rptType" ctype="select" data-code="STD_RPT_TYPE"  :disabled="isEdit" :datacode-filter="datacodeFilterFn" colspan="14">
          </yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="yu-grpButton" style="margin-top:20px">
        <yu-button type="primary" @click="saveBtn" v-if="!isEdit&&param.op!='VIEW'">保存</yu-button>
        <yu-button type="primary" @click="editFn" v-if="isEdit&&param.op!='VIEW'">变更调查报告模板</yu-button>
        <yu-button type="primary" @click="nextFn" v-if="next">下一步</yu-button>
        <yu-button type="primary" @click="back" v-if="!next">返回</yu-button>
      </div>
    </div>
    <div class="tab-form" v-else>
      <yu-panel title="对公客户授信调查报告" panel-type="simple">
        <yu-tabs type="card" v-model="activeName" :before-leave="changeTab"  @tab-click="tabClick">
          <yu-tab-pane label="申请信息" v-if="baseInfo" name="base">
            <basicInfo ref="basicInfo" :param="param"></basicInfo>
          </yu-tab-pane>
          <yu-tab-pane label="企业基本情况与关联情况" v-if="asso" name="asso" >
            <basicInfoAsso ref="basicInfoAsso" :param="param"></basicInfoAsso>
          </yu-tab-pane>
          <yu-tab-pane label="企业经营情况" v-if="oper" name="operation">
            <rptOperation ref="rptOperation" :param="param"></rptOperation>
          </yu-tab-pane>
          <yu-tab-pane label="融资情况" v-if="cptl" name="cptl">
            <rptCptlSitu ref="rptCptlSitu" :param="param"></rptCptlSitu>
          </yu-tab-pane>
          <yu-tab-pane label="财务情况" v-if="situ" name="situ">
            <situOperation ref="situOperation" :param="param"></situOperation>
          </yu-tab-pane>
          <yu-tab-pane label="特定产品分析" v-if="product" name="product">
            <rptProductAnys ref="rptProductAnys" :param="param"></rptProductAnys>
          </yu-tab-pane>
          <yu-tab-pane label="授信可行性及还款能力分析" v-if="repay" name="repay">
            <lmtRepayAnys ref="lmtRepayAnys" :param="param"></lmtRepayAnys>
          </yu-tab-pane>
          <yu-tab-pane label="其他事项申请" v-if="otherApp" name="other">
            <rptOtherAppNoAppGuar ref="rptOtherAppNoAppGuar" :param="param"></rptOtherAppNoAppGuar>
          </yu-tab-pane>
          <yu-tab-pane label="结论" v-if="conclusion" name="conclusion">
            <rptConclusion ref="rptConclusion" :param="param"></rptConclusion>
          </yu-tab-pane>
        </yu-tabs>
      </yu-panel>
    </div>
  </div>
</template>

<script>
import basicInfo from './basicInfo';
import basicInfoAsso from './basicInfoAsso';
import rptOperation from './rptOperation';
import situOperation from './situOperation';
import rptProductAnys from './rptProductAnys';
import rptCptlSitu from './rptCptlSitu';
import lmtRepayAnys from './lmtRepayAnys';
import rptOtherAppNoAppGuar from './rptOtherAppNoAppGuar';
import rptConclusion from './rptConclusion';
yufp.lookup.reg('STD_RPT_TYPE');
export default {
  components: {
    basicInfo,
    basicInfoAsso,
    rptOperation,
    situOperation,
    rptProductAnys,
    rptCptlSitu,
    lmtRepayAnys,
    rptOtherAppNoAppGuar,
    rptConclusion
  },
  props: {
    serno: String
  },
  data: function () {
    return {
      param: {},
      baseInfo: true,
      asso: true,
      oper: true,
      situ: true,
      cptl: true,
      product: true,
      repay: true,
      otherApp: true,
      conclusion: true,
      refine: false,
      reportType: false,
      reportDetail: '',
      enterprise: false,
      smcon: false,
      person: false,
      formReport: {},
      rptTypeList: '',
      isGrp: false,
      activeName: 'base',
      isEdit: false,
      next: false,
      flag: false,
      wtdkType: true,
      grjyxType: true,
      grjyxwyType: true,
      xqybzbType1: false,
      xqybzbType: true,
      gdxmdkType1: false,
      gdxmdkType: true,
      jyxwyType1: false,
      rptType: '',
      riskType: true
    };
  },
  created () {
    var _this = this;
    if (_this.serno) {
      _this.param.serno = _this.serno;
      _this.isGrp = true;
    } else if (this.getFactory().contextData.instanceInfo) {
      _this.param.serno = this.getFactory().contextData.instanceInfo.bizId;
      _this.param.cusId = this.getFactory().contextData.instanceInfo.bizUserId;
      _this.param.cusName = this.getFactory().contextData.instanceInfo.bizUserName;
      _this.param.op = 'VIEW';
    } else if (this.$route.meta.params) {
      _this.param.op = this.$route.meta.params.op;
      _this.param.serno = this.$route.meta.params.serno;
      _this.param.cusId = this.$route.meta.params.cusId;
      _this.param.cusName = this.$route.meta.params.cusName;
    } else if (this.getFactory().contextData.serno) {
      _this.param.serno = this.getFactory().contextData.serno;
      _this.param.cusId = this.getFactory().contextData.cusId;
      _this.param.cusName = this.getFactory().contextData.cusName;
      _this.param.op = this.getFactory().contextData.op;
    }
    _this.param.refine = _this.refine;
    if (this.getFactory().contextData.instanceInfo) {
      _this.init();
      _this.nextFn();
    } else {
      _this.init();
    }
  },
  mounted: function () {
    var _this = this;
    _this.formReport.rptType = _this.rptType;
  },
  methods: {
    // 查询是否有报告类型
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/lmtapp/getLmtAppCusData',
        data: JSON.stringify({ serno: this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            _this.reportDetail = response.data.rptType;
            _this.cusCatalog = response.data.cusCatalog;
            _this.isSmconCus = response.data.isSmconCus;
            if (_this.reportDetail != null && _this.reportDetail != '') {
              _this.rptType = _this.reportDetail;
              _this.isEdit = true;
              _this.next = true;
            } else {
              _this.isEdit = false;
            }
            _this.initSubPrd(_this.param.serno);
          }
        }
      });
    },
    initSubPrd: function (serno) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsubprd/selectSubPrdBySerno',
        data: serno,
        callback: function (code, message, response) {
          if (response.data != null && response.data.length > 0) {
            response.data.forEach(function (item) {
              // 低风险
              if (!item.guarMode || item.guarMode != '60') {
                _this.riskType = false;
              }
              // 经营性物业
              if (item.lmtBizType != '14010401') {
                _this.jyxwyType = false;
              }
              // 房地产开发贷
              if (!item.lmtBizType.startsWith('140102')) {
                _this.fdckfType = false;
              }
              // 固定项目贷款
              if (!item.lmtBizType.startsWith('140101') || !item.lmtBizType.startsWith('140103') || !item.lmtBizType.startsWith('140105')) {
                _this.gdxmdkType = false;
              }
              // 固定项目贷款(混合版)
              if (item.lmtBizType.startsWith('140101') || item.lmtBizType.startsWith('140103') || item.lmtBizType.startsWith('140105')) {
                _this.gdxmdkType1 = true;
              }
              // 经营性物业(混合版)
              if (item.lmtBizType == '14010401') {
                _this.jyxwyType1 = true;
              }
              if (item.lmtBizTypeProp && item.lmtBizTypeProp != null) {
                // 小企业标准版
                if (item.lmtBizTypeProp != 'P016' || item.lmtBizTypeProp != 'P013' || item.lmtBizTypeProp != 'P016' || item.lmtBizTypeProp != 'P011' || item.lmtBizTypeProp != 'P014' || item.lmtBizTypeProp != 'P009' || item.lmtBizTypeProp != 'P015' || item.lmtBizTypeProp != 'P032' || item.lmtBizTypeProp != 'P019') {
                  _this.xqybzbType = false;
                }
                if (item.lmtBizTypeProp == 'P016' || item.lmtBizTypeProp == 'P013' || item.lmtBizTypeProp == 'P016' || item.lmtBizTypeProp == 'P011' || item.lmtBizTypeProp == 'P014' || item.lmtBizTypeProp == 'P009' || item.lmtBizTypeProp == 'P015' || item.lmtBizTypeProp == 'P032' || item.lmtBizTypeProp == 'P019') {
                  _this.xqybzbType1 = true;
                }
              }
              // 委托贷款
              if (item.lmtBizType != '14020301') {
                _this.wtdkType = false;
              }
              // 个人经营性贷款
              if (item.lmtBizType != '20010102') {
                _this.grjyxType = false;
              }
              // 个人经营性物业贷款
              if (item.lmtBizType != '20020101') {
                _this.grjyxwyType = false;
              }
            });
          } else {
            _this.flag = true;
          }
        }
      });
    },
    selectReport: function () {
      var _this = this;
      // 公司通用版
      _this.param.rptType = _this.reportDetail;
      if (_this.reportDetail == 'C01') {
        _this.param.condition3 = true;
      } else if (_this.reportDetail == 'C02') {
        // 公司简化版
        _this.product = false;
        _this.param.condition1 = true;
      } else if (_this.reportDetail == 'C03') {
        // 公司低风险版
        _this.oper = false;
        _this.param.lowRisk = true;
        _this.product = false;
      } else if (_this.reportDetail == 'C04') {
        // 经营性物业（企业）
        _this.param.sales = false;
        _this.param.profit = false;
        _this.param.jywyd = true;
        _this.param.condition2 = true;
      } else if (_this.reportDetail == 'C05') {
        // 房地产开发贷
        _this.param.condition1 = true;
        _this.param.fdckfd = true;
      } else if (_this.reportDetail == 'C06') {
        // 固定资产贷款
        _this.param.condition2 = true;
        _this.param.gdxmd = true;
      } else if (_this.reportDetail == 'C07') {
        // 融资租赁公司
        _this.param.condition1 = true;
        _this.product = false;
      } else if (_this.reportDetail == 'C08') {
        // 公司混合版（固定资产贷款）
        _this.param.condition2 = true;
        _this.param.gdxmd = true;
      } else if (_this.reportDetail == 'C09') {
        // 公司混合版（经营性物业）
        _this.param.condition2 = true;
        _this.param.jywyd = true;
      } else if (_this.reportDetail == 'C10') {
        // 小企业通用版
        _this.param.sales = false;
        _this.param.profit = false;
        _this.param.condition4 = true;
        _this.product = false;
      } else if (_this.reportDetail == 'C11') {
        // 小企业标准化产品
        _this.oper = false;
        _this.param.condition5 = true;
      } else if (_this.reportDetail == 'C12') {
        // 小企业混合版（固定资产贷款）
        _this.oper = false;
        _this.param.condition4 = true;
        _this.param.gdxmd = true;
      } else if (_this.reportDetail == 'C13') {
        // 小企业混合版（经营性物业）
        _this.oper = false;
        _this.param.condition4 = true;
        _this.param.jywyd = true;
      } else if (_this.reportDetail == 'C14') {
        // 小企业混合版（普通与单户标准化混）
        _this.oper = false;
        _this.param.condition4 = true;
      } else if (_this.reportDetail == 'C15') {
        // 委托贷款
        _this.param.sales = false;
        _this.param.profit = false;
        _this.param.condition2 = true;
        _this.param.wtdk = true;
      } else if (_this.reportDetail == 'I01') {
        // 个人经营性贷款(有企业)
        _this.param.person = true;
        _this.param.sales = false;
        _this.param.profit = false;
        _this.param.condition2 = true;
        _this.product = false;
      } else if (_this.reportDetail == 'I02') {
        // 个人经营性贷款(无企业)
        _this.param.person = true;
        _this.param.sales = false;
        _this.param.profit = false;
        _this.param.condition1 = true;
        _this.product = false;
      } else if (_this.reportDetail == 'I03') {
        // 经营性物业(个人)
        _this.param.person = true;
        _this.param.asso = false;
        _this.oper = false;
        _this.situ = false;
        _this.cptl = false;
        _this.param.jywyd = true;
      } else if (_this.reportDetail == 'I04') {
        // 个人标准化产品（有企业）
        _this.param.person = true;
        _this.param.sales = false;
        _this.param.profit = false;
        _this.param.situ = false;
        _this.param.condition5 = true;
      } else if (_this.reportDetail == 'I05') {
        // 个人标准化产品（无企业）
        _this.param.person = true;
        _this.param.personAsso = false;
        _this.param.sales = false;
        _this.param.profit = false;
        _this.param.condition5 = true;
        _this.param.jxd = true;
        _this.param.sxkd = true;
        _this.param.dbrPersonOper = true;
      }
      if (_this.isGrp) {
        _this.baseInfo = false;
        _this.otherApp = false;
        _this.conclusion = false;
        _this.isGrp = true;
      }
    },
    editFn: function () {
      var _this = this;
      _this.isEdit = false;
      _this.next = false;
    },
    saveBtn: function () {
      var _this = this;
      let obj = {};
      obj.serno = _this.param.serno;
      obj.rptType = _this.formReport.rptType;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtapp/updateBySerno',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功！'
            });
            _this.reportType = true;
            _this.init();
            _this.selectReport();
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
    nextFn: function () {
      var _this = this;
      _this.reportType = true;
      _this.selectReport();
    },
    // 返回上一页面
    back: function () {
      var _this = this;
      _this.isEdit = true;
      _this.next = true;
    },
    // 切换页签
    changeTab: function (activeName, oldActiveName) {
      var _this = this;
      // if (!_this.isGrp) {
      //   if (oldActiveName == 'base') {
      //     _this.$refs.basicInfo.tempSave();
      //   } else if (oldActiveName == 'asso') {
      //     _this.$refs.basicInfoAsso.tempSave();
      //   } else if (oldActiveName == 'operation') {
      //     _this.$refs.rptOperation.tempSave();
      //   }
      // }
    },
    tabClick: function (tab) {
      if (tab.name == 'asso') {
        this.$refs.basicInfoAsso.initBase();
      } else if (tab.name == 'operation') {
        this.$refs.rptOperation.init();
      } else if (tab.name == 'cptl') {
        if (!this.param.lowRisk) {
          this.$refs.rptCptlSitu.init();
        }
      } else if (tab.name == 'situ') {
        this.$refs.situOperation.init();
      } else if (tab.name == 'product') {
        this.$refs.rptProductAnys.init();
      } else if (tab.name == 'repay') {
        this.$refs.lmtRepayAnys.init();
      } else if (tab.name == 'other') {
        this.$refs.rptOtherAppNoAppGuar.init();
      } else if (tab.name == 'conclusion') {
        this.$refs.rptConclusion.initConclusion();
      }
    },
    /**
     * 调查报告类型 字典项过滤
     */
    datacodeFilterFn (opts, datacode, name) {
      var _this = this;
      if (_this.flag) {
        return opts.filter(function (op) {
          if (op.key == 'C01' || op.key == 'C02' || op.key == 'C03' || op.key == 'C04' || op.key == 'C05' || op.key == 'C06' || op.key == 'C07' || op.key == 'C08' || op.key == 'C09' || op.key == 'C10' || op.key == 'C11' || op.key == 'C12' || op.key == 'C13' || op.key == 'C14' || op.key == 'C15' || op.key == 'I01' || op.key == 'I02' || op.key == 'I03' || op.key == 'I04' || op.key == 'I05') {
            return true;
          }
          return false;
        });
      }
      if (_this.wtdkType) {
        return opts.filter(function (op) {
          // 委托贷款
          if (op.key == 'C15') {
            return true;
          }
          return false;
        });
      }
      // 低风险版
      if (_this.riskType) {
        return opts.filter(function (op) {
          if (op.key == 'C03') {
            return true;
          }
          return false;
        });
      }
      if (_this.cusCatalog == '1') {
        return opts.filter(function (op) {
          // 个人经营性贷款
          if (_this.xqybzbType1) {
            // 个人标准化产品
            if (op.key == 'I04' || op.key == 'I05') {
              return true;
            }
          } else if (_this.grjyxType) {
            if (op.key == 'I01' || op.key == 'I02') {
              return true;
            }
          } else if (_this.grjyxwyType) {
            // 个人经营性物业
            if (op.key == 'I03') {
              return true;
            }
          } else {
            if (op.key == 'I01' || op.key == 'I02' || op.key == 'I03' || op.key == 'I04' || op.key == 'I05') {
              return true;
            }
          }
          return false;
        });
      } else if (_this.cusCatalog == '2') {
        if (_this.isSmconCus == '1') {
          return opts.filter(function (op) {
            // 小企业标准版
            if (op.key == 'C10') {
              return true;
            }
            if (_this.xqybzbType) {
              if (op.key == 'C10' || op.key == 'C11') {
                return true;
              }
            }
            if (!_this.xqybzbType && _this.xqybzbType1) {
              // 小企业混合版（普通与单户标准化混）
              if (op.key == 'C10' || op.key == 'C14') {
                return true;
              }
            }

            if (_this.gdxmdkType1) {
              // 小企业混合版（固定资产贷款）
              if (op.key == 'C10' || op.key == 'C12') {
                return true;
              }
            }
            if (_this.jyxwyType1) {
              // 小企业混合版（经营性物业）
              if (op.key == 'C10' || op.key == 'C13') {
                return true;
              }
            }
            return false;
          });
        } else if (!_this.isSmconCus || _this.isSmconCus == '0') {
          return opts.filter(function (op) {
            // 公司简化版
            if (_this.isNatctl == '1') {
              if (op.key == 'C01' || op.key == 'C02' || op.key == 'C07') {
                return true;
              }
            }
            if (_this.jyxwyType) {
              // 经营性物业（企业）
              if (op.key == 'C04') {
                return true;
              }
            } else if (_this.fdckfType) {
              // 房地产开发贷
              if (op.key == 'C05') {
                return true;
              }
            } else if (_this.gdxmdkType) {
              // 固定资产贷款
              if (op.key == 'C01' || op.key == 'C06' || op.key == 'C07') {
                return true;
              }
            } else if (!_this.gdxmdkType && _this.gdxmdkType1) {
              // 公司混合版（固定资产贷款）
              if (op.key == 'C01' || op.key == 'C08' || op.key == 'C07') {
                return true;
              }
            } else if (!_this.jyxwyType && _this.jyxwyType1) {
              // 公司混合版（经营性物业）
              if (op.key == 'C01' || op.key == 'C09' || op.key == 'C07') {
                return true;
              }
            } else {
              if (op.key == 'C01' || op.key == 'C02' || op.key == 'C04' || op.key == 'C05' || op.key == 'C06' || op.key == 'C07' || op.key == 'C08' || op.key == 'C09') {
                return true;
              }
            }
          });
        } else {
          return opts.filter(function (op) {
            if (op.key == 'C01' || op.key == 'C02' || op.key == 'C03' || op.key == 'C04' || op.key == 'C05' || op.key == 'C06' || op.key == 'C07' || op.key == 'C08' || op.key == 'C09' || op.key == 'C10' || op.key == 'C11' || op.key == 'C12' || op.key == 'C13' || op.key == 'C14' || op.key == 'C15' || op.key == 'I01' || op.key == 'I02' || op.key == 'I03' || op.key == 'I04' || op.key == 'I05') {
              return true;
            }
            return false;
          });
        }
      } else {
        return opts.filter(function (op) {
          if (op.key == 'C01' || op.key == 'C02' || op.key == 'C03' || op.key == 'C04' || op.key == 'C05' || op.key == 'C06' || op.key == 'C07' || op.key == 'C08' || op.key == 'C09' || op.key == 'C10' || op.key == 'C11' || op.key == 'C12' || op.key == 'C13' || op.key == 'C14' || op.key == 'C15' || op.key == 'I01' || op.key == 'I02' || op.key == 'I03' || op.key == 'I04' || op.key == 'I05') {
            return true;
          }
          return false;
        });
      }
    }
  }
};
</script>

<style></style>
