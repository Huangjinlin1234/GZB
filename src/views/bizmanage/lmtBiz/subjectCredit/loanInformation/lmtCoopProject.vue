<template>
  <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="formDisabled">
    <yu-panel title="本次授信方案" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="底层授信申请流水号" placeholder="底层授信申请流水号" name="basicSerno" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="2">
        <yu-xform-item label="额度品种编号" placeholder="额度品种编号" name="basicLmtBizType" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="额度品种名称" placeholder="额度品种名称" name="basicLmtBizTypeName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="申请额度(万元)" placeholder="申请额度(万元)" name="lmtAmt" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="是否循环" placeholder="是否循环" name="isRevolv" :rules="rule[0]" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
        <yu-xform-item label="授信期限(月)" placeholder="授信期限(月)" name="lmtTerm" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
      </yu-xform-group>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </yu-xform>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  props: {
    children: Object
  },
  data () {
    return {
      viewType: 'ADD',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      formdata: {},
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
      formDisabled: true,
      saveBtnShow: false
    };
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
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
      debugger;
      var _this = this;
      _this.data = this.dataParam;
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.basicSerno = this.data.basicSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestbasiclimitapp/selectAll',
        data: { condition: JSON.stringify({ oprType: '01', basicSerno: _this.basicSerno }) },
        callback: function (code, message, response) {
          debugger;
          yufp.clone(response.data[0], _this.formdata);
        }
      });
      if (_this.op == 'EDIT') {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
      }
    },

    /**
      保存
     */
    saveFn: function () {
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
      yufp.clone(_this.formdata, model);
      // 向后台发送保存请求
      model.oprType = '01';
      model.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var updateurl =
        backend.cmisBiz + '/api/lmtsiginvestbasiclimitapp/saveisrevolv';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == '0') {
            // _this.$refs.refTable.remoteData();
            _this.$message('修改成功');
          } else {
            _this.$message({ message: '修改失败', type: 'error' });
          }
        }
      });
    },
    // 返回
    cancelFn () {
      this.$emit('changed', false);
    }
  }
};
</script>
