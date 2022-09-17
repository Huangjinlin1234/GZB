
<template>
  <!--
    @created by lixm 2021-06-11
    @description 授信抵押物价值认定申请信息-增删改查
  -->
  <div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
      <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" name="serno" ctype="input" rules="required" disabled></yu-xform-item>
          <!-- <yu-xform-item label="借款人名称" placeholder="借款人名称" name="cusName" ctype="input" rules="required" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item> -->
          <yu-xform-item label="借款人名称" ctype="yu-xcustom-ref" name="cusName" rules="required" placeholder="借款人名称" @select-fn="commonCusSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','cusRankCls':'cusRankCls'}" idField="cusId"
            width="800" height="500" pagePath="cusmanage/cusRelevance/cusForComLoanIndex" title="借款人选取"></yu-xform-item>
          <yu-xform-item label="借款人客户编号" placeholder="借款人客户编号" name="cusId" ctype="input" rules="required" disabled></yu-xform-item>
           <yu-xform-item label="授信业务流水号" placeholder="授信业务流水号" name="lmtSerno" ctype="input"  @click="goSingleCustomer" @click.stop icon="search" disabled></yu-xform-item>
          <yu-xform-item label="上报原因" placeholder="上报原因" name="appResn" ctype="checkbox" value-type="string" data-code="STD_GRT_APPROVE_RESN" rules="required" :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="抵押物情况" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="grtRelTable" :pageable="false" :data-url="grtdataUrl" :parse-response="requestSuccess" :default-load="false" selection-type="radio">
          <yu-xtable-column label="押品编号" prop="guarNo"></yu-xtable-column>
          <yu-xtable-column label="抵押人名称 " prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="房屋坐落位置" prop="housePlace"></yu-xtable-column>
          <yu-xtable-column label="房屋建筑面积（平方米）" prop="houseBuildSqu"></yu-xtable-column>
          <yu-xtable-column label="土地使用权面积（平方米）" prop="landUtilSqu"></yu-xtable-column>
          <yu-xtable-column label="房产类型" prop="houseType" data-code="STD_ZB_HOUSE_PROPERTY_CLS"></yu-xtable-column>
          <yu-xtable-column label="土地用途" prop="landUse" data-code="STD_ZB_LANDYT"></yu-xtable-column>
          <yu-xtable-column label="土地使用权性质" prop="evalSource" data-code="STD_ZB_LAND_TYPE"></yu-xtable-column>
          <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="addFn">新增</yu-button>
        <yu-button v-show="saveBtnShow" type="primary" @click="modifyFn">修改</yu-button>
        <yu-button v-show="saveBtnShow" type="primary" @click="deleteFn">删除</yu-button>
      </div>

      <yu-panel title="评估情况" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="cadaSubTable" :pageable="false" :data-url="cadadataUrl" :default-load="false">
          <yu-xtable-column label="押品编号" prop="guarNo"></yu-xtable-column>
          <yu-xtable-column label="房产评估价值（万元）" prop="realproEvalValue" maxlength="10" number-formatter="0,000.00" ></yu-xtable-column>
          <yu-xtable-column label="土地评估价值（万元） " prop="landEvalValue" maxlength="10" number-formatter="0,000.00"></yu-xtable-column>
          <yu-xtable-column label="房地产评估总价（万元）" prop="realproEvalTotalValue" maxlength="10" number-formatter="0,000.00"></yu-xtable-column>
          <yu-xtable-column label="评估机构名称" prop="evalOrgName"></yu-xtable-column>
          <yu-xtable-column label="评估报告出具时间" prop="evalReportTime"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="支行认定意见" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="branchSubTable" :pageable="false" :data-url="branchdataUrl" :default-load="false">
          <yu-xtable-column label="押品编号" prop="guarNo"></yu-xtable-column>
          <yu-xtable-column label="房产确认价值（万元）" prop="realproCfirmValue" maxlength="10" number-formatter="0,000.00"></yu-xtable-column>
          <yu-xtable-column label="土地确认价值（万元） " prop="landCfirmValue" maxlength="10" number-formatter="0,000.00"></yu-xtable-column>
          <yu-xtable-column label="房地产确认总价（万元）" prop="realproCfirmTotalValue" maxlength="10" number-formatter="0,000.00"></yu-xtable-column>
          <yu-xtable-column label="该抵押物项下申请的融资金额（万元）" prop="pldAppFinPrice" maxlength="10" number-formatter="0,000.00"></yu-xtable-column>
          <yu-xtable-column label="房地产抵押情况" prop="realproPldCase" data-code="STD_REALPRO_PLD_CASE"></yu-xtable-column>
          <yu-xtable-column label="抵押到期日" prop="pldEndDate"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="客户经理说明" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="需要说明的情况" ctype="textarea" rules="required" name="caseMemo" :rows="3" :colspan="24" placeholder="2000个字符以内"></yu-xform-item>
          <yu-xform-item label="客户经理意见" ctype="textarea" rules="required" name="managerAdvice" :rows="3" :colspan="24" placeholder="2000个字符以内"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="申请日期" placeholder="申请日期" name="inputDate" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户经理" placeholder="客户经理" name="inputIdName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="分支机构" placeholder="分支机构" name="InputBrName" ctype="input" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>

      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-show="submitBtnShow" icon="check" type="primary" @click="submitFn">提交</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn" v-show="cancelBtnShow">返回</yu-button>
      </div>
    </yu-xform>

    <yu-xdialog title="授信影像资料" :visible.sync="show_dialog_img" width="90%" height="100%">
      <imageSystem v-if="show_img" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
    </yu-xdialog>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { clone, lookup, dateFormat } from '@/utils';
