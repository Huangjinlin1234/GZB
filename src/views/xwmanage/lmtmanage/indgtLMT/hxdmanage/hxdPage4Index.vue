<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './hxdPage4_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      mxsp: null,
      surveySerno: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      // 模型结果
      this.mxsp = this.$refs.d1_BillCard;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }

      // 设置流水号得值
      this.mxsp.setBillCardItemValue('surveySerno', this.surveySerno);

      this.select();
    },

    showAction () {
      this.select();
    },
    // 查询模型结果数据
    select () {
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtmodelapprresultinfo/selectbysurveyserno',
        data: {surveySerno: this.surveySerno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data != null) {
            // 操作成功
            yufp.clone(data, this.mxsp.formdata);
            // this.d1_BillCard.formdata = data;
          } else {
            // 操作失败
          }
        }
      });
    }
  }
};
</script>
