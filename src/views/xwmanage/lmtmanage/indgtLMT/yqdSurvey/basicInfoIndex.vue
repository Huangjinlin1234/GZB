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
/**
 * 优企贷-基本信息
 */
import d1ABillcard from './basicInfo_d1_A_BillCard.vue';
import d1BBillcard from './basicInfo_d1_B_BillCard.vue';
import { validator } from '@/utils/validate';
export default {
  components: {d1ABillcard, d1BBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillCard: null,
      doSaveBtn: false,
      visiable: false,
      dialogFormRules: {
        certCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}]
      },
      surveySerno: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 优企贷基本信息*/
    afterInit () {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      if (this.$route.meta.params != undefined && this.$route.meta.params.PageType == '03') {
        this.d1_B_BillCard.disabledFlg = false;
        this.d1_A_BillCard.disabledFlg = false;
        this.d1_A_BillCard.flg = '02';
        this.doSaveBtn = true;
      }
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
      if (this.$route.meta.params.PageType == '01') {

      }

      // 给征信数据
      this.surveySerno = this.surveySerno;
      this.oldDate = this.$route.meta.params;
      // 走模板工厂的话需要给征信界面赋个值  2021年6月1日19:39:23
      this.$route.meta.params.period = '01';
      this.$route.meta.params.iqpSerno = this.surveySerno;
      this.$route.meta.params.contextDataborrowerCusId = this.$route.meta.params.cusId;
      this.$route.meta.params.contextDataborrowerCusName = this.$route.meta.params.cusName;
      this.$route.meta.params.contextDataborrowerCertCode = this.$route.meta.params.certCode;
      // 用于征信新增是是否直接把主借人放进去
      this.$route.meta.params.bizType = '01';
    },

    doSave () {
      // 先进行校验
      const saveFlagA = this.d1_A_BillCard.validateBillCardValue();
      const saveFlagB = this.d1_B_BillCard.validateBillCardValue();// 校验必输
      if (!saveFlagB || !saveFlagA) {
        this.$message({message: '请核查数据！', type: 'warning'});
        return;
      }
      this.$request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/savebasicandcom',
        data: {// 封装两个卡片的数据
          'surveyReportBasicInfo': this.d1_A_BillCard.formdata,
          'surveyReportComInfo': this.d1_B_BillCard.formdata
        }
      }).then(({code, message, data}) => {
        if (data != null) {
          this.$message({message: '保存成功', type: 'success'});
        } else {
          this.$message({message: '保存失败', type: 'warning'});
        }
      });
    },

    // 基本信息界面查看客户信息  模板cus_base_list_pop
    doView () {
      const jsoPar = {
        'cusId': this.d1_A_BillCard.getBillCardItemValue('cusId')
      }; // 传到弹出窗口的参数

      // 弹出新窗口,并设置参数与弹出窗口返回的回调函数
      this.$dialog.open('客户信息', 'xwmanage/lmtmanage/indgtLMT/cusBaseListIndex', 900, 400, jsoPar);
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
            yufp.clone(data.lmtSurveyReportBasicInfo, this.d1_A_BillCard.formdata);
          }
          if (data.lmtSurveyReportComInfo != null) {
            yufp.clone(data.lmtSurveyReportComInfo, this.d1_B_BillCard.formdata);
          }
          this.d1_B_BillCard.formdata.managerId = data.managerId;
          this.d1_B_BillCard.formdata.marId = data.marId;
          this.d1_B_BillCard.formdata.managerIdName = data.managerIdName;
          this.d1_B_BillCard.formdata.marIdName = data.marIdName;
        }
      });
    },
    /* 查询配偶*/
    doselectCob () {
      var certType = 'A';
      var certCode = this.d1_A_BillCard.getBillCardItemValue('spouseCertCode');
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
          this.d1_A_BillCard.formdata.spouseCusId = data.cusId;

          this.$message({ message: '查询到配偶客户编号为' + data.cusId, type: 'success' });
          // this.$refs.refTable.remoteData();
        } else {
          // 去快速创建
          this.$xutils.showConfirmBox('提示', '客户不存在！是否进行临时客户快捷创建', 400, 200, _isOK => {
            if (_isOK) {
              this.visiable = true;
              this.$nextTick(function () {
                this.dialogData.certType = 'A';
                this.dialogData.cusName = this.d1_A_BillCard.formdata.spouseName;
                this.dialogData.certCode = this.d1_A_BillCard.formdata.spouseCertCode;
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
          _this.d1_A_BillCard.formdata.spouseCusId = response.data.cusId;
          _this.d1_A_BillCard.formdata.spouseCertCode = response.data.certCode;
          _this.d1_A_BillCard.formdata.spouseName = response.data.cusName;
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
