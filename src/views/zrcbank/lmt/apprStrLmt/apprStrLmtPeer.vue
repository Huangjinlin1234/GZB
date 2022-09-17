
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
    <yu-panel title="同业客户额度视图列表" panel-type="simple">
      <yu-button-drop>
        <yu-button @click="infoFn" type="primary">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" selection-type="radio" :default-load="false" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="授信总额（万元）" prop="totalAmt">
          <template slot-scope="scope">
            <span>{{ Currency(parseFloat(scope.row.totalAmt / 10000).toFixed(2)) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="授信总额已用（万元）" prop="totalUseAmt">
          <template slot-scope="scope">
            <span>{{ Currency(parseFloat(scope.row.totalUseAmt / 10000).toFixed(2)) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="授信总额可用（万元）" prop="totalAvlAmt">
          <template slot-scope="scope">
            <span>{{ Currency(parseFloat(scope.row.totalAvlAmt / 10000).toFixed(2)) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="产品授信总额（万元）" prop="totalPrdAmt">
          <template slot-scope="scope">
            <span>{{ Currency(parseFloat(scope.row.totalPrdAmt / 10000).toFixed(2)) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="产品授信已用（万元）" prop="totalPrdUseAmt">
          <template slot-scope="scope">
            <span>{{ Currency(parseFloat(scope.row.totalPrdUseAmt / 10000).toFixed(2)) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="产品授信可用（万元）" prop="totalPrdAvlAmt">
          <template slot-scope="scope">
            <span>{{ Currency(parseFloat(scope.row.totalPrdAvlAmt / 10000).toFixed(2)) }}</span>
          </template>
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
      dataUrl: backend.cmisLmt + '/api/apprstrmtableinfo/selectSigStrInfoByList',
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
    console.log(this.instu);
    let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
    this.instuCde = jsoUser.instu.code;
    this.Param = { condition: JSON.stringify({ instuCde: this.instuCde, cusType: '3' }) };
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
          name: 'zrcbank/lmt/apprStrLmt/apprStrLmtDetailPeer/apprStrLmtDetailPeer',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '同业客户额度视图详情',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    }
  }
};
</script>
