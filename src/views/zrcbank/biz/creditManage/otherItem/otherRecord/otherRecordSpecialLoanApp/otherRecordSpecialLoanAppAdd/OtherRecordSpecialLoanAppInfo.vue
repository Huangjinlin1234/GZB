
<template>
  <!--
    @created by lixm 2021-06-10
    @description 用信审核备案申请信息-增删改查
  -->
  <div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
      <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="审批表编号" placeholder="审批表编号" name="serno" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" placeholder="申请日期" name="inputDate" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户经理" placeholder="客户经理" name="inputIdName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="分支机构" placeholder="分支机构" name="inputBrName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" rules="required" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="批复编号" placeholder="批复编号" name="replySerno" ctype="input" @click="goSingleCustomer" @click.stop icon="search" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="授信分项编号" placeholder="授信分项编号" name="limitSubNo" ctype="input" rules="required" @click="goLimitSubNo" @click.stop icon="search" disabled></yu-xform-item>
          <yu-xform-item label="本次申请放款金额" placeholder="本次申请放款金额" name="curtAppAmt" @blur="curtAppAmtChange" maxlength="12" ctype="yu-num" number-formatter="0,000.00" rules="required"></yu-xform-item>
          <yu-xform-item label="本次申请事项" placeholder="如为项目资金用信，请说明用信时企业整体融资金额、企业用信明细中土建、设备、其他三大类的明细、本次申请用信支付对象和金额" name="curtAppCase" ctype="textarea" rules="required" :rows="3" :colspan="24"></yu-xform-item>
          <yu-xform-item label="申请理由" placeholder="2000个字符以内" name="appResn" ctype="textarea" rules="required" :rows="3" :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="本次还款计划" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="2">
          <yu-xform-item label="是否有还款计划" ctype="select" name="isRepayPlan" data-code="STD_ZB_YES_NO" rules="required" @change="planChange"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" name="contNo" :rules="isrequired" @click="goContNo" @click.stop icon="search" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" @click="addFn" v-show="saveBtnShow">新增</yu-button>
          <yu-button type="primary" @click="editFn" v-show="saveBtnShow">修改</yu-button>
          <yu-button type="primary" @click="deleteFn" v-show="saveBtnShow">删除</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="Param" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl">
          <!-- <yu-xtable-column label="期数" prop="terms" hidden-column></yu-xtable-column> -->
          <yu-xtable-column label="还款日期" prop="repayDate"></yu-xtable-column>
          <yu-xtable-column label="还款金额" prop="repayAmt"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="项目资金用信情况" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <!--<yu-xform-item label="用信时企业整体融资金额" placeholder="用信时企业整体融资金额" name="totalFinanceAmt" ctype="yu-num" number-formatter="0,000.00" disabled :colspan="24"></yu-xform-item>-->
          <yu-xform-item label="已累计支付总额金额" placeholder="已累计支付总额金额" name="totalPayedAmt1" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
          <yu-xform-item label="已累计支付总额比例" placeholder="已累计支付总额比例" name="totalPayedScale1" ctype="yu-num" disabled sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="其中：融资金额" placeholder="其中：融资金额" name="financeAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required" @change="calcuteAmtandScale"></yu-xform-item>
          <yu-xform-item label="其中：融资比例" placeholder="其中：融资比例" name="financeScale" ctype="yu-num" disabled sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="其中：自筹金额" placeholder="其中：自筹金额" name="selfRaisedAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required" @change="calcuteAmtandScale"></yu-xform-item>
          <yu-xform-item label="其中：自筹比例" placeholder="其中：自筹比例" name="selfRaisedScale" ctype="yu-num" disabled sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="其中：资本金金额" placeholder="其中：资本金金额" name="capitalAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required" @change="calcuteAmtandScale"></yu-xform-item>
          <yu-xform-item label="其中：资本金比例" placeholder="其中：资本金比例" name="capitalScale" ctype="yu-num" disabled sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="已累计支付总额金额" placeholder="已累计支付总额金额" name="totalPayedAmt2" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
          <yu-xform-item label="已累计支付总额比例" placeholder="已累计支付总额比例" name="totalPayedScale2" ctype="yu-num" disabled sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="其中：土建金额" placeholder="其中：土建金额" name="civilAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required" @change="calcuteAmtandScale"></yu-xform-item>
          <yu-xform-item label="其中：土建比例" placeholder="其中：土建比例" name="civilScale" ctype="yu-num" disabled sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="交易对象" placeholder="交易对象" name="civilTradeObject" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="交易金额" placeholder="交易金额" name="civilTradeAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required"></yu-xform-item>
          <yu-xform-item label="其中：设备金额" placeholder="其中：设备金额" name="deviceAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required" @change="calcuteAmtandScale"></yu-xform-item>
          <yu-xform-item label="其中：设备比例" placeholder="其中：设备比例" name="deviceScale" ctype="yu-num" disabled sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="交易对象" placeholder="交易对象" name="deviceTradeObject" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="交易金额" placeholder="交易金额" name="deviceTradeAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required"></yu-xform-item>
          <yu-xform-item label="其中：其他金额" placeholder="其中：其他金额" name="otherAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required" @change="calcuteAmtandScale"></yu-xform-item>
          <yu-xform-item label="其中：其他比例" placeholder="其中：其他比例" name="otherScale" ctype="yu-num" disabled sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="交易对象" placeholder="交易对象" name="otherTradeObject" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="交易金额" placeholder="交易金额" name="otherTradeAmt" ctype="yu-num" number-formatter="0,000.00" maxlength="14" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-show="submitBtnShow" icon="check" type="primary" @click="submitFn">提交</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn" v-show="cancelBtnShow">返回</yu-button>
      </div>
    </yu-xform>
    <!-- 新增弹层 -->
    <yu-xdialog title="还款新增" :visible.sync="show_dialog" width="800px" height="200px">
      <yu-xform label-width="120px" ref="addForm" :form-type="formType" v-model="addFormdata">
        <yu-xform-group :column="2">
          <yu-xform-item label="期数" ctype="input" placeholder="期数" name="terms" rules="required"></yu-xform-item>
          <yu-xform-item label="还款日期" ctype="datepicker" placeholder="还款日期" name="repayDate" value-format="yyyy-MM-dd" rules="required"></yu-xform-item>
          <yu-xform-item label="还款金额" ctype="yu-num" placeholder="还款金额" name="repayAmt" rules="required"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="doNext">保存</yu-button>
          <yu-button type="primary" @click="doCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
    <!-- 授信分项编号弹层 -->
    <yu-xdialog title="授信分项明细" :visible.sync="show_dialog_subNo" width="1000px" height="400px">
      <yu-button style="margin-bottom:10px;" type="primary" @click="subNoSelect">选取返回</yu-button>
      <yu-xtable ref="refTableSubNo" :data="replySubList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
        <yu-xtable-column prop="lmtDrawNo" label="授信分项额度编号" sortable width="180"></yu-xtable-column>
        <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
        <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
        <yu-xtable-column prop="lmtTerm" label="额度期限（月）"></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="subNoCancel">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { clone, lookup, dateFormat } from '@/utils';
