<template>
  <div>
    <yu-panel title="资产抵质押率配置">
      <yu-toolBar>
        <yu-button type="primary" @click="onUpdate">修改</yu-button>
      </yu-toolBar>

      <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
        <yu-xform ref="refForm" label-width="140px" v-model="formdata1" :disabled="formDisabled">
          <yu-xform-group column="1">
            <yu-xform-item label="资产类型" ctype="select"  name="assetType" rules="required" placeholder="资产类型" data-code="STD_ASPL_ASSET_TYPE"></yu-xform-item>
            <yu-xform-item label="抵质押率(%)" ctype="yu-num"  name="pldimnRate" rules="required" placeholder="抵质押率" :multiple="100" :precision="0" :min="0"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveFn">保存</yu-button>
            <yu-button @click="cancelFn">取消</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>

      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="true"
        :utrace="utrace"
        :u-pk-value="uPkValue"
        trace-server-name="/yusp-app-oca"
        ukey-field="pkId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save"
      >
        <yu-xtable-column label="主键" prop="pkId" hide-column ></yu-xtable-column>
        <yu-xtable-column label="配置类型" prop="cfgType" data-code="STD_ASPL_CFG_TYPE" hide-column></yu-xtable-column>
        <yu-xtable-column label="资产类型" prop="assetType" data-code="STD_ASPL_ASSET_TYPE" utrace></yu-xtable-column>
        <yu-xtable-column label="抵质押率" prop="pldimnRate" utrace>
          <template slot-scope="scope">
            {{ scope.row.pldimnRate*100 }}%
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="信用配置类型" prop="cfgCreditType" data-code="STD_CFG_CREDIT_TYPE" hide-column></yu-xtable-column>
        <yu-xtable-column label="信用等级" prop="creditLevel" data-code="STD_ACC_BANK_CREDIT_LEVEL" hide-column></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
        <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
        <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId" hide-column></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CFG_CREDIT_TYPE,STD_ZB_YES_NO,STD_ASPL_ASSET_TYPE');
import mixin from '@/utils/mixin';
import mixinList from '@/utils/mixins/mixin-list';
import { sessionStore } from 'xy-utils';
export default {
  mixins: [mixinList],
  props: {

  },
  data () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      formdata1: {},
      utrace: true,
      // formdatautrace: {},
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'asplaorglisttable',
      uPkValue: 'asplaorglist_form',
      dataUrl: this.$backend.cmisCfg + '/api/cfgcreditlevel/cfgcreditlevellist',
      baseParams: {condition: {'cfgType': '01', 'oprType': '01'}, sort: 'inputDate desc'},
      dialogVisible: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 初始化信息
    AfterInit () {
      // 初始化
    },
    // 修改
    onUpdate () {
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      this.$dialog.open(
        '资产抵质押率修改界面',
        'cfgmanage/cfgAspl/cfgCreditLevel/cfgAssetCreditPleRateUpdateIndex',
        650,
        250,
        selections[0],
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    },
    // 新增
    onAdd () {
      let _this = this;
      _this.dialogVisible = true;
    },
    saveFn () {
        let jsoPar = this.refForm;
        this.$xutils.request({
          // 同步请求
          async: false,
          // 修改
          url: this.$backend.cmisCfg + '/api/cfgcreditlevel/insertAssetPleRate',
          data: JSON.stringify(jsoPar),
          success: (response, status, xhr) => {
            if (response.data) {
              // 自动刷新列表数据
              this.UTraceSet();
              this.$xutils.showMsgBox('提示', '保存成功！');
            } else {
              this.$xutils.showMsgBox('提示', response.message);
            }
          },
          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        })
    },
    // 日志
    onUpdateLog () {
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      this.$dialog.open(
        '日志详情',
        'cfgmanage/cfgAspl/cfgCreditLevel/cfgAssetCreditPleRateUpdateIndex',
        -1,
        -1,
        selections[0]
      );
    }
  }
};
</script>
