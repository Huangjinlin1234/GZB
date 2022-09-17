<template>
  <div>
    <yu-panel title="抵质押物共有人信息" :hideFilter="false" :collapseHide="false">
      <yu-form-buttons align="left">
          <yu-button ref="btn_add" @click="customClick('add')" :hidden="isView">新增</yu-button>
          <yu-button ref="btn_$delete" @click="customClick('deletebypkid')" :hidden="isView">删除</yu-button>
      </yu-form-buttons>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :default-load="false" request-type="POST" :data-url="ownerDataUrl" :baseParams="baseParams">
        <yu-xtable-column label="主键" prop="pkId" width="150" hide-column></yu-xtable-column>
         <yu-xtable-column label="调查编号" prop="surveySerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="抵质押物编号" prop="pldimnNo" hide-column></yu-xtable-column>
        <yu-xtable-column label="共有人客户编号" prop="commenOwnerCusId"></yu-xtable-column>
        <yu-xtable-column label="共有人姓名" prop="commenOwnerName"></yu-xtable-column>
        <yu-xtable-column label="共有人证件号码" prop="commenOwnerCertCode"></yu-xtable-column>l
      </yu-xtable>
    </yu-panel>
    <div v-if="hiddenFlg">
    <yu-panel title="勘验信息列表" :hide-filter="false" :collapse-hide="false">
      <yu-form-buttons align="left">
          <yu-button ref="btn_add" @click="selectInspect" :hidden="isView">关联勘验信息</yu-button>
          <yu-button  @click="customClick('deleteInspect')" :hidden="isView">删除</yu-button>
      </yu-form-buttons>
      <yu-xtable ref="refInspectTable" row-number selection-type="radio"  :pageable="true" :data-url="inspectDataUrl" condition-key="condition" request-type="POST" :base-params="inspectData" :v-model="selectData">
        <yu-xtable-column label="勘验流水号" prop="inspectSerno" width="150"></yu-xtable-column>
        <yu-xtable-column label="勘验人" prop="inspector"></yu-xtable-column>
        <yu-xtable-column label="勘验人证件类型" prop="inspectorCertType"></yu-xtable-column>
        <yu-xtable-column label="勘验人证件号码" prop="inspectorCertCode" width="150"></yu-xtable-column>
        <yu-xtable-column label="视频流水号" prop="videoSerno"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" width="150"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </div>
    <yu-dialog title="勘验信息选取" :visible.sync="dialogTableVisible" :min-height="800" center="true">
          <yu-xform v-model="searchFormdata3" related-table-name="refTable3" form-type="search"  :remove-empty="true">
            <yu-xform-group :column="3">
              <yu-xform-item placeholder="勘验流水号" ctype="input" label="勘验流水号" name="inspectSerno" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="勘验人" ctype="input" label="勘验人" name="inspector" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="勘验人证件号码" ctype="input" label="勘验人证件号码" name="inspectorCertCode" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable index selection-type="radio" ref="refTable3" request-type="POST" row-number :data-url="selectDataUrl" condition-key="condition" :base-params="searchFormdata3" >
            <yu-xtable-column label="勘验流水号" prop="inspectSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验人" prop="inspector" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验人证件类型" prop="inspectorCertType"></yu-xtable-column>
            <yu-xtable-column label="勘验人证件号码" prop="inspectorCertCode"></yu-xtable-column>
            <yu-xtable-column label="云评估编号" prop="cloudEvalNo"></yu-xtable-column>
            <yu-xtable-column label="抵押物所有人" prop="pawnOwner"></yu-xtable-column>
            <yu-xtable-column label="小区名称" prop="buildingName" width="120"></yu-xtable-column>
            <yu-xtable-column label="勘验状态" prop="inspectStatus" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="最后修改人" prop="updId" width="120" v-if="show"></yu-xtable-column>
            <yu-xtable-column label="最后修改机构" prop="updBrId" width="120" v-if="show"></yu-xtable-column>
            <yu-xtable-column label="最后修改日期" prop="updDate" v-if="show"></yu-xtable-column>
          </yu-xtable>
       <div class="button-group" style="text-align:center">
        <yu-button type="primary" @click="customClick('selectReturnData')">选取</yu-button>
       </div>
    </yu-dialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      ownerDataUrl: this.$backend.cmisBiz + '/api/lmtguarecommenownerinfo/selectbypldimnno',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtguarecommenownerinfo/delete/',
      inspectData: {},
      hiddenFlg: false,
      inspectDataUrl: this.$backend.cmisBiz + '/api/lmtinspectinfo/selectbymodelxw',
      selectDataUrl: backend.cmisBiz + '/api/lmtinspectinfo/selectbyloginid',
      dialogTableVisible: false,
      selectData: [],
      isView: true
    };
  },
  methods: {
    selectInspect () {
      this.dialogTableVisible = true;
    }
  }
};
</script>
