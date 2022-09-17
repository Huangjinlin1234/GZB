
<template>
  <!--
    @created by lixm 2021-06-11
    @description 保证金存款特惠利率申请信息-增删改查
  -->
  <div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
      <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform-group>
        <yu-xform-item label="审批表编号" placeholder="审批表编号" name="serno" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="申请日期" placeholder="申请日期" name="inputDate" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="客户经理" placeholder="客户经理" name="inputIdName" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="分支机构" placeholder="分支机构" name="InputBrName" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="申请理由" placeholder="2000个字符以内" name="appResn" ctype="textarea" rules="required" :rows="3" :colspan="24" ></yu-xform-item>
      </yu-xform-group>
      </yu-panel>

      <yu-panel title="申请特惠利率客户名单" :hideFilter="false" :collapseHide="false">
          <yu-button-drop style="margin-bottom:10px;">
            <yu-button type="primary" v-show="saveBtnShow"  @click="addFn">新增</yu-button>
            <yu-button type="primary" v-show="saveBtnShow"  @click="modifyFn">修改</yu-button>
            <yu-button type="primary" v-show="saveBtnShow"  @click="deleteFn">删除</yu-button>
            <yu-button type="primary" @click="infoFn">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="cusRelTable"  :pageable="false" :data-url="cusdataUrl"  :parse-response="requestSuccess" :default-load="false" selection-type="radio" >
                <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
                <yu-xtable-column label="客户名称 " prop="cusName" ></yu-xtable-column>
                <yu-xtable-column label="评级" prop="cusCrdGrade" data-code="STD_ZB_GRADE_RANK"></yu-xtable-column>
                <yu-xtable-column label="保证金存款利率是否需要申请优惠" prop="isAppPrefer" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
                <yu-xtable-column label="保证金比例" prop="bailPerc" ></yu-xtable-column>
                <yu-xtable-column label="保证金结息方式" prop="bailEiMode" data-code="STD_SECURITY_EI_TYPE"></yu-xtable-column>
                <yu-xtable-column label="如申请上浮，则上浮比例为" prop="upRatePercent" ></yu-xtable-column>
                <yu-xtable-column label="状态" prop="cusListStatus" data-code="STD_CUS_LIST_STATUS"></yu-xtable-column>
              </yu-xtable>
       </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-show="submitBtnShow" icon="check" type="primary" @click="submitFn">提交</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn" v-show="cancelBtnShow">返回</yu-button>
      </div>
    </yu-xform>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import {clone, lookup, dateFormat} from '@/utils';
