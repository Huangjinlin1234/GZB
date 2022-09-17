<template>
<!--
    @created by qiantj 2021-06-06
    @description 新增他行融资信息
  -->
  <div>
    <yu-xform ref="refForm" v-model="formdata" label-width="120px" :disabled="type=='VIEW'">
     <yu-panel  :hideFilter="false" :collapseHide="false">
      <yu-xform-group>
          <yu-xform-item label="他行名称" placeholder="他行名称" name="otherBankName" ctype="input" rules="required" ></yu-xform-item>
          <yu-xform-item label="担保方式" placeholder="担保方式" name="guarType" ctype="select" rules="required" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="贷款金额(万元)" placeholder="贷款金额" name="loanAmt" ctype="num" maxlength="14" number-formatter="0,000.00" rules="required" ></yu-xform-item>
          <yu-xform-item label="执行利率" placeholder="执行利率" name="execRateYear" ctype="yu-interest-rate" rules="required" ></yu-xform-item>
          <yu-xform-item label="分项流水号" placeholder="分项流水号" name="subSerno"  ctype="input" hidden ></yu-xform-item>
          <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno"  ctype="input" hidden ></yu-xform-item>
      </yu-xform-group>
     </yu-panel>
     <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      saveBtnShow: true,
      type: ''
    };
  },
  mounted () {
    this.$nextTick(() => {
      let _this = this;
      if (_this.pageParams.op == 'ADD') {
          _this.formdata.subSerno = new Date().getTime();
      }
      yufp.clone(_this.pageParams, _this.formdata);
      _this.type = _this.pageParams.op;
      if (_this.pageParams.op == 'VIEW') {
        _this.saveBtnShow = false;
      }
    });
  },
  methods: {
    // 返回列表页面
    cancelFn () {
      var _this = this;
      this.$xutils.getParentPage(this, null, 'reloadOther');
      _this.$dialog.close(this.dialogId);
    },
    saveFn: function () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = this.$backend.cmisBiz + '/api/othercnyrateappfindetails';
      if (_this.pageParams.op == 'ADD') {
        url = url + '/addothercnyrateappfindetails' ; 
      } else if (_this.pageParams.op == 'EDIT') {
        url = url + '/update' ;
      }
      var data = _this.formdata;
      data['isSelfBank'] = '0';
      data['belgYear'] = '0';
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
              _this.$message('保存成功');
              _this.cancelFn();
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    },
  }
};
</script>