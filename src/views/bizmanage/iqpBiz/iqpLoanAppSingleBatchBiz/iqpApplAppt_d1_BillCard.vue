<template>
  <div>
    <yu-panel title="客户信息" panel-type="normal">
      <yu-xform ref="refForm" label-width="600px"  v-model="formdata" >
        <yu-xform-group :column="1">

          <yu-xform-item label="" ctype="custom" name="cusRiskLevel">
          <a class="underline" @click="do360View">个人客户360视图</a><br><br>

          <br><br><br><br><br>
            <label>客户风险等级</label>
            <yu-input
              type="textarea"
              :rows="2"
               :account="true"
               placeholder="请输入内容"
              v-model="formdata2.cusRiskLevel2" :disabled="op"
              >
            </yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="priorCusDesc">
            <label>如果是我行重点客户，请详细说明依据</label>
            <yu-input
              type="textarea"
              :rows="2"
               :account="true"
               placeholder="请输入内容"
              v-model="formdata2.priorCusDesc2" :disabled="op"
              >
            </yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="otherDesc">
            <label>其他说明（例如预警情况等</label>
            <yu-input
              type="textarea"
              :rows="2"
               :account="true"
               placeholder="请输入内容"
              v-model="formdata2.otherDesc2" :disabled="op"
              >
            </yu-input>
          </yu-xform-item>
           <yu-xform-item label="业务流水号" ctype="input" name="iqpSerno" hidden>
        <yu-xform-item label="客户编号" ctype="input" name="cusId">
        </yu-xform-item></yu-xform-item></yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';

yufp.lookup.reg('STD_PAY_WAY,STD_ZB_YES_NO');

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
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqploanfirstpayinfo/',
      baseParams: {},
      drawData: [],
      formdata2: { cusRiskLevel2: '', priorCusDesc2: '', otherDesc2: ''},
      formdata: {},
      deleteUrl: this.$backend.cmisBiz + '/api/iqploanfirstpayinfo/delete/'
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;

      var op2 = 'VIEW';
      if (_this.$route.params.hasOwnProperty('op')) {
        op2 = _this.$route.meta.params.op;
      }
      if (op2 == 'EDIT' || op2 == 'reconsider') {
        _this.op = false;
      } else {
        _this.op = true;
      }

      this.formdata.iqpSerno = this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.meta.params.iqpSerno : this.node.iqpSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpapplappt/querybyiqpSerno',
        data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.meta.params.iqpSerno : this.node.iqpSerno},
        callback: function (code, message, response) {
          var cusRiskLevel2 = response.data.cusRiskLevel;
          var priorCusDesc2 = response.data.priorCusDesc;
          var otherDesc2 = response.data.otherDesc;
          _this.formdata2.cusRiskLevel2 = cusRiskLevel2;
          _this.formdata2.priorCusDesc2 = priorCusDesc2;
          _this.formdata2.otherDesc2 = otherDesc2;
        }
      });
    },
    do360View () {
      let _this = this;
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
        data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno}
      }).then(({code, message, data}) => {
        if (code == '0') {
          debugger;
          _this.$message({ message: '当前为跳转操作,请耐心等待,如长时间无反应,请重新尝试跳转!', type: 'info' });
          let url = _this.$backend.jumpKGPersonDownLoadService + '?viewlet=%25E5%25AE%259E%25E6%2597%25B6%25E6%2595%25B0%25E6%258D%25AE%25E5%25B9%25B3%25E5%258F%25B0%25E5%25A4%25A7%25E5%25B1%258F%252F%25E4%25B8%25AA%25E4%25BA%25BA360%25E8%25A7%2586%25E5%259B%25BE1.0.frm' +
            '&ref_t=design&ref_c=595534ae-4ca1-4f72-8f6b-315d0f6c0eba&cust_no=' + data.cusId + '&cust_name=' + _this.$xutils.getLoginUserInfo()['loginName'];
          window.open(url, '');
        } else {
          _this.$message({ message: '数据查询失败！', type: 'error'});
        }
      });
    }
  }
};
</script>