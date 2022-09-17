<template>
  <d1-15-billlist ref="d1_BillList"></d1-15-billlist>
</template>
<script>
import d1Billlist from './lmtAppGuarRelList_d1_BillList.vue'
import d115Billlist from './lmtAppGuarRelList_d1_15_BillList.vue'
export default {
  components:{d1Billlist, d115Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
      d1_15_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
      * title 单一客户授信分项担保信息
      * author 朱滋润
      * date 2021-04-02
      * */
    AfterInit() {
      if ('300' != this.getFactory().contextData.guarMode) {
        this.d1_BillList = this.$refs.d1_BillList;
        this.d1_BillList.queryDataByCondition({'lmtSerno' :this.getFactory().contextData.subSerno});
      } else {
        this.d1_BillList = this.$refs.d1_BillList;
        this.d1_BillList.queryDataByCondition({'lmtSerno' :this.getFactory().contextData.subSerno});
      }
    },

    showAction() {},

    //点击引入，进入抵押物引入页面
    imPort() {
      this.$dialog.open(
        '引入抵押物列表',
        'bizmanage/lmtBiz/lmtAppSubBiz/lmtAppSubPldListIndex',
        900,
        500,
        this.getFactory().contextData,
        () => {
          this.d1_BillList.queryDataByCondition({'lmtSerno': this.getFactory().contextData.subSerno});
        }
      );
    },

    //取消抵质押品/保证人引入
    canclImport() {
      let rtnData = {};
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // showHtmlConfirmBox('提示', '是否确认删除', 150, 100, _callback)
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtappguarrel/deleteguarrel',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '取消引入成功!', 350, 150, this.getRefreshList);
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 刷新列表
    getRefreshList() {
      this.d1_BillList.queryDataByCondition({'lmtSerno': this.getFactory().contextData.sub_serno});
    },

    //进入保证人引入页面
    addGuar() {
      this.$dialog.open(
        '引入保证人列表',
        'bizmanage/lmtBiz/lmtAppSubBiz/lmtAppSubGuarListIndex',
        900,
        500,
        this.getFactory().contextData,
        () => {
          this.d1_BillList.queryDataByCondition({'lmtSerno': this.getFactory().contextData.sub_serno});
        }
      );
    }
  }
};
</script>
