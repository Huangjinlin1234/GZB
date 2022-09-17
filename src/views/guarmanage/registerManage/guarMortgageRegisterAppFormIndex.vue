<template>
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="3" :xs="24">
      <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
        <yu-menu-item index="1">申请信息</yu-menu-item>
        <yu-menu-item index="2">影像资料</yu-menu-item>
        <yu-menu-item index="3">历史审批</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <!--申请信息-->
      <guarMortgageRegisterApp v-if="activeIndex == '1'" ref="guarMortgageRegisterApp" :params="pageParams" :dialogId="dialogId" :wfData="bizPageData"></guarMortgageRegisterApp>
      <imageSystem v-if="activeIndex == '2'" authority="import;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
      <approvalIndex v-if="activeIndex == '3'" ref="approvalIndex" :params="pageParams" :wfData="bizPageData" :dialogId="dialogId"></approvalIndex>
    </yu-col>
  </yu-row>
 </div>
  </template>
<script>
// 申请信息
import guarMortgageRegisterApp from '@/views/guarmanage/registerManage/guarMortgageRegisterUpdateIndex.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import approvalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';


export default {
  components: { guarMortgageRegisterApp, imageSystem, approvalIndex},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data: function () {
    return {
      color: [],
      activeIndex: '1',
      activeName: 'cusIndivBase',
      bizType: '',
      cusId: {},
      op: '',      
      imageBizParam: [
        {'top_outsystem_code': 'GRXFDKSX;GRXFDKCZDY',
          'outsystem_code': 'GRXFDKCZDY06',
          'index': {
            'assuretype': '',
            'dzyid': '',
            'docid': '',
            'businessid': '',
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': '',
            'orgname': '',
            'opername': '',
            'custid': '',
            'creditamount': '',
            'maintaindate': '',
            'billno': '',
            'custname': '',
            'credittype': ''
          }
        }]
    };
  },
  mounted () {
    if(this.bizPageData.instanceInfo){
      this.pageParams = this.bizPageData.instanceInfo;
    }
  },
  methods: {
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      if(index === '2') {
        var mainContNo = '';
        if(this.pageParams.type && this.pageParams.type === 'ADD') {
          mainContNo = this.$refs.guarMortgageRegisterApp.$refs.d1_BillCard.formdata.mainContNo
        } else {
          mainContNo = (this.bizPageData && this.bizPageData.instanceInfo.mainContNo) || (this.pageParams && this.pageParams.mainContNo);
        }
        this.imageBizParam[0].index.businessid = mainContNo;
        this.imageBizParam[0].index.contid = mainContNo;
        var regType = (this.bizPageData && this.bizPageData.instanceInfo.regType) || (this.pageParams && this.pageParams.regType);

        if(this.imageBizParam[0].index.contid != '' && regType == '02'){
          this.$request({
          url: this.$backend.cmisBiz + '/api/ctrloancont/selectprdidbycontno',
          method: 'post',
          data: this.imageBizParam[0].index.contid
        }).then((response) => {
          if (response.code === '0') {
            var prdId = response.data;
                         
            if (prdId == '022028') {
              //白领易贷通
              this.imageBizParam[0].top_outsystem_code = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ';
            } else {
              // var regSubType = (this.bizPageData && this.bizPageData.instanceInfo.regSubType) || (this.pageParams && this.pageParams.regSubType);
              // if (regSubType == '03'){
                this.imageBizParam[0].top_outsystem_code = 'XXD_DYZXZL';
                this.imageBizParam[0].outsystem_code = 'XXD_DYZXZL01;XXD_DYZXZL02';
              // }
            }
            this.activeIndex = index;
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
        } else {
            this.activeIndex = index;
        }
        
      } else {
        this.activeIndex = index;
      }
      // 颜色操作
      this.color[index] = 'color: #fff;';
    }
  }
};
</script>
<style>

</style>
