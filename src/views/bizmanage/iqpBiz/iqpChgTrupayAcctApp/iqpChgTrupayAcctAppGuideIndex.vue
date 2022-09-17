<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpChgTrupayAcctAppGuide_d1_BillList.vue';
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
    // 修改受托账号申请向导
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList; // 创建卡片
    },

    // 点击下一步，保存界面信息，保存成功后，跳转到修改页面
    // function nextStep () {
    //   var jsoPar = d1_BillList.getSelectedRowData();
    //   if (jsoPar == null || jsoPar == '') {
    //     YuXP.showMsgBox('提示:', '必须选择一条记录进行操作!');
    //     return;
    //   }
    //   YuXP.openDialogAndCloseMe('修改受托账号申请详情', '/yuxp/product/pages/bizmanage/iqpBiz/iqpChgTrupayAcctApp/iqpChgTrupayAcctAppDetails.js', -1, -1, jsoPar, null);
    // }

    nextStep () {
      // // 检验表单
      // var checkFlag = d1_BillCard.validateBillCardValue();
      // if (!checkFlag) {
      //   return;
      // }
      // 获取当前界面数据，带入修改界面中

      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      let iqpChgTrupayAcctApp = this.$xutils.toUpperCase(jsoPar, true);

      // 保存操作
      let rtnData = '';

      let rtnFlag = true;

      // 调用ajax请求落地后端接口数据

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/savechgtrupayacctappinfo',
        data: JSON.stringify(iqpChgTrupayAcctApp),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
            this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
              // window.parent.refreshBillListData();
              // jsoPar['model_group_no'] = 'CMG000334';
              // jsoPar['op'] = 'EDIT';
              // // 办理人员页面为通用的js，其中关联主键名称为biz_serno,因此入参新增biz_serno字段并赋值iqp_serno
              jsoPar['biz_serno'] = rtnData.serno;

              // jsoPar['lmt_serno'] = rtnData.serno;
              // // 增加类型字段，用于判断业务规则校验
              // jsoPar['bizType'] = 'lmt';
              this.$dialog.open(
                '修改受托账号申请详情',
                'bizmanage/iqpBiz/iqpChgTrupayAcctApp/iqpChgTrupayAcctAppDetailsIndex',
                -1,
                -1,
                jsoPar,
                null
              );
            });
          } else {
            rtnFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });


      this.$dialog.close(this.dialogId);
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
