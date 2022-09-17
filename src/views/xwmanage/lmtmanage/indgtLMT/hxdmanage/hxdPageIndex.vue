<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="doSaveBtn&&lookPage" @click="doSave" v-norepeat.loading>保存</yu-button>
       <yu-button type="primary" v-if="modelSaveBtn&&lookPage" @click="modelSave" v-norepeat.loading>模型审批</yu-button>
      <yu-button type="primary" v-if="submitModelBtn&&lookPage" @click="submitModelSave" v-norepeat.loading>提交审批</yu-button>
    <!--  <yu-button type="primary" v-if="doSaveBtn&&lookPage" @click="fanhui">返回</yu-button>  -->

    </yu-form-buttons>

     <yu-xdialog :visible.sync="visiable" width="500px" title="个人客户快捷创建">
        <yu-xform v-model="dialogData" ref="refCus" label-width="120px" related-table-name="refTable" :rules="dialogFormRules">
          <yu-xform-group :column="1">
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" disabled name="certType" ></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center;">
          <el-button type="primary" @click="creat" size="small" v-norepeat.loading>创建</el-button>
          <el-button type="primary" @click="doBack" size="small">返回</el-button>
        </div>
    </yu-xdialog>
     <yufpNwfInit ref="yufpNwfInit" @success-click="fanhui"></yufpNwfInit>
  </div>
