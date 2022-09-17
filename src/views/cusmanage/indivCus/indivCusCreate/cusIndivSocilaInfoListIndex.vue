<template>
  <!--
    @created by
    @updated by zhoumw
    @description 个人客户社会信息
  -->
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusIndivSocilaInfoList_d1_BillList.vue';
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
    let _this = this;
    _this.AfterInit();
    _this.$refs.d1_BillList.op = _this.$route.params.op;
  },
  methods: {
    /*
       个人客户社会关系信息
       */
    AfterInit () {
      let _this = this;
      this.d1_BillList = this.$refs.d1_BillList;
      let data = _this.$route.meta.params;
      if (data != null && data != 'undefined') {
        const cusIdRel = data.cusId;
        this.d1_BillList.queryDataByCondition({cusIdRel: cusIdRel});
      }
    },

    // 新增
    doInsert () {
      let _this = this;
      const cusIdRel = _this.$route.params.cusId;
      this.$dialog.open('个人客户社会信息新增', 'cusmanage/indivCus/indivCusCreate/cusIndivSocilaInfoIndex', -1, -1, cusIdRel, () => {
        this.d1_BillList.queryDataByCondition({cusIdRel: cusIdRel});
      }
      );
    },

    // 修改
    doUpdate () {
      const jsoPar = this.d1_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar['pk_id'] = jsoPar[this.d1_BillList.pkField];
      jsoPar['op'] = 'UPDATE';
      this.$dialog.open('个人客户社会信息修改', 'cusmanage/indivCus/indivCusCreate/cusIndivSocilaIUpdateIndex', -1, -1, jsoPar, () => {
        this.d1_BillList.queryDataByCondition();
      }
      );
    },

    // 删除
    doDelete () {
      const row = this.d1_BillList.getSelectedRowData();
      let _this = this;
      const cusIdRel = _this.$route.params.cusId;
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          if (row == null) {
            this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
            return;
          }
          const pkId = row[this.d1_BillList.pkField];
          this.$xutils.request({
            // 同步请求
            async: true,
            url: this.$backend.cmisCus + '/api/cusindivsocial/delete/' + pkId,
            data: JSON.stringify(this.$xutils.toUpperCase({[this.d1_BillList.pkField]: pkId}, true)),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                // 自动刷新列表数据
                this.$xutils.showMsgBox('提示', '删除成功', 500, 300, () => {
                  this.d1_BillList.queryDataByCondition({cusIdRel: cusIdRel});
                });
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            },
            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    },

    // 查看
    doView () {
      const jsoPar = this.d1_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar['op'] = 'VIEW';
      this.$dialog.open('个人客户社会信息查看', 'cusmanage/indivCus/indivCusCreate/cusIndivSocilaIUpdateIndex', -1, -1, jsoPar, () => {}
      );
    }
  }
};
</script>
