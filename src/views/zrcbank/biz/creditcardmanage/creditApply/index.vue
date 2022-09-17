<template>
  <div style="height:100%;">
    <yu-tabs style="height:100%;overflow-y: scroll;" v-model="activeName" type="card" @tab-click="handleClick">
      <yu-tab-pane label="申请信息" name="1" v-if="tab1Show">
        <keep-alive>
          <main-and-sup
            ref="mainandsup"
            :node="childParams"
            :apply-card-type="childParams.applayCardType"
            @submit="flowSubmitFn"
          ></main-and-sup>
        </keep-alive>
      </yu-tab-pane>
      <yu-tab-pane label="附件证明信息" name="2" v-if="tab2Show">
        <keep-alive>
          <component :is="component2" :node="childParams" :main-page="this.$refs.mainandsup" @submit="flowSubmitFn"></component>
        </keep-alive>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="3" v-if="tab3Show">
        <imageSystem ref="imageSystemRef" authority="download" s="2" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="老客户信息" name="4" v-if="tab4Show">
        <keep-alive>
          <component :is="component4" :custom-old-info-params="childParams"></component>
        </keep-alive>
      </yu-tab-pane>
      <yu-tab-pane label="征信信息" name="5" v-if="tab5Show">
          <creditCardReport  :node="childParams"></creditCardReport>
      </yu-tab-pane>
      <yu-tab-pane label="零售内评信息" name="6" v-if="tab6Show">
        <keep-alive>
          <component :is="component6" :node="childParams" @submit="flowSubmitFn"></component>
        </keep-alive>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" name="7" v-if="tab7Show">
        <keep-alive>
          <component :is="component7" :nodes="childParams" @submit="flowSubmitFn"></component>
        </keep-alive>
      </yu-tab-pane>
      <yu-tab-pane label="电话调查" name="8" v-if="tab8Show">
        <keep-alive>
          <component :is="component8" :node="childParams" @submit="flowSubmitFn"></component>
        </keep-alive>
      </yu-tab-pane>
      <yu-tab-pane label="初审意见" name="9" v-if="tab9Show">
        <keep-alive>
          <component :is="component9" :node="childParams" @submit="flowSubmitFn"></component>
        </keep-alive>
      </yu-tab-pane>
      <yu-tab-pane label="终审意见" name="10" v-if="tab10Show">
        <keep-alive>
          <component :is="component10" :node="childParams" @submit="flowSubmitFn"></component>
        </keep-alive>
      </yu-tab-pane>
    </yu-tabs>
    <yufp-nwf-submit ref="flow" :pagedata="bizPageData" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
