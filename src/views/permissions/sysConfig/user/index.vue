<template>
  <div>
    <yu-xform label-width="220px" v-model="formData">
      <yu-xform-group  :column="4">
        <yu-xform-item v-for="filed in searchFileds" :key="filed.label" :name="filed.name" :label="filed.label" :ctype="filed.ctype" :data-code="filed.dataCode"></yu-xform-item>
      <yu-xform-group>
    </yu-xform-group></yu-xform-group></yu-xform>
    <yu-xtable index selection-type="checkbox" ref="yutable" request-type="post" :data-url="dataUrl" style="width: 100%">
      <yu-xtable-column v-for="item in tableFileds" :key="item.label" :prop="item.pro" :label="item.label">
      </yu-xtable-column>
    </yu-xtable>
  </div>
</template>
<script>
yufp.lookup.reg('SEX_TYPE,USER_STATUS');
export default {
  name: 'User',
  data () {
    return {
      formData: {},
      dataUrl: '/console/api/users',
      searchFileds: [
        {label: '用户代码', ctype: 'input', name: 'userCode'},
        {label: '用户姓名', ctype: 'input', name: 'userName' },
        {label: '性别', ctype: 'select', name: 'sex', dataCode: 'SEX_TYPE'},
        {label: '状态', ctype: 'select', name: 'status', dataCode: 'USER_STATUS'}

      ],
      tableFileds: [
        {label: '用户代码', prop: 'userCode'},
        {label: '用户姓名', prop: 'userName'},
        {label: '性别', prop: 'sex'},
        {label: '状态', prop: 'status'}
      ]
    };
  }
};
</script>
<style lang="scss" scoped>

</style>
