<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpTermChgApproveUpdate_d1_BillCard.vue'
/** 利率调整申请页面**/
// 定义初始化标志位，初始化调用onchange相同方法时，不进行值清空的操作
const initFlag = true;

// 定义流程页面标识，用于区分流程进入与申请页面进入
const wfFlag = false;

export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      // 隐藏暂存按钮
      this.getFactory().setButtonVisiable('tempSave', false);

      this.isFromFlowPage();
      this.d1_BillCard = this.$refs.d1_BillCard;

      // 使用默认的查询方法进行数据查询操作
      // 获取表单数据
      this.d1_BillCard.setBillCardValue(this.getFactory().contextData);

      this.d1_BillCard.queryDataByCondition('iqp_serno=\'' + this.getFactory().contextData.iqp_serno + '\'');
      this.d1_BillCard.addEditChangeAction(this.change);

      // d1_BillCard.setButtonVisiable('tempSave', false);
      this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());

      // 添加表单监听 设置CHANGE事件
      if (this.getFactory().contextData.op_type == 'view' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        this.d1_BillCard.setItemEditable('*', false);

        // 隐藏保存按钮，此功能不需要暂存
        this.getFactory().setButtonVisiable('save', false);

        // 隐藏提交按钮，此功能不需要暂存
        this.getFactory().setButtonVisiable('commit', false);
      }
    },

    showAction() {
      this.d1_BillCard.queryDataByCondition('iqp_serno=\'' + this.getFactory().contextData.iqp_serno + '\'');

      // 隐藏暂存按钮
      this.getFactory().setButtonVisiable('tempSave', false);
    },

    /** 保存 */
    save() {
      let flag = false;

      // 校验必输
      const saveFlag = this.d1_BillCard.validateBillCardValue();

      if (!saveFlag) {
        this.$xutils.showMsgBox('提示', '界面要素未录入完成！', 350, 150);
        return;
      }

      const userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      const resp = this.d1_BillCard.updateBillCardData();

      if (resp && resp.code == 'ok') {
        flag = true;

        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
          this.$xutils.getParentPage(this, null, 'back');
        });
      }
    },

    /** 提交 */
    commit() {
      // 保存页面数据
      // 保存
      const saveResult = this.d1_BillCard.updateBillCardData();

      if (!saveResult || saveResult.code != 'ok') {
        return;
      }

      const iqpSerno = this.d1_BillCard.getItemValue('iqp_serno');
      const billNo = this.d1_BillCard.getItemValue('bill_no');

      if (!this.isExistChgBiz(iqpSerno, billNo)) {
        return;
      }

      const loginUser = this.$xutils.getLoginUserInfo();

      // 设置流程提交参数
      const param1 = {
        'orgId': '111',
        'bizId': '222',
        'bizUserId': 'userId',
        'bizUserName': 'userName',
        'bizParam4': '222'
      };

      const param2 = {
        'orgId': '222',
        'bizId': '333',
        'bizUserId': 'userId2',
        'bizUserName': 'userName2',
        'bizParam4': '222'
      };

      const rsPars1 = [];
      rsPars1.push(param1);
      rsPars1.push(param2);

      const rsPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.d1_BillCard.getItemValue('iqp_serno'),
        'bizType': 'IQP_TERM_CHG_APP',
        'userId': loginUser.loginCode,
        'bizUserName': loginUser.userName,
        'bizUserId': loginUser.loginCode,

        'param': {
          'money': '100.00',
          'subStartParams': rsPars1
        }
      };

      this.$xutils.wfInit(rsPars, () => {
        this.$xutils.getParentPage(this, null, 'back');
      });
    },

    // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
    isFromFlowPage() {
      this.getFactory().contextData.fromFlow = 'N';// 设置初始值   Y 从流程页面打开;N 一般申请打开

      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            this.getFactory().contextData.iqp_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;
            this.getFactory().contextData.op_type = 'view';
            this.getFactory().contextData.fromFlow = 'Y';
          }
        }
      }
    },

    /**
       * 校验是否存在在途变更业务
       * @param {*} iqpSerno
       */
    isExistChgBiz(iqpSerno, billNo) {
      let flag = false;

      const iqpTermChg = {
        'bill_no': billNo,
        'iqp_serno': iqpSerno
      };

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqptermchg/iqpTermChgApp/checkIsExistIqpTermChgBizByBillNo',
        data: JSON.stringify(this.$xutils.toUpperCase(iqpTermChg, true)),

        success: (response, status, xhr) => {
          this.rsPars = response.data;

          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message,
              350,
              200,
              () => {
                flag = false;
              }
            );
          } else {
            flag = true;
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('错误', '错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });

      return flag;
    },

    change(thisCard, itemKey, oldVal, newVal) {
      // 贷款到日期计算
      if (itemKey == 'term_typ' || itemKey == 'term') {
        if (thisCard.getBillCardItemValue('term') != '' && thisCard.getBillCardItemValue('term_typ') != '') {
          const startDate = thisCard.getBillCardItemValue('start_date');
          const term = thisCard.getBillCardItemValue('term');
          const termTyp = thisCard.getBillCardItemValue('term_typ');

          // if (termTyp == '001') {
          //   // 年
          //   thisCard.setBillCardItemValue('new_end_date', XDUtils.getTimeOperator(startDate, '001', term));
          // } else if (termTyp == '002') {
          //   // 月
          //   thisCard.setBillCardItemValue('new_end_date', XDUtils.getTimeOperator(startDate, '002', term));
          // } else if (termTyp == '003') {
          //   // 日
          //   thisCard.setBillCardItemValue('new_end_date', XDUtils.getTimeOperator(startDate, '003', term));
          // }
        }
      }
    },

    /**
       * 查看借据信息
       */
    viewBill() {
      const billNo = this.d1_BillCard.getBillCardItemValue('bill_no');

      if (billNo == '') {
        this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
        return;
      }

      const params = this.findAccInfoFromBackend(billNo);

      if (params) {
        params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';// 贷款台账模块
        params['op'] = 'VIEW';

        this.$dialog.open(
          '贷款台账',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      }
    },

    // 获取借据信息
    findAccInfoFromBackend(billNo) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisBiz + '/api/accloan/' + billNo,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return returnData;
    },

    /**
       * 查看客户信息
       */
    viewCus() {
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const params = {};

      if (jsoPar.cus_id == '' || jsoPar.cus_id == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }

      params['cus_id'] = jsoPar.cus_id;
      const cus_catalog = this.getFactory().contextData.cus_catalog;

      if (cus_catalog == '1') {
        //对公
        params['model_group_no'] = 'CMG000114';

        params['flag'] = 'view';

        this.$dialog.open(
          '企业客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      } else if (cus_catalog == '2') {
        //对私
        params['model_group_no'] = 'CMG000013';

        params['flag'] = 'view';

        this.$dialog.open(
          '个人客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params,
          null,
          true,
          true
        );
      } else {
        this.$xutils.showMsgBox('提示', '无法确定客户大类！');
        return;
      }
    },

    // 客户信息
    findCusInfoFromBackend(cusId) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisCus + '/api/cusbase/' + cusId,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return returnData;
    },

    // 查看公司客户页面
    routeToPageCusCorp(cusId) {
      const params = {
        cus_id: cusId,
        flag: 'view',
        model_group_no: 'CMG000114'
      };

      this.$dialog.open(
        '企业客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        true
      );
    },

    // 查看个人客户页面
    routeToPageCusIndiv(cusId) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisCus + '/api/cusindiv/' + cusId,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      if (returnData) {
        const selectedRowData = returnData;
        selectedRowData.flag = 'view';
        this.$dialog.open('个人客户查看页面', 'cusmanage/indivCus/indivCusMsgIndex', -1, -1, selectedRowData);
      }
    },

    viewRepay() {
      this.$xutils.showMsgBox('提示', '生成还款方案待开发...');
    }
  }
};
</script>
