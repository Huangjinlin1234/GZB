<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusYndListAppBaseInfo_d1_BillList.vue';
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
       *刘愿 优农贷名单准入申请
       */

    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增功能
    byadd () {
      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      const jsoPar = {
        'flag': 'add'
      };

      this.$dialog.open(
        '优农贷名单准入申请',
        'cusmanage/cusListMana/cusYndList/cusYndListAppAddIndex',
        500,
        300,
        jsoPar
      );
    },

    // 修改
    byupdate () {
      // 获取选中的数据
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      // 申请-修改模板组
      jsoPar['model_group_no'] = 'CMG000020';

      jsoPar['op'] = 'EDIT';

      // 绘制修改页面
      this.$dialog.open(
        '优农贷名单准入',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc
      );
    },

    getDialogDataFunc () {}
  }
};
</script>
