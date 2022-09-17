<template>
    <div>
        <yu-xform ref="refForm" v-model="formdata">
            <yu-xform-group :column="2">
                <yu-xform-item label="产品编号" ctype="yu-retail-product" name="prdId" rules="required" placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
                <yu-xform-item label="产品名称" ctype="input" name="prdName" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="机构代码" readonly ctype="input" placeholder="机构代码" name="orgCode" :on-icon-click="openOrgFn" icon="search"></yu-xform-item>
                <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" disabled></yu-xform-item>
                <yu-xform-item label="岗位代码" readonly ctype="input" placeholder="岗位代码" name="dutyCode" :on-icon-click="openDutyFn" icon="search" ></yu-xform-item>
                <yu-xform-item label="岗位名称" ctype="input" placeholder="岗位名称" name="dutyName" disabled></yu-xform-item>
                <yu-xform-item label="报价利率" ctype="yu-num" placeholder="报价利率" name="offerRate" sign="%" :multiple="100"></yu-xform-item>
                <yu-xform-item label="利率下调上限" ctype="yu-num" placeholder="利率下调上限" name="rateMax"></yu-xform-item>
                <yu-xform-item label="利率下调下限" ctype="yu-num" placeholder="利率下调下限" name="rateMin"></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
        <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
            <yu-button type="primary" @click="onSaveData()">保存</yu-button>
            <yu-button type="primary" @click="onCancel()">取消</yu-button>
        </yu-form-buttons>

        <yu-xdialog title="岗位选取" :visible.sync="dutyDialogVisible" width="800px">
            <el-form-q ref="dutyForm" :field-data="dutyFields" search-table="dutyTable" :buttons="dutyButtons" style="margin-top: 5px;"></el-form-q>
            <yu-xtable ref="dutyTable" :data-url="dutyUrl" reserve-selection selection-type="radio" row-key="dutyId" style="width: 100%">
                <yu-xtable-column label="岗位码" prop="dutyId"></yu-xtable-column>
                <yu-xtable-column label="岗位名称" prop="dutyName" sortable></yu-xtable-column>
            </yu-xtable>
            <yu-toolbar>
                <yu-button @click="selectDutyFn">选取返回</yu-button>
                <yu-button @click="dutyCancel">返回</yu-button>
            </yu-toolbar>
        </yu-xdialog>

        <yu-xdialog title="机构选取" :visible.sync="orgDialogVisible" width="800px">
            <yu-xform ref="searchForm" related-table-name="orgTable" v-model="searchFormdata"
              form-type="search" @form-search="clearFuzzyFn" @form-reset="resetFn">
              <yu-xform-group :column="3">
                <yu-xform-item name="orgCode" label="机构代码" placeholder="机构代码" ></yu-xform-item>
                <yu-xform-item name="orgName" label="机构名称" placeholder="机构名称" ></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-xtable ref="orgTable" row-number :data-url="tableUrl" selection-type="radio" :base-params="tableParams">
              <yu-xtable-column label="机构代码" prop="orgCode"></yu-xtable-column>
              <yu-xtable-column label="机构名称" prop="orgName"> </yu-xtable-column>
            </yu-xtable>
            <yu-toolbar>
                <yu-button @click="selectOrgFn">选取返回</yu-button>
                <yu-button @click="OrgCancel">返回</yu-button>
            </yu-toolbar>
        </yu-xdialog>
    </div>
</template>

<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],

  data () {
    var _this = this;
    return {
      searchFormdata: {},
      tableUrl: backend.appOcaService + '/api/adminsmorg/querypage',
      dutyUrl: backend.workflowService + '/api/org/dutys/',
      dutyDialogVisible: false,
      orgDialogVisible: false,
      tableParams: {
        upOrgId: this.$xutils.getDefaultformulaData('$LoginOrgCode')
      },
      formdata: {},
      dutyFields: [
        {
          placeholder: '岗位码',
          field: 'dutyId',
          type: 'input'
        },
        {
          placeholder: '岗位名称',
          field: 'dutyName',
          type: 'input'
        }
      ],
      dutyButtons: [
        {
          label: '搜索',
          op: 'submit',
          type: 'primary',
          show: true,
          click: function (model, valid) {
            if (valid) {
              var params = {};
              params.dutyId = model.dutyId;

              if (model.dutyName != '') {
                params.dutyName = '%' + model.dutyName + '%';
              }

              var param = {
                condition: JSON.stringify(params)
              };

              _this.$refs.dutyTable.remoteData(param);
            }
          }
        },
        {
          label: '重置',
          op: 'reset',
          show: this.resetButton
        }
      ]
    };
  },
  methods: {
    /** 清空模糊查询信息 */
    clearFuzzyFn () {
      this.$refs.searchForm.resetFields();
      this.$refs.orgTable.remoteData();
    },
    /** 选取一条机构信息 */
    selectOrgFn () {
      var _this = this;
      let selections = _this.$refs.orgTable.selections;
      if (selections.length !== 1) {
        _this.$message('请选择一条数据！', 'warning');
      }
      _this.formdata['orgCode'] = selections[0].orgCode;
      _this.formdata['orgName'] = selections[0].orgName;
      _this.orgDialogVisible = false;
    },
    /** 打开机构信息窗口*/
    openOrgFn () {
      var _this = this;
      _this.orgDialogVisible = true;
    },
    /** 关闭机构信息窗口*/
    OrgCancel () {
      var _this = this;
      _this.orgDialogVisible = false;
    },
    /** 选取一条岗位信息 */
    selectDutyFn () {
      var _this = this;
      let selections = _this.$refs.dutyTable.selections;
      if (selections.length !== 1) {
        _this.$message('请选择一条数据！', 'warning');
      }
      _this.formdata['dutyCode'] = selections[0].dutyId;
      _this.formdata['dutyName'] = selections[0].dutyName;
      _this.dutyDialogVisible = false;
    },
    /** 打开岗位信息窗口*/
    openDutyFn () {
      var _this = this;
      _this.dutyDialogVisible = true;
    },
    /** 关闭岗位信息窗口*/
    dutyCancel () {
      var _this = this;
      _this.dutyDialogVisible = false;
    },
    /**
     *  关闭弹窗
     */
    onCancel () {
      var _this = this;
      _this.$refs.refForm.resetFields();
      yufp.router.removeTab(_this.$route.path);
    },
    // 新增数据
    onSaveData () {
      var _this = this;
      let jsoPar = this.formdata;

      this.$request({
        url: _this.$backend.cmisCfg + '/api/cfgretailprimerate/',
        method: 'post',
        data: jsoPar
      }).then((response) => {
        if (response.code === '0') {
          _this.$message({
            message: '保存成功',
            type: 'success'
          });
          _this.onCancel();
        } else {
          _this.$message({
            message: '保存失败' + response.message,
            type: 'warning'
          });
        }
      });
    }
  }
};
</script>