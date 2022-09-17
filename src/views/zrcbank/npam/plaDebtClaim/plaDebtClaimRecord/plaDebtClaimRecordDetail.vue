<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="申请信息" name="base" >
        <yu-panel title="减免记账借据列表" :collapseHide="false" :hideFilter="false">
          <yu-button-drop >
            <yu-button type="primary" @click="importFn" v-if="viewType !='DETAIL'">引入</yu-button>
            <yu-button type="primary" @click="deleteFn" v-if="viewType !='DETAIL'">删除</yu-button>
            <yu-button type="primary" @click="checkFn">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" selection-type="radio" row-number :data-url="urls.index" :base-params="params.baseBillParams2" condition-key="condition" style="margin-top:10px" requestType="POST">
            <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
            <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt" ></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免本金" prop="reducCapAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免欠息" prop="reducDebitInt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免罚息" prop="reducPenalInt"></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免复息" prop="reducCompoundInt" ></yu-xtable-column>
            <yu-xtable-column align="center" label="预计减免费用" prop="reducCostAmt"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="减免记账申请信息" :collapseHide="false" :hideFilter="false">
          <yu-xform ref="refForm" v-model="formdata" label-width="130px" :disabled="viewType == 'DETAIL'">
            <yu-xform-group>
              <yu-xform-item label="业务编号" colspan="11" name="pdcrraiSerno" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" colspan="11" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" colspan="11" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="贷款总金额" colspan="11" name="loanAmt"  ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="贷款总余额" colspan="11" name="loanBalance" ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="拖欠总利息" colspan="11" name="totalTqlxAmt" ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="减免总额" colspan="11" name="reducTotlAmt" ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="减免本金合计" colspan="11" name="reducCapAmt" ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="减免欠息合计" colspan="11" name="reducDebitInt" ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="减免罚息合计" colspan="11" name="reducPenalInt" ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="减免复息合计" colspan="11" name="reducCompoundInt" ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="减免费用合计" colspan="11" name="reducCostAmt" ctype="yu-num" maxlength="14" number-formatter="0,000.00" disabled></yu-xform-item>
              <yu-xform-item label="备注" colspan="22" name="memo" ctype="textarea" placeholder="备注" :rules="memoRules"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="登记信息" :collapseHide="false" :hideFilter="false">
          <yu-xform ref="refForm1" v-model="basedata">
            <yu-xform-group>
               <yu-xform-item label="登记机构" name="inputBrIdName" rules="required"  disabled></yu-xform-item>
               <yu-xform-item label="登记机构" name="inputBrId" rules="required"  hidden ></yu-xform-item>
               <yu-xform-item label="登记人" name="inputIdName"  disabled></yu-xform-item>
               <yu-xform-item label="登记人" name="inputId" hidden></yu-xform-item>
               <yu-xform-item label="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <div style="text-align: center;">
          <yu-button-drop>
            <yu-button type="primary" @click="commit" :hidden="viewType == 'DETAIL'">提交</yu-button>
            <yu-button type="primary" @click="saveFn" :hidden="viewType == 'DETAIL'">保存</yu-button>
            <yu-button type="primary" @click="goBack">返回</yu-button>
          </yu-button-drop>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="forth">
          <imageSystem  ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" name="approveHist">
         <his :params="params1"></his>
      </yu-tab-pane>
      <yu-xdialog title="债权减免记账借据引入" :visible.sync="authDialogVisible" class="control-dialog">
        <yu-xtable :data-url="urls.billUrl" selection-type="checkBox" ref="refTableBill" :base-params="params.baseBillParams" requestType="POST">
          <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column align="center" label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
          <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
          <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt"></yu-xtable-column>
          <yu-xtable-column align="center" label="减免本金合计" prop="reducCapAmt"></yu-xtable-column>
          <yu-xtable-column align="center" label="减免欠息合计" prop="reducDebitInt"></yu-xtable-column>
          <yu-xtable-column align="center" label="减免罚息合计" prop="reducPenalInt"></yu-xtable-column>
          <yu-xtable-column align="center" label="减免复息合计" prop="reducCompoundInt"></yu-xtable-column>
          <yu-xtable-column align="center" label="减免费用合计" prop="reducCostAmt"></yu-xtable-column>
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
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
import mixin from '@/utils/mixin';
import his from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('STD_ZB_CUR_TYP');
export default {
  mixins: [mixin],
  components: { imageSystem, his},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      params1: {},
      formdata: {},
      basedata: {},
      image: '1',
      memoRules: [
        { max: 20, message: '输入内容不能超过20个字符'}
      ],
      pdcrraiSerno: '',
      pdcraiSerno: '',
      viewType: '',
      activeName: 'base',
      // btnDisabled: false,
      authDialogVisible: false,
      imageBizParam: [{
        'top_outsystem_code': 'XXD_ZCBQ',
        'outsystem_code': 'XXD_ZCBQ05',
        'index': {
          'businessid': 'businessid'
        }
      }],
      urls: {
        index: backend.cmisNpam + '/api/pladebtclaimreducrecordbillrel/queryAll',
        billUrl: backend.cmisNpam + '/api/pladebtclaimreducbillrel/queryAll'
      },
      params: {
        caseSernoParam: {condition: {pdcrraiSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.pdcrraiSerno}},
        baseBillParams: {condition: JSON.stringify({ approveStatus: '997', inputId: this.$xutils.getLoginUserInfo().userId})},
        baseBillParams2: {condition: JSON.stringify({ pdcrraiSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.pdcrraiSerno})}
      }
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },

  created () {
    var _this = this;
    var model = {};
    if (this.bizPageData) {
      this.image = '2';
    } else if (this.$route.meta.params.viewType == 'DETAIL') {
      this.image = '2';
    }
    _this.viewType = this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : _this.$route.meta.params.viewType; // 业务类型
    _this.pdcrraiSerno = this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : _this.$route.meta.params.pdcrraiSerno; // 回显查询主键
    model.pdcrraiSerno = _this.pdcrraiSerno;
    _this.params1.serno = _this.pdcrraiSerno;
    if (_this.viewType == 'ADD') {
      _this.$nextTick(() => {
        _this.formdata['pdcrraiSerno'] = _this.pdcrraiSerno;
        _this.basedata['inputId'] = _this.userId;
        _this.basedata['inputIdName'] = _this.userName;
        _this.basedata['inputBrId'] = _this.orgCode;
        _this.basedata['inputBrIdName'] = _this.orgName;
        _this.basedata['inputDate'] = _this.formatTime();
      });
    } else {
      // 修改/查看数据返显
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/showByPdcrraiSerno',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
            // 此处数据应为当前机构？
            yufp.clone(response.data, _this.basedata);
            _this.imageBizParam = [{
              'top_outsystem_code': 'XXD_ZCBQ',
              'outsystem_code': 'XXD_ZCBQ05',
              'index': {
                // 'businessid': _this.pdcraiSerno
                'businessid': response.data.pdcraiSerno
              }
            }];
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.name == 'forth') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    /* 借据修改成功后自动刷新的回调 */
    returnFn () {
      this.$refs.refTable.remoteData();
    },
    checkFn (info) {
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
      params.viewType = 'DETAIL';
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
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({message: '请先将表格填写完整', type: 'warning'});
        return;
      };
      var model = {};

      yufp.clone(_this.formdata, model);
      yufp.clone(_this.basedata, model);
      if (_this.viewType == 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/',
          data: JSON.stringify(model),
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$message('保存成功');
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      };
      if (_this.viewType == 'EDIT') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/update',
          data: JSON.stringify(_this.formdata),
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$message('保存成功');
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      }
    },
    /* 删除 */
    deleteFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var model = _this.$refs.refTable.selections[0];
      model.pdcrraiSerno = _this.$route.meta.params.pdcrraiSerno;
      _this.$confirm('此操作将作废当前借据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/pladebtclaimreducrecordbillrel/deleteByPdcrrbrSerno',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  // _this.initFun();
                  var model = {};
                  model.pdcrraiSerno = _this.pdcrraiSerno;
                  yufp.service.request({
                    method: 'POST',
                    url: backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/showByPdcrraiSerno',
                    data: model,
                    callback: function (code, message, response) {
                      if (response.code == '0') {
                        _this.$nextTick(() => {
                          yufp.clone(response.data, _this.formdata);
                          _this.imageBizParam = [{
                            'top_outsystem_code': 'XXD_ZCBQ',
                            'outsystem_code': 'XXD_ZCBQ05',
                            'index': {
                              // 'businessid': _this.pdcraiSerno
                              'businessid': _this.formdata.pdcraiSerno
                            }
                          }];
                        });

                        // 此处数据应为当前机构？
                      } else {
                        _this.$message.error(response.message);
                      }
                    }
                  });
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },
    /**
     * 流程提交
     */
    commit () {
      var _this = this;
      _this.saveFn();
      var cusId = _this.formdata.cusId;
      var cusName = _this.formdata.cusName;
      // 提交流程
      const userInfo = this.$xutils.getLoginUserInfo();
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.bizType = 'BQ011';
      startdto.bizId = _this.pdcrraiSerno;
      startdto.bizUserName = cusName;
      startdto.bizUserId = cusId;
      startdto.param = {
        pdcraiSerno: _this.formdata.pdcraiSerno
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
      _this.$route.meta.params.callback(); // 回调刷新列表数据
    },
    /**
    * 返回
    */
    goBack () {
      yufp.router.removeTab(this.$route.path);
      this.$route.meta.params.callback(); // 回调刷新列表数据
    },
    cancel () {
      this.authDialogVisible = false;
    },
    importFn () {
      var _this = this;
      _this.authDialogVisible = true;
    },
    /**
    *引入
     */
    saveBillFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTableBill.selections;
      if (selectionsAry.length < 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var model = selectionsAry;
      for (let i = 0; i < model.length; i++) {
        model[i].pdcrraiSerno = _this.$route.meta.params.pdcrraiSerno;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/pladebtclaimreducrecordbillrel/savePlaDebtClaimReducRecordBillRel',
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.authDialogVisible = false;
            // _this.initFun();
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
            var model = {};
            model.pdcrraiSerno = _this.pdcrraiSerno;
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/showByPdcrraiSerno',
              data: model,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  yufp.clone(response.data, _this.formdata);
                  _this.imageBizParam = [{
                    'top_outsystem_code': 'XXD_ZCBQ',
                    'outsystem_code': 'XXD_ZCBQ05',
                    'index': {
                      // 'businessid': _this.pdcraiSerno
                      'businessid': _this.formdata.pdcraiSerno
                    }
                  }];
                  // 此处数据应为当前机构？
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    }

  }
};
</script>
