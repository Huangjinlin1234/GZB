<template>
  <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable">
    <yu-panel title="基本信息" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="入池基础资产标准" placeholder="入池基础资产标准" name="poolBasicAssetNormal" ctype="input"></yu-xform-item>
        <yu-xform-item label="初始起算日" placeholder="初始起算日" name="firstStartDate" ctype="datepicker"></yu-xform-item>
        <yu-xform-item label="基础资产类型" placeholder="基础资产类型" name="basicAssetType" ctype="select" rules="required" data-code="STD_ZB_BOTT_TYPE"></yu-xform-item>
      </yu-xform-group>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </yu-xform>
</template>
<script>
yufp.lookup.reg('STD_ZB_BOTT_TYPE');
export default {
  props: {
    children: Object
  },
  data () {
    return {
      guarDescExt: String,
      totalMoney: '',
      viewType: 'ADD',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      formdata: {},
      intendActualIssuedScale: '',
      lmtAmt: ''
    };
  },
  created () {
    let serno, cusId, op;
    if (this.children.serno) {
      this.serno = serno = this.children.serno;
      this.cusId = cusId = this.children.cusId;
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
    op == 'EDIT' ? this.saveBtnShow = true : this.saveBtnShow = false;
  },
  mounted: function () {},
  methods: {
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
      model.serno = _this.serno;
      model.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var updateurl =
        backend.cmisBiz + '/api/lmtsiginvestbasicinfo/';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == '0') {
            // _this.$refs.refTable.remoteData();
            _this.$message('修改成功');
            _this.$emit('changed', 'addLoanProject');
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
