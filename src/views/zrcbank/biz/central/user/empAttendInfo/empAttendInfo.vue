
<template>
  <!--
    @created by zhoumw
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 请假申请
  -->
  <div>
  <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="请假申请" name="messageTip">
        <yu-panel title="请假申请" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata">
              <yu-xform-group :column="4">
                <yu-xform-item label="员工名称" ctype="input" name="userName" fuzzy-query="both" ></yu-xform-item>
                <yu-xform-item label="员工工号" ctype="input" name="userCode"></yu-xform-item>
                <yu-xform-item label="状态" ctype="select" name="apprStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFn"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-toolbar>
                <yu-button v-if="checkCtrl('add')" @click="addFn">请假申请</yu-button>
                <yu-button v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
                <yu-button v-if="checkCtrl('view')" @click="infoFn">详情</yu-button>
            </yu-toolbar>
          <yu-xtable ref="refTable" selection-type="radio" row-number :data-url="dataUrl" :base-params="params" :default-load="false" condition-key="condition" request-type="POST">
                <yu-xtable-column label="操作流水" prop="serno" ></yu-xtable-column>
                <yu-xtable-column label="员工名称" prop="userName" ></yu-xtable-column>
                <yu-xtable-column label="员工工号" prop="userCode" ></yu-xtable-column>
                <yu-xtable-column label="起始日期" prop="startDate" ></yu-xtable-column>
                <yu-xtable-column label="结束日期" prop="endDate" ></yu-xtable-column>
                <yu-xtable-column label="申请时间" prop="inputDate" ></yu-xtable-column>
                <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="请假销假记录" name="deal">
        <yu-panel title="请假销假记录" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refDealTable" form-type="search" v-model="searchFormdata" >
              <yu-xform-group :column="4">
                <yu-xform-item label="员工名称" ctype="input" name="userName" fuzzy-query="both" ></yu-xform-item>
                <yu-xform-item label="员工工号" ctype="input" name="userCode"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-toolbar>
                <yu-button v-if="checkCtrl('delete')" @click="modify1Fn">销假</yu-button>
                <yu-button @click="infoFn('detail')">查看</yu-button>
            </yu-toolbar>
          <yu-xtable ref="refDealTable" selection-type="radio" row-number :data-url="dataHisUrl" :base-params="params" :default-load="false" condition-key="condition" request-type="POST">
              <yu-xtable-column label="员工名称" prop="userName" ></yu-xtable-column>
              <yu-xtable-column label="员工工号" prop="userCode" ></yu-xtable-column>
              <yu-xtable-column label="请假起始日期" prop="startDate" ></yu-xtable-column>
              <yu-xtable-column label="请假结束日期" prop="endDate" ></yu-xtable-column>
              <yu-xtable-column label="申请时间" prop="inputDate" ></yu-xtable-column>
              <yu-xtable-column label="是否销假" prop="isCancelVacation">
                <template slot-scope="scope">
                  {{ setCancelVacationType(scope.row.isCancelVacation)  }}
                </template>
              </yu-xtable-column>
              <yu-xtable-column label="销假时间" prop="cancelVacationTime" >
                <template slot-scope="scope">
                  {{ setTime(scope.row.cancelVacationTime)  }}
                </template>
              </yu-xtable-column>
              <!--
                <yu-xtable-column label="状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS">
                  <template slot-scope="scope">
                    {{ setName(scope.row.apprStatus)  }}
                  </template>
                </yu-xtable-column>
               -->
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>

    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="isShow" width="750px">
      <yu-xform ref="refForm" label-width="110px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="serno" ctype="input" :hidden="hiddenStatus" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="起始日期" name="startDate" ctype="datepicker" :hidden="hiddenStatus" rules="required"></yu-xform-item>
          <yu-xform-item label="到期日期" name="endDate" ctype="datepicker" :hidden="hiddenStatus" rules="required"></yu-xform-item>
          <yu-xform-item label="销假时间" name="cancelVacationTime" v-model="cancelTime" ctype="datepicker" value-format="yyyy-MM-dd" disabled></yu-xform-item>
          <yu-xform-item label="请假原因" name="vacationResn" ctype="textarea" :hidden="hiddenStatus" :autosize="{ minRows: 3}" colspan="24" rules="required"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" hidden @click="saveFn">保存</yu-button>
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="commitFn">提交</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yufpNwfInit ref="yufpNwfInit" @success-click="refresh"></yufpNwfInit>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_APPR_STATUS');

