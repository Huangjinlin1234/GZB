<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formIsDisabled">
        <yu-panel title="购销合同基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled placeholder="客户编号"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input"  name="cusName" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label="购销合同编号" ctype="input" name="tcontNo"  placeholder="购销合同编号" :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="影像流水号" ctype="input" name="tcontImgId" disabled placeholder="影像流水号"></yu-xform-item>
            <yu-xform-item label="购销合同名称" ctype="input" name="tcontCnName"  placeholder="购销合同名称" :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num" name="contAmt"  placeholder="合同金额" :min="0.1" :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="可用信用总金额" ctype="yu-num" name="contHighAvlAmt"   placeholder="可用信用总金额"  :min="0.1" :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd"  placeholder="协议起始日" :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd"  placeholder="协议到期日"  :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>
            <!--<yu-xform-item label="资产池协议编号" ctype="input"  name="contNo" disabled placeholder="资产池协议编号"></yu-xform-item>
            <yu-xform-item label="结算方式" ctype="select" name="settlementMethod"  data-code="STD_ZB_SETTLE_METH" placeholder="结算方式"  :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>-->
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="交易对手信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="交易对手是否本行账户" ctype="select" name="isBankAcct"  data-code="STD_ZB_YES_NO" placeholder="交易对手是否本行账户"  :rules="{ required: true, message: '字段不能为空' }" @change="isBankAcctChange"></yu-xform-item>
            <yu-xform-item label="结算方式" ctype="select" name="settlementMethod"  data-code="STD_ZB_SETTLE_METH" placeholder="结算方式"  :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>

            <yu-xform-item label="开户行行号" ctype="input"  name="opanOrgNo"  placeholder="开户行行号"  :rules="{ required: true, message: '字段不能为空' }" :hidden="isHidden" :colspan="10"> 
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get"  :colspan="2" :hidden="isHidden">
              <yu-button type="primary" @click="getAcctsvcrNo">选择</yu-button>
            </yu-xform-item>
            <yu-xform-item label="开户行名称" ctype="input"  name="opanOrgName"  placeholder="开户行名称"  :rules="{ required: true, message: '字段不能为空' }" :hidden="isHidden" ></yu-xform-item>
            <yu-xform-item label="交易对手账号" ctype="input"  name="toppAcctNo"  placeholder="交易对手账号" :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="交易对手名称" ctype="input" name="toppName"   placeholder="交易对手名称" :rules="{ required: true, message: '字段不能为空' }"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="购销信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
             <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" rules="required" placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn"  :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" :colspan="12"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="供货方" ctype="input" name="supplierName" placeholder="供货方" ></yu-xform-item>
            <yu-xform-item label="消费方" ctype="input" name="consumeName"  placeholder="消费方" ></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input"  name="prdName"  placeholder="产品名称" ></yu-xform-item>
            <yu-xform-item label="产品数量" ctype="yu-num" name="prdQnt"  placeholder="产品数量" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="产品单价" ctype="yu-num" name="prdPrice" placeholder="产品单价" :min="0.1"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-form-buttons align="center">
        <yu-button v-show="!formIsDisabled" type="primary" @click="tempSave">暂存</yu-button>
        <yu-button v-show="!formIsDisabled" type="primary" @click="save">保存</yu-button>
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
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_IR_ADJUST_TYPE,STD_LPR_RATE_INTVAL,STD_ZB_SETTLE_METH');
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
      formType: 'edit',
      isHidden: false,
      topOutsystemCode: 'XXD_ZCC;XXD_ZCC02'
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
    // 获取购销合同影像流水编号
    let tcontImgId = jsoPar.bizId;
    let op = jsoPar.op;
    if(op == 'VIEW'){
      this.formIsDisabled = true;
    }
    _this.ininForm(tcontImgId);
  },
  mounted () {
    
  },
  methods: {
     /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
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
    },
    // 初始化表单
    ininForm: function (tcontImgId) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docaspltcont/selectByTcontSerno',
        data: {tcontImgId: tcontImgId},
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
      let saveFlag = false;
      this.$refs.refForm.validate(function(valid) {
        saveFlag = valid;
      });
      if (!saveFlag) {
        return;
      }
      yufp.clone(params, tempParams);
      this.$request({
        method: 'post',
        url: this.$backend.cmisBiz + '/api/docaspltcont/update',
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
        url: this.$backend.cmisBiz + '/api/docaspltcont/update',
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
      let saveFlag = this.commonSave();
      if (saveFlag) {
        this.afterSaveCommit();
      }
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
      // let params2 = this.d1_B_B_BillCard.getBillCardValue();
      let saveFlag = true;
      let rtnData = {};
      // 将d1_A_BillCard和d1_B_B_BillCard两个表单的数据合为一个JSON
      let tempParams = {};
      yufp.clone(params, tempParams);
      this.$xutils.request({
        async: false,
        url: this.$backend.cmisBiz + '/api/docaspltcont/update',
        data: tempParams,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            saveFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (!saveFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == '') {
        return false;
      }

      if (rtnData.rtnCode != '0000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
        return false;
      }

      return true;
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      let loginUser = this.$xutils.getLoginUserInfo();
      var _this = this;
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'ZC003';
      startdto.bizId = _this.formdata.tcontImgId;
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {
        contAmt: _this.formdata.contAmt,
        topOutsystemCode: _this.topOutsystemCode,
        bizId: _this.formdata.tcontImgId,
        op: 'VIEW',
        imageParams: {
          contid: _this.formdata.tcontNo,
          businessid: _this.formdata.tcontImgId,
          docid: _this.formdata.tcontImgId
        },
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.getFactory().back();
    },
    back () {
      // this.getFactory().back();
      yufp.router.removeTab(this.$route.path);
      // yufp.router.removeTab(this.$route.path);
    },
    isBankAcctChange () {
      var _this = this;
      var isBankAcct = _this.formdata.isBankAcct;
      if (isBankAcct == '1') {
        _this.isHidden = true;
      } else {
        _this.isHidden = false;
      }
    },
    getAcctsvcrNo () {
      var _this = this;
      var jsoPar = _this.formdata;
      // if (!jsoPar.acctsvcrNo) {
      //   _this.$message({
      //     message: '请先输入开户行行号！',
      //     type: 'warning'
      //   });
      //   return;
      // }
      var data = { aorgNo: jsoPar.acctsvcrNo };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgAccpSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.formdata.opanOrgNo = params.bankNo;
        this.formdata.opanOrgName = params.bankName;
      });
    }
  }
};
</script>
