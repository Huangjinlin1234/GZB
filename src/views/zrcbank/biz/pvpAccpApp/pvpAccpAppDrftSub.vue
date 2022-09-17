<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 银承出账票据明细
  -->
  <div>

    <yu-panel title="票据明细" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" :base-params="tableParams" :data-url="tableUrl" request-type="POST" :default-load="false" row-number>
        <yu-xtable-column label="票据号码" prop="billno"></yu-xtable-column>
        <yu-xtable-column label="票面金额" prop="fBillAmount"></yu-xtable-column>
        <yu-xtable-column label="出票日期" prop="isseDt"></yu-xtable-column>
        <yu-xtable-column label="到期日" prop="dueDt"></yu-xtable-column>
        <yu-xtable-column label="出票人名称" prop="drwrNm"></yu-xtable-column>
        <yu-xtable-column label="收款人" prop="pyeeNm"></yu-xtable-column>
        <yu-xtable-column label="承兑行名称" prop="accptrNm"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      tableParams: {},
      tableUrl: backend.cmisBiz + '/api/pvpaccpappdrftsub/showlist',
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
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  mounted () {
    var _this = this;
    this.getFactory().setButtonVisiable('commit', false);
    this.getFactory().setButtonVisiable('save', false);
    this.getFactory().setButtonVisiable('tempSave', false);
    this.getFactory().setButtonVisiable('back', false);
    let data = _this.getFactory().contextData;
    let pvpSerno = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      pvpSerno = data.bizId;
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      pvpSerno = data.pvpSerno;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      pvpSerno = data.pvpSerno;
    }
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    this.tableParams = { serno: pvpSerno };
  },
  methods: {}
};
</script>
