
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="合同选择" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
        <yu-button @click="customClick('addCont')">新增</yu-button>
        <yu-button @click="customClick('deleteCont')">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" :data-url="ctrLoanInfoUrl" :base-params="Param" request-type="GET">
        <yu-xtable-column label="主键编号" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" hide-column></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        <yu-xtable-column label="产品类型属性" prop="prdTypeProp" width="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType"  data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="合同起始日期" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日期" prop="contEndDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import mixinForm from '@/utils/mixins/mixin-form';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_TYPE,STD_PRD_TYPE_PROP');

export default {
  mixins: [mixinForm],
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
  },
  data: function () {
    return {
      searchFormdata: {},
      ctrLoanInfoUrl: '',
      formdata: {},
      saveBtnShow: true,
      Param: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      instu: state => state.oauth.instu, // 金融机构Object
      loginCode: state => state.oauth.loginCode
    })
  },
  mounted () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      // 关联个人客户授信额度明细
      this.ctrLoanInfoUrl = backend.cmisBiz + '/api/grtstockdebtrel/selectbyguarcontno/' + this.pageParams.guarContNo;
    },
  }
};
</script>
