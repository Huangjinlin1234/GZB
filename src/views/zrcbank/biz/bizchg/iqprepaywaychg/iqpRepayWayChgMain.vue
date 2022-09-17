<template>
  <yu-row>
  <yu-col :span="4">
    <yu-menu default-active="1" @select="handleSelect">
      <yu-menu-item index="1">申请信息</yu-menu-item>
      <yu-menu-item index="2">影像资料</yu-menu-item>
    </yu-menu>
  </yu-col>
   <yu-col :span="20">
   <!--展期申请-->
   <div v-if="tabIndex == '1'">
     <rateInfo :pageParams="pageParams"></rateInfo>
   </div>
   <!--影像-->
    <div v-if="tabIndex == '2'">
     <imageSystem  authority="import;insert;download;scan;delImg" :s="1" :para="imageBizParam"></imageSystem>
    </div>
   </yu-col>
  </yu-row>
</template>
<script>
import rateInfo from './iqprepaywaychgDetail.vue';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {rateInfo,imageSystem},
  data () {
    return {
      tabIndex: '1',
      activeName: 'first',
      pageParams: this.$route.meta.params,
      imageBizParam: {},
      permission: '1'
    };
  },
  props: {
    bizPageData: Object
  },
  created () {
    let _this = this;
    let params;
    _this.pageParams = _this.$route.meta.params;
    if (_this.bizPageData) {
      _this.pageParams = {};
      _this.pageParams.iqpSerno = _this.bizPageData.instanceInfo.bizId;
      _this.pageParams.opType = 'VIEW';
      _this.pageParams.flowPage = true;

      params = this.bizPageData;
    }else{
      params = this.$route.meta.params;
    }
    console.log(_this.pageParams);
    console.log(params);
    _this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'XXD_YWBGSQ',
        outsystem_code: 'XXD_HKJHBGZL',
        index: {
          businessid: _this.pageParams.iqpSerno,
          custconduct: '',
          operid: '',
          maintaindate: '',
          custtype: params.curType,
          custconductname: params.updIdName,
          orgid: params.inputBrId,
          orgname: params.inputBrIdName,
          opername: params.updIdName,
          custid: params.cusId,
          custname: params.inputIdName
          // custname: params.updBrIdName,
        }
      }
    ];
    console.log(_this.imageBizParam);
    
  },
  methods: {
    handleSelect: function (index) {
      this.tabIndex = index;
    }
  }
};
</script>
