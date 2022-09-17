<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
  <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
    </div>
</template>
<script>
export default {
  props: {
    pageParams: Object
  },

  data: function () {
    return {
      src: null,
      heihgt: 0
    };
  },
  mounted () {
    var _this = this;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
      data: {
        contNo: _this.pageParams.contNo
      },
      callback: function (code, message, response) {
        // 借款合同
        var params1 = {
          contNo: _this.pageParams.contNo, // 合同编号
          contType: '1',
          suitContType: response.data.ctrLoanCont.contType, // 适用合同类型
          suitPrd: response.data.ctrLoanCont.prdId, // 适用产品
          isESeal: '0', // 是否电子用印
          contPageType: '4', // 合同版面标识
          isDzpj: '', // 是否电子票据
          matchFlag: '' // 特定匹配标识
        };
        var paramList = [];
        paramList.push(params1);
        yufp.service.request({
          method: 'POST',
          url: backend.cmisCfg + '/api/cfgctrcontprinttemp/queryContPrint',
          data: {condition: JSON.stringify({list: JSON.stringify(paramList)})},
          callback: function (code, message, response) {
            let cptName = response.data[0].suitReportName;
            _this.src = _this.$backend.frptRptService + cptName + response.data[0].contParams;
          }
        });
      }
    });
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  }

};
</script>


