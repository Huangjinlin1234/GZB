<template>

  <div>
    <yu-panel title="批量转让新增向导" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="转让方式" name="takeoverMode" ctype="select" data-code="STD_TAKEOVER_MODE" rules="required"></yu-xform-item>
          <yu-xform-item label="转让协议编号" name="takeoverAgrNo" rules="required"></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doNext">下一步</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_TAKEOVER_MODE');
export default {
  data: function () {
    return {
      formdata: {}
    };
  },
  mounted () {
    // this.formdata.takeoverAgrNo = this.$route.meta.params.takeoverAgrNo;
  },
  methods: {

    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /* 下一步 */
    doNext () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };
      var model = {};
      // 转让类型 02批量
      model.transferType = '02';
      // 登记状态 01 未登记
      model.regiStatus = '01';
      this.formdata.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      yufp.clone(_this.formdata, model);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/platakeoverappinfo/insert',
        data: model,
        callback: function (code, message, response) {
          if (response.code == 0) {
            yufp.router.removeTab(_this.$route.path);
            _this.$router.addTab({
              name: 'zrcbank/npam/plaTokeOvers/plaTokeOversDetil',
              key: 'plaTokeOverApp' + response.data.ptaiSerno, // 必传
              title: '批量转让新增',
              data: {
                ptaiSerno: response.data.ptaiSerno, // 业务流水号
                viewType: 'ADD'
              }
            });
          }
        }
      });
    }
  }
};
</script>
