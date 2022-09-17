<template>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './coopReplyAppDetail_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object,
    pageData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      d1_BillCard: null,
      param: {},
      operate: '',
      serno: ''
    };
  },
  created () {
    if (this.pageData) {
      this.param = this.pageData;
      this.serno = this.param.serno;
      this.operate = this.param.op;
    } else {
      this.param = this.$route.meta.params;
      this.serno = this.param.serno;
      this.operate = this.param.op;
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {

    afterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.reloadData();
    },

    /** 加载数据
     */
    reloadData () {
      // 1加载合作方批复申请信息
      this.queryCoopReplyApp(this.param.serno);
      // 2加载批复申请-特殊限额控制信息
      this.queryCoopReplyAppSub(this.param.serno);
      // 3加载批复申请-项目信息
      this.queryCoopReplyAppPro(this.param.serno);
      // 4加载批复申请条件信息
      this.queryCoopReplyAppCond(this.param.serno);
      // 5加载批复申请贷后管理要求信息
      this.queryCoopReplyAppPsp(this.param.serno);
    },

    // 1加载合作方批复申请信息
    queryCoopReplyApp (serno) {
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyapp/' + serno,
        // data: JSON.stringify(serno),
        type: 'GET',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            let appData = response.data;
            this.d1_BillCard = this.$refs.d1_BillCard;
            this.$xutils.clone(appData, this.d1_BillCard.formdata);
            this.$xutils.clone(appData, this.d1_BillCard.formdata2);
            this.$xutils.clone(appData, this.d1_BillCard.formdata3);
            // 合作方类型
            let partnerType = appData.partnerType;
            // 切换到具体的合作方准入审批批复
            this.changeCoopReplyApp(partnerType);
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    },

    // 2加载批复申请-特殊限额控制信息
    queryCoopReplyAppSub (serno) {
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyappsub/',
        data: {
          condition: JSON.stringify({
            serno: serno
          })
        },
        type: 'GET',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            let appData = response.data;
            if (appData != null && appData.length > 0) {
              for (let i = 0; i < appData.length; i++) {
                appData[i].bailPerc = (appData[i].bailPerc * 100).toFixed(2);
              }
            }            
            this.d1_BillCard = this.$refs.d1_BillCard;
            this.d1_BillCard.subTableData = appData;
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    },

    // 3加载批复申请-项目信息
    queryCoopReplyAppPro (serno) {
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyapppro/',
        data: {
          condition: JSON.stringify({
            serno: serno
          })
        },
        type: 'GET',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            let appData = response.data;
            this.d1_BillCard = this.$refs.d1_BillCard;
            this.d1_BillCard.proTableData = appData;
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    },

    // 4加载批复申请条件信息
    queryCoopReplyAppCond (serno) {
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyappcond/',
        data: {
          condition: JSON.stringify({
            serno: serno
          })
        },
        type: 'GET',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            let appData = response.data;
            this.d1_BillCard = this.$refs.d1_BillCard;
            this.d1_BillCard.condTableData = appData;
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    },

    // 5加载批复申请贷后管理要求信息
    queryCoopReplyAppPsp (serno) {
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyapppsp/',
        data: {
          condition: JSON.stringify({
            serno: serno
          })
        },
        type: 'GET',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            let appData = response.data;
            this.d1_BillCard = this.$refs.d1_BillCard;
            this.d1_BillCard.pspTableData = appData;
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
          }
        }
      });
    },

    /** *
      * 根据合作方类型切换到对应的合作方准入审批批复
     */
    changeCoopReplyApp (partnerType) {
      // 2 专业担保公司
      if (partnerType == '2') {
        // 1.2一般担保额度 1.3特殊限额控制信息 展示
        this.d1_BillCard.commonGrtShow = true;
        this.d1_BillCard.subShow = true;
        this.d1_BillCard.singleCoopQuotaIsShow = true;
        this.d1_BillCard.sigBusiCoopQuotaIsShow = true;
        this.d1_BillCard.bailPercIsShow = false;
        this.d1_BillCard.outguarMultipleIsShow = true;
      } else if (partnerType == '4' || partnerType == '8') {
        // 4 集群贷市场方 8核心企业 是否白名单控制，保证金比例展示
        this.d1_BillCard.isWhiteListCtrlIsShow = true;
        this.d1_BillCard.bailPercIsShow = true;
        this.d1_BillCard.singleCoopQuotaIsShow = true;
        this.d1_BillCard.sigBusiCoopQuotaIsShow = true;
      } else if (partnerType == '1') {
        // 1 房地产开发商 展示1.2项目信息
        this.d1_BillCard.proShow = true;
        this.d1_BillCard.bailPercIsShow = true;
        this.d1_BillCard.bailAccLowAmtIsShow = false;
        this.d1_BillCard.estateFlag = true;
      } else if (partnerType == '3' || partnerType == '5' || partnerType == '15') {
        // 3 保险公司 5光伏设备生产企业 15教育机构
        this.d1_BillCard.bailPercIsShow = true;
        this.d1_BillCard.singleCoopQuotaIsShow = true;
        this.d1_BillCard.sigBusiCoopQuotaIsShow = true;
      }
      // 如果是从我的工作台入库进入
      if (this.bizPageData) {
        this.d1_BillCard.bizPageShow = true;
        this.d1_BillCard.buttonShow = true;
        this.d1_BillCard.viewFiledDisabled = false;
      } else {
        this.d1_BillCard.bizPageShow = false;
        this.d1_BillCard.buttonShow = false;
        this.d1_BillCard.viewFiledDisabled = true;
      }         
    },


    /**
       * 关闭页面
       **/
    goback () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
