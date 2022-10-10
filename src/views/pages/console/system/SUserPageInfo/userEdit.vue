<template>
  <div>
    <yu-xdialog
      :title="dialogTitle"
      size="large"
      @close="closeFn"
      @open="initData"
      :visible.sync="dialogVisible"
     >
     <div v-if="pageType=='EDIT'" class="">
        <yu-form ref="form" :model="formdata" :inline="true"  label-width="80px" size="small">
          <yu-form-item label="用户代码">
              <yu-input v-model="formdata.userCode" :disabled="true"></yu-input>
          </yu-form-item>
        <yu-form-item>
            <yu-button v-if="pageType==='ADD'" type="primary"  >查询</yu-button>
            <yu-button v-if="pageType==='EDIT'" type="primary"  >刷新</yu-button>
        </yu-form-item>
        </yu-form>
      </div>
      <yu-xform ref="refForm" label-width="120px"  v-model="formdata">
        <yu-xform-group column="3">
          <yu-xform-item label="是否柜员"  ctype="yu-xradio" data-code="YESNO"  name="title" :hidden="pageType!=='ADD'"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group column="3">
          <yu-xform-item label="用户代码" name="userCode" ctype="input" :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="用户姓名" name="userName"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="身份证号" name="idCardNo"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="机构代码" name="orgCode"   ctype="input" :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="所属分行" name="ownBranch" ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="联系电话" name="telPhone"  ctype="input" :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="邮箱" name="email"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="职级"  name="staffingLevel" ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="状态" name="status" ctype="select"  data-code="USER_STATUS"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="密码失效日期" name="pwdValdaDate"  ctype="yu-date-picker"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="是否使用指纹"  name="isUseFingerprint" ctype="select" data-code="YESNO" :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="柜员级别"  name="tellerLevel"  ctype="select" :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="柜员类别"  name="tellerCategory" ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="学历水平"  name="eduLevel" ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="最后修改人"  name="lastUpdateUser" ctype="input" :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="最后修改日期"  name="lastUpdateTime" ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="创建日期" name="createTime" ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="创建人" name="createUser"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div slot="footer" class="dialog-footer">
        <yu-button @click="closeFn">取 消</yu-button>
        <yu-button type="primary" @click="comfirmFn">确 定</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageType: String
  },
  data () {
    return {
      formdata: { }
    };
  },
  computed: {
    dialogTitle () {
      let title;
      if (this.pageType == 'ADD') {
        title = '新增';
      } else if (this.pageType == 'EDIT') {
        title = '修改';
      } else if (this.pageType == 'DETAIL') {
        title = '详情';
      }
      return title;
    }
  },
  methods: {
    initData () {
      this.$nextTick(() => {
        if (this.pageType !== 'ADD') {
          this.formdata = this.userInfo;
          this.$refs.refForm.setFormData(this.formdata);
        } else if (this.pageType == 'ADD') { // 新增清空表单数据
          this.$refs.refForm.resetFields();
        }
      });
    },
    closeFn () {
      this.$emit('update:dialogVisible', false);
    },
    comfirmFn () {
    }
  }
};
</script>

<style lang="scss" scoped>
  .top-content{
    margin: 0 auto;
    width: 80%;
  }
</style>