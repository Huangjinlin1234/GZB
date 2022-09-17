/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 投贷后
 */
<template>
  <div>
    <yu-tabs v-model="activeName">
        <yu-panel ref="panel" title="风险分类任务列表"  color="red" class="adjust-height" :collapse-hide="false">
         <div>
          <yu-button type="primary" @click="chooseFn(1)">查看</yu-button>
          </div>
          <yu-xtable ref="riskTaskTable"  row-number :data-url="dataUrl" request-type="POST" :base-params="searchData" selection-type="radio" condition-key="condition">
            <yu-xtable-column label="客户编号" prop="cusId"  width="370"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="300"></yu-xtable-column>
            <yu-xtable-column label="分类结果认定时间" prop="checkDate"  width="340"></yu-xtable-column>
            <yu-xtable-column label="风险分类结果" prop="taskType" data-code="STD_RISK_TASK_TYPE" width="370"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>
        <yu-panel ref="panel" title="贷后检查情况"  color="red" class="adjust-height" :collapse-hide="false">
         <div>
          <yu-button type="primary" @click="chooseFn(2)">查看</yu-button>
          </div>
        <yu-xtable ref="refTable" selection-type="radio" row-number :data-url="dataUrl1" request-type="POST" :base-params="searchData1" condition-key="condition">
           <yu-xtable-column label="客户编号" prop="cusId" width="300"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="230"></yu-xtable-column>
            <yu-xtable-column label="贷后检查时间" prop="checkDate" width="270"></yu-xtable-column>
            <yu-xtable-column label="贷后检查类型" prop="checkType" data-code="STD_ZB_CHECK_TYPE" width="300"></yu-xtable-column>
          <yu-xtable-column label="贷后检查结论" prop="draiSerno" width="300"></yu-xtable-column>
        </yu-xtable>
        </yu-panel>
        <yu-panel ref="panel" title="风险预警情况"  color="red" class="adjust-height" :collapse-hide="false">
         <div>
          <yu-button type="primary" @click="chooseFn(3)">查看</yu-button>
          </div>
        <yu-xtable ref="applyHistTable" selection-type="radio" row-number :data-url="dataUrl2" request-type="POST" :base-params="baseHistParams" condition-key="condition">
         <yu-xtable-column label="客户编号" prop="cusId" width="300"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="230"></yu-xtable-column>
            <yu-xtable-column label="预警类型" prop="taskNo" width="300"></yu-xtable-column>
            <yu-xtable-column label="风险预警等级" prop="taskType" data-code="STD_RISK_TASK_TYPE" width="300"></yu-xtable-column>
          <yu-xtable-column label="触发预警时间" prop="draiSerno"  width="270"></yu-xtable-column>
        </yu-xtable>
        </yu-panel>
    </yu-tabs>
  </div>
</template>

