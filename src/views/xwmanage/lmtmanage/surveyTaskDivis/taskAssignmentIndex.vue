<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './taskAssignment_d1_BillList.vue';

export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      xzkhjl: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.xzkhjl = this.$refs.d1_BillList;
    },
    closeopen () {
      this.$dialog.close(this.dialogId);
    },


    // 选择用户
    select (index) {
      this.xzkhjl.buttonLoading = true;
      const params = this.xzkhjl.getSelectedRowData();
      if (params == null) {
        this.$message({message: '请选择一条数据'});
        this.xzkhjl.buttonLoading = false;
        return;
      }
      // I=用户不可用
      if (params.userSts == 'I') {
      // if (!params.checked) {
        this.$message({message: '该用户已离职，请重新选择!'});
        this.xzkhjl.buttonLoading = false;
        return;
      }
      const data = this.pageParams.params;
      data['prcId'] = params.loginCode;

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveytaskdivis/allocation',
        data: data
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data == 1) {
            this.$message({message: '操作成功', type: 'success'});
          } else {
            this.$message({message: message});
          }
        }
        this.xzkhjl.buttonLoading = false;
        this.$dialog.close(this.dialogId);
      });
    }
  }
};
</script>
