
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
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="法人客户额度视图列表" panel-type="simple">
      <yu-button-drop>
        <yu-button @click="infoFn" type="primary">查看</yu-button>
         <yu-button @click="initFn" type="primary">初始化总额</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :parse-response="requestSuccess" :data-url="dataUrl" :base-params="Param" selection-type="radio" :default-load="false" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
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
      dataUrl: backend.cmisLmt + '/api/apprstrmtableinfo/selectStrInfoByList',
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
    this.Param = { condition: JSON.stringify({ instuCde: this.instuCde, cusType: '2' }) };
  },
  methods: {
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
    },
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
      var routeKey = 'apprStrLmtDetail' + selectionsAry[0].cusId;
      model.cusId = selectionsAry[0].cusId;
      model.instuCde = selectionsAry[0].instuCde;
      model.formdata = selectionsAry[0];
      model.routeKey = routeKey;
      model.viewType = 'DETAIL';
      model.callback = _this.getReturn;
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/apprStrLmt/apprStrLmtDetail/apprStrLmtDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '法人客户额度视图详情',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 初始化总金额
     */
    initFn: function () {
      var _this = this;
      var model = {};
      var updateurl = backend.cmisLmt + "/api/apprlmtsubbasicinfo/batch/upateAvlAmt";
      yufp.service.request({
        method: "POST",
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message("修改成功");
              // 明细列表页面根据关联流水号查询
              //this.reloadData();
          } else {
            this.$xutils.showMsgBox('提示', '处理失败' + response.message);
           }
        },
      });
    }
  }
};
</script>
