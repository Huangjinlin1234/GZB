<template>
  <yu-row>
  <yu-col :span="4">
    <yu-menu default-active="1" @select="handleSelect">
       <yu-menu-item index="1">申请信息</yu-menu-item>
      <!--<yu-menu-item index="2">影像资料</yu-menu-item>-->
      <yu-menu-item index="3" v-if="showHis">审批历史</yu-menu-item>
    </yu-menu>
  </yu-col>
   <yu-col :span="20">
   <!--展期申请-->
   <div v-if="tabIndex == '1'">
     <rateInfo :pageParams="pageParams"></rateInfo>
   </div>
   <!--影像-->
    <!--
    <div v-if="tabIndex == '2'">
    </div>
    -->
    <!--审批历史-->
    <div v-if="tabIndex == '3'">
      <processTrajectory v-if="show3Flag" :page-params="pageParams"> </processTrajectory>
    </div>
   </yu-col>
  </yu-row>
</template>
<script>
import rateInfo from './iqpPrePaymentInfo.vue';
import processTrajectory from '@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/processTrajectory';
export default {
  components: {rateInfo,processTrajectory},
  data () {
    return {
      tabIndex: '1',
      activeName: 'first',
      pageParams: this.$route.meta.params,
      showHis: false,
      show3Flag: false
    };
  },
  props: {
    bizPageData: Object
  },
  created () {
    let _this = this;
    _this.pageParams = _this.$route.meta.params;
    if (_this.bizPageData) {
      _this.pageParams = {};
      _this.pageParams.iqpSerno = _this.bizPageData.instanceInfo.bizId;
      _this.pageParams.opType = 'VIEW';
      _this.pageParams.serno = _this.pageParams.iqpSerno;
      _this.pageParams.op = 'VIEW';
      _this.pageParams.flowPage = true;
    } else {
      if (_this.pageParams.opType == 'VIEW') {
        _this.showHis = true;
        _this.pageParams.serno = _this.pageParams.iqpSerno;
        _this.pageParams.op = 'VIEW';
      }
    }
  },
  methods: {
    handleSelect: function (index) {
      this.tabIndex = index;
      if(index == '3'){
        this.show3Flag = true;
      }
    }
  }
};
</script>
