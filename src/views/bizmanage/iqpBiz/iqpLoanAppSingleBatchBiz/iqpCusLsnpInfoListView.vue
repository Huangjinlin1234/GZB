<template>
  <!--
    @created by zlf
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata">
      <yu-panel title="内评信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="申请流水号" :hidden="true" name="iqpSerno" rules="required" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="数字解读值" name="digIntVal" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="数字解读值风险等级" name="digIntValRiskLvl" ctype="select" disabled="true" data-code="STD_INPRET_VAL_RISK_LVL"></yu-xform-item>
          <yu-xform-item label="申请评分" name="appScore" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="申请评分风险等级" name="appScoreRiskLvl" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="规则风险等级" name="ruleRiskLvl" ctype="select" disabled="true" data-code="STD_RULE_RISK_LVL"></yu-xform-item>
          <yu-xform-item label="综合风险等级" name="inteRiskLvl" ctype="select" disabled="true" data-code="STD_INTE_RISK_LVL"></yu-xform-item>
          <yu-xform-item label="额度建议" name="lmtAdvice" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="定价建议" name="priceAdvice" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" :hidden="true" name="inputDate" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="最后修改日期" :hidden="true" name="updDate" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="创建时间" :hidden="true" name="createTime" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="修改时间" :hidden="true" name="updateTime" ctype="input" disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons :padding-left="500">
      <yu-button type="primary" @click="leveTest">评级测算</yu-button>
      <yu-button type="primary" @click="view">查看</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ]
    };
  },
  mounted () {
    var _this = this;
    var iqpSerno = _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno;
    yufp.clone({ iqpSerno: iqpSerno }, _this.formdata);
    // 进入初始化
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpcuslsnpinfo/selectbyiqpserno',
      data: {iqpSerno: iqpSerno},
      callback: function (code, message, response) {
        if (code == 0) {
          if (response.data != null) {
            yufp.clone(response.data[0], _this.formdata);
          } else {
            _this.$message({ message: '查询失败,请重试', type: 'warning' });
          }
        } else {
          _this.$message({ message: message, type: 'warning' });
        }
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    // 评级测算
    leveTest: function () {
      var _this = this;
      let postData = {};
      yufp.clone(_this.formdata, postData);
      // 发送请求修改数据;
      this.$request({
        data: postData,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpcuslsnpinfo/updatelevel'
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            // this.formdata.digIntVal = data;
            yufp.clone(data, _this.formdata);
            this.$message({ message: '测算成功', type: 'success' });
          } else {
            this.$message({ message: '测算失败,请重试', type: 'warning' });
          }
        } else {
          this.$message({ message: message, type: 'warning' });
        }
      });
    },
    // 查看零售内评
    view () {
      const url = this.getLsnpRirsUrl();
      // let date = new Date();
      if (url != '') {
        this.$nextTick(function () {
          window.open(url, '_blank');
        });
      }
    },


    //  获取跳转押品系统url
    getLsnpRirsUrl () {
      let _this = this;
      let lsnprirsurl;
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/iqpcuslsnpinfo/getlsnprirsurl',
        data: {iqpSerno: _this.formdata.iqpSerno, managerId: _this.$xutils.getLoginUserInfo().loginCode},
        success: (response, status, xhr) => {
          if (response.data != null) {
            lsnprirsurl = response.data;
          }
        }
      });
      return lsnprirsurl;
    }
  }
};
</script>
