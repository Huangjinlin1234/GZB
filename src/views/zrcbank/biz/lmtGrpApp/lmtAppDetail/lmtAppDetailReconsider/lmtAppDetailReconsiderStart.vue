<template>
  <div>
    <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata" :disabled="form1Disabled">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" ctype="input" name="serno" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" name="cusType" :rules="baseFormRules[1]" data-code="STD_SX_LMT_TYPE" disabled="true"></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" :rules="baseFormRules[2]" data-code="EDUCATION_TYPE" disabled="true"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" :rules="baseFormRules[3]" data-code="IDENT_TYPE" disabled="true"></yu-xform-item>
          <yu-xform-item label="授信期限" ctype="input" name="lmtTerm" :rules="baseFormRules[4]"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" row-number :data-url="`${$backend.cmisBiz}/api/lmtgrpmemrel/getMemrelList?ids=1`" request-type="POST">
        <yu-xtable-column label="成员客户" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusId" sortable></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType" data-code="NATIONALITY"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="inputBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!--<yu-panel title="原授信批复信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm1" label-width="100px" v-model="baseFormdata2" :disabled="form2Disabled">
        <yu-xform-group>
          <yu-xform-group>
            <yu-xform-item label="原授信批复编号" ctype="input" name="origiLmtReplySerno" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
            <yu-button type="primary" @click="viewFn">查看</yu-button>
          </yu-xform-group>
          <yu-xform-item label="原授信期限" ctype="input" name="origiLmtTerm" :rules="baseFormRules[1]" disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>-->
    <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm3" label-width="100px" v-model="baseFormdata3" :disabled="form3Disabled">
        <yu-xform-group>
          <yu-xform-item label="登记人" ctype="input" name="inputId" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId" :rules="baseFormRules[1]" data-code="GENDER" disabled="true"></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" name="managerId" :rules="baseFormRules[2]" data-code="EDUCATION_TYPE" disabled="true"></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" name="managerBrId" :rules="baseFormRules[3]" data-code="IDENT_TYPE" disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" :rules="baseFormRules[4]" disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group column="3">
          <yu-xform-item label="集团客户名称" ctype="num" name="id" :hidden="true" disabled="true"></yu-xform-item>
          <yu-xform-item label="集团客户编号" rules="required" ctype="input" name="title" disabled="true"></yu-xform-item>
          <yu-xform-item label="批复编号" rules="required" ctype="input" name="createAt" disabled="true"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" v-show="saveBtnShow" @click="nextFn">下一步</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yu-form-buttons align="center">
      <yu-button type="primary">暂存</yu-button>
      <yu-button type="primary" @click="commit">提交 </yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('NATIONALITY,PUBLISH_STATUS,STD_SX_LMT_TYPE,EDUCATION_TYPE,IDENT_TYPE');
