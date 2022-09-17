<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isFormDisabled">
        <yu-panel title="基本信息" padding-top  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <!--<yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" required disabled></yu-xform-item>-->
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2" :disabled="isButtonDisabled">
              <yu-button type="primary" @click="viewContDataBycontNo">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <!--<yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" required disabled></yu-xform-item>-->
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2" :disabled="isButtonDisabled">
              <yu-button type="primary" @click="viewBillDataBybillNo">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" colspan="24" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="交易对手账户" ctype="input" placeholder="交易对手账户" name="toppAccno" rules="required"></yu-xform-item>
            <yu-xform-item label="原交易对手账户" ctype="input" placeholder="原交易对手账户" name="origiToppAccno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="交易对手名称" ctype="input" placeholder="交易对手名称" name="toppName" rules="required"></yu-xform-item>
            <yu-xform-item label="原交易对手名称" ctype="input" placeholder="原交易对手名称" name="origiToppName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="toppBankNo" rules="required" :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
                </yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="get"  :colspan="2">
                  <yu-button type="primary" @click="getAcctsvcrNo" :hidden="isShowBtn" >选择</yu-button>
              </yu-xform-item>
            <yu-xform-item label="原开户行行号" ctype="input" placeholder="原开户行行号" name="origiToppBankno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="toppBankName" rules="required"></yu-xform-item>
            <yu-xform-item label="原开户行名称" ctype="input" placeholder="原开户行名称" name="origiToppBankname" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="交易对手金额" ctype="input" placeholder="交易对手金额" name="toppAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="原交易对手金额" ctype="input" placeholder="原交易对手金额" name="origiToppAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="是否客户修改" ctype="select" placeholder="是否客户修改" name="isOwner" rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="核心流水号" ctype="input" placeholder="核心流水号" name="hxSerno" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" padding-top  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerIdName" disabled></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="save" :hidden="isShowBtn">保存</yu-button>
      <yu-button type="primary" @click="commit" :hidden="isShowBtn">提交</yu-button>
      <yu-button type="primary" @click="cancel" :hidden="isShowBtn">返回</yu-button>
    </yu-form-buttons>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufp-nwf-init>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO');
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
import { validator } from '@/utils/validate';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  mixins: [mixinForm, mixinList],
  components: [yufpNwfInit],
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      isFormDisabled: false,
      isShowBtn: false,
      isButtonDisabled: false,
      File: {},
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
      ]
    };
  },

  mounted () {
    var _this = this;
    let data = {};
    var serno = '';
    var op = '';
    // 待办流程进入
    if (_this.bizPageData) {
      if (_this.bizPageData.instanceInfo) {
        data = _this.bizPageData.instanceInfo;
        serno = data.bizId;
      }
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      serno = data.serno;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      serno = data.serno;
    }
    if (data.op) {
      op = data.op;
      if (op == 'VIEW' || op == 'view') {
        _this.isShowBtn = true;
        _this.isFormDisabled = true;
        _this.isButtonDisabled = true;
      }
    } else if (data.param.op) {
      op = data.param.op;
      if (op == 'VIEW' || op == 'view') {
        _this.isShowBtn = true;
        _this.isFormDisabled = true;
        _this.isButtonDisabled = true;
      }
    }
    // 初始化表单数据
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpchgtrupayacctapp/showdetial',
      data: {serno: serno},
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },

  methods: {
    viewContDataBycontNo () {
      if (this.formdata.contNo == null || this.formdata.contNo == '') {
        this.$xutils.showMsgBox('提示', '合同号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['contNo'] = this.formdata.contNo;
      json['model_group_no'] = 'CMG000015';
      json['viewType'] = 'VIEW';
      json['bizOp'] = 'VIEW';
      json['opType'] = 'view';
      json['nodeFlag'] = '1';
      json['contType'] = '1';
      json['iqpSerno'] = '1';
      json['op'] = 'VIEW';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        json
      );
    },

    viewBillDataBybillNo () {

    },

    // 选择开户行
    getAcctsvcrNo () {
      var _this = this;
      var data = {};
      _this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgAccpSelectApp', 1000, 800, data, params => {
        if (!params.bankNo) {
          this.formdata.toppBankNo = '';
          this.formdata.toppBankName = '';
        }
        this.$refs.refForm.formdata.toppBankNo = params.bankNo;
        this.$refs.refForm.formdata.toppBankName = params.bankName;
      });
    },

    // 保存
    save () {
      var _this = this;
      let jsoPar = _this.formdata;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpchgtrupayacctapp/commonsavechgtrupayacctappinfo',
        data: jsoPar,
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            _this.$xutils.showMsgBox('提示', '保存成功', 350, 150);
            _this.cancel();
          } else {
            _this.$xutils.showMsgBox('提示', '保存失败', 350, 150);
            return;
          }
        }
      });
    },

    // 保存成功后调用发起流程的方法
    commit () {
      var _this = this;
      let jsoPar = _this.formdata;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpchgtrupayacctapp/commonsavechgtrupayacctappinfo',
        data: jsoPar,
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            // _this.$xutils.showMsgBox('提示', '保存成功', 350, 150);
            _this.submit();
          } else {
            _this.$xutils.showMsgBox('提示', '保存失败', 350, 150);
            return;
          }
        }
      });
    },

    submit () {
      let loginUser = this.$xutils.getLoginUserInfo();
      var _this = this;
      var serno = this.formdata.serno;
      var cusId = this.formdata.cusId;
      var cusName = this.formdata.cusName;
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'BG025';
      startdto.bizId = serno;
      startdto.bizUserName = cusName;
      startdto.bizUserId = cusId;
       var model = {};
       model.billNo = _this.formdata.billNo;
       let lastSerno = '';
      // 根据借据号获取出账流水号
      _this.$request({
        async: false,
        url: _this.$backend.cmisBiz + '/api/pvploanapp/selectDataByModel',
        method: 'post',
        data: JSON.stringify({ condition: JSON.stringify(model) })
      }).then((response) => {
       if (response.code == '0') {
           console.log("出账信息----->", response.data.data[0]);
           console.log("出账流水号----->", response.data.data[0].pvpSerno);
           lastSerno = response.data.data[0].pvpSerno;
       }
      });
 
      startdto.param = {
        op: 'VIEW',
        isLS: 'N',
        serno:lastSerno
      };
       // 获取条线
       _this.$request({
        async: false,
        url: _this.$backend.cmisBiz + '/api/accloan/querymodel',
        method: 'post',
        data: JSON.stringify({ condition: JSON.stringify(model) })
      }).then((response) => {
       if (response.code == '0') {
           console.log("条线查询----->", response.data.data[0]);
           console.log("条线----->", response.data.data[0].belgLine);
            if(response.data.data[0].belgLine == '02'){// 零售
              startdto.param = {
                 op: 'VIEW',
                 isLS: 'Y',
                 serno:lastSerno
               };
            }
       }
      })
      console.log('流程参数--->', startdto.param);
        // 村镇流程
      if (loginUser.orgCode.startsWith('80')) {
          startdto.bizType = 'SGH16';// （寿光）
      } else if (loginUser.orgCode.startsWith('81')) {
          startdto.bizType = 'DHH16';// （东海）
      }
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 流程结束的回调
    afterCommitCallBack () {
      this.cancel();
    },

    // 返回
    cancel () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>