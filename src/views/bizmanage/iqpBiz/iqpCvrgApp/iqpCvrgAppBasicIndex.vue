<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
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
import d1Billcard from './iqpCvrgAppBasic_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import yufpNwfRiskNoFlow from '@/components/widgets/YufpNwfRiskNoFlow';
// 定义初始化标志位，避免初始化方法调用onchange方法清空值
let initFlag = true;

// 定义流程页面标识，用于区分流程进入与申请页面进入
let wfFlag = false;

let nodeFlag, disc_cont_type, drft_type;

// 贴现协议01一般贴现协议 02贴现额度协议

// 票据种类1银行承兑汇票 2商业承兑汇票

export default {
  components: { d1Billcard, yufpNwfRiskNoFlow},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      topOutsystemCode: 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWBH;GJYWDCCZ;GJYWSQSQT;',
      isShowButton: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 申请基本信息(一般线下保函)
     * @letructor
     */
    AfterInit () {
      // this.checkWfPage();
      // this.initWfStatus();
      this.d1_BillCard = this.$refs.d1_BillCard;
      var data = '';
      var serno = '';
      var op = '';

      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        serno = data.bizId;
        op = 'VIEW';
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
        this.isShowButton = false;
        this.d1_BillCard.isFormDisabled = true;
      }
      // 调用ajax请求落地后端接口数据
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqpcvrgapp/showdetial',
        data: { serno: serno }
      })
        .then(response => {
          if (response.code == '200') {
            this.d1_BillCard.form.resetFields();
            this.$utils.clone(response.data, this.d1_BillCard.formdata);
          }

          // 默认币种为人民币
          let curType = this.d1_BillCard.formdata.curType;
          if (curType == 'undefined' || curType == null || curType == '') {
            this.d1_BillCard.formdata.curType = 'CNY';
          }

          let guarMode = this.d1_BillCard.getItemValue('guarMode');
          if (guarMode != '10') {
            this.d1_BillCard.setBillCardItemVisible('isOlPld', false);
          }
          if (guarMode == '40' || guarMode == '60' || guarMode == '21') {
            this.d1_BillCard.isLmtAccNoRequired = false;
            this.d1_BillCard.isReplyNoRequired = false;
          } else {
            this.d1_BillCard.isLmtAccNoRequired = true;
            this.d1_BillCard.isReplyNoRequired = true;
          }

          let prdId = this.d1_BillCard.formdata.prdId;
          // 在线投标保函【610001】
          if (prdId == '610001') {
            this.d1_BillCard.formdata.isEGuarant = '1';
            this.d1_BillCard.formdata.contType = '2';
          } else {
            this.d1_BillCard.formdata.isEGuarant = '0';
          }

          // 原合同编号是否显示，当是否续签为"是"时显示
          if (response.data.isRenew == '1') {
            this.d1_BillCard.origiContNo = true;
          }
          // // 当合同类型为"最高额合同"时，部分字段不显示
          // if (response.data.contType == '2') {
          //   this.d1_BillCard.contTypeSign = false;
          //   this.d1_BillCard.isReqBycontType = false;
          // }
          if (prdId == '042062' || prdId == '610001' || prdId == '610002') {
            this.d1_BillCard.setItemValue('curType', 'CNY');
            this.d1_BillCard.isDomesticCvrg = true;
          }
          // 存值是否在线抵押
          this.setisOnlinePld();
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
      // 模板工厂主页面数据加载成功事件(这么写会导致模板的传参gg)
      // this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
      // selfPar = this.getFactory().contextData;
      this.initBillCard();
      // 页面录入框下拉框绑定onchange事件
      // this.d1_BillCard.addEditChangeAction(this.isBasicChange);
    },

    // viewReplyNo () {
    //   if (this.d1_BillCard.formdata.replyNo == null || this.d1_BillCard.formdata.replyNo == '') {
    //     this.$xutils.showMsgBox('提示', '批复编号为空!');
    //     return;
    //   }
    //   let params = {};
    //   params['replySerno'] = this.d1_BillCard.formdata.replyNo;
    //   this.$dialog.open(
    //     '',
    //     'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
    //     -1,
    //     -1,
    //     params
    //   );
    // },

    // 保存
    save () {
      let validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      if (this.d1_BillCard.checkValue == false) {
        this.$message({ message: this.d1_BillCard.checkMsg, type: 'warning' });
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
      let iqpEntrustLoanApp = this.$xutils.toUpperCase(jsoPar, true);
      // 保存操作
      let rtnData = '';
      let rtnFlag = true;
      // 调用ajax请求落地后端接口数据
      this.$request({
        // 同步请求
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqpcvrgapp/update',
        data: JSON.stringify(iqpEntrustLoanApp)
      })
        .then(response => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
              // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
              this.getFactory().back();
            });
          }
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },

    // 暂存,暂存操作不做任何校验
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
        url: this.$backend.cmisBiz + '/api/iqpcvrgapp/update',
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


    // 提交
    commit () {
      // 调用通用的保存方法
      let validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      if (this.d1_BillCard.checkValue == false) {
        this.$message({ message: this.d1_BillCard.checkMsg, type: 'warning' });
        return;
      }
      this.commitSave();
    },

    // 提交保存方法
    commitSave () {
      let saveData = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        async: true,
        url: this.$backend.cmisBiz + '/api/iqpcvrgapp/commsaveiqpcvrgappinfo',
        data: JSON.stringify(saveData),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.afterSaveCommit();
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      // 提交流程
      var _this = this;
      let loginUser = this.$xutils.getLoginUserInfo();
      // 区分总行和村镇（东海，寿光）,村镇不走流程
      var orgCode = loginUser.orgCode;
      // 提交流程
      var startdto = {};
      // 80：寿光 81：东海
      if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
        startdto.preventId = 'F245F9CA11A241EE971093C361E2EDB7'; // 风险拦截方案 ：保函合同申请
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX007';
        startdto.bizId = _this.d1_BillCard.getItemValue('serno');
        startdto.bizUserName = _this.d1_BillCard.getBillCardItemValue('cusName');
        startdto.bizUserId = _this.d1_BillCard.getBillCardItemValue('cusId');
        this.$refs.yufpNwfRiskNoFlow.riskFn(startdto);
      } else {
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX007';
        startdto.bizId = _this.d1_BillCard.getItemValue('serno');
        startdto.bizUserName = _this.d1_BillCard.getBillCardItemValue('cusName');
        startdto.bizUserId = _this.d1_BillCard.getBillCardItemValue('cusId');
        startdto.param = {
          contAmt: this.$refs.d1_BillCard.formdata.contAmt,
          lowRisk: this.d1_BillCard.getItemValue('guarMode'),
          contNo: this.$refs.d1_BillCard.formdata.contNo,
          topOutsystemCode: this.topOutsystemCode,
          imageParams: {
            contid: _this.$refs.d1_BillCard.formdata.contNo,
            businessid: _this.d1_BillCard.getItemValue('serno'),
            docid:_this.d1_BillCard.getItemValue('serno')
          }
        };
        _this.$refs.yufpNwfInit.wfInit(startdto);
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
        url: _this.$backend.cmisBiz + '/api/iqpcvrgapp/iqpCvrgAppSubmitNoFlow',
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

    // 通用的保存方法
    commonSave () {
      let saveFlag = false;
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }
      if (this.d1_BillCard.checkValue == false) {
        this.$message({ message: this.d1_BillCard.checkMsg, type: 'warning' });
        return;
      }
      saveFlag = this.commitSave();
      return saveFlag;
    },


    // 流程提交成功的回调方法
    afterCommitCallBack () {
      // 刷新列表页面
      // this.$xutils.getParentPage2(this, null, 'refreshBillListData');
      this.back();
    },

    // 返回
    back () {
      yufp.router.removeTab(this.$route.path);
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
