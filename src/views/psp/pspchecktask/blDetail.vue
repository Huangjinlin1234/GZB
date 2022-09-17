<template>
  <div>
    <yu-tabs ref="refTabs" tab-position="left" style="height: 200px;">
        <yu-tab-pane label="检查任务信息">
            <pspTaskDetail ref="pspTaskDetail" :form-data="pspTaskDetail" :form-data-rst="pspCheckRst" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="基本情况">
            <pspCusBaseCase ref="pspCusBaseCase" :form-data="pspCusBaseCase" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="融资分析">
            <pspCusFinAnaly ref="pspCusFinAnaly" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="法律效力审查">
            <pspLegalCheck ref="pspLegalCheck" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="风险成因">
            <pspRiskFactor ref="pspRiskFactor" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="履约能力分析">
            <pspPromiseAnaly ref="pspPromiseAnaly" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="担保状况检查">
            <bldbqkList ref="bldbqkList" :task-no="taskNo" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="关联企业情况" v-if="pspAnaly">
            <pspRelCorpAnaly ref="pspRelCorpAnaly" :task-no="taskNo"  :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="检查结果及意见">
            <pspCheckRstC ref="pspCheckRstC" :form-data="pspCheckRst" :form-type="formType=='edit' ? 'edit' : 'details'"/>
        </yu-tab-pane>
        <yu-tab-pane label="定期检查报告">
            <pspCheckReport ref="pspCheckReport"></pspCheckReport>
        </yu-tab-pane>
        <yu-tab-pane label="征信报告" :key="20">
            <d1-3-billlist ref="d1_3_BillList" :biz-page-data="bizPageData"></d1-3-billlist>
        </yu-tab-pane>
         <yu-tab-pane label="影像资料">
             <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
        </yu-tab-pane>
    </yu-tabs>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary"  v-if="formType == 'edit'" @click="save">保存</yu-button>
      <yu-button type="primary"  v-if="formType == 'edit'" @click="submit">提交</yu-button>
      <yu-button type="primary" @click="returnFn">返回</yu-button>
    </yu-form-buttons>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="submitSuccess"></yufp-nwf-init>
  </div>
