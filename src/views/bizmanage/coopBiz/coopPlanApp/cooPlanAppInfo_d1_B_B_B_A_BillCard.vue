<template>
  <div id="d1_B_B_B_A_BillCard">
    <div id="d1_B_B_B_A_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="保证金信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="合作方类型" ctype="select" name="partnerType" hidden data-code="STD_PARTNER_TYPE" placeholder="合作方类型" ></yu-xform-item>
            <yu-xform-item label="保证金比例(%)" ctype="yu-num" :multiple="100" placeholder="保证金比例(%)" maxlength="5" @blur="changNum" name="bailPerc" rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="保证金账户最低金额(元)" ctype="yu-num" maxlength="14"  number-formatter="0,000.00" name="bailAccLowAmt" :rules="[{required:bailAccLowAmtRequired,message:'字段不能为空',trigger:'blur'}]" placeholder="保证金账户最低金额(元)" @blur="bailAccLowAmtChg" :hidden="bailAccLowAmtHidden"></yu-xform-item>
            <yu-xform-item label="单笔最低缴存金额(元)" ctype="yu-num" maxlength="14"  number-formatter="0,000.00" name="sigLowDepositAmt" :rules="[{required:sigLowDepositAmtRequired,message:'字段不能为空',trigger:'blur'}]" placeholder="单笔最低缴存金额(元)" :hidden="sigLowDepositAmtHidden"></yu-xform-item>
            <yu-xform-item label="保证金透支上限(元)" ctype="yu-num" maxlength="14" number-formatter="0,000.00" name="bailOverdraftMax" hidden placeholder="保证金透支上限(元)" ></yu-xform-item>
            <yu-xform-item label="保证金缴存方式" ctype="select" placeholder="保证金缴存方式" name="bailDepositMode" :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]" :disabled="disabled1" data-code="STD_BAIL_DEPOSIT_MODE"></yu-xform-item>
            <yu-xform-item label="客户号" ctype="input" maxlength="60" placeholder="客户号" name="bailAccCusNo" hidden></yu-xform-item>
            <yu-xform-item label="保证金账号" ctype="input" maxlength="60" placeholder="保证金账号" name="bailAccNo" :colspan="operate!='details'?10:12" :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]" :disabled="bailAccNoDisabled"></yu-xform-item>
            <!-- <yu-xform-item label="" ctype="custom" name="custom" colspan="2" v-if="operate!='details'">
              <yu-button type="primary" @click="queryBailAccNo">联机查询</yu-button>
            </yu-xform-item> -->
            <yu-xform-item label="保证金账号子序号" ctype="input" maxlength="60" :props="props" placeholder="保证金账号子序号" :options="options" name="bailAccNoSubSeq" @change="accNoChange" :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]" :disabled="bailAccNoSubSeqDisabled"></yu-xform-item>
            <yu-xform-item label="当前保证金金额(元)" ctype="yu-num" maxlength="14" number-formatter="0,000.00" name="bailAccNoAmt"  placeholder="当前保证金金额(元)"  :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]"></yu-xform-item>
            <yu-xform-item label="保证金是否足额" ctype="select"  data-code="STD_ZB_YES_NO" name="bailAccYesNo"  v-model="bailAccYesNo"  placeholder="请选择" disabled :hidden="true"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="调查报告信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查结论" ctype="select" name="indgtResult" rules="required" data-code="STD_INDGT_RESULT" placeholder="调查结论" :datacode-filter="codefilterFn"></yu-xform-item>
            <yu-xform-item label="调查意见" ctype="textarea" maxlength="500" name="indgtAdvice" rules="required" placeholder="调查意见" :autosize="{ minRows: 3}" :colspan="24" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="审批状态" ctype="select" name="apprStatus" rules="required" disabled data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO,STD_INDGT_RESULT,STD_ZB_APPR_STATUS');
