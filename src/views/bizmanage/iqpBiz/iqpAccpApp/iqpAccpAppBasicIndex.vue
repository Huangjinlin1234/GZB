<template>
  <div>
    <div>
      <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
      </div>
    </div>
    <div>
        <yufp-nwf-init ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufp-nwf-init>
       <yufpNwfRiskNoFlow ref="yufpNwfRiskNoFlow" ></yufpNwfRiskNoFlow>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './iqpAccpAppBasic_d1_A_BillCard.vue';
// import d1BBBillcard from './iqpAccpAppBasic_d1_B_B_BillCard.vue';
// import d1BABilllist from './iqpAccpAppBasic_d1_B_A_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import yufpNwfRiskNoFlow from '@/components/widgets/YufpNwfRiskNoFlow';
// 银承申请修改页面
// 定义初始化标志位，避免初始化方法调用onchange方法清空值
let initFlag = true;
// 定义流程页面标识，用于区分流程进入与申请页面进入
let wfFlag = false;
let nodeFlag, contType;
export default {
  // components: { d1ABillcard, d1BBBillcard, d1BABilllist },
  components: { d1ABillcard, yufpNwfRiskNoFlow},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      ocnHidden: true,
      dab: true,
      d1_A_BillCard: null,
      // d1_B_B_BillCard: null,
      // d1_B_A_BillList: null,
      topOutsystemCode: 'CDHPDY;CDHPZY;'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      var data = '';
      var serno = '';
      var op = '';
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
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
        this.d1_A_BillCard.isShowButton = false;
      }
      nodeFlag = this.getFactory().contextData.nodeFlag;
      // 合同类型 2最高额合同1一般合同
      contType = this.getFactory().contextData.contType;

      // this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
      // this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;
      // 合同类型为一般合同时展示保证金信息
      // if (contType == '2') {
      //   _this.dab = false;
      //   this.d1_A_BillCard.isPanelHidden = true;
      // }
      // 原合同编号是否显示，当是否续签为"是"时显示
      var isRenew = this.getFactory().contextData.isRenew;
      if (isRenew != '1') {
        this.ocnHidden = false;
      }

      // 最高额合同
      if (contType == '2') {
        this.d1_A_BillCard.isBail = false;
        this.d1_A_BillCard.isPanelHidden = true;
        this.d1_A_BillCard.contTypeSign = false;
        this.d1_A_BillCard.isEDrftShow = false;
      }

      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqpaccpapp/showdetial',
        data: { serno: serno }
      })
        .then(response => {
          if (response.code == '0') {
            yufp.clone(response.data, this.d1_A_BillCard.formdata);
            // yufp.clone(response.data, this.d1_B_B_BillCard.formdata);
            this.d1_A_BillCard.setItemValue('signissueType', '1');
            this.d1_A_BillCard.setItemValue('curType', 'CNY');
            this.d1_A_BillCard.setItemValue('aorgType', '3');
            let guarMode = this.d1_A_BillCard.getItemValue('guarMode');
            if (guarMode != '10') {
              this.d1_A_BillCard.setBillCardItemVisible('isOlPld', false);
            }
            if ((guarMode == '60' || guarMode == '40' || guarMode == '21') && (this.d1_A_BillCard.formdata.lmtAccNo == null || this.d1_A_BillCard.formdata.lmtAccNo == '')) {
              this.d1_A_BillCard.isLmtAccNoRequired = false;
              this.d1_A_BillCard.isReplyNoRequired = false;
            } else {
              this.d1_A_BillCard.isLmtAccNoRequired = true;
              this.d1_A_BillCard.isReplyNoRequired = true;
            }

            // 担保方式为全额保证金时，保证金比列默认100%，保证金金额即合同金额
            let contAmt = this.d1_A_BillCard.getItemValue('contAmt');
            if (guarMode == '40') {
              this.d1_A_BillCard.setBillCardItemValue('bailPerc', '1');
              this.d1_A_BillCard.setBillCardItemEditable('bailPerc', false);
              this.d1_A_BillCard.setBillCardItemValue('bailAmt', contAmt);
            }


            // 是否续签合同选择是时才显示原合同编号
            let isRenew = this.d1_A_BillCard.getItemValue('isRenew');

            if (isRenew == '0') {
              this.d1_A_BillCard.setBillCardItemVisible('origiContNo', false);
              this.d1_A_BillCard.setBillCardItemRequired('origiContNo', false);

              // 隐藏后清空原有数据值
              this.d1_A_BillCard.setBillCardItemClearValue('origiContNo');
            }
            // 模板工厂主页面数据加载成功事件
            this.getFactory().triggerAction(response.data);

            // this.getFactory().triggerAction(this.d1_B_B_BillCard.getBillCardValue());
          }
          // 存值是否在线抵押
          this.setisOnlinePld();
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });

      this.initBillCard();
    },

    // // onchang事件，若“是否续签合同 = 是”,则展示  “原合同编号”字段，否则隐藏不展示
    isBasicChange (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'is_renew' && newVal == '0') {
        thisCard.setBillCardItemVisible('origi_cont_no', false);
        thisCard.setBillCardItemRequired('origi_cont_no', false);

        // 隐藏后清空原有数据值
        thisCard.setBillCardItemClearValue('origi_cont_no');
      } else if (itemKey == 'is_renew' && newVal == '1') {
        thisCard.setBillCardItemVisible('origi_cont_no', true);
        thisCard.setBillCardItemRequired('origi_cont_no', true);
      }
    },

    // 初始化表单
    initBillCard () {
      // 判断页面是否为查看页面或流程进入的页面
      if (nodeFlag == '3') {
      } else {
        if (this.getFactory().contextData.op == 'VIEW' || wfFlag) {
          this.d1_A_BillCard.setBillCardItemRequired('*', false);
          this.d1_A_BillCard.setBillCardItemEditable('*', false);
          // this.d1_B_B_BillCard.setBillCardItemRequired('*', false);
          // this.d1_B_B_BillCard.setBillCardItemEditable('*', false);
          // this.d1_B_A_BillList.setBillListButtonVisable('新增', false);
          // this.d1_B_A_BillList.setBillListButtonVisable('删除', false);
        }
      }

      // 页面录入框下拉框绑定onchange事件
      // this.d1_A_BillCard.addEditChangeAction(this.isBasicChange);
    },

    // 返回
    back () {
      yufp.router.removeTab(this.$route.path);
    },

    // 保存
    save () {
      let validateFlagA = this.d1_A_BillCard.validateBillCardValue();

      if (!validateFlagA) {
        return;
      }

      // let validateFlagB = this.d1_B_B_BillCard.validateBillCardValue();

      // if (!validateFlagB) {
      //   return;
      // }
      this.saveFn();
      // 存值是否在线抵押
      this.setisOnlinePld();
    },

    // 保存方法
    saveFn () {
      // 获取数值的方式
      let params = this.d1_A_BillCard.getBillCardValue();
      let tempParams = {};
      yufp.clone(params, tempParams);
      this.$request({
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqpaccpapp/commonsaveiqpaccpappinfo',
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
      // 暂存操作不做任何校验
      // 获取数值的方式
      let params = this.d1_A_BillCard.getBillCardValue();
      // let params2 = this.d1_B_B_BillCard.getBillCardValue();

      // 将d1_A_BillCard和d1_B_B_BillCard两个表单的数据合为一个JSON
      let tempParams = {};
      yufp.clone(params, tempParams);

      // for (let i in params2) {
      //   if (params2[i] !== null) {
      //     tempParams[i] = params2[i];
      //   }
      // }
      // yufp.clone(params2, tempParams);

      this.$request({
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqpaccpapp/commonsaveiqpaccpappinfo',
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
      // 存值是否在线抵押
      this.setisOnlinePld();
    },

    // 提交
    commit () {
      // 调用通用的保存方法
      let saveFlag = this.commonSave();

      if (saveFlag) {
        this.$xutils.getParentPage2(this, null, 'refreshBillListData');
        this.afterSaveCommit();
      }
    },

    // 通用的保存方法
    commonSave () {
      let saveFlag = false;
      let validateFlagA = this.d1_A_BillCard.validateBillCardValue();

      if (!validateFlagA) {
        return;
      }

      // let validateFlagB = this.d1_B_B_BillCard.validateBillCardValue();

      // if (!validateFlagB) {
      //   return;
      // }
      saveFlag = this.commitSave();
      return saveFlag;
    },

    // 提交保存方法
    commitSave () {
      // 获取数值的方式
      let params = this.d1_A_BillCard.getBillCardValue();
      // let params2 = this.d1_B_B_BillCard.getBillCardValue();
      let saveFlag = true;
      let rtnData = {};
      // 将d1_A_BillCard和d1_B_B_BillCard两个表单的数据合为一个JSON
      let tempParams = {};
      yufp.clone(params, tempParams);
      // for (let i in params2) {
      //   if (params2[i] !== null) {
      //     tempParams[i] = params2[i];
      //   }
      // }
      this.$xutils.request({
        async: false,
        url: this.$backend.cmisBiz + '/api/iqpaccpapp/commonsaveiqpaccpappinfo',
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

      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
        return false;
      }

      return true;
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      var _this = this;
      let loginUser = _this.$xutils.getLoginUserInfo();
      var orgCode = loginUser.orgCode;
      // 提交流程
      var startdto = {};
      // 80：寿光 81：东海
      if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
        startdto.preventId = 'FA6BA51AF21C4E93B7324AA556DB621E'; // 风险拦截方案 ：银承合同申请校验
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX006';
        startdto.bizId = _this.d1_A_BillCard.getItemValue('serno');
        startdto.bizUserName = _this.d1_A_BillCard.getBillCardItemValue('cusName');
        startdto.bizUserId = _this.d1_A_BillCard.getBillCardItemValue('cusId');
        this.$refs.yufpNwfRiskNoFlow.riskFn(startdto);
      } else {
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX006';
        startdto.bizId = _this.d1_A_BillCard.getItemValue('serno');
        startdto.bizUserName = _this.d1_A_BillCard.getBillCardItemValue('cusName');
        startdto.bizUserId = _this.d1_A_BillCard.getBillCardItemValue('cusId');
        startdto.param = {
          contAmt: this.$refs.d1_A_BillCard.formdata.contAmt,
          lowRisk: this.d1_A_BillCard.getItemValue('guarMode'),
          topOutsystemCode: this.topOutsystemCode,
          imageParams: {
            contid: _this.$refs.d1_A_BillCard.formdata.contNo,
            businessid: _this.d1_A_BillCard.getItemValue('serno'),
            docid: _this.d1_A_BillCard.getItemValue('serno')
          },
          contNo: this.$refs.d1_A_BillCard.formdata.contNo
        };
        _this.$refs.yufpNwfInit.wfInit(startdto);
      }
    },

    // 村镇银行无流程提交后后续处理
    submitNotFlow () {
      var _this = this;
      var iqpSerno = _this.d1_A_BillCard.formdata.serno;
      _this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: _this.$backend.cmisBiz + '/api/iqpaccpapp/iqpAccpAppSubmitNoFlow',
        data: iqpSerno,
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
      this.getFactory().back();
    },

    // 对公客户查看
    viewCusDataByCusId () {
      if (this.d1_A_BillCard.formdata.cusId == null || this.d1_A_BillCard.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.d1_A_BillCard.formdata.cusId;
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
        if (this.d1_A_BillCard.formdata.guarMode == '21') {
          this.$route.meta.params.isAddGuar = '0';
        }
        this.$route.meta.params.isOlPld = this.d1_A_BillCard.formdata.isOlPld;
        this.$route.meta.params.guarStartDate = this.d1_A_BillCard.formdata.startDate;
        this.$route.meta.params.guarEndDate = this.d1_A_BillCard.formdata.endDate;
      } else {
        if (this.d1_A_BillCard.formdata.guarMode == '21') {
          this.getFactory().contextData.isAddGuar = '0';
        }
        this.getFactory().contextData.isOlPld = this.d1_A_BillCard.formdata.isOlPld;
        this.getFactory().contextData.guarStartDate = this.d1_A_BillCard.formdata.startDate;
        this.getFactory().contextData.guarEndDate = this.d1_A_BillCard.formdata.endDate;
      }
    }
  }
};
</script>
