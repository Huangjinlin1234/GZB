<template>
  <div>
    <div>
        <d1-a-billlist ref="d1_A_BillList" v-if="guarWay != '30'"></d1-a-billlist>
    </div>
    <div>
        <d1-acont-billlist ref="d1_Acont_BillList" v-if="guarWay == '30'"></d1-acont-billlist>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABilllist from './ctrLmtRelGrtList_d1_A_BillList.vue';
import d1BBilllist from './ctrLmtRelGrtList_d1_B_BillList.vue';
import d1AcontBilllist from './ctrLmtRelGrtList_d1_Acont_BillList.vue';
export default {
  components: {d1ABilllist, d1BBilllist, d1AcontBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillList: null,
      d1_B_BillList: null,
      d1_A1_BillList: null,
      guarWay: ''
    };
  },
  mounted () {
    this.guarWay = this.getFactory().contextData.guarWay;
    this.AfterInit();
  },
  methods: {
    // 业务关联信息
    AfterInit () {
      this.d1_A_BillList = this.$refs.d1_A_BillList;// 创建卡片
      // this.d1_A_BillList.queryDataByCondition({cont_no: this.getFactory().contextData.contNo});
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 创建卡片
      // this.d1_B_BillList.queryDataByCondition(
      //   'guar_cont_no = \'' + this.getFactory().contextData.guar_cont_no + '\' and corre_rel != \'3\' and r_type = \'2\''
      // );

      if (this.getFactory().contextData.op == 'VIEW') {
        // 设置按钮隐藏
        this.d1_A_BillList.setBillListButtonVisable('$update', false);
      }
    }
  }
};
</script>
