<template>
  <detail :page-params="pageParams"></detail>
</template>
<script>
import detail from './iqpLoanExtAppAddIndex.vue';
export default {
  components: {detail},
  props: {
    pageParams: Object,
    dialogId: String
  }
//   props: {
//     pageParams: Object,
//     dialogId: String
//   },
//   data () {
//     return {

//     };
//   },
//   mounted () {
//     // this.afterInit();
//   },
//   methods: {
//     // 新增展期业务申请
//     afterInit () {
//       // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
//       this.isFromFlowPage();

//       this.d1_BillCard.execBillCardDefaultValueFormula();
//       this.d1_BillCard.queryDataByCondition('a.ext_serno = \'' + this.getFactory().contextData.ext_serno + '\'');

//       // 手动初始化
//       this.initThisPage();

//       // 添加表单监听
//       this.d1_BillCard.addEditChangeAction(this.change);

//       // 监听初始化
//       this.initEditInfo();

//       // 页面加载完后，根据op (模板工厂的op) 来判定 是否能修改
//       if (this.getFactory().contextData.op) {
//         this.initByContextOp(this.getFactory().contextData.op);
//       }

//       this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());

//       // 加载工具js
//       this.$xutils.importJsOrderBy(
//         ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
//         0,
//         null
//       );
//     },

//     // 保存
//     save () {
//       // 校验必输
//       const saveFlag = this.d1_BillCard.validateBillCardValue();

//       // 校验业务逻辑
//       const checkFlag = this.checkBizInfo();

//       if (!saveFlag || !checkFlag) {
//         return;
//       }

//       // 发送后台保存
//       let flag = false;

//       flag = this.saveInfo();

//       // 保存成功，提示是否进入详情页面
//       if (flag) {
//         this.$xutils.showMsgBox('提示', '保存成功！');
//       }

//       return flag;
//     },

//     // 手动初始化页面信息
//     initThisPage () {
//       // 设置流水号
//       const ext_serno = this.d1_BillCard.getItemValue('ext_serno');

//       this.d1_BillCard.setItemValue('tmp_app_serno', ext_serno);
//       this.d1_BillCard.setItemEditable('old_bill_no', false);

//       // 去掉暂存按钮  ,去不掉  更改为不是主页面,还必须要有一个主页面  --！
//       this.getFactory().setButtonVisiable('tempSave', false);
//     },

//     // 添加表单监听
//     change (thisCard, itemKey, oldVal, newVal) {
//       if (itemKey == 'ir_accord_type') {
//         // 利率依据方式 当利率依据方式选择议价利率依据时，只显示“执行利率（年）”、执行利率（月）、逾期利率（年）、违约利率（年）
//         if (newVal == '01') {
//           // 议价利率
//           thisCard.setItemVisible('ext_reality_ir_y;ext_reality_ir_m;overdue_rate_y;default_rate_y', true);

//           thisCard.setItemVisible(
//             'ir_type;ruling_ir;ruling_ir_m;loan_rat_type;ir_adjust_type;ir_adjust_term;rate_type;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate',
//             false
//           );

//           thisCard.setBillCardItemClearValue(
//             'ir_type;ruling_ir;ruling_ir_m;loan_rat_type;ir_adjust_type;ir_adjust_term;rate_type;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate'
//           );
//         } else if (newVal == '02' || newVal == '03') {
//           // 非议价利率
//           thisCard.setItemVisible(
//             'ir_type;ruling_ir;ruling_ir_m;loan_rat_type;ir_adjust_type;ir_adjust_term;rate_type;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate',
//             true
//           );

//           // 设置利率种类
//           this.setIrType(thisCard.getItemValue('ext_end_date'));
//         }
//       }

//       if (itemKey == 'ir_float_type') {
//         // 利率浮动方式 点数浮动 比列浮动
//         if (newVal == '01') {
//           // 不浮动
//           thisCard.setItemVisible('ir_float_point;ir_float_rate', false);

//           thisCard.setBillCardItemClearValue('ir_float_point;ir_float_rate');
//         } else if (newVal == '02') {
//           // 点数浮动
//           thisCard.setItemVisible('ir_float_point', true);

//           thisCard.setItemVisible('ir_float_rate', false);
//           thisCard.setBillCardItemClearValue('ir_float_rate');
//         } else if (newVal == '03') {
//           // 百分比浮动
//           thisCard.setItemVisible('ir_float_rate', true);

//           thisCard.setItemVisible('ir_float_point', false);
//           thisCard.setBillCardItemClearValue('ir_float_point');
//         }
//       }

//       if (itemKey == 'overdue_float_type') {
//         // 逾期利率浮动方式
//         if (newVal == '01') {
//           // 不浮动
//           thisCard.setItemVisible('overdue_rate;overdue_point', false);

//           thisCard.setBillCardItemClearValue('overdue_rate;overdue_point');
//         } else if (newVal == '02') {
//           // 点数浮动
//           thisCard.setItemVisible('overdue_point', true);

//           thisCard.setItemVisible('overdue_rate', false);
//           thisCard.setBillCardItemClearValue('overdue_rate');
//         } else if (newVal == '03') {
//           // 百分比浮动
//           thisCard.setItemVisible('overdue_rate', true);

//           thisCard.setItemVisible('overdue_point', false);
//           thisCard.setBillCardItemClearValue('overdue_point');
//         }
//       }

//       if (itemKey == 'default_float_type') {
//         // 违约利率浮动方式
//         if (newVal == '01') {
//           // 不浮动
//           thisCard.setItemVisible('default_rate;default_point', false);

//           thisCard.setBillCardItemClearValue('default_rate;default_point');
//         } else if (newVal == '02') {
//           // 点数浮动
//           thisCard.setItemVisible('default_point', true);

//           thisCard.setItemVisible('default_rate', false);
//           thisCard.setBillCardItemClearValue('default_rate');
//         } else if (newVal == '03') {
//           // 百分比浮动
//           thisCard.setItemVisible('default_rate', true);

//           thisCard.setItemVisible('default_point', false);
//           thisCard.setBillCardItemClearValue('default_point');
//         }
//       }

//       if (itemKey == 'old_reality_ir_y') {
//         // 执行利率年
//         if (newVal > 0) {
//           thisCard.setBillCardItemValue('old_reality_ir_m', newVal / 12);
//         }
//       }

//       // 计算展期终止日期
//       if (itemKey == 'ext_term_type') {
//         // 期限类型
//         const term = thisCard.getItemValue('term');// 期限

//         var start_date = thisCard.getItemValue('ext_app_date');// 申请日期

//         if (newVal && newVal != '') {
//           if (newVal == '001') {
//             // 年
//             thisCard.setBillCardItemValue('ext_end_date', '');// XDUtils.getTimeOperator(start_date, '001', term)
//           } else if (newVal == '002') {
//             // 月
//             thisCard.setBillCardItemValue('ext_end_date', '');// XDUtils.getTimeOperator(start_date, '002', term)
//           } else if (newVal == '003') {
//             // 日
//             thisCard.setBillCardItemValue('ext_end_date', '');// XDUtils.getTimeOperator(start_date, '003', term)
//           }
//         }
//       }

//       if (itemKey == 'term') {
//         const type = thisCard.getItemValue('ext_term_type');// 类型
//         var start_date = thisCard.getItemValue('ext_app_date');// 申请日期

//         if (newVal && newVal != '') {
//           thisCard.setBillCardItemValue('ext_end_date', '');// XDUtils.getTimeOperator(start_date, type, newVal)

//           // 设置利率种类
//           this.setIrType(thisCard.getItemValue('ext_end_date'));
//         }
//       }
//     },

//     // 监听初始化
//     initEditInfo () {
//       this.change(
//         this.d1_BillCard,
//         'ir_accord_type',
//         null,
//         this.d1_BillCard.getItemValue('ir_accord_type')
//       );

//       this.change(
//         this.d1_BillCard,
//         'ir_float_type',
//         null,
//         this.d1_BillCard.getItemValue('ir_float_type')
//       );

//       this.change(
//         this.d1_BillCard,
//         'overdue_float_type',
//         null,
//         this.d1_BillCard.getItemValue('overdue_float_type')
//       );

//       this.change(
//         this.d1_BillCard,
//         'default_float_type',
//         null,
//         this.d1_BillCard.getItemValue('default_float_type')
//       );
//     },

//     // 校验业务逻辑
//     checkBizInfo () {
//       let flag = false;

//       //  校验展期长中短的期限是否符合条件
//       const startDate = this.d1_BillCard.getItemValue('fount_start_date');

//       const endDate = this.d1_BillCard.getItemValue('fount_end_date');
//       const term_year = this.getYearFromTwoDate(startDate, endDate);
//       const extEndDate = this.d1_BillCard.getItemValue('ext_end_date');
//       const diffDays = '';// .getDaysBetween(startDate, endDate)

//       if (term_year <= 1) {
//         // 短期贷款
//         var calExtEndDate = this.addDays(endDate, diffDays);

//         if (calExtEndDate.getTime() >= new Date(extEndDate.replace('/-/g', '/')).getTime()) {
//           flag = true;
//         } else {
//           this.$xutils.showMsgBox('提示:', '短期贷款,展期累计期限不能超过原贷款期限！');
//           return false;
//         }
//       } else if (term_year > 1 && term_year <= 5) {
//         // 中期贷款
//         var calExtEndDate = this.addDays(endDate, diffDays / 2);

//         if (calExtEndDate.getTime() >= new Date(extEndDate.replace('/-/g', '/')).getTime()) {
//           flag = true;
//         } else {
//           this.$xutils.showMsgBox('提示:', '中期贷款,展期累计期限不能超过原贷款期限的一半！');
//           return false;
//         }
//       } else if (term_year > 5) {
//         // 长期贷款
//         var calExtEndDate = this.addYears(endDate, 3);

//         if (calExtEndDate.getTime() >= new Date(extEndDate.replace('/-/g', '/')).getTime()) {
//           flag = true;
//         } else {
//           this.$xutils.showMsgBox('提示:', '长期贷款,展期累计期限不能超过三年！');
//           return false;
//         }
//       }

//       return flag;
//     },

//     // 设置利率种类
//     setIrType (newVal) {
//       if (newVal && newVal != '') {
//         const mounth_count = '';// XDUtils.MonthsBetw(this.d1_BillCard.getItemValue('fount_start_date'), newVal)"

//         if (mounth_count >= 0 && mounth_count <= 6) {
//           this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT6');
//         } else if (mounth_count > 6 && mounth_count <= 12) {
//           this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT12');
//         } else if (mounth_count > 12 && mounth_count <= 36) {
//           this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT36');
//         } else if (mounth_count > 36 && mounth_count <= 60) {
//           this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT60');
//         } else if (mounth_count > 60) {
//           this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT60+');
//         } else {
//           this.$xutils.showMsgBox('提示', '展期终止日必须大于贷款起始日期！');
//           return;
//         }
//       }
//     },

//     // 发后端保存
//     saveInfo () {
//       let flag = false;
//       const reqData = this.$xutils.toUpperCase(this.d1_BillCard.getBillCardValue(), true);

//       this.$xutils.request({
//         // 同步请求
//         async: false,

//         url: this.$backend.cmisBiz + '/api/iqploanextapp/addIqpLoanExtApp',
//         data: JSON.stringify(reqData),

//         success: (response, status, xhr) => {
//           if (response.code == '0') {
//             flag = true;
//             this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
//           } else {
//             this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
//           }
//         }
//       });

//       return flag;
//     },

//     // 设置页面是否编辑
//     initByContextOp (op) {
//       if (op == 'VIEW' || this.getFactory().contextData.fromFlow == 'Y') {
//         // 查看
//         this.d1_BillCard.setItemEditable('*', false);

//         this.getFactory().setButtonVisiable('tempSave', false);
//         this.getFactory().setButtonVisiable('save', false);
//         this.getFactory().setButtonVisiable('commit', false);
//         this.getFactory().setButtonVisiable('back', false);
//       }
//     },

//     // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
//     isFromFlowPage () {
//       this.getFactory().contextData.fromFlow = 'N';// 设置初始值   Y 从流程页面打开;N 一般申请打开

//       if (this.getFactory().contextData.flowData) {
//         if (this.getFactory().contextData.flowData.instanceInfo) {
//           if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
//             this.getFactory().contextData.ext_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;
//             this.getFactory().contextData.op = 'VIEW';
//           }
//         }
//       }
//     },

//     // 提交按钮
//     commit () {
//       // 暂存->保存->提交
//       const flag = this.save();

//       if (flag) {
//         const loginUser = this.$xutils.getLoginUserInfo();

//         const rsPars = {
//           'systemId': 'cmis',
//           'orgId': loginUser.orgId,
//           'bizId': this.d1_BillCard.getItemValue('ext_serno'),

//           // 流程申请类型会自动创建队列
//           'bizType': 'IQP_LOAN_EXT_APP',

//           // "param": {"test":"XIANGLEI_TEST"},//流程参数
//           'userId': loginUser.loginCode,

//           'bizUserName': this.d1_BillCard.getItemValue('cus_name'),
//           'bizUserId': this.d1_BillCard.getItemValue('cus_id')
//         };

//         this.$xutils.wfInit(rsPars, () => {
//           this.$xutils.getParentPage2(this, 'd1_BillList', 'queryDataByCondition');
//           this.$xutils.getParentPage(this, null, 'back');
//         });
//       }
//     },

//     tempSave () {
//       this.save();
//     },

//     getYearFromTwoDate (star, end) {
//       const starDate = new Date(star.replace('/-/g', '/'));
//       const endDate = new Date(end.replace('/-/g', '/'));
//       const starYear = starDate.getFullYear();
//       const endYear = endDate.getFullYear();
//       const starMonth = starDate.getMonth();
//       const endMonth = endDate.getMonth();
//       const starDay = starDate.getDate();
//       const endDay = endDate.getDate();
//       let year = endYear * 1 - starYear * 1;
//       let month = endMonth * 1 - starMonth * 1;
//       const day = endDay * 1 - starDay * 1;

//       if (month == 0 && day == 0) {
//         return year;
//       }

//       if (day < 0) {
//         month--;
//       }

//       if (month < 0) {
//         year--;
//       }

//       return ++year;
//     },

//     addDays (dateTemp, days) {
//       var dateTemp = new Date(dateTemp.replace('/-/g', '/'));
//       dateTemp.setDate(dateTemp.getDate() + days * 1);
//       return new Date(dateTemp);
//     },

//     addYears (dateTemp, years) {
//       var dateTemp = new Date(dateTemp.replace('/-/g', '/'));
//       dateTemp.setDate(dateTemp.getFullYear() + years * 1);
//       return new Date(dateTemp);
//     },

//     // 查看借据信息
//     accView () {
//       const billData = this.d1_BillCard.getItemValue('old_bill_no');

//       if (!(billData && billData != '')) {
//         this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
//         return;
//       }

//       const opeType = 'accLoan';
//       const params = this.findContInfoFromBackend(billData, opeType);

//       if (params) {
//         params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';// 贷款台账模块
//         params['op'] = 'VIEW';

//         this.$dialog.open(
//           '贷款台账',
//           'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
//           -1,
//           -1,
//           params
//         );
//       }
//     },

//     // 查看合同信息
//     contView () {
//       const billData = this.d1_BillCard.getItemValue('old_cont_no');

//       if (!(billData && billData != '')) {
//         this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
//         return;
//       }

//       const opeType = 'ctrLoanCont';
//       const params = this.findContInfoFromBackend(billData, opeType);

//       if (params) {
//         params['model_group_no'] = 'CTR_LOAN_CONT_SIGN';
//         params['op'] = 'VIEW';
//         params['cont_no'] = billData;

//         // 用于区分查询担保与业务申请(结果)表
//         params['bizTy'] = 'grtLoanGuar';

//         params['oprTyp'] = 'grtGuarBizRel';

//         this.$dialog.open(
//           '',
//           'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
//           -1,
//           -1,
//           params
//         );
//       }
//     },

//     // 查看客户信息
//     cusView () {
//       const cusId = this.d1_BillCard.getItemValue('cus_id');

//       if (!(cusId && cusId != '')) {
//         this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
//         return;
//       }

//       const cusBaseInfo = this.findCusInfoFromBackend(cusId);
//       const params = null;

//       // 判定对公对私
//       if (cusBaseInfo && cusBaseInfo != null) {
//         const cus_catalog = cusBaseInfo.cus_catalog;

//         if (cus_catalog == '1') {
//           // 对公
//           this.routeToPageCusCorp(cusId);
//         } else if (cus_catalog == '2') {
//           // 对私
//           this.routeToPageCusIndiv(cusId);
//         } else {
//           this.$xutils.showMsgBox('提示', '无法确定客户大类！');
//           return;
//         }
//       }
//     }
//   }
};
</script>
