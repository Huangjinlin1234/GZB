<template>
  <yu-row>
  <yu-col :span="4">
    <yu-menu default-active="1" @select="handleSelect">
      <yu-menu-item index="1">数据修改申请信息</yu-menu-item>
      <yu-menu-item index="2">影像资料</yu-menu-item>
    </yu-menu>
  </yu-col>
   <yu-col :span="20">
   <!--数据修改申请-->
   <div v-if="tabIndex == '1'">
     <modifyInfo :page-params="pageParams"></modifyInfo>
   </div>
   <!--影像-->
    <div v-if="tabIndex == '2'">
      <imageSystem authority="import;insert;download;scan;delImg" :s="1" :para="imageBizParam"></imageSystem>
    </div>
   </yu-col>
  </yu-row>
</template>
<script>
import modifyInfo from './iqpDataModifyApprovePage.vue';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {modifyInfo, imageSystem},
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
      this.pageParams.serno = _this.bizPageData.instanceInfo.bizId;
      this.pageParams.opType = 'VIEW';
      this.pageParams.flowPage = true;
    }
    let params = this.pageParams
    this.imageBizParam = [
      {
        top_outsystem_code: 'XXD_YWBGXYQD',
        outsystem_code:"XXD_LLBG01,XXD_LLBG02",
        index: {
          businessid: params.serno,
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
