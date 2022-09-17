
<template>
  
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="基本信息" name="base">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm1" label-width="120px" v-model="formdata1" >
            <yu-xform-group>
              <yu-xform-item label="业务流水号" name="papaiSerno" disabled ></yu-xform-item>
              <yu-xform-item label="资产处置方式" ctype="select" name="dispMode" data-code="STD_DISP_MODE" rules="required"></yu-xform-item>
              <yu-xform-item label="抵债资产编号" name="pldimnNo" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="抵债资产名称" name="pldimnName" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="资产管理人" name="managerId" rules="required" ctype="YufpZrcSelector" :params="managerParms"  @select-fn="selectManager"></yu-xform-item>
              <yu-xform-item label="管理机构" name="managerBrId" rules="required" ctype="YufpZrcSelector" :params="managerBrParms"  @select-fn="selectManagerBr"></yu-xform-item>
              <yu-xform-item label="处置报告" name="dispReport" ctype="textarea" :colspan="24" rules="required"></yu-xform-item>
              <yu-xform-item label="备注" name="memo" ctype="textarea" :colspan="24"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputIdName" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrIdName" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" disabled ></yu-xform-item>
            </yu-xform-group>
            </yu-xform>
           <div style="text-align:center">
                <yu-button type="primary" @click="commit" :hidden="isHidden">提交</yu-button>
                <yu-button type="primary" @click="doSave1" :hidden="isHidden">保存</yu-button>
                <yu-button type="primary" @click="doBack">返回</yu-button>
            </div>
        </yu-panel>
      </yu-tab-pane>

      <yu-tab-pane label="出租信息" name="second">
        <yu-panel title="抵债处置出租信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm2" label-width="140px" v-model="formdata2" >
            <yu-xform-group>
              <yu-xform-item label="业务流水号" name="papaiSerno" disabled ></yu-xform-item>
              <yu-xform-item label="抵债处置业务流水号" name="papaiSerno" hidden></yu-xform-item>
              <yu-xform-item label="抵债资产编号" name="pldimnNo" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="抵债资产名称" name="pldimnName" disabled></yu-xform-item>
              <yu-xform-item label="抵债物类型" name="pldimnType"  disabled ctype="select" data-code="STD_RESIST_DEBT_TYPE"></yu-xform-item>
              <yu-xform-item label="租金" name="rent" disabled></yu-xform-item>
              <yu-xform-item label="首付租金" name="firstpayRent" rules="required" ></yu-xform-item>
              <yu-xform-item label="承租人名称" name="lesseeName" rules="required" ></yu-xform-item>
              <yu-xform-item label="承租人电话" name="lesseePhone"   rules="required"></yu-xform-item>
              <yu-xform-item label="承租人证件类型" name="certType" ctype="select" data-code="IDENT_TYPE"></yu-xform-item>
              <yu-xform-item label="承租人证件号码" name="certCode" rules="required"></yu-xform-item>
              <yu-xform-item label="承租人地址" name="lesseeAddr"  ctype="textarea" :colspan="24"></yu-xform-item>
              <yu-xform-item label="起始日期"  name="startDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="到期日期" name="endDate"  ctype="datepicker" ></yu-xform-item>
              <yu-xform-item label="备注" name="memo"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId"></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate"  ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId"  ></yu-xform-item>
            </yu-xform-group>
            </yu-xform>
        </yu-panel>
        <yu-panel title="租金收取情况" :hideFilter="false" :collapseHide="false"  >
          <yu-button-drop>
            <yu-button type="primary" @click="doAdd22" :hidden="isHidden">新增</yu-button>
            <yu-button type="primary" @click="doDel22" :hidden="isHidden">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" condition-key="condition" style="margin-top: 10px" row-number :data-url="dataUrl" :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams" >
            <yu-xtable-column align="center" ctype="datepicker" label="收取时间" prop="leaseCollecDate" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column align="center" ctype="select" label="收取方式" prop="leaseCollecMode" data-code="STD_PARAMS_CODE" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column align="center" ctype="yu-num" label="收取金额" prop="leaseAmt" :disabled="viewType == 'DETAIL'" maxlength="14" number-formatter="0,000.00"></yu-xtable-column>
            <yu-xtable-column align="center"  label="租金缴纳人名称" prop="cusName" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column align="center"  label="收款账号" prop="pyeeAccno" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column align="center"  label="备注" prop="memo" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
          </yu-xtable>
          <div style="text-align:center;margin:10px">
            <yu-button type="primary" @click="doSave2" :hidden="isHidden">保存</yu-button>
            <yu-button type="primary" @click="doBack">返回</yu-button>
          </div>
        </yu-panel>
      </yu-tab-pane>


      <yu-tab-pane label="转固信息" name="third" >
        <yu-panel title="抵债处置转固信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm3" label-width="140px" v-model="formdata3" style="text-align: center" >
            <yu-xform-group>
              <yu-xform-item label="业务流水号"      name="pappciSerno"   disabled   rules="required" ></yu-xform-item>
              <yu-xform-item label="抵债处置业务流水号"  name="papaiSerno" hidden></yu-xform-item>
              <yu-xform-item label="抵债资产编号"      name="pldimnNo"   disabled   rules="required" ></yu-xform-item>
              <yu-xform-item label="抵债资产名称 "      name="pldimnName"   rules="required" ></yu-xform-item>
              <yu-xform-item label="抵债物类型"   name="pldimnType"    ctype="select"  data-code="STD_RESIST_DEBT_TYPE" ></yu-xform-item>
              <yu-xform-item label="转入价值（元）"   ctype="yu-num"  name="turnValue"   rules="required" maxlength="14" number-formatter="0,000.00" ></yu-xform-item>
              <yu-xform-item label="评估金额（元）"   ctype="yu-num"  name="evalAmt"   rules="required" maxlength="14" number-formatter="0,000.00"></yu-xform-item>
              <yu-xform-item label="入账日期"   ctype="datepicker"   name="asgnDate"   rules="required" ></yu-xform-item>
              <yu-xform-item label="处置理由："   name="dispResn"   ctype="textarea"   :colspan="24" ></yu-xform-item>
              <yu-xform-item label="备注"   name="memo"   ctype="textarea"   :colspan="24" ></yu-xform-item>
              <yu-xform-item label="登记人"   name="inputId"      disabled   rules="required" ></yu-xform-item>
              <yu-xform-item label="登记机构"   name="inputBrId"      disabled   rules="required" ></yu-xform-item>
              <yu-xform-item label="登记日期"   name="inputDate"      disabled   rules="required" ></yu-xform-item>
              <yu-button-drop :colspan="24">
                <yu-button type="primary" @click="doSave3" :hidden="isHidden">保存</yu-button>
                <yu-button type="primary" @click="doBack">返回</yu-button>
              </yu-button-drop>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="出售信息" name="forth" >
        <yu-panel title="抵债处置出售信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm4" label-width="140px" v-model="formdata4" style="text-align: center" >
            <yu-xform-group>
              <yu-xform-item label="业务流水号"  name="papsiSerno" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="抵债处置业务流水号"  name="papaiSerno" hidden></yu-xform-item>
              <yu-xform-item label="抵债资产编号"  name="pldimnNo" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="抵债资产名称 "  name="pldimnName" disabled></yu-xform-item>
              <yu-xform-item label="抵债资产类型" name="pldimnType" ctype="select" data-code="STD_RESIST_DEBT_TYPE" ></yu-xform-item>
              <yu-xform-item label="数量 "  name="cusId" rules="required"></yu-xform-item>
              <yu-xform-item label="抵入金额（元）" name="toEnterAmt" rules="required" ></yu-xform-item>
              <yu-xform-item label=" 评估金额(元)" name="evalAmt" rules="required" ></yu-xform-item>
              <yu-xform-item label=" 出售价格（元）" name="sellAmt" rules="required" ></yu-xform-item>
              <yu-xform-item label=" 出售日期" ctype="datepicker" name="sellDate" rules="required" ></yu-xform-item>
              <yu-xform-item label=" 买受人名称"  name="buyerName"></yu-xform-item>
              <yu-xform-item label="备注" name="memo" ctype="textarea" :colspan="24" ></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId"  disabled rules="required" ></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId"  disabled rules="required" ></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate"  disabled ></yu-xform-item>
              <yu-button-drop :colspan="24">
                <yu-button type="primary" @click="doSave4" :hidden="isHidden">保存</yu-button>
                <yu-button type="primary" @click="doBack">返回</yu-button>
              </yu-button-drop>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-tab-pane>

      <yu-tab-pane label="毁损/灭失信息" name="fifth" >
         <yu-panel title="抵债处置毁损/灭失信息" :hideFilter="false" :collapseHide="false">
           <yu-xform ref="refForm5" label-width="140px" v-model="formdata5" style="text-align: center" >
             <yu-xform-group>
               <yu-xform-item label="业务流水号" ctype="input" name="pappmliSerno" disabled rules="required" ></yu-xform-item>
               <yu-xform-item label="抵债处置业务流水号" ctype="input" name="papaiSerno" hidden></yu-xform-item>
               <yu-xform-item label="抵债资产编号" ctype="input" name="pldimnNo" disabled rules="required" ></yu-xform-item>
               <yu-xform-item label="抵债资产名称 " ctype="input" name="pldimnName" disabled rules="required"></yu-xform-item>
               <yu-xform-item label="抵债资产类型" name="pldimnType" ctype="select" data-code="STD_RESIST_DEBT_TYPE" ></yu-xform-item>
               <yu-xform-item label="抵债资产现状" name="pldimnAssetStatus" ctype="select" data-code="STD_PLDIMN_ASSET_STATUS" ></yu-xform-item>
               <yu-xform-item label="情况描述" ctype="textarea" name="caseDec" :colspan="24" ></yu-xform-item>
               <yu-xform-item label="核销金额（元）" name="writeoffAmt" rules="required" ctype="yu-num" maxlength="14" number-formatter="0,000.00"></yu-xform-item>
               <yu-xform-item label="核销日期" ctype="datepicker" name="writeoffDate" rules="required" ></yu-xform-item>
               <yu-xform-item label="核销理由" name="writeoffResn" ctype="textarea" :colspan="24" ></yu-xform-item>
               <yu-xform-item label="备注" name="memo" ctype="textarea" :colspan="24" ></yu-xform-item>
               <yu-xform-item label="登记人" name="inputId" ctype="input" disabled rules="required" ></yu-xform-item>
               <yu-xform-item label="登记机构" name="inputBrId" ctype="input" disabled rules="required" ></yu-xform-item>
               <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled rules="required" ></yu-xform-item>
               <yu-button-drop :colspan="24">
                 <yu-button type="primary" @click="doSave5" :hidden="isHidden">保存</yu-button>
                 <yu-button type="primary" @click="doBack">返回</yu-button>
               </yu-button-drop>
             </yu-xform-group>
           </yu-xform>
         </yu-panel>
       </yu-tab-pane>

       <yu-tab-pane label="影像资料" name="sixth">
          
      </yu-tab-pane>

      <yu-tab-pane label="审批历史信息" name="seventh" :disabled="viewType !== 'DETAIL'" >
      </yu-tab-pane>
    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="doBack"></yufpNwfInit>
  </div>
