<template>
  <!--
    @created by zlf
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata">
      <yu-panel title="详情信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="业务编号" :hidden="true" name="bizNo" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="申请流水号" name="serno" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="与借款人关系" name="debitRela" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="证件号码" name="certCode" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="现有消费类融资余额(万元)" name="consumeFinBal" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="现有消费类融资月还款额(万元)" name="consumeMonRepay" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷款当前逾期金额" name="loanCurtOverdueAmt" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷款单月最高逾期金额(元)" name="loanHighOverdueAmt" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷款最长逾期月数" name="loanLgstOverdueMon" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷记卡当前逾期金额" name="debitCurtOverdueAmt" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷记卡单月最高逾期金额(元)" name="debitHighOverdueAmt" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="贷记卡最长逾期月数" name="debitLgstOverdueMon" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="两年内逾期次数" name="inTwoOverdueTimes" ctype="input" disabled="true"></yu-xform-item>
          <yu-xform-item label="两年外逾期次数" name="outTwoOverdueTimes" ctype="input" disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="备注信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="其他说明" name="cdtOtherMemo" ctype="input"></yu-xform-item>
          <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input" v-if="show"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="save">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      // dataUrl: backend.cmisBiz + "/api/iqploanapp/" + iqpSerno,
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
    let data = _this.$route.meta.params;
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    yufp.service.request({
      method: 'GET',
      url: backend.cmisBiz + '/api/iqpcuscreditinfo/selectserno/' + data.params,
      data: { serno: data.serno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
        yufp.clone({ iqpSerno:response.data.serno}, _this.formdata);
      }
    });
    yufp.service.request({
      method: 'GET',
      url: backend.cmisBiz + '/api/iqploanappassist/' + data.params,
      data: { serno: data.serno },
      callback: function (code, message, response) {
        yufp.clone({ cdtOtherMemo: response.data.cdtOtherMemo }, _this.formdata);  
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    cancelFn: function () {
      this.$router.go(-1);
    },
    //修改备注信息
    save: function () {
      var _this = this;
      let postData = {};
      yufp.clone(_this.formdata, postData);
      // 发送请求修改数据;
      this.$request({
        data: postData,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanappassist/update'       
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data == 1) {
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
