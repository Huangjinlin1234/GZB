<template>
  <!--
    @created by creazyCder 2021-05-20 10:08:43
    @updated by 2021-05-20 10:08:43
    @updated by 2021-05-20 10:08:43
    @description 还款计划变更申请-增删改查
  -->
  <div>
    <yu-panel title="贷款基本信息" panel-type="simple">
      <yu-xform ref="refForm1" label-width="160px" v-model="formdata.base" :disabled="true">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款金额" name="loanAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款余额" name="loanBalance" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款起始日" name="loanStartDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款到期日" name="loanEndDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="业务条线" name="belgLine" disabled ctype="input" hidden></yu-xform-item> 
          <yu-xform-item label="审批状态" name="contApproveStatus" ctype="input" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="原还款方式信息" panel-type="simple">
      <template slot="right">
        <yu-button-drop type="button">
          <yu-button key="add" type="primary" @click="handleClickOld">原还款计划查询</yu-button>
        </yu-button-drop>
      </template>
      <yu-xform ref="refForm2" label-width="160px" v-model="formdata.old" :disabled="true">
        <yu-xform-group>
          <yu-xform-item label="原还款方式" name="oldRepayMode" ctype="select" data-code="STD_REPAY_MODE"></yu-xform-item>
          <yu-xform-item label="原结息间隔周期" name="oldEiIntervalCycle" ctype="input"  :colspan="8"></yu-xform-item>
          <yu-xform-item label="" name="oldEiIntervalUnit" ctype="select" data-code="STD_RATE_ADJ_UNIT" :colspan="4"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable v-show="oldRepayplanShow" ref="refTableOldPlan" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="期数" prop="terms"></yu-xtable-column>
        <yu-xtable-column label="还款日期" prop="repayDate"></yu-xtable-column>
        <yu-xtable-column label="还款金额" prop="repayAmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="变更后的还款方式信息" panel-type="simple">
      <template slot="right">
        <yu-button-drop type="button">
          <yu-button key="add" type="primary" @click="handleClick" v-if="calcbtn">变更后还款计划试算</yu-button>
        </yu-button-drop>
      </template>
      <yu-xform ref="refForm" label-width="160px" v-model="formdata.now" :disabled="nowformDisabled">
        <yu-xform-group>
          <yu-xform-item label="还款方式" name="repayMode" rules="required" @change="showplan" :disabled="pageParams.opType == 'VIEW' ||isSign" ctype="select" data-code="STD_REPAY_MODE" exclude-key="A012,A013,A014,A015,A016,A017,A018,A019,A020,A021,A022,A023,A030,A031,A041"></yu-xform-item>
          <yu-xform-item label="结息间隔周期" name="eiIntervalCycle" :rules="rules1" ctype="input" :disabled="pageParams.opType == 'VIEW' ||isSign" :colspan="8"></yu-xform-item>
          <yu-xform-item label="" name="eiIntervalUnit" ctype="select" :rules="rules1" data-code="STD_RATE_ADJ_UNIT" :disabled="pageParams.opType == 'VIEW' ||isSign" :colspan="4"></yu-xform-item>
        </yu-xform-group>
        <div v-show="repayplanShow">
          <div class="yu-toolBar" v-if="!isSign && pageParams.opType != 'VIEW'">
            <yu-button-group>
              <yu-button @click="addFn">新增</yu-button>
              <yu-button @click="modifyFn">修改</yu-button>
              <yu-button @click="infoFn">详情</yu-button>
              <yu-button @click="deleteFn">删除</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable style="margin-top: 10px" ref="refTablePlan" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" :base-params="baseParamsSerno" :default-load="false">
            <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="期数" prop="terms"></yu-xtable-column>
            <yu-xtable-column label="还款日期" prop="repayDate"></yu-xtable-column>
            <yu-xtable-column label="还款金额" prop="repayAmt"></yu-xtable-column>
          </yu-xtable>
        </div>
        <yu-xform-group style="margin-top: 10px">
          <yu-xform-item label="补充协议签订日期" name="signDate" :disabled="pageParams.opType == 'VIEW'" ctype="datepicker" rules="required" :hidden="!isSign"></yu-xform-item>
          <yu-xform-item label="补充协议编号" name="argNo" disabled ctype="input" :hidden="!isSign" ></yu-xform-item>
          <yu-xform-item label="申请原因" name="appResn" :disabled="pageParams.opType == 'VIEW' || isSign" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="登记信息" panel-type="simple">
      <yu-xform ref="refForm3" label-width="160px" v-model="formdata.input" :disabled="true">
        <yu-xform-group>
          <yu-xform-item label="登记人" name="inputIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="责任人" name="managerIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="责任机构机构" name="managerBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="tempSave" v-if="pageParams.opType !== 'VIEW'">暂存</yu-button>
      <yu-button type="primary" @click="submit" v-if="pageParams.opType !== 'VIEW'">提交</yu-button>
      <yu-button type="primary" @click="back" v-if="!pageParams.flowPage">返回</yu-button>
    </div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="160px" v-model="planformdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="期数" placeholder="期数" rules="required" name="terms" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款日期" placeholder="还款日期" rules="required" name="repayDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="还款金额" placeholder="还款金额" rules="required" name="repayAmt" ctype="num"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialogVisible = !dialogVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yu-xdialog title="还款计划试算" :visible.sync="repayPlandialogVisible" size="large ">
      <yu-xtable style="margin-top: 10px" ref="refRepayPlan" selection-type="radio" row-number request-type="POST" :data-url="repayPlanDataUrl" condition-key="condition" :base-params="refRepayPlanParams" :default-load="true">
        <yu-xtable-column label="本期期数" prop="benqqish"></yu-xtable-column>
        <yu-xtable-column label="起息日期" prop="qixiriqi"></yu-xtable-column>
        <yu-xtable-column label="还款日期" prop="huankriq"></yu-xtable-column>
        <yu-xtable-column label="宽限期到期日" prop="kxqdqirq"></yu-xtable-column>
        <yu-xtable-column label="计息本金" prop="jixibenj"></yu-xtable-column>
        <yu-xtable-column label="累计产生利息" prop="leijcslx"></yu-xtable-column>
        <yu-xtable-column label="每期还款总额" prop="meiqhkze"></yu-xtable-column>
        <yu-xtable-column label="账户余额" prop="zhanghye"></yu-xtable-column>
      </yu-xtable>
    </yu-xdialog>
    <yufpNwfInit ref="yufpNwfInit" @success-click="back"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('CRUD_TYPE,STD_REPAY_MODE');
