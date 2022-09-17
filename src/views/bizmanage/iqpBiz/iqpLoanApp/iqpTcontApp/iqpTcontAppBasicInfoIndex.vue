<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
  </div>
</template>
<script>
import d1Billcard from './iqpTcontAppBasicInfo_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
/**
 * 贸易融资合同申请详情
 */

// 定义初始化标志位，避免初始化方法调用onchange方法清空值
let initFlag = true;

// 定义流程页面标识，用于区分流程进入与申请页面进入
let wfFlag = false;

let nodeFlag;

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      serno: '',
      d1_BillCard: null,
      topOutsystemCode: 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWMYRZ;GJYWBH;GJYWDCCZ;GJYWSQSQT;'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // var drft_type = frameContext.drft_type;
    AfterInit () {
      // this.checkWfPage();
      nodeFlag = this.getFactory().contextData.nodeFlag;
      this.d1_BillCard = this.$refs.d1_BillCard;
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
      if (op == 'view' || op == 'VIEW') {
        this.d1_BillCard.isShowButton = false;
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqploanapp/showtcontdetial',
        data: { serno: serno }
      })
        .then(response => {
          if (response.code == '0') {
            this.d1_BillCard.form.resetFields();
            yufp.clone(response.data, this.d1_BillCard.formdata);
            this.d1_BillCard.setItemValue('loanModal', '1');
            this.d1_BillCard.setItemValue('loanCha', '01');
            let isRenew = this.d1_BillCard.getItemValue('isRenew');
            if (isRenew == '0') {
              this.d1_BillCard.setBillCardItemVisible('origiContNo', false);
              this.d1_BillCard.setBillCardItemRequired('origiContNo', false);
            }
            let curType = this.d1_BillCard.formdata.curType;
            if (curType == 'undefined' || curType == null || curType == '') {
              this.d1_BillCard.formdata.curType = 'CNY';
            }
            // 是否无缝衔接(进口信用证押汇【412290】、国内信用证买方押汇【600002】)
            let prdId = this.d1_BillCard.formdata.prdId;
            if (prdId == '412290' || prdId == '600002') {
              this.d1_BillCard.isSeajntDisabled = false;
            }
            let isSeajnt = this.d1_BillCard.formdata.isSeajnt;
            if (!isSeajnt || isSeajnt == null || isSeajnt == '') {
              this.d1_BillCard.formdata.isSeajnt = '0';
            }
            // 担保方式为抵押是，是否在线抵押显示且必填
            let guarWay = this.d1_BillCard.formdata.guarWay;
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
            this.setisOnlinePld();
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });


      this.initBillCard();

      // 模板工厂主页面数据加载成功事件
      // this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());

      // // 加载工具js
      // this.$xutils.importJsOrderBy(
      //   [
      //     '/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'
      //   ],
      //   0,
      //   null
      // );

      let isRenew = this.d1_BillCard.getItemValue('is_renew');

      if (isRenew == 'N') {
        this.d1_BillCard.setBillCardItemVisible('origi_cont_no', false);
        this.d1_BillCard.setBillCardItemRequired('origi_cont_no', false);
      }

      // 页面录入框下拉框绑定onchange事件
      // this.d1_BillCard.addEditChangeAction(this.isBasicChange);
    },

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

    // 判断是否为流程进入页面
    // checkWfPage () {
    //   if (this.getFactory().contextData.flowData) {
    //     if (this.getFactory().contextData.flowData.instanceInfo) {
    //       wfFlag = true;
    //       this.getFactory().contextData['wfFlag'] = wfFlag;

    //       if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
    //         // 将流程的关联业务主键设置到业务流水号中
    //         this.getFactory().contextData.iqp_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;

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

      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();
      let iqpLoanApp = this.$xutils.toUpperCase(jsoPar, true);
      // 保存操作
      let rtnData = '';
      let rtnFlag = true;
      // 调用ajax请求落地后端接口数据
      this.$request({
        // 同步请求
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqploanapp/update',
        data: JSON.stringify(iqpLoanApp)
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
      this.setisOnlinePld();
    },

    // 暂存
    tempSave () {
      this.saveFn();
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
        url: this.$backend.cmisBiz + '/api/iqploanapp/commonsavetcontappinfo',
        data: JSON.stringify(this.$xutils.toUpperCase(saveData, true)),

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
      if (
        !saveFlag ||
        JSON.stringify(rtnData) == '{}' ||
        JSON.stringify(rtnData) == ''
      ) {
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
      var _this = this;
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'YX003';
      startdto.bizId = _this.d1_BillCard.getItemValue('iqpSerno');
      startdto.bizUserName = _this.d1_BillCard.getBillCardItemValue('cusName');
      startdto.bizUserId = _this.d1_BillCard.getBillCardItemValue('cusId');
      startdto.param = {
        contAmt: this.$refs.d1_BillCard.formdata.contAmt,
        lowRisk: this.d1_BillCard.getItemValue('guarWay'),
        contNo: this.$refs.d1_BillCard.formdata.contNo,
        topOutsystemCode: this.topOutsystemCode,
        imageParams: {
          contid: this.$refs.d1_BillCard.formdata.contNo,
          businessid: _this.d1_BillCard.getItemValue('iqpSerno'),
          docid: _this.d1_BillCard.getItemValue('iqpSerno')
        }
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.back();
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
    // 查看客户信息
    // function viewCus () {
    //   var cusId = d1_BillCard.getItemValue('cus_id');
    //   var cusBaseInfo = findCusInfoFromBackend(cusId);
    //   var params = null;
    //   // 判定对公对私
    //   if (cusBaseInfo && cusBaseInfo != null) {
    //     var cus_catalog = cusBaseInfo.cus_catalog;
    //     if (cus_catalog == '1') { // 对公
    //       routeToPageCusCorp(cusId);
    //     } else if (cus_catalog == '2') { // 对私
    //       routeToPageCusIndiv(cusId);
    //     } else {
    //       YuXP.showMsgBox('提示', '无法确定客户大类！');
    //       return;
    //     }
    //   }
    // }
  }
};
</script>