import mixinForm from '@/utils/mixins/mixin-form';
import {toSingleCustomer} from '@/utils/unitchange';
import { mapState } from 'vuex';
import { validator } from '@/utils/validate';
lookup.reg(
  'STD_ZB_CREDIT_GRADE',
  'STD_ZB_CUS_TYP',
  'STD_ZB_CREDIT_GRADE',
  'STD_ZB_YES_NO',
  'STD_ZB_LMT_GUAR_WAY'
);
export default {
  mixins: [mixinForm, toSingleCustomer],
  name: 'OtherRecordSpecialLoanAppInfo',
  components: { yufpNwfInit },
  props: {
    applyInfoParams: Object
  },
  data: function () {
    return {
      dataUrl: '',
      updateUrl:
        this.$backend.cmisBiz +
        '/api/otherrecordspecialloanapp/updateotherrecordspecialloanapp',
      addUrl:
        this.$backend.cmisBiz +
        '/api/otherrecordspecialloanapp/addotherrecordspecialloanapp',
      formdata: {},
      formDisabled: false,
      viewType: 'DETAIL',
      dialogType: 'ADD',
      saveBtnShow: true,
      submitBtnShow: true,
      cancelBtnShow: true,
      isrequired: null,
      show_dialog: false,
      show_dialog_subNo: false,
      replySubList: [],
      lmtAmt: '',
      orgType: null
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.oauth.userName,
      userCode: (state) => state.oauth.userCode,
      org: (state) => state.oauth.org
    })
  },
  created () {
    console.log(
      '===========>>>',
      this.applyInfoParams,
      this.$route.meta.params
    );
  },
  mounted () {
    let _this = this;
    // 判断是否流程
    var biz = _this.applyInfoParams;
    if (biz == 'undefined' || biz == null || biz == '') {
      this.parentRoutName = this.$route.meta.params.name;
      this.viewType = this.$route.meta.params.actionType;
      let formData = this.$route.meta.params.data;
      if (this.viewType === 'DETAIL') {
        clone(formData, this.formdata);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
      }
      if (this.viewType === 'EDIT') {
        clone(formData, this.formdata);
      }
      this.$nextTick(() => {
        if (this.viewType === 'ADD') {
          _this.formdata.serno = formData.serno;
          _this.formdata.inputIdName = _this.userInfo;
          _this.formdata.inputId = _this.userCode;
          _this.formdata.inputBrId = _this.org.code;
          _this.formdata.updId = _this.userCode;
          _this.formdata.updBrId = _this.org.code;
          _this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
        }
        _this.formdata.inputBrName = _this.org.name;
        if (_this.formdata.serno != 'undefined' || _this.formdata.serno != null || _this.formdata.serno != '') {
          _this.Param = {
            condition: JSON.stringify({
              serno: _this.formdata.serno
            })
          };
          _this.dataUrl =
            _this.$backend.cmisBiz + '/api/repaycapplan/selectListByPageData';
        }
      });
    } else {
      // 流程页面跳转
      _this.Param = {
        condition: JSON.stringify({ serno: _this.applyInfoParams.serno })
      };
      // 本次还款计划列表
      _this.dataUrl =
        _this.$backend.cmisBiz + '/api/repaycapplan/selectListByPageData';
      // 申请详情
      this.$request({
        url: this.$backend.cmisBiz + '/api/otherrecordspecialloanapp/selectbymodel',
        method: 'POST',
        data: {condition: JSON.stringify({serno: _this.applyInfoParams.serno})}
      }).then(({ code, message, data }) => {
        if (code == '0') {
          clone(data[0], _this.formdata);
        } else {
          this.$message({ message: message || '操作失败', type: 'error' });
        }
      });

      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
      this.cancelBtnShow = false;
    }

    // 修改时 获取 授信分项编号里的授信额度
    if (this.formdata.curtAppAmt && this.viewType === 'EDIT') {
      this.getLimitSubNo().then(res => {
        res.forEach(item => {
          item.children.forEach(item1 => {
            if (item1.lmtDrawNo == this.formdata.limitSubNo) {
              this.lmtAmt = item.lmtAmt;
            }
          });
        });
      });
    }
    this.calcuteAmtandScale();
  },
  methods: {
    curtAppAmtChange () {
      if (!this.lmtAmt || !this.formdata.limitSubNo) {
        this.formdata.curtAppAmt = 0;
        this.$message({ message: '请选择授信分项编号！', type: 'error' });
      } else {
        if (parseFloat(this.lmtAmt) < parseFloat(this.formdata.curtAppAmt)) {
          this.formdata.curtAppAmt = 0;
          this.$message({ message: '输入的金额不能大于批复金额！', type: 'error' });
        }
      }
    },
    deleteFn () {
      var _this = this;
      // 获取选中的数据
      let jsoPar = _this.$refs.refTable.selections;
      if (jsoPar.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // let approveStatus = jsoPar[0].approveStatus;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/repaycapplan/deleteLogicRepayCapPlan',
              data: {
                serno: jsoPar[0].serno,
                pkId: jsoPar[0].pkId
              },
              callback: function (code, message, response) {
                if (response.data == 0) {
                  console.log('==========', response);
                  _this.$refs.refTable.remoteData();
                  _this.$message({
                    message: '删除失败，请联系管理员',
                    type: 'warning'
                  });
                } else {
                  _this.$refs.refTable.remoteData();
                  // if (approveStatus == "992") {
                  //   _this.$message("自行退出成功！");
                  // } else {
                  //   _this.$message("删除成功");
                  // }
                }
              }
            });
          }
        }
      });
    },
    doCancel () {
      this.show_dialog = false;
    },
    addFn () {
      this.show_dialog = true;
      this.dialogType = 'ADD';
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
      });
    },
    editFn () {
      var _this = this;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      _this.dialogType = 'EDIT';
      _this.show_dialog = true;

      _this.$nextTick(() => {
        _this.$refs.addForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.addFormdata);
      });
    },
    doNext () {
      var validate = false,
        _this = this;
      let dataUrl = '/api/repaycapplan/insertRepayCapPlan';
      if (_this.dialogType == 'EDIT') {
        dataUrl = '/api/repaycapplan/update';
      }
      _this.$refs.addForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var reqData = {};
      yufp.clone(_this.addFormdata, reqData);
      reqData.serno = _this.formdata.serno;
      this.$request({
        url: this.$backend.cmisBiz + dataUrl,
        method: 'POST',
        data: reqData
      }).then(({ code, message, data }) => {
        if (code == '0') {
          this.show_dialog = false;
          _this.$refs.refTable.remoteData();
          this.$message({ message: message || '新增成功', type: 'success' });
        } else {
          this.$message({ message: message || '请求失败', type: 'error' });
        }
      });
    },
    /* 是否有还款计划 1是 0否*/
    planChange (value) {
      if (value == '0') {
        this.isrequired = null;
      } else {
        // this.isrequired = {
        //   required: true,
        //   message: '字段不能为空',
        //   trigger: 'blur'
        // };
      }
    },
    /**
     * 返回
     */
    cancelFn: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
      // 返回列表页面
      yufp.globalEventBus.$emit('refreshOtherRecordSpecialLoanAppTable');
    },

    // 客户选取
    goCustomer () {
      var _this = this;
      if (this.viewType != 'ADD') {
        return;
      }
      var dialogData = {};
      _this.$dialog.open(
        '',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordSpecialLoanApp/otherRecordSpecialLoanAppAdd/OtherselectCusDialog',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.cusId = retVal.cusId;
          _this.formdata.cusName = retVal.cusName;
          _this.formdata.replySerno = retVal.replySerno;
        }
      );
    },

    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SAVE');
      } else {
        this.editSaveFn('SAVE');
      }
    },

    /**
     * 提交按钮
     */
    submitFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SUBMIT');
      } else {
        this.editSaveFn('SUBMIT');
      }
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      const bizType = 'QT010';
      const loginUser = _this.$xutils.getLoginUserInfo();

      // 判断流程走向
      // 申请金额是否大于500万
      var amtType = parseFloat(_this.formdata.curtAppAmt) > 5000000 ? 'Y' : 'N';
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = { orgType: loginUser.org.orgType, amtType: amtType, replySerno: _this.formdata.replySerno, orgId: loginUser.org.id};
      console.log('流程参数----->', startdto.param);
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.cancelFn();
    },

    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }

      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.addUrl,
        data: model
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success' });
          if (actionType === 'SUBMIT') {
            let params = {
              serno: data.serno,
              certCode: data.certCode
            };
            this.submitProcessFun(params);
          }
          if (this.viewType == 'ADD') {
            this.viewType = 'EDIT';
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error' });
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.updateUrl,
        data: model
      }).then(({ code, message, data }) => {
        if (code == '0') {
          if (actionType === 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          } else {
            _this.$message({ message: '数据更新成功！', type: 'success' });
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error' });
        }
      });
    },
    // 获取授信分项列表
    getLimitSubNo () {
      if (this.formdata.replySerno) {
        return new Promise((resolve, reject) => {
          var _this = this;
          _this
            .$request({
              method: 'POST',
              data: this.formdata.replySerno,
              // data: "PF20210529000055",
              url: backend.cmisBiz + '/api/lmtreply/getAllReplyInfo'
            })
            .then(({ code, message, data }) => {
              if (code == '0') {
                _this.replySubList = data.lmtReplySubDtoList;
                resolve(data.lmtReplySubDtoList);
              } else {
                _this.$message({ message: '数据更新失败！', type: 'error' });
              }
            });
        });
      }
    },
    // 授信分项弹层
    goLimitSubNo () {
      var _this = this;
      if (!_this.saveBtnShow) {
        return;
      }
      _this.show_dialog_subNo = true;
      _this.$nextTick(function () {
        _this.getLimitSubNo();
      });
    },
    // 授信分项 选取
    subNoSelect () {
      var _this = this;
      // 获取选中的数据
      let jsoPar = _this.$refs.refTableSubNo.selections;
      if (jsoPar.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      console.log('================selections', jsoPar);
      if (jsoPar[0].children) {
        _this.$xutils.showMsgBox('提示', '请选择下面的子记录进行操作!');
      } else {
        _this.formdata.limitSubNo = jsoPar[0].lmtDrawNo;
        _this.lmtAmt = jsoPar[0].lmtAmt;
        _this.show_dialog_subNo = false;
      }
    },
    // 返回
    subNoCancel () {
      this.show_dialog_subNo = false;
    },
    goContNo () {
      var serno = this.formdata.serno;
      var data = { cusId: this.$route.meta.params.data.cusId, instuCde: '' };
      this.$dialog.open(
        '',
        'zrcbank/biz/pvpLoanApp/singleCtrSelectApp',
        1000,
        800,
        data,
        (params) => {
          console.log(params);

          this.formdata.contNo = params.contNo;
          this.getPlan(params.contNo, serno);
        }
      );
      this.$refs.refTable.remoteData();
    },
    getPlan (contNo, serno) {
      var _this = this;
      var params = {
        contNo: contNo,
        serno: serno,
        appAmt: this.formdata.curtAppAmt // 本次申请金额
      };
      console.log('本次申请-->', this.formdata.curtAppAmt);
      yufp.service.request({
        method: 'POST',
        data: params,
        url: backend.cmisBiz + '/api/repaycapplan/changeselectListByPageData',
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        }
      });
    },
    // 计算项目资金用信情况TODO
    calcuteAmtandScale () {
      // 计算金额
      var financeAmt = isNaN(parseFloat(this.formdata.financeAmt)) ? 0 : parseFloat(this.formdata.financeAmt);
      var selfRaisedAmt = isNaN(parseFloat(this.formdata.selfRaisedAmt)) ? 0 : parseFloat(this.formdata.selfRaisedAmt);
      var capitalAmt = isNaN(parseFloat(this.formdata.capitalAmt)) ? 0 : parseFloat(this.formdata.capitalAmt);
      var civilAmt = isNaN(parseFloat(this.formdata.civilAmt)) ? 0 : parseFloat(this.formdata.civilAmt);
      var deviceAmt = isNaN(parseFloat(this.formdata.deviceAmt)) ? 0 : parseFloat(this.formdata.deviceAmt);
      var otherAmt = isNaN(parseFloat(this.formdata.otherAmt)) ? 0 : parseFloat(this.formdata.otherAmt);
      var totalPayedAmt1 = financeAmt + selfRaisedAmt + capitalAmt;
      var totalPayedAmt2 = civilAmt + deviceAmt + otherAmt;
      // var totalFinanceAmt = totalPayedAmt1 + totalPayedAmt2;
      this.formdata.totalPayedAmt1 = totalPayedAmt1;
      this.formdata.totalPayedAmt2 = totalPayedAmt2;
      // this.formdata.totalFinanceAmt = totalFinanceAmt;
      // 计算比例TODO
      // this.formdata.totalPayedScale1 = parseFloat(this.formdata.totalPayedAmt1 / this.formdata.totalFinanceAmt).toFixed(4);
      this.formdata.financeScale = parseFloat(this.formdata.financeAmt / this.formdata.totalPayedAmt1).toFixed(4);
      this.formdata.selfRaisedScale = parseFloat(this.formdata.selfRaisedAmt / this.formdata.totalPayedAmt1).toFixed(4);
      this.formdata.capitalScale = parseFloat(this.formdata.capitalAmt / this.formdata.totalPayedAmt1).toFixed(4);

      // this.formdata.totalPayedScale2 = parseFloat(this.formdata.totalPayedAmt2 / this.formdata.totalFinanceAmt).toFixed(4);
      this.formdata.civilScale = parseFloat(this.formdata.civilAmt / this.formdata.totalPayedAmt2).toFixed(4);
      this.formdata.deviceScale = parseFloat(this.formdata.deviceAmt / this.formdata.totalPayedAmt2).toFixed(4);
      this.formdata.otherScale = parseFloat(this.formdata.otherAmt / this.formdata.totalPayedAmt2).toFixed(4);
    }
  }
};
</script>
