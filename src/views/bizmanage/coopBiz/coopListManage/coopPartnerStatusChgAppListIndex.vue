<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
    <yufpNwfInit ref="yufpNwfInit" @success-click="doreFreshList"></yufpNwfInit>
  </div>
</template>
<script>
import d1Billlist from './coopPartnerStatusChgAppList_d1_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {d1Billlist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('doreFreshList', this.doreFreshList);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('doreFreshList');
  },
  methods: {
    //  合作方退出
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增
    doInsect () {
      this.$dialog.open(
        '合作方退出申请',
        'bizmanage/coopBiz/coopListManage/coopPartnerStatusChgAppInsectIndex',
        -1,
        -1,
        {op: 'ADD'},
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },
    // 查看
    doView () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let paramData = yufp.clone(params, {});
      paramData.op = 'VIEW';
      this.$dialog.open(
        '合作方退出申请',
        'bizmanage/coopBiz/coopListManage/coopPartnerStatusChgAppInsectIndex',
        -1,
        -1,
        paramData,
        () => {}
      );
    },

    doUpdate () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return;
      }
      // apprStatus 审批状态  000-待发起 992-退回
      const userinfo = this.$xutils.getLoginUserInfo();
      if ((params.apprStatus == '000' || params.apprStatus == '992') && userinfo.userCode == params.inputId) {
        let paramData = yufp.clone(params, {});
        paramData.op = 'EDIT';
        this.$dialog.open(
          '合作方退出申请',
          'bizmanage/coopBiz/coopListManage/coopPartnerStatusChgAppInsectIndex',
          -1,
          -1,
          paramData,
          () => {}
        );
      } else {
        this.$xutils.showMsgBox('提示', '只能修改审批状态为【待发起】、【退回】且登记人是自己的合作方退出申请！');
        return;
      }
    },
    // 删除
    doDelete () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return;
      }
      const apprStatus = params.apprStatus;
      const serno = params.serno;
      // apprStatus 审批状态  000-待发起 992-退回
      const userinfo = this.$xutils.getLoginUserInfo();
      if ((params.apprStatus == '000' || params.apprStatus == '992') && userinfo.userCode == params.inputId) {
        if (apprStatus == '000') {
        // 调用后端的删除逻辑，删除相关的关系表数据
          this.$xutils.showConfirmBox('提示', '是否确认删除？', 350, 150, confirmFlag => {
            if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
              this.$xutils.request({
              // 同步请求
                url: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/delete/' + serno,
                data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
                type: 'post',
                success: (response, status, xhr) => {
                  if (response.code == '0') {
                    this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                      this.d1_BillList.queryDataByCondition();
                    });
                  } else {
                    this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
                  }
                }
              });
            }
          });
        } else if (apprStatus == '992') {
          params.apprStatus = '996'; // 自行退出
          this.$xutils.request({
            url: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/update',
            data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
            type: 'post',
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                // 列表刷新
                  this.d1_BillList.queryDataByCondition();
                });
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            }
          });
        }
      } else {
        this.$xutils.showMsgBox('提示', '只能删除审批状态为【待发起】、【退回】且登记人是自己的合作方退出申请！');
        return;
      }
      // 1.选择一条审批状态为待发起且经办人是自己的申请，点击按钮，删除成功，数据消失。
      // 2.选择一条审批状态为退回且经办人是自己的申请，点击按钮，更新审批状态为:自行退出
    },

    doCommit () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return;
      }
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
                commitFn(this);
              } else {
                this.$xutils.showMsgBox('提示', params.partnerName + '存在审批中或者退回的合作方退出申请！');
              }
            }
          }).catch(() => {
            this.$message({
              message: '请求失败'
            });
          });
        } else {
          commitFn(this);
        }
      } else {
        this.$xutils.showMsgBox('提示', '只能提交审批状态为【待发起】、【退回】且登记人是自己的合作方退出申请！');
        return;
      }

      function commitFn (that) {
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
        const loginUser = that.$xutils.getLoginUserInfo();
        if (['6', '7', '9', '10', '12', '13', '14'].includes(params.partnerType)) {
          that.$request({
            url: that.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/quit/' + params.serno,
            method: 'post'
          }).then((response) => {
            // 处理请求成功的情况
            if (response.code == '0') {
              that.$message({type: 'info', message: '退出成功'});
              that.d1_BillList.queryDataByCondition();
            } else {
              that.$message({type: 'error', message: '退出失败'});
            }
          });
        } else {
          // 获取项目类型
          var proType = '';
          yufp.service.request({
          method: 'POST',
          async: false,
          data: {condition: JSON.stringify({partnerNo: params.partnerNo})},
          url: that.$backend.cmisBiz + '/api/coopproaccinfo/query',
          callback: function (code, message, response) {
            debugger
            if (response.code == '0') {
              var coopPlanProArray = response.data;
              if (coopPlanProArray != null && coopPlanProArray.length > 0) {
                proType = coopPlanProArray[0].proType;
              }                        
            } else {
              that.$xutils.showMsgBox('提示', response.erortx);
              return false;
            }
           }
          });
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
          that.$refs.yufpNwfInit.wfInit(startdto);
        }
      }
    },

    doreFreshList () {
      this.d1_BillList.queryDataByCondition();
    }
  }
};
</script>
