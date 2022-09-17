<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="保证人编号" ctype="yu-retail" name="cusId" rules="required" placeholder="保证人编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'assureName','certType':'cerType','certCode':'certCode'}" width="900" height="900" :parms="{'cusState':'2'}" ></yu-xform-item>
          <yu-xform-item label="保证人名称" ctype="input" name="assureName" rules="required" disabled ></yu-xform-item>
           <yu-xform-item label="保证人类型" ctype="select" name="cusTyp" placeholder="保证人类型" data-code="STD_ASSURE_CUS_TYPE"   ></yu-xform-item>
          <yu-xform-item label="保证人证件类型" ctype="select" name="cerType"  placeholder="保证人证件类型" data-code="STD_ZB_CERT_TYP" disabled ></yu-xform-item>
          <yu-xform-item label="保证人证件号码" ctype="input" placeholder="保证人证件号码" name="certCode" disabled></yu-xform-item>
          <yu-xform-item label="担保金额" ctype="input" name="guarAmt" placeholder="担保金额"   ></yu-xform-item>
          <yu-xform-item label="保证方式" ctype="select" placeholder="保证方式" data-code="STD_ZB_GUARANTY_TYPE" name="guarantyType"   ></yu-xform-item>
          <yu-xform-item label="保证法律有效性" ctype="select" placeholder="保证法律有效性" name="ensureLegalValidity" data-code="STD_ZB_BZFLYXX"  ></yu-xform-item>
          <yu-xform-item label="保证人与借款人关联关系" ctype="select" placeholder="保证人与借款人关联关系" name="relationLender" data-code="STD_ZB_BZRYJKRGLGX"  ></yu-xform-item>
          <yu-xform-item label="担保标识"  ctype="select" placeholder="担保标识" name="isAddGuar" data-code="STD_GUAR_TYPE"></yu-xform-item>
          <yu-xform-item label="授信流水号" prop="serno" name="serno" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
       <yu-button type="primary" @click="saveGuarGuaratee">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_GUAR_TYPE,STD_ASSURE_CUS_TYPE,STD_ZB_GUARANTY_TYPE,STD_ZB_CERT_TYP,STD_ZB_BZFLYXX,STD_ZB_BZRYJKRGLGX,STD_GUAR_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D13ABillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    iqpSerno: null,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpriskchkdebtcfrm/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpriskchkdebtcfrm/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      op: false,
      File: {},
      isEdit: false, //是否可编辑
    };
  },
  methods: {

    saveGuarGuaratee () {
      var _this = this;
      var model = {};
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.clone(_this.formdata, model);
      this.$xutils.request({
        // 同步请求
        async: true,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbizrel/saveGuarBao',
        data: model,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              // window.parent.d1_A_BillCard.queryDataByCondition();
              this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }

      });
    },
  
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    // 抵质押物保存
    doSaveMain () {
      var _this = this;
      var model = {};
      if(parseFloat(_this.formdata.evalAmt) < parseFloat(_this.formdata.maxMortagageAmt)) {
        _this.$message('抵/质押物总价不能大于引入押品的评估价值！');
        return;
      }
      yufp.clone(_this.formdata, model);
      this.$xutils.request({
        // 同步请求
        async: true,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbizrel/updateguarbaseinfo',
        data: model,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              this.$xutils.getParentPage(this, 'd1_A_BillList', 'queryDataByCondition');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    accDiv (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1,
        r2;
      try {
        if(arg1.toString().split('.')[1]) {
          t1 = arg1.toString().split('.')[1].length
        }
      } catch (e) {}
      try {
        if(arg2.toString().split('.')[1]) {
          t2 = arg2.toString().split('.')[1].length
        }
      } catch (e) {}
      r1 = Number(arg1.toString().replace('.', ''));
      r2 = Number(arg2.toString().replace('.', ''));
      return this.accMul(r1 / r2, Math.pow(10, t2 - t1));
    },
    // 乘法获取准确值
    accMul (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        if(s1.split('.')[1]) {
          m += s1.split('.')[1].length
        }
      } catch (e) {
        console.log(e)
      }
      try {
        if(s2.split('.')[1]) {
          m += s2.split('.')[1].length
        }
      } catch (e) {
        console.log(e)
      }
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
    },

    // 计算抵/质押率
    getRate () {
      if(this.formdata.correFinAmt && this.formdata.maxMortagageAmt) {
        this.formdata.mortagageRate = this.accDiv(parseFloat(this.formdata.correFinAmt), parseFloat(this.formdata.maxMortagageAmt));
      }
    },
    //防抖
    debounce (callback, duration) {
      if(this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.getRate()
      }, 800)
    },

    changeMaxMortagageAmt: function (value) {
      var _this = this;

      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/selectappamtbuguarrelserno',
        data: {iqpSerno: _this.formdata.iqpSerno},
        callback: function (code, message, response) {
          if (code == '0') {
            _this.formdata.mortagageRate = _this.accDiv(parseFloat(response.data.appAmt), parseFloat(value));
          } else {
            _this.formdata.mortagageRate = null;
            _this.$message({
              message: message,
              type: 'error'
            });
          }
        }
      });
    }
  },
  mounted () {
    var _this = this;
    this.formdata.serno = this.pageParams.subSerno;
    var op2 = this.pageParams.op;
    if (op2 == 'VIEW') {
      this.op = true;
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    yufp.service.request({
      method: 'GET',
      url: backend.cmisBiz + '/api/guarbizrel/queryguarbizrelguarbasedto/' + this.pageParams.pkId,
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  }
};
</script>