</template>
<script>
/**
 * 授信调查-基本信息
 */
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import d1ABillcard from './hxdPage_d1_A_BillCard.vue';
import d1BBillcard from './hxdPage_d1_B_BillCard.vue';
import { validator } from '@/utils/validate';
export default {
  components: {d1ABillcard, d1BBillcard, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      urls: {
        flow: backend.workflowService + '/api/biz/',
        start: backend.workflowService + '/api/core/start'
      },
      jbxx: null,
      qyxx: null,
      doSaveBtn: false,
      submitModelBtn: false,
      modelSaveBtn: false,
      dialogTableVisible: false,
      formRules: {},
      surveySerno: '',
      lookPage: false,
      visiable: false,
      dialogFormRules: {
        certCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}]
      },
      oldDate: {}
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {

    afterInit () {
      this.jbxx = this.$refs.d1_A_BillCard;
      this.qyxx = this.$refs.d1_B_BillCard;

      // // TODO 此处应该判断逻辑 是新增进来的 还是修改进来的 查看进来的还是通过流程中调用进来的
      // if (this.bizPageData != null) {
      //   // 这个走审批流  直接查数据就行了
      //   this.surveySerno = this.bizPageData.instanceInfo.bizId;
      // } else if (this.$route.meta.params != null) {
      //   // 走新增tab页签进来的
      //   this.surveySerno = this.$route.meta.params.surveySerno;
      //   this.oldDate = this.$route.meta.params;
      //   // this.getFactory().contextData = this.oldDate;
      //   this.$route.meta.params.period = '01';
      //   this.$route.meta.params.iqpSerno = this.$route.meta.params.surveySerno;
      //   this.$route.meta.params.contextDataborrowerCusId = this.$route.meta.params.cusId;
      //   this.$route.meta.params.contextDataborrowerCusName = this.$route.meta.params.cusName;
      //   this.$route.meta.params.contextDataborrowerCertCode = this.$route.meta.params.certCode;
      //   // 用于征信新增是是否直接把主借人放进去
      //   this.$route.meta.params.bizType = '01';
      // } else {
      //   // 这种情况有问题  不应该出现
      // }

      try {
        debugger;
        // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId; ;
        this.oldDate = this.$route.meta.params;
        // this.getFactory().contextData = this.oldDate;
        this.$route.meta.params.period = '01';
        this.$route.meta.params.iqpSerno = this.$route.meta.params.surveySerno;
        this.$route.meta.params.contextDataborrowerCusId = this.$route.meta.params.cusId;
        this.$route.meta.params.contextDataborrowerCusName = this.$route.meta.params.cusName;
        this.$route.meta.params.contextDataborrowerCertCode = this.$route.meta.params.certCode;
        // 用于征信新增是是否直接把主借人放进去
        this.$route.meta.params.bizType = '01';
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      if (this.oldDate != null && this.oldDate.PageType != null && this.oldDate.PageType != '01') {
        this.jbxx.isDetails = false;
        this.jbxx.lookPage = true;
        this.qyxx.isDetails = false;
        this.qyxx.lookPage = true;
        this.lookPage = true;
      }
      this.selectOneData();
    },
    /** 字段变化检测
     */

    showAction () {
      this.selectOneData();
    },
    //
    selectOneData () {
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/selectbasicandcom',
        data: {surveySerno: this.surveySerno}
      }).then(({code, message, data}) => {
        if (data != null) {
          if (data.lmtSurveyReportBasicInfo != null) {
            yufp.clone(data.lmtSurveyReportBasicInfo, this.jbxx.formdata);
            if (data.surveyModel == '02') {
              // 禁止修改
              if (data.lmtSurveyReportBasicInfo.surveyMode == '02') {
                // 禁止修改
                // this.d1_A_BillCard.isdsr = false;
              } else if (!this.jbxx.isDetails){
                this.jbxx.isdsr = false;
              }
            } else if (!this.jbxx.isDetails){
              // 允许修改
              this.jbxx.isdsr = false;
            }
          } else {
            // 如果是空 塞默认值
            yufp.clone(this.oldDate, this.jbxx.formdata);
            // 则给他赋值单双人流水号
            this.jbxx.formdata.isNewEmployee = data.isNewEmployee;
            if (data.surveyModel == '02') {
              // 赋值双人调查  并且禁止修改
              this.jbxx.formdata.surveyMode = data.surveyModel;
              //  this.d1_A_BillCard.setBillCardItemValue('surveyMode', data.surveyMode);
              // yufp.clone({surveyMode: data.surveyModel}, this.d1_A_BillCard.formdata);
            } else {
              this.jbxx.formdata.surveyMode = data.surveyModel;
              if (!this.jbxx.isDetails){
                this.jbxx.isdsr = false;
              }    
            }
          }
          if (data.lmtSurveyReportComInfo != null) {
            yufp.clone(data.lmtSurveyReportComInfo, this.qyxx.formdata);
          } else {
            // 未查询到企业信息 那就给企业信息赋值默认值
            yufp.clone(this.oldDate, this.qyxx.formdata);
          }
          // 判断模型审批结果和优惠利率审批结果

          // if (data.perfer == '997' && data.model == '003') {
          if (data.model == '003') {
            // 显示提交审批
            this.submitModelBtn = true;
            // 隐藏模型审批
            this.modelSaveBtn = false;
            this.doSaveBtn = true;
          } else {
            // 隐藏提交审批
            this.submitModelBtn = false;
            // 模型审批
            this.modelSaveBtn = true;
            this.doSaveBtn = true;
          }
        }
        // yufp.clone(data, _this.formData);
      });
    },

    // 基本信息界面-查看客户信息  模板cus_base_list_pop
    doLook () {
      const jsoPar = {
        'cusId': this.jbxx.getBillCardItemValue('cusId')
      }; // 传到弹出窗口的参数

      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      // this.$dialog.open('客户信息', 'xwmanage/lmtmanage/indgtLMT/cusBaseListIndex', 900, 400, jsoPar);
      this.$dialog.open('客户信息', 'xwmanage/lmtmanage/indgtLMT/hxdmanage/hxdPage_1Cus', -1, -1, jsoPar);
    },

    // 基本信息保存
    doSave () {
      //
      if (this.jbxx.formdata.spouseName != null && this.jbxx.formdata.spouseName != '') {
        // 填写了配偶姓名
        if (this.jbxx.formdata.spouseCusId == null || this.jbxx.formdata.spouseCusId == '') {
          // 没填写客户编号
          this.$message({message: '请补全配偶客户编号', type: 'warning'});
          return;
        }
      }

      // 校验表单
      if (!this.jbxx.validateBillCardValue() || !this.qyxx.validateBillCardValue()) {
        this.$message({message: '请补全基本信息', type: 'warning'});
        return;
      }

      // this.d1_A_BillCard.execBillCardDefaultValueFormula();
      // this.d1_B_BillCard.execBillCardDefaultValueFormula();

      let surveyReportBasicAndCom = {
        'surveyReportBasicInfo': this.$xutils.toUpperCase(this.jbxx.getBillCardValue(), true),
        'surveyReportComInfo': this.$xutils.toUpperCase(this.qyxx.getBillCardValue(), true)
      };

      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/savebasicandcom',
        data: JSON.stringify(this.$xutils.toUpperCase(surveyReportBasicAndCom, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // let returnData = response.data;// 单个string

            this.$message({message: '保存成功', type: 'success'});
          } else {
            this.$message({message: '操作异常 请刷新页面', type: 'warning'});
          }
        }
      });
    },


    // 获取企业
    selectComPanies () {
      // if (this.getFactory().contextData.PageType == '01') {
      //   this.$message({message: '查看页面这个按钮你应该看不到的( ⊙ o ⊙ )！', type: 'success'});
      //   return;
      // }
      let conName = this.qyxx.getBillCardItemValue('conName');
      if (conName == null || conName.toString().length == 0 || conName == '') {
        this.$message({message: '请填写企业信息', type: 'warning'});
        return;
      }

      let params = {
        conName
      };
      // 入参数据

      // 远程调用,指定微服务名，类名，方法名，入参
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportcominfo/queryenterprise',
        data: params
      }).then((res) => {
        // console(code, message, data);
        if (res.code == 0) {
          // 请求成功

          if (res.data != null) {
            /*     let qtdata;
            yufp.clone(data, qtdata); */
            // 操作成功
            // this.$message({ message: res.message, type: 'success' });
            this.qyxx.formdata.conName = res.data.conName;
            // this.d1_B_BillCard.setBillCardItemValue('corpType', res.data.corpType, res.data.corpType);  TODO 这里是调用外部接口返回参数有问题 先默认赋值
            // this.d1_B_BillCard.setBillCardItemValue('corpType', '1', '1');
            this.qyxx.formdata.corpType = res.data.corpType;
            this.qyxx.formdata.corpCertType = res.data.corpCertType;
            this.qyxx.formdata.legal = res.data.legal;
            this.qyxx.formdata.corpCertCode = res.data.corpCertCode;
            this.qyxx.formdata.blicYears = res.data.blicYears;
            // this.d1_B_BillCard.formdata.trade = '教育';
            this.qyxx.formdata.trade = res.data.trade;
            this.qyxx.formdata.operAddr = res.data.operAddr;

            // this.d1_B_BillCard.setBillCardItemValue('trade', res.data.trade, res.data.trade); TODO 这里也有问题
            // this.d1_B_BillCard.setBillCardItemValue('trade', '企业', '企业');

            // this.$refs.refTable.remoteData();
          } else {
            // 操作失败
            // this.$message({ message: res.message, type: 'warning' });
            // this.$refs.refTable.remoteData();
          }
        } else {
          this.$message({message: res.message});
        }
      });
    },

    // 模型审批
    modelSave () {
      // 先保存数据
      // 校验是否填写配偶姓名

      if (this.jbxx.formdata.spouseName != null && this.jbxx.formdata.spouseName != '') {
        // 填写了配偶姓名
        if (this.jbxx.formdata.spouseCusId == null || this.jbxx.formdata.spouseCusId == '') {
          // 没填写客户编号
          this.$message({message: '请补全配偶客户编号', type: 'warning'});
          return;
        }
      }

      // 校验表单

      if (!this.jbxx.validateBillCardValue() || !this.qyxx.validateBillCardValue()) {
        this.$message({message: '请补全基本信息', type: 'warning'});
        return;
      }


      let surveyReportBasicAndCom = {
        'surveyReportBasicInfo': this.$xutils.toUpperCase(this.jbxx.getBillCardValue(), true),
        'surveyReportComInfo': this.$xutils.toUpperCase(this.qyxx.getBillCardValue(), true)
      };


      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/modelapprove',
        data: surveyReportBasicAndCom
      }).then((response) => {
        // 请求成功
        if (response.code == '0' && response.data == true) {
          // 操作成功
          this.$message({message: '模型审批提交成功', type: 'success'});
        } else {
          if (response.message == null) {
          // 操作失败
            this.$message({ message: '提交审批失败  ', type: 'warning' });
          } else {
            this.$message({ message: response.message, type: 'warning' });
          }
        }
      });

      // 先查是否有征信报告30天内的
      // 调风控去模型审批
    },

    /* 查询配偶*/
    doselectCob () {
      // 证件类型
      var certType = 'A';
      var certCode = this.jbxx.getBillCardItemValue('spouseCertCode');
      if (!certType || !certCode) {
        this.$message({ message: '请先填写：配偶证件号码、配偶姓名！', type: 'warning' });
        return;
      }
      var rqData = {};
      rqData['certType'] = certType;
      rqData['certCode'] = certCode;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/getCusMsg',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          if (response.data) {
            // yufp.extend(this.formdata, response.data);
            this.jbxx.formdata.spouseCusId = response.data.cusId;
            this.jbxx.formdata.spouseName = response.data.cusName;
          } else {
          // 去快速创建
            this.visiable = true;
            this.$nextTick(function () {
              this.dialogData.certType = 'A';
              this.dialogData.cusName = this.jbxx.formdata.spouseName;
              this.dialogData.certCode = this.jbxx.formdata.spouseCertCode;
            });
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },
    // 创建客户
    creat () {
      var rqData = this.dialogData;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/createCus',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          // 创建成功之后 把客户编号带过去
          this.$message({message: '创建成功'});
          this.jbxx.formdata.spouseCusId = response.data.cusId;
          this.jbxx.formdata.spouseCertCode = response.data.certCode;
          this.jbxx.formdata.spouseName = response.data.cusName;
          this.$refs.refCus.resetFields();
          this.visiable = false;
        } else {
          this.$message({message: response.message});
        }
      });
    },


    // 提交审批
    submitModelSave () {
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/submit',
        data: {surveySerno: this.jbxx.formdata.surveySerno}
      }).then((res) => {
        // 请求成功
        if (res.data) {
          // 操作成功
          this.startAndSubmit();
        } else {
          // 操作失败
          this.$message({ message: '提交审批失败  ', type: 'warning' });
        }
      });
    },


    /**
     * 流程提交节点选择框
     */
    startAndSubmit () {
      var _this = this;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.loginCode;
      startdto.userId = this.$store.state.oauth.loginCode;
      // startdto.bizType = 'XWYW01';
      startdto.bizType = 'XW001';
      // startdto.bizType = 'XD_PERFER_RATE_APPLY_TEST';
      startdto.bizId = this.$route.meta.params.surveySerno;
      startdto.bizUserName = this.$route.meta.params.cusName;
      startdto.bizUserId = this.$route.meta.params.cusId;
      startdto.params = {
        surveyType: this.$route.meta.params.surveyType
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },


    /* 快速开户界面返回*/
    doBack () {
      this.$refs.refCus.resetFields();
      this.visiable = false;
    },

    // 提交返回
    onCancelPage () {
    },

    // 校验--创建
    doNext () {
      // 校验
      var validate = false, _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? _this.doSaveNext() : _this.$message({message: '验证失败', type: 'error'});
      });
      if (!validate) {
        return;
      }
    },
    doSaveNext () {
      this.$request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindiv/sendEcif',
        data: this.formdata
      }).then(({data}) => {
        // 请求成功
        if (data.cusId != null) {
          // 操作成功
          this.jbxx.formdata.spouseCusId = data.cusId;
          this.$refs.refForm.resetFields();
          this.dialogTableVisible = false;
        } else {
          // 操作失败
          this.$message({ message: '创建失败，请重试', type: 'warning' });
          this.$refs.refForm.resetFields();
          this.dialogTableVisible = false;
        }
      });
    },
    fanhui () {
      // 关闭当前模板工厂

      // this.$dialog.closeAll();
      // this.$router.go(-1);
      yufp.router.removeTab(this.$route.path);
    }


  }
};
</script>
