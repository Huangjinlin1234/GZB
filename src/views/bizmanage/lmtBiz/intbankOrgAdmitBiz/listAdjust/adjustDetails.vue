<template>
  <yu-tabs v-model="activeName" type="card">
    <yu-tab-pane label="基本信息" name="first">
      <yu-panel>
        <yu-xform ref="refForm" v-model="formdata" :rules="gxhrules">
          <yu-panel title="基本信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled placeholder="客户编号"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="名单准入批复信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="origiReplySerno" icon="search" @click="replyOnChange" @focus="replyOnChange" disabled></yu-xform-item>
              <yu-xform-item label="准入日期" ctype="input" placeholder="准入日期" name="inputDate" disabled></yu-xform-item>
              <!-- <yu-xform-item label="准入到期日" ctype="input" placeholder="准入到期日" name="inputEndDate" disabled></yu-xform-item> -->
            </yu-xform-group>
            <yu-xform-group :column="1">
              <yu-xform-item label="调整理由" ctype="textarea" placeholder="调整理由" colspan="15" :autosize="{ minRows: 10}" name="indgtResult" :disabled="!saveBtnShow"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>

          <yu-panel>
            <yu-xform-group :column="2">
              <yu-xform-item label="投资经理" ctype="input" placeholder="投资经理" name="inputIdName" disabled></yu-xform-item>
              <yu-xform-item label="提交时间" ctype="input" placeholder="提交时间" name="inputDate" disabled></yu-xform-item>
              <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrIdName" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <div class="yu-grpButton">
            <yu-button v-if="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
            <yu-button v-if="saveBtnShow" type="primary" @click="submitFn">提交</yu-button>
            <yu-button type="primary" @click="cancelFn">返回</yu-button>
          </div>
        </yu-xform>
        <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
        <yu-xdialog title="" :visible.sync="show_dialog">
          <checkDialog :btn="btn" @changed="selectData"></checkDialog>
        </yu-xdialog>
      </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="流程轨迹" name="second">
      <coopApprovalIndex v-if="showProcess" :children="children"></coopApprovalIndex>
    </yu-tab-pane>
  </yu-tabs>
  
</template>
<script>
import checkDialog from '../listCheck/dialog';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import coopApprovalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex'
export default {
  name: 'Templetfactory',
  components: {
    checkDialog,
    yufpNwfInit,
    coopApprovalIndex
  },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      formdata: {},
      saveBtnShow: false,
      gxhrules: {
        indgtResult: [
          {
            type: 'string',
            required: true,
            message: '调整理由必填',
            trigger: 'blur'
          },
          { max: 2000, message: '调整理由不超过2000个字符' }
        ],
        cusId: [
          {
            type: 'string',
            required: true,
            message: '客户编号必填',
            trigger: 'blur'
          }
        ],
        cusName: [
          {
            type: 'string',
            required: true,
            message: '客户名称必填',
            trigger: 'blur'
          }
        ]
      },
      show_dialog: false,
      activeName: 'first',
      showProcess: false,
    };
  },
  mounted () {
    let data;
    if (this.$route.meta.params) {
      data = this.$route.meta.params;
    } else {
      data = this.pageParams;
    }
    this.btn = data.op;
    if (data.op == 'update') {
      this.saveBtnShow = true;
    } else if (data.op == 'look') {
      this.saveBtnShow = false;
    }
    this.getDetails(data.serno);
    this.children = {
      serno: data.serno
    }
    this.showProcess = false;
    this.$nextTick(() => {
      this.showProcess = true;
    })
  },
  methods: {
    // 查看详情
    getDetails (param) {
      console.log('=======>>>', param);
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/intbankorgadmitapp/selectBySerno/',
        data: {
          serno: param
        }
      }).then((data) => {
        if (data.code == '0') {
          let date = new Date(data.data.inputDate);
          if (Number.isInteger(data.data.term)) {
            let term = Number.parseInt(data.data.term);
            date.setMonth(date.getMonth() + term);
          }
          data.data.inputEndDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', date);
          yufp.clone(data.data, this.formdata);
        }
      });
    },
    selectData (msg) {
      this.show_dialog = false;
    },
    replyOnChange () {
      // this.show_dialog = true;
      var title = '申报详情';
      let model = {};
      model = {
        serno: this.formdata.origiReplySerno
      };
      if (model.serno) {
      } else {
        this.$message({
          message: '批复编号为空！',
          type: 'error'
        });
        return;
      }
      var routeKey = 'TemplateFactory' + this.formdata.origiReplySerno + 'EDIT';
      model.routeKey = routeKey;
      model.op = 'look';
      this.$router.addTab({
        name: 'bizmanage/lmtBiz/intbankOrgAdmitBiz/orgAdmit/admitDetails',
        key: routeKey,
        title: title,
        data: model
      });
    },
    // 保存
    saveFn () {
      return new Promise((resolve, reject) => {
        var validate = false,
          _this = this;
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        var model = {};
        yufp.clone(_this.formdata, model);
        // 向后台发送保存请求
        model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
        model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        var updateurl = backend.cmisBiz + '/api/intbankorgadmitapp/update';
        _this
          .$request({
            method: 'POST',
            url: updateurl,
            data: model
          })
          .then((data) => {
            if (data.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              resolve();
            } else {
              _this.$message({ message: '保存失败', type: 'error' });
            }
          });
      });
    },
    // 提交
    submitFn () {
      this.saveFn().then(res => {
        const loginUser = this.$xutils.getLoginUserInfo();
        let dutysArry = []; //  loginUser.dutys
        for (let i = 0; i < loginUser.dutys.length; i++) {
          dutysArry.push(loginUser.dutys[i].code);
        }
        var startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = this.$store.state.oauth.org.code;
        startdto.userId = this.$store.state.oauth.loginCode;
        startdto.bizType = 'TY003'; // 修改为同业准入申请流程code
        startdto.bizId = this.formdata.serno; // this.getFactory().contextData.surveySerno;
        startdto.bizUserName = this.formdata.cusName; // this.d1_A_BillCard.getItemValue('cusName');
        startdto.bizUserId = this.formdata.cusId; // this.d1_A_BillCard.getItemValue('cusId');
        startdto.param = {
          userId: this.$store.state.oauth.loginCode,
          bizId: this.formdata.pkId,
          orgId: this.$store.state.oauth.org.code,
          dutyOrgType: loginUser.org.orgType, // 客户经理所属机构类型  分行、支行、小微、非客户经理
          dutys: dutysArry.join(',')
        };
        this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },
    // 流程回调
    forceUpdate () {
      this.cancelFn();
    },
    cancelFn () {
      // 开启监听表格监听事件
      yufp.globalEventBus.$emit("intbankTable3");
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    }
  }
};
</script>
