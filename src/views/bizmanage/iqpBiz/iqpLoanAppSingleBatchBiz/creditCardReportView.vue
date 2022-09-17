<template>
<yu-tabs style="height:100%;overflow-y: scroll;" v-model="activeName" type="card" >
  <yu-tab-pane label="征信信息" name="1" width="100%">
    <div>
      <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  :hidden="srcflag"/>
      <p :hidden="!srcflag" style="font-size:15px">未查询到该客户征信信息！</p>
    </div>
  </yu-tab-pane>
  <yu-tab-pane label="结构化征信信息" name="2" width="100%">
      <iframe ref="refIframe2" :src="src2" frameborder="no" width="100%" :height="height"/>
  </yu-tab-pane>
</yu-tabs>
</template>
<script>
export default {
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    },
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data () {
    return {
      src: null,
      pageData: {},
      heihgt: 0,
      srcflag: false,
      activeName: '1',
      src2: ''
    };
  },
  created () {
    this.pageData = this.$route.meta.params;
  },
  mounted () {
    var _this = this;
    this.$request({
      url: this.$backend.cmisBiz + '/api/creditcardappinfo/selectreporturlbySerno',
      method: 'POST',
      data: {
        serno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.instanceInfo.bizId
      }
    }).then(({code, message, data}) => {
      if (code == '0') {
        if (data != null) {
          var url = data.creditUrl;
          if (url != '' && url != null) {
            _this.src = url;
          } else {
            _this.srcflag = true;
          }
          var reportNo = data.reportNo;
          if (reportNo != null && reportNo != '') {
            let url2 = _this.$backend.jumpZXReportService + '?viewlet=实时数据平台大屏/征信分析简表.cpt' + '&ref_t=design' + '&ref_c=aed8606f-7c40-4699-bedd-9cc882f98eaf' + '&report_id=' + reportNo;
            _this.src2 = url2;
          }
        } else {
          _this.srcflag = true;
        }
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
    console.log(this.srcflag);
  },
  methods: {
    closeTab () {
      this.$route.closeTab(this.$route.meta.path);
    }
  }
};
</script>