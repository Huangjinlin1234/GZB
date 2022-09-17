
<template>
  <!--
    @created by zhoumw
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 请假申请
  -->
  <div>
    <yu-xform ref="refForm" label-width="180px" :form-type="formType" :viewType="viewType" v-model="formdata" :disabled="disabledForm">
      <yu-panel title="请假申请信息" panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="员工名称" name="userName" ></yu-xform-item>
          <yu-xform-item label="员工工号" name="userCode" ></yu-xform-item>
          <yu-xform-item label="请假起始日期" name="startDate" ></yu-xform-item>
          <yu-xform-item label="请假结束日期" name="endDate" ></yu-xform-item>
          <yu-xform-item label="申请时间" name="inputDate" ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
yufp.lookup.reg('STD_ZX_YES_NO');

export default {
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      formdata: {},
      viewType: 'DETAIL',
      disabledForm: true
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  mounted () {
    this.initInfo();
  },
  methods: {
    initInfo () {
      let _this = this;
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
      _this.$request({
        url: _this.$backend.appOcaService + '/api/empattendinfo/' + serno,
        method: 'GET'
      }).then((response) => {
        if (response.code == '0') {
          yufp.clone(response.data, _this.formdata);
        }
      });
    }
  }
};
</script>