import { sessionStore } from 'xy-utils';
export default {
  data: function () {
    return {
      expandCollapseName: ['base'],
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      baseFormdata: {},
      baseFormdata1: {},
      baseFormdata2: {},
      baseFormdata3: {},
      formdata: {},
      refForm: {},
      refForm1: {},
      refForm3: {},
      formDisabled: false,
      dialogVisible: false,
      form1Disabled: false,
      form2Disabled: false,
      form3Disabled: false,
      dialogVisibleReply: false,
      saveBtnShow: true,
      pkId: ''
    };
  },
  activated () {
    // this.$refs.refForm1.setFormData(this.$route.params.formData || {});
    // this.$refs.refForm1.setFormData(sessionStore.get('name') || {});
    console.log('==============begin===============');
    console.log(this);
    console.log(this.$route.params.serno);
    console.log(this.$route.params.pkId);
    this.pkId = this.$route.params.pkId;
    console.log('==============END===============');
    var _this = this;
    // var pkId = 'c38c9c69-b8da-46cb-b5ba-f2989009c459';
    var retdata;
    // 1.根据serno到数据库进行查询并赋值
    var retdata;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrpapp/' + this.pkId,
      callback: function (code, message, response) {
        retdata = response.data || {};
        // debugger;
        if (code == 0) {
          //  //获取数据赋值显示,没有数据空白显示
          _this.baseFormdata.serno = retdata.serno || '';
          _this.baseFormdata.cusType = retdata.cusType || '';
          _this.baseFormdata.grpCusId = retdata.grpCusId || '';
          _this.baseFormdata.grpCusName = retdata.grpCusName || '';
          _this.baseFormdata.lmtTerm = retdata.lmtTerm || '';
          _this.baseFormdata2.origiLmtReplySerno = retdata.origiLmtReplySerno || '';
          _this.baseFormdata2.origiLmtTerm = retdata.origiLmtTerm || '';
          _this.baseFormdata3.inputId = retdata.inputId || '';
          _this.baseFormdata3.inputBrId = retdata.inputBrId || '';
          _this.baseFormdata3.managerId = retdata.managerId || '';
          _this.baseFormdata3.managerBrId = retdata.managerBrId || '';
          _this.baseFormdata3.inputDate = retdata.inputDate || '';

          // 1.todo 设置不可不可编辑状态
          // _this.form1Disabled = true;
          // _this.form2Disabled = true;
          // _this.form3Disabled = true;
          // 2.使用disbales实现
        } else {
          _this.$message('查询失败');
        }
        _this.dialogVisible = false;
      }
    });
  },
  mounted () {},
  methods: {
    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      // _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     *  提交按钮，保存到数据库中
     */
    commit: function (viewType, editable) {
      console.log('======commit事件被执行===');

      var _this = this;

      // 0.todo 数据校验

      // 1.获取校验参数,这里是多个form 表单，直接获取赋值，子界面到后台传值，更新流水号,操作类型传递呢？
      // 只能根据PKID 查询返回一个model.
      // var model={};
      // yufp.clone(_this.$refs.cusCorpBase.formdata, model);

      // 2.查询之后返回，从界面得到期限数值
      // var pkId = 'c38c9c69-b8da-46cb-b5ba-f2989009c459';

      var ret;
      var LmtGrpApp;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/' + this.pkId,
        callback: function (code, message, response) {
          ret = response.data || {};
          // debugger;
          if (code == 0) {
            // 获取数据赋值显示,填充发送Lmt对象：

            LmtGrpApp = {
              pkId: ret.pkId,
              serno: ret.serno,
              lmtType: ret.lmtType,
              grpCusId: ret.grpCusId,
              cusType: ret.cusType,
              grpCusName: ret.grpCusName,
              origiLmtReplySerno: ret.origiLmtReplySerno,
              origiLmtTerm: ret.origiLmtTerm,
              curType: ret.curType,
              openTotalLmtAmt: ret.openTotalLmtAmt,
              lowRiskTotalLmtAmt: ret.lowRiskTotalLmtAmt,
              lmtTerm: _this.lmtTerm,
              lmtGraperTerm: ret.lmtGraperTerm,
              oprType: ret.oprType,
              apprStatus: ret.apprStatus,
              inputId: ret.inputId,
              inputBrId: ret.inputBrId,
              inputDate: ret.inputDate,
              updId: ret.updId,
              updBrId: ret.updBrId,
              updDate: ret.updDate,
              managerId: ret.managerId,
              managerBrId: ret.managerBrId,
              createTime: ret.createTime,
              updateTime: ret.updateTime
            };
            // 2.发送主申请流水号，保存到数据库
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpapp/save',
              data: LmtGrpApp,
              callback: function (code, message, response) {
                // debugger;
                if (code == 0) {
                  _this.$message('保存主子表成功');
                } else {
                  _this.$message('查询失败');
                }
              }
            });
          } else {
            _this.$message('查询失败');
          }
          _this.dialogVisible = false;
        }
      });
      // 3.end
    },

    /**
     *  弹出批复选选择框，跳转到批复详情界面，待实现
     */
    viewFn: function () {
      // 1.dialog 方式，根据
      var _this = this;
      // _this.$message("跳转到批复详情界面，待实现 ");
      _this.dialogVisibleReply = true;
      // 2.页面明细方式
      //  this.$router.addTab({
      //   name: "zrcbank/biz/lmtGrpApp/lmtAppDetail/grpCusPreLmtDetail",
      //   title: "",
      //   key: "1",
      //   data: {
      //     userId: "11",
      //     formData: {
      //       title: '2021-04-06',
      //       createAt: '111'
      //     }
      //   }
      // });
    },

    /**
     *  退回按钮
     */
    back: function () {
      console.log('退回被执行');
      // yufp.router.removeTab('/zrcbank/biz/lmtGrpApp/lmtAppDetail/lmtAppDetail');
      this.$router.go(-1);
    }
  }
};
</script>
