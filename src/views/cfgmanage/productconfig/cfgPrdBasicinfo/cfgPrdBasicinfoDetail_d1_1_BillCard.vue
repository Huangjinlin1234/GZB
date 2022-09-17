<template>
  <div id="d1_1_BillCard">
    <div id="d1_1_BillCardContent">
      <yu-xform ref="refForm" label-width="150px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="产品基本信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required"></yu-xform-item>
            <yu-xform-item label="目录编码" ctype="yu-xprd-catalog" name="catalogId" rules="required" placeholder="目录编码" @select-fn="commonSelectFn" :mapping="{ label: 'catalogName', id: 'catalogId', path: 'catalogLevelName' }" width="480" height="480"></yu-xform-item>
            <yu-xform-item label="目录名称" ctype="input" placeholder="目录名称" name="catalogName"></yu-xform-item>
            <yu-xform-item label="目录层级"  ctype="textarea" :autosize="{ minRows:1, maxRows:12}" name="catalogLevelName" rules="required" disabled placeholder="目录层级"></yu-xform-item>
            <yu-xform-item label="产品版本号" ctype="input" placeholder="产品版本号" name="prdVersion" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="产品状态" ctype="select" name="prdStatus" rules="required" data-code="DATA_STS" placeholder="产品状态"></yu-xform-item>
            <yu-xform-item label="生效日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="生效日期" hidden></yu-xform-item>
            <yu-xform-item label="失效日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="失效日期" hidden></yu-xform-item>
            <yu-xform-item label="产品描述" ctype="textarea" name="prdDescribe" placeholder="产品描述" :colspan="24"></yu-xform-item>
            <yu-xform-item label="是否基础产品" ctype="radio" name="isBasicPrd" rules="required" data-code="STD_ZB_YES_NO" hidden placeholder="是否基础产品"></yu-xform-item>
            <yu-xform-item label="基础产品编号" ctype="yu-xproduct" name="basicPrdId" placeholder="基础产品编号"  hidden @select-fn="commonSelectFn" :mapping="{ prdId: 'basicPrdId', wfiSignId: 'wfiSignId', disbWay: 'disbWay', modelGroupNo: 'modelGroupNo', instuCde: 'instuCde', planId: 'planId' }" width="720" height="480" :parms="{ isBasicPrd: 'y' }"></yu-xform-item>
            <yu-xform-item label="所属法人机构"  name="instuCde" rules="required" placeholder="所属法人机构" icon="search" @click.native="selectFn"></yu-xform-item>  <!--:parms="{ instuSts: 'a' }"   ctype="YuXfinaceOrg" -->
            <yu-xform-item label="所属法人机构名称" ctype="input" placeholder="所属法人机构名称" name="instuName" disabled></yu-xform-item>
            <yu-xform-item label="排序" ctype="yu-num" name="serialNumber" placeholder="排序" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="核心产品编号" ctype="select" placeholder="核心产品编号" name="corePrdId" disabled></yu-xform-item>
            <yu-xform-item label="提前还款截止日期" ctype="datepicker" placeholder="提前还款截止日期" :colspan="24" value-format="yyyy-MM-dd" name="advRepayEndDate"></yu-xform-item>
            <yu-xform-item label="适用币种" ctype="select" value-type="string" separator=";" multiple placeholder="适用币种" :colspan="24" name="suitCurType" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
            <yu-xform-item label="适用调查报告类型" ctype="checkbox" value-type="string" separator=";" style="vertical-align:middle;margin-top: -3px;margin-bottom: 0px" placeholder="适用调查报告类型" name="suitIndgtReportType" data-code="STD_RPT_TYPE"></yu-xform-item>
            <yu-xform-item label="适用合同类型" ctype="checkbox" value-type="string" separator=";" placeholder="适用合同类型" name="suitContType" data-code="STD_CONT_TYPE" @change="ffn"></yu-xform-item>
            <yu-xform-item label="适用担保方式" ctype="checkbox" value-type="string" separator=";" placeholder="适用担保方式" name="suitGuarMode" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            <yu-xform-item label="适用支付方式" ctype="checkbox" value-type="string" separator=";"  placeholder="适用支付方式" name="suitPayMode" data-code="STD_RAY_MODE"></yu-xform-item>
            <yu-xform-item label="适用还款方式" ctype="checkbox" value-type="string" separator=";" placeholder="适用还款方式" name="suitRepayMode" data-code="STD_REPAY_MODE" ></yu-xform-item>
            <yu-xform-item label="是否需要线下调查" ctype="radio" placeholder="是否需要线下调查" name="isStopOffline" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="是否允许展期" ctype="radio" placeholder="是否允许展期" name="isAllowExt" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="是否允许线上签约" ctype="radio" placeholder="是否允许线上签约" name="isAllowSignOnline" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="是否允许线上放款" ctype="radio" placeholder="是否允许线上放款" name="isAllowDisbOnline" data-code="STD_ZB_YES_NO"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <!--  <yu-panel title="适用币种" panel-type="normal">
            <yu-xform-group :column="1">
            <yu-xform-item label="适用币种"  name="suitCurType" rules="required" placeholder="适用币种" data-code="STD_ZB_CUR_TYP" icon="input" @click.native="selectFn1"></yu-xform-item>     ctype="YuXfinaceOrg"
            <yu-xform-item label="适用币种" ctype="select" multiple placeholder="适用币种" name="suitCurType" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          </yu-xform-group>
           </yu-panel> -->
        <yu-panel title="产品配置信息" panel-type="normal">
          <yu-xform-group :column="2">
          <!--  <yu-xform-item label="产品入口作业流编号" ctype="yu-xflow-define" name="wfiSignId" rules="required" placeholder="产品入口作业流编号" @select-fn="commonSelectFn" :mapping="{ flowId: 'wfiSignId', flowName: 'flowName' }" width="680" height="480"></yu-xform-item>-->
            <yu-xform-item label="产品入口作业流编号" icon="search" @click.native="selectFn1" name="wfiSignId" rules="required" placeholder="产品入口作业流编号"  ></yu-xform-item>
            <yu-xform-item label="产品入口作业流名称" ctype="input" placeholder="产品入口作业流名称" name="flowName" disabled></yu-xform-item>
          <!-- <yu-xform-item label="业务规则方案编号" ctype="yu-xbins-rule1" name="planId" rules="required" placeholder="业务规则方案编号" @select-fn="commonSelectFn" :mapping="{ planName: 'planName', planId: 'planId' }"></yu-xform-item>-->
            <yu-xform-item label="业务规则方案编号" icon="search" @click.native="selectFn2" name="planId" rules="required" placeholder="业务规则方案编号" ></yu-xform-item>
            <yu-xform-item label="业务规则方案名称" ctype="input" placeholder="业务规则方案名称" name="planName" disabled></yu-xform-item>
          <!--<yu-xform-item label="产品模版组编号" ctype="yu-xmodel-factory" name="modelGroupNo" rules="required" placeholder="产品模版组编号" @select-fn="commonSelectFn" :mapping="{ modelGroupName: 'modelGroupName', modelGroupNo: 'modelGroupNo' }"></yu-xform-item>-->
            <yu-xform-item label="产品模版组编号" icon="search" @click.native="selectFn3" name="modelGroupNo" rules="required" placeholder="产品模版组编号"></yu-xform-item>
            <yu-xform-item label="产品模板组名称" ctype="input" placeholder="产品模板组名称" name="modelGroupName" disabled></yu-xform-item>
            <yu-xform-item label="放款方式" ctype="select" name="disbWay" rules="required" data-code="STD_CARD_SEND_MODE" placeholder="放款方式"></yu-xform-item>
            <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人名称" ctype="input" placeholder="登记人名称" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构名称" ctype="input" placeholder="登记机构名称" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
     </yu-xform>

    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="saveFlag && cancelFlag" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" v-if="!saveFlag && cancelFlag" @click="customClick('onInsert')">确定复制</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>


     <yu-xdialog :visible.sync="visiable"  title="法人机构">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="法人机构代码" ctype="input" placeholder="法人机构代码" name="instuCde"></yu-xform-item>
            <yu-xform-item label="法人机构名称" ctype="input" placeholder="法人机构名称" name="instuName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" :row-number="true" request-type="POST" selection-type="radio" :pageable="true" @loaded="dataFn" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="法人机构代码" prop="instuCde"></yu-xtable-column>
          <yu-xtable-column label="法人机构名称" prop="instuName"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>

     <yu-xdialog :visible.sync="visiable1" :width="width" title="流程定义">
        <yu-xform form-type="search" v-model="searchFormdata1" label-width="90px" related-table-name="refTable1">
          <yu-xform-group :column="3">
            <yu-xform-item label="流程编号" ctype="input" placeholder="流程编号" name="flowCode" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="流程名称" ctype="input" placeholder="流程名称" name="flowName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="流程ID" ctype="input" placeholder="流程ID" name="flowId" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable1" :row-number="true" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl1" :default-load="true" :base-params="baseParams1">
          <yu-xtable-column label="流程编号" prop="flowCode"></yu-xtable-column>
          <yu-xtable-column label="流程名称" prop="flowName"></yu-xtable-column>
          <yu-xtable-column label="流程ID" prop="flowId"></yu-xtable-column>
          <yu-xtable-column label="流程标识" prop="flowSign"></yu-xtable-column>
          <yu-xtable-column label="流程图状态" prop="flowState" data-code="WF_FLOW_STATE"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn1" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>


    <yu-xdialog :visible.sync="visiable2" :width="width" title="业务规则方案">
        <yu-xform form-type="search" v-model="searchFormdata2" label-width="60px" related-table-name="refTable2">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务规则方案编号" ctype="input" placeholder="业务规则方案编号" name="planId"></yu-xform-item>
            <yu-xform-item label="业务规则方案名称" ctype="input" placeholder="业务规则方案名称" name="planName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable2" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl2" :default-load="true" condition-key="condition" :base-params="baseParams2">
          <yu-xtable-column label="业务规则方案编号" prop="planId"></yu-xtable-column>
          <yu-xtable-column label="业务规则方案名称" prop="planName"></yu-xtable-column>
          <yu-xtable-column label="方案分类" prop="planType" data-code="STD_ZB_PLAN_TYPE"></yu-xtable-column>
          <yu-xtable-column label="拦截类型" prop="notiType" data-code="STD_ZB_NOTI_TYPE"></yu-xtable-column>
          <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="是否适用流程" prop="usedFlow" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="是否自动规则" prop="usedAuto" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn2" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>


     <yu-xdialog :visible.sync="visiable3" :width="width" title="模板工厂">
        <yu-xform form-type="search" v-model="searchFormdata3" label-width="60px" related-table-name="refTable3">
          <yu-xform-group :column="3">
            <yu-xform-item label="模版组编号" ctype="input" placeholder="模版组编号" name="modelGroupNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="模板组名称" ctype="input" placeholder="模板组名称" name="modelGroupName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable3" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl3" :default-load="true" condition-key="condition" :base-params="baseParams3">
          <yu-xtable-column label="模版组编号" prop="modelGroupNo"></yu-xtable-column>
          <yu-xtable-column label="模板组名称" prop="modelGroupName"></yu-xtable-column>
          <yu-xtable-column label="模板显示方式" prop="showMode" data-code="STD_ZB_SHOW_MODE"></yu-xtable-column>
          <yu-xtable-column label="版本号" prop="ver"></yu-xtable-column>
          <yu-xtable-column label="业务规则方案编号" prop="planId"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn3" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';

