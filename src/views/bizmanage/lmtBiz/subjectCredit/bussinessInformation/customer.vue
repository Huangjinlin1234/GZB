<template>
  <div>
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable" :rules="formRules">
      <yu-panel title="基本信息" panel-type="simple">
        <yu-xform-group :column="2" v-if="showCus">
          <yu-xform-item label="委托人/原始权益人名称" placeholder="委托人/原始权益人名称" name="cusName" ctype="input" disabled :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="委托人/原始权益人编号" placeholder="委托人/原始权益人编号" name="cusId" ctype="input" disabled :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2" v-else>
          <yu-xform-item label="机构名称" placeholder="机构名称" name="cusName" ctype="input" disabled :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" disabled :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="同业机构类型" ctype="yu-xdic-tree" rules="required" placeholder="同业机构类型" name="intbankOrgType" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_INTBANK_TYPE' }" @change="intbankOrgTypeChange" :selectionType="radio" disabled ></yu-xform-item>
          <yu-xform-item label="注册登记地" ctype="yu-xdic-tree-addr"  placeholder="注册登记地" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '3'}" :selectionType="radio"></yu-xform-item>
          <yu-xform-item label="控股类型" placeholder="控股类型" name="holdType" data-code="STD_ZB_HOLD_TYPE" ctype="select" disabled></yu-xform-item>
          <yu-xform-item label="资产规模(上一完整年度)(亿元)" placeholder="资产规模" name="assetSize" ctype="input" :disabled="!BtnShow"></yu-xform-item>
          <yu-xform-item v-if="orgtype" label="监管评级" placeholder="监管评级" name="supeEval" ctype="select" data-code="STD_SUPE_EVAL"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="外部评级" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="评级结果" placeholder="评级结果" name="evalResultOuter" ctype="select" disabled data-code="STD_ZB_EVAL_RST"></yu-xform-item>
          <yu-xform-item label="评级时间" placeholder="评级时间" name="evalTimOuter" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="评级机构" placeholder="评级机构" name="evalOrgOuter" ctype="select" data-code="STD_ZB_OUT_APPR_ORG" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="内部评级" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="评级结果" placeholder="评级结果" name="evalResultInner" ctype="select" data-code="STD_ZB_GRADE_RANK"  fuzzy-query="both" disabled></yu-xform-item>
          <yu-xform-item label="评级时间" placeholder="评级时间" name="evalTimeInner" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="股东情况" panel-type="simple">
        <!-- <yu-button-drop>
          <yu-button v-show="saveBtnShow" type="primary" @click="addFn">新增</yu-button>
          <yu-button v-show="saveBtnShow" type="primary" @click="modifyFn">修改</yu-button>
          <yu-button v-show="saveBtnShow" type="primary" @click="deleteFn">删除</yu-button>
        </yu-button-drop> -->
        <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="Param" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
          <yu-xtable-column label="客户名称" prop="shdCusName" width=""></yu-xtable-column>
          <yu-xtable-column label="持股比例" prop="shdPerc" width="180">
            <template slot-scope="scope">
              <span>{{ parseFloat(parseFloat(scope.row.shdPerc * 100).toFixed(2)) }}%</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="企业性质" prop="corpCha" width="120" data-code="STD_ZB_INVT_TYP" ></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="shdCusId" width="200"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记时间" placeholder="登记时间" name="inputDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button v-show="BtnShow" type="primary" @click="doSave1">保存</yu-button>
        <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
      </yu-form-buttons>
    </yu-xform>
    <!-- 新增弹层 -->
    <yu-xdialog :title="'关联股东' + viewTitle[viewType]" :visible.sync="dialogVisible" width="800px" height="400px">
      <yu-xform label-width="120px" ref="refAddForm" :disabled="!saveBtnShow" :form-type="formType" v-model="formdataAdd">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户编号" ctype="input" name="cusId" placeholder="客户编号" disabled>
          </yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" disabled>
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="股东客户编号" ctype="input" placeholder="股东客户编号" name="shdCusId" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item>
          <yu-xform-item label="股东客户名称" ctype="input" placeholder="股东客户名称" name="shdCusName" disabled></yu-xform-item>
          <yu-xform-item label="持股金额" ctype="input" name="shdAmt" placeholder="持股金额" rules="required"></yu-xform-item>
          <yu-xform-item label="持股比例" ctype="input" name="shdPerc" placeholder="持股比例" rules="required">
          </yu-xform-item>
          <yu-xform-item label="企业性质" ctype="select" placeholder="企业性质" name="corpCha" rules="required" data-code="STD_ZB_INVT_TYP" :disabled="editDisabled"></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-show="dialogBtnShow" type="primary" @click="doSave">保存</yu-button>
          <yu-button type="primary" @click="doCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CORP_QLTY,STD_ZB_HOLD_TYPE,STD_ZB_INTBANK_TYPE,STD_ZB_LEVEL_ORG,STD_ZB_INVT_TYP,STD_ZB_OUT_APPR_ORG,STD_ZB_GRADE_RANK');
