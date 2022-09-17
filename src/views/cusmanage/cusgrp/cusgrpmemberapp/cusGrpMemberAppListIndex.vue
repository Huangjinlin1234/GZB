<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusGrpMemberAppList_d1_BillList.vue';
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
    /**
       * 作者：李召星
       * 集团认定详情中的成员信息列表
       */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      if (this.getFactory().contextData.op == 'view') {
        this.d1_BillList.setBillListButtonVisable('doAdd', false);
        this.d1_BillList.setBillListButtonVisable('doUpdate', false);
        this.d1_BillList.setBillListButtonVisable('doDelete', false);
        if (this.getFactory().contextData.appType == '03') {
          this.d1_BillList.setBillListButtonVisable('doView', false);
        }
      }

      this.d1_BillList.queryDataByCondition({grpNo: this.getFactory().contextData.grpNo, serno: this.getFactory().contextData.serno});
    },

    // 新增集团成员
    doAdd () {
      const jsoPar = {};
      jsoPar['serno'] = this.getFactory().contextData.serno;
      jsoPar['grpNo'] = this.getFactory().contextData.grpNo;
      jsoPar['grpCloselyDegree'] = this.getFactory().contextData.grpCloselyDegree;
      // 设置变更类型默认状态 01-原有不变,02-本次新增
      jsoPar['modifyType'] = '01';
      jsoPar['cusGrpMemberAppAddIndex'] = '01';
      // 页面跳转
      this.$dialog.open('集团客户认定申请', 'cusmanage/cusgrp/cusgrpmemberapp/cusGrpMemberAppAddIndex', 900, 500, jsoPar, this.callBack);
    },

    // 修改方法
    doUpdate () {
      // 判断未选择数据
      const params = this.d1_BillList.getSelectedRowData();

      const CusId = params.cusId;

      if (this.getFactory().contextData.coreCusId == CusId) {
        this.$xutils.showMsgBox('提示', '核心客户或母公司不允许修改!');
        return;
      }

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      // 传入参数 update 修改按钮进入
      params['op'] = 'update';

      // 页面跳转
      this.$dialog.open('集团客户认定申请', 'cusmanage/cusgrp/cusgrpmemberapp/cusGrpMemberAppInfoIndex', 900, 500, params, this.callBack);
    },

    // 删除方法
    doDelete () {
      let _this = this
      const params = this.d1_BillList.getSelectedRowData();
      const CusId = params.CusId;

      if (this.getFactory().contextData.coreCusId == CusId) {
        this.$xutils.showMsgBox('提示', '核心客户或母公司不允许修改!');
        return;
      }

      // 逻辑删除
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusgrpmemberapp/delete/' + params.pkId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.callBack()
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },

    // 查看方法
    doView () {
      // 判断未选择数据
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      // 传入参数 update 修改按钮进入
      params['op'] = 'view';

      // 页面跳转
      this.$dialog.open('集团客户认定申请', 'cusmanage/cusgrp/cusgrpmemberapp/cusGrpMemberAppInfoIndex', 900, 500, params, this.callBack);
    },

    // 回调函数
    callBack () {
      this.d1_BillList.queryDataByCondition({grpNo: this.getFactory().contextData.grpNo, serno: this.getFactory().contextData.serno});
    }
  }
};
</script>
