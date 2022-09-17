<template>
  <div>
    <yu-panel title="信用等级配置">
      <yu-toolBar>
        <yu-button ref="btn_onUpdate" @click="onUpdate" type="primary">修改</yu-button>
      </yu-toolBar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="true">
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="配置类型" prop="cfgType" data-code="STD_ASPL_CFG_TYPE" hide-column></yu-xtable-column>
        <yu-xtable-column label="资产类型" prop="assetType" data-code="STD_ASPL_ASSET_TYPE" hide-column></yu-xtable-column>


        <yu-xtable-column label="信用配置类型" prop="cfgCreditType" data-code="STD_CFG_CREDIT_TYPE" hide-column></yu-xtable-column>
        <yu-xtable-column label="信用等级" prop="creditLevel" data-code="STD_ACC_BANK_CREDIT_LEVEL" ></yu-xtable-column>
        <yu-xtable-column label="抵质押率(%)"  prop="pldimnRate" >
          <template slot-scope="scope">
            {{ scope.row.pldimnRate*100 }}%
          </template>
        </yu-xtable-column>
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
yufp.lookup.reg('STD_ASPL_CFG_TYPE,STD_ASPL_ASSET_TYPE,STD_CFG_CREDIT_TYPE,STD_ACC_BANK_CREDIT_LEVEL');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinList],
  props: {

  },
  data () {
    return {
      dataUrl: this.$backend.cmisCfg + '/api/cfgcreditlevel/cfgcreditlevellist',
      baseParams: {condition: {'cfgType': '02', 'oprType': '01'}, sort: 'creditLevel desc'}
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
        '承兑行信用等级修改界面',
        'cfgmanage/cfgAspl/cfgCreditLevel/cfgCreditLevelUpdateIndex',
        800,
        300,
        selections[0],
        () => {
          this.$refs.refTable.remoteData({condition: {'cfgType': '02', 'oprType': '01'}, sort: 'creditLevel desc'});
        }
      );
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
        'cfgmanage/cfgAspl/cfgCreditLevel/cfgCreditLevelUpdateIndex',
        -1,
        -1,
        selections[0]
      );
    }
  }
};
</script>
