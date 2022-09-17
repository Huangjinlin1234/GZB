<template>
  <yu-tabs type="card">
    <yu-tab-pane label="名单准入申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="优享贷名单">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './cusYXDLoanList_d1_1_BillList.vue';
import d12Billlist from './cusYXDLoanList_d1_2_BillList.vue';
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 刘愿 优享贷客户名单
     *
     */
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 问题授信名单列 新增功能
    byadd () {
      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      const jsoPar = {
        'flag': 'add'
      };

      this.$dialog.open(
        '新增优享贷名单界面',
        'cusmanage/cusListMana/cusManaClsList/cusYXDLoanList/cusYXDLoanListAppAddIndex',
        500,
        300,
        jsoPar
      );
    },

    // 修改
    byupdate () {
      // 获取选中的数据
      const jsoPar = this.d1_1_BillList.getSelectedRowData();
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if(jsoPar.approveStatus !== '000') {
        this.$message({
          message: '只允许修改待发起的记录',
          type: 'warning'
        });
        return;
      }
      // 申请-修改模板组
      jsoPar['model_group_no'] = 'CMG000018';
      jsoPar['op'] = 'edit';
      // 绘制修改页面
      this.$dialog.open(
        '优享贷名单准入',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc
      );
    },
    // 详情查看
    byview () {
      // 获取选中的数据
      const jsoPar = this.d1_1_BillList.getSelectedRowData();
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 申请-修改模板组
      jsoPar['model_group_no'] = 'CMG000018';
      jsoPar['op'] = 'view';
      // 绘制修改页面
      this.$dialog.open(
        '优享贷名单准入',
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
