<template>
   <div>
   <yu-tabs v-model="activeName">
    <yu-tab-pane label="主动还款申请" name="first">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
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
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'apply': 'Y'},'sort':'inputDate desc'}" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="还款模式" prop="repayMode" data-code="STD_REPAY_MODE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="还款模式明细" prop="repayModeDesc" data-code="STD_REPAY_MODE_DESC"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="loanAppChnl" data-code="STD_APP_CHNL"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="主动还款历史" name="second">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTableOld">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="onUpdate2(false)">查看</yu-button>
           <yu-button type="primary" @click="refundFn">还款处理</yu-button>
           <yu-button type="primary" @click="printFn">打印</yu-button>
           <yu-button type="primary" @click="refundFnCZ">还款冲正</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTableOld" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'history':'Y'},'sort':'inputDate desc'}" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="还款模式" prop="repayMode" data-code="STD_REPAY_MODE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="还款模式明细" prop="repayModeDesc" data-code="STD_REPAY_MODE_DESC"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="loanAppChnl" data-code="STD_APP_CHNL"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="还款状态" prop="status">
          <template slot-scope="scope">
            {{ setStatus(scope.row.status)  }}
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="核心交易流水号" prop="hxSerno"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
  </yu-tabs>
    <yu-xdialog :visible.sync="visiable"  width="400px" title="主动还款申请引导界面" >
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group :column="3">
        <yu-xform-item label="原借据编号" colspan="24" ctype="yu-xloan" name="billNo" rules="required" placeholder="原借据编号" :parms="{condition:{'managerId':managerId, 'accStatusArray': '1,2,5'}}" :mapping="{'billNo':'billNo','accStatus':'accStatus','isTrust':'1'}" @select-fn="commonSelectFn"></yu-xform-item>
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
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_REPAY_MODE_TYPE,STD_REPAY_MODE_DESC,STD_APP_CHNL');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogVisible: false,
      dataUrl: this.$backend.cmisBiz + '/api/iqpprepayment/',
      visiable: false,
      formdata: {},
      activeName: 'first',
      managerId: this.$xutils.getDefaultformulaData("$LoginLoginCode")
    };
  },
  methods: {

    refundFnCZ: function () {
      let row = this.$refs.refTableOld.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      if(row.approveStatus != 997 && row.status != '1'){
          this.$xutils.showMsgBox('提示', '只有还款成功的借据才能进行还款冲正');
          return;
      }
      if(row.hxSerno == '' || row.hxSerno == null){
         this.$xutils.showMsgBox('提示', '核心交易流水号为空请确认!');
        return;
      }

      _this.$confirm('确定进行还款冲正', '提示', {
            type: 'warning',
            center: false,
            callback: action => {
            if  (action === 'confirm')  {
                _this.$request({
                url:this.$backend.cmisBiz + '/api/iqpprepayment/refundCz/' + row.iqpSerno,
                  method: 'post'
                  }).then((response) => {
              if (response.code == '0') {
                if(response.data=='success'){
                  _this.$refs.refTable.remoteData();
                    _this.$message('发送核心成功!请到柜面做冲正处理!');
                }
                if(response.data !='success'){
                  _this.$refs.refTable.remoteData();
                    _this.$message(response.data);
                }
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '还款冲正发送失败!', type: 'error' });
            });
          }
        }
      });
    },

    refundFn: function () {
      debugger;
      let row = this.$refs.refTableOld.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      if(row.approveStatus==997&&row.status!='1'){
          this.refund(row.iqpSerno);
      }else{
        this.$xutils.showMsgBox('提示', '只有审批通过还款失败的借据才能进行还款处理');
        return;
      }


    },
      refund:function(id) {
          var _this = this;
          debugger;
        _this.$confirm('你真的想对这条借据进行还款操作', '提示', {
            type: 'warning',
            center: false,
            callback: action => {
            if  (action === 'confirm')  {
                _this.$request({
                url:this.$backend.cmisBiz + '/api/iqpprepayment/refund/' + id,
                  method: 'post'
                  }).then((response) => {
              if (response.code == '0') {
                if(response.data=='success'){
                   _this.$refs.refTable.remoteData();
                    _this.$message('还款成功!');
                }
                if(response.data !='success'){
                   _this.$refs.refTable.remoteData();
                    _this.$message(response.data);
                }
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '还款失败!', type: 'error' });
            });
          }
        }
      });
    },
    printFn: function () {
      var _this = this;
      var params = _this.$refs.refTableOld.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var iqpSerno = params.iqpSerno;
      let name = 'xwmanage/iqpManage/contManage/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemohktzs';
      params.src = _this.$backend.frptRptService + 'hktzs.cpt&iqpSerno=' + iqpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '还款通知书',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    onInsert () {
      this.visiable = true;
    },
    onCancel: function () {
      this.visiable = false;
      this.$nextTick(function () {
        this.$refs.refForm.resetFields();
      });
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    doNextStep () {
      let _this = this;
      let row = {};
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const selPars = this.formdata;
      if (selPars.accStatus == '0' || selPars.accStatus == '6' || selPars.accStatus == '7') {
        this.$xutils.showMsgBox('提示', '该借据不允许主动还款', 350, 150);
        return;
      }
      // 调用序列号生成的规则，生成放款申请序列号 后台生成
      // const rateCHGSerno = this.$xutils.getSEQWithParamFromServer('RATE_CHG_SERNO');
      const data = {
        'billNo': selPars.billNo
      };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqpprepayment/create',
        data: data,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            yufp.clone(response.data, row);
            row['opType'] = 'EDIT';
            // row['iqpSerno'] = rateCHGSerno;
            row.callback = function () {
              _this.$refs.refTable.remoteData();
            };
            this.opendTab(row, '主动还款申请', row.billNo);
            _this.visiable = false;
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqpprepayment/iqpPrePaymentMain',
        key: 'custom_view_' + key + '_' + new Date().getTime(),
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
      if (row.approveStatus != '000') {
        this.$message({type: 'warning', message: '仅有待发起状态可以删除！'});
        return;
      }
      // 进行逻辑删除
      this.delete(row.iqpSerno);
    },
    delete: function (id) {
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            _this.$request({
              url: this.$backend.cmisBiz + '/api/iqpprepayment/batchdelete/' + id,
              method: 'post'
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
          this.opendTab(row, '还款申请修改', row.billNo);
        } else {
          this.$xutils.showMsgBox('提示', '只有待发起和打回状态才能进行修改！');
          return;
        }
      }else{
         row['opType'] = 'VIEW';
          row.callback = function () {
            _this.$refs.refTable.remoteData();
          };
          this.opendTab(row, '还款申请查看', row.billNo);
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
      this.opendTab(row, updateFlag ? '还款申请修改' : '还款申请查看', row.billNo);
    },
    setStatus(status){
      if(status == '0'){
        return '失败'
      } else if (status == '1'){
        return '成功'
      }else{
        return ''
      }
    }




  }
};
</script>
