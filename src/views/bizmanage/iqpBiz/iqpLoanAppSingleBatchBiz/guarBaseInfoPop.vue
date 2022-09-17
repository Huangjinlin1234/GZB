<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" name="iqpSerno" placeholder="业务流水号" disabled></yu-xform-item>
          <yu-xform-item label="抵押物流水号" ctype="input" name="serno" placeholder="抵押物流水号" disabled></yu-xform-item>
          <yu-xform-item label="抵质押品编号" ctype="Yu-guar-base-info-retail" name="guarNo" rules="required" placeholder="抵质押品编号" @select-fn="commonSelectFn" :mapping="{'serno':'serno','guarCusName':'guarCusName','guarNo':'guarNo','guarCusId':'guarCusId','newlabel':'guarTypeCdCnname','evalAmt':'evalAmt','maxMortagageAmt':'maxMortagageAmt'}" width="730" height="480" :parms="childParams"  ></yu-xform-item>
          <yu-xform-item label="担保分类名称" ctype="input" placeholder="担保分类名称" name="guarTypeCdCnname" disabled></yu-xform-item>
          <yu-xform-item label="抵质押品所有人编号" ctype="input" name="guarCusId"  placeholder="抵质押品所有人" disabled></yu-xform-item>
          <yu-xform-item label="抵质押品所有人" ctype="input" name="guarCusName"  placeholder="抵质押品所有人" disabled></yu-xform-item>
          <yu-xform-item label="评估价(元）" ctype="input" placeholder="评估价(元）" name="evalAmt" disabled></yu-xform-item>
          <yu-xform-item label="我行可用价值" ctype="input" name="maxMortagageAmt"  placeholder="我行可用价值" :rules="baseFormRules[0]" @change="debounce()"></yu-xform-item>
          <yu-xform-item label="抵/质押率（%）" ctype="yu-num" name="mortagageRate" placeholder="抵/质押率（%）" sign="%" :multiple="100"  :rules="baseFormRules[0]" disabled></yu-xform-item>
          <yu-xform-item label="对应融资金额" ctype="input" placeholder="对应融资金额" name="correFinAmt" rules="required" @change="debounce()"></yu-xform-item>
          <yu-xform-item label="担保标识" ctype="select" placeholder="担保标识" name="isAddGuar" data-code="STD_GUAR_TYPE" rules="required"></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" name="inputDate" placeholder="登记时间" hidden></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" name="updDate" placeholder="更新时间" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doSaveMain">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
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
      File: {},
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'number',
          required: true,
          message: '请输入数字',
          trigger: 'blur'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      appAmt: 0,
      timer: null
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    },
    commonSelectFn (data, mapping) {
      // 将表格的数据，赋值给表单字段
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
      this.formdata.maxMortagageAmt = data.evalAmt;
      this.appAmt = data.evalAmt;
    },
    // 抵质押物保存
    doSaveMain () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息填写完整！');
        return;
      }
      if(parseFloat(_this.formdata.evalAmt) < parseFloat(_this.formdata.maxMortagageAmt)) {
        _this.$message('抵/质押物总价不能大于引入押品的评估价值！');
        return;
      }
      yufp.clone(_this.formdata, model);
      this.$xutils.request({
        // 同步请求
        async: true,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbizrel/ffdSaveGuarInfoRel',
        data: model,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              // window.parent.d1_A_BillCard.queryDataByCondition();
              this.$xutils.getParentPage(this, 'd1_A_BillList', 'queryDataByCondition');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    },
    accDiv (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1,
        r2;
      try {
        if (arg1.toString().split('.')[1]) {
          t1 = arg1.toString().split('.')[1].length;
        }
      } catch (e) {}
      try {
        if (arg2.toString().split('.')[1]) {
          t2 = arg2.toString().split('.')[1].length;
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
        if (s1.split('.')[1]) {
          m += s1.split('.')[1].length;
        }
      } catch (e) {
        console.log(e);
      }
      try {
        if (s2.split('.')[1]) {
          m += s2.split('.')[1].length;
        }
      } catch (e) {
        console.log(e);
      }
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
    },
    // 计算抵/质押率
    getRate () {
      if (this.formdata.correFinAmt && this.formdata.maxMortagageAmt) {
        this.formdata.mortagageRate = this.accDiv(parseFloat(this.formdata.correFinAmt), parseFloat(this.formdata.maxMortagageAmt));
      }
    },
    // 防抖
    debounce (callback, duration) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.getRate();
      }, 800);
    }
  },
  computed: {
    childParams: function () {
      return {'grtFlag': this.pageParams.grtFlag};
    }
  },


  mounted () {
    this.formdata.iqpSerno = this.pageParams.iqp_Serno;
  }
};
</script>