import { mapState } from 'vuex';
import { validator } from '@/utils/validate';
import {toSingleCustomer, selectCustomer} from '@/utils/unitchange';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg(
  'STD_GRT_APPROVE_RESN,STD_HOUSE_TYPE,STD_LAND_USE,STD_LAND_USE_CHA,STD_REALPRO_PLD_CASE,STD_ZB_HOUSE_PROPERTY_CLS,STD_ZB_LANDYT,STD_ZB_LAND_TYPE'
);
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  mixins: [toSingleCustomer, mixinForm, selectCustomer],
  name: 'OtherGrtValueIdentyAppInfo',
  components: { yufpNwfInit, imageSystem },
  props: {
    applyInfoParams: Object
  },
  data: function () {
    return {
      // dataUrl: this.$backend.cmisBiz + '/api/othergrtvalueidentyapp/getothergrtvalueidentyapp',
      dataUrl: this.$backend.cmisBiz + '/api/othergrtvalueidentyapp/selectByModel',
      updateUrl:
        this.$backend.cmisBiz +
        '/api/othergrtvalueidentyapp/updateothergrtvalueidentyapp',
      addUrl:
        this.$backend.cmisBiz +
        '/api/othergrtvalueidentyapp/addothergrtvalueidentyapp',
      grtdataUrl: this.$backend.cmisBiz + '/api/othergrtvalueidentyrel/', // 抵押物情况
      cadadataUrl: this.$backend.cmisBiz + '/api/othergrtvaluecadaidentysub/', // 评估情况
      branchdataUrl:
        this.$backend.cmisBiz + '/api/othergrtvaluebranchidentysub/', // 支行认定意见
      formdata: {},
      formDisabled: false,
      viewType: 'DETAIL',
      saveBtnShow: true,
      submitBtnShow: true,
      cancelBtnShow: true,
      show_img: false,
      show_dialog_img: false
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.oauth.userName,
      userCode: (state) => state.oauth.userCode,
      org: (state) => state.oauth.org
    })
  },
  mounted () {
    console.log('=========applyInfoParams', this.applyInfoParams);
    var biz = this.applyInfoParams;
    // if (biz == 'undefined' || biz == null || biz == '') {
    // this.parentRoutName = this.$route.meta.params.name;
    // this.viewType = this.$route.meta.params.actionType;
    this.viewType = biz.actionType;
    this.$nextTick(() => {
      if (this.viewType == 'DETAIL') {
        clone(biz.data, this.formdata);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
      } else if (this.viewType == 'EDIT') {
        clone(biz.data, this.formdata);
        this.formdata.inputIdName = this.userInfo;
        this.formdata.inputId = this.userCode;
        this.formdata.inputBrId = this.org.code;
        this.formdata.updId = this.userCode;
        this.formdata.updBrId = this.org.code;
      } else if (this.viewType == 'ADD') {
        this.formdata.serno = biz.data.serno;
        this.formdata.inputIdName = this.userInfo;
        this.formdata.inputId = this.userCode;
        this.formdata.inputBrId = this.org.code;
        this.formdata.updId = this.userCode;
        this.formdata.updBrId = this.org.code;
        this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
      }
      this.formdata.InputBrName = this.org.name;
      this.refreshGrtTable();
    });
    // } else {
    // 流程页面时获取详情信息
    // function getDetails(){
    //   let reqData = {
    //     condition: JSON.stringify({ serno: this.applyInfoParams.serno })
    //   };
    //   var _this = this;
    //   this.$request({
    //     url: _this.dataUrl,
    //     method: 'POST',
    //     data: reqData
    //   }).then(({ code, message, data }) => {
    //     if (code == '0') {
    //       _this.$nextTick(() => {
    //         clone(data[0], _this.formdata);
    //       });
    //     } else {
    //       _this.$message({ message: message || '操作失败', type: 'error' });
    //     }
    //   });

    //   this.formDisabled = true;
    //   this.saveBtnShow = false;
    //   this.submitBtnShow = false;
    //   this.cancelBtnShow = false;
    //   this.refreshGrtTable();
    // }

    // }
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshGrtTable', this.refreshGrtTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshGrtTable');
  },
  methods: {
    refreshGrtTable: function () {
      this.$refs.grtRelTable.remoteData({
        condition: { serno: this.applyInfoParams.serno ? this.applyInfoParams.serno : this.formdata.serno, oprType: '01' }
      });
      this.$refs.cadaSubTable.remoteData({
        condition: { serno: this.applyInfoParams.serno ? this.applyInfoParams.serno : this.formdata.serno, oprType: '01' }
      });
      this.$refs.branchSubTable.remoteData({
        condition: { serno: this.applyInfoParams.serno ? this.applyInfoParams.serno : this.formdata.serno, oprType: '01' }
      });
    },
    /**
     * 押品新增按钮
     */
    addFn: function () {
      var _this = this;
      if (this.viewType != 'EDIT') {
        _this.$message({ message: '新增前请先保存', type: 'info' });
        return;
      }
      let dialogData = {
        op: 'ADD', // 操作类型
        serno: _this.formdata.serno
      };
      _this.$dialog.open(
        '抵押物信息',
        'zrcbank/biz/creditManage/otherItem/otherApprove/otherGrtValueIdentyApp/otherGrtValueIdentyAppAdd/OtherGrtValueIdentyRelInfo',
        1000,
        500,
        dialogData
      );
      /*
      var url = this.$backend.cmisBiz + '/api/othergrtvalueidentyapp/checkothergrtvalueidentyapp';
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
            _this.$dialog.open('抵押物信息',
            'zrcbank/biz/creditManage/otherItem/otherApprove/otherGrtValueIdentyApp/otherGrtValueIdentyAppAdd/OtherGrtValueIdentyRelInfo',
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

    // 客户选取
    goCustomer () {
      var _this = this;
      if (!_this.saveBtnShow) {
        return;
      }
      var dialogData = {};
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.cusId = retVal.cusId;
          _this.formdata.cusName = retVal.cusName;
          _this.$request({
            method: 'POST',
            url: backend.cmisBiz + '/api/lmtreplyacc/querylmtreplyaccdatabyparams',
            data: _this.formdata.cusId
          }).then((data) => {
            _this.formdata.lmtSerno = data.data == null || data.data == '' ? '' : data.data.serno;
          });
        }
      );
    },
    getCustomer (obj) {
      var _this = this;
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyacc/querylmtreplyaccdatabyparams',
        data: obj.cusId
      }).then((data) => {
        _this.formdata.lmtSerno = data.data == null || data.data == '' ? '' : data.data.serno;
      });
    },

    /**
     * 押品修改按钮
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.grtRelTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.grtRelTable.selections[0];
      var obj = selection;
      obj['op'] = 'EDIT';
      obj['serno'] = _this.formdata.serno;
      _this.$dialog.open(
        '抵押物信息',
        'zrcbank/biz/creditManage/otherItem/otherApprove/otherGrtValueIdentyApp/otherGrtValueIdentyAppAdd/OtherGrtValueIdentyRelInfo',
        1000,
        500,
        obj
      );
    },
    /*
     * 押品删除按钮
     */

    deleteFn: function () {
      var _this = this;
      let selections = _this.$refs.grtRelTable.selections;
      if (selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action == 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/othergrtvalueidentyrel/deleteInfo/' +
                selections[0].pkId,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info' });
                  _this.refreshGrtTable();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    /**
     * 返回
     */
    cancelFn: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
      // 返回列表页面
      yufp.globalEventBus.$emit('refreshOtherGrtValueIdentyAppTable');
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
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      this.totalData = response.total;
    },
    /**
     * 提交按钮
     */
    submitFn: function () {
      if (this.totalData == 0) {
        this.$xutils.showMsgBox('提示', '没有录入抵押物,请确认!');
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
      const bizType = 'QT011';
      const loginUser = _this.$xutils.getLoginUserInfo();
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {
        orgType: loginUser.org.orgType,
        orgId: this.$store.state.oauth.org.code,
        lmtAmt: 'N',
        lowRisk: 'N',
        openTotalLmtAmt: 'N'
      };
      if (loginUser.org.orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          startdto.bizType = 'SGF08';// （寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          startdto.bizType = 'DHF08';// （东海）
        }
      }
      console.log('业务类型--->', startdto.bizType);

      _this.$refs.yufpNwfInit.wfInit(startdto);
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
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success' });
          this.$emit('refreshUrl');
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
          _this.$message({ message: '数据新增失败！', type: 'error' });
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
      }).then(({ code, message, data }) => {
        if (code == '0') {
          this.$emit('refreshUrl');
          if (actionType == 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          } else {
            _this.$message({ message: '数据更新成功！', type: 'success' });
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error' });
        }
      });
    }
  }
};
</script>
