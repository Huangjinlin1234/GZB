
<template>
  <div>
<yu-tabs v-model="activeName" @tab-click="handleClick4Refresh">
  <yu-tab-pane label="影像补扫基本信息" name="first" >
    <yu-panel  :hideFilter="false" panel-type="simple" is-collapse :collapseHide="false">
        <yu-xform v-model="searchFormdata"  label-width="170px" ref="refForm">
          <yu-xform-group :column="2">
            <yu-xform-item label="影像补扫编号" name="disiSerno" disabled></yu-xform-item>
            <yu-xform-item label="原业务流水号" name="bizSerno" :disabled="viewType == 'DETAIL' || iqpFlag" ctype="YufpZrcSelector" :params="cusParms" @select-fn="selectSerno" rules="required"></yu-xform-item>
            <yu-xform-item label="影像补扫类型" name="spplType" rules="required" ctype="select" :options="dicOptions.docTypeOptions" :disabled="viewType == 'DETAIL'" @change="changeFn" ></yu-xform-item>
            <yu-xform-item label="补扫业务品种" :hidden="!show1" name="spplBizType" :disabled="viewType == 'DETAIL'" ctype="select" rules="required"   :options="dicOptions.docType" @change="changeFn1"></yu-xform-item>
            <yu-xform-item label="任务生成方式" name="taskFlag" rules="required" disabled ctype="select" data-code="STD_TASK_FLAG"></yu-xform-item>
            <yu-xform-item label="客户编号" name="cusId" :disabled="viewType == 'DETAIL'" ctype="YufpZrcSelector" :params="cusParms2" @select-fn="selectCus2" rules="required"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="审批状态" name="approveStatus"  ctype="select" data-code="STD_ZB_APPR_STATUS" disabled></yu-xform-item>
            <yu-xform-item label="登记人"   name="inputIdName"   disabled ></yu-xform-item>
            <yu-xform-item label="登记机构" name="inputBrIdName" disabled ></yu-xform-item>
            <yu-xform-item label="登记日期" name="inputDate" disabled ></yu-xform-item>
            <yu-xform-item label="是否删除资料" :disabled="!test" ctype="radio" data-code="STD_ZB_YES_NO" name="isDelData" rules="required" @change="change"></yu-xform-item>
            <yu-xform-item label="删除内容" :hidden="!show" :disabled="!test" ctype="textarea" name="delContent"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-panel>


      <div style="text-align:center">
         <yu-button type="primary" @click="submitApplyFn" :hidden="all">提交</yu-button>
         <yu-button type="primary" :hidden="all" @click="doSave">保存</yu-button>
         <yu-button type="primary" @click="doBack">返回</yu-button>
      </div>
        <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>

  </yu-tab-pane>
  <yu-tab-pane label="影像资料"  name="second" v-if="partnerType">
      <yu-panel v-model="formdata" :collapse-hide="false" name="forth">
        <imageSystem ref="imageSystemRef" :authority="authority" :s="image" :para="imageBizParam"></imageSystem>
      </yu-panel>
  </yu-tab-pane>
  <yu-tab-pane label="影像信息" name="coopImageList" v-if="!partnerType">
          <coopImageList ref="coopImageList" :bizPageData="bizPageData"></coopImageList>
  </yu-tab-pane>
  <yu-tab-pane label="审批历史信息" name="third">
        <imageCoopApprovalNew :params="childParamsNew"></imageCoopApprovalNew>
        <imageCoopApprovalOld :params="childParamsOld"></imageCoopApprovalOld>
  </yu-tab-pane>
</yu-tabs>
  </div>
</template>

