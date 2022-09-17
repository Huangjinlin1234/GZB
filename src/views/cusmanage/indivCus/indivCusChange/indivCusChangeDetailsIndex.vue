<template>
  <yu-row :gutter="10">
    <yu-col :span="6">
      <yu-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @select="handleOpen"
      >
        <yu-submenu index="1">
          <template slot="title">个人客户</template>
          <yu-menu-item index="1-1">客户基本信息</yu-menu-item>
          <yu-menu-item index="1-2">社会关系信息</yu-menu-item>
          <yu-menu-item index="1-3">客户影像资料</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :span="18">
      <d1B3Billcard ref="d1_14_Billlist" v-if="soci"></d1B3Billcard>
      <d1Billcard ref="d1_18_Billlist" v-if="basic"></d1Billcard>
    </yu-col>
  </yu-row>
</template>
<script>
import d1B3Billcard from './indivCusChangeDetails_d1_B_3_BillCard.vue'
import d1Billcard from './indivCusChangeDetails_d1_BillCard.vue'
export default {
  components:{d1B3Billcard, d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_B_3_BillCard: null,
      d1_BillCard: null,
      soci: false,
      basic: true

    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    reset(){
      const arr = ['basic', 'soci']
      arr.forEach(item => {
        if(this[item] === true) this[item] = false
      });
    },
    handleOpen(index){
      const map = {'1-1': 'basic', '1-2': 'soci'}
      this.reset()
      this[map[index]] = true
    },
    /**
       *个人转正详情界面
       * @constructor
       */
    AfterInit() {
      // this.$xutils.createLeftMenu('d1_A', ['个人客户.客户基本信息', '个人客户.社会关系信息', '个人客户.客户影像资料'], myClickMenu);
    },
  
    //点击菜单逻辑
    // myClickMenu(_menuNo, _menuText, _dom) {
    //   if (_menuText == '客户基本信息') {
    //     this.d1_B_1_BillCard = this.$refs.d1_B_1_BillCard;
    //     this.d1_B_2_BillCard = this.$refs.d1_B_2_BillCard;
    //     this.d1_B_3_BillCard = this.$refs.d1_B_3_BillCard;
    //     this.d1_B_4_BillCard = this.$refs.d1_B_4_BillCard;
  
    //     // 执行默认值公式!!同步请求!!
    //     this.d1_B_1_BillCard.execBillCardDefaultValueFormula();
    //   } else if (_menuText == '社会关系信息') {
    //     this.d1_BillCard = this.$refs.d1_BillCard;
    //   } else if (_menuText == '客户影像资料') {
    //     alert('集成影像平台个人客户影像功能');
    //   }
    // },
  
    save() {
      this.d1_B_1_BillCard.saveBillCardData();
    },
  
    doBack() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
