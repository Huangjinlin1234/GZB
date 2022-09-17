<template>
  <d1-billlist ref="d1_BillList" :pageParams="pageParams"></d1-billlist>
</template>
<script>
import d1Billlist from './guarContImport_d1_BillList.vue';
/**
 *
   保证人列表
 *  @author 刘权
 */

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

  methods: {
    // 确定引入
    cfirmImport () {
      // 获取所有数据
      let params = this.$refs.d1_BillList.getSelectedRowData();
      var data = this.pageParams;
      data['guarNo'] = params.guarantyId;
      // 0 失效,在担保合同保存时,置为1生效
      data['status'] = '0';
      // debugger;

      // 显示提示框成功并自动关闭
      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据', 350, 150);
      } else {
        let isExistParams = {};
        isExistParams.isAddGuar = this.pageParams.isSuperaddGuar; //是否追加担保 主担保送0，追加担保送1
        isExistParams.lmtAccNo = this.pageParams.lmtAccNo; //授信额度编号
        isExistParams.guarNo = params.guarantyId; //押品编号
        isExistParams.guarWay = '30'; //担保方式
        this.$xutils.request({
          type: 'post',
          url: this.$backend.cmisBiz + '/api/guarbizrel/checkguarnoisexist',
          data: JSON.stringify(this.$xutils.toUpperCase(isExistParams, true)),
          success: (response, status, xhr) => {
            if (response.data === 'notExist') {
              this.$xutils.request({
                type: 'post',
                url: this.$backend.cmisBiz + '/api/grtguarcontrel/creteGrtGuarContRel',
                data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
                success: (response, status, xhr) => {
                  if (response.code == '0') {
                    this.$xutils.showMsgBox('提示', '引入成功', 500, 300, () => {
                      this.$dialog.close(this.dialogId);
                    });
                  } else {
                    this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
                  }
                },
                error: (result, b) => {
                  this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
                }
              });
            } else if(response.data === 'exist'){
              this.$xutils.showMsgBox('提示', '该抵质押物已被其他担保合同引入');
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            }
          },
          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      }
    }
  }
};
</script>
