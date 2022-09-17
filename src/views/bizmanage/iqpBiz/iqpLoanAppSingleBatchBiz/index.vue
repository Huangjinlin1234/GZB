<template>
  <div style="height:100%;">
    <yu-tabs style="height:100%;overflow-y: scroll;" v-model="activeName" type="card" @tab-click="handleClick">
      <yu-tab-pane label="申请信息" name="1"  v-if="true">
        <keep-alive>
          <iqp-loan-app-update-page  :node="childParams"></iqp-loan-app-update-page >
        </keep-alive>
      </yu-tab-pane>
      <yu-tab-pane label="审批信息" name="2" >
       <keep-alive>
          <component :is="component2" :node="childParams"  @submit="flowSubmitFn"></component>
        </keep-alive>
      </yu-tab-pane>
    </yu-tabs>
    <yufp-nwf-submit ref="flow" :pagedata="bizPageData" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
import IqpLoanAppUpdatePage from '@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqploanappTab.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    imageSystem,
    IqpLoanAppUpdatePage
  },
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    childParams: function () {
      const data = this.bizPageData || this.$route.params;
      const params = {
        bizId: data.instanceInfo.bizId,
        certCode: data.instanceInfo.param.certCode,
        nodeId: data.instanceInfo.nodeId,
        currentNode: data.flowParam.whichNode,
        instanceId: data.instanceInfo.instanceId,
        pageType: data.instanceInfo.pageType,
        currentUserId: this.userCode,
        flowParam: data.flowParam,
        optypeOptions: data.optypeOptions,
        applayCardType: data.instanceInfo.param.applayCardType,
        returnBackFuncId: data.instanceInfo.returnBackFuncId,
        mainInstanceId: data.instanceInfo.mainInstanceId,
        cusId: data.instanceInfo.bizUserId,
        custName: data.instanceInfo.bizUserName,
        prdId: data.instanceInfo.param.prdId,
        prdName: data.instanceInfo.param.prdName,
        ruleRiskLvl: data.instanceInfo.param.ruleRiskLvl,
        bizType: data.instanceInfo.bizType,
        instanceInfo: data.instanceInfo
      };
      return params;
    },
    authority () {
      return 'import;scan;delImg';
    },
    power () {
      if (this.bizPageData.instanceInfo.nodeId == '230_8' || this.bizPageData.instanceInfo.nodeId == '230_64') {
        return '1';
      } else {
        return '2';
      }
    },
    imageBizParam () {
      const data = this.bizPageData || this.$route.params;

      var code = 'GRXFDKSX';
      if (data.instanceInfo.param.prdId == '022028') {
        code = 'GRXFDKSX;XD_FZHYXCL';
      }

      let imageBizParam = [
        {
          'top_outsystem_code': code,
          'outsystem_code': '',
          'index': {
            'assuretype': '',
            'dzyid': '',
            'docid': this.bizPageData.instanceInfo.bizId,
            'businessid': this.bizPageData.instanceInfo.bizId,
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': this.bizPageData.instanceInfo.bizId,
            'orgname': '',
            'opername': '',
            'custid': '',
            'creditamount': '',
            'maintaindate': '',
            'billno': '',
            'custname': '',
            'credittype': ''
          }
        }
      ];
      return imageBizParam;
    }
  },
  data () {
    return {
      activeName: '1',
      component1: null,
      component2: null

    };
  },
  methods: {
    handleClick (e) {
      if (e.name == '3') {
        window.open(this.$refs.imageSystemRef.imageSrc);
      }
      this.component1 = () => import('@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpLoanAppViewPage.vue');
      this.component2 = () => import('@/views/bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqpNodePage.vue');
    },
    flowSubmitFn (data) {
      this.$refs.flow.submitFn(data);
    },
    // 流程审批执行后的回调方法
    afterSubmit (data) {
      this.$router.replace({
        name: this.bizPageData.instanceInfo.returnBackFuncId
      });
    }

  }

};
</script>
