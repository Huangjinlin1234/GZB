
<template>
  <div>
    <yu-panel title="原借据信息" :hideFilter="false" :collapseHide="false">
      <yu-xform v-model="baseFormdataOld"  label-width="120px" disabled>
        <yu-xform-group :column="2">
           <yu-xform-item align="center" label="应收应计利息" name="recRemInt"></yu-xform-item>
           <yu-xform-item align="center" label="催收应计利息" name="bcmRemInt"></yu-xform-item>
           <yu-xform-item align="center" label="应收欠息" name="recDebitInt"></yu-xform-item>
           <yu-xform-item align="center" label="催收欠息" name="bcmDebitInt"></yu-xform-item>
           <yu-xform-item align="center" label="应收应计罚息" name="recRemPenalInt"></yu-xform-item>
           <yu-xform-item align="center" label="催收应计罚息" name="bcmRemPenalInt"></yu-xform-item>
           <yu-xform-item align="center" label="应收罚息" name="recPenalInt"></yu-xform-item>
           <yu-xform-item align="center" label="催收罚息" name="bcmPenalInt" ></yu-xform-item>
           <yu-xform-item align="center" label="应计复息" name="recCompoundInt"></yu-xform-item>
           <yu-xform-item align="center" label="复息" name="compoundInt"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    
    <yu-xform v-model="baseFormdata" label-width="120px" :disabled="viewType=='DETAIL'" :rules="rules" ref="baseForm">
      <yu-panel title="减免借据信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="2">
           <yu-xform-item align="center" label="应收应计利息" name="recRemInt"></yu-xform-item>
           <yu-xform-item align="center" label="催收应计利息" name="bcmRemInt"></yu-xform-item>
           <yu-xform-item align="center" label="应收欠息" name="recDebitInt"></yu-xform-item>
           <yu-xform-item align="center" label="催收欠息" name="bcmDebitInt"></yu-xform-item>
           <yu-xform-item align="center" label="应收应计罚息" name="recRemPenalInt"></yu-xform-item>
           <yu-xform-item align="center" label="催收应计罚息" name="bcmRemPenalInt"></yu-xform-item>
           <yu-xform-item align="center" label="应收罚息" name="recPenalInt"></yu-xform-item>
           <yu-xform-item align="center" label="催收罚息" name="bcmPenalInt" ></yu-xform-item>
           <yu-xform-item align="center" label="应计复息" name="recCompoundInt"></yu-xform-item>
           <yu-xform-item align="center" label="复息" name="compoundInt"></yu-xform-item>
        </yu-xform-group>
      </yu-panel> 
      <yu-panel title="预计减免费用" :hideFilter="false" :collapseHide="false"> 
        <yu-xform-group :column="2">
           <yu-xform-item align="center" label="预计减免费用" name="reducCostAmt"></yu-xform-item>
           <yu-xform-item align="center" label="预计减免本金" name="reducCapAmt" disabled value="0"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <div style="text-align:center">
        <yu-button type="primary" @click="daSave" :hidden="viewType=='DETAIL'">保存</yu-button>
        <yu-button type="primary" @click="daBack">返回</yu-button>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixin from '@/utils/mixin';
export default {
  mixins: [mixin],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    var _this = this
    var validatePass1 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.recRemInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass2 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.bcmRemInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass3 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.recDebitInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass4 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.bcmDebitInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass5 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.recRemPenalInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass6 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.bcmRemPenalInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass7 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.recPenalInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass8 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.bcmPenalInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass9 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.recCompoundInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
     var validatePass10 = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        if (value > _this.baseFormdataOld.compoundInt) {
          callback(new Error('减免金额不能大于原借据金额'));
        }
        callback();
      }
    };
    return {
      baseFormdata: {},
      baseFormdataOld: {},
      viewType: '',
      rules:{
        recRemInt:[
          {validator: validatePass1},
          {required: true}
        ],
        bcmRemInt:[
          {validator: validatePass2},
          {required: true}
        ],
        recDebitInt:[
          {validator: validatePass3},
          {required: true}
        ],
        bcmDebitInt:[
          {validator: validatePass4},
          {required: true}

        ],
        recRemPenalInt:[
          {validator: validatePass5},
          {required: true}
        ],
        bcmRemPenalInt:[
          {validator: validatePass6},
          {required: true}
        ],
        recPenalInt:[
          {validator: validatePass7},
          {required: true}
        ],
        bcmPenalInt:[
          {validator: validatePass8},
          {required: true}
        ],
        recCompoundInt:[
          {validator: validatePass9},
          {required: true}
        ],
        compoundInt:[ 
          {validator: validatePass10},
          {required: true}
        ],
      }
    };
  },
  created () {
    var _this = this;
    _this.viewType = _this.pageParams.viewType;
    console.log("_this.pageParams", _this.pageParams)
    this.$nextTick(() => {
        yufp.clone(_this.pageParams, _this.baseFormdata)
    })

    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/pladebtclaimreducbillrel/queryHXBill',
      data: _this.pageParams.billNo,
      callback: function (code, message, response) {
       if(code == 0) {
         if(response.data) {
           yufp.clone(response.data, _this.baseFormdataOld)
         } else {
           _this.daBack()
           _this.$message.error(response.message)
           
         }
       }
      }
    });
  },
  methods: {
    daSave () {
      var _this = this;
      var validate = false;
      _this.$refs.baseForm.validate(function(valid) {
        validate = valid;
      })
      if(!validate) {
        return _this.$message.error('校验未通过')
      }
      // var totalTqlxAmt = _this.baseFormdataOld. + 
      var totalTqlxAmt = 0;
      for(var k in _this.baseFormdataOld) {
        totalTqlxAmt = totalTqlxAmt + _this.baseFormdataOld[k] 
      }
      console.log('totalTqlxAmt', totalTqlxAmt)
      var params = {};
      yufp.clone(_this.baseFormdata, params);
      params.totalTqlxAmt = totalTqlxAmt;
      params.billNo = _this.pageParams.billNo;
      params.pdcraiSerno = _this.pageParams.pdcraiSerno;
      params.pdcrbrSerno = _this.pageParams.pdcrbrSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/pladebtclaimreducbillrel/insertByPlaDebtClaimReducBillRel',
        data: params,
        callback: function(code, message, response){
          if(code == 0) {
            _this.$message('保存成功');
            _this.daBack()
            _this.pageParams.returnFn()
            _this.pageParams.initFun()
          } else {
            _this.$message.error(response.message);
          }
        }
      })
    },
    daBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
