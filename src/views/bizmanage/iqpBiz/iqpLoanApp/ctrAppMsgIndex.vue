<template>

<div>
  <d1-billcard  ref="d1_BillCard" v-show="isShowBillCardFlg"></d1-billcard>
  <d1-15-billcard ref="d1_15_BillCard" v-show="isShow15BillCardFlg"></d1-15-billcard>
  <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="isShowButton">
    <yu-button type="primary" @click="tempSave">暂存</yu-button>
    <yu-button type="primary" @click="save">保存</yu-button>
    <yu-button type="primary" @click="commit">提交</yu-button>
    <yu-button type="primary" @click="back">返回</yu-button>
  </yu-form-buttons>
  <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
  <yufpNwfRiskNoFlow ref="yufpNwfRiskNoFlow" ></yufpNwfRiskNoFlow>
</div>

</template>
<script>
import d1Billcard from './ctrAppMsg_d1_BillCard.vue';
import d115Billcard from './ctrAppMsg_d1_15_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import yufpNwfRiskNoFlow from '@/components/widgets/YufpNwfRiskNoFlow';
let loanCha;
export default {
  components: {d1Billcard, d115Billcard, yufpNwfRiskNoFlow},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null, // 当前页面表单
      isShowBillCardFlg: true,
      isShow15BillCardFlg: false,
      isShowTabs: false,
      topOutsystemCode: 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;',
      isShowButton: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      let data = {};
      let serno = '';
      let op = '';
      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        serno = data.bizId;
        op = data.param.op;
      } else if (this.$route.meta.params) {
        data = this.$route.meta.params;
        serno = data.iqpSerno;
        op = data.op;
      } else if (this.getFactory().contextData) {
        data = this.getFactory().contextData;
        serno = data.iqpSerno;
        op = data.op;
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqploanapp/show',
        data: serno
      })
        .then(response => {
          // 一般合同和最高额和同类型处理
          let contType = response.data.contType;
          if (contType == '1') {
            // 数据加载
            this.d1_BillCard = this.$refs.d1_BillCard;
            this.isShowBillCardFlg = true;
            this.isShow15BillCardFlg = false;
          } else if (contType == '2') {
            this.d1_BillCard = this.$refs.d1_15_BillCard;
            this.isShowBillCardFlg = false;
            this.isShow15BillCardFlg = true;
          } else {
            // 默认显示一般合同
          }
          // 根据产品控制页签显隐处理
          this.getFactory().triggerAction(response.data);
          if (op == 'view' || op == 'VIEW') {
            _this.isShowButton = false;
          }
          // 重置表单数据
          this.d1_BillCard.form.resetFields();
          // 给表单数据赋值
          this.$utils.clone(response.data, this.d1_BillCard.formdata);
          // 处理 贷款性质 默认值信息
          loanCha = this.d1_BillCard.formdata.loanCha;
          if (loanCha == 'undefined' || loanCha == null || loanCha == '') {
            this.d1_BillCard.formdata.loanCha = '01';
          }
          // 根据还款方式判断是否展示还款信息
          var repayMode = this.d1_BillCard.formdata.repayMode;
          if (repayMode == 'A040') {
            this.d1_BillCard.isRepayPanelHidden = true;
          } else {
            this.d1_BillCard.isRepayPanelHidden = false;
          }

          let isRenew = this.d1_BillCard.formdata.isRenew;
          if (isRenew == '1') {
            this.d1_BillCard.isShowOrigiContNo = true;
            // document.getElementById('ocHidden').style.display = 'block';
          } else {
            this.d1_BillCard.isShowOrigiContNo = false;
            // document.getElementById('ocHidden').style.display = 'none';
          }

          // 担保方式为抵押是，是否在线抵押显示且必填
          var guarWay = this.d1_BillCard.formdata.guarWay;
          if (guarWay == '10') {
            this.d1_BillCard.isOlPldShow = false;
          }
          if ((guarWay == '60' || guarWay == '40' || guarWay == '21') && (this.d1_BillCard.formdata.lmtAccNo == null || this.d1_BillCard.formdata.lmtAccNo == '')) {
            this.d1_BillCard.isLmtAccNoRequired = false;
            this.d1_BillCard.isReplyNoRequired = false;
          } else {
            this.d1_BillCard.isLmtAccNoRequired = true;
            this.d1_BillCard.isReplyNoRequired = true;
          }
          // 处理借款种类,根据产品判断
          var prdId = this.d1_BillCard.formdata.prdId;
          // 流动资金贷款
          var fluidCapitalString = '012001;012002;012004;012007;012008;012009;012021;012037;022003;022010;022011;022027;022037;022013;013001;013002;013010;412033;012020;012111';
          var fluidCapitalPrdId = fluidCapitalString.split(';');
          fluidCapitalPrdId.forEach(item => {
            if (item == prdId) {
              this.d1_BillCard.formdata.loanType = '01';
              return;
            }
          });
          // 法人按揭贷款
          var mortgagePrdIdString = '012003;012005;012006';
          var mortgagePrdId = mortgagePrdIdString.split(';');
          mortgagePrdId.forEach(item => {
            if (item == prdId) {
              this.d1_BillCard.formdata.loanType = '02';
              return;
            }
          });
          // 经营性物业贷款
          var operatePrdIdString = '010022;022004';
          var operatePrdId = operatePrdIdString.split(';');
          operatePrdId.forEach(item => {
            if (item == prdId) {
              this.d1_BillCard.formdata.loanType = '03';
              return;
            }
          });
          // 固定资产贷款
          var fixedPrdIdString = '012011;012012;012013;010013;010014;012010;012015;012022;012023;013003';
          var fixedPrdId = fixedPrdIdString.split(';');
          fixedPrdId.forEach(item => {
            if (item == prdId) {
              this.d1_BillCard.formdata.loanType = '04';
              return;
            }
          });
          // 并购贷款
          if (prdId == '012222') {
            this.d1_BillCard.formdata.loanType = '05';
          }
          // 个人消费贷款
          var personalSpanPrdIdString = '022005,022006,022017,022018,022019,022023,022025,022028,022029,022030,022032,022033,022035,022036,022038,022039,022041,022042,022095,022096,022097,022098,022099,022090,022001,022002,022020,022021,022024,022031,022040,022051,022052,022053,022054,022055,022056';
          var personalSpanPrdId = personalSpanPrdIdString.split(',');
          personalSpanPrdId.forEach(item => {
            if (item == prdId) {
              this.d1_BillCard.formdata.loanType = '06';
              return;
            }
          });


          // this.d1_BillCard.formdata.loanType = '01';
          // 默认币种为人民币
          let curType = this.d1_BillCard.formdata.curType;
          if (curType == 'undefined' || curType == null || curType == '') {
            this.d1_BillCard.formdata.curType = 'CNY';
          }
          // 根据产品信息控制字段显隐
          let bankRole = this.d1_BillCard.formdata.bankRole;
          this.d1_BillCard.isShowByPrdIdFunc(prdId, bankRole);
          // 存值是否在线抵押
          this.setisOnlinePld();
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });

      // this.d1_BillCard.queryDataByCondition({iqp_serno: this.getFactory().contextData.iqpSerno});
    },
    // 保存
    save () {
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }
      var qq = this.d1_BillCard.getItemValue('qq');
      var wechat = this.d1_BillCard.getItemValue('wechat');
      var email = this.d1_BillCard.getItemValue('email');
      if ((email == null || email == '') && (qq == null || qq == '') && (wechat == null || wechat == '')) {
        this.$xutils.showMsgBox('提示', '微信、QQ、Email三项至少输入一项');
        return;
      }
      this.saveFn();
      this.setisOnlinePld();
    },

    // 保存方法
    saveFn () {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));

      // let rtnData = this.d1_BillCard.tempUpdateBillCardData();
      // if (rtnData && rtnData.code == 'ok') {
      //   this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
      //     // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
      //     this.$xutils.getParentPage2(this, null, 'refreshBillListData');
      //   });
      // }
      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();
      let iqpEntrustLoanApp = this.$xutils.toUpperCase(jsoPar, true);
      // 保存操作
      let rtnData = '';
      let rtnFlag = true;
      // 调用ajax请求落地后端接口数据
      this.$request({
        // 同步请求
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqploanapp/update',
        data: JSON.stringify(iqpEntrustLoanApp)
      })
        .then(response => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
            });
          }
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },

    tempSave () {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();
      let iqpEntrustLoanApp = this.$xutils.toUpperCase(jsoPar, true);
      // 保存操作
      let rtnData = '';
      let rtnFlag = true;
      // 调用ajax请求落地后端接口数据
      this.$request({
        // 同步请求
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqploanapp/update',
        data: JSON.stringify(iqpEntrustLoanApp)
      })
        .then(response => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '暂存成功!', 350, 150, () => {
            });
          }
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
      this.setisOnlinePld();
    },

    // 提交
    commit () {
      // 调用通用的保存方法
      // afterSaveCommit();
      let saveFlag = this.commonSave();

      if (saveFlag) {
        this.$xutils.getParentPage2(this, null, 'refreshBillListData');
        this.afterSaveCommit();
      }
    },

    // 通用的保存方法
    commonSave () {
      let saveFlag = false;
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }
      var qq = this.d1_BillCard.getItemValue('qq');
      var wechat = this.d1_BillCard.getItemValue('wechat');
      var email = this.d1_BillCard.getItemValue('email');
      if ((email == null || email == '') && (qq == null || qq == '') && (wechat == null || wechat == '')) {
        this.$xutils.showMsgBox('提示', '微信、QQ、Email三项至少输入一项');
        return;
      }
      saveFlag = this.commitSave();
      return saveFlag;
    },

    // 提交保存方法
    commitSave () {
      let saveData = this.d1_BillCard.getBillCardValue();
      let saveFlag = true;
      let rtnData = {};

      this.$xutils.request({
        async: false,
        url: this.$backend.cmisBiz + '/api/iqploanapp/update',
        data: JSON.stringify(saveData),
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

      if (rtnData != '1') {
        this.$xutils.showMsgBox('提示', '保存数据异常！'); // 弹出提示
        return false;
      }
      return true;
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      let loginUser = this.$xutils.getLoginUserInfo();
      // 区分总行和村镇（东海，寿光）,村镇不走流程
      var orgCode = loginUser.orgCode;
      // 提交流程
      var startdto = {};
      // 80：寿光 81：东海
      if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
        startdto.preventId = '3D93414D869A4AE28D9239E4AA04FAC2'; // 风险拦截方案 ：普通贷款合同申请校验
        startdto.bizId = this.d1_BillCard.getItemValue('iqpSerno');
        startdto.bizUserId = this.d1_BillCard.getItemValue('cusId');
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizUserName = this.d1_BillCard.getItemValue('cusName');
        startdto.bizType = 'YX002';
        this.$refs.yufpNwfRiskNoFlow.riskFn(startdto);
      } else {
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX002';
        startdto.bizId = this.d1_BillCard.getItemValue('iqpSerno');
        startdto.bizUserName = this.d1_BillCard.getItemValue('cusName');
        startdto.bizUserId = this.d1_BillCard.getItemValue('cusId');
        startdto.param = {
          contAmt: this.$refs.d1_BillCard.formdata.contAmt,
          lowRisk: this.d1_BillCard.getItemValue('guarWay'),
          topOutsystemCode: this.topOutsystemCode,
          imageParams: {
            contid: this.$refs.d1_BillCard.formdata.contNo,
            businessid: this.d1_BillCard.getItemValue('iqpSerno'),
            docid: this.d1_BillCard.getItemValue('iqpSerno')
          },
          contNo: this.$refs.d1_BillCard.formdata.contNo,
          op: 'VIEW'
        };
        this.$refs.yufpNwfInit.wfInit(startdto);
      }
    },

    // 村镇银行无流程提交后后续处理
    submitNotFlow () {
      var _this = this;
      var model = {};
      model.iqpSerno = _this.d1_BillCard.getItemValue('iqpSerno');
      _this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: _this.$backend.cmisBiz + '/api/iqploanapp/submitNoFlow',
        data: JSON.stringify(model),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$xutils.showMsgBox('提示', '提交成功!', 350, 150);
            } else {
              _this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.back();
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    },

    getAccNo () {
      let jsoPar = this.d1_BillCard.formdata;

      var _this = this;
      let loanPayoutAccno = jsoPar.loanPayoutAccno;
      if (loanPayoutAccno == null || loanPayoutAccno == '') {
        _this.$xutils.showMsgBox('提示', '账号不能为空不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { loanPayoutAccno: jsoPar.loanPayoutAccno };
      this.$dialog.open('', 'bizmanage/iqpBiz/iqpEntrustLoanApp/singleAccountSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.d1_BillCard.setItemValue('loanPayoutAccName', params.zhhuzwmc);
        this.d1_BillCard.setItemValue('acctsvcrName', params.kaihjigo);
      });
    },
    // 对公客户查看
    viewCusDataByCusId () {
      if (this.d1_BillCard.formdata.cusId == null || this.d1_BillCard.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.d1_BillCard.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      var path = '';
      var title = '';
      if (this.d1_BillCard.formdata.cusId.startsWith('8')) {
        path = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        title = '对公客户查看';
      } else {
        path = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndivDefend';
        title = '个人客户查看';
      }
      this.$router.addTab({
        name: path,
        key: json.serno + json.opType,
        title: title,
        data: json
      });
    },
    getDebtLevel () {
      this.d1_BillCard.formdata.debtLevel = '中等'
      this.d1_BillCard.formdata.ead = '0.25';
      this.d1_BillCard.formdata.lgd = '0.3';
      
    },
    viewReplyNo () {
      if (this.d1_BillCard.formdata.replyNo == null || this.d1_BillCard.formdata.replyNo == '') {
        this.$xutils.showMsgBox('提示', '批复编号为空!');
        return;
      }
      let params = {};
      params['replySerno'] = this.d1_BillCard.formdata.replyNo;
      var path = 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail';
      this.$router.addTab({
        name: path,
        key: params.serno + params.opType,
        title: '批复基本信息',
        data: params
      });
    },
    // 返回
    back () {
      yufp.router.removeTab(this.$route.path);
    },

    // 查看第三方协议
    viewTdpAgrNo () {
      if (this.d1_BillCard.formdata.tdpAgrNo == null || this.d1_BillCard.formdata.tdpAgrNo == '') {
        this.$xutils.showMsgBox('提示', '协议编号为空!');
        return;
      }
      let jsonParam = {};
      jsonParam.coopAgrNo = this.d1_BillCard.formdata.tdpAgrNo;
      jsonParam.serno = this.d1_BillCard.formdata.tdpAgrNo;
      jsonParam.op = 'details';
      jsonParam.from = 'coopPartnerAgrAcc';
      this.$dialog.open(
        '',
        'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppDetailIndex',
        -1,
        -1,
        jsonParam
      );
    },
    setisOnlinePld () {
      // 存值是否在线抵押、担保起始日期、担保到期日期
      if (this.$route.meta.params) {
        this.$route.meta.params.isOlPld = this.d1_BillCard.formdata.isOlPld;
        this.$route.meta.params.guarStartDate = this.d1_BillCard.formdata.startDate;
        this.$route.meta.params.guarEndDate = this.d1_BillCard.formdata.endDate;
      } else {
        this.getFactory().contextData.isOlPld = this.d1_BillCard.formdata.isOlPld;
        this.getFactory().contextData.guarStartDate = this.d1_BillCard.formdata.startDate;
        this.getFactory().contextData.guarEndDate = this.d1_BillCard.formdata.endDate;
      }
    }
  }
};
</script>
