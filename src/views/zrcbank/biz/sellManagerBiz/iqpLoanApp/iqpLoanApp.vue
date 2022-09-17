
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="普通查询" :hideFilter="false" :collapseHide="false" is-collapse>
      <yu-button-drop>
        <yu-button @click="addFn">新增</yu-button>
        <yu-button @click="modifyFn">修改</yu-button>
        <yu-button @click="infoFn">详情</yu-button>
        <yu-button @click="deleteFn">删除</yu-button>
      </yu-button-drop>
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item placeholder="申请流水号" name="iqpSerno" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="业务类型" name="bizType" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="申请日期" name="appDate" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="申请流水号" prop="iqpSerno" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="120"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="新增向导" :visible.sync="dialogVisible" width="900px" height="400px">
        <yu-xform ref="refFormDemo" label-width="120px" v-model="cusForm">
          <yu-xform-group>
            <yu-xform-item label="客户编号" ctype="input" name="cusId" :options="options"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" name="cusName" colspan="10" :disable="true">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button type="primary" @click="openDialog2">获取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" :options="options" data-code="STD_ZB_CERT_TYP" :disable="true"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" name="certCode" :options="options" :disable="true"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" name="prdId" :options="options" :disable="true"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" name="prdName" colspan="10" :disable="true">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button type="primary" @click="openDialog2">获取</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-form-buttons :padding-left="124">
          <yu-button type="primary" @click="saveFn">下一步</yu-button>
          <yu-button @click="cancelFn">返回</yu-button>
        </yu-form-buttons>
      </yu-xdialog>
      <yu-xdialog title="客户查询" :visible.sync="dialogTableVisible" width="900px" height="800px">
        <yu-xform ref="validForm" label-width="100px" label-suffix="：" v-model="formdata5" form-type="search">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户名称" ctype="input" name="cusName" :rules="cusNameRule"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="input" name="certType" :rules="certTypeRule"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" name="certCode" data-code="num" :rules="certCodeRule"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="dialogtable" condition-key="condition" row-number :data-url="cusDataUrl">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        </yu-xtable>
        <yu-button type="primary" @click="selectReturn">选取</yu-button>
      </yu-xdialog>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/iqploanapp/',
      cusDataUrl: backend.cmisBiz + '/api/cusBase/',
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      cusIdRule: [{ required: true, message: '请输入客户编号' }],
      cusNameRule: [{ required: true, message: '请输入客户名称' }],
      certTypeRule: [{ required: true, message: '请输入证件类型' }],
      certCodeRule: [{ required: true, message: '请输入证件号码' }],
      prdIdRule: [{ required: true, message: '请选输入产品编号' }],
      prdNameRule: [{ required: true, message: '请选输入产品名称' }],
      dialogVisible: false,
      dialogTableVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    /**
     * 下一步
     */
    saveFn: function () {
      var _this = this;
      var iqpLoanApp = {};
      yufp.clone(_this.cusForm, iqpLoanApp);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/saveIqoLoanAppSell',
        data: iqpLoanApp,
        callback: function (code, message, response) {
          if (code === '0') {
            _this.dialogVisible = false;
            console.log('业务流水号req' + response.data.serno);
            // _this.$refs.refTable.remoteData();
            // 跳转至业务申请修改页面
            _this.$router.addTab({
              // 路由名称
              name: 'zrcbank/biz/sellManagerBiz/iqpLoanApp/iqpLoanAppUpdatePage', // 菜单路径
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: '1', // 必传
              // 页签名称
              title: '业务申请',
              // 传递的业务数据，可选配置
              data: {
                iqpSerno: response.data.serno
              }
            });
          } else {
            _this.$message({
              message: message,
              type: 'error'
            });
          }
          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.dialogVisible = true;
      // this.$router.addTab({
      // // 路由名称
      //   name: 'zrcbank/biz/sellManagerBiz/iqpLoanApp/iqpLoanAppGuide', // 菜单路径
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: '1', // 必传
      //   // 页签名称
      //   title: '自定义增删改查',
      //   // 传递的业务数据，可选配置
      //   data: {
      //     custId: '1001001'
      //   }
      // });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      // _this.switchStatus('EDIT', true);
      var iqpSerno = _this.$refs.refTable.selections[0].iqpSerno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/sellManagerBiz/iqpLoanApp/iqpLoanAppUpdatePage', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: '1', // 必传
        // 页签名称
        title: '业务申请',
        // 传递的业务数据，可选配置
        data: {
          iqpSerno: iqpSerno
        }
      });
    },


    /**
     * 详情
     */

    infoFn: function () {
      var _this = this;

      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      // _this.switchStatus('DETAIL', false);

      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/sellManagerBiz/iqpLoanApp/iqpLoanAppUpdatePage', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: '1', // 必传
        // 页签名称
        title: '业务申请',
        // 传递的业务数据，可选配置
        data: {
          serno: 'iqp123'
        }
      });
    },

    openDialog2 () {
      this.dialogTableVisible = true;
    },
    selectReturn () {
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.cusForm.cusId = this.$refs.dialogtable.selections[0].cusId;
      this.cusForm.cusName = this.$refs.dialogtable.selections[0].cusName;
      // this.cusForm.prdId = this.$refs.dialogtable.selections[0].prdId;
      // this.cusForm.prdName = this.$refs.dialogtable.selections[0].prdName;
      this.cusForm.certCode = this.$refs.dialogtable.selections[0].certCode;
      this.cusForm.certType = this.$refs.dialogtable.selections[0].certType;
      this.dialogTableVisible = false;
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;

      var selections = _this.$refs.refTable.selections;

      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var len = selections.length,
        arr = [];

      for (var i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: '/trade/example/delete',
              data: {
                ids: arr.join(',')
              },
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();

                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }

  }
};
</script>
