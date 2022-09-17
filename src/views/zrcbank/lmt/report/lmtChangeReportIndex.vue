<template>
  <div class="tab-form">
    <div ref="refChildren" :is="currentView" :pageParams="pageParams"></div>
  </div>
</template>

<script>
import apprStrMtableChgAppDetail from '@/views/zrcbank/lmt/apprStrMtableChgApp/apprStrMtableChgAppDetail';
import cusStrMtableChgAppDetail from '@/views/zrcbank/lmt/cusStrMtableChgApp/cusStrMtableChgAppDetail';
import peerStrMtableChgAppDetail from '@/views/zrcbank/lmt/peerStrMtableChgApp/peerStrMtableChgAppDetail';
export default {
  components: { apprStrMtableChgAppDetail, cusStrMtableChgAppDetail, peerStrMtableChgAppDetail },
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      pageParams: {},
      currentView: ''
    };
  },
  created () {
    var _this = this;
    let instanceInfo = this.bizPageData.instanceInfo;
    let appSerno, cusType;
    appSerno = instanceInfo.bizId;
    cusType = instanceInfo.param.cusType;
    this.pageParams = {
      appSerno: appSerno
    };
    if (cusType == '1') {
      _this.currentView = '';
      _this.$nextTick(() => {
        _this.currentView = 'cusStrMtableChgAppDetail';
      });
    } else if (cusType == '2') {
      _this.currentView = '';
      _this.$nextTick(() => {
        _this.currentView = 'apprStrMtableChgAppDetail';
      });
    } else if (cusType == '3') {
      _this.currentView = '';
      _this.$nextTick(() => {
        _this.currentView = 'peerStrMtableChgAppDetail';
      });
    }
  },
  mounted: function () {

  },
  methods: {}
};
</script>
