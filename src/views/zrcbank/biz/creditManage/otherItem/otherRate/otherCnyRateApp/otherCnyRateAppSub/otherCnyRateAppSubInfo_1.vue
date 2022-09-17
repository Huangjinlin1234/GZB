<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata"  :disabled="type=='VIEW'">
        <yu-panel panel-type="simple" title="存量客户一年期（含）流贷利率定价权限表">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="支行所属区域" ctype="select" name="bankBelongArea" data-code="STD_BANK_BELONG_AREA" @change="rateChange" rules="required" ></yu-xform-item>
            <yu-xform-item label="担保类型" ctype="select" name="rateGuarType" data-code="STD_RATE_GUAR_TYPE" @change="rateChange" rules="required" ></yu-xform-item>
            <yu-xform-item label="贷款类型" ctype="select" name="rateLoanType" data-code="STD_RATE_LOAN_TYPE" @change="rateChange" rules="required" ></yu-xform-item>
            <yu-xform-item label="所有关联客户在我行贷款总金额（万元）" ctype="input" name="loanAmt"  rules="required" ></yu-xform-item>
            <yu-xform-item label="上期批复利率" ctype="yu-interest-rate" name="lastReplyRate" rules="required" sign="%" :multiple="100" :precision="4" :min="0"></yu-xform-item>
            <yu-xform-item label="规模类型" ctype="select" name="scaleType" data-code="STD_SCALE_TYPE" @change="rateChange" rules="required"></yu-xform-item>
            <!--<yu-xform-item label="利率展期要求" ctype="input" name="extAppRateNeed" rules="" ></yu-xform-item>-->
            <yu-xform-item label="本次支行申请执行利率" ctype="yu-interest-rate" name="bankAppRate" @change="rateChange"  rules="required" sign="%" :multiple="100" :precision="4" :min="0"></yu-xform-item>
          </yu-xform-group>
          <yu-toolbar>
            <yu-button  type="primary"  @click="addFn" v-show="saveBtnShow">新增</yu-button>
            <yu-button  type="primary"  @click="modifyFn" v-show="saveBtnShow">修改</yu-button>
            <yu-button  type="primary"  @click="deleteFn" v-show="saveBtnShow">删除</yu-button>
            <yu-button  type="primary"  @click="infoFn">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="subInfo1Table" selection-type="radio" :data-url="subInfo1Url" :parse-response="requestSuccess" :default-load="false">
            <yu-xtable-column label="类别" prop="statisType" data-code="STD_STATIS_TYPE"></yu-xtable-column>
            <yu-xtable-column label="存款/贷款/计算金额 " prop="calAmt" ></yu-xtable-column>
            <yu-xtable-column label="具体品种" prop="concBreed" ></yu-xtable-column>
            <yu-xtable-column label="收益率" prop="earnRate" ></yu-xtable-column>
            <yu-xtable-column label="存期对应FTP价格" prop="maturityFtpPrice" ></yu-xtable-column>
            <yu-xtable-column label="我行执行利率" prop="realityIr" ></yu-xtable-column>
            <yu-xtable-column label="流水号" prop="pkId" hidden></yu-xtable-column>
          </yu-xtable>
          <yu-xform-group :column="2">
            <yu-xform-item label="目标利率" ctype="yu-interest-rate" name="targetRate" rules="required" disabled sign="%" :multiple="100" :precision="4" :min="0"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="cusId" disabled   style="margin-right:10px">
              <yu-button type="primary" disabled>自动测算</yu-button>
            </yu-xform-item>
            <yu-xform-item label="综合收益率" ctype="yu-interest-rate" name="compreRate"  rules="required" disabled sign="%" :multiple="100" :precision="4" :min="0"></yu-xform-item>
            <yu-xform-item label="对应审批权限" ctype="select" name="rulingApprAuth"  rules="required" data-code="STD_RULING_APPR_AUTH" disabled></yu-xform-item>
            <yu-xform-item label="测算日期" ctype="datepicker" name="evalDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary"  @click="onSave" v-show="saveBtnShow">保存</yu-button>
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import {lookup, clone} from '@/utils';
lookup.reg('STD_CUS_TYPE,STD_RATE_LOAN_KIND,STD_EXT_LOAN_TERM,STD_RATE_APP_TYPE,STD_RULING_APPR_AUTH');
export default{
  props: {
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      saveBtnShow: true,
      pageParams: {},
      type: '',
      subInfo1Url: this.$backend.cmisBiz + '/api/othercnyrateloanappsub/'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    rateChange (val) {
      if (val) {
        this.getRate();
      }
    },
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      var compreRateTotal = 0, i;
      for (i = 0; i < response.total; i++) {
        compreRateTotal = parseFloat(compreRateTotal + response.data[i].earnRate).toFixed(9);
      }
      this.formdata.compreRate = compreRateTotal;
    },
    afterInit: function () {
      let _this = this;
      _this.pageParams = _this.$route.meta.params;
      _this.type = _this.pageParams.op;
      if (_this.type == 'VIEW') {
        _this.saveBtnShow = false;
      }
      yufp.clone(_this.pageParams, _this.formdata);
      if (_this.type == 'ADD') {
        _this.formdata.subSerno = new Date().getTime();
      }
      _this.formdata.cusId = _this.pageParams.cusId;
      _this.formdata.cusName = _this.pageParams.cusName;
      // 加载列表信息
      _this.reloadTable();
    },

    // 新增按钮
    addFn: function () {
      var _this = this;
      if (_this.pageParams.op == 'ADD') {
        _this.$message({
          message: '新增前请先进行保存操作',
          type: 'warning'
        });
        return;
      }
      var obj = {};
      clone(_this.formdata, obj);
      obj['op'] = 'ADD';
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppSub/otherCnyRateAppSubInfo_1info';
      _this.$dialog.open('新增信息页面', url, -1, -1, obj, () => { _this.reloadTable() });
    },
    // 修改按钮
    modifyFn: function () {
      let _this = this;
      let selData = _this.$refs.subInfo1Table.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var selection = _this.$refs.subInfo1Table.selections[0];
      var obj = {};
      clone(selection, obj);
      obj['op'] = 'EDIT';
      obj['loanAmt'] = _this.formdata.loanAmt;
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppSub/otherCnyRateAppSubInfo_1info';
      _this.$dialog.open('修改信息页面', url, -1, -1, obj, () => { _this.reloadTable() });
    },
    // 删除按钮
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.subInfo1Table.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
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
              url: _this.$backend.cmisBiz + '/api/othercnyrateloanappsub/deleteInfo/' + selections[0].pkId,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.$refs.subInfo1Table.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },
    // 查看按钮
    infoFn: function () {
      let _this = this;
      if (_this.$refs.subInfo1Table.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.subInfo1Table.selections[0];
      var obj = {};
      clone(selection, obj);
      obj['op'] = 'VIEW';
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppSub/otherCnyRateAppSubInfo_1info';
      _this.$dialog.open('', url, -1, -1, obj, () => { _this.reloadTable() });
    },
    /**
     * 新增申请信息
     */
    onSave: function () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = this.$backend.cmisBiz + '/api/othercnyrateappsub';
      if (_this.pageParams.op == 'ADD') {
        url = url + '/';
      } else if (_this.pageParams.op == 'EDIT') {
        url = url + '/update';
      }
      var data = _this.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$message('保存成功');
            _this.onBack();
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    },
    onSubmit: function () {
    },
    /**
     * 关闭当前页面
     */
    onBack: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
      // 返回列表页面
      yufp.globalEventBus.$emit('refreshOtherCnyRateAppSubTable');
    },
    reloadTable: function () {
      var _this = this;
      _this.$refs.subInfo1Table.remoteData({condition: {oprType: '01', subSerno: _this.formdata.subSerno}});
    },
    // 测算
    getRate () {
      var _this = this;
      if (!_this.saveBtnShow) {
        return;
      }
      _this.$request({
        method: 'POST',
        url: backend.cmisCfg + '/api/cfgratecalculation/queryModel',
        data: {
          condition: JSON.stringify({
            // 定价类型 STD_RATE_APP_TYPE
            permissionType: _this.formdata.rateAppType,
            // 支行所属区域+规模类型+贷款类型+担保类型 = 测算类型
            calculationType: _this.formdata.bankBelongArea + _this.formdata.scaleType + _this.formdata.rateLoanType + _this.formdata.rateGuarType
          })
        }
      }).then((data) => {
        _this.formdata.targetRate = data.data[0].guidanceRate; // 目标利率
        // _this.formdata.compreRate = data.data[0].breakEvenRate; // 保本利率
        _this.formdata.evalDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date()); // 测算日期

        // // 对应审批权限处理
        // if (parseFloat(_this.formdata.bankAppRate) >= parseFloat(_this.formdata.targetRate)) {
        //   // 本次支行申请利率>=目标利率   ---> 支行权限
        //   _this.formdata.rulingApprAuth = '1';
        // } else if (parseFloat(_this.formdata.bankAppRate) < parseFloat(_this.formdata.targetRate - 0.005).toFixed(9)) {
        //   // 本次支行申请利率<目标利率-0.005   ---> 公司分管行长
        //   _this.formdata.rulingApprAuth = '2';
        // } else {
        //   // 公司部总经理
        //   _this.formdata.rulingApprAuth = '3';
        // }

        //支行拟执行利率<目标利率
        if (parseFloat(_this.formdata.bankAppRate) < parseFloat(_this.formdata.targetRate)) {
          //支行拟执行利率<目标利率-0.5%
          if (parseFloat(_this.formdata.bankAppRate) < parseFloat(_this.formdata.targetRate - 0.005).toFixed(9)) {
            //公司分管行长权限
            _this.formdata.rulingApprAuth = '2';
          } else {
            //公司部总经理权限
            _this.formdata.rulingApprAuth = '3';
          }
        } else {
          //支行拟执行利率<上期批复利率
          if (parseFloat(_this.formdata.bankAppRate) < parseFloat(_this.formdata.lastReplyRate)) {
            //公司部总经理权限
            _this.formdata.rulingApprAuth = '3';
          } else {
            //支行权限
            _this.formdata.rulingApprAuth = '1';
          }
        }

      });
    }
  }
};
</script>
