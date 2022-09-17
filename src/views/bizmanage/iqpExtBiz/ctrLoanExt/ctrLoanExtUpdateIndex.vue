<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './ctrLoanExtUpdate_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 修改业务展期协议
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.d1_BillCard.queryDataByCondition('ext_ctr_no = \'' + this.getFactory().contextData.ext_ctr_no + '\'');

      // 手动初始化
      this.initThisPage();

      // 添加表单监听
      // this.d1_BillCard.addEditChangeAction(change);

      // 监听初始化
      this.initEditInfo();

      // 页面加载完后，根据op (模板工厂的op) 来判定 是否能修改
      if (this.getFactory().contextData.op) {
        this.initByContextOp(this.getFactory().contextData.op);
      }

      this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());

      // 加载工具js
      this.$xutils.importJsOrderBy(
        ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
        0,
        null
      );
    },

    // 手动初始化页面信息
    initThisPage () {
      // 设置流水号
      const ext_serno = this.d1_BillCard.getItemValue('ext_serno');

      this.d1_BillCard.setItemValue('tmp_app_serno', ext_serno);
      this.d1_BillCard.setItemEditable('old_bill_no', false);

      // 设置申请日期
      this.d1_BillCard.setItemValue('sign_date', this.getFactory().contextData.sign_date);

      // 死改,更改按钮名称   写死的(- -!)
      const buttonDoms = this.$xutils.getParentPage(this, 'document', 'getElementsByTagName', ['button']);

      for (let i = 0; i < buttonDoms.length; i++) {
        const html = buttonDoms[i].innerHTML;

        if (html == '暂存') {
          buttonDoms[i].innerHTML = '保存';
        }

        if (html == '保存') {
          buttonDoms[i].innerHTML = '确定签订';
        }
      }
    },

    // 添加表单监听
    change (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'ir_accord_type') {
        // 利率依据方式 当利率依据方式选择议价利率依据时，只显示“执行利率（年）”、执行利率（月）、逾期利率（年）、违约利率（年）
        if (newVal == '01') {
          // 议价利率
          thisCard.setItemVisible('ext_reality_ir_y;ext_reality_ir_m;overdue_rate_y;default_rate_y', true);

          thisCard.setItemVisible(
            'ir_type;ruling_ir;ruling_ir_m;loan_rat_type;ir_adjust_type;ir_adjust_term;rate_type;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate',
            false
          );

          thisCard.setBillCardItemClearValue(
            'ir_type;ruling_ir;ruling_ir_m;loan_rat_type;ir_adjust_type;ir_adjust_term;rate_type;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate'
          );
        } else if (newVal == '02' || newVal == '03') {
          // 非议价利率
          thisCard.setItemVisible(
            'ir_type;ruling_ir;ruling_ir_m;loan_rat_type;ir_adjust_type;ir_adjust_term;rate_type;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate',
            true
          );
        }
      }

      if (itemKey == 'ir_float_type') {
        // 利率浮动方式 点数浮动 比列浮动
        if (newVal == '01') {
          // 不浮动
          thisCard.setItemVisible('ir_float_point;ir_float_rate', false);

          thisCard.setBillCardItemClearValue('ir_float_point;ir_float_rate');
        } else if (newVal == '02') {
          // 点数浮动
          thisCard.setItemVisible('ir_float_point', true);

          thisCard.setItemVisible('ir_float_rate', false);
          thisCard.setBillCardItemClearValue('ir_float_rate');
        } else if (newVal == '03') {
          // 百分比浮动
          thisCard.setItemVisible('ir_float_rate', true);

          thisCard.setItemVisible('ir_float_point', false);
          thisCard.setBillCardItemClearValue('ir_float_point');
        }
      }

      if (itemKey == 'overdue_float_type') {
        // 逾期利率浮动方式
        if (newVal == '01') {
          // 不浮动
          thisCard.setItemVisible('overdue_rate;overdue_point', false);

          thisCard.setBillCardItemClearValue('overdue_rate;overdue_point');
        } else if (newVal == '02') {
          // 点数浮动
          thisCard.setItemVisible('overdue_point', true);

          thisCard.setItemVisible('overdue_rate', false);
          thisCard.setBillCardItemClearValue('overdue_rate');
        } else if (newVal == '03') {
          // 百分比浮动
          thisCard.setItemVisible('overdue_rate', true);

          thisCard.setItemVisible('overdue_point', false);
          thisCard.setBillCardItemClearValue('overdue_point');
        }
      }

      if (itemKey == 'default_float_type') {
        // 违约利率浮动方式
        if (newVal == '01') {
          // 不浮动
          thisCard.setItemVisible('default_rate;default_point', false);

          thisCard.setBillCardItemClearValue('default_rate;default_point');
        } else if (newVal == '02') {
          // 点数浮动
          thisCard.setItemVisible('default_point', true);

          thisCard.setItemVisible('default_rate', false);
          thisCard.setBillCardItemClearValue('default_rate');
        } else if (newVal == '03') {
          // 百分比浮动
          thisCard.setItemVisible('default_rate', true);

          thisCard.setItemVisible('default_point', false);
          thisCard.setBillCardItemClearValue('default_point');
        }
      }

      if (itemKey == 'old_reality_ir_y') {
        // 执行利率年
        if (newVal > 0) {
          thisCard.setBillCardItemValue('old_reality_ir_m', newVal / 12);
        }
      }

      // 计算展期终止日期
      if (itemKey == 'ext_term_type') {
        // 期限类型
        const term = thisCard.getItemValue('term');// 期限

        var start_date = thisCard.getItemValue('ext_app_date');// 申请日期

        if (newVal && newVal != '') {
          if (newVal == '001') {
            // 年
            // thisCard.setBillCardItemValue('ext_end_date', XDUtils.getTimeOperator(start_date, '001', term));
          } else if (newVal == '002') {
            // 月
            // thisCard.setBillCardItemValue('ext_end_date', XDUtils.getTimeOperator(start_date, '002', term));
          } else if (newVal == '003') {
            // 日
            // thisCard.setBillCardItemValue('ext_end_date', XDUtils.getTimeOperator(start_date, '003', term));
          }

          // 设置利率种类
          this.setIrType(thisCard.getItemValue('ext_end_date'));
        }
      }

      if (itemKey == 'term') {
        const type = thisCard.getItemValue('ext_term_type');// 类型
        var start_date = thisCard.getItemValue('ext_app_date');// 申请日期

        if (newVal && newVal != '') {
          // thisCard.setBillCardItemValue('ext_end_date', XDUtils.getTimeOperator(start_date, type, newVal));

          // 设置利率种类
          this.setIrType(thisCard.getItemValue('ext_end_date'));
        }
      }
    },

    // 监听初始化
    initEditInfo () {
      this.change(
        this.d1_BillCard,
        'ir_accord_type',
        null,
        this.d1_BillCard.getItemValue('ir_accord_type')
      );

      this.change(
        this.d1_BillCard,
        'ir_float_type',
        null,
        this.d1_BillCard.getItemValue('ir_float_type')
      );

      this.change(
        this.d1_BillCard,
        'overdue_float_type',
        null,
        this.d1_BillCard.getItemValue('overdue_float_type')
      );

      this.change(
        this.d1_BillCard,
        'default_float_type',
        null,
        this.d1_BillCard.getItemValue('default_float_type')
      );
    },

    // 设置利率种类
    // setIrType (newVal) {
    //   if (newVal && newVal != '') {
    //     const mounth_count = XDUtils.MonthsBetw(this.d1_BillCard.getItemValue('fount_start_date'), newVal);

    //     if (mounth_count >= 0 && mounth_count <= 6) {
    //       this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT6');
    //     } else if (mounth_count > 6 && mounth_count <= 12) {
    //       this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT12');
    //     } else if (mounth_count > 12 && mounth_count <= 36) {
    //       this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT36');
    //     } else if (mounth_count > 36 && mounth_count <= 60) {
    //       this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT60');
    //     } else if (mounth_count > 60) {
    //       this.d1_BillCard.setBillCardItemValue('ir_type', 'RAT60+');
    //     } else {
    //       this.$xutils.showMsgBox('提示', '展期终止日必须大于贷款起始日期！');
    //       return;
    //     }
    //   }
    // },

    // 设置页面是否编辑
    initByContextOp (op) {
      if (op == 'VIEW' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        this.d1_BillCard.setItemEditable('*', false);

        this.getFactory().setButtonVisiable('tempSave', false);
        this.getFactory().setButtonVisiable('save', false);
        this.getFactory().setButtonVisiable('commit', false);
        this.getFactory().setButtonVisiable('back', false);
      }
    },

    // 保存
    save () {
      // 发送后台保存
      const flag = this.saveInfo();

      if (flag && flag.code == 'ok') {
        // 更新合同状态为生效
        const params = this.d1_BillCard.getBillCardValue();

        // 保存数据
        params.ext_ctr_status = '002';

        const jsoPar = {
          'templetcode': 'ctr_loan_ext_list',
          'carddata': params,
          'ds': 'cmis_biz',
          'LoginUserInfo': this.$xutils.getLoginUserInfo()
        };

        const jsoRt = this.$xutils.doClassMethodCall(
          'yuxpservice',
          'cn.com.yusys.yusp.yubao.base.service3.YuBaoBillDMO',
          'updateBillCardData',
          jsoPar
        ); // 保存数据

        if (jsoRt) {
          this.$xutils.showMsgBox('提示', '签订成功!', null, null, () => {
            this.$xutils.getParentPage(this, null, 'back');
          });
        }
      }
    },

    // 暂存
    tempSave () {
      const flag = this.saveInfo();

      if (flag && flag.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功!');
      }
    },

    // 保存
    saveInfo () {
      const flag = this.d1_BillCard.updateBillCardData();
      return flag;
    }

    // 查看借据信息
    // accView () {
    //   const billData = this.d1_BillCard.getItemValue('old_bill_no');

    //   if (!(billData && billData != '')) {
    //     this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
    //     return;
    //   }

    //   const opeType = 'accLoan';
    //   const params = findContInfoFromBackend(billData, opeType);

    //   if (params) {
    //     params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';// 贷款台账模块
    //     params['op'] = 'VIEW';

    //     this.$dialog.open(
    //       '贷款台账',
    //       'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
    //       -1,
    //       -1,
    //       params
    //     );
    //   }
    // },

    // // 查看合同信息
    // contView () {
    //   const billData = this.d1_BillCard.getItemValue('old_cont_no');

    //   if (!(billData && billData != '')) {
    //     this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
    //     return;
    //   }

    //   const opeType = 'ctrLoanCont';
    //   const params = findContInfoFromBackend(billData, opeType);

    //   if (params) {
    //     params['model_group_no'] = 'CTR_LOAN_CONT_SIGN';
    //     params['op'] = 'VIEW';
    //     params['cont_no'] = billData;

    //     // 用于区分查询担保与业务申请(结果)表
    //     params['bizTy'] = 'grtLoanGuar';

    //     params['oprTyp'] = 'grtGuarBizRel';

    //     this.$dialog.open(
    //       '',
    //       'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
    //       -1,
    //       -1,
    //       params
    //     );
    //   }
    // }

    // 查看客户信息
    // cusView () {
    //   const cusId = this.d1_BillCard.getItemValue('cus_id');

    //   if (!(cusId && cusId != '')) {
    //     this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
    //     return;
    //   }

    //   const cusBaseInfo = findCusInfoFromBackend(cusId);
    //   const params = null;

    //   // 判定对公对私
    //   if (cusBaseInfo && cusBaseInfo != null) {
    //     const cus_catalog = cusBaseInfo.cus_catalog;

    //     if (cus_catalog == '1') {
    //       // 对公
    //       routeToPageCusCorp(cusId);
    //     } else if (cus_catalog == '2') {
    //       // 对私
    //       this.routeToPageCusIndiv(cusId);
    //     } else {
    //       this.$xutils.showMsgBox('提示', '无法确定客户大类！');
    //       return;
    //     }
    //   }
    // }
  }
};
</script>
