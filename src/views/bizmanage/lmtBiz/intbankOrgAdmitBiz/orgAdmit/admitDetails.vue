<template>
  <div class="container">
    <el-row>
      <el-col :span="3">
        <yu-tree class="filter-tree" :data="menu" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick1" default-expand-all ref="tree2" node-key="id" highlight-current>
        </yu-tree>
      </el-col>
      <el-col :span="21">
        <yu-xform label-width="140px" ref="refForm" v-model="formdata">
          <div v-show="show==1">
            <yu-panel title="基本信息" panel-type="simple">
              <yu-xform-group :column="2">
                <!-- <yu-xform-item label="申请编号" placeholder="申请编号" name="serno" ctype="input" disabled></yu-xform-item> -->

                <!-- 机构名称是客户名称 -->
                <yu-xform-item label="机构名称" placeholder="机构名称" name="cusName" ctype="input" disabled></yu-xform-item>

                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" disabled rules="required"></yu-xform-item>
                <!-- <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" disabled></yu-xform-item> -->
                <yu-xform-item label="机构类型" ctype="yu-xdic-tree" placeholder="机构类型" name="intbankOrgType" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_INTBANK_TYPE' }" :selectionType="radio" disabled></yu-xform-item>

                <yu-xform-item label="注册登记地" ctype="input"  placeholder="注册登记地" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '3'}" :selectionType="radio" ></yu-xform-item>
                <yu-xform-item label="控股类型" placeholder="控股类型" name="holdType" data-code="STD_ZB_HOLD_TYPE" ctype="select" disabled></yu-xform-item>

                <!-- <yu-xform-item label="成立时间" placeholder="成立时间" name="buildDate" ctype="datepicker" disabled></yu-xform-item>
                <yu-xform-item label="金融业务许可证" placeholder="金融业务许可证" name="busiLic" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="是否上市" placeholder="是否上市" name="isStock" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
                <yu-xform-item label="实际控制人" placeholder="实际控制人" name="realOperCusName" ctype="input" disabled></yu-xform-item> -->
              </yu-xform-group>
            </yu-panel>

            <yu-panel title="外部评级" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="评级结果" placeholder="评级结果" name="evalResultOuter" ctype="select" data-code="STD_ZB_EVAL_RST" disabled></yu-xform-item>
                <yu-xform-item label="评级时间" placeholder="评级时间" name="evalTimOuter" ctype="input" readonly="true" disabled></yu-xform-item>
                <yu-xform-item label="评级机构" placeholder="评级机构" name="evalOrgOuter" ctype="select" data-code="STD_ZB_OUT_APPR_ORG" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>

            <yu-panel title="内部评级" panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="评级结果" placeholder="评级结果" name="evalResultInner" ctype="select" data-code="STD_ZB_GRADE_RANK" disabled></yu-xform-item>
                <yu-xform-item label="评级时间" placeholder="评级时间" name="evalTimeInner" ctype="input" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="股东情况" panel-type="simple">
              <yu-xtable ref="refTable" condition-key="condition" row-number selection-type="radio" :data-url="dataUrl" :base-params="Param" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
                <yu-xtable-column label="客户编号" prop="shdCusId" width=""></yu-xtable-column>
                <yu-xtable-column label="客户名称" prop="shdCusName" width="180"></yu-xtable-column>
                <!-- <yu-xtable-column label="持股金额" prop="shdAmt" width="120"></yu-xtable-column> -->
                <yu-xtable-column label="持股比例" prop="shdPerc" width="120">
                  <template slot-scope="scope">
                    <span>{{ parseFloat(parseFloat(scope.row.shdPerc * 100).toFixed(2)) }}%</span>
                  </template>
                </yu-xtable-column>
                <yu-xtable-column label="企业性质" prop="corpCha" width="120" data-code="STD_ZB_INVT_TYP"></yu-xtable-column>
                <!-- <yu-xtable-column label="备注" prop="remark" width="120"></yu-xtable-column> -->
              </yu-xtable>
            </yu-panel>
            <yu-panel title=" " panel-type="simple">
              <yu-xform-group :column="2">
                <yu-xform-item label="投资经理" placeholder="投资经理" name="inputIdName" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="申请时间" placeholder="申请时间" name="inputDate" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="经办机构" placeholder="经办机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </div>
        </yu-xform>

        <div v-show="show==2" style="width:100%;">
          <subjectAnalyse ref="refSub" v-if="showSub" :children="subData"></subjectAnalyse>
        </div>
        <div v-show="show==3">
          <iframe v-if="show==3" :src="printUrl" width="100%" height="1000px" frameborder="0"></iframe>
        </div>
        <div v-show="show==4" style="width:100%;"></div>
        <div v-show="show==5">
          <stockSituation v-if="showStock" :children="children"></stockSituation>
        </div>
        <div v-show="show==6">
          <coopApprovalIndex v-if="showProcess" :children="children"></coopApprovalIndex>
        </div>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="saveBtnShow" type="primary" @click="submitFn">提交</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
        <yufp-nwf-init ref="yufpNwfInit" @success-click="forceUpdate"></yufp-nwf-init>
      </el-col>
    </el-row>
  </div>
