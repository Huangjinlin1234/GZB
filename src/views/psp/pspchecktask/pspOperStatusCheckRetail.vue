<template>
<yu-xform ref="refForm" label-width="120px" v-model="formData" :disabled="formType != 'edit' ? true : false">
    <yu-panel title="经营状况检查(批发零售业)" panel-type="simple">
        <yu-xtable ref="refTable" :data="tableData" :default-load="false" :pageable="false" :span-method="objectSpanMethod">
            <yu-xtable-column prop="id"/>
            <yu-xtable-column prop="Prd" label="检查项目">
                <template slot-scope="scope">
                    <yu-xform-item :name="scope.row.PrdName" v-model="scope.row.Prd" ctype="textarea"/>
                </template>
            </yu-xtable-column>
            <yu-xtable-column prop="Situ" label="产品市场行情、价格走势、市场供需情况等">
                <template slot-scope="scope">
                    <yu-xform-item :name="scope.row.SituName" v-model="scope.row.Situ" ctype="textarea"/>
                </template>
            </yu-xtable-column>
        </yu-xtable>
    </yu-panel>
    <yu-panel>
        <yu-xform-item name="pkId" label="主键" :hidden="true"/>
        <yu-xform-item name="taskNo" label="任务编号" :hidden="true"/>
        <yu-xform-item name="remark" label="说明" ctype="textarea"/>
    </yu-panel>
</yu-xform>
</template>
<script>

export default {
  props: {
    taskNo: String,
    formType: String
  },
  data: function () {
    return {
      updateUrl: backend.cmisPsp + '/api/pspoperstatuscheckretail/update',
      queryUrl: backend.cmisPsp + '/api/pspoperstatuscheckretail/',
      formData: {},
      tableData: [],
    }
  },

  created: function () {
      var _this = this;
      
      this.$request({
        url: this.queryUrl,
        method: 'get',
        data: {condition: {taskNo: this.taskNo}},
      }).then((response) => {
          yufp.clone(response.data[0], _this.formData)
          //form数据转table
          _this.transForm2Table(_this.formData);
      }).catch(() => {
        _this.$message({
          message: "请求失败"
        })
      });
  },

  methods: {

    transForm2Table: function (formData) {
        this.tableData = [{
          id: "上期主要产品",
          Prd: formData.prePrd1,
          PrdName: "prePrd1",
          Situ: formData.preSitu1,
          SituName: "preSitu1",
          }, {
          id: "",
          Prd: formData.prePrd2,
          PrdName: "prePrd2",
          Situ: formData.preSitu2,
          SituName: "preSitu2",
          }, {
          id: "",
          Prd: formData.prePrd3,
          PrdName: "prePrd3",
          Situ: formData.preSitu3,
          SituName: "preSitu3",
          }, {
          id: "本期主要产品",
          Prd: formData.curtPrd1,
          PrdName: "curtPrd1",
          Situ: formData.curtSitu1,
          SituName: "curtSitu1",
          }, {
          id: "",
          Prd: formData.curtPrd2,
          PrdName: "curtPrd2",
          Situ: formData.curtSitu2,
          SituName: "curtSitu2",
          }, {
          id: "",
          Prd: formData.curtPrd3,
          PrdName: "curtPrd3",
          Situ: formData.curtSitu3,
          SituName: "curtSitu3",
          }, 
        ];
    },

    objectSpanMethod: function (obj) {

      if(obj.columnIndex === 0) {
        if (obj.rowIndex % 3 === 0) {
          return {
              rowspan: 3,
              colspan: 1
          };
        } else {
          return {
              rowspan: 0,
              colspan: 0
          };
        }
      }
    },

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      // var checkData = this.$refs.refTable.tabledata;

      var shangqiResult = this.tableData.some((item, index) => {
         //校验上期产品必输一项
         return (index < 3 && item.Prd && item.Situ)
      })
      var benqiResult = this.tableData.some((item, index) => {
         //校验本期产品必输一项
         return (index > 2 && index < 6 && item.Prd && item.Situ)
      })
      
      if(!shangqiResult){
        this.$message.error('上期主要产品中应有一条为必输')
      }
      if(!benqiResult){
        this.$message.error('本期主要产品中应有一条为必输')
      }
      if(shangqiResult && benqiResult) {
        validate = true
      } else {
        validate = false
      }
      return validate
    },

    save: function() {

      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.formData,
      })

    },

  },

}
</script>