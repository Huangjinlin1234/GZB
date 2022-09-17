<template>
  <div>
      <div>
          <d1-billlist ref="d1_BillList"></d1-billlist>
      </div>

      <div style="margin-top: 50px">
          <d1-b-billlist ref="d1_B_BillList"  :operate="operate"></d1-b-billlist>
      </div>
  </div>
</template>
<script>
import d1Billlist from './cusYndListSideIndgt_d1_BillList.vue';
import d1BBilllist from './cusYndListAppUpdate_d1_B_BillList.vue';
export default {
  components: {d1Billlist, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      d1_B_BillList: null,
      operate: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 刘愿 优农贷名单申请侧面调查列表
     */

    AfterInit () {

      this.d1_B_BillList = this.$refs.d1_B_BillList;
      this.operate = this.getFactory().contextData.opType;
      this.d1_BillList = this.$refs.d1_BillList;
      var serno = '';
      if(this.getFactory().contextData.instanceInfo && this.getFactory().contextData.instanceInfo.bizId){
        serno = this.getFactory().contextData.instanceInfo.bizId;
      } else if (this.getFactory().contextData.serno){
        serno = this.getFactory().contextData.serno;
      } else if (this.pageParams.serno){
        serno = this.pageParams.serno;
      }
      
      if (this.getFactory().contextData.op == 'VIEW') {
        // this.d1_A_BillCard.changeStatus();
        this.d1_BillList.showBtn = false;
        this.d1_B_BillList.showbtn = false;
      }
      if (this.getFactory().contextData.hiddenBtn) {
        this.$refs.d1_B_BillList.showbtn = false;
      }
      
      this.d1_BillList.queryDataByCondition({serno: serno});
      this.d1_B_BillList.queryDataByCondition({serno:serno});
      
      // this.d1_BillList.$refs.refTable.remoteData({condition{serno: this.getFactory().contextData.serno});
    },

    // 侧面调查 新增按钮
    byadd () {
      const jsoPar = {
        'flag': 'add'
      };

      if (this.getFactory().contextData) {
        jsoPar.serno = this.getFactory().contextData.serno;
      }

      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数

      this.$dialog.open(
        '侧面调查信息新增',
        'cusmanage/cusListMana/cusYndList/cusYndIndgtListAppAddIndex',
        900,
        200,
        jsoPar,
        (serno) => {
          if (serno) {
            this.$refs.d1_BillList.queryDataByCondition({serno: serno});
            // this.d1_BillList.$refs.refTable.remoteData({serno: serno});
          }
        }
      );
    },

    // 取消按钮
    onCancel () {
      this.$dialog.close(this.dialogId);
    },
    // 紧急联系人 新增按钮
    onInsert () {

      var _this = this;
      var serno ;
      if(this.getFactory().contextData.instanceInfo && this.getFactory().contextData.instanceInfo.bizId){
        serno = this.getFactory().contextData.instanceInfo.bizId;
      } else if (this.getFactory().contextData.serno){
        serno = this.getFactory().contextData.serno;
      } else if (this.pageParams.serno){
        serno = this.pageParams.serno;
      }
      
      _this.$dialog.open(
        '紧急联系人新增',
        'cusmanage/cusListMana/cusYndList/cusYndUrgentListAppAddIndex',
        800,
        300,
        {'serno': serno},
        () => {
          _this.$refs.d1_B_BillList.queryDataByCondition({serno: serno});
        }
      );
    },

    showAction () {}
  }
};
</script>
