<template>
  <yu-tabs type="card">
    <yu-tab-pane label="基 本 信 息">
      <yu-row>
        <d1-1-a-billcard ref="d1_1_A_BillCard"></d1-1-a-billcard>
      </yu-row>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11ABillcard from './iqpLoanBaseInfo_d1_1_A_BillCard.vue';
import d12Billcard from './iqpLoanBaseInfo_d1_2_BillCard.vue';
import d13Billcard from './iqpLoanBaseInfo_d1_3_BillCard.vue';
import d11BBilllist from './iqpLoanBaseInfo_d1_1_B_BillList.vue';
export default {
  components: { d11ABillcard, d12Billcard, d13Billcard, d11BBilllist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_A_BillCard: null,
      d1_2_BillCard: null,
      d1_3_BillCard: null,
      d1_1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 申请信息主页面
    AfterInit () {
      /* 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()*/
      this.isFromFlowPage();
      this.d1_1_A_BillCard = this.$refs.d1_1_A_BillCard; // 基本信息
      this.d1_1_A_BillCard.addEditChangeAction(this.baseChange);
      this.d1_1_A_BillCard.execBillCardDefaultValueFormula(); // 基本信息
      // 同步请求后端 获取整个基础表单的数据
      const returnData = this.getBackendData(
        this.getFactory().contextData.iqp_serno
      );
      this.d1_1_A_BillCard.setBillCardValue(returnData);
      // 加载公式无法使用，根据prd_id 查询后台，获取prd_name;
      const prdInfo = this.getPrdInfoFromBackendServer(returnData.prd_id);
      this.d1_1_A_BillCard.setItemValue('prd_name', prdInfo.prd_name);
      this.d1_1_A_BillCard.execBillCardDefaultValueFormula(); // 基本信息
      const dom = document.getElementById('d1_1_A_BillCard@DivForm');
      dom.style.overflowY = 'hidden';

      // 流程中加入 合同和放款模板,设置合同号和放款流水号 初始化frameContext 参数
      // this.initFrameContextParam();

      /* 页面初始化*/
      this.initThisPage();

      // 页面加载完后，根据op (模板工厂的op) 来判定 是否能修改
      if (this.getFactory().contextData.op) {
        this.initByContextOp(this.getFactory().contextData.op);
      }

      this.getFactory().triggerAction(this.d1_1_A_BillCard.getBillCardValue());
    },

    // 监听card 值变化
    baseChange (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'is_green_type') {
        // 是否绿色通道，是-显示03 特急件。否，显示01 普通件 02 紧急件
        const temp_biz_pri = this.d1_1_A_BillCard.getItemValue('biz_pri');

        if (newVal == 'Y') {
          const dic = [
            {
              key: '01',
              value: '普通件'
            },
            {
              key: '02',
              value: '紧急件'
            },
            {
              key: '03',
              value: '特急件'
            }
          ];

          this.d1_1_A_BillCard.setSelectOptions('biz_pri', 'replaceAll', dic);
          this.d1_1_A_BillCard.setItemValue('biz_pri', '03');
          this.d1_1_A_BillCard.setItemEditable('biz_pri', false);
        } else if (newVal == 'N') {
          if (temp_biz_pri && temp_biz_pri != '') {
            this.d1_1_A_BillCard.setItemEditable('biz_pri', true);
          } else {
            this.d1_1_A_BillCard.setBillCardItemClearValue('biz_pri');
            this.d1_1_A_BillCard.setItemEditable('biz_pri', true);
          }

          this.d1_1_A_BillCard.setSelectOptions('biz_pri', 'hidden', '03');
        }
      }

      if (itemKey == 'guar_way') {
        // 担保方式
        this.getFactory().triggerAction({
          guar_way: newVal
        });
      }

      if (itemKey == 'is_authorize') {
        // 是否委托人
        if (newVal == 'Y') {
          this.d1_1_A_BillCard.setItemVisible(
            'authed_name;authed_cert_type;authed_cert_code;authed_tel_no',
            true
          );
        } else if (newVal == 'N') {
          this.d1_1_A_BillCard.setItemVisible(
            'authed_name;authed_cert_type;authed_cert_code;authed_tel_no',
            false
          );
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'authed_name;authed_cert_type;authed_cert_code;authed_tel_no'
          );
        }
      }

      if (itemKey == 'chnl_sour') {
        // 渠道来源
        if (newVal == '11' || newVal == '14' || newVal == '20') {
          // pad 手机 第三方
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'app_appl_code;equip_no'
          );

          this.d1_1_A_BillCard.setItemEditable('app_appl_code;equip_no', false);
        } else {
          this.d1_1_A_BillCard.setItemEditable('app_appl_code;equip_no', true);
        }
      }

      if (itemKey == 'app_amt' && newVal != '') {
        // 申请金额改变且不为空时
        // 折算人命币金额 app_rmb_amt
        this.setAppRateAmt();
      }

      if (itemKey == 'bail_rate' && newVal != '') {
        // 保证金比列改变时
        this.setSecutityAmtChangeByAppAmtOrBailRate();
      }

      if (itemKey == 'ir_accord_type' && newVal != '') {
        // 利率依据方式为01 议价利率依据
        if (newVal == '01') {
          this.d1_1_A_BillCard.setItemValue('rate_type', '0'); // 固定利率，且不可更改
          this.d1_1_A_BillCard.setItemEditable('rate_type', false);

          this.d1_1_A_BillCard.setBillCardItemVisible(
            'ir_type;ruling_ir;ruling_ir_m;loan_rat_type;ir_adjust_type;ir_adjust_term;pra_type;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate',
            false
          );

          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'ir_type;ruling_ir;ruling_ir_m;ir_adjust_type;ir_adjust_term;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate'
          );
        } else {
          this.d1_1_A_BillCard.setItemEditable('rate_type', true);

          this.d1_1_A_BillCard.setBillCardItemVisible(
            'ir_type;ruling_ir;ruling_ir_m;loan_rat_type;ir_adjust_type;ir_adjust_term;pra_type;rate_type;ir_float_type;ir_float_rate;ir_float_point;overdue_float_type;overdue_point;overdue_rate;default_float_type;default_point;default_rate;',
            true
          );
        }
      }

      if (itemKey == 'ir_float_type') {
        // 利率浮动方式改变时
        if (newVal == '01') {
          // 不浮动
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'ir_float_point;ir_float_rate',
            null
          );

          this.d1_1_A_BillCard.setItemVisible(
            'ir_float_point;ir_float_rate',
            false
          );
        } else if (newVal == '02') {
          // 点数浮动
          this.d1_1_A_BillCard.setItemVisible('ir_float_point', true);

          this.d1_1_A_BillCard.setItemValue('ir_float_rate', null);
          this.d1_1_A_BillCard.setItemVisible('ir_float_rate', false);
        } else if (newVal == '03') {
          // 比列浮动
          this.d1_1_A_BillCard.setItemValue('ir_float_point', null);

          this.d1_1_A_BillCard.setItemVisible('ir_float_point', false);
          this.d1_1_A_BillCard.setItemVisible('ir_float_rate', true);
        }
      }

      if (itemKey == 'overdue_float_type' && newVal != '') {
        // 逾期利率浮动方式改变时
        if (newVal == '01') {
          this.d1_1_A_BillCard.setItemVisible(
            'overdue_point;overdue_rate',
            false
          );
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'overdue_point;overdue_rate;overdue_rate_y'
          );
          this.d1_1_A_BillCard.setItemValue(
            'overdue_rate_y',
            this.d1_1_A_BillCard.getItemValue('reality_ir_y')
          );
        } else if (newVal == '02') {
          this.d1_1_A_BillCard.setItemVisible('overdue_point', true);
          this.d1_1_A_BillCard.setItemVisible('overdue_rate', false);
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'overdue_rate;overdue_rate_y'
          );
        } else if (newVal == '03') {
          this.d1_1_A_BillCard.setItemVisible('overdue_point', false);
          this.d1_1_A_BillCard.setItemVisible('overdue_rate', true);
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'overdue_point;overdue_rate_y'
          );
        }
      }

      if (itemKey == 'default_float_type' && newVal != '') {
        // 违约利率浮动方式改变时
        if (newVal == '01') {
          this.d1_1_A_BillCard.setItemVisible(
            'default_point;default_rate',
            false
          );
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'default_point;default_rate;default_rate_y'
          );
          this.d1_1_A_BillCard.setItemValue(
            'default_rate_y',
            this.d1_1_A_BillCard.getItemValue('reality_ir_y')
          );
        } else if (newVal == '02') {
          this.d1_1_A_BillCard.setItemVisible('default_point', true);
          this.d1_1_A_BillCard.setItemVisible('default_rate', false);
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'default_rate;default_rate_y'
          );
        } else if (newVal == '03') {
          this.d1_1_A_BillCard.setItemVisible('default_rate', true);
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'default_point;default_rate_y'
          );
          this.d1_1_A_BillCard.setItemVisible('default_point', false);
        }
      }

      if (itemKey == 'ir_adjust_type' && newVal != '') {
        // 利率调整方式
        if (newVal == '0') {
          // 按指 固定利率 不调整时，调息方式 显示，否则隐藏
          this.d1_1_A_BillCard.setItemValue('pra_type', null);

          this.d1_1_A_BillCard.setItemVisible('pra_type', false);
        } else {
          // 否则隐藏
          this.d1_1_A_BillCard.setItemVisible('pra_type', true);
        }

        if (newVal == '2') {
          // 按指定周期调整
          this.d1_1_A_BillCard.setItemVisible('ir_adjust_term', true);
        } else {
          this.d1_1_A_BillCard.setBillCardItemClearValue('ir_adjust_term');
          this.d1_1_A_BillCard.setItemVisible('ir_adjust_term', false);
        }
      }

      if (itemKey == 'overdue_rate') {
        // 逾期浮动百分比
        var real_ir_y = this.d1_1_A_BillCard.getItemValue('reality_ir_y');

        const overdue_rate = this.d1_1_A_BillCard.getItemValue('overdue_rate');
        this.d1_1_A_BillCard.setItemValue(
          'overdue_rate_y',
          (1 + overdue_rate * 1) * real_ir_y
        );
      }

      if (itemKey == 'overdue_point') {
        // 逾期固定加点值
        var real_ir_y = this.d1_1_A_BillCard.getItemValue('reality_ir_y');

        const overdue_point = this.d1_1_A_BillCard.getItemValue(
          'overdue_point'
        );
        var temp = Number(real_ir_y) + Number(overdue_point);
        this.d1_1_A_BillCard.setItemValue('overdue_rate_y', temp);
      }

      if (itemKey == 'default_rate') {
        // 违约浮动百分比
        var real_ir_y = this.d1_1_A_BillCard.getItemValue('reality_ir_y');

        const default_rate = this.d1_1_A_BillCard.getItemValue('default_rate');
        this.d1_1_A_BillCard.setItemValue(
          'default_rate_y',
          (1 + default_rate * 1) * real_ir_y
        );
      }

      if (itemKey == 'default_point') {
        // 违约固定加点值
        var real_ir_y = this.d1_1_A_BillCard.getItemValue('reality_ir_y');

        const default_point = this.d1_1_A_BillCard.getItemValue(
          'default_point'
        );
        var temp = Number(default_point) + Number(real_ir_y);
        this.d1_1_A_BillCard.setItemValue('default_rate_y', temp);
      }

      if (itemKey == 'reality_ir_y') {
        // 年利率变化时
        this.d1_1_A_BillCard.setItemValue('reality_ir_m', newVal / 12);

        if (this.d1_1_A_BillCard.getItemValue('ir_accord_type') == '01') {
          // 议价利率
          this.d1_1_A_BillCard.setItemValue('overdue_rate_y', newVal);

          this.d1_1_A_BillCard.setItemValue('default_rate_y', newVal);
        }

        if (this.d1_1_A_BillCard.getItemValue('overdue_rate')) {
          this.d1_1_A_BillCard.setItemValue(
            'overdue_rate_y',
            (1 + this.d1_1_A_BillCard.getItemValue('overdue_rate') * 1) * newVal
          );
        } else if (this.d1_1_A_BillCard.getItemValue('overdue_point')) {
          this.d1_1_A_BillCard.setItemValue(
            'overdue_rate_y',
            this.d1_1_A_BillCard.getItemValue('overdue_point') * 1 + newVal * 1
          );
        } else if (this.d1_1_A_BillCard.getItemValue('default_rate')) {
          this.d1_1_A_BillCard.setItemValue(
            'overdue_rate_y',
            (1 + this.d1_1_A_BillCard.getItemValue('default_rate') * 1) * newVal
          );
        } else if (this.d1_1_A_BillCard.getItemValue('default_point')) {
          this.d1_1_A_BillCard.setItemValue(
            'overdue_rate_y',
            this.d1_1_A_BillCard.getItemValue('default_point') * 1 + newVal * 1
          );
        }
      }

      if (itemKey == 'bail_sour' && newVal != '') {
        // 保证金来源
        this.isBailSourChangeFn(thisCard, newVal);
      }

      if (itemKey == 'rate_type') {
        // 利率形式改变时
        const dom = document.getElementById('d1_1_B');

        if (newVal == '0') {
          // 当为固定利率时，显示固定利率列表
          dom.style.display = 'block';

          this.d1_1_A_BillCard.setBillCardItemVisible(
            'ir_float_type;ir_float_point;ir_float_point_temp;ir_float_rate',
            false
          );
          this.d1_1_A_BillCard.setBillCardItemClearValue(
            'ir_float_type;ir_float_point;ir_float_point_temp;ir_float_rate'
          );
        } else if (newVal == '1') {
          // 是浮动利率时
          if (this.d1_1_B_BillList.getBillListData().length > 0) {
            this.$xutils.showMsgBox('提示', '请先删除多阶段固定利率信息!');
            this.d1_1_A_BillCard.setItemValue('rate_type', '0');
          } else {
            dom.style.display = 'none';
          }

          this.d1_1_A_BillCard.setBillCardItemVisible(
            'ir_float_type;ir_float_point;ir_float_point_temp;ir_float_rate',
            true
          );

          this.baseChange(
            null,
            'ir_float_type',
            null,
            this.d1_1_A_BillCard.getItemValue('ir_float_type')
          );
        }
      }

      if (itemKey == 'is_cfirm_pay_way') {
        // 是否确认支付方式
        if (newVal == 'Y') {
          this.d1_1_A_BillCard.setItemVisible('defray_mode', true);
        } else {
          this.d1_1_A_BillCard.setBillCardItemClearValue('defray_mode');
          this.d1_1_A_BillCard.setItemVisible('defray_mode', false);
        }
      }

      if (itemKey == 'app_cur_type' || itemKey == 'bail_cur_type') {
        // 币种变化时，需要调用后端接口查询利率信息
        if (newVal && newVal != '') {
          this.curTypeChangeFn(itemKey, newVal);
        }
      }

      if (itemKey == 'is_reconsid') {
        // 是否复议信息
        if (newVal == 'Y') {
          this.d1_1_A_BillCard.setItemVisible(
            'old_iqp_serno;is_reconsid',
            true
          );
        } else if (newVal == 'N') {
          this.d1_1_A_BillCard.setItemVisible(
            'old_iqp_serno;is_reconsid',
            false
          );
        }
      }
    },

    repayChange (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'repay_date') {
        // 还款日改变的时候
        if (newVal && (newVal > 29 || newVal < 1)) {
          this.$xutils.showMsgBox('提示', '还款日必须在1-28之间！');
          this.d1_2_BillCard.setBillCardItemClearValue('repay_date');
        }
      }

      if (itemKey == 'repay_type' && newVal != '') {
        // 还款方式为“停本付息”时，显示“停本付息期间”
        if (newVal == '12' || newVal == '13') {
          this.d1_2_BillCard.setItemVisible('stop_pint_term', true);
        } else {
          this.d1_2_BillCard.setItemValue('stop_pint_term', null);
          this.d1_2_BillCard.setItemVisible('stop_pint_term', false);
        }
      }

      if (itemKey == 'repay_term' && newVal != '') {
        // 计息周期选按周(01) 时默认为2，其他均默认为1
        if (newVal == '01') {
          this.d1_2_BillCard.setItemValue('repay_space', 'b');
        } else {
          this.d1_2_BillCard.setItemValue('repay_space', 'a');
        }
      }

      if (itemKey == 'repay_dt_type' && newVal != '') {
        // repay_dt_type 固定日该字段默认20不可修改，
        // 协商日该字段只能录入1-27
        if (newVal == '1') {
          // 固定日
          this.d1_2_BillCard.setItemValue('repay_date', '20');

          this.d1_2_BillCard.setItemEditable('repay_date', false);
        } else if (newVal == '2') {
          // 协商日 1-27
          this.d1_2_BillCard.setItemEditable('repay_date', true);
        } else if (newVal == '0') {
          this.d1_2_BillCard.setItemEditable('repay_date', true);
        }
      }

      if (itemKey == 'repay_date') {
        // 还款日为协商日时 1-27
        if (this.d1_2_BillCard.getItemValue('repay_dt_type') == '2') {
          if (newVal < 1 || newVal > 27) {
            this.$xutils.showMsgBox('提示', '协商日只能为1-27! ');
            this.d1_2_BillCard.setItemValue('repay_date', null);
          }
        }
      }

      if (itemKey == 'cap_graper_type') {
        // 本金宽限方式
        if (newVal == '1') {
          this.d1_2_BillCard.setItemVisible('cap_graper_day', true);
        } else {
          this.d1_2_BillCard.setBillCardItemClearValue('cap_graper_day');
          this.d1_2_BillCard.setItemVisible('cap_graper_day', false);
        }
      }

      if (itemKey == 'int_graper_type') {
        // 利息宽限方式
        if (newVal == '1') {
          this.d1_2_BillCard.setItemVisible('int_graper_day', true);
        } else {
          this.d1_2_BillCard.setBillCardItemClearValue('int_graper_day');
          this.d1_2_BillCard.setItemVisible('int_graper_day', false);
        }
      }

      if (itemKey == 'sub_type') {
        // 分段方式
        if (newVal == '01') {
          // 分段方式1
          this.d1_2_BillCard.setItemVisible('reserve_term', true);

          this.d1_2_BillCard.setBillCardItemClearValue('cal_term');
          this.d1_2_BillCard.setItemVisible('cal_term', false);
        } else if (newVal == '02') {
          // 分段方式2
          this.d1_2_BillCard.setItemVisible('cal_term', true);

          this.d1_2_BillCard.setItemVisible('reserve_term', false);
          this.d1_2_BillCard.setBillCardItemClearValue('reserve_term');
        }
      }

      if (itemKey == 'sbsy_mode' && newVal != '') {
        // 改变贴息方式
        if (newVal == '01') {
          // 否
          this.d1_2_BillCard.setBillCardItemClearValue(
            'sbsy_perc;sbsy_amt;sbsy_unit_name;sbsy_acct;sbsy_acct_name'
          );

          this.d1_2_BillCard.setItemVisible(
            'sbsy_perc;sbsy_amt;sbsy_unit_name;sbsy_acct;sbsy_acct_name',
            false
          );
        } else if (newVal == '02') {
          // 贴息比例
          this.d1_2_BillCard.setBillCardItemClearValue('sbsy_amt');

          this.d1_2_BillCard.setItemVisible(
            'sbsy_perc;sbsy_unit_name;sbsy_acct;sbsy_acct_name',
            true
          );
          this.d1_2_BillCard.setItemVisible('sbsy_amt', false);
        } else if (newVal == '03') {
          // 固定金额
          this.d1_2_BillCard.setBillCardItemClearValue('sbsy_perc');

          this.d1_2_BillCard.setItemVisible('sbsy_perc', false);
          this.d1_2_BillCard.setItemVisible(
            'sbsy_amt;sbsy_acct_name;sbsy_acct;sbsy_acct_name',
            true
          );
        }
      }
    },

    // 币种变化时触发方法
    curTypeChangeFn (itemKey, newVal) {
      const rtnData = this.getRatioByCurType(newVal);
      let curTypeRatio = 1; // 默认为人民币，汇率默认为1

      if (rtnData.rtnCode != '000000') {
        // 查询汇率失败的场景，设置币种以及汇率为默认的人民币
        this.$xutils.showMsgBox(
          '提示',
          '错误码：' + rtnData.rtnCode + '；错误信息：' + rtnData.rtnMsg,
          350,
          200,
          () => {
            if (itemKey == 'app_cur_type') {
              // d1_1_A_BillCard.setBillCardItemValue('app_cur_type','CNY');
              this.d1_1_A_BillCard.setBillCardItemValue('app_rate', 1);

              // 将变化的值设置进frameContext中
              this.getFactory().triggerAction({
                app_cur_type: 'CNY',
                app_rate: 1
              });

              this.setAppRateAmtByAppAmtAppRate();
            } else if (itemKey == 'bail_cur_type') {
              // d1_1_A_BillCard.setBillCardItemValue('bail_cur_type','CNY');
              this.d1_1_A_BillCard.setBillCardItemValue('exchange_rate', 1);

              // 将变化的值设置进frameContext中
              this.getFactory().triggerAction({
                bail_cur_type: 'CNY',
                exchange_rate: 1
              });

              this.setSecutityAmtChangeByExchangeRateOrSecurityAmt();
            }
          }
        );
      } else {
        curTypeRatio = rtnData.midRemit;

        // 申请币种变化时，触发申请金额变化时的方法
        if (itemKey == 'app_cur_type') {
          this.d1_1_A_BillCard.setBillCardItemValue('app_rate', curTypeRatio);

          this.getFactory().triggerAction({
            app_rate: 1
          });

          this.setAppRateAmtByAppAmtAppRate();
        } else if (itemKey == 'bail_cur_type') {
          // 保证金币种变化时，触发保证金变化
          this.d1_1_A_BillCard.setBillCardItemValue(
            'exchange_rate',
            curTypeRatio
          );

          this.getFactory().triggerAction({
            exchange_rate: curTypeRatio
          });

          this.setSecutityAmtChangeByExchangeRateOrSecurityAmt();
        }
      }
    },

    // 币种变化触发后端查询接口
    getRatioByCurType (newVal) {
      const cfgExchgRateDto = {
        old_cur_type: newVal,
        comp_cur_type: 'CNY'
      };

      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + '/api/cfgexchgrate/queryRatioByCurType',
        data: JSON.stringify(this.$xutils.toUpperCase(cfgExchgRateDto, true)),

        success: (response, status, xhr) => {
          returnData = response;
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return returnData;
    },

    // 申请金额变化时触发方法
    setAppRateAmt () {
      // 设置申请折算以及保证金相关信息
      this.setAppRateAmtByAppAmtAppRate();

      this.setSecutityAmtChangeByAppAmtOrBailRate();
      this.seRiskOpenAmtByChange();
    },

    // 申请金额/汇率变更时设置申请折算金额
    setAppRateAmtByAppAmtAppRate () {
      const app_rate = this.d1_1_A_BillCard.getBillCardItemValue('app_rate');
      const app_amt = this.d1_1_A_BillCard.getBillCardItemValue('app_amt');

      if (app_rate != '' && app_amt != '') {
        this.d1_1_A_BillCard.setBillCardItemValue(
          'app_rate_amt',
          app_rate * app_amt
        );
      }

      this.seRiskOpenAmtByChange();
    },

    // 申请金额/保证金比例 变化时触发 申请折算以及保证金相关设置
    setSecutityAmtChangeByAppAmtOrBailRate () {
      const app_amt = this.d1_1_A_BillCard.getBillCardItemValue('app_amt');
      const bail_rate = this.d1_1_A_BillCard.getBillCardItemValue('bail_rate');

      if (app_amt != '' && bail_rate != '') {
        this.d1_1_A_BillCard.setBillCardItemValue(
          'security_amt',
          app_amt * bail_rate
        );
        this.setSecutityAmtChangeByExchangeRateOrSecurityAmt();
      }

      this.seRiskOpenAmtByChange();
    },

    // 保证金汇率变化/保证金金额变化时，设置折算金额
    setSecutityAmtChangeByExchangeRateOrSecurityAmt () {
      const exchange_rate = this.d1_1_A_BillCard.getBillCardItemValue(
        'exchange_rate'
      );
      const security_amt = this.d1_1_A_BillCard.getBillCardItemValue(
        'security_amt'
      );

      if (exchange_rate != '' && security_amt != '') {
        this.d1_1_A_BillCard.setBillCardItemValue(
          'exchange_rate_amt',
          exchange_rate * security_amt
        );
      }

      this.seRiskOpenAmtByChange();
    },

    // 设置风险敞口金额
    seRiskOpenAmtByChange () {
      const app_rate_amt = this.d1_1_A_BillCard.getBillCardItemValue(
        'app_rate_amt'
      );
      const exchange_rate_amt = this.d1_1_A_BillCard.getBillCardItemValue(
        'exchange_rate_amt'
      );

      if (app_rate_amt == '') {
        this.d1_1_A_BillCard.setBillCardItemValue('risk_open_amt', '');
      } else if (app_rate_amt - exchange_rate_amt <= 0) {
        this.d1_1_A_BillCard.setBillCardItemValue('risk_open_amt', 0);
      } else {
        this.d1_1_A_BillCard.setBillCardItemValue(
          'risk_open_amt',
          app_rate_amt - exchange_rate_amt
        );
      }
    },

    // 保证金来源变化时触发方法
    isBailSourChangeFn (thisCard, newVal) {
      // 页面字段内容展示隐藏
      if (
        newVal.indexOf('0') != -1 &&
        (newVal.indexOf('1') != -1 || newVal.indexOf('2') != -1)
      ) {
        this.$xutils.showMsgBox(
          '提示',
          '【保证金来源】字段不能同时选择【无】【自有保证金/担保公司公司保证金】',
          350,
          200,
          () => {
            this.d1_1_A_BillCard.setBillCardItemValue('bail_sour', '');

            this.d1_1_A_BillCard.setBillCardItemVisible(
              'bail_rate;bail_cur_type;security_amt;exchange_rate;exchange_rate_amt;',
              false
            );

            this.d1_1_A_BillCard.setBillCardItemClearValue(
              'bail_rate;bail_cur_type;security_amt;exchange_rate;exchange_rate_amt;'
            );

            // 设置风险敞口余额
            this.seRiskOpenAmtByChange();
          }
        );
      } else if (newVal != '0' && newVal != '') {
        // 【自有担保】或【担保公司】
        this.d1_1_A_BillCard.setBillCardItemVisible(
          'bail_rate;bail_cur_type;security_amt;exchange_rate;exchange_rate_amt;',
          true
        );

        this.d1_1_A_BillCard.setBillCardItemRequired(
          'bail_rate;bail_cur_type;security_amt;exchange_rate;exchange_rate_amt;',
          true
        );

        this.d1_1_A_BillCard.setBillCardItemValue('bail_cur_type', 'CNY'); // 默认赋值人名币
        this.d1_1_A_BillCard.setBillCardItemValue('exchange_rate', 1); // 默认赋值汇率为1

        // curTypeChangeFn('bail_cur_type', d1_1_A_BillCard.getItemValue('bail_cur_type'));
        // 设置风险敞口余额
        this.seRiskOpenAmtByChange();
      } else {
        // 为空或者为【无】选项时
        this.d1_1_A_BillCard.setBillCardItemVisible(
          'bail_rate;bail_cur_type;security_amt;exchange_rate;exchange_rate_amt;',
          false
        );

        this.d1_1_A_BillCard.setBillCardItemClearValue(
          'bail_rate;bail_cur_type;security_amt;exchange_rate;exchange_rate_amt;'
        );

        // 设置风险敞口余额
        this.seRiskOpenAmtByChange();
      }

      // 保证金信息页签显示隐藏,因该页签展示需要传入对应的值进去，多选的值无法进行判断 ，因此传入特殊的标志位
      if (newVal == '1;2') {
        this.getFactory().triggerAction({
          bail_sour_flag: 'Y'
        });
      } else {
        this.getFactory().triggerAction({
          bail_sour_flag: newVal
        });
      }
    },

    getBackendData (sernoVal) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz + '/api/iqploanapp/getBaseInfoDto/' + sernoVal,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });

      return returnData;
    },

    // 获取prd信息
    getPrdInfoFromBackendServer (prdId) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/' + prdId,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });

      return returnData;
    },

    // 获取客户名称  获取一个字段
    getCusBaseFromBackendServer (cusId) {
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
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });

      return returnData;
    },

    // 获取三方额度信息
    getIqpLmtRelInfoFromBS (iqpSerno) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/iqploanapp/getIqpLmtRelInfo/' +
          iqpSerno,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = response.data;
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });

      return returnData;
    },

    // 暂存主页面
    tempSave () {
      /* 首先复制iqpserno*/
      this.d1_2_BillCard.setItemValue(
        'iqp_serno',
        this.getFactory().contextData.iqp_serno
      );

      this.d1_3_BillCard.setItemValue(
        'iqp_serno',
        this.getFactory().contextData.iqp_serno
      );

      // 在辅助信息form中,处理修改人,修改机构，修改日期 信息
      this.dealUpdInfo();

      const iqpLoanAppSaveDto = {
        // 基本信息
        iqpLoanAppBaseDto: this.$xutils.toUpperCase(
          this.d1_1_A_BillCard.getBillCardValue(),
          true
        ),

        // 还款信息
        iqpLoanAppRepay: this.$xutils.toUpperCase(
          this.d1_2_BillCard.getBillCardValue(),
          true
        ),

        // 辅助信息
        iqpLoanAppAssistDto: this.$xutils.toUpperCase(
          this.d1_3_BillCard.getBillCardValue(),
          true
        )
      };

      let bol = false;
      let url;

      if (
        this.getFactory().contextData.isReconsidSave &&
        this.getFactory().contextData.isReconsidSave == '1'
      ) {
        // 是复议
        url = this.$backend.cmisBiz + '/api/iqploanapp/addReconsidIqpLoanApp';
      } else {
        url = this.$backend.cmisBiz + '/api/iqploanapp/addIqpLoanApp';
      }

      this.$xutils.request({
        // 同步请求
        async: false,

        url: url,
        data: JSON.stringify(iqpLoanAppSaveDto),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.extend(
              this.getFactory().contextData,
              this.d1_1_A_BillCard.getBillCardValue()
            );
            bol = true;
            this.$xutils.showMsgBoxAutoClose('提示', '保存成功!');
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });

      return bol;
    },

    // 保存
    save () {
      let flag;

      if (this.d1_1_A_BillCard.validateBillCardValue()) {
        if (this.d1_2_BillCard.validateBillCardValue()) {
          if (this.d1_3_BillCard.validateBillCardValue()) {
            flag = this.tempSave();
          } else {
            this.$xutils.clickTabbItem('d1', 3);
          }
        } else {
          this.$xutils.clickTabbItem('d1', 2);
        }
      } else {
        this.$xutils.clickTabbItem('d1', 1);
      }

      return flag;
    },

    // 页面初始化
    initThisPage () {
      // 调页面监听事件
      this.baseChange(
        null,
        'guar_way',
        null,
        this.d1_1_A_BillCard.getItemValue('guar_way')
      );

      this.baseChange(
        null,
        'is_authorize',
        null,
        this.d1_1_A_BillCard.getItemValue('is_authorize')
      );

      this.baseChange(
        null,
        'chnl_sour',
        null,
        this.d1_1_A_BillCard.getItemValue('chnl_sour')
      );
      this.baseChange(
        null,
        'app_amt',
        null,
        this.d1_1_A_BillCard.getItemValue('app_amt')
      );
      this.baseChange(
        null,
        'bail_rate',
        null,
        this.d1_1_A_BillCard.getItemValue('bail_rate')
      );

      this.baseChange(
        null,
        'ir_accord_type',
        null,
        this.d1_1_A_BillCard.getItemValue('ir_accord_type')
      );

      this.baseChange(
        null,
        'ir_float_type',
        null,
        this.d1_1_A_BillCard.getItemValue('ir_float_type')
      );

      this.baseChange(
        null,
        'overdue_float_type',
        null,
        this.d1_1_A_BillCard.getItemValue('overdue_float_type')
      );

      this.baseChange(
        null,
        'default_float_type',
        null,
        this.d1_1_A_BillCard.getItemValue('default_float_type')
      );

      this.baseChange(
        null,
        'ir_adjust_type',
        null,
        this.d1_1_A_BillCard.getItemValue('ir_adjust_type')
      );

      this.baseChange(
        null,
        'overdue_rate',
        null,
        this.d1_1_A_BillCard.getItemValue('overdue_rate')
      );

      this.baseChange(
        null,
        'overdue_point',
        null,
        this.d1_1_A_BillCard.getItemValue('overdue_point')
      );

      this.baseChange(
        null,
        'default_rate',
        null,
        this.d1_1_A_BillCard.getItemValue('guardefault_rate_way')
      );

      this.baseChange(
        null,
        'default_point',
        null,
        this.d1_1_A_BillCard.getItemValue('default_point')
      );

      this.baseChange(
        null,
        'reality_ir_y',
        null,
        this.d1_1_A_BillCard.getItemValue('reality_ir_y')
      );

      this.baseChange(
        null,
        'bail_sour',
        null,
        this.d1_1_A_BillCard.getItemValue('bail_sour')
      );
      this.baseChange(
        null,
        'rate_type',
        null,
        this.d1_1_A_BillCard.getItemValue('rate_type')
      );

      this.baseChange(
        null,
        'is_cfirm_pay_way',
        null,
        this.d1_1_A_BillCard.getItemValue('is_cfirm_pay_way')
      );

      // baseChange(null,'app_cur_type',null,d1_1_A_BillCard.getItemValue('app_cur_type'));
      this.baseChange(
        null,
        'is_reconsid',
        null,
        this.d1_1_A_BillCard.getItemValue('is_reconsid')
      );

      this.baseChange(
        null,
        'is_green_type',
        null,
        this.d1_1_A_BillCard.getItemValue('is_green_type')
      );

      this.repayChange(
        null,
        'repay_type',
        null,
        this.d1_2_BillCard.getItemValue('repay_type')
      );
      this.repayChange(
        null,
        'repay_term',
        null,
        this.d1_2_BillCard.getItemValue('repay_term')
      );

      this.repayChange(
        null,
        'repay_dt_type',
        null,
        this.d1_2_BillCard.getItemValue('repay_dt_type')
      );

      this.repayChange(
        null,
        'sbsy_mode',
        null,
        this.d1_2_BillCard.getItemValue('sbsy_mode')
      );
      this.repayChange(
        null,
        'repay_date',
        null,
        this.d1_2_BillCard.getItemValue('repay_date')
      );

      this.repayChange(
        null,
        'cap_graper_type',
        null,
        this.d1_2_BillCard.getItemValue('cap_graper_type')
      );

      this.repayChange(
        null,
        'sub_type',
        null,
        this.d1_2_BillCard.getItemValue('sub_type')
      );

      this.repayChange(
        null,
        'int_graper_type',
        null,
        this.d1_2_BillCard.getItemValue('int_graper_type')
      );

      this.repayChange(
        null,
        'repay_date',
        null,
        this.d1_2_BillCard.getItemValue('repay_date')
      );

      // 复议页面初始化
      this.initConsiderPage();
    },

    // 提交按钮
    commit () {
      // 暂存->保存->提交
      const flag = this.save();

      if (flag) {
        // 提交之前 的检查
        const checkFlag = this.checkBeforeCommit(
          this.d1_1_A_BillCard.getItemValue('iqp_serno')
        );

        if (!checkFlag) {
          return;
        }

        // 校验客户信息
        const loginUser = this.$xutils.getLoginUserInfo();

        const cusBaseInfo = this.getCusBaseFromBackendServer(
          this.d1_1_A_BillCard.getItemValue('cus_id')
        );

        if (!cusBaseInfo) {
          this.$xutils.showMsgBox(
            '提示',
            '申请客户不存在,请检查！客户编号:' +
              this.d1_1_A_BillCard.getItemValue('cus_id')
          );
          return;
        }

        const cusName = cusBaseInfo.cus_name;

        const rsPars = {
          systemId: 'cmis',
          orgId: loginUser.orgId,
          bizId: this.d1_1_A_BillCard.getItemValue('iqp_serno'),

          // 流程申请类型会自动创建队列
          bizType: 'IQP_SINGLE_BATCH_APP',

          // "bizType": "xianglei_test",
          // "param": {"test":"XIANGLEI_TEST"},//流程参数
          userId: loginUser.loginCode,

          bizUserName: cusName,
          bizUserId: this.d1_1_A_BillCard.getItemValue('cus_id')
        };

        this.$xutils.wfInit(rsPars, () => {
          this.$xutils.getParentPage2(
            this,
            'd1_BillList',
            'queryDataByCondition'
          );
          this.$xutils.getParentPage(this, null, 'back');
        });
      }
    },

    // 提交前校验
    checkBeforeCommit (iqpSerno) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/iqploanapp/checkBeforeCommit/' +
          iqpSerno,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data && response.data == 'ok') {
              returnData = true;
            }
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });

      return returnData;
    },

    dealUpdInfo () {
      const userInfo = this.$xutils.getLoginUserInfo();
      this.d1_3_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_3_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_3_BillCard.setItemValue(
        'upd_date',
        this.$xutils.dateFormat('yyyy-MM-dd', new Date())
      );
    },

    // 设置页面是否编辑
    initByContextOp (op) {
      if (op == 'VIEW' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        this.setPageEditable(false);
      }
    },

    // 初始化复议信息
    initConsiderPage () {
      if (
        this.getFactory().contextData.isReconsidSave &&
        this.getFactory().contextData.isReconsidSave == '1'
      ) {
        // 点击复议操作，且 不是复议状态
        if (!this.d1_1_A_BillCard.getItemValue('old_iqp_serno')) {
          // 如果没有旧流水号,说明未保存
          this.d1_1_A_BillCard.setItemValue(
            'old_iqp_serno',
            this.getFactory().contextData.iqp_serno
          );

          this.d1_1_A_BillCard.setItemValue('is_reconsid', 'Y');
          this.d1_1_A_BillCard.setItemVisible(
            'old_iqp_serno;is_reconsid',
            true
          );

          // 设置新的流水编号
          const serno = this.$xutils.getSEQWithParamFromServer('YPSEQ', {
            biz: this.d1_1_A_BillCard.getItemValue('chnl_sour')
          });

          var iqp_serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO', {
            bizType: this.d1_1_A_BillCard.getItemValue('biz_type')
          });

          this.d1_1_A_BillCard.setItemValue('serno', serno);
          this.d1_1_A_BillCard.setItemValue('iqp_serno', iqp_serno);
          this.d1_1_A_BillCard.setItemValue('approve_state', '000');
        }
      }
    },

    // 多阶段固定利率删除
    doDelete () {
      this.d1_1_B_BillList.onBillListLogicDelete();
    },

    // 是否来自流程页面打开
    // 是流程页面先把frameContext.op 设置为VIEW 不可编辑,设置是流程进入标识
    // 取岗位条件,设置是否可以编辑
    // 根据flowCode  判定具体流程
    isFromFlowPage () {
      this.getFactory().contextData.fromFlow = 'N'; // 设置初始值   Y 从流程页面打开;N 一般申请打开

      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            this.getFactory().contextData.iqp_serno = this.getFactory().contextData.flowData.instanceInfo.bizId;
            this.getFactory().contextData.op = 'VIEW';

            // 塞入流程参数
            this.getFactory().contextData['showOpinion'] = 'N';

            this.getFactory().contextData.fromFlow = 'Y';
          }
        }
      }
    },

    // 设置页面可否编辑
    setPageEditable (bol) {
      this.d1_1_A_BillCard.setItemEditable('*', bol);
      this.d1_2_BillCard.setItemEditable('*', bol);
      this.d1_3_BillCard.setItemEditable('*', bol);
      this.d1_1_B_BillList.setBillListButtonEnable('新增', bol);
      this.d1_1_B_BillList.setBillListButtonEnable('删除', bol);
      this.getFactory().setButtonVisiable('tempSave', false);
      this.getFactory().setButtonVisiable('save', false);
      this.getFactory().setButtonVisiable('commit', false);
      this.getFactory().setButtonVisiable('back', false);
    },

    // 如果存在则设置三方信息
    initThirdInfo () {
      const iqpLmtRelInfo = this.getIqpLmtRelInfoFromBS(
        this.getFactory().contextData.iqp_serno
      );

      if (iqpLmtRelInfo.thirdLimitId) {
        // 如果存在三方信息
        this.d1_1_A_BillCard.setItemValue(
          'third_limit_type',
          iqpLmtRelInfo.thirdLimitType
        );

        this.d1_1_A_BillCard.setItemValue(
          'third_limit_id',
          iqpLmtRelInfo.thirdLimitId
        );
        this.d1_1_A_BillCard.setItemValue(
          'third_limit_name',
          iqpLmtRelInfo.thirdLimitName
        );
        this.d1_1_A_BillCard.setItemVisible(
          'third_limit_type;third_limit_id;third_limit_name',
          true
        );
      } else {
        this.d1_1_A_BillCard.setItemVisible(
          'third_limit_type;third_limit_id;third_limit_name',
          false
        );
      }
    },

    // 新增功能
    doInsert () {
      this.$xutils.showMsgBox('提示', '可编辑表格功能暂不支持，开发组开发中~');
    },

    // 流程中加入 合同和放款模板,设置合同号和放款流水号 初始化frameContext 参数
    initFrameContextParam () {
      this.getFactory().contextData.bail_sour_flag = '0'; // 设定保证金页签不显示的初始值
      const contAndPvpInfo = this.singleBatchGetContAndPvpInfo(
        this.getFactory().contextData.iqp_serno
      );

      if (contAndPvpInfo) {
        // 如果存在返回值   塞值
        if (contAndPvpInfo.cont_no) {
          // 合同签订页签
          this.getFactory().contextData.cont_no = contAndPvpInfo.cont_no;

          if (contAndPvpInfo.cont_status == '100') {
            this.getFactory().contextData.myop = 'SINGLEBATCH';
          } else {
            this.getFactory().contextData.myop = 'SINGLEBATCHPVP'; // 合同签订页签
          }
        }

        if (contAndPvpInfo.pvp_serno) {
          this.getFactory().contextData.pvp_serno = contAndPvpInfo.pvp_serno;
          this.getFactory().contextData.myop = 'SINGLEBATCHPVP'; // 合同签订页签
        }
      }
    },

    // 获取后台 的cont_no 和 pvp_serno
    singleBatchGetContAndPvpInfo (iqpSerno) {
      let result = null;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/ctrloancont/singleBatchGetContAndPvpInfo/' +
          iqpSerno,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            result = response.data;
          } else {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });

      return result;
    }
  }
};
</script>
