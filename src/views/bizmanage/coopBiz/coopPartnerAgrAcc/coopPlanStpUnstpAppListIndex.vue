<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './coopPlanStpUnstpAppList_d1_BillList.vue';
export default {
  components: {d1Billlist},
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
  },
  methods: {
    // 合作方案中止恢复列表
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },
    doInsect () {
      const jsoPar = {
        model_group_no: 'CMG000391',
        param: {},
        op: 'add'
      };
      // 绘制修改页面
      this.$dialog.open(
        '合作方案中止恢复申请',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        () => {}
      );
    },
    doView () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var jsoPar = {};
      jsoPar['model_group_no'] = 'CMG000391';
      jsoPar['op'] = 'details';
      jsoPar.params = params;
      this.$dialog.open(
        '合作方案中止恢复查看',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
    },
    doUpdate () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return;
      }
      // apprStatus 审批状态  000-待发起 992-退回
      if (params.apprStatus != '000' && params.apprStatus != '992') {
        this.$xutils.showMsgBox('提示', '只能修改审批状态为待发起或退回且经办人是自己的申请');
        return;
      } else {
        this.$dialog.open(
          '合作方案中止恢复修改',
          'bizmanage/coopBiz/coopPartnerAgrAcc/coopPlanStpUnstpAppUpdateIndex',
          '880',
          '500',
          params,
          () => {}
        );
      }
    },
    doDelete () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return;
      }
      const apprStatus = params.apprStatus;
      const serno = params.serno;
      // appr_status 审批状态  000-待发起 992-退回
      if (apprStatus != '000' && apprStatus != '992') {
        this.$xutils.showMsgBox('提示', '只能删除审批状态为待发起或退回且经办人是自己的申请');
        return;
      }
      // 1.选择一条审批状态为待发起且经办人是自己的申请，点击按钮，删除成功，数据消失。
      // 2.选择一条审批状态为退回且经办人是自己的申请，点击按钮，更新审批状态为:自行退出
      if (apprStatus == '000') {
        // 调用后端的删除逻辑，删除相关的关系表数据
        this.$xutils.showConfirmBox('提示', '是否确认删除？', 350, 150, confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/coopplanstpunstpapp/delete/' + serno,
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
      }
      if (apprStatus == '992') {
        params.apprStatus = '200';
        this.$xutils.request({
          // 同步请求
          async: false,
          url: this.$backend.cmisBiz + '/api/coopplanstpunstpapp/update',
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
    },
    doCommit () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return;
      }
      if (params.apprStatus != '000' && params.apprStatus != '992') {
        this.$xutils.showMsgBox('提示', '只能提交审批状态为待发起或退回且经办人是自己的申请');
        return;
      } else {
        // 选择一条满足条件的申请，点击提交，进行以下拦截校验：
        // 合作方状态=退出或中止，拦截；
        // 存在审批状态为退回、审批中的申请，拦截；
        // 申请类型=合作中止时：合作方案状态=中止或失效，拦截；
        // 申请类型=合作恢复时：合作方案状态=正常或失效，拦截。
        // 提交成功，更新“审批状态=审批中”。
        // 保存页面数据
        const loginUser = this.$xutils.getLoginUserInfo();
        const rsPars = {
          'systemId': 'cmis',
          'orgId': loginUser.orgId,
          'bizId': this.d1_BillList.getSelectedRowData().serno,
          // 流程申请类型会自动创建队列
          'bizType': 'COOP_PLAN_STP_UNSTP_APP',
          'userId': loginUser.loginCode,
          // 客户名称
          'bizUserName': '张家港农商行测试9527',
          // 客户编号
          'bizUserId': '9527'
        };
        this.$xutils.wfInit(rsPars, null);
        // 流程流程通过后处理
        // 更新审批状态为审批通过。
        // 申请类型=合作中止：更新合作方案状态为“中止”。
        // 申请类型=合作恢复：更新合作方案状态为“正常”。
      }
    }
  }
};
</script>