import creditCardReport from '@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/creditCardReportView.vue';
import MainAndSup from './additionalInfo/mainAndSup';
import { mapGetters } from 'vuex';
export default {
  components: {
    MainAndSup,
    imageSystem,
    creditCardReport
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
        isConsider: data.instanceInfo.param.isConsider
      };
      return params;
    },
    imageBizParam () {
      const data = this.bizPageData || this.$route.params;
      let imageBizParam = [
        {
          'top_outsystem_code': data.instanceInfo.param.topoutsystemcode,
          'outsystem_code': data.instanceInfo.param.outsystemcode,
          'index': {
            'businessid': this.bizPageData.instanceInfo.bizId,
            'custid': '',
            'custname': '',
            'custconduct': '',
            'custconductname': '',
            'orgid': '',
            'orgname': '',
            'contid': '',
            'billno': ''
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
      component2: null,
      component4: null,
      component6: null,
      component7: null,
      component8: null,
      component9: null,
      component10: null,
      tab1Show: false, // 申请信息
      tab2Show: false, // 附件证明信息
      tab3Show: false, // 影像
      tab4Show: false, // 老客户
      tab5Show: false, // 征信
      tab6Show: false, // 零售内评
      tab7Show: false, // 审批历史
      tab8Show: false, // 电话调查
      tab9Show: false, // 初审意见
      tab10Show: false, // 终审意见
      topoutsystemcode: 'XXD_PK',
      outsystemcode: 'XXD_PK_B0601,XXD_PK_B0602,XXD_PK_B0603,XXD_PK_B0604,XXD_PK_B0605'
    };
  },
  watch: {
    'imageBizParam': function (val) {
      this.$nextTick(function () {
        this.$refs.imageSystemRef.getImageSrc();
      });
    }
  },
  methods: {
    handleClick (tab) {
      switch (tab.name) {
      case '2': // 附件证明信息
        this.component2 = () => import('@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/attachProve.vue');
        break;
      case '3': // 影像资料
        break;
      case '4': // 老客户信息
        this.component4 = () => import('@/views/zrcbank/biz/creditcardmanage/common/tabs/CustomOldInfo.vue');
        break;
      case '5': // 征信信息
        break;
      case '6': // 零售内评信息
        this.component6 = () => import('@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/retailReview.vue');
        break;
      case '7': // 审批历史信息
        this.component7 = () => import('@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/AdjustmentJudge.vue');
        break;
      case '8': // 电话调查
        this.component8 = () => import('@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/phoneSurvey.vue');
        break;
      case '9': // 初审意见
        this.component9 = () => import('@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/firstApprove.vue');
        break;
      default: // 终审意见
        this.component10 = () => import('@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/finalApprove.vue');
      }
    },
    judgeTabShowByNodeId (nodeId) {
      switch (nodeId) {
      case 'node1':
      case 'node2': // 集中作业补录
        this.activeName = '1';
        this.tab1Show = this.tab2Show = this.tab7Show = true;
        break;
      case 'node3': // 电核
        this.activeName = '8';
        this.handleClick({name: '8'});
        this.tab1Show = this.tab2Show = this.tab3Show = this.tab8Show = this.tab7Show = true;
        break;
      case 'node4': // 初审
        this.activeName = '9';
        this.handleClick({name: '9'});
        this.tab1Show = this.tab2Show = this.tab3Show = this.tab4Show = this.tab7Show = this.tab8Show = this.tab9Show = true;
        break;
      case 'node5': // 终审1岗
        this.activeName = '10';
        this.handleClick({name: '10'});
        this.tab1Show = this.tab2Show = this.tab3Show = this.tab4Show = this.tab5Show = this.tab6Show = this.tab7Show = this.tab8Show = this.tab9Show = this.tab10Show = true;
        break;
      case 'node6': // 终审2岗
        this.activeName = '10';
        this.handleClick({name: '10'});
        this.tab1Show = this.tab2Show = this.tab3Show = this.tab4Show = this.tab5Show = this.tab6Show = this.tab7Show = this.tab8Show = this.tab9Show = this.tab10Show = true;
        break;
      default:
        1 + 1;
      }
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
  },
  created () {
    this.judgeTabShowByNodeId(this.bizPageData.flowParam.whichNode);
    this.$request({
      url: this.$backend.cmisBiz + '/api/creditcardappinfo/querybyserno',
      method: 'POST',
      data: {serno: this.bizPageData.instanceInfo.bizId}
    }).then(({code, message, data}) => {
      if (code == '0') {
        // 客户类型与影像目录映射
        if (data.applyCardPrd != '000010' && data.applyCardPrd != '000013') {
          if (data.cardCusType == 'B06') {
            this.outsystemcode = 'XXD_PK_B0601,XXD_PK_B0602,XXD_PK_B0603,XXD_PK_B0604,XXD_PK_B0605';
          } else if (data.cardCusType == 'B01') {
            this.outsystemcode = 'XXD_PK_B0101,XXD_PK_B0102,XXD_PK_B0103,XXD_PK_B0104,XXD_PK_B0105';
          } else if (data.cardCusType == 'B02') {
            this.outsystemcode = 'XXD_PK_B0201,XXD_PK_B0202,XXD_PK_B0203,XXD_PK_B0204,XXD_PK_B0205';
          } else if (data.cardCusType == 'B07') {
            this.outsystemcode = 'XXD_PK_B0701,XXD_PK_B0702,XXD_PK_B0703,XXD_PK_B0704,XXD_PK_B0705';
          } else if (data.cardCusType == 'B03') {
            this.outsystemcode = 'XXD_PK_B0301,XXD_PK_B0302,XXD_PK_B0303,XXD_PK_B0304,XXD_PK_B0305';
          } else if (data.cardCusType == 'C09') {
            this.outsystemcode = 'XXD_PK_C0901,XXD_PK_C0902,XXD_PK_C0903,XXD_PK_C0904,XXD_PK_C0905,XXD_PK_C0906';
          } else if (data.cardCusType == 'C06') {
            this.outsystemcode = 'XXD_PK_C0601,XXD_PK_C0602,XXD_PK_C0603,XXD_PK_C0604,XXD_PK_C0605,XXD_PK_C0606';
          } else if (data.cardCusType == 'H07') {
            this.outsystemcode = 'XXD_PK_H0701,XXD_PK_H0702,XXD_PK_H0703,XXD_PK_H0704,XXD_PK_H0705,XXD_PK_H0706';
          } else if (data.cardCusType == 'E01') {
            this.outsystemcode = 'XXD_PK_E0101,XXD_PK_E0102,XXD_PK_E0103,XXD_PK_E0104,XXD_PK_E0105,XXD_PK_E0106';
          } else if (data.cardCusType == 'H04') {
            this.outsystemcode = 'XXD_PK_H0401,XXD_PK_H0402,XXD_PK_H0403,XXD_PK_H0404,XXD_PK_H0405,XXD_PK_H0406';
          } else if (data.cardCusType == 'B14') {
            this.outsystemcode = 'XXD_PK_B1401,XXD_PK_B1402,XXD_PK_B1403,XXD_PK_B1404,XXD_PK_B1405,XXD_PK_B1406';
          } else if (data.cardCusType == 'X01') {
            this.outsystemcode = 'XXD_PK_X0101,XXD_PK_X0102,XXD_PK_X0103,XXD_PK_X0104,XXD_PK_X0105,XXD_PK_X0106';
          } else if (data.cardCusType == 'C08') {
            this.outsystemcode = 'XXD_PK_C0801,XXD_PK_C0802,XXD_PK_C0803,XXD_PK_C084,XXD_PK_C0805,XXD_PK_C0806,XXD_PK_C0807,XXD_PK_C0808';
          } else if (data.cardCusType == 'B15') {
            this.outsystemcode = 'XXD_PK_B1501,XXD_PK_B1502,XXD_PK_B1503,XXD_PK_B1504,XXD_PK_B1505,XXD_PK_B1506';
          } else if (data.cardCusType == 'C04') {
            this.outsystemcode = 'XXD_PK_C0401,XXD_PK_C0402,XXD_PK_C0403,XXD_PK_C0404,XXD_PK_C0405,XXD_PK_C0406,XXD_PK_C0407';
          } else if (data.cardCusType == 'B04') {
            this.outsystemcode = 'XXD_PK_B0401,XXD_PK_B0402,XXD_PK_B0403,XXD_PK_B0404,XXD_PK_B0405,XXD_PK_B0406';
          } else if (data.cardCusType == 'H05') {
            this.outsystemcode = 'XXD_PK_H0501,XXD_PK_H0502,XXD_PK_H0503,XXD_PK_H0504,XXD_PK_H0505,XXD_PK_H0506';
          }
        } else {
          // 乐悠金电子卡影像目录
          this.topoutsystemcode = 'XXD_LYJ';
          if (data.cardCusType == 'B06') {
            this.outsystemcode = 'XXD_LYJ_B0601,XXD_LYJ_B0602,XXD_LYJ_B0603,XXD_LYJ_B0604,XXD_LYJ_B0605';
          } else if (data.cardCusType == 'B01') {
            this.outsystemcode = 'XXD_LYJ_B0101,XXD_LYJ_B0102,XXD_LYJ_B0103,XXD_LYJ_B0104,XXD_LYJ_B0105';
          } else if (data.cardCusType == 'B02') {
            this.outsystemcode = 'XXD_LYJ_B0201,XXD_LYJ_B0202,XXD_LYJ_B0203,XXD_LYJ_B0204,XXD_LYJ_B0205';
          } else if (data.cardCusType == 'B03') {
            this.outsystemcode = 'XXD_LYJ_B0301,XXD_LYJ_B0302,XXD_LYJ_B0303,XXD_LYJ_B0304,XXD_LYJ_B0305';
          } else if (data.cardCusType == 'C09') {
            this.outsystemcode = 'XXD_LYJ_C0901,XXD_LYJ_C0902,XXD_LYJ_C0903,XXD_LYJ_C0904,XXD_LYJ_C0905,,XXD_LYJ_C0906';
          } else if (data.cardCusType == 'E01') {
            this.outsystemcode = 'XXD_LYJ_E0101,XXD_LYJ_E0102,XXD_LYJ_E0103,XXD_LYJ_E0104,XXD_LYJ_E0105,XXD_LYJ_E0106,XXD_LYJ_E0107,XXD_LYJ_E0108,XXD_LYJ_E0109,XXD_LYJ_E0110';
          } else if (data.cardCusType == 'H04') {
            this.outsystemcode = 'XXD_LYJ_H0401,XXD_LYJ_H0402,XXD_LYJ_H0403,XXD_LYJ_H0404,XXD_LYJ_H0405,XXD_LYJ_H0406,XXD_LYJ_H0407,XXD_LYJ_H0408,XXD_LYJ_H0409,XXD_LYJ_H0410';
          } else if (data.cardCusType == 'B14') {
            this.outsystemcode = 'XXD_LYJ_B1401,XXD_LYJ_B1402,XXD_LYJ_B1403,XXD_LYJ_B1404,XXD_LYJ_B1405,XXD_LYJ_B1406';
          } else if (data.cardCusType == 'C08') {
            this.outsystemcode = 'XXD_LYJ_C0801,XXD_LYJ_C0802,XXD_LYJ_C0803,XXD_LYJ_C0804,XXD_LYJ_C0805,XXD_LYJ_C0806,XXD_LYJ_C0807,XXD_LYJ_C0808';
          } else if (data.cardCusType == 'C03') {
            this.outsystemcode = 'XXD_LYJ_C0301,XXD_LYJ_C0302,XXD_LYJ_C0303,XXD_LYJ_C0304,XXD_LYJ_C0305,XXD_LYJ_C0306,XXD_LYJ_C0307';
          } else if (data.cardCusType == 'C04') {
            this.outsystemcode = 'XXD_LYJ_C0401,XXD_LYJ_C0402,XXD_LYJ_C0403,XXD_LYJ_C0404,XXD_LYJ_C0405,XXD_LYJ_C0406';
          } else if (data.cardCusType == 'B08') {
            this.outsystemcode = 'XXD_LYJ_B0801,XXD_LYJ_B0802,XXD_LYJ_B0803,XXD_LYJ_B0804,XXD_LYJ_B0805,XXD_LYJ_B0806';
          }
        }
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
  }
};
</script>
