<template>
  <div>
  <yu-panel title="检查任务信息" panel-type="simple">
    <yu-xform ref="taskRefForm" label-width="120px" v-model="taskData" :disabled="true">
      <yu-xform-group>
        <yu-xform-item name="taskNo" label="任务编号"></yu-xform-item>
        <yu-xform-item name="checkType" label="检查类型" ctype="select" data-code="STD_ZB_CHECK_TYPE"></yu-xform-item>
        <yu-xform-item name="cusId" label="客户编号" colspan="10"></yu-xform-item>
        <yu-xform-item name="button" ctype="custom" label="" colspan="2">
          <yu-button type="primary" @click="viewCus">查看</yu-button>
        </yu-xform-item>
        <yu-xform-item name="cusName" label="客户名称"></yu-xform-item>
        <yu-xform-item name="execIdName" label="任务执行人"></yu-xform-item>
        <yu-xform-item name="execBrIdName" label="任务执行机构"></yu-xform-item>
        <yu-xform-item name="taskStartDt" label="任务生成日期"></yu-xform-item>
        <yu-xform-item name="taskEndDt" label="任务要求完成日期"></yu-xform-item>
        <yu-xform-item name="checkStatus" label="检查状态" ctype="select" data-code="STD_ZB_CHECK_STATUS"></yu-xform-item>
        <yu-xform-item name="checkDate" label="检查日期"></yu-xform-item>
        <yu-xform-item name="rptType" label="报告类型" ctype="select" data-code="STD_ZB_RPT_TYPE"></yu-xform-item>
        <yu-xform-item name="pkId" label="主键" hidden></yu-xform-item>
        <yu-xform-item name="checkMode" label="检查方式" rules="required" ctype="select" :disabled="formType != 'edit' ? true : false" data-code="STD_ZB_JCFS_TYPE"></yu-xform-item>
        <yu-xform-item name="relatedPersonnel" label="约见人" rules="required" :disabled="formType != 'edit' ? true : false"></yu-xform-item>
        <yu-xform-item name="relatedJobTtl" label="约见人职务" rules="required" ctype="select" :disabled="formType != 'edit' ? true : false" data-code="STD_ZB_JOB_TTL"></yu-xform-item>
        <yu-xform-item name="checkPlace" label="检查地点" rules="required" colspan="24" :disabled="formType != 'edit' ? true : false"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CHECK_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_RPT_TYPE,STD_ZB_JCFS_TYPE,STD_ZB_JOB_TTL');
export default {

  props: {
    formData: Object,
    formDataRst: Object,
    formType: String
  },

  data: function () {
    return {
      taskData: {},
      rstData: {},
      updateUrl: backend.cmisPsp + '/api/psptasklist/updateTaskAndRst',
      dialogTableVisible: false,
      closeDialog: true
    };
  },

  watch: {
    formDataRst: function () {
      yufp.clone(this.formData, this.taskData);
      yufp.clone(this.formData, this.rstData);
      for (var item in this.formDataRst) {
        this.rstData[item] = this.formDataRst[item];
      }
    }
  },

  methods: {

    validate: function () {
      var validate = false;
      this.$refs.taskRefForm.validate(function (valid) {
        validate = valid;
      });
      // this.$refs.rstRefForm.validate(function (valid) {
      //   validate = validate ? valid : validate;
      // });

      return validate;
    },

    save: function () {
      var _this = this;
      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.taskData
      }).then((response) => {
        if (response.code == '0') {
          console.log('保存pspCheckRst');

          return new Promise((resolve, reject) => {
            var response = {};
            response.code = 0;
            resolve(response);
          });
        }
      }).catch(() => {
        _this.$message({
          message: '保存失败'
        });
      });
    },

    viewCus () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: _this.taskData.cusId,
        callback: function (code, message, response) {
          if (code == 0) {
            let json = {};
            let title = '';
            let name = '';
            let key = '';
            json['cusId'] = _this.taskData.cusId;
            if (response.data.cusCatalog == '1') {
              json['op'] = 'VIEW';
              title = '个人客户查看';
              name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
              // 个人正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            } else if (response.data.cusCatalog == '2') {
              json['viewType'] = 'VIEW';
              title = '对公客户查看';
              name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
              // 对公正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            }
            _this.$router.addTab({
              // 路由名称
              name: name,
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: key,
              // 页签名称
              title: title,
              // 传递的业务数据，可选配置
              data: json
            });
          }
        }
      });
      // if (this.taskData.cusId == null || this.taskData.cusId == '') {
      //   this.$xutils.showMsgBox('提示', '客户号为空!');
      //   return;
      // }
      // let json = {};
      // json['cusId'] = this.taskData.cusId;
      // json['modelGroupNo'] = 'CMG000296';
      // json['viewType'] = 'VIEW';
      // json['opType'] = 'view';
      // this.$dialog.open(
      //   '',
      //   'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
      //   1000,
      //   600,
      //   json
      // );
    }

  }

};
</script>
