
<template>
  <!--
    @created by 屈文
    @description 资产出池查询列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="资产出池查询" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
              <yu-xform-group :column="3">
                <yu-xform-item label-width="160px" label="流资产池协议编号" ctype="input" placeholder="流资产池协议编号" name="contNo"></yu-xform-item>
                <yu-xform-item label-width="160px" label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label-width="160px" label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-form-buttons align="left">
            <!--<yu-button type="primary" @click="doAdd">新增</yu-button>-->
            <yu-button type="primary" @click="doView" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="submit" v-if="checkCtrl('commit')">提交</yu-button>
          </yu-form-buttons>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="managerId"></yu-xtable-column>
            <yu-xtable-column label="客户经理" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="所属机构号" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="录入时间" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <!--资产池协议变更向导-->
      <yu-panel title="" :hideFilter="false" :collapseHide="false">
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleGuide" width="650px">
          <yu-xform ref="refForm" label-width="140px" v-model="formdata" :disabled="formDisabled">
            <yu-xform-group column="1">
              <yu-xform-item label="客户编号" name="cusId" ctype="yu-xctr-cont-aspl"  rules="required" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','contNo':'contNo','serno':'serno','contStatus':'contStatus'}" width="900" height="480" :column="12"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="业务流水号" ctype="input" placeholder="资产池协议业务流水号" name="serno" disabled></yu-xform-item>
              <yu-xform-item label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo" disabled></yu-xform-item>
              <yu-xform-item label="协议状态" ctype="select" name="contStatus" placeholder="协议状态" data-code="STD_CONT_STATUS" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="nextFn">下一步</yu-button>
              <yu-button type="primary" @click="cancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
      </yu-tabs>
      <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CONT_STATUS');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/aspliopool/outpoollist',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ],
      formdata:{}
    };
  },
  methods: {
    /**
     * 查看详情
     */
    doView: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      var op = 'VIEW';
      _this.jumpFactory(jsoPar, op);
    },
    /**
     * 新增
     */
    doAdd: function() {
      var _this = this;
      _this.dialogVisibleGuide = true;
    },
    /**
     * 下一步
     */
    nextFn: function() {
      let _this = this;
      // 后台新增
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/aspliopool/addoutpoollist',
        data:  {contNo: _this.formdata.contNo },
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data) {
              _this.dialogVisibleGuide = false;
              let jsoPar = response.data;
              let op = 'ADD';
              _this.initList();
              _this.jumpFactory(jsoPar, op);
            } else {
              _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              return;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '系统异常，请联系管理员', 350, 150);
            return;
          }
        }
      });
    },
    // 跳转模板工厂
    jumpFactory: function (jsoPar, op) {
      var _this = this;
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.serno + 'add',
        title: '资产出池记录详情',
        data: {
          model_group_no: 'CMG000532',
          op: op,
          serno: jsoPar.serno
        }
      });
    },
    // 提交
    submit: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'error'
        });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      if(jsoPar.apprStatus != '000' && jsoPar.apprStatus != '992'){
        _this.$message({
          message: '只能提交待发起/打回的数据',
          type: 'error'
        });
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      var model = {};
      yufp.clone(jsoPar, model);
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'ZC001'; // 需要判断不同的授信类型，然后biz_type不同传参
      startdto.bizId = model.serno;
      startdto.bizUserName = model.cusName;
      startdto.bizUserId = model.cusId;
      startdto.param = {
        orgType: loginUser.org.orgType,
        approveStatus: model.apprStatus,
        op:'VIEW'
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    onBack () {
      this.initList();
    },
    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
  }
};
</script>
