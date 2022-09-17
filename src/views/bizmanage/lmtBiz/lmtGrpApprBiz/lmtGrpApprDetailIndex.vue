<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
      <d1-a-10-billcard ref="d1_A_10_BillCard"></d1-a-10-billcard>
    </div>
    <div>
      <d1-a-11-billcard ref="d1_A_11_BillCard"></d1-a-11-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './lmtGrpApprDetail_d1_A_BillCard.vue'
import d1A10Billcard from './lmtGrpApprDetail_d1_A_10_BillCard.vue'
import d1A11Billcard from './lmtGrpApprDetail_d1_A_11_BillCard.vue'
export default {
  components:{d1ABillcard, d1A10Billcard, d1A11Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_A_10_BillCard: null,
      d1_A_11_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       * title 集团其他审批事项修改/查看
       * author yangwl
       * date 2021-04-14
       * */
    AfterInit() {
      // YuXP.createSplit('d1', '上下', '30%', null, true, false);
      if (this.getFactory().contextData.op == 'ADD') {
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        // YuXP.createBillList('yuxpservice', 'd1_B', 'lmt_app_sub_prd_list',{'templetname': '适用的授信品种', 'list_btns': '新增/add;修改/update;删除/deletelmtappsubprdSubPrd;查看/view;'},null);
      } else if (this.getFactory().contextData.op == 'EDIT') {
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        // YuXP.createBillList('yuxpservice', 'd1_B', 'lmt_app_sub_prd_list',{'templetname': '适用的授信品种', 'list_btns': '新增/add;修改/update;删除/deletelmtappsubprdSubPrd;查看/view;'},null);
      } else if (this.getFactory().contextData.op == 'VIEW') {
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;

        // YuXP.createBillList('yuxpservice', 'd1_B', 'lmt_app_sub_prd_list',{'templetname': '适用的授信品种', 'list_btns': '查看/view;'},null);
        this.d1_A_BillCard.setBillCardItemRequired('*', false);

        this.d1_A_BillCard.setBillCardItemEditable('*', false);
      }

      this.d1_A_BillCard.setBillCardValue(this.getFactory().contextData);
      // d1_B_BillList.queryDataByCondition('sub_serno = \'' + frameContext.sub_serno+ '\'');
    },

    onSave() {
      let rtnData = {};
      const jsoPar = this.d1_A_BillCard.getBillCardValue();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // showHtmlConfirmBox('提示', '是否确认删除', 150, 100, _callback)
      // 待开发
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtgrpappr/update',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '修改成功!', 350, 150, this.getRefreshList);
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
