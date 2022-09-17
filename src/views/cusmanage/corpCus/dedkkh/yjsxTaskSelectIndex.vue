<template>
  <div>
    <div style="height: 840px">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
      <div style="display: table; height: 100%; margin: 0 auto">
        <yu-button type="primary" @click="back()" v-if="backStatus">返回</yu-button>
      </div>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './yjsxTaskSelect_d1_A_BillCard.vue';
import { request } from 'xy-utils';
export default {
  components: { d1ABillcard },
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
   
  },
  data () {
    return {
      d1_A_BillCard: null,
      backStatus: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 压降任务查看
     */

    AfterInit () {
      const bizPageData = this.bizPageData || {};
      const instanceInfo = bizPageData.instanceInfo;
      // 如果流程实例存在，则说明是从流程中打开的页面
      if (instanceInfo) {
        this.backStatus = false;
        this.initData();
      } else {
      const param = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_A_BillCard.setBillCardValue(param);
      }
    },
    initData () {
      const _this = this;
      this.queryData().then(res => {
        if (res.code == 0) {
          _this.pageData = res.data[0] || {};
          _this.d1_A_BillCard = this.$refs.d1_A_BillCard;
          _this.d1_A_BillCard.setBillCardValue(_this.pageData);
        } else {
          _this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
        }
      });
    },
    queryData () {
      return request({
        url: this.$backend.cmisCus + '/api/cuslstdedkkhyjsxtask/queryList',
        method: 'POST',
        data: {condition: JSON.stringify({taskNo: this.bizPageData.instanceInfo.bizId})}
      });
    },

    // 返回
    back () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
