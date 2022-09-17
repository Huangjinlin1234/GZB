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
    setOrg () {
      var _this = this;
      var params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      _this.$router.addTab({
      // 路由名称
        name: 'xwmanage/lmtmanage/area/areaOrgListIndex',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom' + new Date().getTime(), // 必传
        // 页签名称
        title: '设置机构页面',
        // 传递的业务数据，可选配置
        data: {
          params: params,
          pageType: 3 // 修改,
        },
        afterTabClose: () => {
          this.d1_BillList.queryDataByCondition();
        }
      });
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
          this.$request({
            async: false,
            method: 'POST',
            url: this.$backend.cmisBiz + '/api/areamanager/deleteall',
            data: {areaNo: jsoPar.areaNo}
          }).then(({code, message, data}) => {
            if (code == '0') {
              if (data.code == '1') {
                this.$message({message: '删除成功', type: 'success'});
                this.d1_BillList.queryDataByCondition();
              } else {
                this.$message({message: '删除失败', type: 'error'});
              }
            } else {
              this.$message({message: '删除失败', type: 'error'});
            }
          });
        }
      });
    },
    // 新增
    doAdd () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'xwmanage/lmtmanage/area/areaAddCardView', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom' + new Date().getTime(), // 必传
        // 页签名称
        title: '新增区域管理信息',
        // 传递的业务数据，可选配置
        data: {
          pageType: 1 // 新增,
        },
        afterTabClose: () => {
          this.d1_BillList.queryDataByCondition();
        }
      });
    },
    // 修改
    doUpdate () {
      var _this = this;
      var params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      _this.$router.addTab({
      // 路由名称
        name: 'xwmanage/lmtmanage/area/areaOrgListIndex',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom' + new Date().getTime(), // 必传
        // 页签名称
        title: '微贷区域维护页面',
        // 传递的业务数据，可选配置
        data: {
          params: params,
          pageType: 3 // 修改,
        },
        afterTabClose: () => {
          this.d1_BillList.queryDataByCondition();
        }
      });
    }
  }
};
</script>
