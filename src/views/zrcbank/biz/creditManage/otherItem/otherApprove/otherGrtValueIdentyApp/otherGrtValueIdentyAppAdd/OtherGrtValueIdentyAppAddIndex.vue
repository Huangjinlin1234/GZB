
<template>
  <!--
    @created by lixm 2021-06-11
    @description 授信抵押物价值认定申请信息-增删改查
  -->
  <yu-tabs type="card" >
    <yu-tab-pane label="授信抵押物价值认定申请信息">
      <other-grt-value-identy-app-info v-if="showApplyInfoParams" name="1" :apply-info-params="childParams" @refreshUrl="freshPrintUrl"></other-grt-value-identy-app-info>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="2">
      <!-- <other-grt-value-identy-app-pic  name="2"></other-grt-value-identy-app-pic> -->
      <imageSystem v-if="showImg" authority="import;insert;download;scan;delImg" :s="1" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
    <yu-tab-pane label="授信抵押物价值认定申请表" name="3">
      <iframe v-if="printFlag" :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
    </yu-tab-pane>
    <yu-tab-pane label="审批历史" name="4">
      <coopApprovalIndex v-if="showReply" :children="children"></coopApprovalIndex>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherGrtValueIdentyAppInfo from './OtherGrtValueIdentyAppInfo';
import imageSystem from '@/views/imageManage/imageSystem';
import coopApprovalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
yufp.lookup.reg('CRUD_TYPE');
export default {
  name: 'OtherGrtValueIdentyAppAddIndex',
  components: {OtherGrtValueIdentyAppInfo, imageSystem, coopApprovalIndex},
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      OtherGrtValueIdentyAppInfo: null,
      printFlag: true,
      children: {},
      showImg: false,
      showReply: false,
      showApplyInfoParams: false,
      serno: '' // 新增时前端生成流水号
    };
  },
  mounted () {

  },
  created () {
    var childParam = {};
    var params = {};
    if (this.bizPageData != null && this.bizPageData != undefined) {
      let instanceInfo = this.bizPageData.instanceInfo;
      let bizSerno = instanceInfo.bizId;
      // 流程页面跳转
      // 申请详情
      this.$request({
        url: this.$backend.cmisBiz + '/api/othergrtvalueidentyapp/selectByModel',
        method: 'POST',
        async: false,
        data: {condition: JSON.stringify({serno: bizSerno})}
      }).then(({ code, message, data }) => {
        if (code == '0') {
          console.log('=============>>>>>data', data);
          childParam.data = data.data[0];
          childParam.actionType = 'DETAIL';
          params = data.data[0];
        } else {
          this.$message({ message: message || '操作失败', type: 'error' });
        }
      });
    } else {
      childParam = this.$route.meta.params;
      params = this.$route.meta.params.data;
    }
    if (this.$route.meta.params.actionType == 'ADD') {
      childParam.data.serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
      params.serno = childParam.data.serno;
    }
    this.childParams = childParam;
    this.printUrl = this.$backend.frptRptService + 'qtsx-sxywdywjzrd.cpt&serno=' + params.serno;
    this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'BABYXZL',
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
          contid: '',
          billno: ''
        }
      }
    ];
    this.children.serno = params.serno;
    this.showImg = false;
    this.showReply = false;
    this.showApplyInfoParams = false;
    this.$nextTick(() => {
      this.showImg = true;
      this.showReply = true;
      this.showApplyInfoParams = true;
    });
    this.afterInit();
  },
  // computed: {
  //   childParams: function () {
  //     var biz = this.bizPageData;
  //     if (biz == 'undefined' || biz == null || biz == '') {
  //       return null;
  //     } else {
  //       let params = {
  //         serno: this.bizPageData.instanceInfo.bizId,
  //         certCode: this.bizPageData.flowParam.certCode,
  //         nodeId: this.bizPageData.instanceInfo.nodeId
  //       };
  //       return params;
  //     }
  //   }
  // },
  methods: {
    afterInit () {
      this.otherGrtValueIdentyAppInfo = this.$refs.otherGrtValueIdentyAppInfo;
    },
    freshPrintUrl () {
      this.printFlag = false;
      this.$nextTick(() => {
        this.printFlag = true;
      });
    }
  }
};
</script>
