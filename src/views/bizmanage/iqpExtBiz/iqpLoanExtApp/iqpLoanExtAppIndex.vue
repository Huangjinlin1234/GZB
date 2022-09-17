<template>
  <div>
    <yu-panel title="？？" panel-type="normal">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="doAdd">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate(true)">修改</yu-button>
          <yu-button ref="btn_doDelete" @click="doDelete">删除</yu-button>
          <yu-button ref="btn_doView" @click="doUpdate(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'b.oprType':'01','a.oprType':'01'}" :default-load="true">
        <yu-xtable-column label="展期申请流水号" prop="extSerno"></yu-xtable-column>
        <yu-xtable-column label="原借据编号" prop="oldBillNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="原币种" prop="fountCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="展期金额" prop="extAmt"></yu-xtable-column>
        <yu-xtable-column label="展期终止日期" prop="extEndDate"></yu-xtable-column>
        <yu-xtable-column label="展期执行利率（年）" prop="extRealityIrY"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_APPR_STATUS');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqploanextapp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/iqploanextapp/delete/'
    };
  },
  mounted () {
  },
  methods: {
    // 新增
    doAdd () {
      this.$dialog.open(
        '展期业务申请页面',
        'bizmanage/iqpExtBiz/iqpLoanExtApp/iqpLoanExtAppAddIndex',
        800,
        600,
        {'pageType': 'ADD'},
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    },
    // 修改
    doUpdate (updateFlag) {
      let params = this.$refs.refTable.selections;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params = this.$refs.refTable.selections[0];
      params['model_group_no'] = 'IQP_LOAN_EXT_APP';
      params['op'] = updateFlag ? 'EDIT' : 'VIEW';
      // 办理人员页面为通用的js，其中关联主键名称为biz_serno,因此入参新增biz_serno字段并赋值iqp_serno
      // 增加类型字段，用于判断业务规则校验
      params['bizType'] = 'iqp';
      params['pageDataFlag'] = '0';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        yufp.clone(params, {}),
        _rt => {
          this.$refs.refTable.remoteData();
        }
      );
    },

    // 删除
    doDelete () {
      let params = this.$refs.refTable.selections;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params = this.$refs.refTable.selections[0];
      const approveStatus = params.approveStatus;
      if (approveStatus !== '000') {
        this.$xutils.showMsgBox('提示', '仅允许删除待发起的数据!');
        return;
      }
      // 调用后端的删除逻辑，删除相关的关系表数据
      this.$xutils.showConfirmBox('提示', '是否确认删除？', 350, 150, confirmFlag => {
        if (confirmFlag) {
          // 调用后端的删除逻辑，删除相关的关系表数据
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisBiz + '/api/iqploanextapp/deleteIqpLoanExtAppInfo',
            data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                  // 列表刷新
                  this.$refs.refTable.remoteData({oprType: '01'});
                });
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            }
          });
        }
      });
    },
    // 神奇的parent.parent.parent
    refreshBillListData () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
