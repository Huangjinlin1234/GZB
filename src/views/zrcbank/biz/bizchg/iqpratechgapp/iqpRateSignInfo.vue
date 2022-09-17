<template>
  <yu-row>
  <yu-col :span="4">
    <yu-menu default-active="1" @select="handleSelect">
       <yu-menu-item index="1">申请信息</yu-menu-item>
      <yu-menu-item index="2">影像资料</yu-menu-item>
      <yu-menu-item index="3">关联信息</yu-menu-item>
    </yu-menu>
  </yu-col>
   <yu-col :span="20">
   <!--展期申请-->
   <div v-if="tabIndex == '1'">
     <rateInfo :page-params="pageParams"></rateInfo>
   </div>
   <!--影像-->
    <div v-if="tabIndex == '2'">
      <imageSystem authority="import;insert;download;scan;delImg" :s="1" :para="imageBizParam"></imageSystem>
    </div>
     <!--关联-->
    <div v-if="tabIndex == '3'">
    </div>
   </yu-col>
  </yu-row>
</template>
<script>
import rateInfo from './iqpRateChgSignApprovePage.vue';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {rateInfo, imageSystem},
  data () {
    return {
      tabIndex: '1',
      activeName: 'first',
      pageParams: this.$route.meta.params
    };
  },
  props: {
    bizPageData: Object
  },
  created () {
    var _this = this;
    this.pageParams = this.$route.meta.params;
    if (this.bizPageData) {
      this.pageParams = {};
      this.pageParams.iqpSerno = _this.bizPageData.instanceInfo.bizId;
      this.pageParams.opType = 'VIEW';
      this.pageParams.flowPage = true;
    }
    let params = this.pageParams
    this.imageBizParam = [
      {
        top_outsystem_code: 'XXD_YWBGXYQD',
        outsystem_code:"XXD_LLBG01,XXD_LLBG02",
        index: {
          businessid: params.iqpSerno,
          custtype: params.curType,
          custconductid: params.inputId,
          custconductname: params.inputIdName,
          orgid: params.inputBrId,
          orgname: params.inputBrIdName,
          opername: params.updIdName,
          custid: params.cusId,
          custname: params.cusName,
          custconduct: '',
          operid: '',
          maintaindate: '',
          contid: "",
          billno: ""
          // custname: params.updBrIdName,
        }
      }
    ];



  },
  methods: {
    handleSelect: function (index) {
      this.tabIndex = index;
    }
  }
};
</script>
