
<template>
  <div>
      <yu-panel title="适用合同" panel-type="simple">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" name="contType" data-code="STD_CONT_TYPE"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" row-number row-key="pkId" condition-key="condition" :data-url="selectCtrDataUrl" :base-params="param" request-type="POST" :default-load="true">
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="票据种类" prop="drftType" data-code="STD_DRFT_TYPE" :hide-column="isDiscCont"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="产品编号" prop="prdId"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP" :hide-column="!isHighCont"></yu-xtable-column>
          <yu-xtable-column label="协议币种" prop="agrType" data-code="STD_ZB_CUR_TYP" :hide-column="isHighCont"></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY" :hide-column="isCtrCont"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY" :hide-column="!isCtrCont"></yu-xtable-column>
          <yu-xtable-column label="合同起始日期" prop="contStartDate" :hide-column="isCtrCont"></yu-xtable-column>
          <yu-xtable-column label="合同到期日期" prop="contEndDate" :hide-column="isCtrCont"></yu-xtable-column>
          <yu-xtable-column label="合同起始日期" prop="startDate" :hide-column="!isCtrCont"></yu-xtable-column>
          <yu-xtable-column label="合同到期日期" prop="endDate" :hide-column="!isCtrCont"></yu-xtable-column>
    `   </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="backToAdd" size="small">选取返回</el-button>
          <el-button @click="cancel" size="small">取消</el-button>
        </div>
      </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_CONT_TYPE');

export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      selectCtrDataUrl: '',
      // 表格中传出id数据的key
      queryCode: 'contNo',
      // 表格中显示到input框中的字段key
      textCode: 'contNo',
      codeToText: false,
      Param: {},
      isDiscCont: true,
      isHighCont: true,
      isCtrCont: true
    };
  },
  created: function () {
    var _this = this;
    // 01最高额授信协议，02普通贷款，03贴现协议，04贸易融资，05福费廷，06开证，07银承，08保函，09委托贷款
    if (_this.pageParams && (_this.pageParams.busiType == '01' || _this.pageParams.bizType == '01')) {
      this.isHighCont = false;
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrhighamtagrcont/selectbyquerymodel';
    } else if (_this.pageParams && (_this.pageParams.busiType == '02' || _this.pageParams.bizType == '02')) {
      this.isCtrCont = false;
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrloancont/selectbyquerymodel';
    } else if (_this.pageParams && (_this.pageParams.busiType == '03' || _this.pageParams.bizType == '03')) {
      this.isDiscCont = false;
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrdisccont/selectbyquerymodel';
    } else if (_this.pageParams && (_this.pageParams.busiType == '04' || _this.pageParams.bizType == '04')) {
      this.isCtrCont = false;
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrloancont/selectbyquerymodel';
    } else if (_this.pageParams && (_this.pageParams.busiType == '05' || _this.pageParams.bizType == '05')) {
      this.isCtrCont = false;
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrloancont/selectbyquerymodel';
    } else if (_this.pageParams && (_this.pageParams.busiType == '06' || _this.pageParams.bizType == '06')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrtfloccont/selectbyquerymodel';
    } else if (_this.pageParams && (_this.pageParams.busiType == '07' || _this.pageParams.bizType == '07')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctraccpcont/selectbyquerymodel';
    } else if (_this.pageParams && (_this.pageParams.busiType == '08' || _this.pageParams.bizType == '08')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrcvrgcont/selectbyquerymodel';
    } else if (_this.pageParams && (_this.pageParams.busiType == '09' || _this.pageParams.bizType == '09')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrentrustloancont/selectbyquerymodel';
    }
    if (_this.pageParams.busiType == '02' || _this.pageParams.busiType == '04' || _this.pageParams.busiType == '05') {
      _this.param = {
        condition: {
          cusId: _this.pageParams.cusId,
          lmtAccNo: _this.pageParams.lmtAccNo,
          contStatus: '200',
          oprType: '01',
          belgLine: '03',
          bizType: _this.pageParams.busiType
        }
      };
    } else {
      _this.param = {
        condition: {
          cusId: _this.pageParams.cusId,
          lmtAccNo: _this.pageParams.lmtAccNo,
          contStatus: '200',
          oprType: '01',
          belgLine: '03'
        }
      };
    }
  },
  methods: {
    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.refTable.selections[0];
      this.$dialog.close(this.dialogId, params);
    },
    /**
     * 取消
     */
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>

