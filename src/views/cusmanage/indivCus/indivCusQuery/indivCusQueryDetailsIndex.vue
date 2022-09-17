<template>
  <yu-row :gutter="10">
    <yu-col :span="6">
      <yu-menu
        default-active="1-1-1"
        class="el-menu-vertical-demo"
        @select="handleOpen"
      >
        <yu-submenu index="1">
          <template slot="title">个人客户</template>
          <yu-submenu index="1-1">
            <template slot="title">客户概况</template>
            <yu-menu-item index="1-1-1">客户基础信息</yu-menu-item>
            <yu-menu-item index="1-1-2">财务报表信息</yu-menu-item>
          </yu-submenu>
          <yu-menu-item index="1-2">评级必要信息</yu-menu-item>
          <yu-submenu index="1-3">
            <template slot="title">客户关联信息</template>
            <yu-menu-item index="1-3-1">社会关系信息</yu-menu-item>
            <yu-menu-item index="1-3-2">对外投资信息</yu-menu-item>
          </yu-submenu>
          <yu-menu-item index="1-4">客户影像资料</yu-menu-item>
        </yu-submenu>
      </yu-menu>
    </yu-col>
    <yu-col :span="18">
      <yu-tabs v-model="activeName" v-if="basic" @tab-click="handleClick">
        <yu-tab-pane label="工作信息" name="work">
          <d1B3Billcard ref="d1_1_Billlist" :params="pageParams"></d1B3Billcard>
        </yu-tab-pane>
      </yu-tabs>
      <d1-billcard ref="d1_BillCard" :params="pageParams" v-if="forlevel"></d1-billcard>
      <d1-billlist ref="d1_BillList" v-if="finc"></d1-billlist>
      <d114Billlist ref="d1_14_Billlist" v-if="soci"></d114Billlist>
      <d118Billlist ref="d1_18_Billlist" v-if="forout"></d118Billlist>
    </yu-col>
  </yu-row>
  <!-- <div>
   
  </div> -->
</template>
<script>
import d1B3Billcard from './indivCusQueryDetails_d1_B_3_BillCard.vue'
import d1Billcard from './indivCusQueryDetails_d1_BillCard.vue'
import d1Billlist from './indivCusQueryDetails_d1_BillList.vue'
import d114Billlist from './indivCusQueryDetails_d1_14_BillList.vue'
import d118Billlist from './indivCusQueryDetails_d1_18_BillList.vue'
export default {
  components:{d1B3Billcard, d1Billcard, d1Billlist, d114Billlist, d118Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_B_3_BillCard: null,
      d1_BillCard: null,
      d1_BillList: null,
      d1_14_BillList: null,
      d1_18_BillList: null,
      activeName: 'work',
      basic: true,
      finc: false,
      soci: false,
      forout: false,
      forlevel: false
    }
  },
  mounted() {
    // this.AfterInit()
  },
  methods:{
    reset(){
      const arr = ['basic', 'finc', 'soci', 'forout', 'forlevel']
      arr.forEach(item => {
        if(this[item] === true) this[item] = false
      });
    },
    handleOpen(index){
      const map = {'1-1-1': 'basic', '1-1-2': 'finc', '1-2': 'forlevel', '1-3-1': 'soci', '1-3-2': 'forout'}
      this.reset()
      this[map[index]] = true
    },
    handleClick(){

    },
    /**
       * 个人客户查询详情界面
       * @constructor
       */
    // AfterInit() {
    //   // this.$xutils.createLeftMenu('d1_A', [
    //   //   '个人客户.客户概况.客户基础信息',
    //   //   '个人客户.客户概况.财务报表信息',
    //   //   '个人客户.评级必要信息',
    //   //   '个人客户.客户关联信息.社会关系信息',
    //   //   '个人客户.客户关联信息.对外投资信息',
    //   //   '个人客户.客户影像资料'
    //   // ], myClickMenu);
  
    //   // //点击菜单逻辑
    //   // function myClickMenu(_menuNo, _menuText, _dom) {
    //   //   if (_menuText == '客户基础信息') {
    //   //     this.d1_B_1_BillCard = this.$refs.d1_B_1_BillCard;
    //   //     this.d1_B_2_BillCard = this.$refs.d1_B_2_BillCard;
    //   //     this.d1_B_3_BillCard = this.$refs.d1_B_3_BillCard;
    //   //     this.d1_B_4_BillCard = this.$refs.d1_B_4_BillCard;
    //   //   } else if (_menuText == '财务报表信息') {
    //   //     this.d1_BillList = this.$refs.d1_BillList;
    //   //   } else if (_menuText == '评级必要信息') {
    //   //     this.d1_BillCard = this.$refs.d1_BillCard;
    //   //   } else if (_menuText == '社会关系信息') {
    //   //     this.d1_BillList = this.$refs.d1_BillList;
    //   //   } else if (_menuText == '对外投资信息') {
    //   //     this.d1_BillList = this.$refs.d1_BillList;
    //   //   }
    //   // }
    // }
  }
};
</script>
