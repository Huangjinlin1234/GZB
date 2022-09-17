/**
 *优抵贷基本信息页面
 * hubp
 */
<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="doSaveBtn" @click="doSave">保存</yu-button>
    </yu-form-buttons>
    <yu-xdialog :visible.sync="visiable" width="500px" title="个人客户快捷创建">
        <yu-xform v-model="dialogData" ref="refCus" label-width="120px" related-table-name="refTable" :rules="dialogFormRules">
          <yu-xform-group :column="1">
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" disabled name="certType" ></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="cusName" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center;">
          <el-button type="primary" @click="creat" size="small">创建</el-button>
          <el-button type="primary" @click="back" size="small">返回</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import d1ABillcard from './yddInfo_d1_A_BillCard.vue';
import d1BBillcard from './yddInfo_d1_B_BillCard.vue';
import { validator } from '@/utils/validate';
export default {
  components: {d1ABillcard, d1BBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      yddJbxx: null,
      yddQyxx: null,
      doSaveBtn: false,
      visiable: false,
      dialogFormRules: {
        certCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}]
      }
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
       优抵贷调查表基本信息页面
       */
    afterInit () {
      this.yddJbxx = this.$refs.d1_A_BillCard;
      this.yddQyxx = this.$refs.d1_B_BillCard;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      // 调用方法，载入页面数据
      this.queryData(this.surveySerno);
      this.yddJbxx.setItemValue('cusId', this.$route.meta.params.cusId);
      if (this.$route.meta.params.PageType != undefined && this.$route.meta.params.PageType != '01') { // 判断如果是从修改界面进入的，按钮不隐藏，表单可输
        this.yddJbxx.disabledFlg = false;
        this.yddQyxx.disabledFlg = false;
        this.yddJbxx.buttonFlg = '02';
        this.doSaveBtn = true;
      }
      // 给征信传值 2021年6月8日19:37:09 hubp
      this.$route.meta.params.period = '01';
      this.$route.meta.params.iqpSerno = this.surveySerno;
      this.$route.meta.params.contextDataborrowerCusId = this.$route.meta.params.cusId;
      this.$route.meta.params.contextDataborrowerCusName = this.$route.meta.params.cusName;
      this.$route.meta.params.contextDataborrowerCertCode = this.$route.meta.params.certCode;
      // this.$route.meta.params.contextData.bizType = '01';
      this.$route.meta.params.bizType = '01';
      // this.yddJbxx.addEditChangeAction(this.onChange);// 添加字段值变化监听
    },


    /** 保存页面信息
     */
    doSave () {
      const saveFlagA = this.yddJbxx.validateBillCardValue();
      const saveFlagB = this.yddQyxx.validateBillCardValue();// 校验必输
      if (!saveFlagB || !saveFlagA) {
        this.$message({message: '尚有必输项为填写', type: 'warning'});
        return;
      }
      this.yddJbxx.setItemValue('appAmt', this.yddQyxx.getItemValue('appAmt'));// 拿到申请金额
      this.yddJbxx.setItemValue('loanPurp', this.yddQyxx.getItemValue('loanPurp'));// 拿到贷款用途
      this.yddJbxx.execBillCardDefaultValueFormula();// 手工执行表单的所有默认值公式
      this.yddQyxx.execBillCardDefaultValueFormula();// 手工执行表单的所有默认值公式
      const surveyReportBasicAndCom = {// 封装两个卡片的数据
        'surveyReportBasicInfo': this.$xutils.toUpperCase(this.yddJbxx.getBillCardValue(), true),
        'surveyReportComInfo': this.$xutils.toUpperCase(this.yddQyxx.getBillCardValue(), true)
      };
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/savebasicandcom',
        data: JSON.stringify(surveyReportBasicAndCom),
        success: (response, status, xhr) => {
          if (response.data != null) {
            const rsPars = {};
            rsPars['data'] = response.data;
            if (rsPars.data == 1) { // ajax返回值正常
              this.$message({message: '保存成功', type: 'success'}); // 弹出提示
              return;
            } else {
              this.$message({message: '保存失败', type: 'warning'}); // 弹出提示
              return;
            }
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });
    },

    /** 客户信息查看
     */
    selectCusInfo () {
      const cusId = this.yddJbxx.getItemValue('cusId');
      if (cusId == null || cusId == '') {
        this.$xutils.showMsgBox('提示', '客户信息异常！');
        return;
      }
      const jsoPar = {
        'cusId': cusId
      }; // 传到弹出窗口的参数
      this.$dialog.open('客户信息', 'xwmanage/lmtmanage/indgtLMT/cusBaseListIndex', 900, 400, jsoPar);// 弹出新窗口,并设置参数与弹出窗口返回的回调函数
    },

    /*
     *初始化：通过调查编号，查找页面所需要的basic和com表数据
     */
    queryData (surveySerno) {
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/selectbasicandcom',
        data: {'surveySerno': surveySerno}
      }).then(({code, message, data}) => {
        if (data != null) {
          if (data.lmtSurveyReportBasicInfo != null) {
            yufp.clone(data.lmtSurveyReportBasicInfo, this.yddJbxx.formdata);
          }
          if (data.lmtSurveyReportComInfo != null) {
            yufp.clone(data.lmtSurveyReportComInfo, this.yddQyxx.formdata);
            this.yddQyxx.formdata.appAmt = data.lmtSurveyReportBasicInfo.appAmt;
            this.yddQyxx.formdata.loanPurp = data.lmtSurveyReportBasicInfo.loanPurp;
          }
        }
      });
    },
    /* 查询配偶*/
    doselectCob () {
      var certType = 'A';
      var certCode = this.yddJbxx.getBillCardItemValue('spouseCertCode');
      var spouseName = this.yddJbxx.getBillCardItemValue('spouseName');
      var rqData = {};
      if (!spouseName || !certCode) {
        this.$message({message: '配偶姓名或配偶证件号码不可为空', type: 'warning'});
        return;
      }
      rqData['certType'] = certType;
      rqData['certCode'] = certCode;
      // 取后台查询客户 如果无 则弹出新的创建框
      this.$request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindivsocial/getCusMsg',
        data: rqData
      }).then(({data, code, message}) => {
        // 请求成功
        if (data != null) {
          // 操作成功
          this.yddJbxx.formdata.spouseCusId = data.cusId;

          this.$message({ message: '查询到配偶客户编号为' + data.cusId, type: 'success' });
          // this.$refs.refTable.remoteData();
        } else {
          // 去快速创建
          this.$xutils.showConfirmBox('提示', '客户不存在！是否进行临时客户快捷创建', 400, 200, _isOK => {
            if (_isOK) {
              this.visiable = true;
              this.$nextTick(function () {
                this.dialogData.certType = 'A';
                this.dialogData.cusName = this.yddJbxx.formdata.spouseName;
                this.dialogData.certCode = this.yddJbxx.formdata.spouseCertCode;
              });
            }
          });
        }
      });
    },

    /** 创建临时客户 */
    creat () {
      var validate = false, _this = this;
      _this.$refs.refCus.validate(function (valid) {
        validate = valid;
        valid ? _this.$message({message: '验证通过', type: 'success'}) : _this.$message({message: '验证失败', type: 'error'});
      });
      if (!validate) {
        return;
      }
      var rqData = _this.dialogData;
      _this.$request({
        url: _this.$backend.cmisCus + '/api/cusindivsocial/createCus',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          // 创建成功之后 把客户编号带过去
          _this.$message({message: '创建成功'});
          _this.yddJbxx.formdata.spouseCusId = response.data.cusId;
          _this.yddJbxx.formdata.spouseCertCode = response.data.certCode;
          _this.yddJbxx.formdata.spouseName = response.data.cusName;
          _this.$refs.refCus.resetFields();
          _this.visiable = false;
        } else {
          _this.$message({message: response.message});
        }
      });
    },
    /* 快速开户界面返回*/
    back () {
      this.$refs.refCus.resetFields();
      this.visiable = false;
    }

  }
};
</script>
