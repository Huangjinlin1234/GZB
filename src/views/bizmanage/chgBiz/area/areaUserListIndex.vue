<template>
  <div>
    <div style="height:300px">
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 300px)">
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './areaUserList_d1_A_BillCard.vue';
import d1BBilllist from './areaUserList_d1_B_BillList.vue';
export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
      微贷区域信息
      */
    AfterInit () {
      const parm = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;// 创建卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 创建表格
      this.d1_A_BillCard.queryDataByCondition({userId: parm.userId});
      this.d1_B_BillList.queryDataByCondition({userNo: parm.loginCode});
    },

    // 修改

    /* function doUpdate () {
          var jsoPar=d1_A_BillCard.getBillCardValue()
          console.log(jsoPar)

           YuXPUtil.AJAX({
              async: false, // 同步请求
              url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/areamanager/update',// 新增
              data: JSON.stringify(YuXPUtil.toUpperCase(jsoPar, true)),
              success: function (response, status, xhr) {
                console.log('返回信息打印:' + JSON.stringify(response) + '返回状态:' + status + 'xhr:' + JSON.stringify(xhr));
                if (response.data) {
                  jsoPar['model_group_no'] = 'area_manag_list';
                  jsoPar['op'] = 'view';
                  YuXP.openDialog('微贷区域维护页面', '/yuxp/product/pages/bizmanage/chgBiz/area/areaOrgList.js', -1, -1, jsoPar,null);
                } else {
                  YuXP.showMsgBox('提示',response.message);
                }
              },
              error: function (result, b) {
                console.log(result + '错误信息' + b);
                YuXP.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
           });
      }*/

    add () {
      const userNo = this.d1_A_BillCard.getBillCardItemValue('login_code');
      const userId = this.d1_A_BillCard.getBillCardItemValue('user_id');

      const jsoPar = {
        'userNo': userNo,
        'userId': userId
      };

      this.$dialog.open('基本信息', 'bizmanage/chgBiz/area/areaUserAddIndex', 1000, 1000, jsoPar, null);
    },

    // 取消
    onConfirm () {
      // YuXP.closeDialog();
      this.$dialog.open(null, 'bizmanage/chgBiz/area/areaAdminSmUserListIndex', -1, -1, null, null);
    }
  }
};
</script>