</template>
<script>
import d13Billlist from '@/views/creditmanage/creditRela/creditQryBizRealListIndex.vue';
import pspTaskDetail from '@/views/psp/pspchecktask/pspTaskDetail.vue';
import pspCusBaseCase from '@/views/psp/pspchecktask/pspCusBaseCase.vue';
import pspLegalCheck from '@/views/psp/pspchecktask/pspLegalCheck.vue';
import pspRiskFactor from '@/views/psp/pspchecktask/pspRiskFactor.vue';
import pspPromiseAnaly from '@/views/psp/pspchecktask/pspPromiseAnaly.vue';
import bldbqkList from '@/views/psp/pspchecktask/bldbqkList.vue';
import pspRelCorpAnaly from '@/views/psp/pspchecktask/pspRelCorpAnaly.vue';
import pspCusFinAnaly from '@/views/psp/pspchecktask/pspCusFinAnaly.vue';
import pspCheckRstC from '@/views/psp/pspchecktask/pspCheckRstC.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
import pspCheckReport from '@/views/pspmanage/pspCheck/regularCheck/pspCheckReport';
export default {
  props: {
    bizPageData: Object
  },
  components: {
    d13Billlist,
    pspTaskDetail,
    pspCusBaseCase,
    pspLegalCheck,
    pspRiskFactor,
    pspPromiseAnaly,
    bldbqkList,
    pspRelCorpAnaly,
    pspCusFinAnaly,
    pspCheckRstC,
    yufpNwfInit,
    imageSystem,
    pspCheckReport
  },
  data: function () {
    return {
      queryTaskUrl: backend.cmisPsp + '/api/psptasklist/selectTaskAndRst',
      queryCusBaseUrl: backend.cmisPsp + '/api/pspcusbasecase/selectByTaskNo',
      queryRstUrl: backend.cmisPsp + '/api/pspcheckrst/selectByTaskNo',
      pspTaskDetail: {},
      pspCusBaseCase: {},
      pspCheckRst: {},
      formType: '',
      imageBizParam: [],
      taskNo: '',
      billNo: '',
      isPlace: '',
      image: '1',
      cusId: '',
      pspAnaly: true
    };
  },
  created () {
    var _this = this;
    _this.afterInit();
    yufp.service.request({
      method: 'GET',
      url: backend.cmisPsp + '/api/psprelcorp/',
      data: { condition: { taskNo: _this.$route.params.pspTask.taskNo} },
      callback: function (code, message, response) {
        if (response.data.length <= 0) {
          _this.pspAnaly = false;
        }
      }});
  },
  mounted () {
    // 初始化参数

  },

  methods: {
    afterInit: function () {
      var _this = this;
      let params = {};
      // 从流程页面跳转后，页面数据初始化
      if (typeof _this.bizPageData !== 'undefined') {
        params = _this.bizPageData.instanceInfo.param;
        _this.taskNo = _this.bizPageData.instanceInfo.bizId;
        _this.formType = 'VIEW';
        _this.image = '2';
        _this.cusId = _this.bizPageData.instanceInfo.bizUserId;
        _this.$route.params.taskNo = _this.taskNo;
        _this.$route.params.rptName = params.rptName;
        _this.$route.params.isPlace = params.isPlace;
        _this.$route.params.orgType = params.orgType;
      } else {
        // 从贷后检查任务页面跳转后，页面数据初始化
        let params = _this.$route.meta.params;
        _this.taskNo = params.pspTask.taskNo;
        _this.formType = _this.$route.meta.params.formType;
        _this.cusId = _this.$route.meta.params.pspTask.cusId;
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
        return _this.$request({
          url: _this.queryCusBaseUrl,
          method: 'post',
          data: {condition: JSON.stringify({taskNo: _this.taskNo})}
        });
      }).then((response) => {
        _this.pspCusBaseCase = response.data[0];
        return _this.$request({
          url: _this.queryRstUrl,
          method: 'post',
          data: {condition: JSON.stringify({taskNo: _this.taskNo})}
        });
      }).then((response) => {
        // if (response.total > 0) {
        _this.pspCheckRst = response.data[0];
      }).catch(() => {
        _this.$message({
          message: '请求失败'
        });
      });
    },
    // 提交
    submit: function () {
      var validate = true;
      var _this = this;
      var dateTime = false;
      var billList = this.$refs.d1_3_BillList.d11BillList.$refs.refTable.tabledata;
      if (billList.length > 0) {
        billList.forEach(item => {
          if ((new Date().getTime() - new Date(item.reportCreateTime).getTime()) > 3600 * 1000 * 24 * 30) {
            dateTime = true;
          }
        });
      }

      if (dateTime) {
        _this.$message.warning('征信查询时间超过一个月,需重新发起征信查询');
        return;
      }
      var currentPromise = new Promise((resolve, reject) => {
        var response = {};
        response.code = 0;
        resolve(response);
      });
      // 校验
      var components = this.$refs;

      for (var item in components) {
        var component = components[item];
        if (component) {
          if (component.validate && !component.validate()) {
            this.$refs.refTabs.currentName = component.$parent.paneName;

            validate = false;
            break;
          }
        }
      }

      // 校验通过，保存
      if (validate) {
        for (var item in components) {
          var component = components[item];
          if (!component) {
            break;
          }
          if (component.save) {
            var f = (function (itemVal, componentVal) {
              return function (response) {
                if (response.code == '0') {
                  return componentVal.save();
                }
              };
            }(item, component));

            currentPromise = currentPromise.then(f);
          }
        }
        currentPromise.then((response) => {
          if (response.code == '0') {
            _this.$message({
              message: '保存成功'
            });
            const loginUser = _this.$xutils.getLoginUserInfo();
            _this.orgType = loginUser.org.orgType;
            if (_this.orgType == '3' || _this.orgType == '4') {
              _this.isPlace = 'T';
            } else {
              _this.isPlace = 'F';
            }
            let startdto = {};
            // const orgType = loginUser.org.orgType;
            if (_this.orgType == 'A') {
              if (loginUser.orgCode.startsWith('80')) {
                if (_this.$route.meta.params.pspTask.checkType == '21') {
                  startdto.bizType = 'SGK05'; // 定期贷后检查-对公不良类（寿光）
                } else if (_this.$route.meta.params.pspTask.checkType == '31') {
                  startdto.bizType = 'SGK13'; // 不定期贷后检查-对公不良类（寿光）
                }
              } else if (loginUser.orgCode.startsWith('81')) {
                if (_this.$route.meta.params.pspTask.checkType == '21') {
                  startdto.bizType = 'DHK05'; // 定期贷后检查-对公不良类（东海）
                } else if (_this.$route.meta.params.pspTask.checkType == '31') {
                  startdto.bizType = 'DHK13'; // 不定期贷后检查-对公不良类（东海）
                }
              }
            } else {
              startdto.bizType = 'DH007';
            }

            startdto.systemId = 'cmis';
            startdto.orgId = loginUser.org.code;
            startdto.userId = loginUser.loginCode;
            // startdto.bizType = 'DH007'; // TODO 根据机构数据确定业务类型
            startdto.bizId = _this.pspTaskDetail.taskNo;
            startdto.bizUserName = _this.pspTaskDetail.cusName;
            startdto.bizUserId = _this.pspTaskDetail.cusId;
            startdto.param = {
              isPlace: _this.isPlace,
              orgType: '1',
              rptName: _this.$route.meta.params.rptName,
              formType: _this.$route.meta.params.formType
            };
            if (!startdto.bizType) {
              _this.$message.warning('该登录人无权提交');
              return;
            }
            _this.$refs.yufpNwfInit.wfInit(startdto);
          }
        }).catch(() => {
          _this.$message({
            message: '保存失败'
          });
        });
      }
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
          component = pane.$children[0];
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
    },

    submitSuccess () {
      this.returnFn();
    }

  }
};
</script>
