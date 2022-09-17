<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpGrt_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillList = this.$refs.d1_BillList;
    },

    do360View () {
      this.$dialog.open('公司客户360视图', '', 900, 650, null, () => {
        this.d1BillList.queryDataByCondition();
      });
    },

    doView () {
      // 查看
      const jsoPar = this.d1BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!', 350, 150);
        return;
      }
      var json = jsoPar;
      let name = 'grtmanage/queryGrt/grtGuarContListIndex';
      let key = 'grtGuarContListIndex' + new Date().getTime();
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '担保关系查看',
        // 传递的业务数据，可选配置
        data: json
      });
    }
  }
};
</script>
