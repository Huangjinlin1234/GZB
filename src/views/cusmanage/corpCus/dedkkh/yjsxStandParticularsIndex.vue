<template>
  <div>
    <div style="height:calc(100% - 400px)">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:400px">
      <div>
        <div style="height:85%">
          <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
        </div>
        <div style="height:calc(100% - 85%)">
          <div style="display: table; height: 100%; margin: 0 auto">
            <yu-button type="primary" @click="back()">返回</yu-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './yjsxStandParticulars_d1_A_BillCard.vue'
import d1BABilllist from './yjsxStandParticulars_d1_B_A_BillList.vue'
export default {
  components:{d1ABillcard, d1BABilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_A_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
     * 压降台账查看页面
     */
    AfterInit() {
      const param = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      //将携带过来的数据放入卡片中
      this.d1_A_BillCard.setBillCardValue(param);
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
      //插入压降任务数据
      this.d1_B_A_BillList.queryDataByCondition('list_serno=\'' + param.listSerno + '\'');
    },
    // 返回
    back() {
      this.$dialog.close(this.dialogId);
    },
    //通过客户编号查询
    selectdata() {}
  }
};
</script>
