<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="授信批复信息">
  <div>
    <div style="height:50%">
        <div>
    <div style="height:50%">
        <d1-1-b-a-billlist ref="d1_1_B_A_BillList"></d1-1-b-a-billlist>
    </div>
    <div style="height:calc(100% - 50%)">
        <d1-1-b-b-billlist ref="d1_1_B_B_BillList"></d1-1-b-b-billlist>
    </div>
  </div>
    </div>
    <div style="height:calc(100% - 50%)">
        <d1-1-a-billcard ref="d1_1_A_BillCard"></d1-1-a-billcard>
    </div>
  </div>
    </yu-tab-pane>
    <yu-tab-pane label="批复历史沿革">
  <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11ABillcard from './lmtReplyDetailview_d1_1_A_BillCard.vue'
import d11BABilllist from './lmtReplyDetailview_d1_1_B_A_BillList.vue'
import d11BBBilllist from './lmtReplyDetailview_d1_1_B_B_BillList.vue'
import d12Billlist from './lmtReplyDetailview_d1_2_BillList.vue'
/**
 * title 授信批复详情
 * author zhangming12
 * date 2021-04-17
 * */

// 初始化页面
let cardParam;

export default {
  components:{d11ABillcard, d11BABilllist, d11BBBilllist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_1_A_BillCard: null,
      d1_1_B_A_BillList: null,
      d1_1_B_B_BillList: null,
      d1_2_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      // 单一授信批复台表账
      this.d1_1_A_BillCard = this.$refs.d1_1_A_BillCard;

      let accNo = this.pageParams.accNo; // 批复台账号
      let replySerno = this.pageParams.replySerno; // 批复编号
      this.d1_1_A_BillCard.queryDataByCondition({accNo: accNo});
      cardParam = this.d1_1_A_BillCard.getBillCardValue();
      let consignorCusId = this.pageParams.consignorCusId;

      if (consignorCusId === null || consignorCusId == '') {
        this.d1_1_A_BillCard.setBillCardItemVisible(
          'consignor_cus_id;consignor_cus_name;consignor_cert_type;consignor_cert_no;consignor_type',
          false
        );
      }

      // 批复分项
      this.d1_1_B_A_BillList = this.$refs.d1_1_B_A_BillList;

      this.d1_1_B_A_BillList.queryDataByCondition({accNo: accNo});

      // 授信批复用信条件
      this.d1_1_B_B_BillList = this.$refs.d1_1_B_B_BillList;

      // let accNo = cardParam['acc_no'];
      this.d1_1_B_B_BillList.queryDataByCondition({lmtAccNo: accNo});

      // 查看批复报告
      function qryReport(replySerno) {
        // YuXP.openDialogAndCloseMe('批复报告', '', -1, -1, replySerno, true, true);
        // alert('待开发');
      }

      // 批复历史沿革
      this.d1_2_BillList = this.$refs.d1_2_BillList;

      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtreply/getHisReply/' + replySerno,
        type: 'GET',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.rtnData = response.data;
            let replies = this.rtnData.lmtReplies;
            const replyList = [];

            replies.forEach(element => {
              let reply = this.$xutils.toUpperCase(element, false);
              replyList.push(reply);
            });

            this.d1_2_BillList.setBillListData(replyList);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    viewReport() {
      // alert('待开发');
    },

    viewAppDetail() {
      const jsoPar = this.d1_2_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$dialog.open(
        '授信申报详情',
        'bizmanage/lmtBiz/lmtReplyAcc/lmtAppInfoReplyIndex',
        800,
        600,
        jsoPar,
        null
      );
    },

    goBack() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
