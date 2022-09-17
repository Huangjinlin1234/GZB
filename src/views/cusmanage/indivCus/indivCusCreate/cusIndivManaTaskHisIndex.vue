<template>
 <!--
    @created by
    @updated by zhoumw
    @description 个人客户任务历史
  -->
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusIndivManaTaskHis_d1_BillList.vue';
/**
 * 个人客户日常管理
 * @constructor
 */
let data = {};

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
    AfterInit () {

    },

    // 查看
    doView () {
      let _this = this;
      // 获取列表选则数据

      const data = _this.$refs.d1_BillList.$refs.refTable.selections;
      if (data.length < 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      // 获取业务类型（正式，临时）
      let json = data[0];
      const bizType = json.bizType;
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      json['bizType'] = bizType;
      // 个人正式客户创建 B01
      if (bizType == 'B01') {
        key = 'tempCusIndiv' + new Date().getTime();
        title = '个人正式客户';
        // 个人临时客户创建 B02
      } else if (bizType == 'B02') {
        key = 'tempCusIndivls' + new Date().getTime();
        title = '个人临时客户';
      } else if (bizType == 'B09') {
        key = 'tempCusIndivls' + new Date().getTime();
        title = '个人临时客户转正';
      }
      json.key = `/${name}/${key}`;
      _this.$refs.d1_BillList.$refs.refForm.resetFields();
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
      var currentPath = _this.$route.path;
      setTimeout(function () {
        yufp.router.removeTab(currentPath);
      }, 100);
    },

    // 返回
    doBack () {
      this.getFactory().back();
    },

    // 定义树切换调用方法
    showAction () {}
  }
};
</script>
