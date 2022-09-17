<template>
  <div>
    <d1-a-billlist ref="d1_A_BillList"></d1-a-billlist>
    <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
    <d1-b-b-billlist ref="d1_B_B_BillList"></d1-b-b-billlist>
  </div>
</template>
<script>
import d1ABilllist from './riskInfo_d1_A_BillList.vue';
import d1BABilllist from './riskInfo_d1_B_A_BillList.vue';
import d1BBBilllist from './riskInfo_d1_B_B_BillList.vue';
export default {
  components: {d1ABilllist, d1BABilllist, d1BBBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      ssxx: null,
      fxts: null,
      xdbx: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 优企贷-风险提示*/
    afterInit () {
      // 创建涉诉信息
      this.ssxx = this.$refs.d1_A_BillList;

      // 创建风险提示
      this.fxts = this.$refs.d1_B_A_BillList;

      // 创建历史信贷表现（灰名单）
      this.xdbx = this.$refs.d1_B_B_BillList;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      this.ssxx.baseParams = {surveySerno: this.surveySerno};
      this.queryData(this.surveySerno);
      // const Lawsuit_data = this.queryLawsuit();
      // this.ssxx.setBillListData(Lawsuit_data);
      // const creditrisk_data = this.queryCreditRisk();
      // this.fxts.setBillListData(creditrisk_data);
      // const blacklist_data = this.queryBlacklist();
      // this.xdbx.setBillListData(blacklist_data);
    },

    showAction () {},
    /** 查找黑名单和征信指标信息
     */
    queryData (surveySerno) {
      let _this = this;
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/lmtlitgatinfo/hhmdkh',
        method: 'POST',
        data: {surveySerno: surveySerno}
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (code === '0') {
          _this.xdbx.data = data.hhmdkhList || [];
          _this.fxts.data = data.r007Dto || [];
        }
      });
    }
    // queryLawsuit () {
    //   let rtnData = {};

    //   this.$xutils.request({
    //     // 同步请求
    //     async: false,
    //     url: this.$backend.cmisBiz + '/api/yqdriskinfo/query/queryLawsuit',
    //     success: (response, status, xhr) => {
    //       rtnData = response.data;
    //     },
    //     error: (result, b) => {
    //       this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
    //     }
    //   });

    //   return rtnData;
    // },

    // queryCreditRisk () {
    //   let rtnData = {};

    //   this.$xutils.request({
    //     // 同步请求
    //     async: false,
    //     url: this.$backend.cmisBiz + '/api/yqdriskinfo/query/creditrisk',
    //     success: (response, status, xhr) => {
    //       rtnData = response.data;
    //     },
    //     error: (result, b) => {
    //       this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
    //     }
    //   });

    //   return rtnData;
    // },

    // queryBlacklist () {
    //   let rtnData = {};

    //   this.$xutils.request({
    //     // 同步请求
    //     async: false,
    //     url: this.$backend.cmisBiz + '/api/yqdriskinfo/query/blacklist',
    //     success: (response, status, xhr) => {
    //       rtnData = response.data;
    //     },
    //     error: (result, b) => {
    //       this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
    //     }
    //   });

    //   return rtnData;
    // }
  }
};
</script>
