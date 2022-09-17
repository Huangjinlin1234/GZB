<template>
  <div>
    <yu-panel title="首付款来源情况核实" panel-type="normal">
      <yu-form-buttons align="left">
        <yu-button @click="drawAdd" type="primary" round :disabled="disabledflg" :hidden="btnflag">新增</yu-button>
      </yu-form-buttons>
      <yu-xtable ref="refDrawTable" row-number :base-params="searchFormdata" border :data="drawData" :pageable="false" :disabled="btnflag">
        <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="iqpSerno"  align="center" ctype="input"  hide-column></yu-xtable-column>
        <yu-xtable-column label="日期" prop="defrayDate"  align="center" ctype="datepicker" :disabled="btnflag"></yu-xtable-column>
        <yu-xtable-column label="支付方式（POS单、转账、现金等)" prop="payMode"  align="center" ctype="select" data-code="STD_FIRST_PAY_MODE" :disabled="btnflag"></yu-xtable-column>
        <yu-xtable-column label="支付金额" prop="payAmt" width="200" align="center" ctype="yu-num" :disabled="btnflag" ></yu-xtable-column>
        <yu-xtable-column label="是否通过银行流水校验核实（并在流水扫描件上相应位置做标记）" prop="bankFlowVerifyFlag" align="center" ctype="select" data-code="STD_ZB_YES_NO" :disabled="btnflag"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="opr" align="center">
          <template slot-scope="drawScope">
            <yu-button size="small" type="primary" :disabled="disabledflg" @click="drawSave(drawScope.$index, drawScope.row)" :hidden="btnflag">保存</yu-button>
            <yu-button size="small" type="danger" :disabled="disabledflg" @click.stop="drawDelete(drawScope.$index, drawScope.row)" :hidden="btnflag">删除</yu-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="refForm" label-width="600px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="总计" ctype="input" placeholder="总计" name="sum" align="left" disabled></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="speCaseDesc1">
            <label>通过核查账户流水、支付凭证、征信报告等相关资料，确认首付款是否信贷资金，特殊情况详细说明</label>
            <yu-input
              type="textarea"
              :rows="2"
               :account="true"
               placeholder="请输入内容"
              v-model="formdata2.speCaseDesc"
              :disabled="btnflag"
              >
            </yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="otherDesc1">
            <label>其他说明（例如公积金贷款金额、公积金月还款额、接力贷情况说明、拍卖贷情况说明及其他</label>
            <yu-input
              type="textarea"
              :rows="2"
               :account="true"
               placeholder="请输入内容"
              v-model="formdata2.otherDesc"
              :disabled="btnflag"
              >
            </yu-input>
          </yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';

yufp.lookup.reg('STD_PAY_WAY,STD_ZB_YES_NO,STD_FIRST_PAY_MODE');

export default {
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqploanfirstpayinfo/',
      baseParams: {},
      drawData: [],
      btnflag: false,
      formdata2: { speCaseDesc: '', otherDesc: ''},
      baseFormdata: {},
      deleteUrl: this.$backend.cmisBiz + '/api/iqploanfirstpayinfo/delete/'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      var op = _this.$route.params.hasOwnProperty('op') ? _this.$route.params.op : 'VIEW';
      if (op == 'VIEW') {
        this.btnflag = true;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanfirstpayinfo/selectBySerno',
        data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno},
        callback: function (code, message, response) {
          if (response.data.length > 0) {
            _this.drawData = response.data || [];
            _this.payAmtSum();
          }
        }
      });
      yufp.service.request({
        method: 'POST',

        url: backend.cmisBiz + '/api/iqphouse/querybyiqpserno',
        data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno},

        callback: function (code, message, response) {
          yufp.clone(response.data, _this.formdata2);
        }
      });
    },
    /**
     * 首付款来源情况核实新增
     */
    drawAdd: function () {
      var _this = this;
      var iqpSerno = _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno;
      _this.drawData.push({
        iqpSerno: iqpSerno,
        defrayDate: '',
        defrayType: '',
        defrayAmt: '',
        bankFlowVerifyFlag: ''
      });
    },
    /**
     * 首付款来源情况核实保存
     */
    drawSave: function (index, row) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanfirstpayinfo/saveiqploanfirstpayinfo',
        data: row,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/iqploanfirstpayinfo/selectBySerno',
              data: {iqpSerno: row.iqpSerno},
              callback: function (code, message, response) {
                if (response.data.length > 0) {
                  _this.drawData = response.data || [];
                  _this.payAmtSum();
                }
              }
            });
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },
    /**
     *首付款来源情况核实删除
     */
    drawDelete: function (index, row) {
      var _this = this;
      if (!row.pkId) {
        _this.drawData.splice(index, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/iqploanfirstpayinfo/deleteByPrimaryKey',
          data: {pkId: row.pkId },
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.drawData.splice(index, 1);
              _this.payAmtSum();
              _this.$message('删除成功');
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }
    },


    payAmtSum: function () {
      var _this = this;
      let sumtemp = 0;
      for (let i = 0; i < _this.drawData.length; i++) {
        sumtemp += parseFloat(_this.drawData[i].payAmt);
      }
      _this.formdata.sum = sumtemp;
    }

  }

};
</script>