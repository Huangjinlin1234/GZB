<template>
  <yu-tabs v-model="activeName">
    <yu-tab-pane label="申请信息" name="appInfo">
      <d1-billcard :form-type="formType" ref="d1_BillCard"></d1-billcard>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" v-if="myPageParams.op != 'VIEW'" @click="onSave">保存</yu-button>
        <yu-button type="primary" v-if="myPageParams.op != 'VIEW'" @click="commitFn">提交</yu-button>
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </yu-tab-pane>
    <yu-tab-pane v-if="showHisTab" label="审批历史" name="approveHis">
      <his :params="params"></his>
    </yu-tab-pane>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </yu-tabs>
</template>
<script>
import d1Billcard from './coopPartnerStatusChgAppInsect_d1_BillCard.vue';
import his from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {d1Billcard, his},
  props: {
    pageParams: Object,
    bizPageData: Object,
    dialogId: String
  },
  data () {
    return {
      params: {},
      activeName: 'appInfo',
      updateUrl: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/update',
      addUrl: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/',
      d1_BillCard: null,
      formType: 'edit',
      myPageParams: {},
      showHisTab: true
    };
  },
  created () {
    if (this.bizPageData) {
      this.myPageParams.op = 'VIEW';
      this.myPageParams.serno = this.bizPageData.instanceInfo.bizId;
      this.showHisTab = false;
    } else if (this.pageParams) {
      this.myPageParams = this.pageParams;
    }
    if (this.myPageParams.op == 'VIEW') {
      this.formType = 'details';
    }
    yufp.clone(this.myPageParams, this.params);
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 合作方退出申请
    afterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      if (this.myPageParams.op == 'ADD') {
        const coopSerno = this.$xutils.getSEQWithParamFromServer('COOP_SERNO');
        this.d1_BillCard.setBillCardItemValue('serno', coopSerno);
        // 加载默认值
        this.d1_BillCard.execBillCardDefaultValueFormula();
      } else {
        this.initData();
      }
    },
    // 初始化数据
    initData () {
      this.d1_BillCard.queryDataByCondition({serno: this.myPageParams.serno}, 'post');
    },
    // 保存
    onSave () {
      // 判断必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }      
      // 保存数据
      const data = this.d1_BillCard.getBillCardValue();
      // 查询是否已存在
      let isExist = this.getIsExist(data.serno);
      if (isExist) {
        this.myPageParams.op = 'EDIT';
      }
      this.$xutils.request({
        url: this.myPageParams.op == 'ADD' ? this.addUrl : this.updateUrl,
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功', 350, 150, () => {
              //this.onBack();              
            });
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 返回
    onBack () {
      this.$dialog.close(this.dialogId);
    },
    commitFn () {
      // 判断必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const params = this.d1_BillCard.getBillCardValue();       
      const userinfo = this.$xutils.getLoginUserInfo();
      if ((params.apprStatus == '000' || params.apprStatus == '992') && userinfo.userCode == params.inputId) {
        if (params.apprStatus == '000') {
          this.$request({
            url: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/query',
            method: 'POST',
            data: {condition: JSON.stringify({partnerNo: params.partnerNo, apprStatuss: '111,992'})}
          }).then((response) => {
            if (response.code == '0') {
              if (response.data == null || response.data.length == 0) {
                this.confirmCommit(params);
              } else {
                this.$xutils.showMsgBox('提示', params.partnerName + '存在审批中或者退回的合作方退出申请！');
              }
            }
          })
        } else {
          this.confirmCommit(params);
        }
      } else {
        this.$xutils.showMsgBox('提示', '只能提交审批状态为【待发起】、【退回】且登记人是自己的合作方退出申请！');
        return;
      }
    },
    confirmCommit (params) {
      var _this = this;
       //1、保存数据2、初始化批复3、提交流程
      // 判断必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      // 保存数据
      const data = _this.d1_BillCard.getBillCardValue();
      // 查询是否已存在
      let isExist = this.getIsExist(data.serno);
      if (isExist) {
        _this.myPageParams.op = 'EDIT';
      }
      _this.$xutils.request({
        url: _this.myPageParams.op == 'ADD' ? _this.addUrl : _this.updateUrl,
        data: JSON.stringify(_this.$xutils.toUpperCase(data, true)),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {            
            /**
              ****不走流程直接退出***
              旅游公司
              物联网交易平台归属方
              监管公司
              仓储公司
              网金业务合作方
              律师事务所
              其他合作方
            */
            let startdto = {};
            const loginUser = _this.$xutils.getLoginUserInfo();
            if (['6', '7', '9', '10', '12', '13', '14'].includes(params.partnerType)) {
              _this.$request({
                url: _this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/quit/' + params.serno,
                method: 'post'
              }).then((response) => {
                // 处理请求成功的情况
                if (response.code == '0') {
                  _this.$message({type: 'info', message: '退出成功'});
                  _this.d1_BillList.queryDataByCondition();
                } else {
                  _this.$message({type: 'error', message: '退出失败'});
                }
              });
            } else {
              // 获取项目类型
              var proType = '';
              if ('1' == params.partnerType) {
                yufp.service.request({
                  method: 'POST',
                  async: false,
                  data: {condition: JSON.stringify({partnerNo: params.partnerNo})},
                  url: _this.$backend.cmisBiz + '/api/coopproaccinfo/query',
                  callback: function (code, message, response) {
                    if (response.code == '0') {
                      var coopPlanProArray = response.data;
                      if (coopPlanProArray != null && coopPlanProArray.length > 0) {
                        proType = coopPlanProArray[0].proType;
                      }                        
                    } else {
                      _this.$xutils.showMsgBox('提示', response.erortx);
                      return false;
                    }
                  }
                });
              }              
              let bizType = '';
              const orgType = loginUser.org.orgType;
              startdto.orgId = loginUser.orgCode;
              startdto.userId = loginUser.loginCode;
              if (orgType == 0) {
                // HZ001 新增 HZ003 总行部门
                bizType = 'HZ016';
              } else {
                // HZ002 新增 HZ004 支行部门
                bizType = 'HZ015';
              }
              const dutys = loginUser.dutys;
              var duty = '';
              for (let i = 0; i < dutys.length; i++) {
                // 如果是SGH01（寿光客户经理）或DHH01（东海客户经理），则是村镇银行客户经理)
                if (dutys[i].code == 'SGH01' || dutys[i].code == 'DHH01') {
                  duty = 'H01';
                  break;
                }
              }
              if (startdto.orgId.substring(0, 2) == '80' && duty == 'H01') {
                // SGB06合作方名单退出-分支机构（寿光）
                bizType = 'SGB06';
              }else if (startdto.orgId.substring(0, 2) == '80' && duty != 'H01') {
                // SGB13-合作方名单退出-普惠金融部（寿光）
                bizType = 'SGB13';
              }else if (startdto.orgId.substring(0, 2) == '81' && duty == 'H01') {
                // DHB06合作方名单退出-分支机构（东海）
                bizType = 'DHB06';
              }else if (startdto.orgId.substring(0, 2) == '81' && duty != 'H01') {
                //DHB13合作方名单退出-普惠金融部（东海）
                bizType = 'DHB13';
              }
              // 设置流程提交参数
              startdto.systemId = 'cmis';
              startdto.bizType = bizType; // TODO 根据机构数据确定业务类型
              startdto.bizId = params.serno;
              startdto.bizUserName = params.partnerName;
              startdto.bizUserId = params.partnerNo;
              startdto.param = {
                partnerType: params.partnerType,
                proType: proType
              };
              this.$refs.yufpNwfInit.wfInit(startdto);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        }        
      });        
      },
      /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      yufp.globalEventBus.$emit('doreFreshList');     
      this.$dialog.close(this.dialogId);
    },
    /**
     * 判断数据是否存在
     */
    getIsExist (serno) {
      let resultData = false;
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        data: {condition: JSON.stringify({serno: serno})},
        url: _this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/queryDetail',
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data != null && response.data.length > 0) {              
              resultData = true;
            }
          }          
        }
      });
      return resultData;
    }
  }
};
</script>
