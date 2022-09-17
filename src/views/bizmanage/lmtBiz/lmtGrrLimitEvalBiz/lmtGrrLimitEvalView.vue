<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 单一客户授信申报-
  -->
  <div class="group-form">
    <yu-xform ref="refForm" label-width="280px" v-model="tableFormdata">
      <yu-panel title="" id="baseInfo" :hideFilter="false" :collapseHide="false">
        <yu-xform-group column="2">
            <yu-xform-item label="主键" name="pkId" rules="required" ctype="input" :disabled="true" hidden></yu-xform-item>
            <yu-xform-item label="申请流水号" name="serno" ctype="input" :disabled="true" ></yu-xform-item>
            <yu-xform-item label="担保人客户编号" name="guarCusId" ctype="input" :disabled="true"></yu-xform-item>
            <yu-xform-item label="企业规模" name="corpScale" ctype="select" data-code="STD_CORP_SCALE" @change="corpScaleEnalrgeTimes()" :disabled="true"></yu-xform-item>
            <!--<yu-xform-item label="操作类型" name="oprType" rules="required" ctype="select" data-code="STD_ZB_OPR_TYPE"></yu-xform-item>-->
            <yu-xform-item label="放大倍数" name="enalrgeTimes" ctype="input" :precision="0" :disabled="true"></yu-xform-item>
            <yu-xform-item label="可担保额度" name="evalGuarLmtAmt" ctype="yu-currency" :precision="0" :disabled="true"></yu-xform-item>
            <yu-xform-item label="净资产值" name="pureAssetValue" ctype="yu-currency" :precision="0" @change="evalGuarLmtAmtResult" :disabled="true"></yu-xform-item>

            <yu-xform-item label="或有负债" name="cntgDebt" ctype="yu-currency" :precision="0"  :disabled="true"></yu-xform-item>
            <yu-xform-item label="已存在的对外保证担保" name="cntgDebtGuar" ctype="yu-currency" :precision="0"  @change="cntgDebtSum" :disabled="true"></yu-xform-item>
            <yu-xform-item label="其它可确认的或有负债" name="cntgDebtOther" ctype="yu-currency" :precision="0"  @change="cntgDebtSum" :disabled="true"></yu-xform-item>
            <yu-xform-item label="备注" name="remark" ctype="input" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yu-xtable :data="tableData4" style="width: 100%">
      <yu-xtable-column label="填报要求：" width="2000">
        <template slot-scope="scope">
          <yu-icon name="time"></yu-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </yu-xtable-column>
    </yu-xtable>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_OPR_TYPE,STD_ZB_OPR_TYPE');
let obj = {};
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: '/trade/example/list',
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
      tableData4: [{
        date: '1. 担保人为大型企业的，担保放大倍数为3倍、中型企业放大倍数为2倍、小微企业及自然人放大倍数为1倍。'
      }, {
        date: '2. 已担保金额是指担保人已存在的对外保证担保金额，须扣除对贴现、出口押汇等低风险业务的担保金额，该数值应与担保人征信报告核对，如两者不一致，应在备注中说明原因。'
      }, {
        date: '3. 其它可确认的或有负债，主要指已基本确定需要承担的赔偿责任等情况，须在备注中说明情况。'
      }, {
        date: '4. 净资产的计算口径以企业当期自制报表为准。'
      }, {
        date: '5. 涉及到关联担保的，以文件要求为准。'
      }, {
        date: '6. 追加的担保人不需要填列。'
      }, {
        date: '7. 涉及相互担保、循环担保情况的， 授信直接按照信用贷款进行管理，不需要填列本表格。'
      }, {
        date: '8. 该表格随授信资料一起上报，支行权限内的授信，如授信额度超过保证担保额度，则该项授信须报授信评审部审批。'
      }],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  mounted () {
    var _this = this;
    // let data = _this.$route.meta.params;
    let data = _this.pageParams;
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrrlimiteval/showdetial',
      data: { pkId: data.pkId },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.tableFormdata);
      }
    });
  },

  methods: {
    cntgDebtSum: function () {
      var _this = this;
      _this.tableFormdata.cntgDebt =
        parseFloat(_this.tableFormdata.cntgDebtGuar) + parseFloat(_this.tableFormdata.cntgDebtOther);
    },

    corpScaleEnalrgeTimes: function () {
      var _this = this;
      if (_this.tableFormdata.corpScale == '1') {
        _this.tableFormdata.enalrgeTimes = 3;
      } else if (_this.tableFormdata.corpScale == '2') {
        _this.tableFormdata.enalrgeTimes = 2;
      } else if (_this.tableFormdata.corpScale == '3' || _this.tableFormdata.corpScale == '4' || _this.tableFormdata.corpScale == '9') {
        _this.tableFormdata.enalrgeTimes = 1;
      }
    },

    evalGuarLmtAmtResult: function () {
      debugger;
      var _this = this;
      var cengfa = parseFloat(_this.tableFormdata.enalrgeTimes) * parseFloat(_this.tableFormdata.pureAssetValue);
      _this.tableFormdata.evalGuarLmtAmt =
        cengfa - parseFloat(_this.tableFormdata.cntgDebtGuar) - parseFloat(_this.tableFormdata.cntgDebtOther);
    },

    /**
     * 返回
     */
    cancelFn: function () {
      // this.$router.go(-1);
      this.$dialog.close(this.dialogId);
    },

    // 暂存
    tempSave: function () {
      var _this = this;
      var model = {};
      // model 和后台的对象pvpLoanApp对应
      yufp.clone(_this.tableFormdata, model);
      var url = backend.cmisBiz + '/api/lmtgrrlimiteval/updatelmtgrrlimiteval';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '暂存成功', type: 'success' });
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },

    // 保存
    saveFn: function () {
      debugger;
      var _this = this;
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var model = {};
      // model 和后台的对象pvpLoanApp对应
      yufp.clone(_this.tableFormdata, model);
      var url = backend.cmisBiz + '/api/lmtgrrlimiteval/updatelmtgrrlimiteval';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.$dialog.close(_this.dialogId);
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
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
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
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
      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata);
      });
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