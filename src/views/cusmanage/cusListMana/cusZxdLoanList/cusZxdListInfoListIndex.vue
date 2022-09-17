<template>
  <div>
    <yu-panel title="增享贷名单信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" type="primary" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_byupdate1" type="primary" v-if="checkCtrl('modify')" @click="byupdate()">修改</yu-button>
          <yu-button ref="btn_$delete" type="primary" v-if="checkCtrl('delete')"  @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$query" type="primary" v-if="checkCtrl('view')" @click="lookDetail()">查看</yu-button>
          <yu-button ref="btn_generateSurvey" type="primary" v-if="checkCtrl('taskadd')"  @click="generateSurvey()">生成调查表</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number request-type="post" condition-key="condition" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="联系电话" prop="phone"></yu-xtable-column>
        <yu-xtable-column label="借据号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据金额" prop="billAmt"></yu-xtable-column>
        <yu-xtable-column label="借据余额" prop="billBal"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="贷款截止日" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="贷款申请日" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="办理状态" prop="applyStatus" data-code="STD_XD_ZXD_STATUS"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';

yufp.lookup.reg('STD_XD_ZXD_STATUS');
export default {
  name: 'CusZxdLoanList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dataUrl: this.$backend.cmisBiz + '/api/cuslstzxd/query',
      // 删除的url
      deleteUrl: this.$backend.cmisBiz + '/api/cuslstzxd/delete/',
      baseParams: {sort: 'updDate desc'}
    };
  },
  methods: {

    /** 生成调查表 */
    generateSurvey () {
      // 获取选中的数据
      const jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '选择一条记录进行操作!');
        return;
      }

      if (jsoPar.applyStatus === '03') {
        this.$message({message: '已生成调查表，请勿点击', type: 'warning'});
        return;
      }

      // 风控模型A推送完毕后开始生成调查表，此时办理状态为"02--待办"，其余状态不允许点击;
      if (jsoPar.applyStatus != '02') {
        this.$message({message: '办理状态不为待办，不允许生成调查表！', type: 'warning'});
        return;
      }

      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'post',
        data: JSON.stringify(jsoPar),
        url: this.$backend.cmisBiz + '/api/cuslstzxd/generatesurvey/',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$message({message: '生成成功', type: 'success'});
            this.$refs.refTable.remoteData();
          } else {
            this.$message({message: response.message, type: 'warning'});
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    byadd () {
      const jsoPar = {
        'flag': 'add'
      };
      // 绘制修改页面
      this.$dialog.open('增享贷名单修改', 'cusmanage/cusListMana/cusZxdLoanList/cusLstZxdAdd', 1000, 800, jsoPar, () => { this.$refs.refTable.remoteData() });
    },

    // 修改
    byupdate () {
      // 获取选中的数据
      const jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 绘制修改页面
      this.$dialog.open('增享贷名单修改', 'cusmanage/cusListMana/cusZxdLoanList/cusLstZxdUpdate', 1000, 800, jsoPar, () => { this.$refs.refTable.remoteData() });
    },

    lookDetail () {
      // 获取选中的数据
      const jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      const opPar = {};
      yufp.clone(jsoPar, opPar);
      opPar['optype'] = 'view';
      // 绘制修改页面
      this.$dialog.open('增享贷名单查看', 'cusmanage/cusListMana/cusZxdLoanList/cusLstZxdUpdate', 1000, 800, opPar);
    }
  }
};
</script>