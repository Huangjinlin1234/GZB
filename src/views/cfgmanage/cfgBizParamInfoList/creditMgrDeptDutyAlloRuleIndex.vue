<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="授信管理部审核岗分配规则配置" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="160px" v-model="baseFormdata" style="text-align: center;" :disabled="viewType == 'DETAIL'">
        <yu-xform-group>
          <yu-xform-item label="规则类型" ctype="select" placeholder="规则类型" name="ruleType" rules="required" data-code="STD_AUTO_ASIM_RULE_TYPE"  :disabled="viewType == 'EDIT' || viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="适用机构" readonly ctype="input" placeholder="适用机构" name="brId" :on-icon-click="openOrgFn" icon="search" rules="required"></yu-xform-item>
          <yu-xform-item label="评审人员" ctype="input" placeholder="评审人员" name="reviewId" rules="required"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="创建日期" ctype="input" placeholder="创建日期" name="createTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" disabled></yu-xform-item>
          <yu-xform-item label="修改日期" ctype="input" placeholder="修改日期" name="updateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doSave" :hidden="viewType == 'DETAIL'" >保存</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
    <yu-xdialog title="机构选取" :visible.sync="orgDialogVisible" width="800px">
        <yu-xform ref="searchForm" related-table-name="orgTable" v-model="searchFormdata" form-type="search">
          <yu-xform-group :column="3">
            <yu-xform-item name="orgCode" label="机构代码" placeholder="机构代码"></yu-xform-item>
            <yu-xform-item name="orgName" label="机构名称" placeholder="机构名称"></yu-xform-item>
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
// 获取仓库数据
import { dateFormat } from '@/utils';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_AUTO_ASIM_RULE_TYPE')
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      searchFormdata: {},
      tableUrl: backend.appOcaService + '/api/adminsmorg/querypage/',
      orgDialogVisible: false,
      baseParams: {},
      baseFormdata: {},
      visiable: false,
      dialogformdata: [],
      viewType: ''
    };
  },

  mounted () {
    this.afterInit();
  },

  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      var selectData = _this.$route.meta.params.selectData;
      this.viewType = _this.$route.meta.params.viewType;
      if (_this.viewType == 'ADD') {
        // 新增时设置默认值
        _this.execBillCardDefaultValueFormula();
      } else {
        // 非新增时回显
       yufp.clone(selectData, this.baseFormdata)
       _this.execBillCardDefaultValueFormula();
      }
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /**选取一条机构信息 */
    selectOrgFn () {
        var _this = this;
        let selections = _this.$refs.orgTable.selections;
        if (selections.length !== 1) {
            _this.$message('请选择一条数据！', 'warning');
        }
        _this.baseFormdata['brId'] = selections[0].orgCode;
        _this.orgDialogVisible = false;
    },
    /**打开机构信息窗口*/
    openOrgFn () {
        var _this = this;
        _this.orgDialogVisible = true;
    },
    /**关闭机构信息窗口*/
    OrgCancel () {
        var _this = this;
        _this.orgDialogVisible = false;
    },
    /* 保存 */
    doSave () {
      var _this = this;
      _this.$refs.refForm.validate(volid => {
        if (volid) {
          var url;
          if (_this.viewType === 'ADD') {
            // 新增
            url = backend.workflowService + '/api/creditapproveallotrule/saveList'
          } else {
            // 修改
            var selectData = _this.$route.meta.params.selectData;
            yufp.service.request({
              method: 'POST',
              url: backend.workflowService + '/api/creditapproveallotrule/deleteListByParams',
              data: selectData,
            });
            url = backend.workflowService + '/api/creditapproveallotrule/updateList'
          }
          yufp.service.request({
            method: 'POST',
            url: url,
            data: _this.baseFormdata,
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$message.success('操作成功');
                _this.doBack();
              } else {
                _this.$message.error(response.message);
              }
            }
          });
        };
      });
    },

    selectReturn () {
      var _this = this;
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      yufp.clone(this.$refs.dialogtable.selections[0], this.baseFormdata);
      this.dialogTableVisible = false;
    },

    execBillCardDefaultValueFormula: function () {
      var _this = this;
      if (_this.viewType == 'EDIT') {
        this.baseFormdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      } else {
        this.baseFormdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserId');
        this.baseFormdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
        this.baseFormdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
        this.baseFormdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      }
    }
  }
};

</script>
