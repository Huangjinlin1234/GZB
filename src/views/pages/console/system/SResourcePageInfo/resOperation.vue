<template>
  <yu-xdialog :title="$t(`sysUserManager.${pageType}`)+$t('sysUserManager.zyczxx')" :visible.sync="dialogVisible" :before-close="handleClose" v-loading="loading">
    <yu-xform ref="refForm" form-type="edit" label-width="120px">
      <yu-xform-group>
        <yu-xform-item v-for="(item,index) in formFileds" :key="index" :label="item.label" :name="item.name" :colspan="item.colspan" :ctype="item.ctype" :disabled="pageType==='ck' || item.disabled || (item.name === 'rescActCode' && pageType==='xg')" :hidden="pageType==='ck'?false:item.hidden" :hidden-del-val="false"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <span slot="footer" class="dialog-footer">
      <yu-button type="primary" @click="addResOperationFn">保 存</yu-button>
      <yu-button @click="handleClose">取 消</yu-button>
    </span>
  </yu-xdialog>
</template>

<script>
import { addResOperation } from '@/api/systemManage/resource';
export default {
  name: 'resOperation',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    pageType: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    dialogVisible () {
      this.$nextTick(() => {
        this.$refs.refForm.formdata = this.formData;
      })
    }
  },
  data () {
    return {
      loading: false,
      formFileds: [
        { name: 'rescCode', label: '资源代码', disabled: true },
        { name: 'rescDesc', label: '资源中文描述', disabled: true },
        { name: 'funcId', label: '路由', disabled: true, rules: [{ max: 32, message: '最大长度为32' }] },
        {
          name: 'rescActCode', label: '资源操作码',
          rules: [{ required: true, message: '资源操作码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32' }]
        },
        {
          name: 'rescActDesc', label: '资源操作中文描述',
          rules: [{ required: true, message: '资源操作中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80' }]
        },
        { name: 'createUser', label: '创建人', hidden: true },
        { name: 'createTime', label: '创建日期', hidden: true },
        { name: 'lastUpdateUser', label: '最后修改人', hidden: true },
        { name: 'lastUpdateTime', label: '最后修改时间', hidden: true }
      ],
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false;
    },
    addResOperationFn () {
      let flag = false;
      this.$refs.refForm.validate((vali) => {
        flag = vali;
      }); // 提交 表单 的验证 状态
      if (!flag) return;
      this.loading = true;
      addResOperation().then(res => {
        this.loading = false;
        // 插入节点


        this.handleClose();
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
