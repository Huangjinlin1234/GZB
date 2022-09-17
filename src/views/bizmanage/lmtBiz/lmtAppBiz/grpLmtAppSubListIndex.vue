<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './grpLmtAppSubList_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
      * title 授信复审分项明细
      * author yangwl
      * date 2021-04-16
      * */

    AfterInit() {
      // var flag = frameContext.op;
      // if (flag == 'VIEW') {
      this.d1_BillList = this.$refs.d1_BillList;
      // } else {
      // YuXP.createBillList('yuxpservice', 'd1', 'grp_lmt_app_sub_info', { 'templetname': '授信分项明细', 'list_btns': '新增分项/addLimit;修改/update;删除/deleteLmtAppSub;查看/view;' }, null);
      // }
      // d1_BillList.queryDataByCondition('serno = \'' + frameContext.serno + '\'');
    },

    showAction() {},

    // function addLimit () {
    //   YuXP.openDialog('集團客户授信申报', '/yuxp/product/pages/bizmanage/lmtBiz/lmtAppBiz/lmtAppSubAdd.js', 500, 400, frameContext, null);
    // }

    deleteLmtAppSub() {
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

        url: this.$backend.cmisBiz + '/api/lmtappsub/deletelmtappsub',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.getRefreshList);
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
    getRefreshList() {},

    update() {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000227';
      jsoPar['op'] = 'EDIT';
      jsoPar['flag'] = 'edit';

      // jsoPar['cus_id'] = frameContext.cus_id;
      // jsoPar['cus_name'] = frameContext.cus_name;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    },

    view() {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000227';
      jsoPar['op'] = 'VIEW';
      jsoPar['flag'] = 'view';

      // jsoPar['cus_id'] = frameContext.cus_id;
      // jsoPar['cus_name'] = frameContext.cus_name;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    }
  }
};
</script>
