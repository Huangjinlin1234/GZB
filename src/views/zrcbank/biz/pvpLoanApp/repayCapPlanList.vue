<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账申请——还本计划明细
  -->
  <div>
    <yu-panel title="定制还本计划" :hideFilter="false" :collapseHide="false" :disabled="op">
      <yu-toolbar>
        <yu-button type="primary" @click="addFn" :hidden="op">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" :hidden="op">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" :hidden="op">删除</yu-button>
        <yu-button type="primary" @click="infoFn" >查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" style="margin-top: 10px"  :base-params="baseParams">
        <yu-xtable-column label="申请流水号" prop="serno" width=""></yu-xtable-column>
        <yu-xtable-column label="期数" prop="terms" width=""></yu-xtable-column>
        <yu-xtable-column label="还款日期" prop="repayDate" width=""></yu-xtable-column>
        <yu-xtable-column label="还本金额" prop="repayAmt" width="" :formatter="Currency"></yu-xtable-column>

        <yu-xtable-column label="登记人ID" prop="inputId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记机构ID" prop="inputBrId" hide-column ></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate" hide-column ></yu-xtable-column>
        <yu-xtable-column label="更新人ID" prop="updId" hide-column ></yu-xtable-column>
        <yu-xtable-column label="更新人机构ID" prop="updBrId" hide-column ></yu-xtable-column>
        <yu-xtable-column label="更新时间" prop="updDate" hide-column ></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputIdName" hide-column ></yu-xtable-column>
        <yu-xtable-column label="修改人名称" prop="updIdName" hide-column ></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrIdName" hide-column ></yu-xtable-column>
        <yu-xtable-column label="更新机构名称" prop="updBrIdName" hide-column></yu-xtable-column>

      </yu-xtable>
    </yu-panel>
    <!-- 新增，弹框-->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="850px">
      <yu-xform ref="refForm" label-width="100px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="申请流水号" name="serno" ctype="input" colspan="24" :disabled="true" ></yu-xform-item>
          <yu-xform-item label="期数" name="terms" ctype="input" rules="required" colspan="24"></yu-xform-item>
          <yu-xform-item label="还款日期" name="repayDate" ctype="datepicker" rules="required" colspan="24"></yu-xform-item>
          <yu-xform-item label="还本金额" name="repayAmt" ctype="yu-num" rules="required" colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" v-show="saveBtnShow" @click="saveFn">确定</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinList from '@/utils/mixins/mixin-list';
import OtherForRateAppListVue from '../creditManage/otherItem/otherRate/otherForRateApp/OtherForRateAppList.vue';
yufp.lookup.reg('STD_ZB_OPER_TYPE');
let obj = {};
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {},
      dataUrl: backend.cmisBiz + '/api/repaycapplan/queryRepaycapplan',
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
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      op: false,
      isHighCont: true
    };
  },
  created () {
    var _this = this;
    if (_this.getFactory().contextData.instanceInfo) {
      obj = _this.getFactory().contextData.instanceInfo;
      _this.op = true;
    } else if (_this.$route.meta.params) {
      obj = _this.$route.meta.params;
    } else {
      obj = _this.getFactory().contextData;
    }
    if (obj.op && obj.op == 'VIEW') {
      _this.op = true;
    }

    if (obj.contType == '2' || obj.contType == '3') {
      _this.isHighCont = true;
    } else {
      _this.isHighCont = false;
    }
    // 如果有出账流水号就根据出账流水号查询
    if (obj.pvpSerno != null && obj.pvpSerno != '') {
      _this.baseParams = {condition: JSON.stringify({ serno: obj.pvpSerno})};
    } else {
      _this.baseParams = {condition: JSON.stringify({ serno: obj.bizId})};
    }
    _this.formdata.serno = obj.pvpSerno;
  },
  mounted () {

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
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      model['serno'] = obj.pvpSerno;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }

      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/repaycapplan/saverepaycapplan',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
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
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },

    // 修改
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        this.$dialog.open('还本计划', 'zrcbank/biz/pvpLoanApp/repayCapPlanInfo', 900, 400,
          _this.$refs.refTable.selections[0],
          () => {
            _this.$refs.refTable.remoteData();
          }
        );
        // this.$router.addTab({
        //   // 路由名称,菜单路径
        //   name: 'zrcbank/biz/pvpLoanApp/repayCapPlanInfo',
        //   // 自定义唯一页签key,请统一使用custom_前缀开头。必传
        //   key: '1',
        //   // 页签名称
        //   title: '还本计划',
        //   // 传递的业务数据，可选配置
        //   data: {
        //     pkId: _this.$refs.refTable.selections[0].pkId
        //   }
        // });
      });
    },


    // 查看
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        this.$dialog.open('还本计划', 'zrcbank/biz/pvpLoanApp/repayCapPlanView', 900, 400,
          _this.$refs.refTable.selections[0]
        );
        // this.$router.addTab({
        //   // 路由名称,菜单路径
        //   name: 'zrcbank/biz/pvpLoanApp/repayCapPlanView',
        //   // 自定义唯一页签key,必传，请统一使用custom_前缀开头
        //   key: '1',
        //   // 页签名称
        //   title: '分段计息',
        //   // 传递的业务数据，可选配置
        //   data: {
        //     viewType: 'EDIT',
        //     pkId: _this.$refs.refTable.selections[0].pkId
        //   }
        // });
      });
    },

    // 删除
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/repaycapplan/delete/' + selections[0].pkId,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '删除成功', type: 'success' });
                } else {
                  _this.$message({ message: '删除失败', type: 'error' });
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
