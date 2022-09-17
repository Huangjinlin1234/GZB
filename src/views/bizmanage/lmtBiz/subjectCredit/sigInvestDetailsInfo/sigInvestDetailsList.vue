
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
        <yu-panel title="底层资产清单(大额风险暴露)" panel-type="simple">
          <yu-xform ref="refForm" label-width="180px" v-model="formdata">
            <yu-xform-group :colunm="1">
              <yu-xform-item label="流水号" disabled ctype="input" name="pkId" colspan="8"></yu-xform-item>
            </yu-xform-group>
              <yu-xform-group :colunm="1">
              <yu-xform-item label="项目编号" disabled ctype="input" name="proNo" colspan="10"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="custom" colspan="2"> <yu-button type="primary" v-show="btnShow" @click="selectProNo" >选取</yu-button></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="1">
              <yu-xform-item label="项目名称" disabled ctype="input" name="proName"></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="1">
              <yu-xform-item label="资产编号" disabled ctype="input" name="assetNo" colspan="10"></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="2">
              <yu-xform-item label="项目当前总市值" :disabled="infoDisabled"  ctype="yu-num" name="proCurtMarketValue"></yu-xform-item>
              <yu-xform-item label="底层资产编号" :disabled="infoDisabled" ctype="input" name="basicAssetNo"></yu-xform-item>
              <yu-xform-item label="我行投资当前市值" :disabled="infoDisabled" ctype="yu-num" name="investCurtMarketValue"></yu-xform-item>
              <yu-xform-item label="底层资产名称" :disabled="infoDisabled" ctype="input" name="basicAssetName"></yu-xform-item>
              <yu-xform-item label="底层资产类型" :disabled="infoDisabled" ctype="select" name="basicAssetType" data-code="STD_ZB_BOTT_TYPE"></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="1">
              <yu-xform-item label="底层资产客户编号" disabled ctype="input" name="basicAssetCusId" colspan="10"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="custom" colspan="2"> <yu-button type="primary" v-show="btnShow" @click="selectCusId" >选取</yu-button></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="1">
              <yu-xform-item label="底层资产客户名称" disabled ctype="input" name="basicAssetCusName" ></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="2">
              <yu-xform-item label="底层资产持仓占比" :disabled="infoDisabled" ctype="yu-num" name="basicAssetPostScale" ></yu-xform-item>
              <yu-xform-item label="是否为合格担保" :disabled="infoDisabled" ctype="select" name="isValidGuar" data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="底层增信担保方式" :disabled="infoDisabled" ctype="select" name="basicAssetGuarMode" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="1">
              <yu-xform-item label="底层资产增信人客户编号" disabled ctype="input" name="basicAssetGuarCusId" colspan="10"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="custom" colspan="2"> <yu-button type="primary"  v-show="btnShow" @click="selectGuarCusId">选取</yu-button></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="1">
              <yu-xform-item label="底层资产增信人客户名称" disabled ctype="input" name="basicAssetGuarCusName"></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :colunm="2">
              <yu-xform-item label="底层资产增信人担保金额" :disabled="infoDisabled" ctype="yu-num" name="basicAssetGuarAmt"></yu-xform-item>
              <yu-xform-item label="登记人" disabled ctype="input" name="managerIdName"></yu-xform-item>
              <yu-xform-item label="登记机构" disabled ctype="input" name="managerBrIdName"></yu-xform-item>
              <yu-xform-item label="登记时间" disabled ctype="datepicker" name="inputDate"></yu-xform-item>
             </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="docommit" v-show="saveBtnShow">保存</yu-button>
          <yu-button type="primary" @click="goBack">返回</yu-button>
        </yu-form-buttons>
      
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

yufp.lookup.reg('STD_ZB_BOTT_TYPE,STD_ZB_YES_NO,STD_ZB_GUAR_WAY');
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      infoDisabled: false,
      btnShow: false,
      saveBtnShow: true
    };
  },
  mounted () {
    var _this = this;
    _this.data = this.$route.params.formdata;
    var op = this.$route.params.viewType;
    var type = this.$route.params.type;
    if (op == 'DETAIL') {
      _this.saveBtnShow = false;
      _this.infoDisabled = true;
    }
    if (op == 'ADD'){
      _this.btnShow = true;
      yufp.clone(_this.data, _this.formdata); 
    }else{
    _this.init();
    }
    if(type != undefined && type != ''){
      _this.btnShow = false;
    }
  },
  methods: {
    init: function(){
      var _this = this;
      var pkId = _this.data.pkId
       yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/siginvestdetailsinfo/selectByPkId",
        data: JSON.stringify({pkId: pkId}),
        callback: function (code, message, response) {
            if (code == 0) {
              // 反显字段
              yufp.clone(response.data, _this.formdata); 
              return;
          }else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        }
    });
    
  },
  docommit: function(){
    var _this = this;
    var validate = false;
     _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
       if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/siginvestdetailsinfo/updateSigInvestDetail",
        data: _this.formdata,
        callback: function(code, message, response){
            if(response.data > 0){
              _this.$message("操作成功");
            }else{
                 _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
            }
        }
      });
  },
   // 返回
    goBack: function () {
      yufp.router.removeTab(this.$route.path);
    },
   // 选取项目编号
   selectProNo: function(){
     var _this = this;
      var dialogData = {};
      _this.$dialog.open(
        "",
        "bizmanage/lmtBiz/subjectCredit/sigInvestDetailsInfo/selectProDialog",
        1200,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.proNo = retVal.proNo;
          _this.formdata.proName = retVal.proName;
          _this.formdata.assetNo = retVal.assetNo;
        }
      );
   },
   // 选取底层资产客户编号
   selectCusId: function(){
     var _this = this;
      var dialogData = {};
      _this.$dialog.open(
        "",
        "bizmanage/lmtBiz/subjectCredit/sigInvestDetailsInfo/selectCustomDialog",
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.basicAssetCusId = retVal.cusId;
          _this.formdata.basicAssetCusName = retVal.cusName;
        }
      );
   },
   // 选取底层资产客户编号
   selectGuarCusId: function(){
     var _this = this;
      var dialogData = {};
      _this.$dialog.open(
        "",
        "bizmanage/lmtBiz/subjectCredit/sigInvestDetailsInfo/selectCustomDialog",
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.basicAssetGuarCusId = retVal.cusId;
          _this.formdata.basicAssetGuarCusName = retVal.cusName;
        }
      );
   },
   
}

}

</script>
