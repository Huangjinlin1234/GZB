<template>
  <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable" :rules="formRules">
    <yu-panel title="担保人/增信人信息" panel-type="simple">
      <yu-button-drop style="margin-bottom:10px;"  v-show="saveBtnShow">
        <yu-button type="primary" ref="btn_doAdd" @click="doAdd_01">新增</yu-button>
        <yu-button type="primary" ref="btn_doDelete" @click="doDelete_01">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable_01" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="Param_01" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
        <yu-xtable-column label="客户编号" prop="grtCusId" width=""></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="grtCusName" width="180"></yu-xtable-column>
        <yu-xtable-column label="担保/增信方式" prop="grtMode" width="120"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="guarAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="与发行人关系" prop="issueRel" width="120"></yu-xtable-column>
        <yu-xtable-column label="是否为合格担保" prop="isValidGuar" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="抵质押品信息" panel-type="simple">
      <yu-button-drop style="margin-bottom:10px;" v-show="saveBtnShow">
        <yu-button type="primary" ref="btn_doAdd" @click="doAdd_02" >新增</yu-button>
        <yu-button type="primary" ref="btn_doDelete" @click="doDelete_02" >删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable_02" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="Param_02" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
        <yu-xtable-column label="客户编号" prop="grtCusId" width=""></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="grtCusName" width="180"></yu-xtable-column>
        <yu-xtable-column label="抵质押物编号" prop="guarNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="抵质押物名称" prop="pldimnMemo" width="120"></yu-xtable-column>
        <yu-xtable-column label="担保类型" prop="guarType" width="120" data-code="STD_ZB_ASSURE_MEANS" ></yu-xtable-column>
        <yu-xtable-column label="抵质押物类型" prop="pldimnType" width="120"></yu-xtable-column>
        <yu-xtable-column label="评估价值" prop="assEvaAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="是否合格担保" prop="isValidGuar" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <yu-xform >
      <yu-xform-group :column="1">
       <yu-xform-item label="其他担保/增信情况说明" placeholder="其他担保/增信情况说明" v-model="guarDescExt" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" show-word-limit style="margin-top:5px"></yu-xform-item>
      </yu-xform-group>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-show="saveBtnShow">
        <yu-button type="primary" @click="optSave_03">保存</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </yu-form-buttons>
    </yu-xform>
    <!-- 新增弹层 -->
    <yu-xdialog title="担保人/增信人信息" :visible.sync="show_dialog_01" width="800px" height="400px">
      <yu-xform label-width="120px" ref="addForm_01" :form-type="formType" v-model="formdata_01" :rules="rules">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" @click="goCustomer('formdata_01')" @click.stop icon="search" disabled>
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="担保/增信方式" ctype="input" placeholder="担保/增信方式" name="grtMode" rules="required"></yu-xform-item>
          <yu-xform-item label="担保金额" ctype="yu-num" number-formatter="0,000" autofocus name="guarAmt" placeholder="担保金额" rules="required"></yu-xform-item>
          <yu-xform-item label="与发行人关系" ctype="input" placeholder="与发行人关系" name="issueRel" maxlength="200" rules="required"></yu-xform-item>
          <yu-xform-item label="是否为合格担保" ctype="select" placeholder="是否为合格担保" name="isValidGuar" data-code="STD_ZB_YES_NO" @change="isValidGuarChange_01" rules="required"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="optSave_01">保存</yu-button>
          <yu-button type="primary" @click="doCancel">取消</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>

    <yu-xdialog title="抵质押品信息" :visible.sync="show_dialog_02" width="800px" height="400px">
      <yu-xform label-width="120px" ref="addForm_02" :form-type="formType" v-model="formdata_02" :rules="rules">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" @click="goCustomer('formdata_02')" @click.stop icon="search" disabled >
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="抵质押物编号" ctype="input" placeholder="抵质押物编号" name="guarNo" rules="required"></yu-xform-item>
          <yu-xform-item label="抵质押物名称" ctype="input" name="pldimnMemo" placeholder="抵质押物名称" rules="required" ></yu-xform-item>
          <yu-xform-item label="担保类型" ctype="select" placeholder="担保类型" name="guarType" required data-code="STD_ZB_GUAR_WAY" exclude-key="00,21,22,30,40,50" rules="required"></yu-xform-item>
          <yu-xform-item label="抵质押物类型" ctype="input" placeholder="抵质押物类型" name="pldimnType" rules="required"></yu-xform-item>
          <yu-xform-item label="评估价值" ctype="yu-num" number-formatter="0,000" autofocus placeholder="评估价值" name="assEvaAmt" rules="required" maxlength="200"></yu-xform-item>
          <yu-xform-item label="是否合格担保" ctype="select" placeholder="是否合格担保" name="isValidGuar" rules="required" maxlength="200" data-code="STD_ZB_YES_NO" @change="isValidGuarChange_02"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="optSave_02">保存</yu-button>
          <yu-button type="primary" @click="doCancel">取消</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>

  </yu-xform>


