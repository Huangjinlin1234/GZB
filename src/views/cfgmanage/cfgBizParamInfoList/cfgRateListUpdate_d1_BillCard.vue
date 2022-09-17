<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="业务品种" ctype="select" name="bizType" rules="required" data-code="STD_ZB_OPRD_TYP" placeholder="业务品种"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="基准利率项目类型" ctype="select" name="baseRemitType" data-code="STD_ZB_BIZ_TYP" placeholder="基准利率项目类型"></yu-xform-item>
          <yu-xform-item label="基准年利率" ctype="yu-num" name="baseRateY" rules="required" placeholder="基准年利率" sign="%" :multiple="100" :precision="6"></yu-xform-item>
          <yu-xform-item label="基准月利率" ctype="yu-num" name="baseRateM" rules="required" placeholder="基准月利率" sign="‰" :multiple="1000" :precision="6"></yu-xform-item>
          <yu-xform-item label="利率浮动上限" ctype="yu-num" name="rateFloatMax" rules="required" placeholder="利率浮动上限" sign="%" :multiple="100" :precision="6"></yu-xform-item>
          <yu-xform-item label="利率浮动下限" ctype="yu-num" name="rateFloatMin" rules="required" placeholder="利率浮动下限" sign="%" :multiple="100" :precision="6"></yu-xform-item>
          <yu-xform-item label="期限上限（月）" ctype="yu-num" name="termMax" rules="required" placeholder="期限上限（月）" :precision="0" :min="0"></yu-xform-item>
          <yu-xform-item label="期限下限（月）" ctype="yu-num" name="termMin" rules="required" placeholder="期限下限（月）" :precision="0" :min="0"></yu-xform-item>
          <yu-xform-item label="期限说明" ctype="input" placeholder="期限说明" name="termDesc"></yu-xform-item>
         <!-- <yu-xform-item label="责任人" ctype="yu-xuser-power" name="managerId" rules="required" placeholder="责任人" :mapping="{ loginCode: 'managerId' }" width="720" height="480"></yu-xform-item>-->
         <yu-xform-item label="责任人"  name="managerId" rules="required" placeholder="责任人" icon="search" @click.native="slectFn"></yu-xform-item>

          <yu-xform-item label="生效日期" ctype="datepicker" name="inureDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required" placeholder="生效日期"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="regiDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required" placeholder="登记日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
      <!----------------------------责任人弹框 -------------------------------------->
       <yu-xdialog :visible.sync="visiable" :width="width" title="人员权限表">
        <yu-xtable ref="refTable" :row-number="true" request-type="POST" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="姓名" prop="userName" width="180"></yu-xtable-column>
          <yu-xtable-column label="登录代码" prop="loginCode" width="100"></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" width="100"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certNo" width="100"></yu-xtable-column>
          <yu-xtable-column label="员工号" prop="userCode" width="100"></yu-xtable-column>
          <yu-xtable-column label="有效期到" prop="deadline" width="100"></yu-xtable-column>
          <yu-xtable-column label="所属机构编号" prop="orgId" width="100"></yu-xtable-column>
          <yu-xtable-column label="所属部门编号" prop="dptId" width="100"></yu-xtable-column>
          <yu-xtable-column label="密码" prop="userPassword" width="100"></yu-xtable-column>
          <yu-xtable-column label="性别" prop="userSex" width="100" data-code="STD_ZB_SEX"></yu-xtable-column>
          <yu-xtable-column label="生日" prop="userBirthday" width="100"></yu-xtable-column>
          <yu-xtable-column label="邮箱" prop="userEmail" width="100"></yu-xtable-column>
          <yu-xtable-column label="移动电话" prop="userMobilephone" width="100"></yu-xtable-column>
          <yu-xtable-column label="办公电话" prop="userOfficetel" width="100"></yu-xtable-column>
          <yu-xtable-column label="学历" prop="userEducation" width="100"></yu-xtable-column>
          <yu-xtable-column label="资格证书" prop="userCertificate" width="100"></yu-xtable-column>
          <yu-xtable-column label="入职日期" prop="entrantsDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="任职时间" prop="positionTime" width="100"></yu-xtable-column>
          <yu-xtable-column label="从业时间" prop="financialJobTime" width="100"></yu-xtable-column>
          <yu-xtable-column label="职级" prop="positionDegree" width="100"></yu-xtable-column>
          <yu-xtable-column label="用户头像" prop="userAvatar" width="100"></yu-xtable-column>
          <yu-xtable-column label="常用IP，逗号分隔" prop="offenIp" width="100"></yu-xtable-column>
          <yu-xtable-column label="状态：对应字典项=N" prop="userSts" width="100"></yu-xtable-column>
          <yu-xtable-column label="最近登录时间" prop="lastLoginTime" width="100"></yu-xtable-column>
          <yu-xtable-column label="最近一次修改密码时间" prop="lastEditPassTime" width="100"></yu-xtable-column>
          <yu-xtable-column label="最新变更用户" prop="lastChgUsr" width="100"></yu-xtable-column>
          <yu-xtable-column label="最新变更时间" prop="lastChgDt" width="100"></yu-xtable-column>
          <yu-xtable-column label="头像地址" prop="headPort" width="100"></yu-xtable-column>
          <yu-xtable-column label="指纹信息" prop="fingerPrint" width="100"></yu-xtable-column>
          <yu-xtable-column label="声纹信息" prop="voicePrint" width="100"></yu-xtable-column>
          <yu-xtable-column label="面部信息" prop="facePrint" width="100"></yu-xtable-column>
          <yu-xtable-column label="手势密码" prop="gesturePassword" width="100"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_OPRD_TYP,STD_ZB_CUR_TYP,STD_ZB_BIZ_TYP');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      visiable: false,
      dataUrl: backend.appOcaService + '/api/adminsmuser/page',

      updateUrl: this.$backend.cmisCfg + '/api/cfgrate/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgrate/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    // pop狂弹出
    slectFn () {
      this.visiable = true;
    },
    confirmFn () {
      this.visiable = false;
      this.formdata.managerId = this.$refs.refTable.selections[0].userName;
    },
    // 选去处理

    execBillCardDefaultValueFormula: function () {
      // this.formdata.curType = this.$xutils.getDefaultformulaData('CNY');
      this.formdata.inureDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.regiDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>
