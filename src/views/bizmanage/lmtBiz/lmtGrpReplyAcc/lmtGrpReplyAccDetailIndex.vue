<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="授信批复信息">
  <div>
    <div style="height:30%">
        <d1-1-a-billcard ref="d1_1_A_BillCard"></d1-1-a-billcard>
    </div>
    <div style="height:calc(100% - 30%)">
        <d1-1-b-billlist ref="d1_1_B_BillList" :page-params="pageParams"></d1-1-b-billlist>
    </div>
  </div>
    </yu-tab-pane>
    <yu-tab-pane label="批复历史沿革">
  <d1-2-billlist :grp-reply="pageParams" ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11ABillcard from './lmtGrpReplyAccDetail_d1_1_A_BillCard.vue';
import d11BBilllist from './lmtGrpReplyAccDetail_d1_1_B_BillList.vue';
import d12Billlist from './lmtGrpReplyAccDetail_d1_2_BillList.vue';
/**
 * title 查看批复详情
 * author yangwl
 * date 2021-04-12
 * */
// 初始化页面
let par = {};

export default {
  components: {d11ABillcard, d11BBilllist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_A_BillCard: null,
      d1_1_B_BillList: null,
      d1_2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      par = this.pageParams;
      this.d1_1_A_BillCard = this.$refs.d1_1_A_BillCard;
      this.d1_1_B_BillList = this.$refs.d1_1_B_BillList;
      // 初始化表单数据
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpreplyacc/querylmtgrpreplyaccbygrpreplyserno',
        data: par,
        callback: function (code, message, response) {
          this.d1_1_A_BillCard.setBillCardValue(response.data);
        }
      });
    },

    // 返回按钮
    doBack () {
      this.param['cus_id'] = '123';
      this.$dialog.open(
        '查看详情',
        'yuxp/product/pages/bizmanage/lmtBiz/lmtGrpReplyAcc/lmtGrpReplyAccListIndex',
        -1,
        -1,
        this.param,
        null
      );
    },

    // 查看批复报告
    view () {}
  }
};
</script>
