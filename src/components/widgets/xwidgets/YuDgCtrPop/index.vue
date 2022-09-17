<!--对公专用合同Pop 严禁修改 qw -->
<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width">
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
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="产品编号" prop="prdId" ></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="合同币种" prop="curType"  data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarWay"  data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="合同起始日期" prop="contStartDate"></yu-xtable-column>
          <yu-xtable-column label="合同到期日期" prop="contEndDate"></yu-xtable-column>
    `   </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
      </yu-panel>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search"
      @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import * as xutil from '@/utils/xutils';
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';

export default {
  name: 'YuDgCtrPop',
  componentName: 'YuDgCtrPop',
  mixins: [popList],
  props: {
    param: {
      type: Object,
      default: function () {
        return {
          condition: {contStatus: '200'}
        };
      }
    }
  },
  data: function () {
    return {
      selectCtrDataUrl: '',
      // 表格中传出id数据的key
      queryCode: 'contNo',
      // 表格中显示到input框中的字段key
      textCode: 'contNo',
      codeToText: false
    };
  },
  created: function () {
    var _this = this;
    yufp.extend(_this.baseParams, _this.param);
    // 01最高额授信协议，02普通贷款，03贴现协议，04贸易融资，05福费廷，06开证，07银承，08保函，09委托贷款
    if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '01' || _this.baseParams.condition.bizType == '01')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrhighamtagrcont/selectbyquerymodel';
    } else if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '02' || _this.baseParams.condition.bizType == '02')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrloancont/selectbyquerymodel';
    } else if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '03' || _this.baseParams.condition.bizType == '03')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrdisccont/selectbyquerymodel';
    } else if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '04' || _this.baseParams.condition.bizType == '04')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrloancont/selectbyquerymodel';
    } else if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '05' || _this.baseParams.condition.bizType == '05')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrloancont/selectbyquerymodel';
    } else if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '06' || _this.baseParams.condition.bizType == '06')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrtfloccont/selectbyquerymodel';
    } else if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '07' || _this.baseParams.condition.bizType == '07')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctraccpcont/selectbyquerymodel';
    } else if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '08' || _this.baseParams.condition.bizType == '08')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrcvrgcont/selectbyquerymodel';
    } else if (_this.baseParams.condition && (_this.baseParams.condition.busiType == '09' || _this.baseParams.condition.bizType == '09')) {
      this.selectCtrDataUrl = backend.cmisBiz + '/api/ctrentrustloancont/selectbyquerymodel';
    }
  },
  watch: {
    param: function (val) {
      var _this = this;
      if (val) {
        yufp.extend(_this.baseParams, val);
      }
    }
  }
};
</script>
