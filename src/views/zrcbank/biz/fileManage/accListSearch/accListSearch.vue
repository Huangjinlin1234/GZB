<template>
    <!--
    @created by wcx
    @updated by  2021-6-17 修改代码规范
    @updated by  2021-6-17 更新组件内容及标签
    @description 模板示例——电子档案查询
  -->
  <div>
        <yu-panel title=" 查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" ref="formdata"  v-model="formdata" label-width="110px">
              <yu-xform-group :column="4">
                 <yu-xform-item label="客户编号" ctype="YuXcusBase" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode','cusCatalog':'cusCatalog','checkType':'checkType','belgLine':'belgLine'}" rules="required"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="" name="cusName" disabled></yu-xform-item>
                <yu-xform-item label="客户大类" placeholder="" name="cusCatalog" hidden></yu-xform-item>
              </yu-xform-group>
            </yu-xform>

          <div class="button-group" align="center">
          <yu-button type="primary" @click="searchFn">查询</yu-button>
          <yu-button type="primary" @click="resetFn">重置</yu-button>
        </div>
        </yu-panel>
      <yu-panel title="贷款电子信息详情" :hideFilter="false" :collapseHide="false">
        <yu-container>
          <el-aside width="200px">
           <yu-xtree
           @current-change="click"
             :local-data="data1"
              data-id="id"
              data-label="label"
              data-pid="pid"
              default-expand-all
             :render-custom-content="renderCustomContent"
             data-root="0">
          </yu-xtree>
         </el-aside>
        <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl"  requestType="POST">
        <yu-xtable-column align="center" label="业务发生时间" prop="inputDate" width="300"></yu-xtable-column>
        <yu-xtable-column align="center" label="业务流水号" prop="bizSerno" width="300"></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称" prop="prdName" data-code="STD_DOC_TYPE" width="200"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案编号" prop="docNo" width="300"></yu-xtable-column>
        <yu-xtable-column align="center" label="操作" prop="opr" width="150">
          <template slot-scope="drawScope">
            <yu-button size="small" type="primary" @click="search(drawScope.$index, drawScope.row)">查看</yu-button>
          </template>
        </yu-xtable-column>
        </yu-xtable>
      </yu-container>
      </yu-panel>


  </div>
</template>

