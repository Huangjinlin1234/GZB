<!--
  集团批复报告
 -->
<template>
  <div>
    <div style="text-align:center">
      <a class="underline" style="text-decoration:none;align:center" @click="onPrint">查看电子版</a>
    </div>
    <yu-panel title="批复报告"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata1" disabled :form-type="viewType">
              <!--<yu-panel title="一、审查内容" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="审查内容" ctype="textarea"  name="reviewContent"></yu-xform-item>
              </yu-panel>
              <yu-panel title="二、授信用途合理性分析" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="主键" ctype="input" name="pkId" hidden="true"></yu-xform-item>
                  <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                  <yu-xform-item label="授信用途合理性分析" ctype="textarea"  name="analysisRationalLmtUse"></yu-xform-item>
              </yu-panel>
              <yu-panel title="二、风险因素" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="风险因素" ctype="textarea"  name="riskFactor"></yu-xform-item>
              </yu-panel>-->
              <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
                <yu-xform-group>
                  <yu-xform-item label="业务流水号" disabled ctype="input" name="grpSerno" ></yu-xform-item>
                  <yu-xform-item label="业务类型" disabled ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE">></yu-xform-item>
                  <yu-xform-item label="客户编号" disabled ctype="input" name="grpCusId"></yu-xform-item>
                  <yu-xform-item label="客户名称" disabled ctype="input" name="grpCusName"></yu-xform-item>
                  <yu-xform-item label="审批模式" disabled ctype="select" name="apprMode" data-code="STD_APPR_MODE">></yu-xform-item>
                  <yu-xform-item label="经办客户经理" disabled ctype="input" name="inputId" hidden></yu-xform-item>
                  <yu-xform-item label="经办机构" disabled ctype="input" name="inputBrId" hidden></yu-xform-item>
                  <yu-xform-item label="经办客户经理" disabled ctype="input" name="inputIdName"></yu-xform-item>
                  <yu-xform-item label="经办机构" disabled ctype="input" name="inputBrIdName"></yu-xform-item>
                  <yu-xform-item label="主管客户经理" disabled ctype="input" name="managerId" hidden></yu-xform-item>
                  <yu-xform-item label="主管机构" disabled ctype="input" name="managerBrId" hidden></yu-xform-item>
                  <yu-xform-item label="主管客户经理" disabled ctype="input" name="managerIdName" hidden></yu-xform-item>
                  <yu-xform-item label="主管机构" disabled ctype="input" name="managerBrIdName" hidden></yu-xform-item>
                </yu-xform-group>
              </yu-panel>
              <yu-panel title="" :hideFilter="false" :collapseHide="false">
                <yu-xform-item label="是否重组贷款" ctype="radio"  name="isRestruLoan" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="评审结论" ctype="radio"  name="reviewConclusion" data-code="STD_ZB_CONC"></yu-xform-item>
                <yu-xform-item label="结论性描述" ctype="textarea"  name="restDesc"></yu-xform-item>
              </yu-panel>
              <yu-panel title="1、成员客户批复报告" :hideFilter="false" :collapseHide="false">
                <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="refTable" row-number :data-url="dataUrl1" :base-params="baseParams1" request-type="POST" selection-type="radio" :pageable="false">
                    <yu-xtable-column label="主键" prop="pkId" sortable hide-column></yu-xtable-column>
                    <yu-xtable-column label="单一流水号" prop="singleSerno" hide-column></yu-xtable-column>
                    <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
                    <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
                    <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
                    <yu-xtable-column label="敞口额度合计（元）" prop="openLmtAmt"></yu-xtable-column>
                    <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskLmtAmt"></yu-xtable-column>
                    <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
                    <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
                    <yu-xtable-column label="操作" width="120">
                      <template slot-scope="scope">
                        <a class="underline" @click="viewFn(scope.row)">查看成员批复信息</a>
                        <a class="underline" @click="register(scope.row)">压降计划登记</a>
                      </template>
                    </yu-xtable-column>
                  </yu-xtable>
                </yu-panel>
              </yu-panel>
              <yu-panel title="2、集团贷后管理要求" :hideFilter="false" :collapseHide="false">
                <yu-xform-item label="集团贷后管理要求说明" ctype="textarea"  name="pspManaNeed" ></yu-xform-item>
              </yu-panel>
              <yu-panel title="3、其他" :hideFilter="false" :collapseHide="false" >
                  <yu-xform-item label="是否超限额管理要求" ctype="radio"  name="isOutLmtQuotaMana" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="其他说明" ctype="textarea"  name="otherDesc"></yu-xform-item>
              </yu-panel>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'" type="primary" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="onPrint">打印</yu-button>
    </yu-form-buttons>
  </div>
