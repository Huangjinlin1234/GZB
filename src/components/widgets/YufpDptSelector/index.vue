<template>
  <div>
    <yu-input :icon="icon" :placeholder="placeholder" :disabled="disabled" :on-icon-click="onIconClickFn" v-model="selectedVal" @focus="focusFn" @blur="icon='search'"></yu-input>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible">
      <yu-xform ref="searchForm" related-table-name="dptTable" v-model="searchFormdata" form-type="search" @form-reset="clearOrgIdFn">
        <yu-xform-group :column="4">
          <yu-xform-item name="orgName" :label="$t('dptManager.ssjg')" :placeholder="$t('dptManager.qxz')" ctype="custom">
            <yu-combo-tree ref="searchTree" v-model="searchOrgName" :placeholder="$t('dptManager.qxz')" :data-url="orgTreeUrl"
                           data-id="orgId" data-label="orgName" data-pid="upOrgId" :clearable="true" @node-click="changeOrgIdFn" @clear="clearOrgIdFn" :filter-node-method="filterNode">
            </yu-combo-tree>
          </yu-xform-item>
          <yu-xform-item name="dptCode" :label="$t('dptManager.bmdm')" :placeholder="$t('dptManager.qsr')"></yu-xform-item>
          <yu-xform-item name="dptName" :label="$t('dptManager.bmmc')" :placeholder="$t('dptManager.qsr')"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="dptTable" row-number :data-url="dptTableUrl" :selection-type="selectionType" @row-click="selectFn">
        <yu-xtable-column :label="$t('dptManager.bmmc')" prop="dptName"></yu-xtable-column>
        <yu-xtable-column :label="$t('dptManager.bmdm')" prop="dptCode"></yu-xtable-column>
        <yu-xtable-column :label="$t('dptManager.ssjg')" prop="orgName"> </yu-xtable-column>
        <yu-xtable-column :label="$t('dptManager.zt')" prop="dptSts" data-code="DATA_STS"></yu-xtable-column>
      </yu-xtable>
      <div v-if="selectionType === 'checkbox'" slot="footer" class="dialog-footer" align="center">
        <yu-button type="primary" @click="confirmFn">{{ $t('app.component.btn_confirm') }}</yu-button>
        <yu-button @click="dialogVisible = false">{{ $t('app.component.btn_cancel') }}</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
import { extend } from '@/utils'
export default {
  name: 'YufpDptSelector',
  componentName: 'YufpDptSelector',
  props: {
    detailsValue: {
      type: String,
      default: ''
    },
    details: {
      type: Boolean,
      default: true
    },
    selectValue: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    params: Object
  },
  data: function () {
    return this.createData();
  },
  watch: {
    details: {
      handler: function (newVal, oldVal) {
        this.value = this.selectValue;
      },
      immediate: true
    },
    selectValue: {
      handler: function (newVal) {
        this.value = newVal;
      },
      immediate: true
    },
    searchOrgName: function (val) {
      this.$refs.searchTree.filter(val);
    },
    params: function (val) {
      var _this = this;
      var temp = _this.createData();
      extend(true, _this, val);
      _this.dataParams = temp.dataParams;
    }
  },
  // ?????????
  mounted: function () {
  },
  methods: {
    createData: function () {
      var _this = this;
      var temp = _this.getDefaultData();
      // ????????????
      extend(true, temp, _this.params);
      return temp;
    },
    getDefaultData: function () {
      return {
        searchOrgName: '', //
        dptTableUrl: backend.appOcaService + '/api/adminsmdpt/page', // ????????????????????????
        icon: 'search', // ???????????????
        selectedVal: '', // ????????????
        dialogVisible: false, // ?????????????????????
        searchFormdata: {}, // ??????????????????
        orgTreeUrl: backend.appOcaService + '/api/adminsmorg/orgtreequery', // ??????????????? url
        dialogTitle: '', // ???????????????
        // ????????????
        searchKey: '', // ???????????????
        value: '3',
        placeholder: '',
        // ????????????
        dataParams: {
        },
        selectionType: 'checkbox' // ?????????????????? ????????????
      };
    },
    focusFn: function () {
      if (this.selectedVal != '') {
        this.icon = 'circle-close';
        return;
      }
      this.dialogVisible = false;
    },
    /**
    * ????????????????????????
    * @param node ?????????????????????
    */
    changeOrgIdFn: function (node) {
      this.searchFormdata.orgId = node.orgId;
      this.searchOrgName = node.orgId;
      this.$emit('node-click', node);
    },
    /**
    * ??????????????????????????????
    */
    clearOrgIdFn: function () {
      this.searchFormdata.orgId = '';
      this.searchOrgName = '';
    },
    /**
    * ???????????????
    * @param data ??????????????????
    */
    filterNode: function (value, data, node) {
      if (!value) {
        return true;
      }
      return data.orgName.indexOf(value) !== -1;
    },
    clearFn: function () {
      this.$refs.tree.filter('');
    },
    /**
    *??????????????????,?????????url???????????????
    */
    clearSearchParams: function () {
      this.dataParams = {};
    },
    /**
    * ?????????????????????
    */
    onIconClickFn: function (val) {
      if (this.selectedVal === '') {
        this.dialogVisible = true;
      } else {
        this.selectedVal = '';
        this.$emit('clear');
      }
    },
    /**
    * ????????????????????????
    */
    confirmFn: function () {
      var selections = this.$refs.dptTable.selections;
      if (selections.length < 1 && this.selectionType === 'checkbox') {
        this.$message({
          message: this.$t('dptManager.qxxzytjl'),
          type: 'warning'
        });
        return;
      }
      this.$emit('select-fn', selections);
      this.dialogVisible = false;
    },
    /**
    * ????????????
    */
    selectFn: function () {
      var selections = this.$refs.dptTable.selections;
      if (this.selectionType === 'checkbox') {
        return;
      }
      this.selectedVal = selections[0].dptName;
      this.$emit('select-fn', selections);
      this.dialogVisible = false;
    }
  }
};
</script>
