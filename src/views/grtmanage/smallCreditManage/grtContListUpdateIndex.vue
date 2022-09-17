<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './grtContListUpdate_d1_A_BillCard.vue';
import d1BBilllist from './grtContListUpdate_d1_B_BillList.vue';
// 修改界面(抵押担保合同)
let param = {};

export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      param = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      this.d1_A_BillCard.setBillCardValue(param);
    },

    // 保存
    onSave () {
      let iqpLoanAppSaveDto = this.d1_A_BillCard.getBillCardValue();
      // console.info(iqpLoanAppSaveDto);

      this.$xutils.request({
        // 同步请求
        async: true,

        type: 'post',
        url: this.$backend.cmisBiz + '/api/grtguarcont/update',
        data: JSON.stringify(this.$xutils.toUpperCase(iqpLoanAppSaveDto, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据

            this.$xutils.showMsgBox('提示', '保存成功' + JSON.stringify(response.data), 500, 300, () => {
              this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);


            // exit;// ajax中return不生效，可以用exit
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示


          // exit;// ajax中return不生效，可以用exit
        }
      });
    },

    // 返回列表
    OnCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