<script>
// 注册字典项
yufp.lookup.reg('STD_DOC_TYPE');
export default {
  data: function () {
    return {
      formdata: {},
      select: {},
      tableData: {},

      data1: [{
        id: 1,
        label: '档案目录',
        children: []
      }],

      data2: {
        id: 2,
        label: '基础信息',
        children: []
      },
      data3: {
        id: 3,
        label: '授信信息',
        children: []
      },
      data4: {
        id: 4,
        label: '放款信息',
        children: []
      },
      data5: {
        id: 5,
        label: '贷后检查信息',
        children: []
      },
      data6: {
        id: 6,
        label: '其他合同信息',
        children: []
      },
      dataUrl: backend.cmisBiz + '/api/docAccList/queryAccListByDocTypeAndYear',
      type: ''

    };
  },
  created () {
    var _this = this;
    _this.data1[0].children.push(_this.data2);
    _this.data1[0].children.push(_this.data3);
    _this.data1[0].children.push(_this.data4);
    _this.data1[0].children.push(_this.data5);
    _this.data1[0].children.push(_this.data6);
  },
  methods: {
    afterInit (params) {
      var _this = this;
      var data = '';
      var baseMessage = {};
      var shouxiMessage = {};
      var daihouMessage = {};
      var otherMessage = {};
      var fangkuang = {};
      yufp.service.request({
        method: 'POST',
        data: params,
        url: backend.cmisBiz + '/api/docAccList/getAccTimeList',
        callback: function (code, message, response) {
          if (response.code == 0) {
            data = response.data;
            data.base.forEach(function (value, index) {
              baseMessage.id = index + 'base';
              baseMessage.label = value;
              _this.data2.children.push(baseMessage);
              baseMessage = {};
            });
            data.lmt.forEach(function (value, index) {
              shouxiMessage.id = index + 'lmt';
              shouxiMessage.label = value;
              _this.data3.children.push(shouxiMessage);
              shouxiMessage = {};
            });
            data.amt.forEach(function (value, index) {
              fangkuang.id = index + 'amt';
              fangkuang.label = value;
              _this.data4.children.push(fangkuang);
              fangkuang = {};
            });
            data.check.forEach(function (value, index) {
              daihouMessage.id = index + 'check';
              daihouMessage.label = value;
              _this.data5.children.push(daihouMessage);
              daihouMessage = {};
            });

            data.other.forEach(function (value, index) {
              otherMessage.id = index + 'other';
              otherMessage.label = value;
              _this.data6.children.push(otherMessage);
              otherMessage = {};
            });


            _this.data1[0].children.push(_this.data2);
            _this.data1[0].children.push(_this.data3);
            _this.data1[0].children.push(_this.data4);
            _this.data1[0].children.push(_this.data5);
            _this.data1[0].children.push(_this.data6);
          } else {
            // _this.$message({ message: '操作失败：', type: 'error' });
            _this.$message.error(response.message);
          }
        }

      });
    },
    // backend.cmisCus + '/api/cusbase/'
    // 查看
    search (index, row) {
      console.log('row', row);

      var _this = this;
      row.cusId = _this.formdata.cusId;
      row.cusCatalog = _this.formdata.cusCatalog;
      if (_this.type == 'base') {
        if (row.cusCatalog == '1') { // 个人客户
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisCus + '/api/cusindiv/queryCusIndiv',
            data: {condition: JSON.stringify({cusId: row.cusId})},
            callback: function (code, message, response) {
              if (code == 0) {
                let json = {};
                let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
                let title = '';
                let key = '';
                json['op'] = 'VIEW';
                json['cusId'] = row.cusId;
                yufp.clone(response.data, json);
                // 个人正式客户创建 B01
                if (json.cusRankCls == '01') { // 正式客户-查看
                  json['inType'] = 'indivCusQuery'; // 个人客户查看进入
                  name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndivDefend';
                }
                key = 'tempCusIndivlsView' + new Date().getTime();
                title = '个人客户查看';
                json.key = `/${name}/${key}`;
                _this.$router.addTab({
                // 路由名称
                  name: name,
                  // 自定义唯一页签key,请统一使用custom_前缀开头
                  key: key,
                  // 页签名称
                  title: title,
                  // 传递的业务数据，可选配置
                  data: json
                });
              }
            }});
        } else if (row.cusCatalog == '2') { // 公司客户
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisCus + '/api/cusbase/cusBaseInfo',
            data: row.cusId,
            callback: function (code, message, response) {
              if (code == 0) {
                let json = {};
                let title = '';
                let name = '';
                let key = '';
                json['cusId'] = row.cusId;
                yufp.clone(response.data, json);
                if (response.data.cusRankCls == '01') {
                  json['modelGroupNo'] = 'CMG000296';
                  json['viewType'] = 'VIEW';
                  json['opType'] = 'view';
                  title = '公司客户查看';
                  name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
                  // 个人正式客户创建 B01
                  key = new Date().getTime();
                  json.key = `/${name}/${key}`;
                } else {
                  json['model_group_no'] = 'CMG000251';
                  json['tplId'] = 'CMG000251';
                  json['op'] = 'VIEW';
                  json['viewType'] = 'view';
                  title = '公司临时客户查看';
                  name = 'zrcbank/cus/cuscom/tempCusComCreate/tempCusComCreate';
                  // 对公正式客户创建 B01
                  key = new Date().getTime();
                  json.key = `/${name}/${key}`;
                }
                _this.$router.addTab({
                  // 路由名称
                  name: name,
                  // 自定义唯一页签key,请统一使用custom_前缀开头
                  key: key,
                  // 页签名称
                  title: title,
                  // 传递的业务数据，可选配置
                  data: json
                });
              }
            }
          });
        }
      } else if (_this.type == 'lmt') { // 单一客户授信申报
        let baseParams = { serno: row.bizSerno};
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
          data: baseParams,
          callback: function (code, message, response) {
            if (response.data) {
              let json = {};
              yufp.clone(response.data, json);
              var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
              var topOutsystemCode = '';
              if (json.lmtType == '05') {
                topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXFYSQZL;SXFYDBZL;XD_FZHYXCL;ZHSXPF';
              } else {
                topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF';
              }
              _this.$router.addTab({
                name: path,
                key: json.pkId,
                title: '单一客户授信申报',
                data: {
                  model_group_no: 'CMG000702',
                  pk_id: json.pkId,
                  scene: '01',
                  op: 'VIEW',
                  serno: json.serno,
                  period: '01',
                  biz_serno: json.serno,
                  cusId: json.cusId,
                  borrowerCusId: json.cusId,
                  borrowerCusName: json.cusName,
                  ogrigiLmtSerno: json.ogrigiLmtSerno,
                  topOutsystemCode: topOutsystemCode
                }
              });
            }
          }});
      } else if (_this.type == 'amt') {
        if (row.belgLine == '01') { // 小微放款
          let baseParams = {condition: JSON.stringify({pvpSerno: row.bizSerno})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisBiz + '/api/pvploanapp/selectDataByModel',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                json.PageType = 'LOOK';
                _this.nextPage(json);
              }
            }});
        } else if (row.belgLine == '02') { // 零售放款
          console.log('1111111111111111111');
          let baseParams = {condition: JSON.stringify({pvpSerno: row.bizSerno})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisBiz + '/api/pvploanapp/selectDataByModel',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                var pvpSerno = json.pvpSerno;
                var iqpSerno = json.iqpSerno;
                var contNo = json.contNo;
                var certCode = '';
                var imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ;';
                yufp.service.request({
                  async: false,
                  method: 'post',
                  url: backend.cmisBiz + '/api/iqploanapp/show',
                  data: iqpSerno,
                  callback: function (code, message, response) {
                    certCode = response.data.certCode;
                  }
                });

                _this.$router.addTab({
                  // 路由名称
                  name: 'zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPageView', // 菜单路径
                  // 自定义唯一页签key,请统一使用custom_前缀开头
                  key: 'custom_info_' + pvpSerno, // 必传
                  // key: 'custom_pvpLoanAppPage', // 必传
                  // 页签名称
                  title: '放款申请信息',
                  // 传递的业务数据，可选配置
                  data: {
                    pageType: 1, // 查看,
                    pvpSerno: pvpSerno,
                    serno: pvpSerno,
                    pageName: 'info_' + pvpSerno,
                    iqpSerno: iqpSerno,
                    contNo: contNo,
                    period: '03',
                    borrowerCusId: json.cusId,
                    borrowerCusName: json.cusName,
                    borrowerCertCode: certCode,
                    oprType: '03',
                    topOutsystemCode: imageCode

                  }
                });
              }
            }});
        } else if (row.belgLine == '03') { // 对公放款
          // let baseParams = {condition: JSON.stringify({ cusId: row.cusId})};
          // yufp.service.request({
          //   method: 'POST',
          //   url: backend.cmisBiz + '/api/pvploanapp/tosignlist',
          //   data: baseParams,
          //   callback: function (code, message, response) {
          //     if (response.data) {
          let json = {};
          let op = 'VIEW';
          //       yufp.clone(response.data[0], json);
          json.pvpSerno = row.bizSerno;
          json.contNo = row.contNo;
          json.op = op;
          _this.getContInfo(json, op);
          // }
          // }});
        }
        // yufp.service.request({
        //   method: 'POST',
        //   url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
        //   data: row.cusId,
        //   callback: function (code, message, response) {
        //     if (response.data) {
        //       let json = {};
        //       yufp.clone(response.data[0], json);
        //     }
        //   }});
      } else if (_this.type == 'check') {
        if (row.checkType == '11' || row.checkType == '12') { // 首次贷后检查对公及个人经营
          let baseParams = {condition: JSON.stringify({checkType: '11,12', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let status = 'detail';
                let pageName = 'dggr';
                let rptName = 'corpFirst.cpt';
                // _this.$router.push({path: '/pspCheckRst', query: {pspTask: pspTask, status: status, pageName: pageName }});
                _this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst',
                    key: new Date().getTime(),
                    // 页签名称
                    title: '首次贷后检查',
                    // 传递的业务数据，可选配置
                    data: {
                      pspTask: json,
                      status: status,
                      pageName: pageName,
                      rptName: rptName
                    }
                  });
                });
              }
            }});
        } else if (row.checkType == '13') { // 首次贷后检查 个人消费性首次检查
          let baseParams = {condition: JSON.stringify({checkType: '13', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let status = 'detail';
                let pageName = 'grxf';
                let rptName = 'indivConsumeFirst.cpt';
                _this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst',
                    key: 'pspCheckRst',
                    // 页签名称
                    title: '首次贷后检查',
                    // 传递的业务数据，可选配置
                    data: {pspTask: json, status: status, pageName: pageName, rptName: rptName }
                  });
                });
              }
            }});
        } else if (row.checkType == '14') { // 首次贷后检查 小微经营性首次检查
          let baseParams = {condition: JSON.stringify({checkType: '14', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let status = 'detail';
                let pageName = 'xwjy';
                let rptName = 'smallOperFirst.cpt';
                // _this.$router.push({path: '/pspCheckRst', query: {pspTask: pspTask, status: status, pageName: pageName }});
                _this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst',
                    key: 'pspCheckRst',
                    // 页签名称
                    title: '首次贷后检查',
                    // 传递的业务数据，可选配置
                    data: {pspTask: json, status: status, pageName: pageName, rptName: rptName}
                  });
                });
              }
            }});
        } else if (row.checkType == '15') { // 首次贷后检查 小微消费性首次检查
          let baseParams = {condition: JSON.stringify({checkType: '15', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let status = 'detail';
                let pageName = 'xwxf';
                let rptName = 'indivConsumeFirst.cpt';
                // _this.$router.push({path: '/pspCheckRst', query: {pspTask: pspTask, status: status, pageName: pageName }});
                _this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: 'zrcbank/psp/pspCheck/dhjc/firstCheck/pspCheckRst',
                    key: new Date().getTime(),
                    // 页签名称
                    title: '首次贷后检查',
                    // 传递的业务数据，可选配置
                    data: {pspTask: json, status: status, pageName: pageName, rptName: rptName }
                  });
                });
              }
            }});
        } else if (row.checkType == '21') { // 投贷后定期检查  对公定期检查
          let baseParams = {condition: JSON.stringify({checkType: '21', cusId: row.cusId})};
          let name = '';
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let rptName = '';
                if (json.rptType == '3') { // 报告类型 ---- 不良类
                  rptName = 'corpRegularBad.cpt';
                  name = 'psp/pspchecktask/blDetail';
                } else {
                  name = 'psp/pspchecktask/fblDetail'; // 报告类型 ----正常类、瑕疵类
                  rptName = 'corpRegular.cpt';
                }

                let taskNo = json.taskNo;
                let cusId = json.cusId;
                let cusName = json.cusName;


                _this.formType = 'details'; // 跳转页面类型：查看/检查
                let title = '定期贷后检查（对公）';
                let key = new Date().getTime();
                _this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: { pspTask: json, rptName: rptName, flagg: _this.flagg, formType: _this.formType, taskNo: taskNo, cusId: cusId, cusName: cusName}
                  });
                });
              }
            }});
        } else if (row.checkType == '23') { // 投贷后定期检查  个人消费性定期检查
          let baseParams = {condition: JSON.stringify({checkType: '23', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let name = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularTree';
                let rptName = 'indivConsumeRegular.cpt';
                if (json.rptType == '3') {
                  name = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularBadTree';
                  rptName = 'indivConsumeRegularBad.cpt';
                }
                //
                let coopAgrSerno = json.taskNo;
                let partnerNo = json.cusId;
                let partnerName = json.cusName;


                let opType = 'view';
                let title = '定期贷后检查（个人消费性）';
                let key = 'indivOperPspCheckRst' + new Date().getTime();
                this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: { pspTask: json, opType: opType, rptName: rptName, coopAgrSerno: coopAgrSerno, partnerNo: partnerNo, partnerName: partnerName }
                  });
                });
              }
            }});
        } else if (row.checkType == '22') { // 投贷后定期检查  个人经营性定期检查
          let baseParams = {condition: JSON.stringify({checkType: '22', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let name = 'pspmanage/pspCheck/regularCheck/indivOperRegularTree';
                let rptName = 'indivOperRegular.cpt';
                if (json.rptType == '3') {
                  name = 'pspmanage/pspCheck/regularCheck/indivOperRegularBadTree';
                  rptName = 'indivOperRegularBad.cpt';
                }

                let coopAgrSerno = json.taskNo;
                let partnerNo = json.cusId;
                let partnerName = json.cusName;

                let opType = 'view';
                this.formType = 'view';
                let title = '定期贷后检查（个人经营性）';
                let key = 'indivOperPspCheckRst' + new Date().getTime();
                this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: { pspTask: json, opType: opType, rptName: rptName, formType: this.formType, coopAgrSerno: coopAgrSerno, partnerNo: partnerNo, partnerName: partnerName}
                  });
                });
              }
            }});
        } else if (row.checkType == '25') { // 投贷后定期检查  小微消费性定期检查
          let baseParams = {condition: JSON.stringify({checkType: '25', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let coopAgrSerno = json.taskNo;
                let partnerNo = json.cusId;
                let partnerName = json.cusName;

                let rptName = '';
                let name = 'pspmanage/pspCheck/regularCheck/smallConsumeRegularTree';
                if (json.rptType == '1') { // 正常
                  rptName = 'smallConsumeRegular.cpt';
                } else if (json.rptType == '2') { // 瑕疵
                  rptName = 'smallConsumeRegularXC.cpt';
                } else if (json.rptType == '3') { // 不良
                  rptName = 'smallConsumeRegularBL.cpt';
                }


                let opType = 'view';
                let title = '定期贷后检查（小微消费性）';
                let key = 'smallConsumePspCheckRst' + new Date().getTime();
                this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: { pspTask: json, opType: opType, rptName: rptName, coopAgrSerno: coopAgrSerno, partnerNo: partnerNo, partnerName: partnerName }
                  });
                });
              }
            }});
        } else if (row.checkType == '24') { // 投贷后定期检查  小微经营性定期检查
          let baseParams = {condition: JSON.stringify({checkType: '24', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let coopAgrSerno = json.taskNo;
                let partnerNo = json.cusId;
                let partnerName = json.cusName;
                let rptName = '';
                let name = 'pspmanage/pspCheck/regularCheck/smallOperRegularTree';
                if (json.rptType == '1') { // 正常
                  rptName = 'smallOperRegular.cpt';
                } else if (json.rptType == '2') { // 瑕疵
                  rptName = 'smallOperRegularXC.cpt';
                } else if (json.rptType == '3') { // 不良
                  rptName = 'smallOperRegularBL.cpt';
                }

                let opType = 'view';
                let title = '定期贷后检查（小微经营性）';
                let key = 'smallOperPspCheckRst' + new Date().getTime();
                this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: { pspTask: json, opType: opType, rptName: rptName, coopAgrSerno: coopAgrSerno, partnerNo: partnerNo, partnerName: partnerName }
                  });
                });
              }
            }});
        } else if (row.checkType == '26' || row.checkType == '27' || row.checkType == '28') { // 投贷后定期检查  投后定期检查
          let baseParams = {condition: JSON.stringify({checkType: '26,27,28', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let coopAgrSerno = json.taskNo;
                let partnerNo = json.cusId;
                let partnerName = json.cusName;

                let name = 'pspmanage/pspCheck/regularCheck/capRegularTree';
                let opType = 'view';
                let title = '投后定期检查';
                let key = 'capPspCheckRst' + new Date().getTime();
                let rptName = 'capRegular.cpt';
                this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: { pspTask: json, opType: opType, rptName: rptName, coopAgrSerno: coopAgrSerno, partnerNo: partnerNo, partnerName: partnerName }
                  });
                });
              }
            }});
        } else if (row.checkType == '41') { // 投贷后不定期检查  总行下发不定期
          let baseParams = {condition: JSON.stringify({checkType: '41', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let issueFlag = false;
                let checkFlag = false;
                let viewFlag = true;
                let name = 'pspmanage/pspCheck/irregularCheck/issueCheckDetail';
                let title = '总行下发不定期贷后检查任务';
                let opType = 'view';
                let key = 'irregularPspCheckRst' + new Date().getTime();
                _this.$nextTick(function () {
                  _this.$router.addTab({
                    // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: {pspTask: json, opType: opType, issueFlag: issueFlag, checkFlag: checkFlag, viewFlag: viewFlag }
                  });
                });
              }
            }});
        } else if (row.checkType == '31' || row.checkType == '32' || row.checkType == '33' || row.checkType == '34' || row.checkType == '35') { // 投贷后不定期检查  客户经理不定期
          let baseParams = {condition: JSON.stringify({checkType: '31,32,33,34,35', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                _this.formType = 'view';

                // 不定期个人经营性正常瑕疵报表
                let title, name, rptName;
                if (json.checkType == '32' && json.rptType == '3') {
                // 不定期个人经营性不良报表
                  rptName = 'indivOperRegularBad.cpt';
                  name = 'pspmanage/pspCheck/regularCheck/indivOperRegularBadTree';
                  title = '不定期检查（个人经营性）';
                } else if (json.checkType == '32') {
                // 不定期个人消费性不良报表
                  rptName = 'indivRegular.cpt';
                  name = 'pspmanage/pspCheck/regularCheck/indivOperRegularTree';
                  title = '不定期检查（个人经营性）';
                } else if (json.checkType == '33' && json.rptType == '3') {
                // 不定期个人消费性不良报表
                  rptName = 'indivConsumeRegularBad.cpt';
                  name = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularBadTree';
                  title = '不定期检查（个人消费性）';
                } else if (json.checkType == '33') {
                // 不定期个人消费性通用报表
                  rptName = 'indivConsumeRegular.cpt';
                  name = 'pspmanage/pspCheck/regularCheck/indivConsumeRegularTree';
                  title = '不定期检查（个人消费性）';
                } else if (json.checkType == '34') {
                // 不定期检查（小微经营性）
                  rptName = 'indivConsumeFirst.cpt';
                  name = 'pspmanage/pspCheck/regularCheck/smallOperRegularTree';
                  title = '不定期检查（小微经营性）';
                } else if (json.checkType == '35') {
                  rptName = 'indivConsumeFirst.cpt';
                  name = 'pspmanage/pspCheck/regularCheck/smallConsumeRegularTree';
                  title = '不定期检查（小微消费性）';
                } else if (json.checkType == '31' && json.rptType == '3') {
                // 不定期对公不良
                  rptName = 'corpRegularBad.cpt';
                  name = 'psp/pspchecktask/blDetail';
                  title = '不定期检查（对公）';
                } else if (json.checkType == '31') {
                  rptName = 'corpRegular.cpt';
                  name = 'psp/pspchecktask/fblDetail';
                  title = '不定期检查（对公）';
                }
                let taskNo = json.taskNo;
                let partnerNo = json.cusId;
                let partnerName = json.cusName;

                let opType = 'view';
                let key = 'irregularPspCheckRst' + new Date().getTime();
                _this.$nextTick(function () {
                  _this.$router.addTab({
                  // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: {pspTask: json, opType: opType, rptName: rptName, formType: _this.formType, taskNo: taskNo, partnerNo: partnerNo, partnerName: partnerName}
                  });
                });
              }
            }});
        } else if (row.checkType == '36' || row.checkType == '37' || row.checkType == '38') { // 投贷后不定期检查 投后不定期自检
          let baseParams = {condition: JSON.stringify({checkType: '36,37,38', cusId: row.cusId})};
          yufp.service.request({
            method: 'POST',
            url: _this.$backend.cmisPsp + '/api/psptasklist/getPspTaskList',
            data: baseParams,
            callback: function (code, message, response) {
              if (response.data) {
                let json = {};
                yufp.clone(response.data[0], json);
                let coopAgrSerno = json.taskNo;
                let partnerNo = json.cusId;
                let partnerName = json.cusName;

                let name = 'pspmanage/pspCheck/regularCheck/capRegularTree';
                let type = 'capRegularTree';
                let title = '投后不定期检查';
                let opType = 'view';
                let rptName = 'capRegular.cpt';
                let key = 'capPspCheckRst' + new Date().getTime();
                this.$nextTick(function () {
                  this.$router.addTab({
                    // 路由名称
                    name: name,
                    // 自定义唯一页签key
                    key: key,
                    // 页签名称
                    title: title,
                    // 传递的业务数据，可选配置
                    data: {pspTask: json, opType: opType, key: key, rptName: rptName, type: type, coopAgrSerno: coopAgrSerno, partnerNo: partnerNo, partnerName: partnerName}
                  });
                });
              }
            }});
        }
      } else if (_this.type == 'other') { // 普通贷款合同
        let baseParams = {condition: JSON.stringify({ contNo: row.contNo})};
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/ctrloancont/selectctrloancontlistdata',
          data: baseParams,
          callback: function (code, message, response) {
            if (response.data) {
              let json = {};
              yufp.clone(response.data[0], json);
              json.opType = 'view';
              json.op = 'VIEW';
              _this.goToDetailFn(json);
            }
          }});
      }
    },
    click (value, data) {
      var _this = this;
      // var parentLabel = data.parent.label;
      _this.tableData.inputDate = value.label;
      _this.select.type = value.id.substring(1, value.length);
      _this.type = _this.select.type;
      _this.select.year = value.label;
      _this.select.cusId = _this.formdata.cusId;
      _this.$refs.refTable.remoteData({
        condition: JSON.stringify(_this.select)
      });
    },

    // 自定义查询功能
    searchFn: function () {
      let _this = this;
      console.log('row', _this.formdata);
      var _model = _this.formdata;
      var cusId = _model.cusId ? _model.cusId : '';
      if (!cusId) {
        _this.$message.warning('客户编号不能为空');
        return;
      }
      _this.data2.children = [];
      _this.data3.children = [];
      _this.data4.children = [];
      _this.data5.children = [];
      _this.data6.children = [];
      _this.afterInit(cusId);
      // _this.$refs.refTable.remoteData(_param);
    },

    // 自定义重置功能
    resetFn: function () {
      var _this = this;
      _this.formdata = {};
      _this.data2.children = [];
      _this.data3.children = [];
      _this.data4.children = [];
      _this.data5.children = [];
      _this.data6.children = [];
      _this.data1[0].children.push(_this.data2);
      _this.data1[0].children.push(_this.data3);
      _this.data1[0].children.push(_this.data4);
      _this.data1[0].children.push(_this.data5);
      _this.data1[0].children.push(_this.data6);
    },

    // 小微放款查看
    nextPage (data) {
      data['op'] = 'VIEW';
      data['model_group_no'] = 'CMG000418';
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: 'fksq' + new Date().getTime(),
        title: data.pvpSerno,
        data: data
      });
    },

    // 贷款出账申请查看
    getContInfo (jsoPar, op) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/showdetial',
        data: { contNo: jsoPar.contNo },
        callback: function (code, message, response) {
          if (response.data != null) {
            jsoPar['contType'] = response.data.contType;
            jsoPar['replyNo'] = response.data.replyNo;
            _this.addTab(jsoPar, op);
          } else {
            yufp.service.request({
              async: false,
              method: 'POST',
              url: backend.cmisBiz + '/api/ctrhighamtagrcont/showdetial',
              data: { contNo: jsoPar.contNo },
              callback: function (code, message, response) {
                if (response.data != null) {
                  jsoPar['contType'] = response.data.contType;
                  jsoPar['replyNo'] = response.data.replyNo;
                  _this.addTab(jsoPar, op);
                }
              }
            });
          }
        }
      });
    },
    addTab (jsoPar, op) {
      var _this = this;
      jsoPar['model_group_no'] = 'CMG000649';
      jsoPar['op'] = op;
      jsoPar['bizId'] = jsoPar.pvpSerno;
      jsoPar['imageType'] = '2';
      // 传影像目录
      jsoPar['topOutsystemCode'] = _this.topOutsystemCode;// 出账影像
      jsoPar['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy; // 他项权证影像
      // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, jsoPar, true, true);

      delete jsoPar.iqpSerno;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.pvpSerno + jsoPar.op,
        title: '贷款出账申请修改',
        data: jsoPar
      });
    },
    // 调用模板工厂配置的详情界面,普通贷款合同
    goToDetailFn (row) {
      // row.model_group_no = 'CMG000243';
      row.bizOp = row.op;
      row['model_group_no'] = 'CMG000015';
      // this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   -1,
      //   -1,
      //   row,
      //   true,
      //   true
      // );
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: row.iqpSerno + row.bizOp,
        title: '普通贷款合同详情',
        data: row
      });
    },
    /*
      将表格的数据，赋值给表单字段
    */
    commonSelectFn: function (row, mapping) {
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    }

  }
};
</script>
