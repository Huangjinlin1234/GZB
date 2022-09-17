<template>
  <!--
    @created by zlf
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata">
      <yu-panel title="工资性收入" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="月收入主键" :hidden="true" name="incomePk" rules="required" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="申请流水号" :hidden="true" name="iqpSerno" rules="required" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="借款人月收入" name="mearn" ctype="input"></yu-xform-item>
          <yu-xform-item label="配偶月收入" name="spouseMearn" ctype="input"></yu-xform-item>
          <yu-xform-item label="所有共同借款人月收入小计" name="commonMearn" ctype="input"></yu-xform-item>
          <yu-xform-item label="小计" name="subtotal" ctype="input"></yu-xform-item>
          <yu-xform-item label="调查核实情况说明" name="indgtExpl" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" :hidden="true" name="inputId" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" :hidden="true" name="inputBrId" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" :hidden="true" name="inputDate" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="最后修改人" :hidden="true" name="updId" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="最后修改机构" :hidden="true" name="updBrId" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="最后修改日期" :hidden="true" name="updDate" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="创建时间" :hidden="true" name="createTime" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="修改时间" :hidden="true" name="updateTime" ctype="input" disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="还款能力分析" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="家庭合计月收入" name="fearnMearn" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="该笔贷款月支出与家庭月收入比为" name="incomePerc1" ctype="input"></yu-xform-item>
          <yu-xform-item label="所有消费贷款月支出与家庭月收入比"  name="incomePerc2" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款能力" name="repayAbi" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="save">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
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
    var iqpSerno = _this.getFactory().contextData.iqp_serno;
    let data = _this.$route.meta.params;
    // 进入初始化
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpdisassetincome/selectbyiqpserno/' + iqpSerno,
      data: { iqpSerno: iqpSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpdisassetconinfo/show/' + iqpSerno,
      data: { iqpSerno: iqpSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    // 保存
    save: function () {
      var _this = this;
      let postData = {};
      yufp.clone(_this.formdata, postData);
      // 发送请求修改数据;
      this.$request({
        data: postData,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetincome/update'
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            yufp.clone(data, _this.formdata);
            this.$message({ message: '保存成功', type: 'success' });
          } else {
            this.$message({ message: '保存失败,请重试', type: 'warning' });
          }
        }
      });
    }

  }
};
</script>
