<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './areaManaList_d1_BillList.vue';
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

    // 设置机构
    setOrg () {
      jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'area_manag_list';
      jsoPar['op'] = 'VIEW';
      this.$dialog.open('微贷区域维护页面', 'bizmanage/chgBiz/area/areaOrgListIndex', -1, -1, jsoPar, null);
    },

    // 删除
    doDelete () {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,

            // 新增
            url: this.$backend.cmisBiz + '/api/areamanager/delete/' + jsoPar.area_no,

            data: JSON.stringify(this.$xutils.toUpperCase(jsoPar.area_no, true)),

            success: (response, status, xhr) => {
              if (response.data) {
                this.$xutils.showMsgBox('提示', '删除成功');
                this.d1_BillList.queryDataByCondition();
              } else {
                this.$xutils.showMsgBox('提示', response.message);
              }
            },

            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    },

    doAdd () {
      jsoPar['op'] = 'INSERT';
      this.$dialog.open('新增', 'bizmanage/chgBiz/area/areaAddCardIndex', 1000, 1000, jsoPar, null);
    },

    doUpdate () {
      const jsoPars = '';
      jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['op'] = 'UPDATE';
      this.$dialog.open('修改', 'bizmanage/chgBiz/area/areaAddCardIndex', 1000, 1000, jsoPar, null);
    }
  }
};
</script>
