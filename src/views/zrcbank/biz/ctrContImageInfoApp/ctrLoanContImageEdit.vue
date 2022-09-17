<template>
  <div>
    <d1-billcard  ref="d1_BillCard" v-if="isShowCtrLoanCont"></d1-billcard>
    <d2-billcard  ref="d2_BillCard" v-if="isShowCtrHighAgrAmtCont"></d2-billcard>
    <d3-billcard  ref="d3_BillCard" v-if="isShowCtrDiscCont"></d3-billcard>
    <d4-billcard  ref="d4_BillCard" v-if="isShowCtrTCont"></d4-billcard>
    <!--<d5-billcard  ref="d5_BillCard" v-show="isShowCtrForftinCont"></d5-billcard>-->
    <d6-billcard  ref="d6_BillCard" v-if="isShowCtrTfLocCont"></d6-billcard>
    <d7-billcard  ref="d7_BillCard" v-if="isShowCtrAccpCont"></d7-billcard>
    <d8-billcard  ref="d8_BillCard" v-if="isShowCtrCvrgCont"></d8-billcard>
    <d9-billcard  ref="d9_BillCard" v-if="isShowCtrEntrustLoanCont"></d9-billcard>
    <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
    <yu-form-buttons align="center" v-if="isShowButton">
      <yu-button @click="submitFn" type="primary">提交</yu-button>
      <yu-button @click="cancelFn" type="primary">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
