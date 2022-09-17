<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formIsDisabled">
        <yu-panel title="补录基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="补录流水号" ctype="input" name="serno" disabled placeholder="补录流水号"></yu-xform-item>
            <yu-xform-item label="购销合同编号" ctype="input"  name="tContNo" disabled placeholder="购销合同编号"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" name="updId" disabled placeholder="最近修改日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="发票信息"  panel-type="simple" is-collapse float>
          <yu-xform-group :column="2">
            <yu-xform-item label="发票类型" ctype="select" name="billType"  placeholder="发票类型" data-code="STD_INVOICE_BILL_TYPE" ></yu-xform-item>
            <yu-xform-item label="票号" ctype="input" name="billNo"  placeholder="票号"  ></yu-xform-item>
            <yu-xform-item label="产品的名称" ctype="input" name="prdName"  placeholder="产品的名称"  ></yu-xform-item>
            <yu-xform-item label="规格型号" ctype="input" name="norms"  placeholder="规格型号"  ></yu-xform-item>
            <yu-xform-item label="数量" ctype="yu-num" name="quant"  placeholder="数量"  :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="单价" ctype="yu-num" name="price"  placeholder="单价"  :min="0.1"></yu-xform-item>
            <yu-xform-item label="金额" ctype="yu-num" name="amt"  placeholder="金额"  :min="0.1"></yu-xform-item>


            <yu-xform-item label="税率" ctype="yu-interest-rate" name="taxRate" sign="%" :multiple="100" :precision="2" placeholder="税率"  ></yu-xform-item>
            <yu-xform-item label="税额" ctype="yu-num" name="taxAmt"  placeholder="税额"  ></yu-xform-item>
            <yu-xform-item label="收款人" ctype="input"  name="payee"  placeholder="收款人" ></yu-xform-item>
            <yu-xform-item label="复核人" ctype="input" name="checkName"   placeholder="复核人" ></yu-xform-item>
            <yu-xform-item label="开票人" ctype="input"  name="openName"  placeholder="开票人"  ></yu-xform-item>
            <yu-xform-item label="开票日期" ctype="datepicker"  name="openDate"  placeholder="开票日期" ></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="备注" ctype="input" name="remark"   placeholder="备注" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="购买方信息"  panel-type="simple" is-collapse>
          <yu-xform-group :column="2">
            <yu-xform-item label="购买方名称" ctype="input" name="buyBrId"  placeholder="购买方名称" ></yu-xform-item>
            <yu-xform-item label="购买方电话" ctype="input"  name="buyPhone"  placeholder="购买方电话"  ></yu-xform-item>
            <yu-xform-item label="购买方开户行" ctype="input"  name="buyBank"  placeholder="购买方开户行" ></yu-xform-item>
            <yu-xform-item label="购买方账号" ctype="input"  name="buyAcc"  placeholder="购买方账号" ></yu-xform-item>
            <yu-xform-item label="购买方纳税人识别号" ctype="input"  name="buyTaxNo"  placeholder="购买方纳税人识别号" ></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="购买方地址" ctype="input" name="buyAddr"   placeholder="购买方地址" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="销售方信息"  panel-type="simple" is-collapse > 
          <yu-xform-group :column="2">
            <yu-xform-item label="销售方名称" ctype="input" name="sellBrId"  placeholder="销售方名称"  ></yu-xform-item>
            <yu-xform-item label="销售电话" ctype="input" name="sellPhone"   placeholder="销售电话" ></yu-xform-item>
            <yu-xform-item label="销售开户行" ctype="input"  name="sellBank"  placeholder="销售开户行"  ></yu-xform-item>
            <yu-xform-item label="销售账号" ctype="input"  name="sellAcc"  placeholder="销售账号" ></yu-xform-item>
            <yu-xform-item label="销售纳税人识别号" ctype="input" name="sellTaxNo"  placeholder="销售纳税人识别号" ></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="销售地址" ctype="input" column="2" name="sellAddr"  placeholder="销售地址" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

      </yu-xform>
      <yu-form-buttons align="center">
        <yu-button v-show="!formIsDisabled" type="primary" @click="tempSave">暂存</yu-button>
        <!--<yu-button v-show="!formIsDisabled" type="primary" @click="save">保存</yu-button>-->
        <yu-button v-show="!formIsDisabled" type="primary" @click="commit">提交</yu-button>
        <yu-button type="primary"  @click="back">返回</yu-button>
      </yu-form-buttons>
    <yufp-nwf-init ref="yufpNwfInit"  @success-click="afterCommitCallBack"></yufp-nwf-init>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>  
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
yufp.lookup.reg('STD_INVOICE_BILL_TYPE');
export default{
  name: 'docAsplTcontForm',
  mixins: [mixinForm],
  data: function () {
    return {
      formIsDisabled: false,
      isButtonHidden: true,
      formdata: {},
      checkValue: true,
      checkMsg: '',
      formType: 'edit'
    };
  },
  created () {
    let _this = this;
    let jsoPar = {};

    if(this.getFactory().contextData.instanceInfo){
      jsoPar = this.getFactory().contextData.instanceInfo.param;
    }else if(_this.$route.meta.params){
      jsoPar = _this.$route.meta.params;
    }
    // 获取购销合同编号
    let serno = jsoPar.bizId;
    let op = jsoPar.op;
    if(op == 'VIEW'){
      this.formIsDisabled = true;
    }
    _this.ininForm(serno);
  },
  mounted () {
    
  },
  methods: {
    // 初始化表单
    ininForm: function (serno) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/invoiceinfo/show/' + serno,
        data: {},
        callback: function (code, message, response) {
          let isInit = response.code;
          if (isInit == '0') {
            _this.$refs.refForm.resetFields();
            yufp.clone(response.data, _this.formdata);
          } else {
            return;
          }
        }
      });
      this.getFactory().setButtonVisiable('commit', false);
      this.getFactory().setButtonVisiable('save', false);
      this.getFactory().setButtonVisiable('tempSave', false);
      this.getFactory().setButtonVisiable('back', false);
    },
    // 保存方法
    save () {
      // 获取数值的方式
      let params = this.formdata;
      let tempParams = {};
      yufp.clone(params, tempParams);
      this.$request({
        method: 'post',
        async: false,
        url: this.$backend.cmisBiz + '/api/invoiceinfo/update',
        data: tempParams
      })
        .then(response => {
          if (response.code == '0') {
            this.$message({message: '保存成功', type: 'info'});
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },

    // 暂存
    tempSave () {
      let params = this.formdata;
      let tempParams = {};
      yufp.clone(params, tempParams);
      this.$request({
        method: 'post',
        url: this.$backend.cmisBiz + '/api/invoiceinfo/update',
        data: tempParams
      })
        .then(response => {
          if (response.code == '0') {
            this.$message({message: '暂存成功', type: 'info'});
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },

    // 提交
    commit () {
      // 调用通用的保存方法
      let saveFlag = false;
      this.$refs.refForm.validate(function(valid) {
        saveFlag = valid;
      });
      if (!saveFlag) {
        return;
      }
      let params = this.formdata;
      let rtnData = {};
      let tempParams = {};
      yufp.clone(params, tempParams);
      tempParams.isAddpReco = '1';
      this.$xutils.request({
        async: false,
        url: this.$backend.cmisBiz + '/api/invoiceinfo/update',
        data: tempParams,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$message({
                message: '发票补录提交成功',
                type: 'success'
            }); // 弹出提示
            yufp.router.removeTab(this.$route.path);
          } else {
             this.$message({
                message: '发票补录提交失败',
                type: 'error'
            });
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 通用的保存方法
    commonSave () {
      let saveFlag = false;
      this.$refs.refForm.validate(function(valid) {
        saveFlag = valid;
      });
      if (!saveFlag) {
        return;
      }
      saveFlag = this.commitSave();
      return saveFlag;
    },

    // 提交保存方法
    commitSave () {
      // 获取数值的方式
      let params = this.formdata;
      let saveFlag = true;
      let rtnData = {};
      let tempParams = {};
      yufp.clone(params, tempParams);
      this.$xutils.request({
        async: false,
        url: this.$backend.cmisBiz + '/api/invoiceinfo/update',
        data: tempParams,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$message({
                message: '发票补录提交成功',
                type: 'success'
            });
          } else {
             this.$message({
                message: '发票补录提交失败',
                type: 'error'
            });
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.getFactory().back();
    },
    back () {
      // this.getFactory().back();
      yufp.router.removeTab(this.$route.path);
      // yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
