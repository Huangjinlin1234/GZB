<template>
  <div>
    <yu-tabs ref="refTabs" tab-position="left" style="height: 200px;">
        <yu-tab-pane label="检查任务信息" :key="9">
            <pspTaskDetail ref="pspTaskDetail" :form-data="pspTaskDetail" :form-data-rst="pspCheckRst" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="基本情况" :key="10">
            <pspCusBaseCase ref="pspCusBaseCase" :form-data="pspCusBaseCase" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>

        <yu-tab-pane label="融资及对外担保" :key="11">
            <psp-cus-com-fin-analy ref="pspCusComFinAnaly" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="预警信号分析" :key="12">
            <psp-warning-info-list ref="pspWarningInfoList" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>

        <yu-tab-pane label="经营状况检查" name="oper" :key="13">
          <div>
            <yu-tabs>
              <yu-tab-pane label="经营状况检查(通用)" v-if="all" :key="1">
                  <psp-oper-status-check ref="pspOperStatusCheck" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
              </yu-tab-pane>
              <yu-tab-pane label="经营状况检查-农林牧渔"  v-if="tradeClass=='A' " :key="2">
                  <psp-oper-status-check-agriculture ref="pspOperStatusCheckAgriculture" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
              </yu-tab-pane>
              <yu-tab-pane label="经营状况检查-制造业"  v-if="tradeClass=='C' " :key="3">
                  <psp-Oper-Status-Check-Manufacture ref="pspOperStatusCheckManufacture" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
              </yu-tab-pane>
              <yu-tab-pane label="经营状况检查-批发零售业"  v-if="tradeClass=='F' " :key="4">
                  <pspOperStatusCheckRetail ref="pspOperStatusCheckRetail" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
              </yu-tab-pane>
              <yu-tab-pane label="经营状况检查-建筑业"  v-if="tradeClass=='E' " :key="5">
                  <psp-oper-check-arch ref="pspOperCheckArch" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
              </yu-tab-pane>
              <yu-tab-pane label="房地产开发贷款" v-if="houseCheck" :key="6">
                  <pspOperStatusCheckRealpro ref="pspOperStatusCheckRealpro" :task-no="taskNo" :cus-id="cusId" :form-type="formType=='edit' ? 'edit' : 'details'"/>
              </yu-tab-pane>
              <yu-tab-pane label="经营性物业贷款"  v-if="isProperty" :key="7">
                  <psp-check-property ref="pspCheckProperty" :task-no="taskNo" :cus-id="cusId" :form-type="formType=='edit' ? 'edit' : 'details'"/>
              </yu-tab-pane>
              <yu-tab-pane label="固定资产贷款、项目贷款"  v-if="isFixed" :key="8">
                  <pspPropertyCheck ref="pspPropertyCheck" :task-no="taskNo" :cus-id="cusId" :form-type="formType=='edit' ? 'edit' : 'details'"/>
              </yu-tab-pane>
            </yu-tabs>
          </div>
        </yu-tab-pane>

        <yu-tab-pane label="财务状况检查" :key="14">
            <pspFinSituCheck ref="pspFinaStatusCheck" :form-data-cus="pspCusBaseCase" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="担保状况检查" :key="15">
            <dbqkList ref="dbqkList" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="授信时贷后管理建议落实情况" :key="16">
            <PspImplementOpt ref="PspImplementOpt" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>

        <yu-tab-pane label="检查结果及意见" :key="17" >
          <pspCheckRstB ref="pspCheckRstB" :form-data="pspCheckRst" :form-type="formType1=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>

        <yu-tab-pane label="瑕疵类其他检查" v-if="rptType=='2'" :key="18">
            <pspOtherCaseCheckBlemish ref="pspOtherCaseCheckBlemish" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="定期检查报告" :key="19">
            <pspCheckReport ref="pspCheckReport"></pspCheckReport>
        </yu-tab-pane>
        <yu-tab-pane label="征信报告" :key="20">
            <d1-3-billlist ref="d1_3_BillList" :biz-page-data="bizPageData"></d1-3-billlist>
        </yu-tab-pane>
        <yu-tab-pane label="影像资料">
          <yu-panel  v-model="activeName" :collapse-hide="false" name="forth">
                <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
          </yu-panel>
        </yu-tab-pane>
    </yu-tabs>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;" >
      <yu-button type="primary" v-if="formType == 'edit' || formType1 == 'edit'" @click="save">保存</yu-button>
      <yu-button type="primary" v-if="formType == 'edit'" @click="submit">提交</yu-button>
      <yu-button type="primary" @click="returnFn">返回</yu-button>
    </yu-form-buttons>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="submitSuccess"></yufp-nwf-init>
  </div>
