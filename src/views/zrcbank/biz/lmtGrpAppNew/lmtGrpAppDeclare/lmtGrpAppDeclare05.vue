<!--
<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata">
        <yu-panel title="复议申请表(集团)" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      formRules: { },
      imageUrls: { },
      File: {}
    };
  },
  mounted () {
    var _this = this;
    var op = this.$route.params.viewType;
    if (op == 'edit') {
      this.disabled = true;
    }
    // let serno = _this.$route.meta.params.serno;
    _this.onPrint();
  },
  methods: {

    // 打印流动资金额度测算表
    onPrint () {
      debugger;
      var _this = this;
      // _this.getFactory().contextData.serno;
      var params = _this.getFactory().contextData;
      // var params = _this.formdata;
      if (params.grpSerno == null || params.grpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      // 本地调试 params.src = 'http://10.87.3.24:8080/dscms/frpt/decision/view/report?viewlet=pvpLoanApp.cpt&op=view&PVP_SERNO=' + params[0].pvpSerno;
      params.src = _this.$backend.frptRptService + '复议申请表（集团）.cpt&op=view&SERNO=' + params.grpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
-->

<template>
  <div>
  <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      src: null,
      formdata: {},
      heihgt: 0
    };
  },
  mounted () {
    var _this = this;
    _this.onPrint();
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    onPrint () {
      var _this = this;
      var params = _this.getFactory().contextData;
      // var grpSerno = _this.getFactory().contextData.grpSerno;
      // var grpSerno = this.$route.meta.params.grpSerno;
      // if (grpSerno == null || grpSerno == '') {
      if (params.grpSerno == null || params.grpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      this.src = _this.$backend.frptRptService + 'DGSX-FYSQB-JT.cpt&op=view&grpSerno=' + params.grpSerno;
    }
  }
};
</script>
