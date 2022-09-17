<template>
  <div>
    <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height" :hidden="srcflag" />
    <p :hidden="!srcflag" style="font-size:15px">未查询到该客户征信信息！</p>
  </div>
</template>
<script>
export default {
  props: {
    applyInfoParams: Object
  },
  data () {
    return {
      src: null,
      pageData: {},
      heihgt: 0,
      srcflag: false
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
        serno: this.applyInfoParams.serno
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
        } else {
          _this.srcflag = true;
        }
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    closeTab () {
      this.$route.closeTab(this.$route.meta.path);
    }
  }
};
</script>