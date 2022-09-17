
<template>
  <div>
    <yu-panel title="授信时贷后管理建议落实情况" panel-type="simple">
      <yu-xform ref="refForm" label-width="120px" v-model="formData" :form-type="formType">
        <yu-xtable ref="refTable" selection-type="radio" :data-url="dataUrl" :data="tableData" :default-load="false" >
          <yu-xtable-column label="检查项目" prop="lastLmtAdvice" width="400"></yu-xtable-column>
          <yu-xtable-column label="落实情况" prop="pactCase">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.pkId" v-model="scope.row.pactCase" ctype="textarea" :rules="checkCommentRules"/>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>

export default {

  props: {
    taskNo: String,
    formType: String
  },

  data: function () {
    return {
      formData: {},
      tableData: [],
      checkCommentRules: [
        {required: true, message: '此选项必填', trigger: 'blur'},
        {min: 10, message: '总体评价应不少于10个字', trigger: 'blur'}
      ],
      dataUrl: this.$backend.cmisPsp + '/api/pspimplementopt/selectByLastLmtAdvice',
      dataUrl1: this.$backend.cmisPsp + '/api/pspimplementopt/'
    };
  },

  mounted: function () {
    var _this = this;
    _this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: {condition: JSON.stringify({taskNo: _this.taskNo})}
    }).then((response) => {
      if (response.code == '0') {
        _this.tableData = response.data;

        for (var i = 0; i < _this.tableData.length; i++) {
          _this.formData.[_this.tableData[i].pkId] = _this.tableData[i].pactCase;
        }
      };
    }).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  },

  methods: {

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      return this.$request({
        url: this.dataUrl1 + 'updateList',
        method: 'post',
        data: this.tableData
      });
    }

  }
};
</script>