</template>

<script>
yufp.lookup.reg(
  'STD_ZB_YES_NO,STD_ZB_INTB_TYPE,STD_ZB_EVAL_RST,STD_ZB_OUT_APPR_ORG,STD_ZB_GRADE_RANK,STD_ZB_CORP_QLTY,STD_ZB_HOLD_TYPE,STD_ZB_INVT_TYP'
);
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import stockSituation from '@/views/bizmanage/lmtBiz/subjectCredit/stockSituation/stockSituation.vue';
import mixinForm from '@/utils/mixins/mixin-form';
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
import subjectAnalyse from '@/views/bizmanage/lmtBiz/intbankOrgAdmitBiz/orgAdmit/subjectAnalyse.vue';
import coopApprovalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
import { imageSystem } from '@/utils/unitchange';
export default {
  name: 'TemplateFactory',
  mixins: [mixinForm],
  components: {
    yufpNwfInit,
    stockSituation,
    YuSingleUpload,
    subjectAnalyse,
    coopApprovalIndex
  },
  props: {
    pageParams: {
      type: Object,
      default: function () {
        return {};
      }
    },
    dialogId: String,
    modelGroupNo: String
  },
  data: function () {
    return {
      showBtn: {
        tempSave: true,
        save: true,
        commit: true,
        back: true
      },
      menu: [
        {
          id: 1,
          label: '同业机构准入申报',
          children: [
            {
              id: 2,
              label: '企业基本情况'
            },
            {
              id: 6,
              label: '存量业务情况'
            },
            {
              id: 3,
              label: '主体分析'
            },
            {
              id: 4,
              label: '调查报告'
            },
            {
              id: 5,
              label: '影像资料'
            },
            {
              id: 7,
              label: '流程轨迹'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      show: true,
      dataUrl: backend.cmisBiz + '/api/lmtappcorreshd/selectByModel',
      manageDataUrl:
        backend.cmisBiz + '/api/lmtsiginvestrelfinadetails/selectByModel',
      Param1: {},
      saveBtnShow: false,
      cusId: '',
      serno: '',
      showImg: false,
      showStock: false,
      imageType: '2',
      fileList: [],
      fileListInfo1: [],
      fileListInfo2: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl:
        backend.cmisBiz + '/api/intbankorgadmitapp/updatePicAbsoultPath',
      showSub: false,
      showProcess: false,
    };
  },

  watch: {
    curPath (val) {
      var curCompoments = (() => require('@/views/' + val).default)();
      if (val && !curCompoments) {
        throw new Error(`${val} 该页面存在错误代码，导致加载失败`);
      } else {
        this.curCompoments = curCompoments;
      }
    }
  },

  created () {
    let cusId, serno, op;
    if (this.$route.meta.params) {
      this.serno = serno = this.$route.meta.params.serno;
      this.cusId = cusId = this.$route.meta.params.cusId;
      this.op = op = this.$route.meta.params.op;
    } else {
      this.serno = serno = this.pageParams.serno;
      this.cusId = cusId = this.pageParams.cusId;
      this.op = op = this.pageParams.op;
    }
    this.Param1 = {
      condition: JSON.stringify({
        oprType: '01',
        serno: serno,
        cusId: cusId
      })
    };
    this.Param = {
      condition: JSON.stringify({ cusId: cusId, serno: serno })
    };
    op == 'update' ? this.saveBtnShow = true : this.saveBtnShow = false;
    op == 'update' ? this.imageType = '1' : this.imageType = '2';
    this.getDetails();

  },
  mounted () {
    let cl = document.getElementsByClassName('uploadbtn');
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName('button')[0].innerText = '上传图片';
    }
    // 默认展示第一个
    let data = {};
    data.id = 2;
    this.handleNodeClick1(data);
  },
  destroyed () {
    this.contextData = {};
    this.curCompoments = {};
  },
  methods: {
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
    // 打印
    onPrint () {
      var _this = this;
      var params = _this.$refs.refTable.selections;
      // var contPrintNum = params.cont_print_num;
      if (params == null || params == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r请重新操作!',
          350,
          150
        );
        return;
      }
      // let name = 'ctrmanage/ctrLoanCont/frptdemo';
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo';
      let keydemo = 'frptdemo';
      // 本地params.src = 'http://10.87.3.24:8080/dscms/frpt/decision/view/report?viewlet=pvpLoanApp.cpt&PVP_SERNO=' + params[0].pvpSerno;
      params.src =
        'http://10.85.10.38:8080/dscms/frpt/decision/view/report?viewlet=pvpLoanApp.cpt&PVP_SERNO=' +
        params[0].pvpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    // 查看详情
    getDetails () {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          // url: backend.cmisBiz + "/api/intbankorgadmitapp/selectBySerno/",
          url:
            backend.cmisBiz + '/api/intbankorgadmitapp/selectBasicInfoBySerno',
          data: {
            serno: _this.serno,
            cusId: _this.cusId
          }
        })
        .then((data) => {
          if (data.code == '0') {
            if (data.data[0].intbankOrgAdmitApp) {
              let obj = data.data[0];
              let pkId = obj.intbankOrgAdmitApp.pkId;
              let object = Object.assign(
                obj.intbankOrgAdmitApp,
                obj.lmtAppRelCusInfo
              );
              object.pkId = pkId;
              object.inputBrIdName = obj.inputBrIdName;
              object.inputIdName = obj.inputIdName;
              yufp.clone(object, _this.formdata);
              _this.subData = _this.formdata;
              _this.showSub = true;
            }
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        });
    },

    // 菜单栏点击事件
    handleNodeClick1: function (data) {
      this.getDetails();
      this.subData = this.formdata;
      if (data.id == 2) {
        this.show = 1;
        // this.formRules = {};
      } else if (data.id == 3) {
        this.show = 2;
        this.formdata.op = this.op;
        this.showSub = false;
        this.$nextTick(() => {
          this.showSub = true;
        });
      } else if (data.id == 4) {
        this.show = 3;
        this.formRules = {};
        this.printUrl =
          backend.frptRptService +
          'zjty-zrmb20.cpt&serno=' +
          this.formdata.serno +
          '&cusId=' +
          this.formdata.cusId;
      } else if (data.id == 5) {
        this.show = 4;

        let params;
        this.pageParams.serno
          ? params = this.pageParams
          : params = this.$route.meta.params;
        let imageBizParam = [
          {
            // TODO 根据实际业务场景修正
            top_outsystem_code: 'XXD_ZJTY',
            index: {
              businessid: params.serno,
              custtype: params.curType,
              custconductid: params.inputId,
              custconductname: params.inputIdName,
              orgid: params.inputBrId,
              orgname: params.inputBrIdName,
              opername: params.updIdName,
              custid: params.cusId,
              custname: params.cusName,
              custconduct: '',
              operid: '',
              maintaindate: '',
              contid: '',
              billno: ''
            },
            imageType: this.imageType
          }
        ];
        imageSystem (imageBizParam, "1", "import;download").then(res => {
          window.open(res);
        })
      } else if (data.id == 6) {
        this.show = 5;
        this.children = {
          serno: this.serno,
          customer: 3,
          cusId: this.cusId,
        };
        this.showStock = false;
        this.$nextTick(() => {
          this.showStock = true;
        });
      } else if (data.id == 7) {
        this.show = 6;
        this.children = {
          serno: this.serno,

        }
        this.showProcess = false;
        this.$nextTick(() => {
          this.showProcess = true;
        });
      }
    },


    cancelFn () {
      // 开启监听表格监听事件
      yufp.globalEventBus.$emit('intbankTable1');
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },
    saveFn: function () {
      return new Promise((resolve, reject) => {
        var _this = this;
        var model = {};
        var validate = false;
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '企业基本情况:数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        let subData = _this.$refs.refSub.childrenSave();
        validate = subData.validate;
        if (!validate) {
          _this.$message({
            message: '主体分析未填写！',
            type: 'error'
          });
          return;
        }
        yufp.clone(_this.formdata, model);
        yufp.clone(subData.formdata, model);
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
              _this.$refs.refTable.remoteData();
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
        if (loginUser.dutys) {
          for (let i = 0; i < loginUser.dutys.length; i++) {
            dutysArry.push(loginUser.dutys[i].code);
          }
        }
        var startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = this.$store.state.oauth.org.code;
        startdto.userId = this.$store.state.oauth.loginCode;
        startdto.bizType = 'TY001'; // 修改为同业准入申请流程code
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
    }
  }
};
</script>


<style scoped>
</style>
