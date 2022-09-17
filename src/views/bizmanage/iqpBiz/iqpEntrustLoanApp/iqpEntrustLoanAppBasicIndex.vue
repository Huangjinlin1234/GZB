<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
    <yufpNwfRiskNoFlow ref="yufpNwfRiskNoFlow" ></yufpNwfRiskNoFlow>
  </div>
</template>
<script>
import d1Billcard from './iqpEntrustLoanAppBasic_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import yufpNwfRiskNoFlow from '@/components/widgets/YufpNwfRiskNoFlow';
// 贴现申请修改页面
// 定义初始化标志位，避免初始化方法调用onchange方法清空值
let initFlag = true;

let nodeFlag, wfFlag;

let selfPar = {};

export default {
  components: { d1Billcard, yufpNwfRiskNoFlow},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      topOutsystemCode: 'WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ;'
    };
  },
  mounted () {
    nodeFlag = this.getFactory().contextData.nodeFlag;
    this.AfterInit();
  },
  methods: {
    // 定义流程页面标识，用于区分流程进入与申请页面进入
    AfterInit () {
      // this.checkWfPage();
      // this.initWfStatus();
      this.d1_BillCard = this.$refs.d1_BillCard;
      // this.d1_BillCard.queryDataByCondition({ serno: this.getFactory().contextData.serno });
      // 调用ajax请求落地后端接口数据
      var _this = this;
      var data = '';
      var serno = '';
      var op = '';

      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        serno = data.bizId;
        op = data.op;
      } else if (this.$route.meta.params) {
        data = this.$route.meta.params;
        serno = data.biz_serno;
        op = data.op;
      } else if (this.getFactory().contextData) {
        data = this.getFactory().contextData;
        serno = data.biz_serno;
        op = data.op;
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqpentrustloanapp/showdetial',
        data: { serno: serno }
      })
        .then(response => {
          if (response.code == '200') {
            this.d1_BillCard.form.resetFields();
            this.$utils.clone(response.data, this.d1_BillCard.formdata);

            // 设置币种默认人民币
            let curType = this.d1_BillCard.formdata.curType;
            if (curType == 'undefined' || curType == null || curType == '') {
              this.d1_BillCard.formdata.curType = 'CNY';
            }

            // 担保方式为抵押时，展示是否在线抵押
            let guarMode = this.d1_BillCard.getItemValue('guarMode');
            if (guarMode != '10') {
              this.d1_BillCard.setBillCardItemVisible('isOlPld', false);
            }
            let isRenew = this.d1_BillCard.getItemValue('isRenew');
            if (isRenew == '1') {
              this.d1_BillCard.isOrigiContNoHidden = false;
            }
          }
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
      // this.$xutils.request({
      //   // 同步请求
      //   async: false,
      //   url: this.$backend.cmisBiz + "/api/iqpentrustloanapp/showdetial",
      //   data: { serno: this.getFactory().contextData.serno },
      //   success: (response, status, xhr) => {
      //     this.$utils.clone(response.data, this.d1_BillCard.formdata);
      //   },
      //   error: (result, b) => {
      //     this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
      //   }
      // });
      // 模板工厂主页面数据加载成功事件
      // this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
      // selfPar = this.getFactory().contextData;
      this.initBillCard();

      // this.$utils.clone(selfPar, this.d1_BillCard.formdata);
      // // 加载工具js
      // this.$xutils.importJsOrderBy(
      //   ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
      //   0,
      //   null
      // );

      // 页面录入框下拉框绑定onchange事件
      this.d1_BillCard.addEditChangeAction(this.isBasicChange);
    },

    // // 判断是否流程进入页面
    // initWfStatus () {
    //   if (this.getFactory().contextData.flowData) {
    //     if (this.getFactory().contextData.flowData.instanceInfo) {
    //       var wfFlag = true;
    //       this.getFactory().contextData.wfFlag = wfFlag;

    //       if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
    //         // 将流程的关联业务主键设置到业务流水号中
    //         this.getFactory().contextData.iqp_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;

    //         // 隐藏按钮
    //         this.getFactory().setButtonVisiable('commit', false);

    //         this.getFactory().setButtonVisiable('save', false);
    //         this.getFactory().setButtonVisiable('tempSave', false);
    //         this.getFactory().setButtonVisiable('back', false);
    //       }
    //     }
    //   }
    // },

    // onchang事件，若“是否续签合同 = 是”,则展示  “原合同编号”字段，否则隐藏不展示
    isBasicChange (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'is_renew' && newVal == 'N') {
        thisCard.setBillCardItemVisible('origi_cont_no', false);
        thisCard.setBillCardItemRequired('origi_cont_no', false);

        // 隐藏后清空原有数据值
        thisCard.setBillCardItemClearValue('origi_cont_no');
      } else if (itemKey == 'is_renew' && newVal == 'Y') {
        thisCard.setBillCardItemVisible('origi_cont_no', true);
        thisCard.setBillCardItemRequired('origi_cont_no', true);
      }
    },

    // // 判断是否为流程进入页面
    // checkWfPage () {
    //   if (this.getFactory().contextData.flowData) {
    //     if (this.getFactory().contextData.flowData.instanceInfo) {
    //       wfFlag = true;
    //       this.getFactory().contextData['wfFlag'] = wfFlag;

    //       if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
    //         // 将流程的关联业务主键设置到业务流水号中
    //         this.getFactory().contextData.serno = this.getFactory().contextData.flowData.instanceInfo.bizId;

    //         this.getFactory().contextData.biz_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;

    //         // 隐藏按钮
    //         this.getFactory().setButtonVisiable('commit', false);

    //         this.getFactory().setButtonVisiable('save', false);
    //         this.getFactory().setButtonVisiable('tempSave', false);
    //         this.getFactory().setButtonVisiable('back', false);
    //       }
    //     }
    //   }
    // },

    // 初始化表单
    initBillCard () {
      // 判断页面是否为查看页面或流程进入的页面
      if (nodeFlag == '3') {
      } else {
        if (this.getFactory().contextData.op == 'VIEW' || wfFlag) {
          this.d1_BillCard.setBillCardItemRequired('*', false);
          this.d1_BillCard.setBillCardItemEditable('*', false);
        }
      }

      // initIsHasRefused();
      // initLmtAppType(d1_BillCard.getBillCardItemValue('lmt_app_type'));
      // initIsAdjTerm();
      // // 页面录入框下拉框绑定onchange事件
      // this.d1_BillCard.addEditChangeAction(this.isBasicChange);
    },

    // 保存
    save () {
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      this.saveFn();
    },

    // 保存方法
    saveFn () {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));

      /*  var rtnData = d1_BillCard.tempUpdateBillCardData();
          if (rtnData && rtnData.code == 'ok') {
            YuXP.showMsgBox('提示', '保存成功!', 350, 150, function () {
              // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
              window.parent.parent.refreshBillListData();
            });
          }*/
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

        url: this.$backend.cmisBiz + '/api/iqpentrustloanapp/commonsaveiqpentrustappinfo',
        data: JSON.stringify(iqpEntrustLoanApp)

        // success: (response, status, xhr) => {
        //   if (response.code == "0") {
        //     rtnData = response.data;
        //     // rtnData = response.data;
        //     this.$xutils.showMsgBox("提示", "保存成功!", 350, 150, () => {
        //       // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
        //       this.$xutils.getParentPage2(this, null, "refreshBillListData");
        //     });
        //   } else {
        //     rtnFlag = false;
        //     this.$xutils.showMsgBox("提示", response.message);
        //   }
        // },

        // error: (result, b) => {
        //   this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
        // }
      })
        .then(response => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
              // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
              this.getFactory().back();
            });
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
      this.setisOnlinePld();
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
        this.d1_BillCard.setItemValue('loanPayoutAcctName', params.zhhuzwmc);
        this.d1_BillCard.setItemValue('acctsvcrName', params.kaihjigo);
      });
    },

    // 暂存
    tempSave () {
      // 暂存操作不做任何校验
      let userInfo = this.$xutils.getLoginUserInfo();

      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      let rtnData = this.d1_BillCard.tempUpdateBillCardData();

      if (rtnData && rtnData.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
          // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
          this.$xutils.getParentPage2(this, null, 'refreshBillListData');
        });
      }
      this.setisOnlinePld();
    },

    // 提交
    commit () {
      // 调用通用的保存方法
      // 调用通用的保存方法
      let validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      this.commitSave();
    },

    // 通用的保存方法
    commonSave () {
      let saveFlag = false;
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
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
        url: this.$backend.cmisBiz + '/api/iqpentrustloanapp/commonsaveiqpentrustappinfo',
        data: JSON.stringify(this.$xutils.toUpperCase(saveData, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
            this.setisOnlinePld();
            this.afterSaveCommit();
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

      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
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
        startdto.preventId = '98668055AEA441AAB4F2C3E5BED4E300'; // 风险拦截方案 ：委托贷款合同申请校验
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX008';
        startdto.bizId = this.d1_BillCard.getItemValue('serno');
        startdto.bizUserName = this.d1_BillCard.getItemValue('cusName');
        startdto.bizUserId = this.d1_BillCard.getItemValue('cusId');
        this.$refs.yufpNwfRiskNoFlow.riskFn(startdto);
      } else {
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX008';
        startdto.bizId = this.d1_BillCard.getItemValue('serno');
        startdto.bizUserName = this.d1_BillCard.getItemValue('cusName');
        startdto.bizUserId = this.d1_BillCard.getItemValue('cusId');
        startdto.param = {
          contAmt: this.$refs.d1_BillCard.formdata.contAmt,
          lowRisk: this.d1_BillCard.getItemValue('guarMode'),
          contNo: this.$refs.d1_BillCard.formdata.contNo,
          topOutsystemCode: this.topOutsystemCode,
          imageParams: {
            contid: this.$refs.d1_BillCard.formdata.contNo,
            businessid: this.d1_BillCard.getItemValue('serno'),
            docid: this.d1_BillCard.getItemValue('serno')
          }
        };
        this.$refs.yufpNwfInit.wfInit(startdto);
      }
    },

    // 村镇银行无流程提交后后续处理
    submitNotFlow () {
      var _this = this;
      var model = {};
      model.serno = _this.d1_BillCard.getItemValue('serno');
      _this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: _this.$backend.cmisBiz + '/api/iqpentrustloanapp/iqpEntrustLoanSubmitNoFlow',
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
      // 刷新列表页面
      // this.$xutils.getParentPage2(this, null, "refreshBillListData");
      this.back();
    },

    // 查看客户信息
    viewCus () {
      let cusId = this.d1_BillCard.getItemValue('cus_id');
      let cusBaseInfo;
      // = findCusInfoFromBackend(cusId);
      let params = null;

      // 判定对公对私
      if (cusBaseInfo && cusBaseInfo != null) {
        let cus_catalog = cusBaseInfo.cus_catalog;

        if (cus_catalog == '1') {
          // 对公
          // routeToPageCusCorp(cusId);
        } else if (cus_catalog == '2') {
          // 对私
          // routeToPageCusIndiv(cusId);
        } else {
          this.$xutils.showMsgBox('提示', '无法确定客户大类！');
          return;
        }
      }
    },
    // 返回
    back () {
      yufp.router.removeTab(this.$route.path);
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
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },

    viewReplyNo () {
      if (this.d1_BillCard.formdata.replyNo == null || this.d1_BillCard.formdata.replyNo == '') {
        this.$xutils.showMsgBox('提示', '批复编号为空!');
        return;
      }
      let params = {};
      params['replySerno'] = this.d1_BillCard.formdata.replyNo;
      this.$dialog.open(
        '',
        'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
        -1,
        -1,
        params
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
