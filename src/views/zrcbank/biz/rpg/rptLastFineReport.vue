<template>
  <yu-panel title="原调查报告" panel-type="simple">
    <div>
      <iframe :src="printUrl" width="100%" height="1000px" frameborder="0"></iframe>
    </div>
  </yu-panel>
</template>

<script>
export default {
  components: {},
  props: {},
  data: function () {
    return {
      serno: '',
      cusId: '',
      reportDetail: '',
      param: {},
      printUrl: ''
    };
  },
  created () {
    var _this = this;
    if (this.$route.meta.params) {
      // _this.param.op = this.$route.meta.params.op;
      _this.param.serno = this.$route.meta.params.serno;
    } else if (this.getFactory().contextData.serno) {
      _this.param.serno = this.getFactory().contextData.serno;
      _this.param.op = this.getFactory().contextData.op;
    }
    _this.init();
  },
  mounted: function () {},
  methods: {
    init: function () {
      var _this = this;
      // 查询上次流水号
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtapp/getLastSerno',
        data: _this.param.serno,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.serno != '') {
              _this.serno = response.data.serno;
              _this.cusId = response.data.cusId;
              yufp.service.request({
                method: 'POST',
                url: _this.$backend.cmisBiz + '/api/lmtapp/getLmtAppCusData',
                data: JSON.stringify({ serno: _this.serno }),
                callback: function (code, message, response) {
                  if (code == 0) {
                    _this.reportDetail = response.data.rptType;
                    if (
                      _this.reportDetail != null &&
                      _this.reportDetail != ''
                    ) {
                      _this.selectReport(_this.reportDetail);
                    } else {
                      _this.$message({
                        duration: 4000,
                        message: '原调查报告未选择报告类型！',
                        type: 'warning'
                      });
                      return;
                    }
                  }
                }
              });
            }
          }
        }
      });
    },
    selectReport: function (reportDetail) {
      var _this = this;
      const params = {};
      params.serno = _this.serno;
      params.cusId = _this.cusId;
      // 公司通用版
      if (reportDetail == 'C01') {
        var _this = this;
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C01.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C02') {
        // 公司简化版
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C02.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C03') {
        // 公司低风险版
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C03.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C04') {
        // 经营性物业（企业）
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C04.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C05') {
        // 房地产开发贷
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C05 .cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C06') {
        // 固定资产贷款
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C06.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C07') {
        // 融资租赁公司
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C07.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C08') {
        // 公司混合版（固定资产贷款）
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C08.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C09') {
        // 公司混合版（经营性物业）
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C09.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C10') {
        // 小企业通用版
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C10.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C11') {
        // 小企业标准化产品
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C11.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C12') {
        // 小企业混合版（固定资产贷款）
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C12.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C13') {
        // 小企业混合版（经营性物业）
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C13.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C14') {
        // 小企业混合版（普通与单户标准化混）
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C14.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'C15') {
        // 委托贷款
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-C15.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'I01') {
        // 个人经营性贷款(有企业)
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-I01.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'I02') {
        // 个人经营性贷款(无企业)
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-I02.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'I03') {
        // 经营性物业(个人)
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-I03.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'I04') {
        // 个人标准化产品（有企业）
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-I04.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      } else if (reportDetail == 'I05') {
        // 个人标准化产品（无企业）
        params.src =
          _this.$backend.frptRptService +
          'DGDCBG-I05.cpt&op=view&serno=' +
          params.serno +
          '&cusId=' +
          params.cusId;
      }
      _this.printUrl = params.src;
    },
    // 返回上一页面
    back: function () {
      // this.$router.go(-1);
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>

<style></style>