</template>
<script>

// 注册字典项
export default {
  data: function () {
    return {
     papaiSerno:'',
     activeName:"base",
     formdata1:{},
     formdata2:{},
     formdata3:{},
     formdata4:{},
     formdata5:{},
     baseParams: {condition: JSON.stringify({ papaiSerno: this.$route.meta.params.papaiSerno})},
     isHidden:false,
     managerParms: {
       title: '选择资产管理人',
       queryFields: [{ placeholder: '资产管理人', field: 'managerId', type: 'input', fuzzyQuery: 'both'}, {placeholder: '资产管理人名称', field: 'managerIdName', type: 'input', fuzzyQuery: 'both'}],
       dataUrl: '',
       tableColumns: [{ label: '资产管理人', prop: 'managerId'}, { label: '资产管理人名称', prop: 'managerIdName'}
       ]
     },
     managerBrParms: {
       title: '选择管理机构',
       queryFields: [{ placeholder: '管理机构', field: 'managerBrId', type: 'input', fuzzyQuery: 'both'}, {placeholder: '管理机构名称', field: 'managerBrIdName', type: 'input', fuzzyQuery: 'both'}],
       dataUrl: '',
       tableColumns: [{ label: '管理机构', prop: 'managerBrId' }, { label: '管理机构名称', prop: 'managerBrIdName' }
       ]
     },
     dataUrl: backend.cmisNpam + '/api/plaassetpldleaseamtinfo/queryamtinfo',
     viewType:''
    }
  },

  created () {
    var _this = this;
    _this.papaiSerno = _this.$route.meta.params.papaiSerno;
    _this.viewType = _this.$route.meta.params.viewType;
    // 基本信息
    yufp.service.request({
      method: 'POST',
      async: false,
      url: backend.cmisNpam + '/api/plaassetpldappinfo/' + _this.papaiSerno,
      callback: function (code, message, response){
        if (response.code == 0){
          _this.$nextTick(function (){
            yufp.clone(response.data, _this.formdata1);
            let pldimnNo = _this.formdata1.pldimnNo;//抵债资产编号
            _this.formdata2.pldimnNo = pldimnNo;
            _this.formdata3.pldimnNo = pldimnNo;
            _this.formdata4.pldimnNo = pldimnNo;
            _this.formdata5.pldimnNo = pldimnNo;

            _this.formdata2.papaiSerno = _this.papaiSerno;//业务流水号
            _this.formdata3.papaiSerno = _this.papaiSerno;
            _this.formdata4.papaiSerno = _this.papaiSerno;
            _this.formdata5.papaiSerno = _this.papaiSerno;

          })
        } 
      }
    })
  },
  
  methods: {
   selectManager(arr){
      this.formdata1.manangerId = arr[0].manangerId;
      this.formdata1.manangerIdName = arr[0].manangerIdName;
   },
   selectManagerBr(arr){
      this.formdata1.manangerBrId = arr[0].manangerBrId;
      this.formdata1.manangerBrIdName = arr[0].manangerBrIdName;
   },
   commit(){
     
   },
   doSave1(){

   },
   doSave2(){

   },
   doSave3(){

   },
   doSave4(){

   },
   doSave5(){

   },
   doBack(){
     
   },
   doAdd22(){

   },
   doDel22(){

   }

  },

}
</script>