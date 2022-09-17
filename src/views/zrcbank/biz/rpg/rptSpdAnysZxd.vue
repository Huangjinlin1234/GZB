<template>
  <div>
    <yu-panel title="征信贷"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="op =='VIEW'" :form-type="viewType">
                <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                <yu-panel title="企业及实际控制人核心资产价值"  :hideFilter="false" :collapseHide="false">
                 <yu-xtable ref="assetTable" row-number :data-url="assetUrl" :pageable="false" :base-params="assetParam" request-type="POST">
                    <yu-xtable-column prop="assetName" label="资产名称"></yu-xtable-column>
                    <yu-xtable-column prop="gerpcPosiInvestCase" label="地址"></yu-xtable-column>
                    <yu-xtable-column prop="squ" label="面积"></yu-xtable-column>
                    <yu-xtable-column prop="marketValue" label="估值（万元）"></yu-xtable-column>
                    <yu-xtable-column prop="hasGuarAmt" label="已抵押金额（万元）"></yu-xtable-column>
                    <yu-xtable-column prop="lastGuarAmt" label="未抵押金额"></yu-xtable-column>
                    <yu-xtable-column prop="assetOwnerPerson" label="资产所有人"></yu-xtable-column>
                    <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
                  </yu-xtable>
                <yu-panel title="企业简要情况"  :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="3">
                  <yu-xform-item label="去年销售前三客户一名称" ctype="input" name="lastYearTopsell1CusName" ></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户一合作年限" ctype="yu-num"  name="lastYearTopsell1CoopTerm"></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户一上年度贡献销售收入" ctype="yu-num" name="lastYearTopsell1Income" ></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户二名称" ctype="input"  name="lastYearTopsell2CusName"></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户二合作年限" ctype="yu-num" name="lastYearTopsell2CoopTerm" ></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户二上年度贡献销售收入" ctype="yu-num"  name="lastYearTopsell2Income"></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户三名称" ctype="input" name="lastYearTopsell3CusName" ></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户三合作年限" ctype="yu-num"  name="lastYearTopsell3CoopTerm"></yu-xform-item>
                  <yu-xform-item label="去年销售前三客户三上年度贡献销售收入" ctype="yu-num" name="lastYearTopsell3Income" ></yu-xform-item>
                </yu-xform-group>
                <yu-xform-group :column="4">
                  <yu-xform-item label="最近二年企业主要经营场所性质" ctype="input"  name="lastTwoYearMainBusinessPermisesNature" ></yu-xform-item>
                  <yu-xform-item label="近两年经营场所变更次数" ctype="yu-num"  name="lastTwoYearBusinessPremisesChgTimes"></yu-xform-item>
                  <yu-xform-item label="企业去年收入占比不低于5%省份个数" ctype="yu-num"  name="tnopwtioeafnlt5ply"></yu-xform-item>
                  <yu-xform-item label="企业上年度所有供应商总供应量" ctype="yu-num"  name="tsoasitpy"></yu-xform-item>
                  <yu-xform-item label="超过90天应收账款余额" ctype="yu-num"  name="arbo90Days"></yu-xform-item>
                  <yu-xform-item label="超过180天应收账款余额" ctype="yu-num"  name="arbo180Days"></yu-xform-item>
                  <yu-xform-item label="去年耗用电量能耗值" ctype="yu-num"  name="lastYearElecricityConsumption"></yu-xform-item>
                  <yu-xform-item label="前年耗用电量能耗值" ctype="yu-num"  name="ecvopcitpy"></yu-xform-item>
                  <yu-xform-item label="去年发放工资总额" ctype="yu-num"  name="totalWagesPaidLastYear"></yu-xform-item>
                  <yu-xform-item label="前年发放工资总额" ctype="yu-num"  name="totalWpitpy"></yu-xform-item>
                  <yu-xform-item label="企业去年纳税总额" ctype="yu-num"  name="lastYearTaxTotalAmt"></yu-xform-item>
                  <yu-xform-item label="企业前年纳税总额" ctype="yu-num"  name="lastTwoYearTaxTotalAmt"></yu-xform-item>
                  <yu-xform-item label="可核实营业收入" ctype="yu-num"  name="verifiableOperatingIncome"></yu-xform-item>
                  <yu-xform-item label="借款人在我行结算账户销售回款" ctype="yu-num"  name="scotbsaiob"></yu-xform-item>
                  <yu-xform-item label="去年在我行日均存款" ctype="yu-num"  name="addiobly"></yu-xform-item>
                  <yu-xform-item label="去年在我行日均贷款" ctype="yu-num"  name="adliobly"></yu-xform-item>
                  <yu-xform-item label="客户对外负债" ctype="yu-num"  name="cusOutsideDebt"></yu-xform-item>
                  <yu-xform-item label="对外保证金额" ctype="yu-num"  name="outerGrtAmt"></yu-xform-item>
                  <yu-xform-item label="对外抵押金额" ctype="yu-num"  name="outerPldAmt"></yu-xform-item>
                  <yu-xform-item label="对外质押金额" ctype="yu-num"  name="outerImnAmt"></yu-xform-item>
                  <yu-xform-item label="风险评估得分" ctype="yu-num"  name="riskAssessGrade"></yu-xform-item>
                  <yu-xform-item label="系统测算最大授信额度（元）" ctype="yu-num"  name="calMaxLmtAmt"></yu-xform-item>
                  <yu-xform-item label="授信额度（元）" ctype="yu-num"  name="lmtAmt"></yu-xform-item>
                </yu-xform-group>
                </yu-panel>
                <yu-panel title="个体工商户销售收入交叉检验"  :hideFilter="false" :collapseHide="false">
                    <yu-xform-group :column="2" >
                        <yu-xform-item label="通过银行结算流水的分析，对借款人销售收入的交叉检验" ctype="input"  name="saleIncomeAnalysis"></yu-xform-item>
                        <yu-xform-item label="通过借款人纳税记录的分析，检验借款人销售收入的真实性" ctype="input"  name="taxIncomeAnalysis"></yu-xform-item>
                        <yu-xform-item label="通过存货、应收账款对借款人销售收入的交叉检验" ctype="input"  name="stockIncomeAnalysis"></yu-xform-item>
                        <yu-xform-item label="通过管理方直接获取的数据对借款人销售收入的交叉检验" ctype="input"  name="manageIncomeAnalysis"></yu-xform-item>
                    </yu-xform-group>
                </yu-panel>
                <yu-panel title="优税贷评分卡"  :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="pfkTable" :data-url="pfkUrl" :pageable="false" :base-params="pfkParam" :span-method="arraySpanMethod" show-summary="true" request-type="POST">
                    <yu-xtable-column prop="projectName1" label="具体项目名称1"></yu-xtable-column>
                    <yu-xtable-column prop="projectName2" label="具体项目名称2"></yu-xtable-column>
                    <yu-xtable-column prop="projectCondition" label="项目具体情况"></yu-xtable-column>
                    <yu-xtable-column prop="course" label="分值"></yu-xtable-column>
                    <yu-xtable-column prop="pfkJxdDesc" ctype="input"  label="简要情况描述"></yu-xtable-column>
                    <yu-xtable-column prop="pfkJxdGrade1" ctype="yu-num"  label="主办客户经理评分"></yu-xtable-column>
                    <yu-xtable-column prop="pfkJxdGrade2" ctype="yu-num"  label="协办客户经理评分"></yu-xtable-column>
                  </yu-xtable>
                </yu-panel>
               <yu-panel title="其他重点关注调查内容"  :hideFilter="false" :collapseHide="false">
               <yu-xform-group :column="2">
                  <yu-xform-item label="企业是否按时交纳各项税款，有无被税务机关查处和处罚" ctype="input"  name="focusYsd1"  ></yu-xform-item>
                  <yu-xform-item label="企业有无违规排污，有无被环保部门查处和处罚" ctype="input"  name="focusYsd2"  ></yu-xform-item>
                  <yu-xform-item label="实际控制人有无吸毒、赌博等不良嗜好，其信用卡是否经常在境外大额支付等" ctype="input" name="focusYsd3"  ></yu-xform-item>
                  <yu-xform-item label="实际控制人是否存在炒房、炒原材料、炒股票期货等投机行为" ctype="input" name="focusYsd4"  ></yu-xform-item>
                  <yu-xform-item label="企业员工人数是否稳定，员工待遇是否合理" ctype="input" name="focusYsd5"  ></yu-xform-item>
                  <yu-xform-item label="有无异常工商股权变更情况" ctype="input" name="focusYsd6"  ></yu-xform-item>
                  <yu-xform-item label="有无其他影响企业稳定经营的情况" ctype="input" name="focusYsd7"  ></yu-xform-item>
                  <yu-xform-item label="实际控制人是否参与民间融资、投资高风险行业等行为" ctype="input" name="focusYsd8"  ></yu-xform-item>
                  <yu-xform-item label="近两年是否存在工商，税务，银行不良记录" ctype="input" name="focusYsd9"  ></yu-xform-item>
                  <yu-xform-item label="银行家数是否超过3家或资产负债率超过75% " ctype="input" name="focusYsd10"  ></yu-xform-item>
                  <yu-xform-item label="企业或实际控制人夫妇是否在业务申办行本地有住宅，商铺，厂房等实物资产 " ctype="input" name="focusYsd11"  ></yu-xform-item>
                  <yu-xform-item label="企业及实际控制人他行信用贷款余额，我行信用贷款余额，信用卡用信额，优税贷申请额(含小贷)合计是否高于500万元 " ctype="input" name="focusYsd12"  ></yu-xform-item>
                  <yu-xform-item label="如有其它不利情况请简述" ctype="input" name="focusYsd13"  ></yu-xform-item>
               </yu-xform-group>
               </yu-panel>
              </yu-panel>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submit" v-show="op!='VIEW'">保存</yu-button>
      <!--<yu-button type="primary" @click="print">打印</yu-button>-->
    </yu-form-buttons>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data () {
    return {
      assetUrl: backend.cmisBiz + '/api/rptspdanysysd/queryAssetInfo',
      assetParam: {serno: this.param.serno},
      pfkUrl: backend.cmisBiz + '/api/rptspdanysysd/queryPfk',
      pfkParam: {serno: this.param.serno},
      op: ''
    };
  },
  mounted () {
    this.op = this.param.op;
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.param.serno;
      // var op = _this.$route.meta.params.op;
      // _this.type = op;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      this.baseFormdata1.flag = '1';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysysd/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
          });
        }
      });
    },
    // 合并单元格
    arraySpanMethod: function (obj) {
      if (obj.columnIndex === 0) {
        if (obj.rowIndex == 0) {
          return {
            rowspan: 23,
            colspan: 1
          };
        } else if (obj.rowIndex == 23) {
          return {
            rowspan: 15,
            colspan: 1
          };
        } else if (obj.rowIndex == 38) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 43) {
          return {
            rowspan: 10,
            colspan: 1
          };
        } else if (obj.rowIndex == 53) {
          return {
            rowspan: 6,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      } else if (obj.columnIndex === 1) { // =========================》从0开始算，第几列
        if (obj.rowIndex == 0) { // =========================》从0开始算，第几行
          return {
            rowspan: 4, // =========================》受影响的行数
            colspan: 1 // =========================》受影响的列数
          };
        } else if (obj.rowIndex == 4) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 9) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 14) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 19) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (obj.rowIndex == 23) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 26) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 29) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 34) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (obj.rowIndex == 38) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 43) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 48) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 53) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 56) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      } else if (obj.columnIndex === 4) { // =========================》从0开始算，第几列
        if (obj.rowIndex == 0) { // =========================》从0开始算，第几行
          return {
            rowspan: 4, // =========================》受影响的行数
            colspan: 1 // =========================》受影响的列数
          };
        } else if (obj.rowIndex == 4) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 9) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 14) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 19) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (obj.rowIndex == 23) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 26) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 29) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 34) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (obj.rowIndex == 38) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 43) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 48) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 53) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 56) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      } else if (obj.columnIndex === 5) { // =========================》从0开始算，第几列
        if (obj.rowIndex == 0) { // =========================》从0开始算，第几行
          return {
            rowspan: 4, // =========================》受影响的行数
            colspan: 1 // =========================》受影响的列数
          };
        } else if (obj.rowIndex == 4) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 9) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 14) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 19) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (obj.rowIndex == 23) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 26) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 29) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 34) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (obj.rowIndex == 38) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 43) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 48) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 53) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 56) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      } else if (obj.columnIndex === 6) { // =========================》从0开始算，第几列
        if (obj.rowIndex == 0) { // =========================》从0开始算，第几行
          return {
            rowspan: 4, // =========================》受影响的行数
            colspan: 1 // =========================》受影响的列数
          };
        } else if (obj.rowIndex == 4) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 9) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 14) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 19) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (obj.rowIndex == 23) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 26) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 29) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 34) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (obj.rowIndex == 38) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 43) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 48) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (obj.rowIndex == 53) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (obj.rowIndex == 56) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      comitData = _this.baseFormdata1;
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptspdanysysd/save',
              data: comitData,
              callback: function (code, message, response) {
                var pfkData = _this.$refs.pfkTable.tabledata;
                let jsoPar = {
                  serno: _this.baseFormdata1.serno,
                  pfkInfoDtoList: pfkData
                };
                yufp.service.request({
                  method: 'POST',
                  url: backend.cmisBiz + '/api/rptspdanysysd/saveTable',
                  data: jsoPar,
                  callback: function (code, message, response) {
                    _this.$message('保存评分卡成功');
                  }
                });
              }
            });
          }
        }
      });
    },
    // 取消并返回上一页面
    print: function () {
      this.$xutils.showMsgBox('提示', '开发中！'); // 弹出提示
    }

  }
};
</script>
