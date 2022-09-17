
<template>
  <!--
    @created by  zhoumw
    @updated by
    @updated by
    @description 集中作业员工签到签退
  -->
  <div>
    <div>
    <yu-xform ref="refForm" label-width="180px" :viewType="viewType" v-model="formdata" :disabled="disabledForm">
      <yu-panel title="签到签退信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务类型" name="checkOptType" ctype="select"  data-code="STD_CHECK_OPT_TYPE"></yu-xform-item>
          <yu-xform-item label="员工号" name="userCode"></yu-xform-item>
          <yu-xform-item label="员工姓名" name="userName"></yu-xform-item>
          <yu-xform-item label="操作日期" name="optDate"></yu-xform-item>
          <yu-xform-item label="操作时间" name="optTime"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
/* eslint vue/no-unused-components:0 */
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CHECK_OPT_TYPE,STD_OPR_TYPE,STD_CHECK_DATA_SOURCE');

export default {
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      searchFormdata: {},
      formdata: {},
      viewType: 'DETAIL',
      disabledForm: true
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  mounted: function () {
    this.initData();
  },
  methods: {
    initData: function () {
      var _this = this;
      let serno = '';
      let object = _this.pageParams;
      if (object == null) {
        object = _this.$route.meta.params;
        if (object == null) {
          object = _this.$attrs['biz-page-data'].instanceInfo;
          serno = object.bizId;
        } else {
          serno = object.serno;
        }
      } else {
        serno = object.serno;
      }
      yufp.service.request({
        url: _this.$backend.appOcaService + '/api/empcheckinfo/' + serno,
        method: 'GET',
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
          }
        }
      });
    }
  }
};
</script>