export default {
  name: 'D1BBBABillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanapp/',
      formdata: { },
      formType: 'edit',
      formRules: { },
      bailAccYesNo: '',
      formatter: function (money, num) {
        num = num && num > 0 && num <= 20 ? num : 2;
        money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        let l = money.split('.')[0].split('').reverse();
        let r = money.split('.')[1];
        let t = '';
        for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      },
      props: {
        key: 'zhhaoxuh',
        value: 'zhhaoxuh'
      },
      options: [],
      selectedAccData: {},
      bailDisabled: true,
      disabled1: false,
      isBailRequired: false,
      bailAccLowAmtHidden: false,
      sigLowDepositAmtHidden: false,
      bailAccLowAmtRequired: false,
      sigLowDepositAmtRequired: false,
      bailAccNoDisabled: false,
      bailAccNoSubSeqDisabled: false

    };
  },
  computed: {
    partnerType: function () {
      return this.formdata.partnerType;
    }
  },
  watch: {
    partnerType: function (newValue) {
      if (newValue == 1) {
        this.bailDisabled = false;
      }
    }
  },
  methods: {
    initBailAccNo () {
      let formData = {};
      formData = yufp.clone(this.formdata, formData);
      const _this = this;
      this.$xutils.request({
        async: false,
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/coopplanapp/queryBail',
        data: JSON.stringify({bailAccNo: formData.bailAccNo}),
        success: (response, status, xhr) => {
          if (response.code == 0) {
            // 接口调不通，自己模拟处理数据
            const cusId = response.data.kehuhaoo;
            // if(cusId !== _this.$parent.$refs.d1_A_BillCard.formdata.partnerNo){
            //  _this.$xutils.showMsgBox('提示', '保证金账号和合作方编号不匹配', 400, 300);
            //  return;
            //}
            const list = response.data.list;
            if (list && list.length == 0) {
              _this.formdata.bailAccNoSubSeq = '111';
              _this.bailAccYesNo = '111';
              _this.bailAccNoAmt = '111';
              // _this.$xutils.showMsgBox('提示', '未查询到保证金账户信息', 400, 300);
            }
            _this.options = response.data.list;
            if (formData.bailAccNoSubSeq) {
              _this.formdata.bailAccCusNo = response.data.kehuhaoo;//保证金账号客户号
              _this.options.forEach(item => {
                const keyongye = item.keyongye;
                const zhhaoxuh = item.zhhaoxuh;
                if (formData.bailAccNoSubSeq == zhhaoxuh) {
                  _this.selectedAccData = item;
                  _this.formdata.bailAccNoAmt = keyongye;
                  let bailAccLowAmt = formData.bailAccLowAmt + '' || '0';
                  bailAccLowAmt = bailAccLowAmt.replace(new RegExp(',', 'gm'), '');
                  if (Number.parseFloat(bailAccLowAmt) > Number.parseFloat(keyongye)) {
                    _this.formdata.bailAccYesNo = '0';
                  } else if (!(Number.parseFloat(bailAccLowAmt) > Number.parseFloat(keyongye))) {
                    _this.formdata.bailAccYesNo = '1';
                  }
                }
              });
            }
          } else {
             _this.formdata.bailAccNoSubSeq = '11111111111';
             _this.bailAccYesNo = '1';
             _this.formdata.bailAccNoAmt = '1111';

            // _this.formdata.bailAccNoSubSeq = '123456';
            // _this.bailAccYesNo = '';
            // _this.formdata.bailAccNoAmt = '';
            // _this.$xutils.showMsgBox('提示', '未查询到保证金账户信息', 400, 300);
          }
        },
        error: (result, status, errorThrown) => {
          // _this.$xutils.showMsgBox('提示', result.erortx, 400, 300);
        }
      });
    },
    changNum () {
      var _this = this;
      if(_this.formdata.bailPerc == 0) {
        _this.formdata.bailAccLowAmt = 0;
        _this.formdata.sigLowDepositAmt = 0;
        _this.formdata.bailOverdraftMax = 0;
        _this.formdata.bailDepositMode = '02';
        _this.disabled1 = true;
        _this.bailAccNoDisabled = true;
        _this.bailAccNoSubSeqDisabled = true;
      } else {
        _this.disabled1 = false;
        _this.bailAccNoDisabled = false;
        _this.bailAccNoSubSeqDisabled = false;
      }
      if (_this.formdata.bailPerc > 0) {
        _this.isBailRequired = true;
        if (_this.formdata.partnerType != '1') {
          _this.bailAccLowAmtRequired = true;
          _this.sigLowDepositAmtRequired = true;
        }
        _this.bailAccNoDisabled = false;
        _this.bailAccNoSubSeqDisabled = false;
      } else {
        _this.isBailRequired = false;
        _this.bailAccNoDisabled = true;
        _this.bailAccNoSubSeqDisabled = true;
      }
    },
    queryBailAccNo () {

      if (this.formdata.partnerType != '1') {
      //  if (this.formdata.bailAccLowAmt == null) {
       //   this.$xutils.showMsgBox('提示', '请填写保证金账号最低金额', 400, 300);
       //   return false;
       // }
      }

      const _this = this;
      if (!_this.formdata.bailAccNo) {
       // this.$xutils.showMsgBox('提示', '请填写保证金账号', 400, 300);
       // return false;
      }
      this.initBailAccNo();
    },
    accNoChange (value) {
      if (this.formdata.bailAccNoAmt != '' && this.formdata.bailAccNoAmt) {
        this.queryBailAccNo();
      }
      const list = this.options;
      const _this = this;
      list.forEach(item => {
        const keyongye = item.keyongye;
        const zhhaoxuh = item.zhhaoxuh;
        if (value == zhhaoxuh) {
          _this.selectedAccData = item;
          _this.formdata.bailAccNoAmt = keyongye;
          _this.bailAccLowAmtChg();
        }
      });
    },
    bailAccLowAmtChg () {
      let formData = {};
      formData = yufp.clone(this.formdata, formData);

      if (!formData.bailAccLowAmt) {
        return false;
      }
      const bailAccLowAmt = formData.bailAccLowAmt.replace(new RegExp(',', 'gm'), '');
      if (!formData.bailAccNoAmt) {
        return false;
      }
      const keyongye = this.selectedAccData.keyongye;
      if (!keyongye) {
        return false;
      }
      if (Number.parseFloat(bailAccLowAmt) > Number.parseFloat(keyongye)) {
        this.bailAccYesNo = '0';
      } else {
        this.bailAccYesNo = '1';
      }
    },
     // 字典过滤
    codefilterFn (opts, datacode, name) {
        return opts.filter(function (op) {
          if (op.key == '01') {
            return true;
          }
          return false;
        });
    }
  }
};
</script>
