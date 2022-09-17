<template>
  <div>
    <yu-panel title="新账号信息" panel-type="normal">
      <template slot="right">
        <yu-button-drop>
          <yu-button  @click="doAdd" v-if="btnVisible">新增</yu-button>
          <yu-button  @click="doUpdate" v-if="btnVisible">修改</yu-button>
          <yu-button  @click="doDelete" v-if="btnVisible">删除</yu-button>
          <yu-button @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="账户属性" prop="acctAttr" data-code="STD_ZB_BR_ID_ATTR"></yu-xtable-column>
        <yu-xtable-column label="账号归属" prop="acctBelong" data-code="STD_ZB_ACCT_BELONG"></yu-xtable-column>
        <yu-xtable-column label="账号分类" prop="acctClass" data-code="STD_ZB_ACCT_CLASS"></yu-xtable-column>
        <yu-xtable-column label="账号" prop="acctNo"></yu-xtable-column>
        <yu-xtable-column label="账号名称" prop="acctName"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="账号状态" prop="acctStatus" data-code="STD_ZB_PVP_ACCT_ST"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_BR_ID_ATTR,STD_ZB_ACCT_BELONG,STD_ZB_ACCT_CLASS,STD_ZB_CUR_TYP,STD_ZB_PVP_ACCT_ST');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgrel/',
      deleteUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgrel/delete/',
      baseParams: {condition: {'oprType': '01', 'acctChgFlag': '02'}},
      btnVisible: true
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 账户信息页面
    afterInit () {
         // 查看页面进入或者流程页面进入
      if (this.getFactory().contextData.opType == 'view') {
        this.btnVisible = false;
      }
      this.$refs.retTable.remoteData({iqpSerno: this.getFactory().contextData.iqpSerno});
    },
    // 新增
    doAdd () {
      const loanData = this.findAccInfoFromBackend(this.getFactory().contextData.billNo);
      this.getFactory().contextData['contNo'] = loanData.contNo;
      this.$dialog.open(
        '账号信息申请',
        'bizmanage/chgBiz/accInfoChgBiz/newAccInfoChgUpdateIndex',
        900,
        650,
        this.getFactory().contextData,
        this.getDialogDataFunc
      );
    },

    // 根据 借据号 获取借据信息
    findAccInfoFromBackend (billNo) {
      let returnData = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'get',
        url: this.$backend.cmisBiz + '/api/accloan/' + billNo,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = response.data;
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      return returnData;
    },
    // 刷新当前表格数据
    getDialogDataFunc () {
      this.$refs.retTable.remoteData({iqpSerno: this.getFactory().contextData.iqpSerno});
    },

    // 修改
    doUpdate () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      jsoPar['opType'] = 'update';
      this.$dialog.open(
        '账号信息申请',
        'bizmanage/chgBiz/accInfoChgBiz/newAccInfoChgUpdateIndex',
        900,
        600,
        jsoPar,
        this.getDialogDataFunc
      );
    },

    // 查看
    doView () {
      let jsoPar = this.$refs.refTable.selections;

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      jsoPar['opType'] = 'view';
      this.$dialog.open(
        '账号信息申请',
        'bizmanage/chgBiz/accInfoChgBiz/newAccInfoChgUpdateIndex',
        900,
        600,
        jsoPar,
        this.getDialogDataFunc
      );
    },

    // 删除
    doDelete () {
      let jsoPar = this.$refs.refTable.selections;

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            let url = this.logicDeleteUrl;
            let keyValue = jsoPar[this.pkField];
            let data = {'oprType': '02'};
            data[this.pkField] = keyValue;
            _this.$request({
              url: url,
              method: 'post',
              data: data
            }).then((response) => {
              if (response.code == '0') {
                this.$refs.refTable.remoteData();
                _this.$message('删除成功!');
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '删除失败!', type: 'error' });
            });
          }
        }
      });
    }
  }
};
</script>
