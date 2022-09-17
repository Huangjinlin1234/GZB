<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" :disabled="formIsDisabled">
        <yu-panel title="购销背景收集详情" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" ctype="input" name="taskId" disabled placeholder="任务编号"></yu-xform-item>
            <yu-xform-item label="出账流水号" ctype="input" name="pvpSerno" disabled placeholder="出账流水号"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled placeholder="客户编号" data-code="STD_ACCT_STATUS"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label="生成日期" ctype="datepicker" name="taskCreateDate" disabled placeholder="生成日期"></yu-xform-item>
            <yu-xform-item label="要求完成日期" ctype="datepicker" placeholder="要求完成日期" name="needFinishDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="批次票面金额" ctype="yu-num" number-formatter="0,000.00" placeholder="批次票面金额" name="batchDrftAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="批次条数" ctype="yu-num" placeholder="批次条数" name="batchQnt" rules="required" disabled :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="资产池协议编号" ctype="input" name="contNo" disabled placeholder="资产池协议编号"></yu-xform-item>
            <!--<yu-xform-item label="资产池协议中文合同号" ctype="input" name="contCnNo" disabled placeholder="资产池协议中文合同号"></yu-xform-item>--> 
            <!--<yu-xform-item label="收集日期" ctype="datepicker" placeholder="收集日期" name="collectDate" rules="required" disabled></yu-xform-item>-->
            <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" rules="required" disabled data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
             <yu-xform-item label="购销背景真实性描述" ctype="textarea" placeholder="购销背景真实性描述" name="remark"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-panel title="关联购销合同明细" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refTable" row-number condition-key="condition"  @row-dblclick="onRowDBClick"  :pageable="true" :data-url="dataUrl" :base-params="baseParam" :default-load="true" request-type="POST">
          <yu-xtable-column label="主键pkId" prop="pkId" hide-column></yu-xtable-column>
          <yu-xtable-column label="出账流水号" prop="pvpSerno"></yu-xtable-column>
          <yu-xtable-column label="银承核心编号" prop="coreBillNo"></yu-xtable-column>
          <yu-xtable-column label="协议编号编号" prop="contNo" ></yu-xtable-column>
          <yu-xtable-column label="购销合同编号" prop="tContNo" ></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        </yu-xtable>
        <yu-checkbox v-model="checked" :disabled="formIsDisabled" >已经完成补扫</yu-checkbox>
      </yu-panel>
    
      <yu-form-buttons align="center">
        <yu-button v-show="!formIsDisabled" type="primary" @click="tempSave">暂存</yu-button>
        <!--<yu-button v-show="!formIsDisabled" type="primary" @click="save">保存</yu-button>-->
        <yu-button v-show="!formIsDisabled" type="primary" @click="commit">提交</yu-button>
        <yu-button type="primary"  @click="back">返回</yu-button>
      </yu-form-buttons>
      <yufpNwfInit ref="yufpNwfInit" @success-click="cancelFn"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      formIsDisabled: false,
      formdata: {},
      formType: 'EDIT',
      dataUrl: backend.cmisBiz + '/api/acctcontrel/selectbyPvpSerno',
      baseParam: {},
      checked: false
    };
  },
  created () {
    var _this = this;
    let jsoPar = {};
    var serno = '';
    let taskId = '';
    let obj = {};
    // 判断是否流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      obj = this.getFactory().contextData.instanceInfo.param;
    } else if (_this.getFactory().contextData.topOutsystemCode) {
      obj = this.getFactory().contextData;
    } else if (_this.$route.meta.params) {
      obj = _this.$route.meta.params;
    }
    if (obj.op == 'VIEW') {
      _this.formIsDisabled = true;
    }
    // 初始化购销背景基本信息
    let param = {condition: {pvpSerno: obj.pvpSerno}};
    _this.baseParam = param;
    _this.initForm(obj.taskId);
  },
  mounted () {
    
  },

  methods: {
    // 初始化表单
    initForm: function (taskId) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/asplaccptask/select/taskid/' + taskId,
        data: {},
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            yufp.clone(response.data, _this.formdata);
            // 是否补扫
            if("1" == _this.formdata.isAddBill){
              _this.checked = true;
            }
          } else {
            return;
          }
        }
      });
    },
    // 暂存
    tempSave () {
      let params = this.formdata;
      if(this.checked){
        params.isAddBill = '1';
      }else{
         params.isAddBill = '0';
      }
      let tempParams = {};
      yufp.clone(params, tempParams);
      this.$request({
        method: 'post',
        url: this.$backend.cmisBiz + '/api/asplaccptask/update',
        data: tempParams
      })
      .then(response => {
        if (response.code == '0') {
          this.$message({message: '保存成功', type: 'info'});
        }
      })
      .catch((e) => {
        this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
      });
    },
    // 返回
    back: function () {
      let _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    // 提交
    commit () {
      let _this = this;
      // 校验是否补扫
      if(!this.checked){
      //  this.$message({message: '当前发票补录未完成', type: 'warning'});
      //  return
      }
      // 暂存
      _this.tempSave ();
      debugger
      const userInfo = _this.$xutils.getLoginUserInfo();
      var jsoPar = _this.formdata;
      var model = {};
      yufp.clone(jsoPar, model);
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.bizType = 'ZC002'; // 需要判断不同的授信类型，然后biz_type不同传参
      startdto.bizId = model.taskId;
      startdto.bizUserName = model.cusName;
      startdto.bizUserId = model.cusId;
      startdto.param = {
        topOutsystemCode: 'XXD_ZCC;',
        imageParams: {
          contid: jsoPar.coreContNo,
          businessid: jsoPar.billImgId,
          docid: model.taskId
        },
        pvpSerno: jsoPar.pvpSerno,
        taskId: jsoPar.taskId,
        approveStatus: jsoPar.approveStatus,
        orgType: userInfo.org.orgType
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.getFactory().back();

    }
  }
};
</script>