import { mapState } from 'vuex';
import {validator} from '@/utils/validate';
lookup.reg('STD_ZB_CREDIT_GRADE,STD_ZB_CUS_TYP,STD_ZB_CREDIT_GRADE,STD_SECURITY_EI_TYPE,STD_CUS_LIST_STATUS');
export default {
  name: 'OtherBailDepPreferRateAppInfo',
  components: {yufpNwfInit},
  props: {
    applyInfoParams: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/otherbaildeppreferrateapp/getotherbaildeppreferrateapp',
      updateUrl: this.$backend.cmisBiz + '/api/otherbaildeppreferrateapp/updateotherbaildeppreferrateapp',
      addUrl: this.$backend.cmisBiz + '/api/otherbaildeppreferrateapp/addotherbaildeppreferrateapp',
      cusdataUrl: this.$backend.cmisBiz + '/api/otherbaildeppreferrateappcuslist/', // 客户名单情况
      formdata: {},
      formDisabled: false,
      totalData: '',
      viewType: 'DETAIL',
      saveBtnShow: true,
      submitBtnShow: true,
      cancelBtnShow: true
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },
  mounted () {
    let _this = this;
    // 判断是否流程
    var biz = _this.applyInfoParams;
    if (biz == 'undefined' || biz == null || biz == '') {
      this.parentRoutName = this.$route.params.name;
      this.viewType = this.$route.params.actionType;
      let formData = this.$route.params.data;

      if (this.viewType == 'DETAIL') {
        clone(formData, this.formdata);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
      }
      if (this.viewType == 'EDIT' || this.viewType == 'ADD') {
        clone(formData, this.formdata);

        _this.formdata.inputIdName = _this.userInfo;
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.updId = _this.userCode;
        _this.formdata.updBrId = _this.org.code;
      }
      if (this.viewType == 'ADD') {
        _this.formdata.serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
        _this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
      }
      _this.formdata.InputBrName = _this.org.name;
      this.refreshCusRelTable();
    } else { // 流程页面跳转
      let reqData = {
        condition: JSON.stringify({serno: _this.applyInfoParams.serno})
      };
      this.$request({
        url: _this.dataUrl,
        method: 'POST',
        data: reqData
      }).then(({code, message, data}) => {
        if (code == '0') {
          clone(data[0], _this.formdata);
          this.refreshCusRelTable();
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });

      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
      this.cancelBtnShow = false;
    }
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshCusRelTable', this.refreshCusRelTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshCusRelTable');
  },
  methods: {
    refreshCusRelTable: function () {
      this.$refs.cusRelTable.remoteData({condition: {serno: this.formdata.serno, oprType: '01'}});
    },
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      this.totalData = response.total;
    },
    /**
     * 客户新增按钮
     */
    addFn: function () {
      var _this = this;
      if (this.viewType != 'EDIT') {
        _this.$message({message: '新增前请先保存', type: 'info'});
        return;
      }
      let dialogData = {
        op: 'ADD', // 操作类型
        serno: _this.formdata.serno
      };
      if (_this.formdata.otherType) {
        dialogData['cusId'] = _this.formdata.cusId;
        dialogData['cusName'] = _this.formdata.cusName;
        dialogData['otherType'] = _this.formdata.otherType;
      }
      _this.$dialog.open('保证金存款特惠利率登记',
        'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppCusListInfo',
        1200, 500, dialogData);
      /*
      var url = this.$backend.cmisBiz + '/api/otherbaildeppreferrateapp/checkotherbaildeppreferrateapp';
      var data = _this.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let dialogData = {
              op: 'ADD', // 操作类型
              serno: _this.formdata.serno
            };
            _this.$dialog.open('保证金存款特惠利率登记',
            'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppCusListInfo',
            1000, 500, dialogData);
          } else {
            _this.$message('新增前请先进行保存操作');
          }
        },
        error: (result, b) => {
          _this.$message('新增失败');
        }
      });*/
    },
    /**
     * 客户修改按钮
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.cusRelTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.cusRelTable.selections[0];
      var obj = selection;
      obj['op'] = 'EDIT';
      obj['serno'] = _this.formdata.serno;
      _this.$dialog.open('保证金存款特惠利率登记',
        'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppCusListInfo',
        1000, 500, obj);
    },
    /*
    * 客户删除按钮
     */

    deleteFn: function () {
      var _this = this;
      let selections = _this.$refs.cusRelTable.selections;
      if (selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var cusInfo = _this.formdata.serno + ',' + selections[0].cusId;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action == 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/otherbaildeppreferrateappcuslist/delete',
              data: {
                serno: _this.formdata.serno,
                cusId: selections[0].cusId
              },
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.refreshCusRelTable();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },
    /**
     * 客户查看按钮
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.cusRelTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.cusRelTable.selections[0];
      var obj = selection;
      obj['op'] = 'VIEW';
      obj['serno'] = _this.formdata.serno;
      _this.$dialog.open('保证金存款特惠利率登记',
        'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppCusListInfo',
        1000, 500, obj);
    },
    /**
     * 返回
     */
    cancelFn: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
      // 返回列表页面
      yufp.globalEventBus.$emit('refreshOtherBailDepPreferRateAppTable');
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SAVE');
      } else {
        this.editSaveFn('SAVE');
      }
    },

    /**
     * 提交按钮
     */
    submitFn: function () {
      if (this.totalData == 0) {
        this.$xutils.showMsgBox('提示', '申请特惠利率客户名单为空');
        return;
      }

      if (this.viewType == 'ADD') {
        this.addSaveFn('SUBMIT');
      } else {
        this.editSaveFn('SUBMIT');
      }
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      var isOver = null;
      var dialogData = {};
      const loginUser = _this.$xutils.getLoginUserInfo();
      const bizType = 'QT004';
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = this.$refs.cusRelTable.tabledata[0].cusName;
      startdto.bizUserId = this.$refs.cusRelTable.tabledata[0].cusId;
      if('1' == loginUser.org.orgType){
        _this.$dialog.open(
        '',
        'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppSelectDialog',
        900,
        650,
        dialogData,
        (retVal) => {
          isOver = retVal;
           if(isOver != "1" && isOver != "0"){
           _this.$message({
            message: '请选择是否保证金超过1000万',
            type: 'warning'
          });
          return;
         }
         if(isOver == "1"){
          isOver = "Y";
         }else{
           isOver = "N";
         }
          startdto.param = {orgType: loginUser.org.orgType, amtType: isOver};
          console.log('业务类型--->', startdto.bizType);
          _this.$refs.yufpNwfInit.wfInit(startdto);
        },
        true,
        true
      );
      }else {
        startdto.param = {orgType: loginUser.org.orgType, amtType: "N"};
        if('A' == loginUser.org.orgType){
         if (loginUser.orgCode.startsWith('80')) {
                startdto.bizType = 'SGF05';// （寿光）
          } else if (loginUser.orgCode.startsWith('81')) {
                startdto.bizType = 'DHF05';// （东海）
          }
        }
        console.log('业务类型--->', startdto.bizType);
        _this.$refs.yufpNwfInit.wfInit(startdto);
      }

    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      // yufp.frame.removeTab(this.$route.path);
      this.cancelFn();
    },

    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }

      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.addUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success'});
          if (actionType == 'SUBMIT') {
            let params = {
              serno: data.serno,
              certCode: data.certCode
            };
            this.submitProcessFun(params);
          }
          if (this.viewType == 'ADD') {
            this.viewType = 'EDIT';
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.updateUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (actionType == 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          } else {
            _this.$message({ message: '数据更新成功！', type: 'success'});
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error'});
        }
      });
    }
  }
};
</script>
