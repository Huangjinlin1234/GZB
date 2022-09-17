
<template>
  <!--
    @created by lixm 2021-06-10
    @description 用信审核备案申请信息-增删改查
  -->
  <yu-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <yu-tab-pane label="申请信息" name="1">
      <other-record-special-loan-app-info :apply-info-params="childParams"></other-record-special-loan-app-info>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="2">
      <!-- <other-record-special-loan-app-pic  name="2"></other-record-special-loan-app-pic> -->
      <imageSystem v-if="show_img" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
    </yu-tab-pane>
    <yu-tab-pane label="用信审核备案申请表" name="3">
      <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
    </yu-tab-pane>
    <yu-tab-pane label="审批历史" name="replyHistory">
      <coopApprovalIndex v-if="showReply" :children="dataParams"></coopApprovalIndex>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherRecordSpecialLoanAppInfo from './OtherRecordSpecialLoanAppInfo';
import imageSystem from '@/views/imageManage/imageSystem';
import { mapState } from 'vuex';
import coopApprovalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
yufp.lookup.reg('CRUD_TYPE');
export default {
  name: 'OtherRecordSpecialLoanAppAddIndex',
  components: { OtherRecordSpecialLoanAppInfo, imageSystem, coopApprovalIndex },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      OtherRecordSpecialLoanAppInfo: null,
      dataParams: {},
      showReply: false,
      image: '1',
      activeName: '1'
    };
  },
  created () {
    var _this = this;
    if (this.bizPageData != null && this.bizPageData != undefined) {
      let instanceInfo = this.bizPageData.instanceInfo;
      let bizSerno = instanceInfo.bizId;
      _this.image = '2';
      // 流程页面跳转
      // 申请详情
      this.$request({
        url: this.$backend.cmisBiz + '/api/otherrecordspecialloanapp/selectbymodel',
        method: 'POST',
        async: false,
        data: {condition: JSON.stringify({serno: bizSerno})}
      }).then(({ code, message, data }) => {
        if (code == '0') {
          console.log('=============>>>>>data', data);
          _this.dataParams = data.data[0];
        } else {
          this.$message({ message: message || '操作失败', type: 'error' });
        }
      });
    } else {
      _this.dataParams = this.$route.meta.params.data;
    }
  },
  mounted () {
    console.log('=============', this.$route.meta.params);
    var params = this.dataParams;
    this.printUrl = this.$backend.frptRptService + 'qtsx-yxsh.cpt&serno=' + params.serno;
    this.imageBizParam = [
      {
        // TODO 根据实际业务场景修正
        top_outsystem_code: 'XXD_QTSXSQ',
        outsystem_code: 'XXD_QTSXSQ0901',
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
    this.show_img = false;
    this.showReply = false;
    this.$nextTick(() => {
      this.show_img = true;
      this.showReply = true;
    });
    this.afterInit();
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.oauth.userName,
      userCode: (state) => state.oauth.userCode,
      org: (state) => state.oauth.org
    }),
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
      this.otherRecordSpecialLoanAppInfo = this.$refs.otherRecordSpecialLoanAppInfo;
    },
    handleClick: function (tab, event) {
      if (this.activeName == '3') {
        var params = this.dataParams;
        this.printUrl = this.$backend.frptRptService + 'qtsx-yxsh.cpt&serno=' + params.serno;
      }
    }
  }
};
</script>
