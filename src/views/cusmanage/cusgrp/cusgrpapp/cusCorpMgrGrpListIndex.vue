<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpMgrGrpList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 作者：李召星
       * 集团认定详情中的高管人员信息列表
       */
    AfterInit () {
      // 隐藏右上角按钮，只保存返回按钮
      /* window.parent.setButtonVisiable('tempSave',false);
            window.parent.setButtonVisiable('save',false);
            window.parent.setButtonVisiable('commit',false);*/
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 重载页面
    showAction () {}
  }
};
</script>
