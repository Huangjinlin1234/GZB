
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="输入查询条件" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="2">
          <yu-xform-item label="集团编号" placeholder="集团编号" name="grpNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="集团名称" placeholder="集团名称" name="grpName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="集团客户额度视图列表" panel-type="simple">
      <yu-button-drop>
        <yu-button @click="infoFn" type="primary">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" selection-type="radio" :default-load="false" request-type="POST">
        <yu-xtable-column label="集团客户编号" prop="grpNo"></yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpName"></yu-xtable-column>
        <yu-xtable-column label="授信总额" align="center">
          <yu-xtable-column label="授信总额" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="合同已占用额度" prop="totalUseAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="授信总额可用" prop="totalValAmt" :formatter="Currency"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="授信敞口" align="center">
          <yu-xtable-column label="授信敞口" prop="totalSpacAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="合同已占用额度" prop="totalSpacUseAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt" :formatter="Currency"></yu-xtable-column>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixin from '@/utils/mixin';
import { mapState } from 'vuex';

yufp.lookup.reg('CERT_TYPE,CARD_NO');

export default {
  mixins: [mixin],
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisLmt + '/api/apprstrmtableinfo/selectGrpStrInfoByList',
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
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
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
    let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
    this.instuCde = jsoUser.instu.code;
    this.Param = { condition: JSON.stringify({ instuCde: this.instuCde, cusType: '4' }) };
  },
  methods: {
    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var routeKey = 'apprStrLmtDetail' + selectionsAry[0].grpNo;
      model.cusId = selectionsAry[0].grpNo;
      model.instuCde = selectionsAry[0].instuCde;
      model.formdata = selectionsAry[0];
      model.routeKey = routeKey;
      model.viewType = 'DETAIL';
      model.callback = _this.getReturn;
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/apprStrLmt/apprStrLmtDetailGroup/apprStrLmtDetailGroup',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '集团客户额度视图详情',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    }
  }
};
</script>
