<template>
  <div>
    <yu-panel title="信用信息" panel-type="normal">

      <yu-button-drop>
        <yu-button type="primary" ref="btn_doAdd" @click="doAdd" :hidden="btnflag">新增</yu-button>
        <yu-button type="primary" ref="btn_doDelete" @click="doDelete" :hidden="btnflag">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="searchData" :pageable="true" :data-url="dataUrl" default-load="true">
        <yu-xtable-column label="与借款人关系" prop="debitRela"  data-code="STD_DEBIT_RELA" width="120"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="100"></yu-xtable-column>
        <yu-xtable-column label="现有消费类融资余额(万元)" prop="consumeFinBal" width="200"></yu-xtable-column>
        <yu-xtable-column label="现有消费类融资月还款额(万元)" prop="consumeMonRepay" width="250"></yu-xtable-column>
        <yu-xtable-column label="贷款当前逾期金额" prop="loanCurtOverdueAmt" width="200"></yu-xtable-column>
        <yu-xtable-column label="贷款单月最高逾期金额(元)" prop="loanHighOverdueAmt" width="200"></yu-xtable-column>
        <yu-xtable-column label="贷款最长逾期月数" prop="loanLgstOverdueMon" width="200"></yu-xtable-column>
        <yu-xtable-column label="贷记卡当前逾期金额" prop="debitCurtOverdueAmt" width="200"></yu-xtable-column>
        <yu-xtable-column label="贷记卡单月最高逾期金额(元) " prop="debitHighOverdueAmt" width="200"></yu-xtable-column>
        <yu-xtable-column label="贷记卡最长逾期月数" prop="debitLgstOverdueMon" width="150"></yu-xtable-column>
        <yu-xtable-column label="两年内逾期次数" prop="inTwoOverdueTimes" width="150"></yu-xtable-column>
        <yu-xtable-column label="两年外逾期次数" prop="outTwoOverdueTimes" width="150"></yu-xtable-column>
        <yu-xtable-column label="两年外逾期次数" prop="outTwoOverdueTimes" width="150"></yu-xtable-column>
        <yu-xtable-column label="两年外逾期次数" prop="outTwoOverdueTimes" width="150"></yu-xtable-column>
        <yu-xtable-column label="两年外逾期次数" prop="outTwoOverdueTimes" width="150"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_DEBIT_RELA');
export default {
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },

  data: function () {
    return {
      btnflag: false,
      searchData: {condition: {
        iqpSerno: this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno
      }},
      dataUrl: this.$backend.cmisBiz + '/api/iqpcuscreditinfo/selectbymodel'
    };
  },
  mounted () {
    var _this = this;
    var op = _this.$route.params.hasOwnProperty('op') ? _this.$route.params.op : 'VIEW';
    if (op != 'EDIT') {
      this.btnflag = true;
    }
  },
  methods: {
    // 新增申请
    doAdd () {
      let _this = this;

      let data = {};
      data['iqpSerno'] = _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno;
      _this.$dialog.open(
        '新增信用信息',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/addIqpCusCreditInfo',
        600,
        400,
        data,
        () => {
          _this.$refs.refTable.remoteData();
        }
      );
    },

    // 删除申请
    doDelete () {
      let _this = this;

      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      // 调用后端的删除逻辑，删除相关的关系表数据
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisBiz + '/api/iqpcuscreditinfo//delete/' + _this.$refs.refTable.selections[0].pkId,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
              // 列表刷新
              _this.$refs.refTable.remoteData();
            });
          } else {
            _this.$xutils.showMsgBox(
              '提示',
              '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
            );
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }


  }


};
</script>