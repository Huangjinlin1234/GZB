<template>
  <div>
    <div style="height:230px">
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 230px)">
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './areaOrgList_d1_A_BillCard.vue';
import d1BBilllist from './areaOrgList_d1_B_BillList.vue';
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
    /*
      微贷区域信息
      */
    AfterInit () {
      const parm = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;// 创建卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 创建表格
      this.d1_A_BillCard.queryDataByCondition({areaNo: parm.areaNo});
      this.d1_B_BillList.queryDataByCondition({areaNo: parm.areaNo});
    },

    // 修改
    doUpdate () {
      const jsoPar = this.d1_A_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        // 新增
        url: this.$backend.cmisBiz + '/api/areamanager/update',

        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.data) {
            jsoPar['model_group_no'] = 'area_manag_list';
            jsoPar['op'] = 'view';
            this.$dialog.open('微贷区域维护页面', 'bizmanage/chgBiz/area/areaOrgListIndex', -1, -1, jsoPar, null);
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    add () {
      const areaNo = this.d1_A_BillCard.getBillCardItemValue('area_no');

      const jsoPar = {
        'areaNo': areaNo
      };

      this.$dialog.open('基本信息', 'bizmanage/chgBiz/area/areaOrgAddIndex', 1000, 1000, jsoPar, null);
    },

    // 取消
    onConfirm () {
      this.$dialog.open(null, 'bizmanage/chgBiz/area/areaManaListIndex', -1, -1, null, null);
    }
  }
};
</script>
