<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="空白凭证变更详情">
  <d2-billlist ref="d2_BillList" :pageParams="pageParams" :wfData="bizPageData"></d2-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="审批历史" name="second">
        <coop-approval :params="childParams"></coop-approval>
    </yu-tab-pane>
</yu-tabs></template>
<script>
import { mapState } from 'vuex';
import d2Billlist from './blankCertiModifyAppUpdateIndex.vue';
// import d3Billlist from './blankCertiModifyAppList_d2_BillList.vue';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';

export default {
  components: { d2Billlist, coopApproval },
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      // eslint-disable-next-line camelcase
      d2_BillList: null,
      // eslint-disable-next-line camelcase
      approvalIndex: null
    };
  },
  mounted () {
    // eslint-disable-next-line new-cap
    this.AfterInit();
  },
  methods: {
    /**
     * 权证入库列表页面
     * 日期：2021-04-14
     */
    AfterInit () {
      // eslint-disable-next-line camelcase
      this.d2_BillList = this.$refs.d2_BillList;
      // eslint-disable-next-line camelcase
      this.approvalIndex = this.$refs.approvalIndex;
    }
  },
  created () {
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      loginCode: state => state.oauth.loginCode,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    }),
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.pageParams.serno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  }
};
</script>
