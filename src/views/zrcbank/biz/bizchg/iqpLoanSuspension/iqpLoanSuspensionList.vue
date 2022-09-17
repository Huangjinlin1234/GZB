<template>
   <div>
   <yu-tabs v-model="activeName">
    <yu-tab-pane label="贷款停息申请" name="first">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="ilsSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('add')" @click="onInsert">新增</yu-button>
          <yu-button type="primary" v-if="checkCtrl('edit')" @click="onUpdate(true)">修改</yu-button>
          <yu-button type="primary" v-if="checkCtrl('delete')" @click="onDelete">删除</yu-button>
          <yu-button type="primary" v-if="checkCtrl('view')" @click="onUpdate(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseparams" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="ilsSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="停止操作码" prop="susOpt" data-code="STD_SUS_OPT" ></yu-xtable-column>
        <yu-xtable-column label="是否补计提停息阶段利息" prop="isCalculateInt" data-code="STD_ZB_YES_NO" width="190"></yu-xtable-column>
        <yu-xtable-column label="生效时间" prop="susInputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="贷款停息申请历史" name="second">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTableOld">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="ilsSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="onUpdate2(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTableOld" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseparams1" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="ilsSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="停止操作码" prop="susOpt" data-code="STD_SUS_OPT"></yu-xtable-column>
        <yu-xtable-column label="是否补计提停息阶段利息" prop="isCalculateInt" data-code="STD_ZB_YES_NO" width="190"></yu-xtable-column>
        <yu-xtable-column label="生效时间" prop="susInputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
  </yu-tabs>
    <yu-xdialog :visible.sync="visiable"  width="400px" title="请选择贷款借据" >
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group :column="3">
        <yu-xform-item label="借据编号" colspan="24" ctype="yu-xloan" name="billNo" rules="required" placeholder="借据编号" :parms="{condition:{'managerId':managerId, 'accStatus': '1'}}" :mapping="{'billNo':'billNo','accStatus':'accStatus'}" @select-fn="commonSelectFn"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNextStep">下一步</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_ZB_YES_NO,STD_SUS_OPT');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogVisible: false,
      dataUrl: this.$backend.cmisBiz + '/api/iqploansuspension/query',
      visiable: false,
      formdata: {},
      activeName: 'first',
      baseparams: {condition: JSON.stringify({approveStatus:'000,111,992'})},
      baseparams1:{condition: JSON.stringify({approveStatus:'998,997'})}
    };
  },
  methods: {
    onInsert () {

      this.$router.addTab({
      // 路由名称
      name:'zrcbank/biz/bizchg/iqpLoanSuspension/iqpLoanSuspensionAdd' ,
      // 自定义唯一页签key,请统一使用custom_前缀开头
      key:  1 + new Date().getTime(), // 必传
      // 页签名称
      title: '贷款停息申请新增向导',
      // 传递的业务数据，可选配置

    });
    },





    opendTab (params, title) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqpLoanSuspension/iqpLoanSuspensionDetail',
        key: 1 + new Date().getTime(),
        title: title,
        data: params
      });
    },



    onDelete () {
      let row = this.$refs.refTable.selections;
      if (row == null) {
        this.$message('必须选择一条记录进行操作！');
        return;
      }
      row = this.$refs.refTable.selections[0];
      if (row.approveStatus != '000' && row.approveStatus != '992') {
        this.$message({type: 'warning', message: '仅有待发起和退回状态可以删除！'});
        return;
      }
      // 进行逻辑删除
      this.delete(row.ilsSerno);
    },


    delete: function (id) {
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            _this.$request({
              url: this.$backend.cmisBiz + '/api/iqploansuspension/delete',
              method: 'post',
              data:id
            }).then((response) => {
              if (response.code == '0') {
                _this.$refs.refTable.remoteData();
                _this.$message('删除成功!');
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '删除失败!', type: 'error' });
            });
          }
        }
      });
    },
    /**
       * 修改
       */
    onUpdate (updateFlag) {
      let _this = this;
      let row = this.$refs.refTable.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      if(updateFlag){
        if (row.approveStatus == '000' || row.approveStatus == '992') {
          row['opType'] = 'EDIT' ;
          row.callback = function () {
            _this.$refs.refTable.remoteData();
          };
          this.opendTab(row, '贷款停息申请修改');
        } else {
          this.$xutils.showMsgBox('提示', '只有待发起和退回状态才能进行修改！');
          return;
        }
      }else{
         row['opType'] = 'VIEW';
          row.callback = function () {
            _this.$refs.refTable.remoteData();
          };
          this.opendTab(row, '贷款停息申请查看', row.billNo);
      }
    },


    onUpdate2 (updateFlag) {
      let _this = this;
      let row = this.$refs.refTableOld.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row['opType'] = updateFlag ? 'EDIT' : 'VIEW';
      row.callback = function () {
        _this.$refs.refTableOld.remoteData();
      };
      this.opendTab(row, updateFlag ? '贷款停息申请修改' : '贷款停息申请查看', row.billNo);
    },
  }
};
</script>
