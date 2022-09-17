<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="申请信息" name="base">
        <yu-panel title="基本信息" :collapseHide="false" :hideFilter="false">
          <yu-xform ref="refForm" v-model="formdata" label-width="150px">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" colspan="11" name="pdcraiSerno" ctype="input" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" colspan="11" name="cusId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" colspan="11" name="cusName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="贷款总金额" colspan="11" name="loanAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="贷款总余额" colspan="11" name="loanBalance" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="拖欠总利息" colspan="11" name="totalTqlxAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免总额" colspan="11" name="reducTotlAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免本金合计" colspan="11" name="reducCapAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免欠息合计" colspan="11" name="reducDebitInt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免罚息合计" colspan="11" name="reducPenalInt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免复息合计" colspan="11" name="reducCompoundInt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="减免费用合计" colspan="11" name="reducCostAmt" ctype="num" disabled></yu-xform-item>
              <yu-xform-item label="费用减免详情" colspan="22" name="reducCostDetail" ctype="textarea" placeholder="用于描述费用减免详情" :rules="rules.reducCostDetail" :disabled="viewType=='DETAIL'"></yu-xform-item>
              <yu-xform-item label="减免原因" colspan="22" name="reducResn" ctype="textarea" placeholder="写目前减免纸质材料的内容" :rules="rules.reducResn" :disabled="viewType=='DETAIL'"></yu-xform-item>
              <yu-xform-item label="备注" colspan="22" name="memo" ctype="textarea" placeholder="备注" :disabled="viewType=='DETAIL'" :rules="rules.memo" ></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="减免借据列表" :collapseHide="false" :hideFilter="false">
          <yu-button-drop>
            <yu-button type="primary" @click="importFn"  v-if="viewType=='EDIT'">引入</yu-button>
            <yu-button type="primary" @click="deleteFn"  v-if="viewType=='EDIT'">删除</yu-button>
            <yu-button type="primary" @click="infoFn('EDIT')"  v-if="viewType=='EDIT'">修改</yu-button>
            <yu-button type="primary" @click="infoFn('DETAIL')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" selection-type="radio" :pageable="false"  row-number :data-url="urls.index"  :base-params="params.caseSernoParam" condition-key="condition" style="margin-top:10px;margin-bottom:10px" requestType="POST">
            <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP" ></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
            <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免本金" prop="reducCapAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免欠息"  prop="reducDebitInt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免罚息" prop="reducPenalInt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免复息" prop="reducCompoundInt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免费用" prop="reducCostAmt"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-xform ref="refForm1" v-model="basedata">
          <yu-xform-group>
            <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled ></yu-xform-item>
            <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="审批状态" name="approveStatus" ctype="select" disabled data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align: center;">
          <yu-button-drop>
            <yu-button type="primary" @click="commit" v-if="viewType=='EDIT'">提交</yu-button>
            <yu-button type="primary" @click="saveFn" v-if="viewType=='EDIT'">保存</yu-button>
            <yu-button type="primary" @click="goBack">返回</yu-button>
          </yu-button-drop>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="forth">
          <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" name="approveHist">
          <adjustment-judge-his :judge-his-params="childParams"></adjustment-judge-his>
      </yu-tab-pane>
      <yu-xdialog title="债权减免记账借据引入" :visible.sync="authDialogVisible" class="control-dialog" width="1500px">
       <yu-xtable ref="refTableBill" :row-number="true" selection-type="radio" request-type="POST" :pageable="true" :data-url="billUrl2" :default-load="true" condition-key="condition" :base-params="baseBillParams">
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="contCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="起始日期" prop="loanStartDate"></yu-xtable-column>
          <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
          <yu-xtable-column label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column label="主办人" prop="managerIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        </yu-xtable>
        <div slot="footer" class="dialog-footer">
          <yu-button type="primary" @click="saveBillFn">保存</yu-button>
          <yu-button @click="cancel">取消</yu-button>
        </div>
      </yu-xdialog>
    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="goBack"></yufpNwfInit>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
