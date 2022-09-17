<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <yu-tabs v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="押品基本信息" name="guarBaseInfoAdd">
      <!-- 修改标签名 -->
      <guarBaseInfoAdd ref="guarBaseInfoAdd" :page-data="baseData" :op="formType"></guarBaseInfoAdd>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-在建工程" name="guarInfUsufLand" v-if="guarTypeCdFlag=='DY0601'||guarTypeCdFlag=='DY0602'||guarTypeCdFlag=='DY0603'">
      <guarInfUsufLand ref="guarInfUsufLand" :page-data="pageData"></guarInfUsufLand>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-存货" name="guarCargoPledge" v-if="guarTypeCdFlag=='DY0801'">
      <guarCargoPledge ref="guarCargoPledge" :page-data="pageData"></guarCargoPledge>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-机器设备" name="guarMachEqui"  v-if="guarTypeCdFlag=='DY0501'">
      <guarMachEqui ref="guarMachEqui" :page-data="pageData"></guarMachEqui>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-其他使用权" name="guarUsufLand02" v-if="guarTypeCdFlag=='DY0299'">
      <guarUsufLand02 ref="guarUsufLand02" :page-data="pageData"></guarUsufLand02>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-建设用地使用权" name="guarBuildUse" v-if="guarTypeCdFlag=='DY0201'">
      <guarBuildUse ref="guarBuildUse" :page-data="pageData"></guarBuildUse>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-其他用房" name="guarOtherHouse" v-if="guarTypeCdFlag=='DY0199'">
      <guarOtherHouse ref="guarOtherHouse" :page-data="pageData"></guarOtherHouse>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-商业/工业用房" name="guarBusinessIndustry" v-if="guarTypeCdFlag=='DY0102'||guarTypeCdFlag=='DY0103'">
      <guarBusinessIndustry ref="guarBusinessIndustry" :page-data="pageData"></guarBusinessIndustry>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-居住用房" name="guarLivingRoom02" v-if="guarTypeCdFlag=='DY0101'">
      <guarLivingRoom02 ref="guarLivingRoom02" :page-data="pageData"></guarLivingRoom02>
    </yu-tab-pane>
    <yu-tab-pane label="影像信息" name="imageSystem" v-if="showImgFlag" >
     <imageSystem authority="import;insert;download;scan;delImg" :s="permission" :para="imageBizParam"></imageSystem>
   </yu-tab-pane>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-show="formType != 'details'" @click="onSave">保存</yu-button>
      <yu-button type="primary" v-show="formType != 'details'" @click="onCommit">提交</yu-button>
      <yu-button type="primary" @click="onBack">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </yu-tabs>