<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_CHECK_TYPE');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisPsp + '/api/risktasklist/queryList',
      dataUrl1: backend.cmisPsp + '/api/psptasklist/getPspTaskList',
      //   dataUrl2: backend.cmisBiz + '/api/docDestroyAppList/query/pageList'
      searchData: {},
      searchData1: {},
      baseHistParams: {

      },
      checkType: '',
      od: '',
      name0: '',
      name2: '',
      rptName0: '',
      rptName1: '',
      title1: '',
      key1: '',
      table1: '',
      pageName1: '',
      selections: []
    };
  },

  created () {
    let _this = this;
    let data = {};
    if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
    } else if (_this.getFactory().contextData.grpSerno) {
      data = _this.getFactory().contextData;
    } else {
      data = _this.getFactory().contextData.instanceInfo;
    }
    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrpmemrel/querycusbygrpserno',
      data: data.grpSerno,
      callback: function (code, message, response) {
        _this.searchData = {
          condition: {
            cusIdList: response.data
          }
        };
        _this.searchData1 = {
          condition: {
            cusIdListS: response.data
          }
        };
        _this.baseHistParams = {
          condition: {
            cusIdList: response.data
          }
        };
      }
    });
  },

  methods: {

    // 查看
    detail: function (table1, pageName1, name0, key1, title1, selection) {
      let _this = this;
      // let selections = [];
      // _this.selections = _this.$refs.table1.selections;

      // let pspTask = {};
      // yufp.clone(_this.selections[0], pspTask);
      var selectionsAry = selection;
      let status = 'detail';
      let pageName = pageName1;
      // _this.$router.push({path: '/pspCheckRst', query: {pspTask: pspTask, status: status, pageName: pageName }});
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: name0,
          key: key1,
          // 页签名称
          title: title1,
          // 传递的业务数据，可选配置
          data: {pspTask: selectionsAry, status: status, pageName: pageName }
        });
      });
    },

    // 检查
    check1: function (od, name0, rptName0, title1, key1, table1) {
      // let selections = this.$refs.table1.selections;
      var _this = this;
      if (od == undefined && _this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
        return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
      }
      let name = name0;
      let rptName = rptName0;
      let opType = od;
      let title = title1;
      let key = key1 + new Date().getTime();
      this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key
          key: key,
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: { pspTask: _this.selections[0], opType: opType, rptName: rptName }
        });
      });
    },
    // 检查
    check: function (od, name0, name2, rptName0, rptName1, title1, key1, table1) {
      // let selections = this.$refs.table1.selections;
      var _this = this;
      if (od == undefined && _this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
        return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
      }
      let name = name0;
      let rptName = rptName0;
      if (_this.selections[0].rptType == '3') {
        name = name2;
        rptName = rptName1;
      }
      let opType = od;
      let title = title1;
      let key = key1 + new Date().getTime();
      this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key
          key: key,
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: { pspTask: _this.selections[0], opType: opType, rptName: rptName }
        });
      });
    },


    chooseFn: function (op) {
      var _this = this;
      _this.od = '';
      _this.name0 = '';
      _this.rptName0 = '';
      _this.rptName1 = '';
      _this.title1 = '';
      _this.key1 = '';
      _this.table1 = '';
      _this.pageName1 = '';
      _this.selections = [];
      _this.checkType = '';
      if (op == 1) {
        _this.selections = _this.$refs.riskTaskTable.selections;
      } else if (op == 2) {
        _this.selections = _this.$refs.refTable.selections;
      } else {
        _this.selections = _this.$refs.applyHistTable.selections;
      }
      if (_this.selections.length != 1) {
        _this.$message({ message: '请选择一条数据进行操作！', type: 'warning' });
        return;
      }

      _this.checkType = _this.selections[0].checkType;
      switch (_this.checkType) {
      case '21':
        // console.log('定期检查（对公）');
        let nameo = '';
        if (_this.selections.length != 1) {
          return this.$message({ message: '请先选择一条记录', type: 'warning' });
        }
        if (_this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
          return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
        }
        if (_this.selections[0].rptType == '3') {
          nameo = 'psp/pspchecktask/blDetail';
        } else {
          nameo = 'psp/pspchecktask/fblDetail';
        }

        let rptName = 'smallConsumeRegular.cpt';
        let formType = 'details';
        let titleo = '定期检查（对公）';
        let key = new Date().getTime();
        _this.$nextTick(function () {
          this.$router.addTab({
            // 路由名称
            name: nameo,
            // 自定义唯一页签key
            key: key,
            // 页签名称
            title: titleo,
            // 传递的业务数据，可选配置
            data: { pspTask: _this.selections[0], rptName: rptName, flagg: _this.flagg, formType: formType}
          });
        });
        break;
      case '22':
        // console.log('定期检查（个人经营性）');
        _this.od = 'view';
        _this.name0 = 'pspmanage/pspCheck/regularCheck/indivOperRegularTree';
        _this.name2 = 'pspmanage/pspCheck/regularCheck/indivOperRegularBadTree';
        _this.rptName0 = 'indivOperRegular.cpt';
        _this.rptName1 = 'indivOperRegularBad.cpt';
        _this.title1 = '定期贷后检查（个人经营性）';
        _this.key1 = 'indivOperPspCheckRst' + new Date().getTime();
        _this.check(_this.od, _this.name0, _this.name2, _this.rptName0, _this.rptName1, _this.title1, _this.key1, _this.table1);
        break;
      case '23':
        // console.log('定期检查（个人消费性）');
        _this.od = 'view';
        _this.name0 = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularTree';
        _this.name2 = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularBadTree';
        _this.rptName0 = 'indivConsumeRegular.cpt';
        _this.rptName1 = 'indivConsumeRegularBad.cpt';
        _this.title1 = '定期贷后检查（个人消费性）';
        _this.key1 = 'indivOperPspCheckRst' + new Date().getTime();
        _this.check(_this.od, _this.name0, _this.name2, _this.rptName0, _this.rptName1, _this.title1, _this.key1, _this.table1);
        break;
      case '24':
        // console.log('定期检查（小微经营性）');
        _this.od = 'view';
        _this.name0 = 'pspmanage/pspCheck/regularCheck/smallOperRegularTree';
        // _this.name2 = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularBadTree';
        _this.rptName0 = 'smallOperRegular.cpt';
        // _this.rptName1 = 'indivConsumeRegularBad.cpt';
        _this.title1 = '定期贷后检查（小微经营性）';
        _this.key1 = 'smallOperPspCheckRst' + new Date().getTime();
        _this.check1(_this.od, _this.name0, _this.rptName0, _this.title1, _this.key1, _this.table1);
        break;
      case '25':
        // console.log('定期检查（小微消费性）');
        _this.od = 'view';
        _this.name0 = 'pspmanage/pspCheck/regularCheck/smallConsumeRegularTree';
        // _this.name2 = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularBadTree';
        _this.rptName0 = 'smallConsumeRegular.cpt';
        // _this.rptName1 = 'indivConsumeRegularBad.cpt';
        _this.title1 = '定期贷后检查（小微消费性）';
        _this.key1 = 'smallConsumePspCheckRst' + new Date().getTime();
        _this.check1(_this.od, _this.name0, _this.rptName0, _this.title1, _this.key1, _this.table1);
        break;
      case '26':
        // console.log('不定期检查（同业授信）');
        _this.od = 'view';
        _this.name0 = 'pspmanage/pspCheck/regularCheck/capRegularTree';
        // _this.name2 = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularBadTree';
        // _this.rptName0 = 'smallConsumeRegular.cpt';
        // _this.rptName1 = 'indivConsumeRegularBad.cpt';
        _this.title1 = '不定期检查（同业授信）';
        _this.key1 = 'capPspCheckRst' + new Date().getTime();
        _this.check1(_this.od, _this.name0, _this.rptName0, _this.title1, _this.key1, _this.table1);
        break;
      case '11' || '12':
        // console.log('首次检查（对公和个人）');
        _this.pageName1 = 'dggr';
        _this.name0 = 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst';
        _this.key1 = 'pspCheckRst' + new Date().getTime();
        _this.title1 = '首次检查（对公和个人）';
        _this.detail(_this.table1, _this.pageName1, _this.name0, _this.key1, _this.title1);
        break;
      case '13':
        // console.log('首次检查（个人消费性）');
        _this.pageName1 = 'grxf';
        _this.name0 = 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst';
        _this.key1 = new Date().getTime();
        _this.title1 = '首次检查（个人消费性）';
        // console.log(_this.selections[0].taskNo);
        _this.detail(_this.table1, _this.pageName1, _this.name0, _this.key1, _this.title1, _this.selections[0]);
        break;
      case '14':
        // console.log('首次检查（小微经营性）');
        _this.pageName1 = 'xwjy';
        _this.name0 = 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst';
        _this.key1 = 'pspCheckRst' + new Date().getTime();
        _this.title1 = '首次检查（小微经营性）';
        _this.detail(_this.table1, _this.pageName1, _this.name0, _this.key1, _this.title1);
        break;
      case '15':
        // console.log('首次检查（小微消费性）');
        _this.pageName1 = 'xwjy';
        _this.name0 = 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst';
        _this.key1 = 'pspCheckRst' + new Date().getTime();
        _this.title1 = '首次检查（小微消费性）';
        _this.detail(_this.table1, _this.pageName1, _this.name0, _this.key1, _this.title1);
        break;
      case '31' || '32' || '33' || '34' || '35':
        // console.log('不定期检查（对公，个人经营，个人消费，小微经营，小微消费）')
        // let selections = this.$refs.refTable.selections;
        if (_this.selections.length != 1) {
          return this.$message({message: '请先选择一条记录', type: 'warning'});
        }
        if (_this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
          return this.$message({message: '当前审批状态不允许检查!', type: 'warning'});
        }
        let name = 'pspmanage/pspCheck/regularCheck/indivOperRegularTree';
        let title = '不定期检查（个人经营性）';
        if (_this.selections[0].checkType == '32' && _this.selections[0].rptType == '3') {
          name = 'pspmanage/pspCheck/regularCheck/indivOperRegularBadTree';
          title = '不定期检查（个人经营性）';
        } else if (_this.selections[0].checkType == '33' && _this.selections[0].rptType == '3') {
          name = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularBadTree';
          title = '不定期检查（个人消费性）';
        } else if (_this.selections[0].checkType == '33') {
          name = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularTree';
          title = '不定期检查（个人消费性）';
        } else if (_this.selections[0].checkType == '34') {
          name = 'pspmanage/pspCheck/regularCheck/smallOperRegularTree';
          title = '不定期检查（小微经营性）';
        } else if (_this.selections[0].checkType == '35') {
          name = 'pspmanage/pspCheck/regularCheck/smallConsumeRegularTree';
          title = '不定期检查（小微消费性）';
        }
        let opType = 'view';
        let keyo = 'irregularPspCheckRst' + new Date().getTime();
        this.$nextTick(function () {
          this.$router.addTab({
          // 路由名称
            name: name,
            // 自定义唯一页签key
            key: keyo,
            // 页签名称
            title: title,
            // 传递的业务数据，可选配置
            data: {pspTask: _this.selections[0], opType: opType}
          });
        });
        break;
      case '36' || '37' || '38':
        // console.log('不定期检查（同业授信，主体授信，产品授信）')
        // selections = this.$refs.pspTaskTable.selections;
        if (_this.selections.length != 1) {
          return this.$message({message: '请先选择一条记录', type: 'warning'});
        }
        if (_this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
          return this.$message({message: '当前审批状态不允许检查!', type: 'warning'});
        }
        let name1 = 'pspmanage/pspCheck/regularCheck/capRegularTree';
        let title1 = '投后定期检查';
        let opType1 = 'view';
        let key1 = 'capPspCheckRst' + new Date().getTime();
        this.$nextTick(function () {
          this.$router.addTab({
          // 路由名称
            name: name1,
            // 自定义唯一页签key
            key: key1,
            // 页签名称
            title: title1,
            // 传递的业务数据，可选配置
            data: {pspTask: _this.selections[0], opType: opType1, key: key1}
          });
        });
        break;
      case '41':
        // console.log('不定期检查（总行下发不定期贷后检查任务）')
        // selections = _this.$refs.pspTaskTable.selections;
        if (_this.selections.length != 1) {
          return this.$message({message: '请先选择一条记录', type: 'warning'});
        }
        if (op == undefined && _this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
          return this.$message({message: '当前审批状态不允许检查!', type: 'warning'});
        }
        let issueFlag = _this.selections[0].issueId === _this.$xutils.getDefaultformulaData('$LoginLoginCode');
        let checkFlag = _this.selections[0].execId === _this.$xutils.getDefaultformulaData('$LoginLoginCode');
        let name0 = 'pspmanage/pspCheck/irregularCheck/issueCheckDetail';
        let title2 = '总行下发不定期贷后检查任务';
        let opType3 = 'view';
        let key2 = 'irregularPspCheckRst' + new Date().getTime();
        _this.$nextTick(function () {
          _this.$router.addTab({
          // 路由名称
            name: name0,
            // 自定义唯一页签key
            key: key2,
            // 页签名称
            title: title2,
            // 传递的业务数据，可选配置
            data: {pspTask: _this.selections[0], opType: opType3, issueFlag: issueFlag, checkFlag: checkFlag }
          });
        });
        break;
      case '1':
        // selections = this.$refs.riskTaskTable.selections;
        if (_this.selections.length != 1) {
          return this.$message({ message: '请先选择一条记录', type: 'warning' });
        }
        if (op == undefined && _this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
          return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
        }
        let opType4 = 'view';
        let title3 = '公司客户风险分类详情';
        this.$nextTick(function () {
          this.$router.addTab({
            // 路由名称
            name: 'pspmanage/riskDivide/corpRiskTree',
            // 自定义唯一页签key
            key: 'corpRiskCheckRst' + new Date().getTime(),
            // 页签名称
            title: title3,
            // 传递的业务数据，可选配置
            data: { riskTask: _this.selections[0], opType: opType4 }
          });
        });
        break;
      case '3':
        // selections = this.$refs.riskTaskTable.selections;
        if (_this.selections.length != 1) {
          return this.$message({ message: '请先选择一条记录', type: 'warning' });
        }
        if (op == undefined && _this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
          return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
        }
        let opType5 = 'view';
        let title4 = '个人消费性风险分类详情';
        this.$nextTick(function () {
          this.$router.addTab({
            // 路由名称
            name: 'pspmanage/riskDivide/indivConsumeRiskTree',
            // 自定义唯一页签key
            key: 'consumeRiskCheckRst' + new Date().getTime(),
            // 页签名称
            title: title4,
            // 传递的业务数据，可选配置
            data: { riskTask: _this.selections[0], opType: opType5 }
          });
        });
        break;
      case '2':
        // selections = this.$refs.riskTaskTable.selections;
        if (_this.selections.length != 1) {
          return this.$message({ message: '请先选择一条记录', type: 'warning' });
        }
        if (op == undefined && _this.selections[0].approveStatus !== '000' && _this.selections[0].approveStatus !== '992') {
          return this.$message({ message: '当前审批状态不允许检查!', type: 'warning' });
        }
        let opType6 = 'view';
        let title5 = '个人经营性风险分类详情';
        this.$nextTick(function () {
          this.$router.addTab({
            // 路由名称
            name: 'pspmanage/riskDivide/indivOperRiskTree',
            // 自定义唯一页签key
            key: 'operRiskCheckRst' + new Date().getTime(),
            // 页签名称
            title: title5,
            // 传递的业务数据，可选配置
            data: { riskTask: _this.selections[0], opType: opType6 }
          });
        });
        break;
      default:
        break;
      }
    }
  }
};
</script>