export default {
  name: 'D11BillCard',
  mixins: [mixinForm],
  props: { saveFlag: Boolean, cancelFlag: Boolean },
  data: function () {
    return {
      baseParams: '',
      baseParams1: '',
      baseParams2: '',
      baseParams3: '',
      visiable: false,
      visiable1: false,
      visiable2: false,
      visiable3: false,
      searchFormdata: {},
      searchFormdata1: {},
      searchFormdata2: {},
      searchFormdata3: {},
      dataUrl: backend.cmisCfg + '/api/cfgprdbasicinfo/selectbymodel',
      dataUrl1: backend.appOcaService + '/api/nwfflow/',
      dataUrl2: backend.cmisCfg + '/api/cfgbizruleplan/',
      dataUrl3: backend.cmisCfg + '/api/cfgmodelgroup/',
      // dataUrlBZ: backend.appOcaService + '/api/adminsmlookupdict/selectbyBiZhong',
      updateUrl: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.$lookup.reg('DATA_STS', 'STD_RAY_MODE', 'STD_REPAY_MODE', 'STD_ZB_YES_NO', 'STD_ZB_PUTOUT_TYP', 'STD_CARD_SEND_MODE', 'STD_ZB_OPR_TYPE', 'STD_ZB_APPLY_RANGE', 'STD_ZB_APPLY_TYP', 'STD_ZB_CHNL_SOUR', 'STD_ZB_FILE_TYPE');

    // this.execBillCardDefaultValueFormula();
  },
  methods: {
    ffn (val) {
      // console.log('res', val);
    },
    confirmFn () {
      this.formdata.instuCde = this.$refs.refTable.selections[0].instuCde;
      this.formdata.instuName = this.$refs.refTable.selections[0].instuCde;
      this.visiable = false;
    },
    confirmFn1 () {
    //  this.searchBiZhong.lookupItemName = this.$refs.refTable.selections[0].lookupItemName;
      this.formdata.wfiSignId = this.$refs.refTable1.selections[0].flowCode;
      this.formdata.flowName = this.$refs.refTable1.selections[0].flowName;
      this.visiable1 = false;
    },
    confirmFn2 () {
    //  this.searchBiZhong.lookupItemName = this.$refs.refTable.selections[0].lookupItemName;
      this.formdata.planId = this.$refs.refTable2.selections[0].planId;
      this.formdata.planName = this.$refs.refTable2.selections[0].planName;
      this.visiable2 = false;
    },
    confirmFn3 () {
    //  this.searchBiZhong.lookupItemName = this.$refs.refTable.selections[0].lookupItemName;
      this.formdata.modelGroupNo = this.$refs.refTable3.selections[0].modelGroupNo;
      this.formdata.modelGroupName = this.$refs.refTable3.selections[0].modelGroupName;
      this.visiable3 = false;
    },
    clearFn () {
      this.visiable = false;
      this.visiable1 = false;
      this.visiable2 = false;
      this.visiable3 = false;
    },
    selectFn () {
      this.visiable = true;
    },
    selectFn1 () {
      this.visiable1 = true;
    },
    selectFn2 () {
      this.visiable2 = true;
    },
    selectFn3 () {
      this.visiable3 = true;
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.prdId = this.$xutils.getDefaultformulaData('SEQ:PRD_ID');
      this.formdata.inputName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updName = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    }
  }
};
</script>
