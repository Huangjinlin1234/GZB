<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusIndex_d1_BillList.vue';
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
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition();
    },

    // 新增申请
    onAdd () {
      this.$dialog.open('', 'cusmanage/cusRelevance/modify/cusGuideAppIndex', 800, 600, {}, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 查看
    onView () {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$dialog.open(
        '关联客户查看界面',
        'cusmanage/cusRelevance/cusGuideAppViewIndex',
        800,
        600,
        jsoPar
      );
    },

    // 修改
    onUpdate () {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const approveStatus = params.approveStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【打回】且经办人是自己的数据可以修改!');
        return;
      }

      this.$dialog.open(
        '关联客户修改界面',
        'cusmanage/cusRelevance/modify/cusGuideAppUpdateIndex',
        -1,
        -1,
        params,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 删除
    onDelete () {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const approveStatus = params.approveStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【打回】且经办人是自己的数据可以删除!');
        return;
      }
      //  var approveStatus = params.approve_status;
      //  if(approveStatus!=='000'){
      //    YuXP.showMsgBox('提示','仅允许删除待发起的数据!');
      //    return;
      //  }
      this.$xutils.showConfirmBox('提示', '是否确认删除？', 350, 150, confirmFlag => {
        if (confirmFlag) {
          // 调用后端的删除逻辑，删除相关的关系表数据
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisCus + '/api/cusrelcusapp/delete/' + params.serno,

            //        data: JSON.stringify(YuXPUtil.toUpperCase(params,true)),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                  // 列表刷新
                  this.d1_BillList.queryDataByCondition();
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
    }
  }
};
</script>