import AdjustmentJudgeHis from '@/views/zrcbank/biz/creditcardmanage/adjustment/adjustmentjudge/tabs/AdjustmentJudgeHis.vue';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_APPR_STATUS,STD_FIVE_CLASS,STD_ACC_STATUS');
export default {
  props: {
    bizPageData: Object
  },
  components: { imageSystem, AdjustmentJudgeHis},
  data: function () {
    return {
      billUrl2: this.$backend.cmisBiz + '/api/accloan/queryAccLoanByCusId',
      baseBillParams: {condition: JSON.stringify({ pdcraiSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.pdcraiSerno}) },
      authDialogVisible: false,
      formdata: {},
      basedata: {},
      image: '1',
      rules: {
        reducCostDetail: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ],
        reducResn: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        memo: [
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ]
      },
      pdcraiSerno: '',
      flag: false,
      viewType: 'DETAIL',
      activeName: 'base',
      // btnDisabled: false,
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ05',
          'index': {
            'businessid': this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.pdcraiSerno
          }
        }
      ],
      urls: {
        index: backend.cmisNpam + '/api/pladebtclaimreducbillrel/queryByPdcraiSerno'
      },
      params: {
        caseSernoParam: {condition: {pdcraiSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.pdcraiSerno}}}
    };
  },
  computed: {
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.pdcraiSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  },
  created: function () {
    var _this = this;
    _this.pdcraiSerno = this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.pdcraiSerno;
    _this.viewType = this.bizPageData ? 'DETAIL' : _this.$route.meta.params.viewType;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/pladebtclaimreducappinfo/showByPdcraiSerno',
      data: _this.pdcraiSerno,
      callback: function (code, message, response) {
        if (response.code == 0) {
          yufp.clone(response.data, _this.formdata);
          yufp.clone(response.data, _this.basedata);
        } else {
          _this.$message.error(response.message);
        }
      }
    });
    if (_this.bizPageData) {
      this.image = '2';
    } else if (_this.$route.meta.params.viewType == 'DETAIL') {
      this.image = '2';
    }
    // if (_this.viewType == 'DETAIL') {
    //   _this.btnDisabled = true;
    // }
  },
  methods: {
    handleClick (tab) {
      if (tab.name == 'forth') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    initFun () {
      var _this = this;
      _this.pdcraiSerno = _this.$route.meta.params.pdcraiSerno;
      yufp.service.request({
        method: 'POST',
        url: this.$backend.cmisNpam + '/api/pladebtclaimreducappinfo/showByPdcraiSerno',
        data: _this.pdcraiSerno,
        callback: function (code, message, response) {
          if (response.code == 0) {
            yufp.clone(response.data, _this.formdata);
            yufp.clone(response.data, _this.basedata);
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },

    /**
     * 保存
     */
    saveFn () {
      var _this = this;
      var validate = false;
      var modal = {};
      yufp.clone(_this.formdata, modal);
      modal.plaDebtClaimReducBillRel = this.$refs.refTable.tabledata;
      _this.$refs.refForm.validate(volid => {
        // 催收参数校验
        if (volid) {
          validate = true;
          yufp.service.request({
            async: false,
            method: 'POST',
            url: this.$backend.cmisNpam + '/api/pladebtclaimreducappinfo/update',
            data: JSON.stringify(modal),
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$message('操作成功');
                _this.initFun();
              } else {
                _this.$message.error(response.message);
              }
            }
          });
        } else {
          validate = false;
        }
      });
      return validate;
    },
    /*
      引入
     */
    importFn () {
      // 根据客户查询未引入的借据数据
      // 金额计算
      var _this = this;
      _this.baseBillParams = { condition: {cusId: _this.formdata.cusId, accStatus: 'accStatus', managerId: this.$xutils.getLoginUserInfo().userId}};
      _this.authDialogVisible = true;
    },
    /*
      保存----引入的dialog中的按钮,更新数据库数据
    */
    saveBillFn () {
      var _this = this;

      if (_this.$refs.refTableBill.selections.length < 1) {
        _this.$message({
          message: '请先选择至少一条记录',
          type: 'warning'
        });
        return;
      }

      var model = _this.$refs.refTableBill.selections;
      var newArray = [];
      let pdcraiSerno = _this.$route.meta.params.pdcraiSerno;
      model.forEach(function (item) {
        item['pdcraiSerno'] = pdcraiSerno;
        item.totalTqlxAmt = item.debitInt + item.penalInt + item.compoundInt;
        item.curType = item.contCurType;
        newArray.push(item);
      });
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify(newArray),
        url: this.$backend.cmisNpam + '/api/pladebtclaimreducbillrel/insert',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.authDialogVisible = false;
            _this.initFun();
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /*
      取消...关闭借据选择窗口
    */
    cancel () {
      this.authDialogVisible = false;
    },
    /* 删除 */
    deleteFn () {
      // 金额计算
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var model = selectionsAry[0];
      model.pdcraiSerno = _this.$route.meta.params.pdcraiSerno;
      _this.$confirm('此操作将作废当前借据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/pladebtclaimreducbillrel/deleteByPdcrbrSerno/',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.initFun();
                  _this.$message('保存成功');
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },
    /* 借据修改成功后自动刷新的回调 */
    returnFn () {
      this.$refs.refTable.remoteData();
    },
    /* 查看/修改 */
    infoFn (info) {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var params = selectionsAry[0];
      params.returnFn = _this.returnFn;
      params.initFun = _this.initFun;
      params.viewType = info == 'EDIT' ? 'EDIT' : 'DETAIL';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/pladebtclaimreducbillrel/queryHXBill',
        data: params.billNo,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data) {
              _this.$dialog.open(
                '借据信息查看',
                'zrcbank/npam/plaDebtClaim/plaDebtClaimApp/plaDebtLoanDetail',
                900,
                850,
                params,
              );
            } else {
              _this.$message.error(response.message);
            }
          }
        }
      });
    },
    /**
     * 流程提交
     */
    commit () {
      var _this = this;
      var selectAll = _this.$refs.refTable.tabledata;
      if (_this.$refs.refTable.tabledata.length < 1) {
        _this.$message.warning('减免借据列表缺少内容无法提交');
        return;
      }
      if (this.formdata.reducTotlAmt <= 0) {
        this.flag = false;
      } else if (this.formdata.reducTotlAmt > 0) {
        this.flag = true;
      }
      if (!_this.flag) {
        _this.$message.warning('减免总额有误无法提交');
        return;
      }

      var validate = _this.saveFn();
      if (!validate) {
        return;
      }
      // this.$nextTick(() => {
      // 提交流程
      const userInfo = this.$xutils.getLoginUserInfo();
      var cusId = _this.formdata.cusId;
      var cusName = _this.formdata.cusName;
      var bizType = '';
      var startdto = {};
      startdto.param = {
        index: {
          'businessid': _this.taskNo,
          'billno': _this.billNo
        }
      };
      // TODO添加相关的业务配置
      const rolesList = userInfo.roles;
      for (var i = 0; i < rolesList.length; i++) {
        if (rolesList[i].code === 'R0010') {
          bizType = 'BQ010';
          // break;
        } else {
          bizType = 'BQ009';
        }
      }
      if (bizType == 'BQ010') {
        // 查询分中心负责人
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/xwcommonservice/getcentermanageridinfo',
          data: {managerId: userInfo.loginCode},
          callback: function (code, message, response) {
            if (response.code == '0') {
              if (response.data) {
                // 提交流程
                startdto.systemId = 'cmis';
                startdto.orgId = userInfo.orgCode;
                startdto.userId = userInfo.loginCode;
                startdto.bizType = bizType;
                startdto.bizId = _this.pdcraiSerno;
                startdto.bizUserName = cusName;
                startdto.bizUserId = cusId;
                startdto.bizParam1 = response.data.userCode;// 分中心负责人
                let reducTotlAmt = _this.formdata.reducTotlAmt;
                let flag = 'F';
                if (reducTotlAmt > 1000000) {
                  flag = 'T';
                }
                // let param = {
                //   flag: flag
                // };
                // startdto.param = param;
                startdto.param = {
                  flag: flag,
                  index: {
                    'businessid': _this.taskNo,
                    'billno': _this.billNo
                  }
                };
                // startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt};
                _this.$refs.yufpNwfInit.wfInit(startdto);
              } else {
                _this.$message.error('查询分中心负责人数据为空');
              }
            } else {
              _this.$message.error(response.message);
            }
          }
        });
        return;
      }
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.bizType = bizType;
      startdto.bizId = _this.pdcraiSerno;
      startdto.bizUserName = cusName;
      startdto.bizUserId = cusId;
      let reducTotlAmt = _this.formdata.reducTotlAmt;
      let flag = 'F';
      if (reducTotlAmt > 1000000) {
        flag = 'T';
      }
      startdto.param = {
        flag: flag,
        index: {
          'businessid': _this.taskNo,
          'billno': _this.billNo
        }
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
      // });
    },
    /**
    * 返回
    */
    goBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
