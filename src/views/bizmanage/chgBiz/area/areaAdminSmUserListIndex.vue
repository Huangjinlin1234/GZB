<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './areaAdminSmUserList_d1_BillList.vue';
/** 微贷区域**/
let jsoPar = '';

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
      jsoPar = this.d1_BillList = this.$refs.d1_BillList;
    },

    relateFn () {
      const rowdata = this.d1_BillList.getSelectedRowData();

      if (rowdata == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const jsoPar = {};
      jsoPar['userId'] = rowdata.user_id;

      // var str_Org_id = d1_A_BillTree.getSelectedNode().org_id;
      // jsoPar['orgId'] = str_Org_id;
      this.$dialog.open(
        '用户关联信息',
        '/yuxp/framework/pages/ocaxp/B040User/userAssociationMsgIndex',
        1040,
        600,
        jsoPar,
        _rt => {}
      );
    },

    // 重置密码
    resetPassFn () {
      const rowdata = this.d1_BillList.getSelectedRowData();

      if (rowdata == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const myParam = {
        'loginCode': rowdata.login_code
      };

      this.$xutils.request({
        url: this.$backend.yuxpservice + '/api/password/resetpassword',
        data: JSON.stringify(myParam),
        type: 'POST',

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '密码重置成功！');
          } else if (response.code == '10100004') {
            this.$xutils.showMsgBox('错误', response.message);
          } else {
            this.$xutils.showMsgBox('错误', '密码重置失败！');
          }
        }
      });
    },

    // 设置区域
    setArea () {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'admin_sm_user_area_list';
      jsoPar['op'] = 'view';

      this.$dialog.open(
        '微贷区域维护页面',
        'bizmanage/chgBiz/area/areaUserListIndex',
        -1,
        -1,
        jsoPar,
        null
      );
    }
  }
};
</script>
