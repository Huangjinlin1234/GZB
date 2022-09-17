<template>
  <div></div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       * title 集团其他审批事项
       * author yangwl
       * date 2021-04-14
       * */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增
    add() {
      this.$dialog.open(
        '新增',
        'bizmanage/lmtBiz/lmtGrpApprBiz/lmtGrpApprAddIndex',
        500,
        400,
        null,
        null
      );
    },

    // 删除
    deleteLmtApp() {
      let rtnData = {};
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // 判断审批状态为审批中,则不让删除
      if (jsoPar.approveStatus == '111') {
        this.$xutils.showMsgBox('提示', '审批中的数据不允许删除!', 350, 150);
        return;
      }

      if (jsoPar.approveStatus == '992') {
        jsoPar.approveStatus = '996';

        this.$xutils.request({
          // 同步请求
          async: false,

          url: this.$backend.cmisBiz + '/api/lmtgrpappr/update',
          data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

          success: (response, status, xhr) => {
            if (response.code == '0') {
              this.$xutils.showMsgBox('提示', '自行退出成功!', 350, 150, this.getRefreshList);
              rtnData = response.data;
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });

        return;
      }

      if (jsoPar.approveStatus == '000') {
        this.showHtmlConfirmBox('提示', '是否确认删除', 150, 100, null);

        this.$xutils.request({
          // 同步请求
          async: false,

          url: this.$backend.cmisBiz + '/api/lmtgrpappr/delete',
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
      }
    },

    // 修改
    update() {
      const jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000305';
      // jsoPar['pk_id'] = jsoPar.pk_id;
      // jsoPar['serno'] = jsoPar.serno;
      jsoPar['op'] = 'EDIT';
      jsoPar['flag'] = 'edit';

      this.$dialog.open(
        '其他审批事项修改',
        'bizmanage/lmtBiz/lmtGrpApprBiz/lmtGrpApprDetailIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    },

    // 查看
    view() {
      const jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000305';
      // jsoPar['pk_id'] = jsoPar.pk_id;
      // jsoPar['serno'] = jsoPar.serno;
      jsoPar['op'] = 'VIEW';
      jsoPar['flag'] = 'view';

      this.$dialog.open(
        '单一客户授信申报',
        'bizmanage/lmtBiz/lmtGrpApprBiz/lmtGrpApprDetailIndex',
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
