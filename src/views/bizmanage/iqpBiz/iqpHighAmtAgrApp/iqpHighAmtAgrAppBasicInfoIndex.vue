/**
 * 最高额授信协议申请修改页面
 */
<template>
<div>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
  <yufp-nwf-init ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufp-nwf-init>
  <yufpNwfRiskNoFlow ref="yufpNwfRiskNoFlow" ></yufpNwfRiskNoFlow>
</div>
</template>
<script>
import d1Billcard from './iqpHighAmtAgrAppBasicInfo_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import iqpTermChgQueryListIndexVue from '../../chgBiz/iqpTermChg/iqpTermChgQuery/iqpTermChgQueryListIndex.vue';
import yufpNwfRiskNoFlow from '@/components/widgets/YufpNwfRiskNoFlow';
export default {
  components: { d1Billcard, yufpNwfRiskNoFlow},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      topOutsystemCode: 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      var data = '';
      var serno = '';
      var op = '';

      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        serno = data.bizId;
        op = data.param.op;
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
        this.d1_BillCard.isEdit = true;
        this.d1_BillCard.isShowButton = false;
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqphighamtagrapp/showdetial',
        data: { serno: serno }
      })
        .then(response => {
          if (response.code == '0') {
            this.d1_BillCard.form.resetFields();
            this.$utils.clone(response.data, this.d1_BillCard.formdata);
            if (op == 'ADD' || op == 'EDIT') {
              this.d1_BillCard.setItemValue('agrType', 'CNY');
              this.d1_BillCard.setItemValue('isUtilLmt', '1');
            }
            // 当担保方式为抵押时显示是否在线抵押
            if (response.data.guarMode == '10') {
              this.d1_BillCard.isOlPld = true;
            }

            this.loginUser = this.$xutils.getLoginUserInfo();
            const orgType = this.loginUser.org.orgType;
            if (orgType == '1' || orgType == '2' || orgType == '3') {
              this.d1_BillCard.formdata.isOlPld = '0';
              this.d1_BillCard.isOlPldDisabled = true;
            }
            // 原合同编号是否显示，当是否续签为"是"时显示
            if (response.data.isRenew == '1') {
              this.d1_BillCard.origiContNo = true;
            }
            this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
          }
          // 存值是否在线抵押
          this.setisOnlinePld();
        })
        .catch(() => {
          this.$message({ message: '请求异常!', type: 'error' });
          return;
        });
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
        // this.$xutils.showMsgBox('提示', '微信、QQ、Email三项至少输入一项');
        // return;
        this.$message({ message: '微信、QQ、Email三项至少输入一项!', type: 'warning' });
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
      // this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
      let iqpHighAmtAgrApp = {};
      yufp.clone(this.d1_BillCard.formdata, iqpHighAmtAgrApp);

      // 调用ajax请求落地后端接口数据
      this.$request({
        // 同步请求
        method: 'post',
        url: this.$backend.cmisBiz + '/api/iqphighamtagrapp/commonsaveiqphighamtagrappinfo',
        data: JSON.stringify(iqpHighAmtAgrApp)
      })
        .then(response => {
          if (response.code == '0') {
            // this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
            //   this.getFactory().back();
            // });
            this.$message({ message: '保存成功!', type: 'success'});
            return;
          }
        })
        .catch(() => {
          // this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
          this.$message({ message: '请求异常!', type: 'error' });
        });
      this.setisOnlinePld();
    },

    // 暂存
    tempSave () {
      // 暂存操作不做任何校验
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
      this.d1_BillCard.tempUpdateBillCardData();
      this.setisOnlinePld();
    },

    // 提交
    commit () {
      // 调用通用的保存方法
      let validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      this.commitSave();
    },

    // 提交保存方法
    commitSave () {
      let saveData = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        async: true,
        url: this.$backend.cmisBiz + '/api/iqphighamtagrapp/commonsaveiqphighamtagrappinfo',
        data: JSON.stringify(saveData),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.setisOnlinePld();
            this.afterSaveCommit();
          } else {
            // this.$xutils.showMsgBox('提示', response.message);
            this.$message({ message: response.message, type: 'error' });
          }
        },
        error: (result, b) => {
          // this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          this.$message({ message: result + '错误信息: ' + b, type: 'error' });
        }
      });
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      // 流程状态
      var _this = this;
      let loginUser = _this.$xutils.getLoginUserInfo();
      var orgCode = loginUser.orgCode;
      // 提交流程
      var startdto = {};
      // 80：寿光 81：东海
      if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
        startdto.preventId = '9A7F2A10BBA242FA814D7D9978F857D5'; // 风险拦截方案 ：普通贷款合同申请校验
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX001';
        startdto.bizId = this.d1_BillCard.getItemValue('serno');
        startdto.bizUserName = this.d1_BillCard.getItemValue('cusName');
        startdto.bizUserId = this.d1_BillCard.getItemValue('cusId');
        this.$refs.yufpNwfRiskNoFlow.riskFn(startdto);
      } else {
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.id;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = 'YX001';
        startdto.bizId = this.d1_BillCard.getItemValue('serno');
        startdto.bizUserName = this.d1_BillCard.getItemValue('cusName');
        startdto.bizUserId = this.d1_BillCard.getItemValue('cusId');
        startdto.param = {
          contAmt: this.$refs.d1_BillCard.formdata.agrAmt,
          lowRisk: this.d1_BillCard.getItemValue('guarMode'),
          topOutsystemCode: this.topOutsystemCode,
          imageParams: {
            contid: this.$refs.d1_BillCard.formdata.contNo,
            businessid: this.d1_BillCard.getItemValue('serno'),
            docid: this.d1_BillCard.getItemValue('serno')
          },
          contNo: this.$refs.d1_BillCard.formdata.contNo,
          op: 'VIEW',
          replyNo: this.$refs.d1_BillCard.formdata.replyNo
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
        url: _this.$backend.cmisBiz + '/api/iqphighamtagrapp/iqpHighAmtSubmitNoFlow',
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

    // 返回
    back () {
      yufp.router.removeTab(this.$route.path);
    },

    // 对公客户查看
    viewCusDataByCusId () {
      if (this.d1_BillCard.formdata.cusId == null || this.d1_BillCard.formdata.cusId == '') {
        this.$message({ message: '客户号为空!', type: 'warning' });
        // this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.d1_BillCard.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      var path = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
      this.$router.addTab({
        name: path,
        key: json.serno + json.opType,
        title: '对公客户查看',
        data: json
      });
    },

    viewReplyNo () {
      if (this.d1_BillCard.formdata.replyNo == null || this.d1_BillCard.formdata.replyNo == '') {
        this.$message({ message: '批复编号为空!', type: 'warning' });
        // this.$xutils.showMsgBox('提示', '批复编号为空!');
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
