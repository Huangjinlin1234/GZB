
<template>
  <!--
    @created by lixm 2021-06-11
    @description 保证金存款特惠利率申请信息-增删改查
  -->
  <yu-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <yu-tab-pane label="保证金存款特惠利率申请信息" name="1">
      <other-bail-dep-prefer-rate-app-info :apply-info-params="childParams"></other-bail-dep-prefer-rate-app-info>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="2">
      <!-- <other-bail-dep-prefer-rate-app-pic  name="2"></other-bail-dep-prefer-rate-app-pic> -->
      <imageSystem v-if="show_img" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
    <yu-tab-pane label="保证金存款特惠利率申请表" name="3">
      <iframe v-if="showPrint" :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherBailDepPreferRateAppInfo from './OtherBailDepPreferRateAppInfo';
yufp.lookup.reg('CRUD_TYPE');
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  name: 'OtherBailDepPreferRateAppAddIndex',
  components: { OtherBailDepPreferRateAppInfo, imageSystem },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      OtherBailDepPreferRateAppInfo: null,
      show_img: false,
      activeName: "1",
      showPrint: true
    };
  },
  mounted () {
    var params = this.$route.meta.params.data;
    this.printUrl = this.$backend.frptRptService + 'qtsx-bzjckthll.cpt&serno=' + params.serno;
    this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'XXD_QTSXSQ',
        outsystem_code:"XXD_QTSXSQ0301",
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
    this.afterInit();
  },
  computed: {
    childParams: function () {
      var biz = this.bizPageData;
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
      this.otherBailDepPreferRateAppInfo = this.$refs.otherBailDepPreferRateAppInfo;
    },
    handleClick: function (tab, event) {
      if(this.activeName == "3"){
        this.showPrint = false;
        this.$nextTick(() => {
          this.showPrint = true;
        });
      }
    }
  }
};
</script>
