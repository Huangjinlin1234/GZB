<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './infGuarantorList_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    //保证人信息
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;// 创建卡片
  
      this.d1_BillList.queryDataByCondition({guar_cont_no: this.getFactory().contextData.guarContNo, status : '1', opr_type: '01'});
      //   ' = \'' + this.getFactory().contextData.guar_cont_no + '\'and status = \'1\' and opr_type = \'01\''
      // );
  
      //20201230 针对业务申请时，入参字段optType
      //最高额担保合同【引入-importMax】【修改担保金额-updateMax】【查看-view】操作时，隐藏操作按钮
      //一般担保合同【引入-importN】操作时，隐藏操作按钮
      if (this.getFactory().contextData.op == 'VIEW' || this.getFactory().contextData.myop == 'SIGN' || this.getFactory().contextData.myop == 'onLogout' || this.getFactory().contextData.optType == 'importMax' || this.getFactory().contextData.optType == 'updateMax' || this.getFactory().contextData.optType == 'view' || this.getFactory().contextData.optType == 'importN') {
        // this.d1_BillList.setBillListButtonVisable('删除', false);//删除
        // this.d1_BillList.setBillListButtonVisable('新增', false);//新增
        this.d1_BillList.add = false
        this.d1_BillList.del = false

      }
    },
  
    // 新增保证人信息
    onInsert() {
      this.$dialog.open(
        '',
        'guarmanage/collateralInfo/guarCollateralDetailIndex',
        -1,
        -1,
        this.getFactory().contextData,
        this.getDialogDataFunc
      );
    },
  
    getDialogDataFunc() {
      this.d1_BillList.queryDataByCondition({guar_cont_no: this.getFactory().contextData.guarContNo, status : '1', opr_type: '01'});
    },
  
    // 查看保证人信息
    onView() {
      let params = this.d1_BillList.getSelectedRowData();
  
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
  
      params['model_group_no'] = 'GUARINFO_SHOW_MODEL_GROUPS';
      params['op'] = 'VIEW';
  
      this.$dialog.open(
        '押品管理',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params
      );
    },
  
    //删除
    onDelete() {
      let params = this.d1_BillList.getSelectedRowData();
  
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
  
      this.d1_BillList.onBillListLogicDelete();
    }
  }
};
</script>
