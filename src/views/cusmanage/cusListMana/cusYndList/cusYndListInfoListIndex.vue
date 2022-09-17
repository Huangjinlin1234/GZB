<template>
  <yu-tabs type="card">
    <yu-tab-pane label="优农贷名单准入申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="优农贷名单管理">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './cusYndListInfoList_d1_1_BillList.vue';
import d12Billlist from './cusYndListInfoList_d1_2_BillList.vue';
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
     * 彭磊 优农贷名单
     */
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
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
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc,
        true
      );
    },

    // 修改
    byupdate () {
      // 获取选中的数据
      const selectedRow = this.d1_1_BillList.getSelectedRowData();
      var jsoPar = {};
      yufp.clone(selectedRow, jsoPar);
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
      jsoPar['model_group_no'] = 'CMG000020';
      // jsoPar['op'] = 'VIEW';
      jsoPar['opType'] = 'edit';
      jsoPar['img_authority'] = 'scan;import';
      jsoPar['img_para'] = [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: 'YNDYX',
          index: {
            docid: jsoPar.serno,
            // custconduct: '',
            // operid: '',
            // custconductname: '',
            // orgid: '',
            // custtype: '',
            // orgname: '',
            // opername: '',
            custid: jsoPar.cusId
            // maintaindate: '',
            // custname: ''
          }
        }
      ];
      // 绘制修改页面
      this.$dialog.open(
        '优农贷名单准入',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        800,
        jsoPar,
        this.getDialogDataFunc
      );
    },

    // 修改
    byupdate1 () {
      // 获取选中的数据
      const jsoPar = this.d1_2_BillList.getSelectedRowData();
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 绘制修改页面
      this.$dialog.open('优农贷名单修改', 'cusmanage/cusListMana/cusYndList/cusLstYndUpdate', 1000, 800, jsoPar, this.getDialogDataFunc);
    },

    lookDetail() {
      // 获取选中的数据
      const jsoPar = this.d1_2_BillList.getSelectedRowData();
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      const opPar = {};
      yufp.clone(jsoPar, opPar);
      opPar['optype'] = 'view'
      // 绘制修改页面
      this.$dialog.open('优农贷名单查看', 'cusmanage/cusListMana/cusYndList/cusLstYndUpdate', 1000, 800, opPar);
    },

    getDialogDataFunc () {
      this.d1_1_BillList.queryDataByCondition();
    }
  }
};
</script>
