
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="上班时间维护" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" row-number :pageable="true" :data-url="dataUrl">
        <yu-xtable-column label="流水号1" prop="serno" hide-column></yu-xtable-column>
        <yu-xtable-column label="时间段类型" prop="scheduleTimeYype" rules="required"></yu-xtable-column>
        <yu-xtable-column label="上班时间" ctype="input" prop="startTime" rules="required"></yu-xtable-column>
        <yu-xtable-column label="下班时间" ctype="input" prop="endTime" rules="required"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel>
      <yu-xform ref="refForm" label-width="100px" v-model="formdata">
        <yu-xform-group>
          <yu-xform-item label="流水号" :hidden="true" name="serno" ctype="input"></yu-xform-item>
          <yu-xform-item label="时间段类型" :hidden="true" name="scheduleTimeYype" ctype="input"></yu-xform-item>
          <yu-xform-item label="上班时间" :hidden="true" name="startTime" ctype="input"></yu-xform-item>
          <yu-xform-item label="下班时间" :hidden="true" name="endTime" ctype="input"></yu-xform-item>
          <yu-xform-item label="状态" :hidden="true" name="status" ctype="input"></yu-xform-item>
          <yu-xform-item label="更新人" name="inputId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="更新机构" name="inputBrId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="更新日期" name="inputDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" :hidden="true" name="updId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最后修改机构" :hidden="true" name="updBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最后修改日期" :hidden="true" name="updDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作类型  STD_OPR_TYPE" :hidden="true" name="oprType" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button @click="doSave">保存</yu-button>
      <yu-button @click="doCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import { dateFormat } from '@/utils';

export default {
  data: function () {
    return {
      expandCollapseName: ['base'],
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ],
      baseFormdata: {},
      dataUrl: `${backend.appOcaService}/api/cfgscheduleinfo/`,
      formdata: {}

    };
  },

  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },
  mounted () {
    let parmas = {
      inputId: this.userInfo,
      inputBrId: this.org.name,
      inputDate: this.formatTime()
    };
    yufp.clone(parmas, this.formdata);
  },

  methods: {

    formatTime () {
      var timeDt = new Date();
      var dt = dateFormat(timeDt, '{y}-{m}-{d}');
      return dt;
    },
    // 保存
    doSave: function () {
      var _this = this;

      // 必填项校验
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 需要保存的公共数据
      let parmas = {
        updId: this.userCode,
        updBrId: this.org.id,
        updDate: this.formatTime()
      };
      var startTime = '';
      var endTime = '';

      if (this.$refs.refTable.tabledata.length > 0) {
        // eslint-disable-next-line no-inner-declarations
        for (var i = 0; i < this.$refs.refTable.tabledata.length; i++) {
          startTime = this.$refs.refTable.tabledata[i].startTime;
          endTime = this.$refs.refTable.tabledata[i].endTime;
          // 为空校验
          if (startTime == null || startTime == '' || endTime == null || endTime == '') {
            _this.$message({
              message: '时间不能为空!',
              type: 'warning'
            });
            return;
          }
          // 下班时间必须大于上班时间
          if (startTime >= endTime) {
            _this.$message({
              message: '下班时间必须大于上班时间!',
              type: 'warning'
            });
            return;
          }
          yufp.clone(parmas, this.$refs.refTable.tabledata[i]);
        }
      }
      // 发送后台做数据保存
      var dataTable = this.$refs.refTable.tabledata;
      yufp.service.request({
        method: 'POST',
        url: `${backend.appOcaService}/api/cfgscheduleinfo/batchUpdate`,
        data: dataTable,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message('操作成功');

          _this.dialogVisible = false;
        }
      });
    },
    // 返回
    doCancel: function () {
      yufp.router.removeTab(this.$route.path);
    }


  }
};
</script>