</template>

<script>
import lmtApprInspectModel from './lmtApprInspectModel';
yufp.lookup.reg('STD_ZB_CONC,STD_ZB_YES_NO,STD_ZB_CUS_TYP');
export default {
  components: {lmtApprInspectModel},
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data () {
    return {
      type: '',
      majorGradeForm: null,
      dialogVisible: false,
      effType: '',
      list: [],
      baseFormdata1: {},
      dataUrl1: backend.cmisBiz + '/api/lmtgrpappr/querylmtapprbygrpserno',
      baseParams1: {serno: this.$route.params.serno}
    };
  },
  created () {
    let _this = this;
    var grpSerno = grpSerno = _this.$route.params.serno;
    _this.baseFormdata1.grpSerno = grpSerno;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrpappr/querySernoByGrpSerno',
      data: grpSerno,
      callback: function (code, message, response) {
        _this.$nextTick(function () {
          response.data.forEach(function (item) {
            _this.list.push(item);
          });
        });
      }
    });
  },
  mounted () {
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var grpSerno = _this.$route.params.serno;
      _this.baseFormdata1.grpSerno = grpSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpappr/queryInfoByGrpSerno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
          });
        }
      });
    },

    // 压降计划登记
    register (data) {
      var _this = this;
      var params = {};
      let viewFlg = 'update';
      // 已办 办结进入
      if (_this.$route.params && (_this.$route.params.type == 'DONE' || _this.$route.params.type == 'HIS')) {
        viewFlg = 'details';
      }
      // 批复进入
      viewFlg = 'details';
      yufp.service.request({
        async: false,
        method: 'POST',
        data: {
          cusId: data.cusId,
          enterListFlag: '02',
          status: '2'
        },
        url: backend.cmisCus + '/api/cuslstdedkkh/queryNewDekhDataByCusId',
        callback: function (code, message, response) {
          debugger;
          if (response.data && response.data.cusId != null) {
            params = response.data;
            params['op'] = viewFlg;
            params['opType'] = 'approve';
            params['managerBrId'] = params.belgOrg;
            params['managerBrIdName'] = params.belgOrgName;
            _this.$dialog.open(
              '大额贷款客户名单',
              'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
              -1,
              -1,
              params
            );
          } else {
            if (viewFlg == 'details') {
              _this.$message('未查到当前客户压降计划,请核实!');
              return;
            }
            if (_this.baseFormdata1.cusId.startsWith('8')) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisCus + '/api/cuscorp/selectcropbycusid',
                data: _this.baseFormdata1.cusId,
                callback: function (code, message, response) {
                  yufp.clone(response.data, params);
                  params['op'] = 'add';
                  params['opType'] = 'approve';
                  params['belgOrg'] = params.managerBrId;
                  params['belgOrgName'] = params.managerBrIdName;
                  _this.$dialog.open(
                    '大额贷款客户名单',
                    'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
                    -1,
                    -1,
                    params
                  );
                }
              });
            } else if (!_this.baseFormdata1.cusId.startsWith('8')) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisCus + '/api/cusindiv/querycusindivbycusid',
                data: _this.baseFormdata1.cusId,
                callback: function (code, message, response) {
                  yufp.clone(response.data, params);
                  params['op'] = 'add';
                  params['opType'] = 'approve';
                  params['belgOrg'] = params.managerBrId;
                  params['belgOrgName'] = params.managerBrIdName;
                  _this.$dialog.open(
                    '大额贷款客户名单',
                    'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
                    -1,
                    -1,
                    params
                  );
                }
              });
            }
          }
        }
      });
    },
    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.clone(_this.baseFormdata1, comitData);
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpappr/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    // 取消并返回上一页面
    print: function () {
      this.$xutils.showMsgBox('提示', '开发中！'); // 弹出提示
    },
    /**
     * 关闭当前页面
     */
    onBack: function () {
      this.$router.go(-1);
    },
    // 弹窗关闭
    canclFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    onPrint: function () {
      var _this = this;
      // var params = _this.baseFormdata;// 模板工厂中的参数传递
      var params = {};
      var grpSerno = _this.$route.params.serno;
      params.serno = grpSerno;
      if (params.serno == null || params.serno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemoscbgjtsp2';
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-JT-SP2.cpt&op=view&grpSerno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '批复报告（集团）',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    viewFn (data) {
      let _this = this;
      data.serno = data.singleSerno;
      data.op = 'VIEW';
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/reviewReportChild.vue',
        // 自定义唯一页签key
        key: data.cusName + new Date().getTime(), // 必传
        // 页签名称
        title: '成员批复报告',
        // 传递的业务数据，可选配置
        data: data
      });
    }

  }
};
</script>
