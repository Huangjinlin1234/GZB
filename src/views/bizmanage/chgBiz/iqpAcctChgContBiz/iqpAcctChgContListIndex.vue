<template>
  <div>
    <yu-panel title="账号变更申请">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="yu-xloan-cont" placeholder="合同编号" name="contNo"  @select-fn="commonSelectFn" :mapping="{'contNo':'contNo'}" width="730" height="480" :parms="{'belgLine':'bl300','oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-xproduct" placeholder="产品编号" name="prdId"  @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" :parms="{'belgLine':'bl300','cusState':'20','oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" exclude-key="111,997,998"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="doAdd">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate">修改</yu-button>
          <yu-button ref="btn_doDelete" @click="doDelete">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="中文合同编号" prop="cnContNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同余额" prop="contBalance"></yu-xtable-column>
        <yu-xtable-column label="合同起始日期" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日期" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="50" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" width="50" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_ZB_APPR_STATUS');
// 合同账号变更申请列表界面

let jsoPar = '';

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      baseParams: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpacctchgcont/',
      deleteUrl: this.$backend.cmisBiz + '/api/iqpacctchgcont/delete/'
    };
  },
  created: function () {
    this.baseParams = {condition: {approveStatus: '000', oprType: '01', approveStatusList: ''}};
  },
  mounted () {
    this.$refs.refTable.remoteData();
  },
  methods: {
    // 新增
    doAdd () {
      this.$dialog.open(
        '合同帐号变更申请引导界面',
        'bizmanage/chgBiz/iqpAcctChgContBiz/iqpAcctChgContAddIndex',
        1000,
        1000,
        jsoPar,
        this.getDialogDataFunc
      );
    },

    getDialogDataFunc () {
      // approveStatusList:""这个只是为了清空之前append的值
      this.baseParams = {approveStatus: '000', oprType: '01', approveStatusList: ''};
      // this.$refs.refTable.remoteData();
    },

    // 修改
    doUpdate () {
      // 获取选中的数据
      let jsoPar = this.$refs.refTable.selections;

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      jsoPar['model_group_no'] = 'IQP_ACCT_CHG_CONT';// 申请-修改模板组

      jsoPar['op'] = 'EDIT';

      // 绘制修改页面
      this.$dialog.open(
        '合同帐号变更申请-修改',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc
      );
      // YuXP.openDialogAndCloseMe('合同帐号变更申请-修改', '/yuxp/product/pages/cfgmanage/productconfig/templetfactory/tempetfactorypreview.js', '1200', '800', jsoPar, close, true, true);
    },

    // 删除
    doDelete () {
      let row = this.$refs.refTable.selections;

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row = this.$refs.refTable.selections[0];
      if (row.approve_status != '000') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的还款方式变更申请记录才能进行删除操作！', 350, 150);
        return;
      }

      // 进行逻辑删除
      this.logicDelete();
    },
    logicDelete: function () {
      let row = this.$refs.refTable.selections;
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      row = this.$refs.refTable.selections[0];
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            let url = this.logicDeleteUrl || (this.dataUrl + 'update');
            let keyValue = row[this.pkField];
            let data = {'oprType': '02'};
            data[this.pkField] = keyValue;
            _this.$request({
              url: url,
              method: 'post',
              data: data
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

    // 查看
    doView () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      jsoPar['model_group_no'] = 'IQP_ACCT_CHG_CONT';
      jsoPar['op'] = 'view';

      this.$dialog.open(
        '合同帐号变更-详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
    },

    // 影像查看
    onImage () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.$xutils.showMsgBox('提示', '暂无', 350, 150);
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
