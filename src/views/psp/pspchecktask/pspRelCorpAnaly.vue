<template>
  <div>
    <yu-panel title="关联企业情况" panel-type="simple">    
      <yu-xtable ref="refTable" :data-url="relCorpUrl" :default-load="false" selection-type="radio">
        <yu-xtable-column prop="memberCusNo" label="成员客户编号"></yu-xtable-column>
        <yu-xtable-column prop="memberCusName" label="成员客户名称"></yu-xtable-column>
        <yu-xtable-column prop="relType" label="关联（集团）关联关系类型"></yu-xtable-column>
        <yu-xtable-column prop="managerId" label="主办客户经理"></yu-xtable-column>
        <yu-xtable-column prop="managerBrId" label="主办行"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="refForm" label-width="120px" v-model="pspRelCorpAnaly" :disabled="formType != 'edit' ? true : false">
        <yu-xform-group>
          <yu-xform-item name="pkId" label="主键" :hidden="true"></yu-xform-item>
          <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>

          <yu-xform-item name="relSitu" label="所属集团/关联企业情况" ctype="textarea" colspan="24" rules="required"/>
          <yu-xform-item name="cashFlowSitu" label="关联关系及内部资金往来情况" ctype="textarea" colspan="24" rules="required"/>
          <yu-xform-item name="grpRiskEval" label="整个集团客户授信规模及风险评估" ctype="textarea" colspan="24" rules="required"/>
          <yu-xform-item name="stratyEffect" label="目前采取的贷后管理策略及效果" ctype="textarea" colspan="24" rules="required"/>

        </yu-xform-group>
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

  data: function() {
    return {
      relCorpUrl: backend.cmisPsp + '/api/psprelcorp/',
      relCorpAnalyUrl: backend.cmisPsp + '/api/psprelcorpanaly/',

      pspRelCorpAnaly: {},

    };
  },

  mounted: function() {
    var form = {taskNo: this.taskNo};
    this.$refs.refTable.remoteData({ condition: JSON.stringify(form) });
  },

  created: function () {
    var _this = this;
    this.taskNo = this.$parent.$route.params.pspTask.taskNo;
    _this.$request({
      url: _this.relCorpAnalyUrl,
      method: 'get',
      data: {condition: {taskNo: _this.taskNo}},
    }).then((response) => {
        yufp.clone(response.data[0], _this.pspRelCorpAnaly);
      }
    ).catch(() => {
      _this.$message({
        message: "请求失败"
      })
    });
  },

  methods: {
    /*  页面校验  */
    validate: function () {
      var validate = false;
      if(this.$refs.refTable.tabledata.length == '0') {
          validate = true
      } else {
          this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
      }
      return validate
    },
   /* 页面保存方法 */
    save: function() {
      return this.$request({
        url: this.relCorpAnalyUrl + "update",
        method: 'post',
        data: this.pspRelCorpAnaly,
      })
      
    }
  },
}
</script>