export default {
  components: { YufpDemoSelector, yufpNwfInit},
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: `${backend.appOcaService}/api/empattendinfo/`,
      dataHisUrl: `${backend.appOcaService}/api/empattendinfo/his`,
      formdata: {},
      params: {},
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
      isShow: false,
      dialogVisible: false,
      formDisabled: false,
      hiddenStatus: false,
      activeName: 'messageTip',
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      attendStatus: '1' // 1-新增请假 2-修改记录 3-销假
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  mounted () {
    if (this.$route.query.param) {
      this.activeName = 'deal';
    } else {
      this.activeName = 'messageTip';
    }
    this.initInfo();
    this.formdata.serno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '111' || op.key === '992') {
          return true;
        }
        return false;
      });
    },
    setTime (time) {
      if (time != null && time != '') {
        return yufp.util.dateFormat(time, '{y}-{m}-{d}');
      } else {
        return '';
      }
    },
    setCancelVacationType (type) {
      if (type === '1') {
        return '是';
      } else {
        return '否';
      }
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
      _this.isShow = false;
      _this.hiddenStatus = false;
    },

    /**
     * 保存  暂废弃该操作
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);

      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }

      var startTimeStamp = Date.parse(new Date(model.startDate));
      var endTimeStamp = Date.parse(new Date(model.endDate));
      var curDate = Date.parse(new Date(_this.getDate()));
      if (_this.viewType == 'ADD' || _this.viewType == 'EDIT') {
        if (startTimeStamp > endTimeStamp) {
          _this.$message({
            message: '起始日期需要小于等于到期日期',
            type: 'warning'
          });
          return;
        }
        if (startTimeStamp < curDate) {
          _this.$message({
            message: '起始日期需要大于等于当前日期',
            type: 'warning'
          });
          return;
        }
        if (model.vacationResn.length > 500) {
          _this.$message({
            message: '请假原因不能超过500字！',
            type: 'warning'
          });
          return;
        }
        // 组装数据
        model.appTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
        model.userCode = _this.loginCode;
        model.userName = _this.userName;
        model.apprStatus = '000';// 待发起
      } else if (_this.viewType == 'CANCEL') {
        if (model.cancelVacationTime == '' || model.cancelVacationTime == null) {
          _this.$message({
            message: '请选择销假日期！',
            type: 'warning'
          });
          return;
        }
        if (model.cancelVacationTime == '' || model.cancelVacationTime == null) {
          _this.$message({
            message: '请选择销假日期！',
            type: 'warning'
          });
          return;
        }
        let obj = _this.$refs.refDealTable.selections[0];
        let _endDate = Date.parse(new Date(obj.endDate));
        let _cancelVacationTime = Date.parse(new Date(model.cancelVacationTime));
        if (_cancelVacationTime < curDate) {
          _this.$message({
            message: '销假日期需大于等于当前日期！',
            type: 'warning'
          });
          return;
        }
        if (_cancelVacationTime >= _endDate) {
          _this.$message({
            message: '销假日期需小于计划请假结束日期！',
            type: 'warning'
          });
          return;
        }
        model.apprStatus = '444';// 销假成功
      }

      if (model.serno) {
        yufp.service.request({
          method: 'POST',
          url: `${backend.appOcaService}/api/empattendinfo/update`,
          data: model,
          callback: function (code, message, response) {
            _this.$refs.refTable.remoteData();
            _this.$refs.refDealTable.remoteData();
            _this.$message('操作成功！');
            _this.dialogVisible = false;
            _this.isShow = false;
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: `${backend.appOcaService}/api/empattendinfo/create`,
          data: model,
          callback: function (code, message, response) {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功！');
            _this.dialogVisible = false;
            _this.isShow = false;
          }
        });
      }
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
      _this.formDisabled = !editable;
      _this.isShow = _this.dialogVisible;
    },

    /**
     * 请假按钮
     */
    addFn: function () {
      var _this = this;
      _this.cancelTime = '';
      _this.dialogVisible = true;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
      _this.attendStatus = '1';
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
      if (_this.userName !== _this.$refs.refTable.selections[0].userName) {
        _this.$message({
          message: '不允许修改他人的记录',
          type: 'warning'
        });
        return;
      }
      if (_this.$refs.refTable.selections[0].apprStatus === '111') {
        _this.$message({
          message: '不允许修改审批中的记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisible = true;
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
        // 是否销假 否
        // 1是 0 否
        _this.formdata.isCancelVacation = '0';
      });
      _this.attendStatus = '2';
    },

    /**
     * 销假
     */
    modify1Fn: function () {
      var _this = this;
      _this.attendStatus = '3';
      var date = new Date();
      _this.cancelTime = _this.setTime(date);
      if (_this.$refs.refDealTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refDealTable.selections[0];
      if (_this.loginCode !== obj.userCode) {
        _this.$message({
          message: '只能销当前登录人的请假申请！',
          type: 'warning'
        });
        return;
      }
      if (obj.apprStatus != '997') {
        _this.$message({
          message: '该笔请假数据无法销假！',
          type: 'warning'
        });
        return;
      }
      // 不需要判断销假日期 随时都可以销假 如在请假时间内则为取消休假，如在请假时间之后则表示假期结束 修改请假状态
      // var endDate = obj.endDate.substr(0, 4) + '/' + obj.endDate.substr(5, 2) + '/' + obj.endDate.substr(8, 2);
      // var _endDate = Date.parse(new Date(endDate));
      // var curDate = Date.parse(new Date(_this.getDate()));
      // if (curDate > _endDate) {
      //   _this.$message({
      //     message: '计划请假结束日期需大于当前日期！',
      //     type: 'warning'
      //   });
      //   return;
      // }
      _this.hiddenStatus = true;
      _this.dialogVisible = true;
      _this.switchStatus('CANCEL', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(obj, _this.formdata);
        // 是否销假 是
        // 1是 0 否
        _this.formdata.isCancelVacation = '1';
        _this.formdata.cancelVacationTime = _this.cancelTime;
      });
    },

    /**
     * 详情
     */
    infoFn: function (val) {
      console.info('_this.val----------', val);
      var _this = this;
      var selectionsAry = '';
      if (val !== 'detail') {
        selectionsAry = _this.$refs.refTable.selections;
      } else {
        selectionsAry = _this.$refs.refDealTable.selections;
      }
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisible = true;
      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },

    // 初始化 数据条件
    initInfo () {
      var _this = this;
      // 员工名称
      _this.formdata.userName = _this.userName;
      _this.formdata.userCode = _this.loginCode;
      // 查询 在途申请
      if (this.$route.query.param) {
        _this.params = { condition: { default: '1', userCode: _this.loginCode}};
      } else {
        _this.params = { condition: { default: '1'}};
      }
    },

    // 流程提交
    commitFn () {
      var _this = this;
      // 待补充
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      var model = {};
      // 组装数据
      model.appTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
      model.userCode = _this.loginCode;
      model.userName = _this.userName;
      model.apprStatus = '000';// 待发起

      yufp.clone(_this.formdata, model);
      var startTimeStamp = Date.parse(new Date(model.startDate));
      var endTimeStamp = Date.parse(new Date(model.endDate));
      var curDate = Date.parse(new Date(_this.getDate()));
      if (_this.viewType == 'ADD' || _this.viewType == 'EDIT') {
        if (startTimeStamp > endTimeStamp) {
          _this.$message({
            message: '起始日期需要小于等于到期日期',
            type: 'warning'
          });
          return;
        }
        if (startTimeStamp < curDate) {
          _this.$message({
            message: '起始日期需要大于等于当前日期',
            type: 'warning'
          });
          return;
        }
        if (model.vacationResn.length > 500) {
          _this.$message({
            message: '请假原因不能超过500字！',
            type: 'warning'
          });
          return;
        }
      } else if (_this.viewType == 'CANCEL') {
        // 不需要判断销假日期 随时都可以销假 如在请假时间内则为取消休假，如在请假时间之后则表示假期结束 修改请假状态
        // if (model.cancelVacationTime == '' || model.cancelVacationTime == null) {
        //   _this.$message({
        //     message: '请选择销假日期！',
        //     type: 'warning'
        //   });
        //   return;
        // }
        // if (model.cancelVacationTime == '' || model.cancelVacationTime == null) {
        //   _this.$message({
        //     message: '请选择销假日期！',
        //     type: 'warning'
        //   });
        //   return;
        // }
        // let obj = _this.$refs.refDealTable.selections[0];
        // let _endDate = Date.parse(new Date(obj.endDate));
        // let _cancelVacationTime = Date.parse(new Date(model.cancelVacationTime));
        // if (_cancelVacationTime < curDate) {
        //   _this.$message({
        //     message: '销假日期需大于等于当前日期！',
        //     type: 'warning'
        //   });
        //   return;
        // }
        // if (_cancelVacationTime > _endDate) {
        //   _this.$message({
        //     message: '销假日期需小于计划请假结束日期！',
        //     type: 'warning'
        //   });
        //   return;
        // }
        model.apprStatus = '444';// 销假成功
      }
      if (_this.attendStatus === '2' || _this.attendStatus === '3') {
        model.updId = _this.loginCode;
        model.updBrId = _this.org.code;
        model.updDate = _this.$xutils.getDefaultformulaData('$CURRTIME');
        model.upDateTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
        this.$request({
          method: 'POST',
          url: `${backend.appOcaService}/api/empattendinfo/update`,
          data: model
        }).then((response) => {
          if (response !== undefined) {
            _this.$refs.refTable.remoteData();
            _this.$refs.refDealTable.remoteData();
            _this.dialogVisible = false;
            _this.isShow = false;
            if (_this.attendStatus === '2') {
              // 流程发起
              let wfInitData = {};
              wfInitData.systemId = 'cmis';
              wfInitData.orgId = _this.org.code;
              wfInitData.userId = _this.loginCode;
              wfInitData.bizId = model.serno;
              wfInitData.bizType = 'XT001';
              wfInitData.bizUserName = '';
              wfInitData.bizUserId = '';
              wfInitData.param = {'orgId': _this.org.code};
              _this.$refs.yufpNwfInit.wfInit(wfInitData);
            }
          }
        });
      } else {
        model.inputId = _this.loginCode;
        model.inputBrId = _this.org.code;
        model.inputDate = _this.$xutils.getDefaultformulaData('$CURRTIME');
        model.createTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
        this.$request({
          method: 'POST',
          url: `${backend.appOcaService}/api/empattendinfo/create`,
          data: model
        }).then((response) => {
          if (response !== undefined) {
            _this.$refs.refTable.remoteData();
            _this.dialogVisible = false;
            _this.isShow = false;
            // 流程发起
            let wfInitData = {};
            wfInitData.systemId = 'cmis';
            wfInitData.orgId = _this.org.code;
            wfInitData.userId = _this.loginCode;
            wfInitData.bizId = response.data.serno;
            wfInitData.bizType = 'XT001';
            wfInitData.bizUserName = '';
            wfInitData.bizUserId = '';
            wfInitData.param = {'orgId': _this.org.code};
            _this.$refs.yufpNwfInit.wfInit(wfInitData);
          }
        });
      }
    },

    // 获取当前年月日
    getDate () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var month2 = month > 9 ? month : '0' + month;
      var day2 = day > 9 ? day : '0' + day;
      return year + '/' + month2 + '/' + day2;
    },

    // 增加销假成功的状态
    setName (apprStatus) {
      if (apprStatus == '444') {
        return '销假成功';
      } else {
        return this.$lookup.convertMultiKey('STD_ZB_APPR_STATUS', apprStatus);
      }
    },
    // 刷新列表
    refresh () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
