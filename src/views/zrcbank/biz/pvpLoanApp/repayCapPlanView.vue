<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账申请-还本计划明细查看
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="true">
        <yu-xform-group column="2">
          <yu-xform-item label="流水号" name="serno" rules="required" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="期数" name="terms" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="还款日期" name="repayDate" ctype="datepicker" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="还本金额" name="repayAmt" ctype="yu-num" :disabled="true"></yu-xform-item>

          <yu-xform-item label="登记人ID" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构ID" name="inputBrId" hidden ></yu-xform-item>
          <yu-xform-item label="登记时间" name="inputDate" hidden ></yu-xform-item>
          <yu-xform-item label="更新人ID" name="updId" hidden ></yu-xform-item>
          <yu-xform-item label="更新人机构ID" name="updBrId" hidden ></yu-xform-item>
          <yu-xform-item label="更新时间" name="updDate" hidden ></yu-xform-item>
          <yu-xform-item label="登记人名称" name="inputIdName" :disabled="true"></yu-xform-item>  
          <yu-xform-item label="登记机构名称" name="inputBrIdName" :disabled="true"></yu-xform-item>  
          <yu-xform-item label="修改人名称" name="updIdName" :disabled="true" hidden></yu-xform-item>  
          <yu-xform-item label="更新机构名称" name="updBrIdName" :disabled="true" hidden></yu-xform-item>  

        </yu-xform-group>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_OPER_TYPE');
let obj = {};
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: '/trade/example/list',
      formdata: {},
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  mounted () {
    let _this = this;
    console.log(_this.pageParams);
    yufp.clone(_this.pageParams, _this.formdata);
  },

  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      // this.$router.go(-1);
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>