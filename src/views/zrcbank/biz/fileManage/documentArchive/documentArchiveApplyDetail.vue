/**
 * @Created by  hujun on 2021/6/17下午2:58:08.
 * @updated by
 * @description 档案归档详情
 */
<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="档案归档信息" name="first" >
        <yu-panel title="基本信息" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xform ref="applyBaseForm" label-width="140px" v-model="formdata">
            <yu-xform-group :column="2">
              <yu-xform-item label="档案流水号" name="docSerno" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="档案编号" name="docNo" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="归档模式" name="archiveMode" ctype="select" data-code="STD_ARCHIVE_MODE" disabled ></yu-xform-item>
              <yu-xform-item label="档案分类" name="docClass" ctype="select" data-code="STD_DOC_CLASS" disabled ></yu-xform-item>
              <yu-xform-item label="档案类型" name="docType" ctype="select" data-code="STD_DOC_TYPE" disabled ></yu-xform-item>
              <yu-xform-item label="关联业务编号" name="bizSerno" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="合同编号" name="contNo" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="借据编号" name="billNo" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="客户编号" name="cusId" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP" disabled ></yu-xform-item>
              <yu-xform-item label="证件号码" name="certCode" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="贷款金额" name="loanAmt" ctype="input" disabled :hidden="!show" ></yu-xform-item>
              <yu-xform-item label="贷款期限(月)" name="loanTerm" ctype="input" disabled :hidden="!show"></yu-xform-item>
              <yu-xform-item label="贷款余额" name="loanAmt" ctype="input" disabled :hidden="!show" ></yu-xform-item>
              <yu-xform-item label="账户状态" name="accStatus" ctype="input"  disabled :hidden="!show" ></yu-xform-item>
              <yu-xform-item label="委托扣款账号" name="entrustedDeductNo" ctype="input" disabled :hidden="!show" ></yu-xform-item>
              <yu-xform-item label="放款日期" name="encashDate" ctype="input" disabled :hidden="!show" ></yu-xform-item>
              <yu-xform-item label="到期日期" name="endDate" ctype="input" disabled :hidden="!show" ></yu-xform-item>
              <yu-xform-item label="联系电话" name="telephone" ctype="input" disabled :hidden="!show" ></yu-xform-item>
              <yu-xform-item label="联系电话" name="phone" ctype="input" disabled :hidden="!show" ></yu-xform-item>
              <yu-xform-item label="资料总页数" name="totalPage" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="责任人" name="managerIdName" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="责任机构" name="managerBrIdName" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="责任人" name="managerId" ctype="input" hidden ></yu-xform-item>
              <yu-xform-item label="责任机构" name="managerBrId" ctype="input" hidden ></yu-xform-item>
              <yu-xform-item label="任务标识" name="taskFlag" ctype="select" data-code="STD_TASK_FLAG" disabled ></yu-xform-item>
              <yu-xform-item label="档案状态" name="docStauts" ctype="select" data-code="STD_DOC_STAUTS" disabled ></yu-xform-item>
              <yu-xform-item label="生成日期" name="createDate" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="完成日期" name="finishDate" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="入库操作人" name="optUsrName" ctype="input"  disabled ></yu-xform-item>
              <yu-xform-item label="入库操作机构" name="optOrgName" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="入库操作人" name="optUsr" ctype="input" hidden ></yu-xform-item>
              <yu-xform-item label="入库操作机构" name="optOrg" ctype="input" hidden ></yu-xform-item>
              <yu-xform-item label="入库操作时间" name="storageDate" ctype="input" disabled ></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="扫描人信息" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xtable ref="scanUserTable" row-number :pageable="false" :data-url="scanUserDataUrl" :base-params="scanUserParam" request-type="POST" >
            <yu-xtable-column label="扫描人编号" prop="scanUserId" ></yu-xtable-column>
            <yu-xtable-column label="扫描人姓名" prop="scanUserName" ></yu-xtable-column>
            <yu-xtable-column label="扫描时间" prop="scanTime" ></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="信贷档案资料清单" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xtable ref="archiveTable" row-number :pageable="false" :data-url="archiveDataUrl" :base-params="archiveParam" request-type="POST" @loaded="loadFn" selection-type="checkbox" :span-method="arraySpanMethod">
            <yu-xtable-column label="材料类别" prop="docTypeData" ctype="input" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
            <yu-xtable-column label="材料清单" prop="docListData" ></yu-xtable-column>
            <yu-xtable-column label="资料页数" prop="pagesNum" ctype="yu-num" :min="0" :precision="0" maxlength="5" @change="totalPage" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
            <yu-xtable-column label="是否必须原件" prop="isSourceFlag" ctype="radio" data-code="STD_ZB_YES_NO" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column label="备注" prop="memo" ctype="input" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button  type="primary" @click="printFn">打印</yu-button>
          <yu-button  type="primary" @click="saveFn" :hidden="isHidden">保存</yu-button>
          <yu-button  type="primary" @click="optFn" :hidden="isHidden">提交入库</yu-button>
          <yu-button  type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="临时档案" name="second" >
      <yu-panel title="档案任务池" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xtable ref="refTable2" request-type="POST" :base-params="baseParams" row-key="taskNo" condition-key="condition" row-number :data-url="dataUrl">
          <yu-xtable-column label="任务编号" prop="taskNo" width="180"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
          <yu-xtable-column label="资料类型" prop="bizType" data-code="STD_BIZ_SUB_TYPE"></yu-xtable-column>
          <yu-xtable-column label="任务类型" prop="taskType" data-code="STD_FILE_TASK_TYPE"></yu-xtable-column>
          <yu-xtable-column label="操作类型" prop="optType" data-code="STD_OPT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="inputBrIdName"></yu-xtable-column>
          <yu-xtable-column label="任务生成时间" prop="taskStartTime" width="120"></yu-xtable-column>
          <yu-xtable-column label="任务状态" prop="taskStatus" data-code="STD_FILE_TASK_STATUS"></yu-xtable-column>
          <yu-xtable-column label="接收人" prop="receiverIdName" :formatter="Formatter1"></yu-xtable-column>
          <yu-xtable-column label="接收机构" prop="receiverOrgName" :formatter="Formatter"></yu-xtable-column>
          <yu-xtable-column label="操作人" prop="updIdName"></yu-xtable-column>
          <yu-xtable-column label="操作时间" prop="updDate"></yu-xtable-column>
        </yu-xtable>
        </yu-panel>
        <yu-panel title="临时档案台账" panel-type="simple" is-collapse :collapse-title="collapseTitle">
        <yu-xtable ref="refTable" :base-params="baseParams" request-type="POST"  row-key="fileNo" condition-key="condition" row-number :data-url="dataUrl1">
        <yu-xtable-column label="档案编号" prop="fileNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="180"></yu-xtable-column>
        <yu-xtable-column label="资料类型" prop="bizType" data-code="STD_BIZ_SUB_TYPE" width="180"></yu-xtable-column>
        <yu-xtable-column label="临时库位号" prop="tempLocationNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="接收人" prop="receiverIdName" width="180" :formatter="Formatter1"></yu-xtable-column>
        <yu-xtable-column label="接收机构" prop="receiverOrgName" width="180" :formatter="Formatter"></yu-xtable-column>
        <yu-xtable-column label="档案上送日期" prop="fileReceiverDate" width="180"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_FILE_ACC_STATUS" width="180"></yu-xtable-column>
      </yu-xtable>
      </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="three" v-if="partnerType">
          <yu-panel v-model="activeName" :collapse-hide="false" name="forth" >
            <imageSystem authority="import;insert;download;scan;delImg" s="2" :para="imageBizParam"></imageSystem>
          </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="影像信息" name="coopImageList" v-if="!partnerType">
          <coopImageList ref="coopImageList"></coopImageList>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import coopImageList from '@/views/bizmanage/coopBiz/coopPlanApp/coopImageList';
