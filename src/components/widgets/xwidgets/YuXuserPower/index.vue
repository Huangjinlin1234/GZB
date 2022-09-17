<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="人员权限表">
        <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
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
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuXuserPower',
  componentName: 'YuXuserPower',
  mixins: [popList],
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/adminsmuser/page',
      // 表格中传出id数据的key
      queryCode: 'loginCode',
      // 表格中显示到input框中的字段key
      textCode: 'userName'
    };
  }
};
</script>
