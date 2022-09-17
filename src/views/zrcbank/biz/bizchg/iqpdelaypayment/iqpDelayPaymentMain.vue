<template>
  <yu-row>
  <yu-col :span="4">
    <yu-menu default-active="1" @select="handleSelect">
       <yu-menu-item index="1">申请信息</yu-menu-item>
      <yu-menu-item index="2">影像资料</yu-menu-item>
      <yu-menu-item index="3" v-if="showHis">审批历史</yu-menu-item>
      <yu-menu-item index="4">征信报告</yu-menu-item>
    </yu-menu>
  </yu-col>
   <yu-col :span="20">
   <!--展期申请-->
   <div v-if="tabIndex == '1'">
     <rateInfo :pageParams="pageParams"></rateInfo>
   </div>
   <!--影像-->
    <div v-if="tabIndex == '2'">
      <imageSystem authority="import;download;delImg;scan" :s="1" :para="imageBizParam"></imageSystem>
    </div>

    <!--审批历史-->
    <div v-if="tabIndex == '3'">
      <processTrajectory v-if="show3Flag" :page-params="pageParams"> </processTrajectory>
    </div>
    <div v-if="tabIndex == '4'">
        <d13Billlist  v-if="show4Flag" :biz-page-data="bizData" ></d13Billlist>
      </div>
   </yu-col>
  </yu-row>
</template>
<script>
import rateInfo from './iqpDelayPaymentInfo.vue';
import d13Billlist from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import processTrajectory from '@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/processTrajectory';
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {rateInfo , processTrajectory, imageSystem, d13Billlist},
  data () {
    return {
      tabIndex: '1',
      activeName: 'first',
      pageParams: this.$route.meta.params,
      showHis: false,
      show3Flag: false,
      show4Flag: false,
      showImg: false,
      bizData: {}
    };
  },
  props: {
    bizPageData: Object
  },
  created () {
    let _this = this;
    this.pageParams = this.$route.meta.params;
    if (_this.bizPageData) {
      _this.pageParams = {};
      _this.pageParams.delaySerno = _this.bizPageData.instanceInfo.bizId;
      _this.pageParams.opType = 'VIEW';
      _this.pageParams.serno = _this.bizPageData.instanceInfo.bizId;
      _this.pageParams.op = 'VIEW';
      _this.pageParams.flowPage = true;
      _this.bizData['iqpSerno'] = _this.bizPageData.instanceInfo.bizId;
      _this.bizData['isView'] = true;
      //查借据号
      _this.$request({
      async: false,
      url: _this.$backend.cmisBiz + '/api/iqpdelaypayment/' + _this.bizPageData.instanceInfo.bizId,
        method: 'post',
      }).then(({ code, message, data }) => {
       if (data) {
         _this.pageParams.billNo = data.data.billNo;
       }
      })
    } else {
      if (_this.pageParams.opType == 'VIEW') {
        _this.showHis = true;
        _this.pageParams.serno = _this.pageParams.delaySerno;
        _this.pageParams.op = 'VIEW';
        _this.bizData['iqpSerno'] = _this.pageParams.delaySerno;
        _this.bizData['isView'] = true;
      }
    }
    let params = this.pageParams
    this.bizData['iqpSerno'] = params.serno;
    this.imageBizParam = [
      {
         top_outsystem_code: 'XXD_YWBGSQ',
          outsystem_code:"XXD_YQHKZL01,XXD_YQHKZL02",
        index: {
          businessid: params.delaySerno,
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
      if(index == 3){
        this.show3Flag = true;
      }else if(index == 2){
      }
      if (index == '4') {
        this.show4Flag = true;
      }
    }
  }
};
</script>
