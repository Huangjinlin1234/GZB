<template>
 <div>
    <yu-panel title="展期申请合同信息" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户号" ctype="input" placeholder="客户号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsert" @click="doInsert">新增</yu-button>
          <yu-button ref="btn_doDelete" @click="doDelete">删除</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate(true)">修改</yu-button>
          <yu-button ref="btn_doView" @click="doUpdate(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="post">
        <yu-xtable-column label="原合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="贷款合同类型" prop="contType"></yu-xtable-column>
        <yu-xtable-column label="是否使用授信额度" prop="isUtilLmt"></yu-xtable-column>
        <yu-xtable-column label="授信额度编号" prop="lmtNo"></yu-xtable-column>
        <yu-xtable-column label="批复编号" prop="replyNo"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :visible.sync="visiable"  width="400px" title="展期申请新增" >
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group :column="3">
          <yu-xform-item label="原合同编号" ctype="yu-xloan-ext" name="contNo" rules="required" placeholder="原合同编号" @select-fn="commonSelectFn" :mapping="{'contAmt':'contAmt','contStartDate':'contStartDate','cusId':'cusId','contEndDate':'contEndDate','contNo':'contNo'}" width="800" height="480" :selectionType="radio" colspan="24"></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="contSerno" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNext">下一步</yu-button>
      <yu-button type="primary" @click="doBack">返回</yu-button>
    </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  name: 'LoanInfo',
  props: {
    pageParams: Object
  },
  data () {
    return {
      searchFormdata: {},
      formdata: {},
      visiable: false,
      dataUrl: this.$backend.cmisBiz + '/api/iqpcontext/queryIqpContExtList'
    };
  },
  methods: {
    doNext () {
      const json = yufp.clone(this.formdata, {});
      // 校验必输项
      let saveFlag = false;
      this.$refs.refForm.validate(function (valid) {
        saveFlag = valid;
      });
      if (!saveFlag) {
        return;
      }
      // 自动插入借据下的合同数据
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqpcontext/saveIqpContExtBycontNo',
        data: yufp.clone(this.formdata, {}),
        success: (response, status, xhr) => {
        }
      });
      this.visiable = false;
      json['opType'] = 'ADD';
      this.opendTab(json, '展期申请新增', this.formdata.contNo);
    },
    doBack: function () {
      this.visiable = false;
    },
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'bizmanage/modifyBiz/extBiz/iqpContExtInfo',
        key: 'custom_view_' + key,
        title: title,
        data: params
      });
    },
    /**
      新增打开弹出框
     */
    doInsert: function () {
      this.visiable = true;
      this.$nextTick(function () {
        this.formdata.contSerno = this.$xutils.getSEQWithParamFromServer('IQP_REPAY_SERNO');
      });
    },
    // 修改
    doUpdate (updateFlag) {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '只有待发起，和打回可以修改\r\n请重新操作!', 350, 150);
        return;
      }
      // 合同编号
      this.$xutils.request({
        // 异步请求
        async: true,
        url: this.$backend.cmisBiz + '/api/iqpcontext/queryIqpContExt',
        data: {contSerno: jsoPar.contSerno},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let data = response.data;
            if (data != null) {
              data['opType'] = updateFlag ? 'EDIT' : 'VIEW';
              this.opendTab(data, updateFlag ? '展期申请修改' : '展期申请详情', jsoPar.contNo);
            } else {
              this.$xutils.showMsgBox('提示', updateFlag ? '跳转修改失败' : '查看失败');
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 删除
    doDelete () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '只有待发起，和打回可以删除\r\n请重新操作!', 350, 150);
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 异步请求
            async: true,
            type: 'post',
            url: this.$backend.cmisBiz + '/api/iqpcontext/delete/deleteBycontSerno',
            data: {contSerno: jsoPar.contSerno},
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功', 500, 300, () => {
                  this.$refs.refTable.remoteData();
                });
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            },
            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              // bol = false;
            }
          });
        }
      });
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
