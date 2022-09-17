<template>
  <yu-tabs type="card" v-model="tabbs">
    <yu-tab-pane label="公司客户">
      <d1-1-billlist ref="bRightsaarinfoaddCp"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="个人客户">
      <d1-2-billlist ref="bRightsaarinfoadd"></d1-2-billlist>
    </yu-tab-pane>
    <div style="display:flex;justify-content:center;">
      <yu-button type="primary" @click="confimBtn">确认</yu-button>
      <yu-button @click="back">返回</yu-button>
    </div>
  </yu-tabs>
</template>
<script>
import d11Billlist from './bRightsaarinfoadd_d1_1_BillList.vue';
import d12Billlist from './bRightsaarinfoadd_d1_2_BillList.vue';
/**
 业务权申领客户列表新增弹窗
 */
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      bRightsaarinfoaddCp: null,
      bRightsaarinfoadd: null,
      tabbs: '0',
      param: []
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.bRightsaarinfoaddCp = this.$refs.bRightsaarinfoaddCp;
      this.bRightsaarinfoadd = this.$refs.bRightsaarinfoadd;
      this.param = this.pageParams.data;
      // 查询客户经理对应的公司客户
      const model = {managerId: this.pageParams.managerId, cusCatalog: 2};
      const params = { condition: JSON.stringify(model) };
      this.bRightsaarinfoaddCp.baseParams = params;
      // 查询客户经理对应的个人客户
      const model1 = {managerId: this.pageParams.managerId, cusCatalog: 1};
      const params1 = { condition: JSON.stringify(model1) };
      this.bRightsaarinfoadd.baseParams = params1;
    },

    confimBtn () {
      let data;
      if (this.tabbs == 0) {
        data = this.bRightsaarinfoaddCp.getSelectedRowData();
      } else {
        data = this.bRightsaarinfoadd.getSelectedRowData();
      }
      if (!data) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (this.tabbs == 0) { // 确认是否是对公客户获取信息
        data = this.bRightsaarinfoaddCp.getSelectedRowData();
      } else if (this.tabbs == 1) { // 确认是否个人客户获取信息
        data = this.bRightsaarinfoadd.getSelectedRowData();
      }
      for (let i = 0; i < this.param.length; i++) { // 将携带过来已经添加的客户信息和选取的信息作比对
        if (data.cusId == this.param[i].cusId) {
          this.$xutils.showMsgBox('提示', '客户信息不能重复添加!');
          return;
        }
      }
      this.$dialog.close(this.dialogId, data);
    },
    back () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
