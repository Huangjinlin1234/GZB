
<template>
  <!--
    @created by lixm 2021-06-04
    @description 外币利率定价申请信息-增删改查
  -->
  <yu-tabs type="card">
    <yu-tab-pane label="外币利率定价申请信息">
      <other-for-rate-app-info name="1" :apply-info-params="childParams"></other-for-rate-app-info>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="2">
      <!-- <other-for-rate-app-pic  name="2"></other-for-rate-app-pic> -->
      <imageSystem v-if="show_img" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
    <yu-tab-pane label="外币利率定价申请表" name="3">
      <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherForRateAppInfo from './OtherForRateAppInfo';
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('CRUD_TYPE');
export default {
  name: 'OtherForRateAppAddIndex',
  components: { OtherForRateAppInfo, imageSystem },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      OtherForRateAppInfo: null,
      show_img: false
    };
  },
  mounted () {
    this.afterInit();
    console.log('===========', this.$route.meta.params);
    var params = this.$route.meta.params.data;
    this.printUrl = this.$backend.frptRptService + 'qtsx-wblldj.cpt&serno=' + params.serno;
    this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code:"XXD_QTSXSQ",
        outsystem_code:"XXD_QTSXSQ0201",
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
        }
      }
    ];
    this.show_img = false;
    this.$nextTick(() => {
      this.show_img = true;
    });
  },
  computed: {
    childParams: function () {
      var biz = this.bizPageData;
      console.log('===========', biz);
      if (biz == 'undefined' || biz == null || biz == '') {
        return null;
      } else {
        let params = {
          serno: this.bizPageData.instanceInfo.bizId,
          certCode: this.bizPageData.flowParam.certCode,
          nodeId: this.bizPageData.instanceInfo.nodeId
        };
        return params;
      }
    }
  },
  methods: {
    afterInit () {
      this.otherForRateAppInfo = this.$refs.otherForRateAppInfo;
    }
  }
};
</script>