import imageSystem from '@/views/imageManage/imageSystem';
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ARCHIVE_MODE,STD_DOC_CLASS,STD_DOC_TYPE,STD_ZB_CERT_TYP,STD_TASK_FLAG,STD_DOC_STAUTS,STD_ZB_YES_NO,STD_FILE_ACC_STATUS,STD_BIZ_SUB_TYPE,STD_OPT_TYPE,STD_FILE_TASK_TYPE,STD_FILE_TASK_STATUS');
export default {
  mixins: [mixin, mixinForm],
  comments: [imageSystem],
  data: function () {
    return {
      activeName: 'first',
      viewType: '',
      show: false,
      dialogVisible: false,
      dialogVisibleDebt: false,
      scanUserDataUrl: this.$backend.cmisBiz + '/api/docscanuserinfo/querybydocserno',
      archiveDataUrl: this.$backend.cmisBiz + '/api/docarchivematerlist/querybydocserno2',
      dataUrl1: this.$backend.cmisBiz + '/api/centralfileinfo/query',
      dataUrl: `${backend.cmisBiz}/api/centralfiletask/query`,
      formdata: {},
      collapseTitle: ['展开', '收起'],
      partnerType: true, // 判断是否合作方来控制影像显示哪个
      scanUserParam: {condition: JSON.stringify({ docSerno: this.$route.meta.params.jsonData.docSerno})},
      archiveParam: {condition: JSON.stringify({ docSerno: this.$route.meta.params.jsonData.docSerno, bizSerno: this.$route.meta.params.jsonData.bizSerno, contNo: this.$route.meta.params.jsonData.contNo, cusId: this.$route.meta.params.jsonData.cusId, docType: this.$route.meta.params.jsonData.docType})},
      baseParams: {condition: JSON.stringify({ serno: this.$route.meta.params.jsonData.iqpSerno})}
    };
  },
  components: {imageSystem, coopImageList},
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      loginCode: state => state.oauth.loginCode,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  created () {
    var _this = this;
    if (_this.$route.meta.params.jsonData.docType == '18') {
      _this.show = true;
    }
    if (_this.$route.meta.params.jsonData.docType == '10') {
      _this.partnerType = false;
    }
    _this.viewType = _this.$route.meta.params.viewType;
    if (_this.viewType == 'DETAIL') {
      this.isHidden = true;
    }
    this.setImageCode(this.$route.meta.params.jsonData.docType, this.$route.meta.params.jsonData.bizSerno, this.$route.meta.params.jsonData.docBizType);
    this.afterInit();
  },
  mounted () {
    // this.afterInit();
  },
  // 监听路由,刷新页面
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    handleClick () {
      if (this.activeName == 'second') {
        this.$refs.refTable2.remoteData();
        this.$refs.refTable.remoteData();
      } else if (this.activeName == 'coopImageList') {
        this.$refs.coopImageList.refreshTable();
      }
    },
    /**
     *接收机构格式化
     */
    Formatter: function (row, column) {
      var Dt = row.receiverOrgName;

      if (!Dt) {
        Dt = '';
      }
      return Dt;
    },
    /**
     *接收人格式化
     */
    Formatter1: function (row, column) {
      var Dt = row.receiverIdName;

      if (!Dt) {
        Dt = '';
      }
      return Dt;
    },
    // 合并单元格
    arraySpanMethod: function (obj) {
      // debugger;
      if (obj.columnIndex === 2) {
        return {
          rowspan: obj.row.docTypeDataCount,
          colspan: 1
        };
      }
    },
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      var docSerno = _this.$route.meta.params.jsonData.docSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docarchiveinfo/' + docSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
            if (response.data.docStauts == '01') {
              _this.formdata.optUsrName = '';
              _this.formdata.optOrgName = '';
              _this.formdata.storageDate = '';
            }
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /* 统计总页数 */
    loadFn (data, total, resp) {
      var _this = this;
      var totalPageSum = 0;
      for (let i = 0; i < data.length; i++) {
        let pagesNum = isNaN(parseInt(data[i].pagesNum)) == true ? 0 : parseInt(data[i].pagesNum);
        totalPageSum = totalPageSum + pagesNum;
      };
      _this.formdata.totalPage = totalPageSum;
    },
    totalPage () {
      var _this = this;
      var totalPageSum = 0;
      var archiveTableData = _this.$refs.archiveTable.tabledata;
      for (let i = 0; i < archiveTableData.length; i++) {
        let pagesNum = isNaN(parseInt(archiveTableData[i].pagesNum)) == true ? 0 : parseInt(archiveTableData[i].pagesNum);
        totalPageSum = totalPageSum + pagesNum;
      };
      _this.formdata.totalPage = totalPageSum;
    },
    /* 返回 */
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    /* 打印 */
    printFn () {
      var _this = this;
      const params = {};
      params.docSerno = _this.$route.meta.params.jsonData.docSerno;
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      params.src = _this.$backend.frptRptService + 'dagl-dayjqd.cpt&docSerno=' + params.docSerno;
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
    saveFn () {
      /* 保存 */
      var _this = this;
      var modal = {};
      yufp.clone(_this.formdata, modal);
      modal.archiveParam = this.$refs.archiveTable.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docarchiveinfo/update',
        async: false,
        data: modal,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
          } else {
            _this.$message.error('保存失败');
          }
        }
      });
    },
    /* 提交入库 */
    optFn () {
      var _this = this;
      var docStauts = _this.formdata.docStauts;
      if (docStauts != '01' && docStauts != '05') {
        _this.$message.warning('档案状态不为等待入库或已退回!');
        return;
      }
      var modal = {};
      yufp.clone(_this.formdata, modal);
      modal.scanUserParam = this.$refs.scanUserTable.tabledata;
      modal.archiveParam = this.$refs.archiveTable.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docarchiveinfo/archiveopt',
        async: false,
        data: modal,
        callback: function (code, message, response) {
          if (response.data.rtnCode == '000000') {
            _this.$message.success(response.data.rtnMsg);
            yufp.router.removeTab(_this.$route.path);
          } else {
            _this.$message.error(response.data.rtnMsg);
          }
        }
      });
    },
    /** 影像目录 **/
    setImageCode: function (docType, bizSerno, docBizType) {
      var _this = this;
      let imageCode = '';
      let imageCode2 = '';
      switch (docType) {
      case '01':// 个人客户资料 √
        imageCode = 'DSKHZL';
        break;
      case '02':// 对公客户资料 √
        imageCode = 'DGKHZL';
        break;
      case '03':// 个人授信资料 √
        imageCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;ZHSXPF;SXLLPF;XD_FZHYXCL;SXBGJBZL;SXFYSQZL';
        break;
      case '04':// 企业授信资料 √
        imageCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;ZHSXPF;SXLLPF;XD_FZHYXCL;SXBGJBZL;SXFYSQZL';
        break;
      case '05':// 对公及个人经营性贷款 √
        imageCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ';// 老信贷 DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ
        break;
      case '06':// 委托贷款 √
        imageCode = 'WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ';// 老信贷 WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ
        break;
      case '07':// 特殊担保协议 √
        imageCode = 'TSDBDN';// 老信贷 DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ
        break;
      case '08':// 票据池业务 √
        imageCode = 'PJCCONT';// 老信贷 DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ
        break;
      case '09':// 贴现协议/贴现额度协议
        imageCode = 'DKCZJB;DKDY;DKZY;DKBZDB;DKDCCZ;XXD_TXSQSJQT';// 老信贷 DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ
        break;
      case '10':// 合作方协议 √
        // imageCode = 'DBGSXYQD';
        imageCode = _this.getCoopImageCode(bizSerno);
        break;
      case '11':// 委托贷款展期 √
        imageCode = 'ZQCZ';// 老信贷 ZQCZ
        break;
      case '12':// 贷款展期 √
        imageCode = 'ZQCZ';
        break;
      case '13':// 保函 √
        imageCode = 'BHCZJB;BHDY;BHZY;BHBZDB';// 老信贷 BHCZJB;BHDY;BHZY;BHBZDB
        break;
      case '14':// 承兑业务 √
        imageCode = 'CDHPCZJB;CDHPDY;CDHPZY;CDHPBZDB;CDHPDCCZ';// 老信贷 DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ
        break;
      case '15':// 国际业务 √
        imageCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWXYZ;GJYWBH;GJYWDCCZ;GJYWSQSQT';// 老信贷 DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ
        break;
      case '16':// 白领易贷通业务 √
        imageCode = 'GRXFDKSX;GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ';// 老信贷被注释掉 DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ
        break;
      case '17':// 零售消费类业务
        imageCode = 'GRXFDKSX;GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ';// 老信贷 DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ
        break;
      case '18':// 公积金 (无)
        imageCode = '';
        break;
      case '19':// 省心快贷合同 √
        imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ';
        break;
      case '20':// 信用卡
        if (docBizType == '03') { // 进件
          let data = _this.getXYKImageCode(bizSerno);
          imageCode = data.imageCode;
          imageCode2 = data.imageCode2;
        } else if (docBizType == '04') { // 大额分期
          imageCode = 'XXD_ZXFQ;XXD_XYKTE;';
        } else {
          imageCode = 'XXD_PK;XXD_LYJ;XXD_ZXFQ;XXD_XYKTE;';
        }
        break;
      case '21':// 小微贷款展期 √
        imageCode = 'ZQCZ';
        break;
      case '22':// 小微贷款业务 √
        imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ';
        break;
      case '23':// 业务变更-展期业务 √
        imageCode = 'ZQSQYX';
        break;
      case '24':// 业务变更-担保变更
        imageCode = 'DBZL;XXD_YWBGSQ';
        imageCode2 = 'XXD_DBBGZL';
        break;
      case '25':// 业务变更-利率变更
        imageCode = 'XXD_YWBGXYQD';
        imageCode2 = 'XXD_LLBG';
        break;
      case '26':// 业务变更-还款计划变更
        imageCode = 'XXD_YWBGSQ;XXD_YWBGXYQD';
        imageCode2 = 'XXD_HKJHBGZL,XXD_HKJHBG';
        break;
      case '27':// 业务变更-延期还款
        imageCode = 'XXD_YWBGSQ;XXD_YWBGXYQD';
        imageCode2 = 'XXD_YQHKZL,XXD_YQHK';
        break;
      default:
        imageCode = '';
        break;
      }
      if (docType == '18') {
        return;
      }
      if (!imageCode) {
        _this.$message.warning('未获取到对应影像目录');
        return;
      }
      let cusId = _this.$route.meta.params.jsonData.cusId;
      let contNo = _this.$route.meta.params.jsonData.contNo == undefined ? bizSerno : _this.$route.meta.params.jsonData.contNo;
      let billNo = _this.$route.meta.params.jsonData.billNo == undefined ? bizSerno : _this.$route.meta.params.jsonData.billNo;
      _this.imageBizParam = [
        {
          'top_outsystem_code': imageCode,
          'outsystem_code': imageCode2,
          'index': {
            'businessid': bizSerno,
            'assuretype': '',
            'dzyid': '',
            'docid': bizSerno,
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': contNo,
            'orgname': '',
            'opername': '',
            'custid': cusId,
            'creditamount': '',
            'maintaindate': '',
            'billno': billNo,
            'custname': '',
            'credittype': ''
          }
        }
      ];
    },
    /** 获取合作方准入/协议影像目录 **/
    getCoopImageCode (bizSerno) {
      var imageCode = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docarchiveinfo/getCoopImageCode',
        data: bizSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            // imageCode = response.data;
            let coopImage = response.data.split(';');
            if (coopImage.length > 0) {
              for (let i = 0; i < coopImage.length; i++) {
                // 合作方协议影像移除基本资料
                if (coopImage[i] != 'DGKHZL' && coopImage[i] != '') {
                  imageCode += coopImage[i] + ';';
                }
              }
            }
          }
        }
      });
      return imageCode;
    },
    getXYKImageCode: function (bizSerno) {
      let data = {};
      let cardCusType = '';
      let applyCardPrd = '';
      let imageCode = '';
      let imageCode2 = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docarchiveinfo/getXYKImageCode',
        data: bizSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            cardCusType = response.data.cardCusType;
            applyCardPrd = response.data.applyCardPrd;
          }
        }
      });
      // 客户类型与影像目录映射
      if (applyCardPrd != '000010' && applyCardPrd != '000013') {
        imageCode = 'XXD_PK';
        if (cardCusType == 'B06') {
          imageCode2 = 'XXD_PK_B0601,XXD_PK_B0602,XXD_PK_B0603,XXD_PK_B0604,XXD_PK_B0605';
        } else if (cardCusType == 'B01') {
          imageCode2 = 'XXD_PK_B0101,XXD_PK_B0102,XXD_PK_B0103,XXD_PK_B0104,XXD_PK_B0105';
        } else if (cardCusType == 'B02') {
          imageCode2 = 'XXD_PK_B0201,XXD_PK_B0202,XXD_PK_B0203,XXD_PK_B0204,XXD_PK_B0205';
        } else if (cardCusType == 'B07') {
          imageCode2 = 'XXD_PK_B0701,XXD_PK_B0702,XXD_PK_B0703,XXD_PK_B0704,XXD_PK_B0705';
        } else if (cardCusType == 'B03') {
          imageCode2 = 'XXD_PK_B0301,XXD_PK_B0302,XXD_PK_B0303,XXD_PK_B0304,XXD_PK_B0305';
        } else if (cardCusType == 'C09') {
          imageCode2 = 'XXD_PK_C0901,XXD_PK_C0902,XXD_PK_C0903,XXD_PK_C0904,XXD_PK_C0905,XXD_PK_C0906';
        } else if (cardCusType == 'C06') {
          imageCode2 = 'XXD_PK_C0601,XXD_PK_C0602,XXD_PK_C0603,XXD_PK_C0604,XXD_PK_C0605,XXD_PK_C0606';
        } else if (cardCusType == 'H07') {
          imageCode2 = 'XXD_PK_H0701,XXD_PK_H0702,XXD_PK_H0703,XXD_PK_H0704,XXD_PK_H0705,XXD_PK_H0706';
        } else if (cardCusType == 'E01') {
          imageCode2 = 'XXD_PK_E0101,XXD_PK_E0102,XXD_PK_E0103,XXD_PK_E0104,XXD_PK_E0105,XXD_PK_E0106';
        } else if (cardCusType == 'H04') {
          imageCode2 = 'XXD_PK_H0401,XXD_PK_H0402,XXD_PK_H0403,XXD_PK_H0404,XXD_PK_H0405,XXD_PK_H0406';
        } else if (cardCusType == 'B14') {
          imageCode2 = 'XXD_PK_B1401,XXD_PK_B1402,XXD_PK_B1403,XXD_PK_B1404,XXD_PK_B1405,XXD_PK_B1406';
        } else if (cardCusType == 'X01') {
          imageCode2 = 'XXD_PK_X0101,XXD_PK_X0102,XXD_PK_X0103,XXD_PK_X0104,XXD_PK_X0105,XXD_PK_X0106';
        } else if (cardCusType == 'C08') {
          imageCode2 = 'XXD_PK_C0801,XXD_PK_C0802,XXD_PK_C0803,XXD_PK_C084,XXD_PK_C0805,XXD_PK_C0806,XXD_PK_C0807,XXD_PK_C0808';
        } else if (cardCusType == 'B15') {
          imageCode2 = 'XXD_PK_B1501,XXD_PK_B1502,XXD_PK_B1503,XXD_PK_B1504,XXD_PK_B1505,XXD_PK_B1506';
        } else if (cardCusType == 'C04') {
          imageCode2 = 'XXD_PK_C0401,XXD_PK_C0402,XXD_PK_C0403,XXD_PK_C0404,XXD_PK_C0405,XXD_PK_C0406,XXD_PK_C0407';
        } else if (cardCusType == 'B04') {
          imageCode2 = 'XXD_PK_B0401,XXD_PK_B0402,XXD_PK_B0403,XXD_PK_B0404,XXD_PK_B0405,XXD_PK_B0406';
        } else if (cardCusType == 'H05') {
          imageCode2 = 'XXD_PK_H0501,XXD_PK_H0502,XXD_PK_H0503,XXD_PK_H0504,XXD_PK_H0505,XXD_PK_H0506';
        }
      } else {
      // 乐悠金电子卡影像目录
        imageCode = 'XXD_LYJ';
        if (cardCusType == 'B06') {
          imageCode2 = 'XXD_LYJ_B0601,XXD_LYJ_B0602,XXD_LYJ_B0603,XXD_LYJ_B0604,XXD_LYJ_B0605';
        } else if (cardCusType == 'B01') {
          imageCode2 = 'XXD_LYJ_B0101,XXD_LYJ_B0102,XXD_LYJ_B0103,XXD_LYJ_B0104,XXD_LYJ_B0105';
        } else if (cardCusType == 'B02') {
          imageCode2 = 'XXD_LYJ_B0201,XXD_LYJ_B0202,XXD_LYJ_B0203,XXD_LYJ_B0204,XXD_LYJ_B0205';
        } else if (cardCusType == 'B03') {
          imageCode2 = 'XXD_LYJ_B0301,XXD_LYJ_B0302,XXD_LYJ_B0303,XXD_LYJ_B0304,XXD_LYJ_B0305';
        } else if (cardCusType == 'C09') {
          imageCode2 = 'XXD_LYJ_C0901,XXD_LYJ_C0902,XXD_LYJ_C0903,XXD_LYJ_C0904,XXD_LYJ_C0905,,XXD_LYJ_C0906';
        } else if (cardCusType == 'E01') {
          imageCode2 = 'XXD_LYJ_E0101,XXD_LYJ_E0102,XXD_LYJ_E0103,XXD_LYJ_E0104,XXD_LYJ_E0105,XXD_LYJ_E0106,XXD_LYJ_E0107,XXD_LYJ_E0108,XXD_LYJ_E0109,XXD_LYJ_E0110';
        } else if (cardCusType == 'H04') {
          imageCode2 = 'XXD_LYJ_H0401,XXD_LYJ_H0402,XXD_LYJ_H0403,XXD_LYJ_H0404,XXD_LYJ_H0405,XXD_LYJ_H0406,XXD_LYJ_H0407,XXD_LYJ_H0408,XXD_LYJ_H0409,XXD_LYJ_H0410';
        } else if (cardCusType == 'B14') {
          imageCode2 = 'XXD_LYJ_B1401,XXD_LYJ_B1402,XXD_LYJ_B1403,XXD_LYJ_B1404,XXD_LYJ_B1405,XXD_LYJ_B1406';
        } else if (cardCusType == 'C08') {
          imageCode2 = 'XXD_LYJ_C0801,XXD_LYJ_C0802,XXD_LYJ_C0803,XXD_LYJ_C0804,XXD_LYJ_C0805,XXD_LYJ_C0806,XXD_LYJ_C0807,XXD_LYJ_C0808';
        } else if (cardCusType == 'C03') {
          imageCode2 = 'XXD_LYJ_C0301,XXD_LYJ_C0302,XXD_LYJ_C0303,XXD_LYJ_C0304,XXD_LYJ_C0305,XXD_LYJ_C0306,XXD_LYJ_C0307';
        } else if (cardCusType == 'C04') {
          imageCode2 = 'XXD_LYJ_C0401,XXD_LYJ_C0402,XXD_LYJ_C0403,XXD_LYJ_C0404,XXD_LYJ_C0405,XXD_LYJ_C0406';
        } else if (cardCusType == 'B08') {
          imageCode2 = 'XXD_LYJ_B0801,XXD_LYJ_B0802,XXD_LYJ_B0803,XXD_LYJ_B0804,XXD_LYJ_B0805,XXD_LYJ_B0806';
        }
      }
      data.imageCode = imageCode;
      data.imageCode2 = imageCode2;
      return data;
    }
  }
};
</script>