<script>
import imageSystem from '@/views/imageManage/imageSystem';
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
import mixin from '@/utils/mixin';
import coopImageList from '@/views/zrcbank/biz/fileManage/imageSppl/imageCoopList';
import imageCoopApprovalNew from '@/views/zrcbank/biz/fileManage/imageSppl/imageCoopApprovalIndex1.vue';
import imageCoopApprovalOld from '@/views/zrcbank/biz/fileManage/imageSppl/imageCoopApprovalIndex.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
// 注册字典项
yufp.lookup.reg('STD_SPPL_TYPE,STD_TASK_FLAG');
export default {
  mixins: [mixin],
  components: { imageCoopApprovalNew, yufpNwfInit, imageSystem, imageCoopApprovalOld, coopImageList},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      authority: 'import;insert;download;scan', // delImg
      first: true,
      first1: true,
      activeName: 'first',
      searchFormdata: {},
      flag1: false,
      flag: true,
      image: '1',
      type: '', // 判断是否合作方来控制影像显示哪个
      partnerType: true, // 判断是否合作方来控制影像显示哪个
      iqpFlag: false,
      viewType: 'DETAIL',
      all: true,
      show1: false, // 控制补扫业务品种显示
      show: false,
      serno: '',
      test: '', // 是否置灰是否删除资料
      showCheck: true,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      imageBizParam: [
        {
          'top_outsystem_code': '',
          // 'outsystem_code': '',
          'index': {
            'businessid': this.bizPageData == undefined ? this.$route.meta.params.jsonData.bizSerno : this.bizPageData.instanceInfo.bizId
          }
        }
      ],
      dicOptions: {docTypeOptions: [{key: '01', value: '放款影像补扫'}, {key: '02', value: '合同影像补扫'}, {key: '03', value: '授信类型资料补录'}, {key: '04', value: '合作方准入影像补扫'}, {key: '05', value: '合作方协议签订影像补扫'}, {key: '06', value: '征信影像补扫'}, {key: '07', value: '展期影像补扫'}, {key: '08', value: '担保变更影像补扫'}],
        docType: [{key: '01', value: '一般贷款出账'}, {key: '02', value: '银承出账'}, {key: '03', value: '零售放款'}, {key: '04', value: '小微放款'}, {key: '05', value: '单户授信'}, {key: '06', value: '集团授信'}, {key: '07', value: '零售业务授信'}]},
      cusParms: {
        title: '原业务流水号',
        queryFields: [
          { placeholder: '原业务流水号', field: 'iqpSerno', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '客户号', field: 'searchCusId', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '合同编号', field: 'contNo', type: 'input', fuzzyQuery: 'both' },
          { placeholder: '借据编号', field: 'billNo', type: 'input', fuzzyQuery: 'both' }
        ],
        baseParams: {condition: JSON.stringify({ spplType: null, spplBizType: null })},
        dataUrl: backend.cmisBiz + '/api/docimagespplinfo/selectSernoByCusId',
        tableColumns: [{ label: '原业务流水号', prop: 'iqpSerno' }, { label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '合同编号', prop: 'contNo' }, { label: '借据编号', prop: 'billNo' }, { label: '产品名称', prop: 'prdName' }]
      },
      cusParms2: {
        title: '客户编号',
        queryFields: [{ placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: this.$backend.cmisCus + '/api/cusbase/queryCusByLogin',
        tableColumns: [{ label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }]
      }
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    }),
    childParamsNew: function () {
      let params = {};
      if (this.bizPageData) {
        params = {
          serno: this.bizPageData.instanceInfo.bizId
        };
      } else {
        params = {
          serno: this.$route.meta.params.jsonData.disiSerno
        };
      }
      return params;
    },
    childParamsOld: function () {
      let params = {};
      if (this.bizPageData) {
        const data = this.bizPageData.instanceInfo;
        // console.log(data);
        let flowParam = JSON.parse(JSON.stringify(data.flowParam));
        flowParam = JSON.parse(flowParam);
        params = {
          serno: flowParam.serno
        };
      } else {
        params = {
          serno: this.$route.meta.params.jsonData.bizSerno
        };
      }
      return params;
    }
  },
  created () {
    const loginUser = this.$xutils.getLoginUserInfo();
    const dutysList = loginUser.dutys;
    if (this.bizPageData) {
      this.viewType = 'DETAIL';
      const data = this.bizPageData.instanceInfo;
      let flowParam = JSON.parse(JSON.stringify(data.flowParam));
      flowParam = JSON.parse(flowParam);
      this.serno = flowParam.serno;
      this.image = '1';
      if (dutysList != undefined && dutysList.length > 0) {
        for (let i = 0; i < dutysList.length; i++) {
          let item = dutysList[i];
          if (item.code === 'ZYB21' || item.code === 'XDB14' || item.code === 'DHH08' || item.code === 'SGH08') { // 集中作业放款审核管理岗、授信审批部放款审核岗
            this.authority = 'import;insert;download;scan;delImg';
            break;
          }
        }
      }
    }
    this.afterInit();


    if (dutysList != undefined && dutysList.length > 0) {
      for (let i = 0; i < dutysList.length; i++) {
        let item = dutysList[i];
        if (item.code === 'FZH01' || item.code === 'FZH02' || item.code === 'XWB01') { // 客户经理岗
          this.dicOptions.docTypeOptions = [{key: '01', value: '放款影像补扫'}, {key: '02', value: '合同影像补扫'}, {key: '03', value: '授信类型资料补录'}, {key: '04', value: '合作方准入影像补扫'}, {key: '05', value: '合作方协议签订影像补扫'}, {key: '07', value: '展期影像补扫'}, {key: '08', value: '担保变更影像补扫'}];
        } else {
          this.dicOptions.docTypeOptions = [{key: '01', value: '放款影像补扫'}, {key: '02', value: '合同影像补扫'}, {key: '03', value: '授信类型资料补录'}, {key: '04', value: '合作方准入影像补扫'}, {key: '05', value: '合作方协议签订影像补扫'}, {key: '06', value: '征信影像补扫'}, {key: '07', value: '展期影像补扫'}, {key: '08', value: '担保变更影像补扫'}];
        }
        if (item.code === 'ZYB21' || item.code === 'XDB14' || item.code === 'DHH08' || item.code === 'SGH08') { // 集中作业放款审核管理岗、授信审批部放款审核岗
          this.authority = 'import;insert;download;scan;delImg';
          break;
        }
      };
    }
    let spplType = this.bizPageData == undefined ? this.$route.meta.params.jsonData.spplType : this.bizPageData.instanceInfo.param.spplType;
    let spplBizType = this.bizPageData == undefined ? this.$route.meta.params.jsonData.spplBizType : this.bizPageData.instanceInfo.param.spplBizType;
    let disiSerno = this.bizPageData == undefined ? this.$route.meta.params.jsonData.disiSerno : this.bizPageData.instanceInfo.bizId;
    if (spplType != '01' && spplType != '03') {
      if (spplType == '02') {
        let taskFlag = this.bizPageData == undefined ? this.$route.meta.params.jsonData.taskFlag : '';
        if (taskFlag == '01') {
          spplBizType = '08';
        } else {
          spplBizType = '09';
        }
      }
      this.cusParms.baseParams = {condition: JSON.stringify({ spplType: spplType, spplBizType: spplBizType})};
    }
    this.setImageCode(spplType, spplBizType, disiSerno);
  },
  watch: {
    'searchFormdata.spplType': function () {
      if (this.searchFormdata.spplBizType) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      if (this.searchFormdata.spplType == '01') {
        this.show1 = true;
        this.dicOptions.docType = [{key: '01', value: '一般贷款出账'}, {key: '02', value: '银承出账'}, {key: '03', value: '零售放款'}, {key: '04', value: '小微放款'}];
      } else if (this.searchFormdata.spplType == '03') {
        this.show1 = true;
        this.dicOptions.docType = [{key: '05', value: '单户授信'}, {key: '06', value: '集团授信'}, {key: '07', value: '零售业务授信'}];
      } else if (this.searchFormdata.spplType == '02' || this.searchFormdata.spplType == '04' || this.searchFormdata.spplType == '05' || this.searchFormdata.spplType == '06' || this.searchFormdata.spplType == '07' || this.searchFormdata.spplType == '08') {
        this.show1 = false;
        this.flag = false;
      } else {
        this.show1 = false;
        this.flag = true;
      }
    },
    'show1': function () {
      if (!this.show1) {
        this.flag1 = false;
      } else {
        this.flag1 = true;
      }
    }

  },
  // mounted () {
  //   this.afterInit();
  // },
  methods: {
    handleClick4Refresh (tab) {
      if (tab.name == 'second') {
        this.$refs.imageSystemRef.getImageSrc();
      } else if (tab.name == 'coopImageList') {
        this.$refs.coopImageList.refreshTable();
      }
    },
    change () {
      var _this = this;
      if (_this.searchFormdata.isDelData == '1') {
        _this.show = true;
      } else {
        _this.show = false;
      }
    },
    /*
    页面初始化
     */
    afterInit () {
      var _this = this;
      if (_this.bizPageData != null || _this.bizPageData != undefined) {
        let disiSerno = _this.bizPageData.instanceInfo.bizId;
        const data = _this.bizPageData.instanceInfo;
        var flowParam = JSON.parse(JSON.stringify(data.flowParam));
        flowParam = JSON.parse(flowParam);
        _this.type = flowParam.spplType;
        // this.viewType = _this.$route.meta.params.jsonData.viewType;
        _this.all = true;
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/docimagespplinfo/selectDetailBySerno',
          data: disiSerno,
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.searchFormdata);
          }
        });
      } else {
        let disiSerno = _this.$route.meta.params.jsonData.disiSerno;
        _this.viewType = _this.$route.meta.params.viewType;
        _this.test = _this.$route.meta.params.test;
        _this.all = _this.$route.meta.params.all;
        _this.type = _this.$route.meta.params.jsonData.spplType;
        if (_this.viewType == 'DETAIL') {
          _this.image = '2';
        }

        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/docimagespplinfo/selectDetailBySerno',
          data: disiSerno,
          callback: function (code, message, response) {
            yufp.clone(response.data, _this.searchFormdata);
          }
        });
      }
      if (_this.type == '04' || _this.type == '05') {
        _this.partnerType = false;
      }
    },
    setImageCode: function (spplType, spplBizType, disiSerno) {
      var _this = this;
      let imageCode = '';
      let imageCode2 = '';
      switch (spplType) {
      case '01':// 放款影像补扫
        if (spplBizType == '01') { // 01一般贷款出账
          imageCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
        } else if (spplBizType == '02') { // 银承出账
          imageCode = 'CDHPCZJB;CDHPDY;CDHPZY;CDHPBZDB;CDHPDCCZ;';
        } else if (spplBizType == '03') { // 零售放款
          imageCode = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ;';
        } else if (spplBizType == '04') { // 04小微放款
          imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ';
        } else {
          imageCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
        }
        break;
      case '02':// 合同影像补扫
        imageCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
        break;
      case '03':// 授信类型资料补录
        if (spplBizType == '05' || spplBizType == '06') { // 05单户授信 06集团授信
          imageCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
        } else if (spplBizType == '07') { // 零售业务授信
          imageCode = 'GRXFDKSX;GRXFDKCZDY;';
        } else {
          imageCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXFYSQZL;SXFYDBZL;XD_FZHYXCL;ZHSXPF';
        }
        break;
      case '04':// 合作方准入影像补扫
        imageCode = _this.getCoopImageCode(disiSerno);
        break;
      case '05':// 合作方协议签订影像补扫
        imageCode = _this.getCoopImageCode(disiSerno);
        break;
      case '06':// 征信影像补扫
        let cusCatalog = _this.checkCusCatalog(disiSerno);
        if (cusCatalog == '1') {
          imageCode = 'ZXCXSQZLGR';// 1对私
        } else if (cusCatalog == '2' || cusCatalog == '3' || cusCatalog == '4') {
          imageCode = 'ZXCXSQZLQY';// 2对公 3同业 4集团
        } else {
          this.$message.warning('客户类型为空，无对应征信影像目录');
        }
        break;
      case '07':// 展期影像补扫
        imageCode = 'ZQSQYX;ZQCZ;';
        break;
      case '08':// 担保变更影像补扫
        imageCode = 'XXD_YWBGSQ';
        imageCode2 = 'XXD_DBBGZL01';
        break;
      default:
        this.$message.warning('无对应影像目录');
        break;
      }
      let businessid = '';
      let docid = '';
      let contid = '';
      let billno = '';
      let custid = '';
      let scanid = '';
      if (_this.bizPageData == undefined) {
        businessid = _this.$route.meta.params.jsonData.bizSerno;
        docid = _this.$route.meta.params.jsonData.bizSerno;
        contid = _this.$route.meta.params.jsonData.contNo == undefined ? businessid : _this.$route.meta.params.jsonData.contNo;
        billno = _this.$route.meta.params.jsonData.billno == undefined ? businessid : _this.$route.meta.params.jsonData.billno;
        custid = _this.$route.meta.params.jsonData.cusId;
        scanid = _this.$route.meta.params.jsonData.bizSerno;
      } else {
        businessid = _this.bizPageData.instanceInfo.bizId;
        docid = _this.bizPageData.instanceInfo.bizId;
        contid = _this.bizPageData.instanceInfo.param.contNo == undefined ? businessid : _this.bizPageData.instanceInfo.param.contNo;
        billno = _this.bizPageData.instanceInfo.param.billno == undefined ? businessid : _this.bizPageData.instanceInfo.param.billno;
        custid = _this.bizPageData.instanceInfo.bizUserId;
        scanid = _this.bizPageData.instanceInfo.bizId;
      }
      _this.imageBizParam = [
        {
          'top_outsystem_code': imageCode,
          'outsystem_code': imageCode2,
          'index': {
            'businessid': businessid,
            'docid': docid,
            'contid': contid,
            'billno': billno,
            'custid': custid,
            'scanid': scanid
          }
        }
      ];
    },
    /**
     * 原业务流水号方法
     */
    selectSerno: function (arr) {
      if (arr.length > 0) {
        this.searchFormdata.bizSerno = arr[0].iqpSerno;
      }
    },
    changeFn (value) {
      if (this.first) {
        this.first = false;
      } else {
        this.searchFormdata.bizSerno = '';
        this.flag = !value;
        this.searchFormdata.cusId = '';
        this.searchFormdata.cusName = '';
        this.searchFormdata.spplBizType = '';
        if (value == '02') {
          if (this.searchFormdata.taskFlag == '01') {
            this.searchFormdata.spplBizType = '08';
          } else {
            this.searchFormdata.spplBizType = '09';
          }
        }
        if (value != '01' && value != '03') {
          this.cusParms.baseParams = {condition: JSON.stringify({ spplType: value, spplBizType: this.searchFormdata.spplBizType, cusId: this.searchFormdata.cusId })};
        }
        this.iqpFlag = this.flag || this.flag1;
      }
    },
    changeFn1 (value) {
      // 控制后一项表单的状态
      if (this.first1) {
        this.first1 = false;
      } else {
        this.flag1 = !value;
        this.searchFormdata.bizSerno = '';
        this.searchFormdata.cusId = '';
        this.searchFormdata.cusName = '';
        this.cusParms.baseParams = {condition: JSON.stringify({ spplType: this.searchFormdata.spplType, spplBizType: value, cusId: this.searchFormdata.cusId })};
        if (this.show1) {
          this.iqpFlag = this.flag || this.flag1;
        } else {
          this.flag1 = false;
          this.iqpFlag = this.flag || this.flag1;
        }
      }
    },
    /**
     * 客户编号方法
     */
    selectCus2: function (arr) {
      if (arr.length > 0) {
        this.searchFormdata.cusId = arr[0].cusId;
        this.searchFormdata.cusName = arr[0].cusName;
        this.searchFormdata.bizSerno = '';
        this.cusParms.baseParams = {condition: JSON.stringify({ spplType: this.searchFormdata.spplType, cusId: this.searchFormdata.cusId })};
      }
    },
    /* 保存按钮 */
    doSave () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };
      if (_this.viewType === 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/docimagespplinfo/update',
          data: this.searchFormdata,
          callback: function (code, message, response) {
            _this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
            });
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/docimagespplinfo/update',
          data: this.searchFormdata,
          callback: function (code, message, response) {
            _this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
            });
          }
        });
      }
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.doBack();
    },
    /**
     *提交
     */
    submitApplyFn () {
      var _this = this;
      var validate = false;
      var isCom = '';
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };
      if (_this.viewType === 'ADD') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/docimagespplinfo/update',
          data: _this.searchFormdata,
          callback: function (code, message, response) {
            // _this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
            //   yufp.router.removeTab(_this.$route.path);
            // });
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/docimagespplinfo/update',
          data: this.searchFormdata,
          callback: function (code, message, response) {
            // _this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {
            //   yufp.router.removeTab(_this.$route.path);
            // });
          }
        });
      }

      var spplType = _this.searchFormdata.spplType;
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      const dutysList = loginUser.dutys;

      if (!dutysList) {
        _this.$message({
          message: '该用户没有对应的岗位信息！',
          type: 'warning'
        });
        return;
      }
      var bizType = '';
      // eslint-disable-next-line no-inner-declarations
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          bizType = 'SGJ05';// 影像补扫审批流程（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          bizType = 'DHJ05';// 影像补扫审批流程（东海）
        }
      } else {
        if (spplType == '01') { // 放款
          isCom = this.checkIsCom3();
          bizType = 'DA008'; // 放款影像补扫-分支机构
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 放款影像补扫（集中作业中心）
              bizType = 'DA009';
              break;
            } else if (item.code === 'XWB13') { // 放款影像补扫（小微）
              bizType = 'DA010';
              break;
            }
          };
        } else if (spplType == '02') { // 合同
          isCom = this.checkIsCom2();
          bizType = 'DA011'; // 合同影像补扫（分支机构）
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 合同影像补扫（集中作业中心）
              bizType = 'DA012';
              break;
            } else if (item.code === 'XWB13') { // 合同影像补扫（小微
              bizType = 'DA013';
              break;
            }
          };
        } else if (spplType == '04') { // 合作方准入
          bizType = 'DA014'; // 合作方准入影像补扫（分支机构）
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 合作方准入影像补扫（集中作业中心）
              bizType = 'DA015';
              break;
            }
          };
        } else if (spplType == '05') { // 合作方协议
          bizType = 'DA016'; // 合作方协议签订影像补扫（分支机构）
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 合作方协议签订影像补扫（集中作业中心）
              bizType = 'DA017';
              break;
            }
          };
        } else if (spplType == '03') { // 授信
          isCom = this.checkIsCom();
          bizType = 'DA018'; // 授信影像补扫（分支机构）
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 授信影像补扫（集中作业中心）
              bizType = 'DA019';
              break;
            }
          };
        } else if (spplType == '06') {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 征信影像补扫（集中作业中心）
              bizType = 'DA020';
              break;
            }
          };
        } else if (spplType == '07') { // 展期影像补扫
          isCom = this.checkIsCom4();
          bizType = 'DA022'; // 展期影像补扫（分支机构）
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 展期影像补扫（集中作业中心）
              bizType = 'DA023';
              break;
            }
          };
        } else if (spplType == '08') { // 担保变更影像补扫
          isCom = this.checkIsCom5();
          bizType = 'DA024'; // 担保变更影像补扫（分支机构）
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'ZYB16') { // 担保变更影像补扫（集中作业中心）
              bizType = 'DA025';
              break;
            }
          };
        }
        if (bizType == '') {
          _this.$message({
            message: '您无权发起流程！',
            type: 'warning'
          });
          return;
        } else if ((spplType == '01' || spplType == '02' || spplType == '03') && (isCom == '' || isCom == undefined)) {
          _this.$message({
            message: '流程参数异常！',
            type: 'warning'
          });
          return;
        }
      }
      let serno = _this.searchFormdata.bizSerno;
      if (_this.searchFormdata.spplBizType == '03') {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/docimagespplinfo/selectPvpSernoByBillNo',
          data: _this.searchFormdata.billNo,
          callback: function (code, message, response) {
            if (response.code == '0') {
              serno = response.data;
            }
          }
        });
      }
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = _this.searchFormdata.disiSerno;
      startdto.bizUserName = _this.searchFormdata.cusName;
      startdto.bizUserId = _this.searchFormdata.cusId;
      startdto.param = {
        isCom: isCom,
        spplType: spplType,
        spplBizType: _this.searchFormdata.spplBizType,
        serno: serno,
        isDel: _this.searchFormdata.isDelData,
        bizInstanceId: _this.searchFormdata.bizInstanceId,
        contNo: _this.searchFormdata.contNo,
        billNo: _this.searchFormdata.billNo
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    /*
     返回上级页面
     */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /**
    校验是否是对公授信
     */
    checkIsCom () {
      var _this = this;
      var bizSerno = _this.searchFormdata.bizSerno;
      var isCom = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docimagespplinfo/selectDetailByBizSerno',
        data: bizSerno,
        callback: function (code, message, response) {
          isCom = response.data.isCom;
        }
      });
      return isCom;
    },

    /**
    校验是否是对公合同
     */
    checkIsCom2 () {
      var _this = this;
      var disiSerno = _this.searchFormdata.disiSerno;
      var isCom = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docimagespplinfo/selectDetailHTByBizSerno',
        data: disiSerno,
        callback: function (code, message, response) {
          isCom = response.data.isCom;
        }
      });
      return isCom;
    },
    /**
    校验是否是对公放款
     */
    checkIsCom3 () {
      var _this = this;
      var disiSerno = _this.searchFormdata.disiSerno; ;
      var isCom = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docimagespplinfo/selectDetailFKByBizSerno',
        data: disiSerno,
        callback: function (code, message, response) {
          isCom = response.data.isCom;
        }
      });
      return isCom;
    },
    /**
    校验是否是对公展期
     */
    checkIsCom4 () {
      var _this = this;
      var bizSerno = _this.searchFormdata.bizSerno; ;
      var isCom = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docimagespplinfo/selectDetailZQByBizSerno',
        data: bizSerno,
        callback: function (code, message, response) {
          isCom = response.data.isCom;
        }
      });
      return isCom;
    },
    /**
    校验是否是对公担保变更
     */
    checkIsCom5 () {
      var _this = this;
      var bizSerno = _this.searchFormdata.bizSerno; ;
      var isCom = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docimagespplinfo/selectDetailDBBGByBizSerno',
        data: bizSerno,
        callback: function (code, message, response) {
          isCom = response.data.isCom;
        }
      });
      return isCom;
    },
    /** 校验客户类型 **/
    checkCusCatalog (disiSerno) {
      var cusCatalog = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docimagespplinfo/queryCusCatalog',
        data: disiSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            cusCatalog = response.data;
          }
        }
      });
      return cusCatalog;
    },
    /** 获取合作方准入/协议影像目录 **/
    getCoopImageCode (disiSerno) {
      var imageCode = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docimagespplinfo/getCoopImageCode',
        data: disiSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            imageCode = response.data;
          }
        }
      });
      return imageCode;
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    }
  }
};
</script>
