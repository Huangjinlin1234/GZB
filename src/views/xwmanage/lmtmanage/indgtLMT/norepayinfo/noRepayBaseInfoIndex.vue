<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    <d1-b-billcard ref="d1_B_BillCard" :hidden="cardflag"></d1-b-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="save()">保存</yu-button>
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
          <el-button @click="back" size="small">返回</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import d1ABillcard from './noRepayBaseInfo_d1_A_BillCard.vue';
import d1BBillcard from './noRepayBaseInfo_d1_B_BillCard.vue';
import { validator } from '@/utils/validate';
export default {
  components: {d1ABillcard, d1BBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      whbJbxx: null,
      whbQyexx: null,
      visiable: false,
      cardflag: false,
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
       * 王祝远 无还本续贷基础页面
       */
    afterInit () {
      this.whbJbxx = this.$refs.d1_A_BillCard;
      this.whbQyexx = this.$refs.d1_B_BillCard;

      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      if (this.$route.meta.params.PageType == '01') {
        // 查看逻辑

        this.queryData(this.surveySerno);
      } else {
        this.queryData(this.surveySerno);
      }
      this.$route.meta.params.bizType = '01';
      this.$route.meta.params.period = '01';
      this.$route.meta.params.iqpSerno = this.surveySerno;
      this.$route.meta.params.borrowerCusId = this.$route.meta.params.cusId;
      this.$route.meta.params.borrowerCusName = this.$route.meta.params.cusName;
      this.$route.meta.params.borrowerCertCode = this.$route.meta.params.certCode;
    },

    showAction () {},

    // 【保存】按钮的逻辑
    save () {
      const saveFlagA = this.whbJbxx.validateBillCardValue();
      const saveFlagB = this.whbQyexx.validateBillCardValue();// 校验必输
      if (this.cardflag == true) {
        if (!saveFlagA) {
          return;
        }
      } else {
        if (!saveFlagB || !saveFlagA) {
          return;
        }
      }


      const surveyReportBasicAndCom = {
        // 封装两个卡片的数据
        'surveyReportBasicInfo': this.$xutils.toUpperCase(this.whbJbxx.getBillCardValue(), true),
        'surveyReportComInfo': this.$xutils.toUpperCase(this.whbQyexx.getBillCardValue(), true)
      };

      const rsPars = {};

      this.$xutils.request({
        // 同步请求
        url: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/savebasicandcom',
        data: JSON.stringify(surveyReportBasicAndCom),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['data'] = response.data;
            if (rsPars.data == 1) {
              // ajax返回值正常
              this.$message({message: '保存成功', type: 'success'}); // 弹出提示
            } else {
              this.$message({message: '失败', type: 'warning'}); // 弹出提示
            }
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.responseJSON.message); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
    },

    // 基本信息界面查看客户信息  模板cus_base_list_pop
    doView () {
      const jsoPar = {
        'cusId': this.whbJbxx.getBillCardItemValue('cusId')
      }; // 传到弹出窗口的参数

      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      this.$dialog.open('客户信息', 'xwmanage/lmtmanage/indgtLMT/cusBaseListIndex', 900, 400, jsoPar);
    },
    /*
     *初始化：通过调查编号，查找页面所需要的basic和com表数据 - > hubp  2021年6月15日16:50:55
     */
    queryData (surveySerno) {
      var _this = this;
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/selectbasicandcom',
        data: {'surveySerno': surveySerno}
      }).then(({code, message, data}) => {
        if (data != null) {
          if (data.lmtSurveyReportBasicInfo != null) {
            yufp.clone(data.lmtSurveyReportBasicInfo, this.whbJbxx.formdata);
          } else {
            this.whbJbxx.setBillCardItemValue('cusId', this.$route.meta.params.cusId);
            this.whbJbxx.setBillCardItemValue('cusName', this.$route.meta.params.cusName);
            this.whbJbxx.setBillCardItemValue('certCode', this.$route.meta.params.certCode);
            this.whbJbxx.setBillCardItemValue('certType', this.$route.meta.params.certType);
            this.whbJbxx.setBillCardItemValue('phone', this.$route.meta.params.phone);
            this.whbJbxx.setBillCardItemValue('surveySerno', this.surveySerno);
          }
          if (data.lmtSurveyReportComInfo != null) {
            yufp.clone(data.lmtSurveyReportComInfo, this.whbQyexx.formdata);
          } else {
            this.whbQyexx.setBillCardItemValue('surveySerno', this.surveySerno);
          }
        } else {
          this.whbQyexx.setBillCardItemValue('surveySerno', this.surveySerno);
          this.whbJbxx.setBillCardItemValue('cusId', this.$route.meta.params.cusId);
          this.whbJbxx.setBillCardItemValue('cusName', this.$route.meta.params.cusName);
          this.whbJbxx.setBillCardItemValue('certCode', this.$route.meta.params.certCode);
          this.whbJbxx.setBillCardItemValue('certType', this.$route.meta.params.certType);
          this.whbJbxx.setBillCardItemValue('phone', this.$route.meta.params.phone);
          this.whbJbxx.setBillCardItemValue('surveySerno', this.surveySerno);
        }

        // 查询客户类型,企业信息是否需要录入，根据客户信息中的客户类型，一般自然人：不需要录入，个体工商户和小微企业主需要填写企业征信
        this.$request({
          url: this.$backend.cmisCus + '/api/cusindiv/querycusindivbycusid',
          method: 'POST',
          data: this.whbJbxx.getBillCardItemValue('cusId')
        }).then(({code, message, data}) => {
          if (data != null) {
            if (data.cusType == '110') {
              _this.cardflag = true;
            }
          }
        });
      });
    },
    /* 查询配偶*/
    doselectCob () {
      var certType = 'A';
      var certCode = this.whbJbxx.getBillCardItemValue('spouseCertCode');
      if (!certType || !certCode) {
        this.$xutils.showMsgBox('提示', '请先填写：证件号码、证件类型！', 350, 150);
        return;
      }
      var rqData = {};
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
          this.whbJbxx.formdata.spouseCusId = data.cusId;

          this.$message({ message: '查询到配偶客户编号为' + data.cusId, type: 'success' });
          // this.$refs.refTable.remoteData();
        } else {
          // 去快速创建
          this.$xutils.showConfirmBox('提示', '客户不存在！是否进行临时客户快捷创建', 400, 200, _isOK => {
            if (_isOK) {
              this.visiable = true;
              this.$nextTick(function () {
                this.dialogData.certType = 'A';
                this.dialogData.cusName = this.whbJbxx.formdata.spouseName;
                this.dialogData.certCode = this.whbJbxx.formdata.spouseCertCode;
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
          _this.whbJbxx.formdata.spouseCusId = response.data.cusId;
          _this.whbJbxx.formdata.spouseCertCode = response.data.certCode;
          _this.whbJbxx.formdata.spouseName = response.data.cusName;
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
