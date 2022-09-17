<template>
  <div>
    <yu-panel title="停息/恢复计息申请列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" :parms="{'belgLine':'bl300','cusState':'20','oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="业务申请类型" ctype="select" data-code="STD_ZB_INT_TYPE" placeholder="业务申请类型" name="intType" ></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" exclude-key="111,997,998"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doStopIntInsert" @click="doStopIntInsert">停息新增申请</yu-button>
          <yu-button ref="btn_doUnStopIntInsert" @click="doUnStopIntInsert">恢复计息新增申请</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="onDelete">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true"  :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="业务申请类型" prop="intType" data-code="STD_ZB_INT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="停息日期" prop="stopDate"></yu-xtable-column>
        <yu-xtable-column label="恢复计息日期" prop="unstopDate"></yu-xtable-column>
        <yu-xtable-column label="是否计收复利" prop="isCalCi" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_INT_TYPE,STD_ZB_CUR_TYP,STD_ZB_YES_NO,STD_ZB_APPR_STATUS');
/**
 * title 停息/恢复计息申请列表页面
 * author 马顺
 * date 2021-01-13
 * */
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpstpunstpintapp/',
      baseParams: {},
      searchFormdata: {}
    };
  },
  create: function () {
    this.baseParams = {condition: {oprType: '01', approveStatusList: '000,990,991,992'}};
  },
  mounted () {
    this.$refs.refTable.remoteData();
  },
  methods: {
    // 停息新增申请
    doStopIntInsert () {
      this.$dialog.open(
        '停息新增引导界面',
        'bizmanage/chgBiz/iqpStpUnStpIntAppBiz/iqpStpIntAppAddIndex',
        1280,
        400,
        {}
      );
    },

    // 恢复计息新增申请
    doUnStopIntInsert () {
      this.$dialog.open(
        '恢复计息新增引导界面',
        'bizmanage/chgBiz/iqpStpUnStpIntAppBiz/iqpUnStpIntAppAddIndex',
        1280,
        400,
        {}
      );
    },
    // 更新方法
    doUpdate () {
      let params = this.$refs.refTable.selections;

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params = this.$refs.refTable.selections[0];
      // 增加业务类型判断，调整不同页面
      let intType = params['intType'];

      if (intType == '01') {
        // 如果业务类型为停息
        params['model_group_no'] = 'CMG000036';// 停息申请模板组

        params['op'] = 'EDIT';
        // params['iqpSerno'] = params.iqp_serno;//已经转换驼峰不需要解析
      } else {
        params['model_group_no'] = 'CMG000048';// 停息恢复申请模板组
        params['op'] = 'EDIT';
        // params['iqpSerno'] = params.iqp_serno;
      }

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        () => {
          this.$refs.refTable.remoteData();
        },
        true,
        true
      );
    },

    // 查看方法
    doView () {
      let params = this.$refs.refTable.selections;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params = this.$refs.refTable.selections[0];
      // 增加业务类型判断，调整不同页面
      let intType = params['intType'];
      if (intType == '01') {
        // 如果业务类型为停息
        params['model_group_no'] = 'CMG000036';// 停息申请模板组
        params['op'] = 'VIEW';
        // params['iqpSerno'] = params.iqp_serno;
      } else {
        params['model_group_no'] = 'CMG000048';// 停息恢复申请模板组
        params['op'] = 'VIEW';
        // params['iqpSerno'] = params.iqp_serno;
      }
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        () => {
          this.refreshBillListData();
        },
        true,
        true
      );
    },
    // 删除
    onDelete () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的申请记录才能进行删除操作！', 350, 150);
        return;
      }
      // 进行逻辑删除
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            let url = this.dataUrl + 'update';
            let keyValue = jsoPar[this.pkField];
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
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
