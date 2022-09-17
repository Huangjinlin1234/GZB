<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './indivCusGrt_BillList.vue';
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
    /**
       *个人客户查询向导界面
       *
       */
    afterInit () {
      let _this = this;
      _this.d1BillList = _this.$refs.d1_BillList;
      let params = {};
      let condition = {};
      params.condition = JSON.stringify(condition);
      _this.$refs.d1_BillList.$refs.refTable.remoteData(params);
    },
    // 查看
    doQuery () {
      let _this = this;
      // 获取列表选则数据
      const data = _this.$refs.d1_BillList.$refs.refTable.selections;
      if (data.length < 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      let json = data[0];
      let name = 'grtmanage/queryGrt/grtGuarContListIndex';
      let title = '担保关系查看';
      let key = 'grtGuarContListIndex' + new Date().getTime();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    }
  }
};
</script>
