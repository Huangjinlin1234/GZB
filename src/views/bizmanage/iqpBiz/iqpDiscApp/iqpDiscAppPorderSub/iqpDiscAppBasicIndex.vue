<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yufpNwfInit ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufpNwfInit>
    <yufpNwfRiskNoFlow ref="yufpNwfRiskNoFlow" ></yufpNwfRiskNoFlow>
  </div>
</template>
<script>
import d1Billcard from './iqpDiscAppBasic_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import yufpNwfRiskNoFlow from '@/components/widgets/YufpNwfRiskNoFlow';
// 贴现申请修改页面
// 定义初始化标志位，避免初始化方法调用onchange方法清空值
let initFlag = true;

// 定义流程页面标识，用于区分流程进入与申请页面进入
let wfFlag = false;
let selfPar = {};
let nodeFlag, disc_cont_type, drft_type;

export default {
  components: { d1Billcard, yufpNwfRiskNoFlow},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      debtInfo: false,
      topOutsystemCode: 'DGYX;XDTXYWYX;'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
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
      if (op == 'VIEW' || op == 'view') {
        this.d1_BillCard.isShowButton = false;
        this.d1_BillCard.disabledflg = true;
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqpdiscapp/showdetial',
        data: { serno: serno }
      })
        .then(response => {
          if (response.code == '0') {
            this.d1_BillCard.form.resetFields();
            yufp.clone(response.data, this.d1_BillCard.formdata);
            this.d1_BillCard.formdata.purType = 'RM00';
            this.d1_BillCard.formdata.discCurType = 'CNY';

            let drftType = this.d1_BillCard.formdata.drftType;
            if (drftType == '1' && (this.d1_BillCard.formdata.lmtAccNo == null || this.d1_BillCard.formdata.lmtAccNo == '')) {
              this.d1_BillCard.isLmtAccNoRequired = false;
              this.d1_BillCard.isReplyNoRequired = false;
            } else {
              this.d1_BillCard.isLmtAccNoRequired = true;
              this.d1_BillCard.isReplyNoRequired = true;
            }

            if (this.d1_BillCard.formdata.discContType == '01') {
              this.d1_BillCard.isDrftTotalAmtRequired = true;
              this.d1_BillCard.isContAmtRequired = false;
            } else {
              this.d1_BillCard.isDrftTotalAmtRequired = false;
              this.d1_BillCard.isContAmtRequired = true;
            }

            // 银行承兑一般贴现
            if (this.d1_BillCard.formdata.drftType == '1' && this.d1_BillCard.formdata.discContType == '01') {
              this.d1_BillCard.setBillCardItemVisible('startDate', false);
              this.d1_BillCard.setBillCardItemVisible('endDate', false);
              this.d1_BillCard.setBillCardItemVisible('guarMode', false);
              this.d1_BillCard.setBillCardItemVisible('pintMode', false);
              this.d1_BillCard.setBillCardItemVisible('acptCrpLmtNo', false);
              this.d1_BillCard.setBillCardItemVisible('acptCrpReplyNo', false);
              this.d1_BillCard.setBillCardItemVisible('acptCrpCusId', false);
              this.d1_BillCard.setBillCardItemVisible('acptCrpCusName', false);
              this.d1_BillCard.debtInfo = false;
            }

            // 银行承兑贴现额度
            if (this.d1_BillCard.formdata.drftType == '1' && this.d1_BillCard.formdata.discContType == '02') {
              this.d1_BillCard.setBillCardItemVisible('isAtcf', false);
              this.d1_BillCard.setBillCardItemVisible('guarMode', false);
              this.d1_BillCard.setBillCardItemVisible('pintMode', false);
              this.d1_BillCard.setBillCardItemVisible('acptCrpLmtNo', false);
              this.d1_BillCard.setBillCardItemVisible('acptCrpReplyNo', false);
              this.d1_BillCard.setBillCardItemVisible('acptCrpCusId', false);
              this.d1_BillCard.setBillCardItemVisible('acptCrpCusName', false);
              this.d1_BillCard.debtInfo = false;
            }

            // 商业承兑一般贴现
            if (this.d1_BillCard.formdata.drftType == '2' && this.d1_BillCard.formdata.discContType == '01') {
              this.d1_BillCard.setBillCardItemVisible('isAtcf', false);
              this.d1_BillCard.setBillCardItemVisible('contNo', false);
              this.d1_BillCard.setBillCardItemVisible('startDate', false);
              this.d1_BillCard.setBillCardItemVisible('endDate', false);
            }

            // 是否续签为否
            let isRenew = this.d1_BillCard.getItemValue('isRenew');
            if (isRenew == '0') {
              this.d1_BillCard.setBillCardItemVisible('origiContNo', false);
            }
          }
        })
        .catch((e) => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });

      this.initBillCard();
      // selfPar = this.getFactory().contextData;
      // this.$utils.clone(selfPar, this.d1_BillCard.formdata);


      nodeFlag = this.getFactory().contextData.nodeFlag;

      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());

      // 加载工具js
      // this.$xutils.importJsOrderBy(['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'], 0, null);


      // 页面录入框下拉框绑定onchange事件
      // this.d1_BillCard.addEditChangeAction(this.isBasicChange);
    },

    // onchang事件，若“是否续签合同 = 是”,则展示  “原合同编号”字段，否则隐藏不展示
    isBasicChange (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'is_renew' && newVal == '0') {
        thisCard.setBillCardItemVisible('origiContNo', false);
        thisCard.setBillCardItemRequired('origiContNo', false);

        // 隐藏后清空原有数据值
        thisCard.setBillCardItemClearValue('origiContNo');
      } else if (itemKey == 'is_renew' && newVal == '1') {
        thisCard.setBillCardItemVisible('origiContNo', true);
        thisCard.setBillCardItemRequired('origiContNo', true);
      }
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

      // 页面录入框下拉框绑定onchange事件
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
      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();

      let iqpDiscApp = this.$xutils.toUpperCase(jsoPar, true);

      // 保存操作
      let rtnData = '';

      let rtnFlag = true;

      // 调用ajax请求落地后端接口数据
      this.$request({
        // 同步请求
        method: 'post',

        url: this.$backend.cmisBiz + '/api/iqpdiscapp/update',
        data: JSON.stringify(iqpDiscApp)
      })
        .then(response => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
              // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
              this.$xutils.getParentPage2(this, null, 'refreshBillListData');
            });
          }
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },

    getAccNo () {
      let jsoPar = this.d1_BillCard.formdata;
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqpdiscapp/getaccnoinfo',
        data: { rqstrAccNo: jsoPar.rqstrAccNo }
      })
        .then(({code, message, data}) => {
        // 处理请求成功的情况
          if (code == '0') {
            this.d1_BillCard.setItemValue('rqstrAccName', data.zhhuzwmc);
          } else {
            this.$message({ message: message, type: 'error' });
          }
        });
    },

    // 暂存
    tempSave () {
      // 暂存操作不做任何校验
      let userInfo = this.$xutils.getLoginUserInfo();

      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      this.d1_BillCard.tempUpdateBillCardData();
      // 刷新列表数据，一个parent为模板工厂的页面，模板工厂的parent为列表界面
      this.$xutils.getParentPage2(this, null, 'refreshBillListData');
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
        url: this.$backend.cmisBiz + '/api/iqpdiscapp/commonsaveiqpdiscappinfo',
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
      // 流程状态
      var _this = this;
      // 提交流程
      var startdto = {};
      // 80：寿光 81：东海
      if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
        startdto.preventId = '996670B0E3B441B684EAD1A336FAA360'; // 风险拦截方案 ：贴现协议申请校验
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX009';
        startdto.bizId = _this.d1_BillCard.getBillCardItemValue('serno');
        startdto.bizUserName = _this.d1_BillCard.getBillCardItemValue('cusName');
        startdto.bizUserId = _this.d1_BillCard.getBillCardItemValue('cusId');
        this.$refs.yufpNwfRiskNoFlow.riskFn(startdto);
      } else {
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX009';
        startdto.bizId = _this.d1_BillCard.getBillCardItemValue('serno');
        startdto.bizUserName = _this.d1_BillCard.getBillCardItemValue('cusName');
        startdto.bizUserId = _this.d1_BillCard.getBillCardItemValue('cusId');
        startdto.param = {
          topOutsystemCode: this.topOutsystemCode,
          imageParams: {
            contid: _this.$refs.d1_BillCard.formdata.contNo,
            businessid: _this.d1_BillCard.getBillCardItemValue('serno'),
            docid: _this.d1_BillCard.getBillCardItemValue('serno')
          },
          contNo: this.$refs.d1_BillCard.formdata.contNo
        };
        _this.$refs.yufpNwfInit.wfInit(startdto);
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
        url: _this.$backend.cmisBiz + '/api/iqpdiscapp/iqpDiscAppSubmitNoFlow',
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
    // 返回
    back () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
