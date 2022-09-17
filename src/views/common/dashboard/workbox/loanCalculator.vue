<template>
  <!--
    @created by tangxun 2021-06-12
    @updated by
    @description 贷款计算器
  -->
  <yu-tabs v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="等额本息还款法" name="first">
      <yu-xform ref="refForm1" label-width="120px" v-model="formdata1" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="贷款类别" placeholder="贷款类别" name="loanType" rules="required" ctype="select" :options="[{ key: '1', value: '商业贷款' }, { key: '2', value: '公积金' }, { key: '3', value: '组合型' }]" value="1"></yu-xform-item>
          <yu-xform-item label="计算方式" placeholder="计算方式" name="calType" rules="required" colspan="12" ctype="radio" :options="options.calType"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="商业性" placeholder="商业性" name="busiAmt" @change="formdata1.loanAmt = accAdd(formdata1.busiAmt, formdata1.accAmt)" rules="required" ctype="yu-num" number-formatter="0,000.00" unit="元" :hidden="formdata1.loanType != 3"></yu-xform-item>
          <yu-xform-item label="公积金" placeholder="公积金" name="accAmt" @change="formdata1.loanAmt = accAdd(formdata1.busiAmt, formdata1.accAmt)" rules="required" ctype="yu-num" number-formatter="0,000.00" unit="元" :hidden="formdata1.loanType != 3"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="单价" placeholder="单价" name="price" rules="required" ctype="yu-num" unit="元/平方" :hidden="formdata1.calType != 1"></yu-xform-item>
          <yu-xform-item label="面积" placeholder="面积" name="area" rules="required" ctype="yu-num" unit="平方米" :hidden="formdata1.calType != 1"></yu-xform-item>
          <yu-xform-item label="按揭成数" placeholder="按揭成数" name="percent" rules="required" ctype="select" :options="options.percent" :hidden="formdata1.calType != 1"></yu-xform-item>
          <yu-xform-item label="贷款总额" placeholder="贷款总额" name="loanAmt" :disabled="formdata1.loanType == 3" rules="required" ctype="yu-num" unit="元" :hidden="formdata1.calType != 2"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="公积金按揭月数" placeholder="公积金按揭月数" @change="changeMon" name="accMonNum" :rules="[{ required: true, message: '字段不能为空' }, { max: 360, type: 'number', message: '最长不超过360月', trigger: 'blur' }]" ctype="yu-currency" unit="月" :hidden="formdata1.loanType == 1"></yu-xform-item>
          <yu-xform-item label="公积金利率" placeholder="公积金利率" name="accRate" rules="required" filterable allow-create ctype="select" :options="options.accRate" :hidden="formdata1.loanType == 1"></yu-xform-item>
          <yu-xform-item label="按揭月数" placeholder="按揭月数" name="monNum" rules="required" ctype="yu-num" precision="0" unit="月" :hidden="formdata1.loanType == 2"></yu-xform-item>
          <yu-xform-item label="贷款年利率" placeholder="贷款年利率" name="yrate" rules="required" ctype="yu-num" number-formatter="00.00%" :hidden="formdata1.loanType == 2"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn(1)">开始计算</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="resetFn(1)">重置</yu-button>
        </div>
      </yu-xform>
      <el-divider content-position="left">计算结果</el-divider>
      <yu-xform ref="detailForm1" label-width="120px" v-model="detailForm1" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="房屋总价" name="fangkuanTotal" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款总额" name="daikuanTotal" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="还款总额" name="allTotal" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="支付利息款" name="accrual" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="首期付款" name="moneyFirst" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="贷款月数" name="month" ctype="input"></yu-xform-item>
          <yu-xform-item label="月均还款" name="monthMoney" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-tab-pane>
    <yu-tab-pane label="等额本金还款法" name="second">
      <yu-xform ref="refForm2" label-width="120px" v-model="formdata2" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="贷款类别" placeholder="贷款类别" name="loanType" rules="required" ctype="select" :options="[{ key: '1', value: '商业贷款' }, { key: '2', value: '公积金' }, { key: '3', value: '组合型' }]" value="1"></yu-xform-item>
          <yu-xform-item label="计算方式" placeholder="计算方式" name="calType" rules="required" colspan="12" ctype="radio" :options="options.calType"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="商业性" placeholder="商业性" name="busiAmt" @change="formdata2.loanAmt = accAdd(formdata2.busiAmt, formdata2.accAmt)" rules="required" ctype="yu-num" number-formatter="0,000.00" unit="元" :hidden="formdata2.loanType != 3"></yu-xform-item>
          <yu-xform-item label="公积金" placeholder="公积金" name="accAmt" @change="formdata2.loanAmt = accAdd(formdata2.busiAmt, formdata2.accAmt)" rules="required" ctype="yu-num" number-formatter="0,000.00" unit="元" :hidden="formdata2.loanType != 3"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="单价" placeholder="单价" name="price" rules="required" ctype="yu-num" unit="元/平方" :hidden="formdata2.calType != 1"></yu-xform-item>
          <yu-xform-item label="面积" placeholder="面积" name="area" rules="required" ctype="yu-num" unit="平方米" :hidden="formdata2.calType != 1"></yu-xform-item>
          <yu-xform-item label="按揭成数" placeholder="按揭成数" name="percent" rules="required" ctype="select" :options="options.percent" :hidden="formdata2.calType != 1"></yu-xform-item>
          <yu-xform-item label="贷款总额" placeholder="贷款总额" name="loanAmt" :disabled="formdata2.loanType == 3" rules="required" ctype="yu-num" unit="元" :hidden="formdata2.calType != 2"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="公积金按揭月数" placeholder="公积金按揭月数" @change="changeMon" name="accMonNum" :rules="[{ required: true, message: '字段不能为空' }, { max: 360, type: 'number', message: '最长不超过360月', trigger: 'blur' }]" ctype="yu-currency" unit="月" :hidden="formdata2.loanType == 1"></yu-xform-item>
          <yu-xform-item label="公积金利率" placeholder="公积金利率" name="accRate" rules="required" filterable allow-create ctype="select" :options="options.accRate" :hidden="formdata2.loanType == 1"></yu-xform-item>
          <yu-xform-item label="按揭月数" placeholder="按揭月数" name="monNum" rules="required" ctype="yu-num" precision="0" unit="月" :hidden="formdata2.loanType == 2"></yu-xform-item>
          <yu-xform-item label="贷款年利率" placeholder="贷款年利率" name="yrate" rules="required" ctype="yu-num" number-formatter="00.00%" :hidden="formdata2.loanType == 2"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn(2)">开始计算</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="resetFn(2)">重置</yu-button>
        </div>
      </yu-xform>
      <el-divider content-position="left">计算结果</el-divider>
      <yu-xform ref="detailForm2" label-width="120px" v-model="detailForm2" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="房屋总价" name="fangkuanTotal" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款总额" name="daikuanTotal" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="还款总额" name="allTotal" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="支付利息款" name="accrual" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="首期付款" name="moneyFirst" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="贷款月数" name="month" ctype="input"></yu-xform-item>
          <yu-xform-item label="月还金额" name="monthMoney" style="white-space: pre-line;" ctype="textarea" :rows="5" :colspan="24"></yu-xform-item>
          <!--<yu-xform-item label="月还金额" ctype="custom" colspan="24">
             <yu-timeline>
                <yu-timeline-item title="￥990.00" v-for="(item, index) in 360" :key="`timelineItems${index}`" :timeline-items="timelineItems" date="2018-10-10"></yu-timeline-item>
            </yu-timeline>
          </yu-xform-item>-->
        </yu-xform-group>
      </yu-xform>
    </yu-tab-pane>
    <yu-tab-pane label="提前还贷计算器(新利率)" name="third">
      <yu-xform ref="refForm3" label-width="120px" v-model="formdata3" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="贷款总额" placeholder="贷款总额" name="loanAmt" rules="required" ctype="yu-num" unit="万元"></yu-xform-item>
          <yu-xform-item label="原贷款期限" placeholder="原贷款期限" name="oldLoanTerm" @change="changeMon3" rules="required" ctype="select" :options="options.oldLoanTerm"></yu-xform-item>
          <yu-xform-item label="贷款类别" placeholder="贷款类别" name="loanType" rules="required" ctype="radio" :options="[{ key: '1', value: '公积金贷款' }, { key: '2', value: '商业性贷款' }]" value="2"></yu-xform-item>
          <yu-xform-item label="贷款年利率" placeholder="贷款年利率" name="yrate" rules="required" ctype="yu-num" number-formatter="00.00%" :hidden="formdata3.loanType == 1"></yu-xform-item>
          <yu-xform-item label="公积金利率" placeholder="公积金利率" name="yrate" rules="required" filterable allow-create ctype="select" :options="options.accRate" :hidden="formdata3.loanType == 2"></yu-xform-item>
          <yu-xform-item label="第一次还款时间" placeholder="日期" name="repayDate" rules="required" ctype="datepicker" type="month"></yu-xform-item>
          <yu-xform-item label="预计提前还款时间" placeholder="日期" name="prepayDate" rules="required" ctype="datepicker" type="month"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="还款方式" placeholder="还款方式" name="repayWay" rules="required" ctype="radio" :options="options.repayWay"></yu-xform-item>
          <yu-xform-item label="提前还款金额" placeholder="不含当月应还款额" name="repayAmt" rules="required" ctype="yu-num" number-formatter="0,000.00" unit="万元" :hidden="formdata3.repayWay != 2"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="处理方式" :colspan="24" placeholder="处理方式" rules="required" name="dealWay" ctype="radio" :options="options.dealWay" :hidden="formdata3.repayWay != 2"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn(3)">开始计算</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="resetFn(3)">重置</yu-button>
        </div>
      </yu-xform>
      <el-divider content-position="left">计算结果</el-divider>
      <yu-xform ref="detailForm3" label-width="120px" v-model="detailForm3" form-type="details">
        <yu-xform-group>
          <yu-xform-item label="原月还款额" name="ykhke" ctype="yu-num" number-formatter="0,000.00" value="0" unit="元"></yu-xform-item>
          <yu-xform-item label="该月一次还款额" name="gyyihke" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="原最后还款期" name="yzhhkq" ctype="input"></yu-xform-item>
          <yu-xform-item label="下月起月还款额" name="xyqyhke" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="已还款总额" name="yhkze" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="新的最后还款期" name="xdzhhkq" ctype="input"></yu-xform-item>
          <yu-xform-item label="已还利息额" name="yhlxe" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="节省利息支出" name="jslxzc" ctype="yu-num" number-formatter="0,000.00" value="0"></yu-xform-item>
          <yu-xform-item label="计算结果提示" name="jsjgts" style="white-space: pre-line;" ctype="textarea" :colspan="24" :rows="5"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      activeName: 'first',
      // 字典项
      options: {
        calType: [{ key: '1', value: '面积、单价' }, { key: '2', value: '贷款总额' }],
        percent: [],
        oldLoanTerm: [],
        accRate: [],
        repayWay: [{ key: '1', value: '一次提前还清' }, { key: '2', value: '部分提前还款' }],
        dealWay: [{ key: '1', value: '缩短还款年限，月还款额基本不变' }, { key: '2', value: '减少月还款额，还款期不变' }]
      },
      // 输入参数
      formdata1: {},
      formdata2: {},
      formdata3: {},
      // 输出结果
      detailForm1: {},
      detailForm2: {},
      detailForm3: {},
      // 公积金贷款年利率1-5
      accRate1: 2.75,
      // 公积金贷款年利率6-30
      accRate2: 3.25,
      // 计算方法
      methods: {
        calcMethod1: this.acmCalc, // 等额本息
        calcMethod2: this.eppCalc, // 等额本金
        calcMethod3: this.earlyCalc // 提前还贷
      }
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  created () {
    // 页面创建,字典初始化
    let oldLoanTerm = [];
    for (let i = 2; i <= 30; i++) {
      let count = i * 12;
      let item = {
        key: count.toString(),
        value: `${i}年(${count}期)`
      };
      oldLoanTerm.push(item);
    }
    this.options.oldLoanTerm = oldLoanTerm;

    let percent = [];
    for (let i = 2; i <= 9; i++) {
      let item = {
        key: i.toString(),
        value: `${i}成`
      };
      percent.push(item);
    }
    this.options.percent = percent;
  },
  mounted () {
    let _this = this;
    _this.$nextTick(function () {
      _this.formdata1.accMonNum = 360;
      _this.formdata1.calType = '2';
      _this.formdata1.monNum = 360;
      _this.formdata1.yrate = 4.65;
      _this.formdata2.accMonNum = 360;
      _this.formdata2.calType = '2';
      _this.formdata2.monNum = 360;
      _this.formdata2.yrate = 4.65;
    });
  },
  methods: {
    /** 计算结果 */
    saveFn (index) {
      let _this = this;
      let validate = false;
      _this.$refs['refForm' + index].validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      this.methods['calcMethod' + index]();
    },
    /** 等额本息计算方法 */
    acmCalc () {
      let model = {};
      if (this.formdata1.loanType == '3') {
        // --  组合型贷款(组合型贷款的计算，只和商业贷款额、和公积金贷款额有关，和按贷款总额计算无关)
        // 房款总额
        model.fangkuanTotal = '略';
        // 首期付款
        model.moneyFirst = 0;
        // 贷款总额
        model.daikuanTotal = this.accAdd(this.formdata1.busiAmt, this.formdata1.accAmt);
        // 贷款月数
        model.month = Math.max(this.formdata1.monNum, this.formdata1.accMonNum) + '(月)';
        // 月均还款
        let monthMoney = this.getMonthMoneyAcc(this.getRate(this.formdata1.yrate), this.formdata1.busiAmt, this.formdata1.monNum); // 调用函数计算
        let accmonthMoney = this.getMonthMoneyAcc(this.getRate(this.formdata1.accRate), this.formdata1.accAmt, this.formdata1.accMonNum); // 调用函数计算
        model.monthMoney = this.accAdd(monthMoney, accmonthMoney);
        // 还款总额
        model.allTotal = this.accAdd(this.accMul(monthMoney, this.formdata1.monNum), this.accMul(accmonthMoney, this.formdata1.accMonNum));
      } else {
        // --  商业贷款
        let rate = this.getRate(this.formdata1.yrate); // 得到利率
        let month = this.formdata1.monNum; // 得到贷款期限
        if (this.formdata1.loanType == '2') {
          // 公积金贷款
          rate = this.getRate(this.formdata1.accRate); // 得到利率
          month = this.formdata1.accMonNum; // 得到贷款期限
        }
        if (this.formdata1.calType == '1') {
          // ------------ 根据单价面积计算
          // 房款总额
          model.fangkuanTotal = this.accMul(this.formdata1.price, this.formdata1.area);
          // 贷款总额
          model.daikuanTotal = this.accMul(model.fangkuanTotal, this.accDiv(this.formdata1.percent, 10));
          // 首期付款
          model.moneyFirst = this.subtr(model.fangkuanTotal, model.daikuanTotal);
        } else {
          // ------------ 根据贷款总额计算
          // 房款总额
          model.fangkuanTotal = '略';
          // 贷款总额
          model.daikuanTotal = this.formdata1.loanAmt;
          // 首期付款
          model.moneyFirst = 0;
        }
        // 贷款月数
        model.month = month + '(月)';
        // 月均还款
        model.monthMoney = this.getMonthMoneyAcc(rate, model.daikuanTotal, month); // 调用函数计算
        // 还款总额
        model.allTotal = this.accMul(model.monthMoney, month);
      }
      // 支付利息款
      model.accrual = this.subtr(model.allTotal, model.daikuanTotal);
      yufp.clone(model, this.detailForm1);
    },
    /** 等额本金计算方法 */
    eppCalc () {
      let model = {};
      if (this.formdata2.loanType == '3') {
        // --  组合型贷款(组合型贷款的计算，只和商业贷款额、和公积金贷款额有关，和按贷款总额计算无关)
        // 房款总额
        model.fangkuanTotal = '略';
        // 首期付款
        model.moneyFirst = 0;
        // 贷款总额
        model.daikuanTotal = this.accAdd(this.formdata2.busiAmt, this.formdata2.accAmt);
        // 贷款月数
        model.month = Math.max(this.formdata2.monNum, this.formdata2.accMonNum) + '(月)';

        let allTotal = 0;
        let monthMoney = '';
        for (let j = 0; j < Math.max(this.formdata2.monNum, this.formdata2.accMonNum); j++) {
          // 调用函数计算: 本金月还款额
          let huankuan = this.accAdd(this.getMonthMoneyEpp(this.getRate(this.formdata2.yrate), this.formdata2.busiAmt, this.formdata2.monNum, j), this.getMonthMoneyEpp(this.getRate(this.formdata2.accRate), this.formdata2.accAmt, this.formdata2.accMonNum, j)).toFixed(2);
          allTotal = this.accAdd(allTotal, huankuan);
          monthMoney += j + 1 + '月  ' + huankuan + '(元)';
          if ((j + 1) % 4 == 0) {
            monthMoney += '\n';
          } else {
            monthMoney += ',';
          }
        }
        // 月均还款
        model.monthMoney = monthMoney; // 调用函数计算
        // 还款总额
        model.allTotal = allTotal;
      } else {
        // --  商业贷款
        let rate = this.getRate(this.formdata2.yrate); // 得到利率
        let month = this.formdata2.monNum; // 得到贷款期限
        if (this.formdata2.loanType == '2') {
          // 公积金贷款
          rate = this.getRate(this.formdata2.accRate); // 得到利率
          month = this.formdata2.accMonNum; // 得到贷款期限
        }
        if (this.formdata2.calType == '1') {
          // ------------ 根据单价面积计算
          // 房款总额
          model.fangkuanTotal = this.accMul(this.formdata2.price, this.formdata2.area);
          // 贷款总额
          model.daikuanTotal = this.accMul(model.fangkuanTotal, this.accDiv(this.formdata2.percent, 10));
          // 首期付款
          model.moneyFirst = this.subtr(model.fangkuanTotal, model.daikuanTotal);
        } else {
          // ------------ 根据贷款总额计算
          // 房款总额
          model.fangkuanTotal = '略';
          // 贷款总额
          model.daikuanTotal = this.formdata2.loanAmt;
          // 首期付款
          model.moneyFirst = 0;
        }
        // 贷款月数
        model.month = month + '(月)';
        let allTotal = 0;
        let monthMoney = '';
        for (let j = 0; j < month; j++) {
          // 调用函数计算: 本金月还款额
          let huankuan = this.getMonthMoneyEpp(rate, model.daikuanTotal, month, j).toFixed(2);
          allTotal = this.accAdd(allTotal, huankuan);
          monthMoney += j + 1 + '月  ' + huankuan + '(元)';
          if ((j + 1) % 4 == 0) {
            monthMoney += '\n';
          } else {
            monthMoney += ',';
          }
        }
        // 月均还款
        model.monthMoney = monthMoney; // 调用函数计算
        // 还款总额
        model.allTotal = allTotal;
      }
      // 支付利息款
      model.accrual = this.subtr(model.allTotal, model.daikuanTotal);
      yufp.clone(model, this.detailForm2);
    },
    /** 提前还贷计算方法 */
    earlyCalc () {
      // 原贷款期数
      let syhkqs = this.formdata3.oldLoanTerm;
      // 贷款总额
      let dkzys = this.formdata3.loanAmt * 10000;
      let dklv = this.accDiv(this.getRate(this.formdata3.yrate), 12);
      // 已还贷款期数
      let yhdkqs = this.accAdd(this.accMul(this.formdata3.prepayDate.getFullYear(), 12), this.formdata3.prepayDate.getMonth()) - this.accAdd(this.accMul(this.formdata3.repayDate.getFullYear(), 12), this.formdata3.repayDate.getMonth());
      if (yhdkqs < 0 || yhdkqs > syhkqs) {
        this.$message({ message: '预计提前还款时间与第一次还款时间有矛盾，请查实', type: 'error' });
        return false;
      }
      // 已还款金额
      let yhk = (dkzys * (dklv * Math.pow(1 + dklv, syhkqs))) / (Math.pow(1 + dklv, syhkqs) - 1);
      // 原最后还款期
      let yhkjssj = Math.floor(((this.formdata3.repayDate.getFullYear() * 12) + this.formdata3.repayDate.getMonth() + syhkqs - 1) / 12) + '年' + ((((this.formdata3.repayDate.getFullYear() * 12) + this.formdata3.repayDate.getMonth() + syhkqs - 1) % 12) + 1) + '月';
      let yhdkys = yhk * yhdkqs;

      let yhlxs = 0;
      let yhbjs = 0;
      for (let i = 1; i <= yhdkqs; i++) {
        yhlxs = this.accAdd(yhlxs, this.accMul(this.subtr(dkzys, yhbjs), dklv));
        yhbjs = this.accAdd(yhbjs, this.subtr(yhk, this.accMul(this.subtr(dkzys, yhbjs), dklv)));
      }
      let remark = '';
      let byhk;
      let xyhk;
      let jslx;
      let xdkjssj;
      if (this.formdata3.repayWay == '2') {
        let tqhkys = parseInt(this.formdata3.repayAmt) * 10000;
        if (tqhkys + yhk >= (dkzys - yhbjs) * (1 + dklv)) {
          remark = '您的提前还款额已足够还清所欠贷款！';
        } else {
          yhbjs = yhbjs + yhk;
          byhk = yhk + tqhkys;
          if (this.formdata3.dealWay == '1') {
            // 缩短还款年限，月还款额基本不变
            let yhbjstemp = yhbjs + tqhkys;
            let xdkqs;
            for (xdkqs = 0; yhbjstemp <= dkzys; xdkqs++) {
              yhbjstemp = this.subtr(this.accAdd(yhbjstemp, yhk), this.accMul(this.subtr(dkzys, yhbjstemp), dklv));
            }
            xdkqs = xdkqs - 1;
            xyhk = ((dkzys - yhbjs - tqhkys) * (dklv * Math.pow(1 + dklv, xdkqs))) / (Math.pow(1 + dklv, xdkqs) - 1);
            // jslx = yhk * syhkqs - yhdkys - byhk - xyhk * xdkqs;
            jslx = this.subtr(this.subtr(this.subtr(this.accMul(yhk, syhkqs), yhdkys), byhk), this.accMul(xyhk, xdkqs));
            // xdkjssj = Math.floor((this.formdata3.prepayDate.getFullYear() * 12 + this.formdata3.prepayDate.getMonth() + xdkqs - 1) / 12) + '年' + ((this.formdata3.repayDate.getFullYear() * 12 + this.formdata3.repayDate.getMonth() + xdkqs - 1) % 12 + 1) + '月';
            xdkjssj = Math.floor(((this.formdata3.prepayDate.getFullYear() * 12) + this.formdata3.prepayDate.getMonth() + xdkqs - 1) / 12) + '年' + ((((this.formdata3.repayDate.getFullYear() * 12) + this.formdata3.repayDate.getMonth() + xdkqs - 1) % 12) + 1) + '月';
          } else {
            // 减少月还款额，还款期不变
            xyhk = ((dkzys - yhbjs - tqhkys) * (dklv * Math.pow(1 + dklv, syhkqs - yhdkqs))) / (Math.pow(1 + dklv, syhkqs - yhdkqs) - 1);
            jslx = this.subtr(this.subtr(this.subtr(this.accMul(yhk, syhkqs), yhdkys), byhk), this.accMul(xyhk, this.subtr(syhkqs, yhdkqs)));
            xdkjssj = yhkjssj;
          }
        }
      }

      if (this.formdata3.repayWay == '1' || remark != '') {
        byhk = (dkzys - yhbjs) * (1 + dklv);
        xyhk = 0;
        jslx = this.subtr(this.subtr(this.accMul(yhk, syhkqs), yhdkys), byhk);
        xdkjssj = this.formdata3.prepayDate.getFullYear() + '年' + this.formdata3.prepayDate.getMonth() + '月';
      }
      let model = {};
      model.ykhke = Math.round(yhk * 100) / 100;
      model.yhkze = Math.round(yhdkys * 100) / 100;
      model.yhlxe = Math.round(yhlxs * 100) / 100;
      model.gyyihke = Math.round(byhk * 100) / 100;
      model.xyqyhke = Math.round(xyhk * 100) / 100;
      model.jslxzc = Math.round(jslx * 100) / 100;
      model.yzhhkq = yhkjssj;
      model.xdzhhkq = xdkjssj;
      model.jsjgts = remark;
      yufp.clone(model, this.detailForm3);
    },
    // 本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 / 贷款当前月0～length-1)
    getMonthMoneyEpp (rate, total, month, curMonth) {
      if (curMonth > month) {
        return 0;
      }
      var rateMonth = this.accDiv(rate, 12); // 月利率
      var benjinMoney = this.accDiv(total, month);
      // (total - benjinMoney * curMonth) * rateMonth + benjinMoney
      return this.accAdd(this.accMul(this.subtr(total, this.accMul(benjinMoney, curMonth)), rateMonth), benjinMoney);
    },
    // 本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
    getMonthMoneyAcc (rate, total, month) {
      var rateMonth = this.accDiv(rate, 12); // 月利率
      return this.accDiv(this.accMul(this.accMul(total, rateMonth), Math.pow(1 + rateMonth, month)), Math.pow(1 + rateMonth, month) - 1);
    },
    /** 获取利率 */
    getRate (rate) {
      return this.accDiv(rate, 100);
    },
    /** 表单重置 */
    resetFn (index) {
      this.$refs['refForm' + index].resetFields();
      this.$refs['detailForm' + index].resetFields();
      this.formdata1.loanType = '1';
      this.formdata1.calType = '2';
      // this.formdata1.loanAmt = 0;
      this.formdata1.yrate = 4.65;
      this.formdata1.monNum = 360;
      this.formdata1.percent = [];
      this.formdata2.loanType = '1';
      this.formdata2.calType = '2';
      // this.formdata2.loanAmt = 0;
      this.formdata2.yrate = 4.65;
      this.formdata2.monNum = 360;
      this.formdata2.percent = [];
      this.formdata3.loanType = '2';
      this.formdata3.yrate = 0;
      this.detailForm1.allTotal = 0;
      this.detailForm1.daikuanTotal = 0;
      this.detailForm1.accrual = 0;
      this.detailForm1.monthMoney = 0;
      this.detailForm2.allTotal = 0;
      this.detailForm2.daikuanTotal = 0;
      this.detailForm2.accrual = 0;
      this.detailForm2.monthMoney = '';
    },
    // 修改公积金月份
    changeMon (val) {
      let rate = this.accRate1;
      if (val > 60) {
        rate = this.accRate2;
      }
      let accRate = [];
      for (let i = 0; i <= 3; i++) {
        let current = this.accMul(rate, '1.' + i);
        let item = {
          key: current.toString(),
          value: `${current}%(基准利率1.${i}倍)`
        };
        accRate.push(item);
      }
      this.options.accRate = accRate;
      // 同时修改两个表单数据
      this.formdata1.accRate = accRate[0].key;
      this.formdata2.accRate = accRate[0].key;
    },
    changeMon3 (val) {
      if (this.formdata3.loanType == 1) {
        let rate = this.accRate1;
        if (val > 60) {
          rate = this.accRate2;
        }
        let accRate = [];
        for (let i = 0; i <= 3; i++) {
          let current = this.accMul(rate, '1.' + i);
          let item = {
            key: current,
            value: `${current}%(基准利率1.${i}倍)`
          };
          accRate.push(item);
        }
        this.options.accRate = accRate;
        // 同时修改两个表单数据
        this.formdata3.yrate = accRate[0].key;
      }
    },
    // 加法
    accAdd (arg1, arg2) {
      var r1, r2, m;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return ((arg1 * m) + (arg2 * m)) / m;
    },
    // 减法
    subtr (arg1, arg2) {
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      // last modify by deeka
      // 动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      return (((arg1 * m) - (arg2 * m)) / m).toFixed(n);
    },
    // 乘法获取准确值
    accMul (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split('.')[1].length;
      } catch (e) {}
      try {
        m += s2.split('.')[1].length;
      } catch (e) {}
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
    },
    // 除法获取精确值
    accDiv (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1,
        r2;
      try {
        t1 = arg1.toString().split('.')[1].length;
      } catch (e) {}
      try {
        t2 = arg2.toString().split('.')[1].length;
      } catch (e) {}
      r1 = Number(arg1.toString().replace('.', ''));
      r2 = Number(arg2.toString().replace('.', ''));
      return this.accMul(r1 / r2, Math.pow(10, t2 - t1));
    },
    //数字字段处理
    formatNumber: function (num) {
      num = parseFloat((num + '').replace(/[^\d.-]/g, '')).toFixed(2) + '';
      this.formdata3.yrate = num + "%";
    },
  }
};
</script>