// 同业客户信息
export default {
  mixins: [mixinForm],
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  data () {
    return {
      dataUrl: '',
      Param: {},
      formRules: {
        assetSize: [
          { required: true, message: '请输入资产规模', trigger: 'blur' }
        ],
        shdAmt: [
          { required: true, message: '请输入持股金额', trigger: 'blur' }
        ],
        shdPerc: [
          { required: true, message: '请输入持股比例', trigger: 'blur' }
        ],
        corpCha: [
          { required: true, message: '请选择企业性质', trigger: 'blur' }
        ]
      },
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
      formdataAdd: {},
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      editDisabled: true,
      formDisabled: true,
      dialogBtnShow: true,
      BtnShow: false,
      orgtype: false,
      showCus: false
    };
  },
  created () {
    console.log('=========customer', this.children);
    let serno, cusId, op;
    if (this.children) {
      let basicSernoFlag = this.children.basicSernoFlag;
      if (basicSernoFlag) {
        this.serno = serno = this.children.basicSerno;
        this.cusId = cusId = this.children.basicCusId;
      } else {
        this.serno = serno = this.children.serno;
        this.cusId = cusId = this.children.cusId;
      }
      op = this.children.op;
    } else if (this.pageParams.serno) {
      this.serno = serno = this.pageParams.serno;
      this.cusId = cusId = this.pageParams.cusId;
      op = this.pageParams.op;
    } else if (this.$route.meta.params) {
      this.serno = serno = this.$route.meta.params.serno;
      this.cusId = cusId = this.$route.meta.params.cusId;
      op = this.$route.meta.params.op;
    }
    this.dataUrl = backend.cmisBiz + '/api/lmtappcorreshd/selectByModel';
    this.Param = {
      condition: JSON.stringify({
        oprType: '01',
        serno: serno,
        cusId: cusId
      })
    };
    op == 'EDIT' ? this.saveBtnShow = true : this.saveBtnShow = false;
    op == 'EDIT' ? this.BtnShow = true : this.BtnShow = false;
    try {
      this.children.showCus ? this.showCus = true : this.showCus = false;
    } catch (e) {}

    this.getDetails(serno, cusId);
  },
  mounted: function () {},
  methods: {
    intbankOrgTypeChange (val) {
      let str = String(val).slice(0, 3);
      if (str == 'C11') {
        this.formRules.assetSize[0].required = true;
      } else {
        this.formRules.assetSize[0].required = false;
      }
    },
    goCustomer () {
      var _this = this;
      var dialogData = {
        show: 3
      };
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdataAdd.shdCusId = retVal.cusId;
          _this.formdataAdd.shdCusName = retVal.cusName;
        }
      );
    },

    getDetails (serno, cusId) {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprelcusinfo/selectForCusInfo',
          data: {
            serno: serno,
            cusId: cusId
          }
        })
        .then((data) => {
          if (data.code == '0') {
            if (data.data[0].intbankOrgType) {
              var _orgType = String(data.data[0].intbankOrgType);
              // 证券公司类的展示监管评级
              if (
                _orgType == 'E10000' ||
                _orgType == 'E20000' ||
                _orgType == 'E21000' ||
                _orgType == 'B20000'
              ) {
                this.orgtype = true;
              } else {
                this.orgtype = false; // 隐藏
              }
            } else {
              this.orgtype = false;
            }
            yufp.clone(data.data[0], _this.formdata);
            if (!isNaN(data.data[0].assetSize)) {
              _this.formdata.assetSize = parseFloat(parseFloat(data.data[0].assetSize / 100000000).toFixed(10));
            }
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

    /**
     * 保存
     */
    doSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataAdd, model);
      var validate = false;
      _this.$refs.refAddForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var strurl = backend.cmisBiz + '/api/lmtapprelcusinfo/update';
      if (_this.viewType == 'ADD') {
        model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        strurl = backend.cmisBiz + '/api/lmtappcorreshd/';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.switchStatus('ADD', true);
      _this.editDisabled = false;
      _this.$nextTick(function () {
        _this.$refs.refAddForm.resetFields();
        _this.formdataAdd.oprType = '01';
        _this.formdataAdd.cusId = _this.formdata.cusId;
        _this.formdataAdd.cusName = _this.formdata.cusName;
        _this.formdataAdd.serno = this.$route.meta.params.serno;
        _this.formdataAdd.inputId = this.$xutils.getDefaultformulaData(
          '$LoginLoginCode'
        );
        _this.formdataAdd.inputDate = this.$xutils.getDefaultformulaData(
          '$CURRDATE'
        );
        _this.formdataAdd.inputBrId = this.$xutils.getDefaultformulaData(
          '$LoginOrgCode'
        );
        _this.formdataAdd.inputIdName = this.$xutils.getDefaultformulaData(
          '$LoginUserName'
        );
        _this.formdataAdd.inputBrIdName = this.$xutils.getDefaultformulaData(
          '$LoginOrgName'
        );
      });
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
      _this.switchStatus('EDIT', true);
      _this.editDisabled = true;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdataAdd);
      });
    },

    // 取消
    doCancel () {
      this.dialogVisible = false;
    },

    // 取消
    cancelFn () {
      this.$emit('changed', false);
      this.$dialog.close(this.dialogId);
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
              url: backend.cmisBiz + '/api/lmtappcorreshd/deleteLogicByPkId',
              data: {
                pkId: selections[0].pkId
              },
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /**
     * 保存企业基本情况
     */
    doSave1: function () {
      var validate = false,
        _this = this;
      _this.$refs.refForm.validate(function (valid) {
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
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.assetSize = _this.formdata.assetSize;
      if (!isNaN(model.assetSize)) {
        model.assetSize = parseFloat(parseFloat(model.assetSize * 100000000).toFixed(2));
      }
      model.supeEval = _this.formdata.supeEval;
      model.intbankLmtAdmit = _this.formdata.intbankLmtAdmit;
      model.pkId = _this.formdata.pkId;
      model.serno = _this.formdata.serno;
      model.cusId = _this.formdata.cusId;
      var strurl = backend.cmisBiz + '/api/lmtapprelcusinfo/updateForCusInfo';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    }
  }
};
</script>
