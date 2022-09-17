<template>
  <div>
    <yu-panel title="底层资产情况" panel-type="simple">
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary" v-show="saveBtnShow" @click="addFn">新增</yu-button>
        <yu-button type="primary" v-show="saveBtnShow" @click="modifyFn">修改</yu-button>
        <yu-button type="primary" @click="infoFn">查看</yu-button>
        <yu-button type="primary" v-show="saveBtnShow" @click="deleteFn">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" request-type="POST" style="width: 100%">
        <yu-xtable-column prop="basicCusName" label="底层融资人姓名"> </yu-xtable-column>
        <yu-xtable-column prop="basicCusId" label="底层融资客户编号"> </yu-xtable-column>
        <yu-xtable-column prop="basicAssetBalanceAmt" label="底层贷款余额（万元）">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.basicAssetBalanceAmt) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column prop="" label="我行在该底层的投资金额（万元）">
          <template slot-scope="scope">
            <span>{{ numFn(parseFloat(scope.row.basicAssetBalanceAmt * lmtAmt / prdTotalAmt).toFixed()) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column prop="" label="基础资产余额占产品总额比例">
          <template slot-scope="scope">
            <span>{{ parseFloat(parseFloat(scope.row.basicAssetBalanceAmt * 100 / prdTotalAmt).toFixed(2)) + '%' }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column prop="basicAssetEndDate" label="贷款到期日"> </yu-xtable-column>
        <!-- <yu-xtable-column prop="basicAssetBalanceTerm" label="剩余期限"> </yu-xtable-column> -->
      </yu-xtable>
    </yu-panel>
    <!-- 新增弹层 -->
    <yu-xdialog title="底层基础资产明细新增向导" :visible.sync="dialogVisibleAdd" width="800px" height="450px">
      <yu-xform label-width="120px" ref="refFormAdd" :disabled="formDisabled" :form-type="formType" v-model="formdataAdd">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户名称" ctype="input" name="basicCusName" rules="required" @click="goCustomer" @click.stop icon="search" disabled>
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" name="basicCusId" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="是否申报底层授信" ctype="select" name="isAppBasicLmt" rules="required" data-code="STD_ZB_YES_NO" :disabled="peerDisabled" @change="isAppBasicLmtChange"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="占用底层授信分项编号" ctype="input" name="useBasicLmtSubSerno" :hidden="basicLmtflag" rules="required" @click="handleIconClick" @click.stop icon="search" :colspan="10" disabled></yu-xform-item>
          <yu-xform-item label="" :hidden="basicLmtflag" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="handleLook">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="当前可用额度（万元）" ctype="yu-num" number-formatter="0,000" name="basicAssetBalanceAmt" :hidden="basicLmtflag" rules="required"></yu-xform-item>
          <yu-xform-item label="占用底层授信品种编号" ctype="input" name="useBasicLmtItemNo" :hidden="basicLmtflag" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="占用底层授信品种名称" ctype="input" name="useBasicLmtItemName" :hidden="basicLmtflag" rules="required"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-norepeat.loading type="primary" @click="doNext">下一步</yu-button>
          <yu-button type="primary" @click="doCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import {numFn} from '@/utils/unitchange';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CUR_TYP');
export default {
  props: {
    children: Object
  },
  components: { YufpDemoSelector },
  data: function () {
    return {
      formdata: {},
      dataUrl: backend.cmisBiz + '/api/lmtsiginvestbasicinfosub/selectByModel',
      Param: { condition: { oprType: '01', serno: this.children.serno } },
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      dialogVisibleAdd: false,
      peerDisabled: false,
      basicLmtflag: false,
      viewType: 'DETAIL',
      prdTotalAmt: '',
      lmtAmt: '',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: false,
      formDisabled: true,
      editDisabled: true,
      dialogBtnShow: true,
      numFn
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.$route.meta.params;
      if (_this.data.formdata) {
        _this.data = this.$route.meta.params.formdata;
      }
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.serno = this.data.serno;
      if (_this.op == 'EDIT') {
        _this.saveBtnShow = true;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestapp/selectBySerno',
        data: { serno: _this.serno },
        callback: function (code, message, response) {
          _this.lmtAmt = response.data.lmtAmt;
        }
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestsubapp/selectBySerno',
        data: { serno: _this.serno },
        callback: function (code, message, response) {
          _this.prdTotalAmt = response.data.prdTotalAmt;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.dialogBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    isAppBasicLmtChange () {
      var _this = this;
      if (_this.formdataAdd.isAppBasicLmt == '1') {
        _this.basicLmtflag = true;
      } else if (_this.formdataAdd.isAppBasicLmt == '0') {
        _this.basicLmtflag = false;
      }
    },

    goCustomer () {
      var _this = this;
      var dialogData = {
        show: 5
      };
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/selectCustomerType',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.$refs.refFormAdd.resetFields();
          _this.formdataAdd.basicCusName = retVal.cusName;
          _this.formdataAdd.basicCusId = retVal.cusId;
          _this.formdataAdd.basicCusType = retVal.cusType;
          _this.formdataAdd.basicCusCatalog = retVal.cusCatalog;
          if (retVal.cusCatalog == '3') {
            _this.formdataAdd.isAppBasicLmt = '0';
            _this.peerDisabled = true;
            _this.basicLmtflag = false;
          }
          if (retVal.cusCatalog == '2') {
            _this.peerDisabled = false;
            _this.basicLmtflag = false;
          }
        }
      );
    },

    goLmtSubSerno () {
      var _this = this;
      var dialogData = {};
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/loanInformation/singleLmtSigInvestBasicInfoSub',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdataAdd.useBasicLmtSubSerno = retVal.useBasicLmtSubSerno;
          _this.formdataAdd.basicAssetBalanceAmt = parseFloat(retVal.basicAssetBalanceAmt / 10000).toFixed();
          _this.formdataAdd.useBasicLmtItemNo = retVal.useBasicLmtItemNo;
          _this.formdataAdd.useBasicLmtItemName = retVal.useBasicLmtItemName;
        }
      );
    },

    handleIconClick: function () {
      let _this = this;
      let cusId = this.formdataAdd.basicCusId;
      if (cusId == null || cusId == '') {
        this.$xutils.showMsgBox(
          '提示',
          '客户编号不能为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      var data = { cusId: cusId };
      this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/loanInformation/singleBasicCusApp',
        -1,
        -1,
        data,
        (params) => {
          let limitSubNo = params.limitSubNo;
          // 当客户选择为法人时 只能选择 ”债券池”、“债券投资”
          if (_this.formdataAdd.basicCusCatalog == '2' && !(limitSubNo == '4001' || limitSubNo == '4002')) {
            this.$xutils.showMsgBox(
              '提示',
              '法人客户占用底层授信分项品种只能选择“债券池”、“债券投资”额度!\r\n请重新操作!',
              350,
              150
            );
            return;
          }
          _this.formdataAdd.useBasicLmtSubSerno = params.apprSubSerno;
          _this.formdataAdd.basicAssetBalanceAmt = parseFloat(params.availableTotal / 10000).toFixed();
          _this.formdataAdd.useBasicLmtItemNo = params.limitSubNo;
          _this.formdataAdd.useBasicLmtItemName = params.limitSubName;
        }
      );
    },

    // 授信分项编号查看
    handleLook: function () {
      let _this = this;
      let useBasicLmtSubSerno = this.formdataAdd.useBasicLmtSubSerno;
      let cusId = this.formdataAdd.basicCusId;
      if (useBasicLmtSubSerno == null || useBasicLmtSubSerno == '') {
        _this.$xutils.showMsgBox('提示', '占用底层授信分项编号为空!', 350, 150);
        return;
      }
      var data = {
        cusId: cusId,
        apprSubSerno: useBasicLmtSubSerno,
        op: 'VIEW'
      };
      this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/loanInformation/singleBasicCusApp',
        -1,
        -1,
        data,
        (params) => {}
      );
    },

    /**
     * 下一步
     */
    doNext: function () {
      var validate = false,
        _this = this;
      _this.$refs.refFormAdd.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var model = {};
      yufp.clone(_this.formdataAdd, model);
      // 向后台发送保存请求
      model.oprType = '01';
      model.serno = _this.serno;
      model.basicSerno = this.$xutils.getSEQWithParamFromServer('LMT_SERNO');
      model.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.basicAssetBalanceAmt = parseFloat(model.basicAssetBalanceAmt * 10000).toFixed();
      model.basicAssetType = this.basicAssetType;
      if (model.isAppBasicLmt == '1') {
        model.useBasicLmtItemNo = '15030101';
        model.useBasicLmtItemName = '穿透化额度';
        model.basicAssetBalanceAmt = 0;
      }
      var updateurl =
        backend.cmisBiz + '/api/lmtsiginvestbasicinfosub/insertBasicInfoSub';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$nextTick(function () {
              _this.$refs.refTable.remoteData();
            });
            _this.$message('修改成功');
            _this.dialogVisibleAdd = false;
            let dialogData = response.data;
            dialogData.lmtAmt = _this.lmtAmt;
            dialogData.prdTotalAmt = _this.prdTotalAmt;
            dialogData.op = 'EDIT';
            _this.$dialog.open(
              '',
              'bizmanage/lmtBiz/subjectCredit/loanInformation/proAssetSubInfoDetails',
              -1,
              -1,
              dialogData,
              (retVal) => {}
            );
          } else {
            _this.$message({ message: '修改失败', type: 'error' });
          }
        }
      });
    },
    getBasicAssetType () {
      return new Promise((resolve, reject) => {
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsiginvestbasicinfo/selectBySerno',
          data: {
            serno: this.$route.meta.params.serno,
            cusId: this.$route.meta.params.cusId
          }
        }).then((data) => {
          if (data.code == '0') {
            resolve(data.data);
          } else {
            this.$message({ message: '请求失败', type: 'error' });
          }
        });
      });
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.getBasicAssetType().then((res) => {
        console.log('===================res', res);
        if (res) {
          this.basicAssetType = res.basicAssetType;
          addData();
        } else {
          _this.$message({
            message: '没有设置基础资产类型，不允许新增！',
            type: 'error'
          });
          return;
        }
      });
      function addData () {
        if (parseFloat(_this.prdTotalAmt) == 0 || _this.prdTotalAmt == null) {
          _this.$message({
            message: '项目总金额为0，不允许新增！',
            type: 'error'
          });
          return;
        }
        _this.dialogVisibleAdd = true;
        _this.editDisabled = false;
        _this.$nextTick(function () {
          _this.$refs.refFormAdd.resetFields();
          // _this.formdataAdd.oprType = '01';
          // _this.formdataAdd.isRevolv = '1';
          // _this.formdataAdd.curType = 'CNY';
          // _this.formdataAdd.serno = this.$route.meta.params.serno;
          // _this.formdataAdd.subSerno = this.$xutils.getSEQWithParamFromServer('LMT_SUB_SERNO');
        });
      }
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let dialogData = _this.$refs.refTable.selections[0];
      dialogData.lmtAmt = _this.lmtAmt;
      dialogData.prdTotalAmt = _this.prdTotalAmt;
      dialogData.op = 'EDIT';
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/loanInformation/proAssetSubInfoDetails',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.$refs.refTable.remoteData();
        }
      );
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let dialogData = _this.$refs.refTable.selections[0];
      dialogData.lmtAmt = _this.lmtAmt;
      dialogData.prdTotalAmt = _this.prdTotalAmt;
      dialogData.op = 'DETAIL';
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/loanInformation/proAssetSubInfoDetails',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.$refs.refTable.remoteData();
        }
      );
    },

    // 取消
    doCancel () {
      this.dialogVisibleAdd = false;
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
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
                backend.cmisBiz + '/api/lmtsiginvestbasicinfosub/logicalDelete',
              data: { condition: JSON.stringify({ pkId: selections[0].pkId }) },
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>