</template>
<script>
import d13Billlist from '@/views/creditmanage/creditRela/creditQryBizRealListIndex.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import pspTaskDetail from '@/views/psp/pspchecktask/pspTaskDetail.vue';
import dbqkList from '@/views/psp/pspchecktask/dbqkList.vue';
import pspPropertyCheck from '@/views/psp/pspchecktask/pspPropertyCheck.vue';
import pspCusComFinAnaly from '@/views/psp/pspchecktask/pspCusComFinAnaly.vue';
import pspOperStatusCheck from '@/views/psp/pspchecktask/pspOperStatusCheck.vue';
import pspOperStatusCheckManufacture from '@/views/psp/pspchecktask/pspOperStatusCheckManufacture.vue';
import pspCheckProperty from '@/views/psp/pspchecktask/pspCheckProperty.vue';
import pspOperStatusCheckAgriculture from '@/views/psp/pspchecktask/pspOperStatusCheckAgriculture.vue';
import pspOperCheckArch from '@/views/psp/pspchecktask/pspOperCheckArch.vue';
import pspWarningInfoList from '@/views/psp/pspchecktask/pspWarningInfoList.vue';
import PspImplementOpt from '@/views/psp/pspchecktask/PspImplementOpt.vue';
import pspCusBaseCase from '@/views/psp/pspchecktask/pspCusBaseCase.vue';
import pspOtherCaseCheckBlemish from '@/views/psp/pspchecktask/pspOtherCaseCheckBlemish.vue';
import pspOperStatusCheckRetail from '@/views/psp/pspchecktask/pspOperStatusCheckRetail.vue';
import pspOperStatusCheckRealpro from '@/views/psp/pspchecktask/pspOperStatusCheckRealpro.vue';
import pspCheckRstA from '@/views/psp/pspchecktask/pspCheckRstA.vue';
import pspCheckRstB from '@/views/psp/pspchecktask/pspCheckRstB.vue';
import pspFinSituCheck from '@/views/psp/pspchecktask/pspFinSituCheck.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import pspCheckReport from '@/views/pspmanage/pspCheck/regularCheck/pspCheckReport';

