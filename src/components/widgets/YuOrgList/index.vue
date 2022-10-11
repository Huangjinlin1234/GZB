<template>
  <yu-xdialog title="机构列表" :visible.sync="dialogVisible" :before-close="handleClose" v-loading="loading" width="80%">
    <yu-xform ref="refForm" label-width="120px" :hidden-rule="true" form-type="edit" hidden-del-val>
      <yu-xform-group>
        <yu-xform-item v-for="(item,index) in formFileds" :key="index" :label="item.label" :name="item.name" :colspan="item.colspan" :ctype="item.ctype" :disabled="item.disabled"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <yu-xtable ref="refTable" :data-url="dataUrl" :base-params="baseParams" request-type="POST" :defauld-load="false" json-data="rows">
      <yu-xtable-column v-for="(item, index) in tableFields" :key="index" :label="item.label" :prop="item.prop"></yu-xtable-column>
    </yu-xtable>
    <span slot="footer" class="dialog-footer">
      <yu-button type="primary" @click="addResourceFn">保 存</yu-button>
      <yu-button @click="handleClose">取 消</yu-button>
    </span>
  </yu-xdialog>
</template>
<script>
import { getOrgList } from '@/api/systemManage/common';
export default {
  name: 'YuOrgList',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      loading: false,
      dataUrl: getOrgList(),
      baseParams: {},
      formFileds: [
        { label: '机构代码', prop: 'orgCode' },
        { label: '机构名称', prop: 'orgName' },
      ],
      tableFields: [
        { label: '机构代码', prop: 'orgCode' },
        { label: '上级机构代码', prop: 'orgParentCode', hidden: true },
        { label: '法人机构代码', prop: 'legalOrgCode', hidden: true },
        { label: '机构名称', prop: 'orgName' },
        { label: '机构层级', prop: 'orgLevel', dataCode: 'ORG_LEVEL' },
        { label: '机构联系电话', prop: 'orgTel' },
        { label: '机构地址', prop: 'orgAddress' },
        { label: '机构邮编', prop: 'orgZipcode' },
        { label: '位置属性', prop: 'location', hidden: true }
      ]
    }
  },
  watch: {
    dialogVisible () {
      this.$nextTick(() => {
        this.$refs.refForm.formdata = this.formData;
      })
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit('update:dialog-visible', false);
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