</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_WAY');
export default {
  props: {
    children: Object
  },
  data () {
    return {
      dataUrl: backend.cmisBiz + '/api/lmtapprelguar/selectByModel',
      Param_01: {
        condition: JSON.stringify({ oprType: '01', listType: '01', serno: this.children.serno })
      },
      Param_02: {
        condition: JSON.stringify({ oprType: '01', listType: '02', serno: this.children.serno})
      },
      show_dialog_01: false,
      show_dialog_02: false,
      formdata_01: {
        isValidGuar: '0'
      },
      formdata_02: {
        isValidGuar: '0',
        grtMode: ''
      },
      guarDescExt: '',
      rules: {
        cusName: [
          {
            type: 'string',
            required: true,
            message: '请选择要关联的客户',
            trigger: 'blur'
          }
        ],
        grtMode: [
          {
            type: 'string',
            required: true,
            message: '担保/增信方式',
            trigger: 'blur'
          }
        ],
        issueRel: [
          {
            type: 'string',
            required: true,
            message: '与发行人关系不能为空',
            trigger: 'blur'
          },
          { max: 200, message: '不超过200个字符' }
        ]
      }
    };
  },
  created () {
    this.guarDescExt = this.children.guarDescExt;
    this.children.op == 'EDIT'
      ? this.saveBtnShow = true
      : this.saveBtnShow = false;
  },
  methods: {
    optSave_03: function () {
      var _this = this;
      var model = [];
      model.guarDescExt = this.guarDescExt;
      model.serno = this.children.serno;
      console.log('model==>', model);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestsubapp/updateGuarDescExt',
        data: {
          serno: _this.children.serno,
          guarDescExt: _this.guarDescExt
        },
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message('保存成功');
          }
        }
      });
    },
    isValidGuarChange_01: function (val) {
      if (this.formdata_01.isValidGuar == '1') {
        var h = this.$createElement;
        var message = '（一）我国中央政府、中央人民银行、政策性银行、公共部门实体和商业银行；' +
          '\n（二）评级为BBB-（含BBB-）以上国家或地区政府和中央银行；' +
          '\n（三）注册地所在国家或地区评级在A-（含A-）以上的境外商业银行和公共部门实体；' +
          '\n（四）多边开发银行、国际清算银行和国际货币基金组织。';
        var msg = message.split('\n');
        var tmpMsg = [];
        for (let i in msg) {
          tmpMsg.push(h('p', null, msg[i]));
        }
        this.$msgbox({
          title: '担保条件',
          message: h('div', null, tmpMsg),
          showCancelButton: true,
          lineBreak: true,
          confirmButtonText: '确认合格担保',
          cancelButtonText: '取消',
          showClose: false
        }).then(() => {
          this.formdata_01.isValidGuar = '1';
        }).catch(action => {
          this.formdata_01.isValidGuar = '0';
        });
      }
    },
    isValidGuarChange_02: function (val) {
      if (this.formdata_02.isValidGuar == '1') {
        var h = this.$createElement;
        var message = '（一）以特户、封金或保证金等形式特定化后的现金；' +
          '\n（二）黄金；' +
          '\n（三）银行存单；' +
          '\n（四）我国财政部发行的国债；' +
          '\n（五）中国人民银行发行的票据；' +
          '\n（六）我国政策性银行、公共部门实体、商业银行发行的债券、票据和承兑的汇票；' +
          '\n（七）金融资产管理公司为收购国有银行而定向发行的债券；' +
          '\n（八）评级为BBB-（含BBB-）以上国家或地区政府和中央银行发行的债券；' +
          '\n（九）注册地所在国家或地区评级在A-（含A-）以上的境外商业银行和公共部门实体发行的债券、票据和承兑的汇票；' +
          '\n（十）多变开发银行、国际清算银行和国际货币基金组织发行的债券。';
        var msg = message.split('\n');
        var tmpMsg = [];
        for (let i in msg) {
          tmpMsg.push(h('p', null, msg[i]));
        }
        this.$msgbox({
          title: '担保条件',
          message: h('div', null, tmpMsg),
          showCancelButton: true,
          lineBreak: true,
          confirmButtonText: '确认合格担保',
          cancelButtonText: '取消',
          showClose: false
        }).then(() => {
          this.formdata_02.isValidGuar = '1';
        }).catch(action => {
          this.formdata_02.isValidGuar = '0';
        });
      }
    },
    doDelete_01: function () {
      var selections = this.$refs.refTable_01.selections;
      this.optDelete(selections);
    },
    doDelete_02: function () {
      var selections = this.$refs.refTable_02.selections;
      this.optDelete(selections);
    },
    optDelete (selections) {
      var _this = this;
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
                backend.cmisBiz + '/api/lmtapprelguar/deleteLogicByPkId',
              data: {
                pkId: selections[0].pkId
              },
              callback: function (code, message, response) {
                _this.$refs.refTable_01.remoteData();
                _this.$refs.refTable_02.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    // 保存
    optSave_01: function () {
      var validate = false,
        _this = this;
      _this.$refs.addForm_01.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var _this = this;
      var model = [];
      model = this.formdata_01;
      model.grtCusName = this.formdata_01.cusName;
      model.grtCusId = this.formdata_01.cusId;
      model.guarType = '30';
      model.serno = this.children.serno;
      model.oprType = '01';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprelguar/insertLmtAppRelGuar',
        data: model,
        callback (data) {
          _this.show_dialog_01 = false;
          _this.$refs.refTable_01.remoteData();
          _this.$message('操作成功');
        }
      });
    },
    optSave_02: function () {
      var validate = false,
        _this = this;
      _this.$refs.addForm_02.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var _this = this;
      var model = [];
      model = this.formdata_02;
      model.grtCusName = this.formdata_02.cusName;
      model.grtCusId = this.formdata_02.cusId;
      model.serno = this.children.serno;
      model.oprType = '01';
      console.log('model==>', model);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprelguar/insertLmtAppRelGuar',
        data: model,
        callback (data) {
          _this.show_dialog_02 = false;
          _this.$refs.refTable_02.remoteData();
          _this.$message('操作成功');
        }
      });
    },
    // 打开新增窗口
    doAdd_01: function () {
      this.show_dialog_01 = true;
      var _this = this;
      this.$nextTick(function () {
        _this.$refs.addForm_01.resetFields();
      });
      _this.formdata_01.guarAmt = 0;
    },
    doAdd_02: function () {
      this.show_dialog_02 = true;
      var _this = this;
      this.$nextTick(function () {
        _this.$refs.addForm_02.resetFields();
      });
      _this.formdata_02.assEvaAmt = 0;
    },
    // 关闭窗口
    doCancel: function () {
      this.show_dialog_01 = false;
      this.show_dialog_02 = false;
    },
    // 客户选择
    goCustomer: function (dataNo) {
      console.log('data==>', this);
      var _this = this;
      var dialogData = {
        hidden: 3
      };
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/selectCustomerType', // zrcbank/lmt/lmtcusIntbankQuery/lmtcusIntbankQuery
        -1,
        -1,
        dialogData,
        (retVal) => {
          console.log('return ===>', retVal);
          if (dataNo == 'formdata_01') {
            yufp.clone(retVal, this.formdata_01);
          }
          if (dataNo == 'formdata_02') {
            yufp.clone(retVal, this.formdata_02);
          }
        }
      );
    },
    // 返回
    cancelFn () {
      this.$emit('changed', false);
    }
  }
};
</script>
