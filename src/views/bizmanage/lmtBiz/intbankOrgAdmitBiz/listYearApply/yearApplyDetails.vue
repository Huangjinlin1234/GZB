<template>
  <yu-tabs v-model="activeName" type="card">
    <yu-tab-pane label="基本信息" name="first">
      <yu-panel :title="viewTitle">
        <yu-xform ref="refForm" v-model="formdata" :disabled="formDisabled" :rules="gxhrules">
          <yu-panel title="基本信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled placeholder="客户编号"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="名单准入批复信息" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="origiReplySerno" icon="search" @click="replyOnChange" @focus="replyOnChange" disabled></yu-xform-item>
              <yu-xform-item label="准入日期" ctype="input" placeholder="准入日期" name="oldStartDate" disabled></yu-xform-item>
              <!-- <yu-xform-item label="准入到期日" ctype="input" placeholder="准入到期日" name="oldEndDate" disabled></yu-xform-item> -->
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="历史年审情况" panel-type="simple">
            <yu-xtable ref="refHistoryTable" condition-key="condition" row-number selection-type="radio" :data-url="dataHistoryUrl" :base-params="HistoryParam" requestType="POST"
              style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="客户编号" prop="cusId" width=""></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName" width="180"></yu-xtable-column>
              <yu-xtable-column label="年审时间" prop="inputDate" width="180"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="本次年审情况" panel-type="simple">
    <!--        <yu-xform-group :column="2">-->
    <!--          <yu-xform-item label="准入到期日" ctype="datepicker" placeholder="准入到期日" name="endDate" disabled></yu-xform-item>-->
    <!--        </yu-xform-group>-->
            <yu-xform-group :column="1">
              <yu-xform-item label="年审结论" ctype="textarea" name="indgtResult" placeholder="年审结论" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="投资经理" ctype="input" placeholder="投资经理" name="inputIdName" disabled></yu-xform-item>
              <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrIdName" disabled></yu-xform-item>
              <yu-xform-item label="提交时间" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="提交时间"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
          <div class="yu-grpButton">
            <yu-button v-if="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
            <yu-button v-if="saveBtnShow" type="primary" @click="submitFn">提交</yu-button>
            <yu-button type="primary" @click="cancelFn">返回</yu-button>
          </div>
        </yu-xform>
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
import {updateCommonSignAndOpinion} from "../../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  name: 'TemplateFactory',
  components: {
    checkDialog,
    yufpNwfInit,
    coopApprovalIndex
  },
  props: {
    bizPageData: Object
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
            message: '年审结论必填',
            trigger: 'blur'
          },
          { max: 2000, message: '年审结论不超过2000个字符' }
        ]
      },
      show_dialog: false,
      activeName: 'first',
      showProcess: false,
      replyUrl: '/api/intbankorgadmitappr/updateRestByPkId',
    };
  },
  created () {
    var biz = this.bizPageData;
    var data = {};
    var btn;
    // 判断是否流程
    if (biz == 'undefined' || biz == null || biz == '') {
      data = this.$route.meta.params;
      btn = data.op;
    } else {
      btn = 'look';
      let instanceInfo = this.bizPageData.instanceInfo;
      data.serno = instanceInfo.bizId;
      data.cusId = instanceInfo.bizUserId;
    }
    // 按钮状态
    if (data.op == 'update') {
      this.saveBtnShow = true;
    } else if (data.op == 'look') {
      this.saveBtnShow = false;
    }
    this.dataHistoryUrl =
      this.$backend.cmisBiz + '/api/intbankorgadmitacc/selectByModel';
    this.HistoryParam = {
      condition: JSON.stringify({ cusId: data.cusId, accStatus: '01' })
    };
    this.getDetails(data.serno);
    this.getDetailsAdd(data.cusId);

    this.children = {
      serno: data.serno
    }
    this.showProcess = false;
    this.$nextTick(() => {
      this.showProcess = true;
    })
  },
  mounted () {},
  methods: {
    getDetailsAdd (cusId) {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/intbankorgadmitacc/lastAccByApp',
          data: {
            condition: JSON.stringify({ cusId: cusId, accStatus: '01' })
          }
        })
        .then((data) => {
          if (data.code == '0') {
            try {
              let _data = data.data[0];
              let obj = {
                origiReplySerno: _data.replySerno,
                oldStartDate: _data.startDate,
                oldEndDate: _data.endDate
              };
              yufp.clone(obj, _this.formdata);
            } catch (e) {}
          } else {
          }
        });
    },
    // 查看详情
    getDetails (param) {
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/intbankorgadmitapp/selectBySerno/',
        data: {
          serno: param
        }
      }).then((data) => {
        if (data.code == '0') {
          let date = new Date(data.data.inputDate);
          date.setFullYear(date.getFullYear() + 1);
          date = date.toLocaleString('chinese', { hour12: false });
          date = date.replace(new RegExp('/', 'gm'), '-');
          data.data.endDate = date;
          yufp.clone(data.data, this.formdata);
        }
      });
    },
    replyOnChange () {
      var title = '申报详情';
      let model = {};
      model = {
        serno: this.formdata.origiReplySerno
      };
      console.log('============', this.formdata.origiReplySerno);
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
    selectData (msg) {
      console.log(msg);
      this.show_dialog = false;
    },
    // 保存
    saveFn: function () {
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
        console.log('formdata==>', _this.formdata);
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
        startdto.bizType = 'TY002'; // 修改为同业准入申请流程code
        startdto.bizId = this.formdata.serno; // this.getFactory().contextData.surveySerno;
        startdto.bizUserName = this.formdata.cusName; // this.d1_A_BillCard.getItemValue('cusName');
        startdto.bizUserId = this.formdata.cusId; // this.d1_A_BillCard.getItemValue('cusId');
        startdto.param = {
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
      yufp.globalEventBus.$emit("intbankTable2")
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    }
  }
};
</script>