import { mapGetters } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { yufpNwfInit },
  props: {
    pageParams: Object,
    dialogId: String
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/repaycapplan/',
      updateUrl: this.$backend.cmisBiz + '/api/iqprepaywaychg/update',
      addUrl: this.$backend.cmisBiz + '/api/iqprepaywaychg/',
      formdata: {},
      planformdata: {},
      dialogVisible: false,
      nowformDisabled: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      baseParams: {},
      oldRepayplanShow: false,
      repayplanShow: false,
      calcbtn: true,
      rules1 : '',
      // 是否签订页面
      isSign: false,
      // 借款计划
      repayPlandialogVisible: false,
      refRepayPlanParams: {},
      repayPlanDataUrl: this.$backend.cmisBiz + '/api/iqprepaywaychg/queryRepayPlan'
    };
  },
  mounted () {
    this.initData();
    // 查询时不可编辑
    this.baseParamsSerno = { condition: { serno: this.pageParams.iqpSerno } };
    if (this.pageParams.opType == 'VIEW') {
      this.nowformDisabled = true;
    }
    if (this.pageParams.opDetialType) {
      this.isSign = true;
    }
    this.getBelgLine();
  },
  methods: {
    initData: function () {
      let _this = this;
      this.$request({
        url: this.$backend.cmisBiz + '/api/iqprepaywaychg/' + this.pageParams.iqpSerno,
        method: 'post'
      }).then(({ code, message, data }) => {
        if (data) {
          /** 展示还款计划 */
          // TODO 字典完全对不上
          this.oldRepayplanShow = true;
          this.baseParams = { condition: { billNo: data.billNo, oprType: '01' } };
          yufp.clone(data, _this.formdata.base);
          yufp.clone(data, _this.formdata.old);
          yufp.clone(data, _this.formdata.now);
          yufp.clone(data, _this.formdata.input);
          if (_this.formdata.now.repayMode == 'A030'|| _this.formdata.now.repayMode == 'A040') {
             this.repayplanShow = true;
             this.calcbtn = false;
          } else {
            this.repayplanShow = false;
            this.calcbtn = true;
          }
        }
      });
    },
    showplan (newval) {

      if(newval=='A009'){
        _this.rules1 = [
          {
            required: false,
            message: '非必填项',
            trigger: 'blur'
          }
        ];
      }else{
        _this.rules1 = [
          {
            required: true,
            message: '非必填项',
            trigger: 'blur'
          }
        ];
      }
      if (newval == 'A030'|| newval == 'A040') {
        this.repayplanShow = true;
        this.calcbtn = false;
      } else {
        this.repayplanShow = false;
        this.calcbtn = true;
      }
    },
    /** 变更后还款计划试算 */
    handleClickOld () {
      var model = {};
      yufp.clone(this.formdata.base, model);
      model.repayMode = this.formdata.base.oldRepayMode;
      model.eiIntervalCycle = this.formdata.base.oldEiIntervalCycle;
      model.eiIntervalUnit = this.formdata.base.oldEiIntervalUnit;
      model.appResn = 'old'; // 变更前直接去核心查询原还款计划 
      this.refRepayPlanParams = {condition: model};
      this.repayPlandialogVisible = true;
    },
    handleClick () {
      var model = {};
      yufp.clone(this.formdata.now, model);
      this.refRepayPlanParams = {condition: model};
      this.repayPlandialogVisible = true;
    },
    back: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    /** 提交 */
    submit () {
      // 保存
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      const saveResult = this.tempSave();
      if (!saveResult || saveResult.code != '0') {
        return;
      }
      var _this = this;
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.org.code;
      startdto.userId = _this.loginCode;
      startdto.bizId = _this.formdata.base.iqpSerno;
      startdto.bizUserName = _this.formdata.base.cusName;
      startdto.bizUserId = _this.formdata.base.cusId;
      startdto.param = {};
      //小微
      if(_this.formdata.base.belgLine == '01'){
          startdto.bizType = 'BG034';
      }
      //零售
      if(_this.formdata.base.belgLine == '02'){
          startdto.bizType = 'BG036';
      }
      //对公
      if(_this.formdata.base.belgLine == '03'){
          startdto.bizType = 'BG035';
          startdto.param = {
            approveStatus: _this.formdata.base.contApproveStatus,
            contAmt: _this.formdata.base.loanAmt
        };
      } 
      const userInfo = _this.$xutils.getLoginUserInfo();
      if('A' == userInfo.org.orgType){
        if (userInfo.orgCode.startsWith('80')) {
            startdto.bizType = 'SGH11';// （寿光）
          } else if (userInfo.orgCode.startsWith('81')) {
            startdto.bizType = 'DHH11';// （东海）
          }
      }
       console.log('业务类型--->', startdto.bizType);
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    tempSave () {
      let jsoRt = null;
      var model = {};
      yufp.clone(this.formdata.base, model);
      yufp.clone(this.formdata.now, model);
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: model,
        async: false,
        success: response => {
          if (response.code == '0') {
            jsoRt = response;
            this.$message('更新成功!');
            // 回调数据
            this.pageParams.callback && this.pageParams.callback();
            // this.back();
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
      return jsoRt;
    },
    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      this.viewType = viewType;
      this.saveBtnShow = editable;
      this.dialogVisible = true;
      this.formDisabled = !editable;
    },
    saveFn () {
      let _this = this;
      let model = {};
      yufp.clone(_this.planformdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let url = this.$backend.cmisBiz + '/api/repaycapplan/create';
      if (this.viewType == 'EDIT') {
        url = this.$backend.cmisBiz + '/api/repaycapplan/update';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTablePlan.remoteData();
            _this.$message({ message: '数据新增成功！', type: 'info' });
            _this.dialogVisible = false;
          } else {
            _this.$message({ message: '数据新增失败！', type: 'error' });
          }
        }
      });
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        _this.planformdata.serno = _this.formdata.base.iqpSerno;
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      if (_this.$refs.refTablePlan.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        let obj = _this.$refs.refTablePlan.selections[0];
        yufp.clone(obj, _this.planformdata);
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refTablePlan.selections;
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
        yufp.clone(selectionsAry[0], _this.planformdata);
      });
    },
    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.refTablePlan.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let arr = [];
      for (let i = 0; i < selections.length; i++) {
        arr.push(selections[i].pkId);
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/repaycapplan/batchdelete/' + arr.join(','),
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info' });
                  _this.$refs.refTablePlan.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    cancelFn: function () {
      this.getFactory.back();
    },

    // 查询业务条线
    getBelgLine(){
      var model = {};
      var _this = this;
      model.billNo = _this.pageParams.billNo;
      _this.$request({
      url: _this.$backend.cmisBiz + '/api/accloan/querymodel',
        method: 'post',
        data: JSON.stringify({ condition: JSON.stringify(model) })
      }).then((response) => {
       if (response.code == '0') {
            _this.formdata.base.belgLine = response.data[0].belgLine;
       }
      })
    }
  }
};
</script>