// import d1Billcard from '@/views/ctrmanage/ctrLoanCont/ctrLoanContDetail_d1_BillCard.vue';
// import d115Billcard from '@/views/ctrmanage/ctrLoanCont/ctrLoanContDetail_d1_15_BillCard.vue';
import d1Billcard from '@/views/ctrmanage/ctrLoanCont/ctrLoanContDetailIndex.vue';
import d2Billcard from '@/views/zrcbank/biz/ctrHighAmtAgrCont/ctrHighAmtContInfo.vue';
import d3Billcard from '@/views/ctrmanage/ctrDiscCont/ctrDiscContBasicIndex.vue';
import d4Billcard from '@/views/zrcbank/biz/ctrLoanCont/ctrTCont/ctrTContInfo.vue';
// import d5Billcard from '@/views/zrcbank/biz/ctrLoanCont/ctrForftinCont/ctrForftinContInfo.vue';
import d6Billcard from '@/views/ctrmanage/ctrTfLocCont/ctrTfLocContBasicIndex.vue';
import d7Billcard from '@/views/ctrmanage/ctrAccpCont/ctrAccpContBasicIndex.vue';
import d8Billcard from '@/views/ctrmanage/ctrCvrgCont/ctrCvrgContBasicIndex.vue';
import d9Billcard from '@/views/ctrmanage/ctrEntrustLoanCont/ctrEntrustLoanContLBasicIndex.vue';
// import tempetfactorypreviewIndex from '@/views/cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_RADJ_TYP,STD_ZB_LPR_LIMIT,STD_ZB_EI_MODE,STD_ZB_DRAW_TYPE,STD_ZB_DZZC_ZFFS,STD_ZB_ASSURE_MEANS,STD_ZB_CUR_TYP,STD_BUSI_TYPE');
export default {
  // components: { tempetfactorypreviewIndex, cfgAssistantTip, d1Billcard, d2Billcard, d3Billcard, d4Billcard, d5Billcard, d6Billcard, d7Billcard, d8Billcard, d9Billcard},
  components: { d1Billcard, d2Billcard, d3Billcard, d4Billcard, d6Billcard, d7Billcard, d8Billcard, d9Billcard},
  data: function () {
    return {
      activeName: 'first',
      expandCollapseName: ['base'],
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
      familyFormRules: [
        {
          validator: yufp.validator.number
        }
      ],
      numberRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
      phoneRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'phone', message: '请输入正确的号码', trigger: 'blur' }],
      emailRules: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
      baseFormdata: {},
      d1_BillCard: null, // 当前页面表单
      familyFormdata: {},
      otherFormdata: {},
      drawData: [],
      repayData: [],
      dialogFormVisibleAdd: false,
      disabledflg: true,
      hiddenFlg: true,
      pageParams: {},
      loanDirectiondata: {},
      prdCode: '',
      isShow: false,
      topOutsystemCode: '',
      isShowCtrHighAgrAmtCont: false,
      isShowCtrLoanCont: false,
      isShowCtrDiscCont: false,
      isShowCtrTCont: false,
      isShowCtrForftinCont: false,
      isShowCtrTfLocCont: false,
      isShowCtrAccpCont: false,
      isShowCtrCvrgCont: false,
      isShowCtrEntrustLoanCont: false,
      data: {},
      isShowButton: true,
      bizType: ''
    };
  },
  created () {
    var _this = this;
    // 隐藏模板工厂自带的按钮
    _this.getFactory().setButtonVisiable('commit', false);
    _this.getFactory().setButtonVisiable('save', false);
    _this.getFactory().setButtonVisiable('tempSave', false);
    _this.getFactory().setButtonVisiable('back', false);
    var bizType = '';
    var op = '';
    var data = {};
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      let contNo = data.param.contNo;
      // 提示临时库位号
      let nodeId = _this.getFactory().contextData.instanceInfo.nodeId;
      if (nodeId == '243_6' || nodeId == '243_7') {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/centralfileinfo/selectByModel',
          data: { condition: JSON.stringify({traceId: contNo})},
          callback: function (code, message, response) {
            if (response.data != null && response.data.length > 0) {
              let str = '';
              response.data.forEach(function (item) {
                if (str == '') {
                  str = item.tempLocationNo;
                } else {
                  str = str + ',' + item.tempLocationNo;
                }
              });
              if (str != '') {
                _this.$xutils.showMsgBox('提示', '合同影像资料已经存在临时库位中,临时库位号为:' + str, 350, 150);
              }
            }
          }});
      }
      _this.isShowButton = false;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/selectimagectrloan',
        data: {condition: JSON.stringify({contNo: contNo})},
        callback: function (code, message, response) {
          if (response.code == '0') {
            let responseData = response.data[0];
            bizType = responseData.bizType;
            op = data.param.op;
          }
        }
      });
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      bizType = data.bizType;
      op = data.op;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      bizType = data.bizType;
      op = data.op;
    }
    if (op == 'VIEW' || op == 'view') {
      _this.isShowButton = false;
    } else {
      _this.isShowButton = true;
    }
    _this.bizType = bizType;
    yufp.clone(data, _this.data);
    if (bizType == '01') { // 最高额
      _this.topOutsystemCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
      _this.isShowCtrHighAgrAmtCont = true;
    } else if (bizType == '02') { // 普贷
      _this.topOutsystemCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
      _this.isShowCtrLoanCont = true;
    } else if (bizType == '03') { // 贴现
      _this.topOutsystemCode = 'DGYX;XDTXYWYX;';
      _this.isShowCtrDiscCont = true;
    } else if (bizType == '04') { // 贸融
      _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWMYRZ;GJYWBH;GJYWDCCZ;GJYWSQSQT;';
      _this.isShowCtrTCont = true;
    } else if (bizType == '06') { // 开证
      _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWDCCZ;GJYWSQSQT;';
      _this.isShowCtrTfLocCont = true;
    } else if (bizType == '07') { // 银承
      _this.topOutsystemCode = 'CDHPDY;CDHPZY;';
      _this.isShowCtrAccpCont = true;
    } else if (bizType == '08') { // 保函
      _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWBH;GJYWDCCZ;GJYWSQSQT;';
      _this.isShowCtrCvrgCont = true;
    } else if (bizType == '09') { // 委托
      _this.topOutsystemCode = 'WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ;';
      _this.isShowCtrEntrustLoanCont = true;
    }
    // _this.initForm(serno, bizType);
  },

  mounted () {
    this.getFactory().triggerAction(this.data);
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

    submitFn () {
      var _this = this;
      var contNo = _this.data.contNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrcontimageauditapp/selectByContNo',
        data: contNo,
        callback: function (code, message, response) {
          if (response.code == '0') {
            let responseData = response.data;
            _this.commit(responseData);
          }
        }
      });
    },

    // 提交
    commit (responseData) {
      var _this = this;
      debugger;
      let loginUser = _this.$xutils.getLoginUserInfo();
      var instuCde = loginUser.instu.code;
      debugger;
      var orgCode = loginUser.orgCode;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = responseData.managerBrId;
      startdto.userId = responseData.managerId;
      if (responseData.contType == '01') { // 如果是一般贴现协议，则走另一个流程
        startdto.bizType = 'YX014';
      } else {
        startdto.bizType = 'YX010';
      }
      if (orgCode.startsWith('80')) {
        startdto.bizType = 'SGD01';
      }
      if (orgCode.startsWith('81')) {
        startdto.bizType = 'DHD01';
      }
      startdto.bizId = responseData.serno;
      startdto.bizUserName = responseData.cusName;
      startdto.bizUserId = responseData.cusId;
      startdto.param = {
        approveStatus: responseData.approveStatus,
        contAmt: responseData.contAmt,
        topOutsystemCode: _this.topOutsystemCode,
        imageParams: {
          docid: responseData.serno,
          contid: _this.data.contNo,
          businessid: responseData.serno
        },
        bizType: _this.data.bizType,
        contNo: _this.data.contNo,
        op: 'VIEW',
        contSerno: _this.data.serno,
        contType: _this.data.contType,
        replyNo: _this.data.replyNo,
        orgType: loginUser.org.orgType
      };
      // startdto.bizParam4 = model.pvpSerno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },

    // 表单校验
    checkForm () {
      // 1.校验必填项
      let validForm = false;
      this.$refs.loanDirection.validate(valid => { validForm = valid });
      if (!validForm) {
        return false;
      }
      // 其他的校验
      /* if(){
          return false;
       }*/
      return true;
    },

    show () {
      this.isShow = true;
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }

  }
};
</script>
