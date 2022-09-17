<template>
  <div>
    <yu-panel title="预警信号分析" is-collapse panel-type="simple">
      <yu-xtable ref="refTable" row-number :data="tableData" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="预警单编号" prop="altSinNo" width="180px"></yu-xtable-column>
        <yu-xtable-column label="预警日期" prop="altDate" width="100px"></yu-xtable-column>
        <yu-xtable-column label="信息来源" prop="infoSource" width="80px"></yu-xtable-column>
        <yu-xtable-column label="预警大类" prop="altTypeMax" width="80px"></yu-xtable-column>
        <yu-xtable-column label="预警种类" prop="altType" width="80px"></yu-xtable-column>
        <yu-xtable-column label="预警子项" prop="altSubType" width="100px"></yu-xtable-column>
        <yu-xtable-column label="预警输出描述" prop="altDesc"></yu-xtable-column>
        <yu-xtable-column label="指标等级" prop="altLvl" width="80px"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xform ref="refForm" label-width="160px" v-model="formdata" :disabled="formType != 'edit' ? true : false">
      <yu-xform-group :column="1">
        <yu-xform-item label="主键" name="pkId" :hidden="true"></yu-xform-item>
        <yu-xform-item label="任务编号" name="taskNo" :hidden="true"></yu-xform-item>
        <yu-xform-item label="预警分析" name="altAnaly" ctype="textarea" rules="required"></yu-xform-item>
        <yu-xform-item label="是否有其他负面信息" name="isNegativeInfo" ctype="radio" rules="required" data-code="STD_ZB_YES_NO" @change="isNegativeInfo"></yu-xform-item>
        <yu-xform-item label="分析说明" name="analy" ctype="textarea" :rules="checkIsNegative" id="analy" ></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO');
export default {

  props: {
    taskNo: String,
    formType: String
  },

  data: function () {
    return {
      dataUrl: backend.cmisPsp + '/api/pspwarninginfolist/queryByAltDate',
      queryUrl: backend.cmisPsp + '/api/pspwarninginfoanaly/',
      formdata: {},
      tableData: [],
      checkIsNegative: {required: false }
    };
  },

  created: function () {
    var _this = this;
    this.$request({
      url: _this.queryUrl,
      method: 'get',
      data: {condition: {taskNo: _this.taskNo}}
    }).then((response) => {
      if (response.code == '0') {
        yufp.clone(response.data[0], _this.formdata);
        if (response.data.length <= 0) {
          _this.formdata.pkId = _this.$xutils.getUUID();
          _this.formdata.taskNo = _this.taskNo;
        }
        return _this.$request({
          url: _this.dataUrl,
          method: 'get',
          data: {condition: {taskNo: _this.taskNo}}
        });
      }
    }).then((response) => {
      if (response.code == '0') {
        _this.tableData = response.data;
        // for(var i=0; i<response.data.length; i++) {
        //   _this.tableData.push(response.data[i]);
        // }
        // _this.$refs.refTable.tabledata = response.data;
      }
    }).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  },

  methods: {

    validate: function () {
      var validate = false;
      if (this.$refs.refTable.tabledata.length == '0') {
        validate = true;
      } else {
        this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
      }
      return validate;
    },

    save: function () {
      return this.$request({
        url: backend.cmisPsp + '/api/pspwarninginfoanaly/update',
        method: 'post',
        data: this.formdata
      });
    },

    isNegativeInfo: function (info) {
      if (info == '1') {
        this.checkIsNegative = {required: true, message: '此选项必填', trigger: 'blur'};
      } else {
        this.checkIsNegative = {required: false};
      }
    }
  }
};
</script>