export default {
  props: {
    bizPageData: Object,
    pageParams: Object
  },
  components: {
    d13Billlist,
    pspTaskDetail,
    dbqkList,
    pspPropertyCheck,
    pspCusComFinAnaly,
    pspOperStatusCheck,
    pspOperStatusCheckManufacture,
    pspCheckProperty,
    pspOperStatusCheckAgriculture,
    pspOperCheckArch,
    pspWarningInfoList,
    PspImplementOpt,
    pspCusBaseCase,
    pspOtherCaseCheckBlemish,
    pspOperStatusCheckRetail,
    pspOperStatusCheckRealpro,
    pspCheckRstA,
    pspCheckRstB,
    pspFinSituCheck,
    yufpNwfInit,
    imageSystem,
    pspCheckReport
  },

  // props: {
  //   taskNo: String,
  //   formType: String,
  //   flagg: Boolean
  // },

  data: function () {
    return {
      queryTaskUrl: backend.cmisPsp + '/api/psptasklist/selectTaskAndRst',
      queryCusBaseUrl: backend.cmisPsp + '/api/pspcusbasecase/selectByTaskNo',
      queryRstUrl: backend.cmisPsp + '/api/pspcheckrst/selectByTaskNo',
      cusId: '',
      rptType: '',
      tradeClass: '',
      isRealpro: '',
      isProperty: false,
      isFixed: false,
      all: true,
      pspTaskDetail: {},
      pspCusBaseCase: {},
      pspCheckRst: {},
      flagg: '',
      formType: '',
      basedata: [],
      houseCheck: false,
      imageBizParam: [],
      taskNo: '',
      billNo: '',
      isPlace: '',
      image: '1',
      trade: '',
      istrade: true

    };
  },

  created: function () {
    this.afterInit();
  },

  methods: {

    afterInit () {
      var _this = this;
      let params = {};
      // 从流程页面跳转后，页面数据初始化
      if (typeof _this.bizPageData !== 'undefined') {
        params = _this.bizPageData.instanceInfo.param;
        _this.taskNo = _this.bizPageData.instanceInfo.bizId;
        _this.formType = 'VIEW';
        _this.formType1 = 'edit';
        _this.image = '2';
        _this.$route.params.taskNo = _this.taskNo;
        _this.$route.params.rptName = params.rptName;
        _this.$route.params.formType = params.formType;
        _this.$route.params.coopAgrSerno = _this.taskNo;
        _this.$route.params.partnerNo = params.partnerNo;
        _this.$route.params.partnerName = params.partnerName;
        _this.flagg = params.flagg;
        _this.cusId = _this.bizPageData.instanceInfo.bizUserId;
      }
      _this.imageBizParam = [{
        'top_outsystem_code': 'DHJC',
        'index': {
          'businessid': _this.taskNo,
          'custid': _this.cusId
        }
      }];
      _this.$request({
        url: _this.queryTaskUrl,
        method: 'post',
        data: {taskNo: _this.taskNo}
      }).then((response) => {
        _this.pspTaskDetail = response.data;
        // yufp.clone(response.data[0], _this.pspTaskDetail);
        return _this.$request({
          url: _this.queryCusBaseUrl,
          method: 'post',
          data: {condition: JSON.stringify({taskNo: _this.taskNo})}
        });
      }).then((response) => {
        _this.pspCusBaseCase = response.data[0];
        // yufp.clone(response.data[0], _this.pspCusBaseCase);
        // _this.pspCusBaseCase.type = 2
        return _this.$request({
          url: _this.queryRstUrl,
          method: 'post',
          data: {condition: JSON.stringify({taskNo: _this.taskNo})}
        });
      }).then((response) => {
        _this.pspCheckRst = response.data[0];
        // yufp.clone(response.data[0], _this.pspCheckRst);

        _this.cusId = _this.pspTaskDetail.cusId;
        // 报告类型
        _this.rptType = _this.pspTaskDetail.rptType;
        // 行业分类
        // _this.tradeClass = _this.$refs.pspCusBaseCase.data.tradeClass;
        if (_this.pspCusBaseCase) {
          _this.trade = _this.pspCusBaseCase.tradeClass.substring(0, 1);
          if (_this.trade == 'A') {
            _this.tradeClass = 'A';
          } else if (_this.trade == 'C') {
            _this.tradeClass = 'C';
          } else if (_this.trade == 'F') {
            _this.tradeClass = 'F';
          } else if (_this.trade == 'E') {
            _this.tradeClass = 'E';
          } else {
            _this.tradeClass = '';
            _this.istrade = false;
          }
        } else {
          _this.istrade = false;
        }
        // _this.tradeClass = _this.pspCusBaseCase.tradeClass;
        // 是否房地产开发贷检查
        // console.log('你好', _this.$refs.pspCusComFinAnaly.$refs.refTable.tabledata);
        var tabledata = _this.$refs.pspCusComFinAnaly.$refs.refTable.tabledata;
        tabledata.forEach((item, index) => {
          _this.basedata.push(item.finVariet);
        });

        if (_this.basedata.includes('012011') || _this.basedata.includes('012012') ||
      _this.basedata.includes('012013') || _this.basedata.includes('012014') || _this.basedata.includes('620001')) {
          _this.houseCheck = true;
        }
        // 是否经营性物业贷检查
        if (_this.basedata.includes('010022')) {
          _this.isProperty = true;
        }
        // 是否固定资产贷款、项目贷款检查
        if (_this.basedata.includes('012022') || _this.basedata.includes('012015') ||
      _this.basedata.includes('620002') || _this.basedata.includes('012023') ||
      _this.basedata.includes('010013') || _this.basedata.includes('010014') ||
      _this.basedata.includes('012010')) {
          _this.isFixed = true;
        }
        // 经营状况检查(通用)
        if (_this.isFixed || _this.isProperty || _this.houseCheck || _this.istrade) {
          _this.all = false;
        }
      }).catch((e) => {
      // _this.$message({
      //   message: '请求失败'
      // });
        console.log(e);
      });
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    },


    save: function () {
      var _this = this;
      var currentName = this.$refs.refTabs.currentName;
      var component = null;

      // 获取当前选中的component
      for (var i = 0; i < this.$refs.refTabs.$children.length; i++) {
        var pane = this.$refs.refTabs.$children[i];
        if (pane.paneName == currentName) {
          // 经营状况检查
          if (pane.name == 'oper') {
            var subTabs = pane.$children[0];
            var subCurrentName = subTabs.currentName;

            for (var j = 0; j < subTabs.$children.length; j++) {
              var subPane = subTabs.$children[j];
              if (subPane.paneName == subCurrentName) {
                component = subPane.$children[0];
                break;
              }
            }
          } else {
            component = pane.$children[0];
          }

          break;
        }
      }

      if (component.validate()) {
        component.save().then((response) => {
          if (response.code == '0') {
            _this.$message({
              message: '保存成功'
            });
          }
        }).catch(() => {
          _this.$message({
            message: '保存失败'
          });
        });
      }
      _this.afterInit();
    },

    submitSuccess () {
      this.returnFn();
    }

  }
};
</script>