</template>
<script>
// 导入的组件
import { mapState } from 'vuex';
import guarBaseInfoAdd from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoAdd_d1_BillCard';
import guarInfUsufLand from '@/views/guarmanage/collateralInfo/guarInfo/guarBuilProject_d1_BillCard';
import guarCargoPledge from '@/views/guarmanage/collateralInfo/guarInfo/guarCargoPledge_d1_BillCard';
import guarMachEqui from '@/views/guarmanage/collateralInfo/guarInfo/guarMachEqui_d1_BillCard';
import guarUsufLand from '@/views/guarmanage/collateralInfo/guarInfo/guarUsufLand_d1_BillCard';
import guarUsufLand02 from '@/views/guarmanage/collateralInfo/guarInfo/guarUsufLand02_d1_BillCard';
import guarBuildUse from '@/views/guarmanage/collateralInfo/guarInfo/guarBuildUse_d1_BillCard';
import guarOtherHouse from '@/views/guarmanage/collateralInfo/guarInfo/guarOtherHouse_d1_BillCard';
import guarBusinessIndustry from '@/views/guarmanage/collateralInfo/guarInfo/guarBusinessIndustry_d1_BillCard';
import guarLivingRoom02 from '@/views/guarmanage/collateralInfo/guarInfo/guarLivingRoom02_d1_BillCard';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
import { dateFormat } from '@/utils';
import { request } from 'xy-utils';
export default {
  // 导入的组件
  components: { imageSystem, guarBaseInfoAdd, guarInfUsufLand, mapState, yufpNwfInit, guarCargoPledge, guarMachEqui, guarUsufLand, guarUsufLand02, guarBuildUse, guarOtherHouse, guarBusinessIndustry, guarLivingRoom02},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      activeName: 'guarBaseInfoAdd',
      formType: '',
      pageData: {},
      guarTypeCdFlag: '',
      baseData: {},
      returnBackFuncId: null,
      imageBizParam: [
        {
          top_outsystem_code: 'NXDDZY',
          index: {
            'dzyid': ''
          }
        }
      ],
      permission: '2',
      showImgFlag: false,
      dzyid : ''
    };
  },
  computed: {
    ...mapState({
      userCode: state => state.oauth.userCode,
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  mounted () {
    const _this = this;
    const bizPageData = _this.bizPageData || {};
    const instanceInfo = bizPageData.instanceInfo;
    // 如果流程实例存在，则说明是从流程中打开的页面
    if (instanceInfo) {
      var op = 'details';
      if(instanceInfo.nodeId == '7_15'){
        //如果是退回到客户经理，则客户经理可以进行修改操作
        op = 'noDetails';
      }
      
      this.pageData = {
        serno: this.bizPageData.instanceInfo.bizId,
        op: op,
      };
      this.returnBackFuncId = _this.$route.params.returnBackFuncId;
      console.log('instanceInfo>>>>>>', instanceInfo);
      this.showImgFlag = true ;
      // 资料扫描岗 可以上传
      if (instanceInfo.nodeName == '资料扫描岗') {
        this.permission = '1';
      }
    } else {
      // this.pageData = this.$route.meta.params;
      this.$utils.clone(this.$route.meta.params, this.pageData);
      this.showImgFlag = false ;
    }

    this.imageBizParam[0].index.dzyid = this.pageData.serno;
    this.formType = this.pageData.op || 'details';
    if (this.formType == 'ADD') {
      // yufp.clone(this.pageData, this.baseData);
      this.$utils.clone(this.pageData, this.$refs.guarBaseInfoAdd.formdata);
      this.$refs.guarBaseInfoAdd.formdata.rightOtherNo = this.pageData.rightOtherNo;
      this.guarTypeCdFlag = this.pageData.guarTypeCd.substring(0, 6);
    } else {
      this.queryData();
    }
  },
  methods: {
    queryData () {
      const _this = this;
      var serno = _this.pageData.serno;
      _this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/guarbaseinfo/' + serno,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            response.data.inputDate = dateFormat(response.data.inputDate, '{y}-{m}-{d} {h}:{i}:{s}');
            _this.baseData.op = this.pageData.op;
            this.$utils.clone(response.data, this.$refs.guarBaseInfoAdd.formdata);
            _this.guarTypeCdFlag = response.data.guarTypeCd.substring(0, 6);
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox(
              '提示',
              '错误代码：' + response.code + ',错误信息：' + response.message
            );
          }
        }
      });
    },
    /**
     * 保存
     */
    validateForm () {
      const _this = this;
      let validateFlag = false;
      let validateFlagBase = false;
      _this.$refs.guarBaseInfoAdd.$refs.refForm.validate(function (valid) {
        validateFlagBase = valid;
      });
      if (!validateFlagBase) {
        _this.activeName = 'guarBaseInfoAdd';
      }
      switch (_this.guarTypeCdFlag) {
      case 'DY0801':
        _this.$refs.guarCargoPledge.$refs.refForm.validate(function (valid) {
          validateFlag = valid;
        });
        if (!validateFlag) {
          _this.activeName = 'guarCargoPledge';
        }
        break;
      case 'DY0601':
      case 'DY0602':
      case 'DY0603':
        _this.$refs.guarInfUsufLand.$refs.refForm.validate(function (valid) {
          validateFlag = valid;
        });
        if (!validateFlag) {
          _this.activeName = 'guarInfUsufLand';
        }
        break;
      case 'DY0501':
        _this.$refs.guarMachEqui.$refs.refForm.validate(function (valid) {
          validateFlag = valid;
        });
        if (!validateFlag) {
          _this.activeName = 'guarMachEqui';
        }
        break;
      case 'DY0299':
        _this.$refs.guarUsufLand02.$refs.refForm.validate(function (valid) {
          validateFlag = valid;
        });
        if (!validateFlag) {
          _this.activeName = 'guarUsufLand02';
        }
        break;
      case 'DY0201':
        _this.$refs.guarBuildUse.$refs.refForm.validate(function (valid) {
          validateFlag = valid;
        });
        if (!validateFlag) {
          _this.activeName = 'guarBuildUse';
        }
        break;
      case 'DY0199':
        _this.$refs.guarOtherHouse.$refs.refForm.validate(function (valid) {
          validateFlag = valid;
        });
        if (!validateFlag) {
          _this.activeName = 'guarOtherHouse';
        }
        break;
      case 'DY0102':
      case 'DY0103':
        _this.$refs.guarBusinessIndustry.$refs.refForm.validate(function (valid) {
          validateFlag = valid;
        });
        if (!validateFlag) {
          _this.activeName = 'guarBusinessIndustry';
        }
        break;
      case 'DY0101':
        _this.$refs.guarLivingRoom02.$refs.refForm.validate(function (valid) {
          validateFlag = valid;
        });
        if (!validateFlag) {
          _this.activeName = 'guarLivingRoom02';
        }
        break;
      default:
        validateFlag = true;
      }
      return validateFlagBase && validateFlag;
    },
    getSaveData () {
      const _this = this;
      let pageData = {};
      let baseData = {};
      let url = null;
      let model = {};
      let guarInfCargoPledge = {};
      yufp.clone(_this.$refs.guarBaseInfoAdd.formdata, baseData);
      switch (_this.guarTypeCdFlag) {
      case 'DY0801':
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/saveByGuarBasicCargoPledgeVo';
        yufp.clone(_this.$refs.guarCargoPledge.formdata, guarInfCargoPledge);
        model['guarBaseInfo'] = baseData;
        model['guarInfCargoPledge'] = guarInfCargoPledge;
        pageData.url = url;
        pageData.data = model;
        break;
      case 'DY0601':
      case 'DY0602':
      case 'DY0603':
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/saveByGuarBasicBuildingVo';
        let guarInfBuilProject = {};
        yufp.clone(_this.$refs.guarInfUsufLand.formdata, guarInfBuilProject);
        model['guarBaseInfo'] = baseData;
        model['guarInfBuilProject'] = guarInfBuilProject;
        pageData.url = url;
        pageData.data = model;
        break;
      case 'DY0501':
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/saveByGuarBasicGuarInfMachEquiVo';
        let guarInfMachEqui = {};
        yufp.clone(_this.$refs.guarMachEqui.formdata, guarInfMachEqui);
        model['guarBaseInfo'] = baseData;
        model['guarInfMachEqui'] = guarInfMachEqui;
        pageData.url = url;
        pageData.data = model;
        break;
      case 'DY0299':
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/saveByGuarBasicGuarInfUsufLandVo';
        let guarInfUsufLand = {};
        yufp.clone(_this.$refs.guarUsufLand02.formdata, guarInfUsufLand);
        model['guarBaseInfo'] = baseData;
        model['guarInfUsufLand'] = guarInfUsufLand;
        pageData.url = url;
        pageData.data = model;
        break;
      case 'DY0201':
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/saveByGuarBasicGuarInfBuildUseVo';
        let guarInfBuildUse = {};
        yufp.clone(_this.$refs.guarBuildUse.formdata, guarInfBuildUse);
        model['guarBaseInfo'] = baseData;
        model['guarInfBuildUse'] = guarInfBuildUse;
        pageData.url = url;
        pageData.data = model;
        break;
      case 'DY0199':
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/saveByGuarBasicGuarInfOtherHouseVo';
        let guarInfOtherHouse = {};
        yufp.clone(_this.$refs.guarOtherHouse.formdata, guarInfOtherHouse);
        model['guarBaseInfo'] = baseData;
        model['guarInfOtherHouse'] = guarInfOtherHouse;
        pageData.url = url;
        pageData.data = model;
        break;
      case 'DY0102':
      case 'DY0103':
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/saveByInfBusinessIndustryHousrVo';
        let guarInfBusinessIndustryHousr = {};
        yufp.clone(_this.$refs.guarBusinessIndustry.formdata, guarInfBusinessIndustryHousr);
        model['guarBaseInfo'] = baseData;
        model['guarInfBusinessIndustryHousr'] = guarInfBusinessIndustryHousr;
        pageData.url = url;
        pageData.data = model;
        break;
      case 'DY0101':
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/saveByGuarBasicGuarInfLivingRoomVo';
        let guarInfLivingRoom = {};
        yufp.clone(_this.$refs.guarLivingRoom02.formdata, guarInfLivingRoom);
        model['guarBaseInfo'] = baseData;
        model['guarInfLivingRoom'] = guarInfLivingRoom;
        pageData.url = url;
        pageData.data = model;
        break;
      default:
        url = _this.$backend.cmisBiz + '/api/guarbaseinfo/update';
        pageData.url = url;
        pageData.data = baseData;
      }
      return pageData;
    },
    onSave () {
      const _this = this;
      let validate = _this.validateForm();
      if (validate == false) {
        return false;
      }
      _this.saveData().then(res => {
        if (res.code == '0') {
          _this.$xutils.showMsgBox('提示', '保存成功');
        } else {
          _this.$xutils.showMsgBox('提示', '错误代码：' + res.code + ',错误信息：' + res.message);
        }
      });
    },
    /**
     * 提交
     */
    onCommit () {
      let _this = this;
      // 判断必输项
      let validate = _this.validateForm();
      if (validate == false) {
        return false;
      }
      _this.saveData().then(res => {
        if (res.code == '0') {
          _this.submitWf();
        } else {
          _this.$xutils.showMsgBox('提示', '错误代码：' + res.code + ',错误信息：' + res.message);
        }
      });
    },
    submitWf () {
      // 提交流程
      let dataParams = {};
      // yufp.clone(this.$route.meta.params.guarMortgageLogoutApp, dataParams);
      dataParams['isScanMater'] = this.$refs.guarBaseInfoAdd.formdata.isScanMater;// 是否集中作业扫描
      dataParams.startOrgId = this.org.id;
      let wfInitData = {};
      wfInitData.systemId = 'cmis';
      wfInitData.orgId = this.org.id;
      wfInitData.bizId = this.$route.meta.params.serno;
      wfInitData.bizType = 'DB001';
      wfInitData.userId = this.userCode;
      wfInitData.bizUserName = this.$refs.guarBaseInfoAdd.formdata.guarCusName;
      wfInitData.bizUserId = this.$refs.guarBaseInfoAdd.formdata.guarCusId;
      wfInitData.param = dataParams;
      wfInitData.bizParam4 = '111';
      this.$refs.yufpNwfInit.wfInit(wfInitData);
    },
    /**
     * 关闭当前页面
     */
    onBack () {
      // key 是上一个页面传过来的
      if (this.returnBackFuncId) {
        this.$router.replace({
          name: this.returnBackFuncId
        });
      } else {
        let data = this.$route.meta.params;
        yufp.frame.removeTab(data.key);
      }
    },
    /**
       * 保存数据
       **/
    saveData () {
      const saveData = this.getSaveData();
      return request({
        url: saveData.url,
        method: 'POST',
        data: JSON.stringify(saveData.data)
      });
    },
    submitSuccess () {
      this.$dialog.close(this.dialogId, 'success');
    }
  }
};
</script>