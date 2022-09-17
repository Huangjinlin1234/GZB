<template>
  <div>
    <yu-panel title="打印客户结清证明（针对借款人在我行贷款全部结清时适用）" panel-type="post">
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataCusUrlCusId" :base-params="baseCusParams" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型 " prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
        <yu-xtable-column label="操作">
            <template slot-scope="scope">
                <el-link type="primary" @click="viewCusCpt(scope.row)">打印结清证明</el-link>
            </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="打印合同结清证明（针对该份借款合同项下贷款全部结清且后续不再该合同项下发放贷款时适用）" panel-type="post">
      <yu-xtable ref="refTable2" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataCtrUrlCusId" :base-params="baseCtrParams" request-type="POST">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <!-- <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column> -->
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="纸质合同签订日期" prop="paperContSignDate"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="操作">
            <template slot-scope="scope">
                <el-link type="primary" @click="viewCtrCpt(scope.row)">打印结清证明</el-link>
            </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="打印贷款结清证明（针对单笔借据项下贷款全部结清时适用）" panel-type="post">
      <yu-xtable ref="refTable2" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataAccUrlCusId" :base-params="baseAccParams" request-type="POST">
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <!-- <yu-xtable-column label="证件号码" prop="certCode" hidden></yu-xtable-column> -->
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        <yu-xtable-column label="操作">
            <template slot-scope="scope">
                <el-link type="primary" @click="viewAccCpt(scope.row)">打印结清证明</el-link>
            </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_ZB_CUS_CLS,STD_CUS_STATE,STD_CONT_TYPE,STD_CONT_STATUS,STD_ACC_STATUS');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'guarPkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataCusUrlCusId: this.$backend.cmisBiz + '/api/accloan/querycuslistbycusid',
      dataCtrUrlCusId: this.$backend.cmisBiz + '/api/ctrloancont/queryctrloanlistbycusid',
      dataAccUrlCusId: this.$backend.cmisBiz + '/api/accloan/queryaccloanlistbycusid',
      baseCusParams: {condition: JSON.stringify({cusId: this.$route.meta.params.cusId})},
      baseCtrParams: {condition: JSON.stringify({cusId: this.$route.meta.params.cusId, OprType: '01'})},
      baseAccParams: {condition: JSON.stringify({cusId: this.$route.meta.params.cusId, OprType: '01'})}
    };
  },
  methods: {
    viewCusCpt: function (params) {
      var _this = this;
      let name = 'cusmanage/queryCus/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      params.src = _this.$backend.frptRptService + 'printCusJQ.cpt&cus_id=' + params.cusId;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    viewCtrCpt: function (params) {
      var _this = this;
      let name = 'cusmanage/queryCus/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      params.src = _this.$backend.frptRptService + 'printCtrJQ.cpt&cont_no=' + params.contNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    viewAccCpt: function (params) {
      var _this = this;
      let name = 'cusmanage/queryCus/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      params.src = _this.$backend.frptRptService + 'printAccJQ.cpt&pvp_serno=' + params.pvpSerno + '&cus_id=' + params.cusId;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
