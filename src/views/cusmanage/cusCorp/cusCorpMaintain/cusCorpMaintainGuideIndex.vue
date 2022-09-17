<template>
  <div>
    <yu-row>
      <yu-form-buttons class="yubfp-button-group">
        <yu-button type="primary" @click="batchApply">待处理 {{ count }} 笔</yu-button>
        <yu-button type="primary" @click="viewHistory">历史查看</yu-button>
      </yu-form-buttons>
    </yu-row>
    <yu-row>
      <d1-b-billcard ref="d1_B_BillCard" :dialogId="dialogId" :loadKey="strBizType"></d1-b-billcard>
    </yu-row>
  </div>
</template>
<script>
import d1BBillcard from './cusCorpMaintainGuide_d1_B_BillCard.vue';
export default {
  components: { d1BBillcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_B_BillCard: null,
      count: 0,
      strBizType: ''
    };
  },
  created () {
    // 控制业务显示
    const orgCode = this.$xutils.getLoginUserInfo().org.id; // 测试非村镇
    const roles = this.$xutils.getLoginUserInfo().roles;
    var strRole = '';
    for (var i = 0; i < roles.length; i++) {
      strRole = strRole + roles[i].code;
    }
    if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
      // 村镇
      this.strBizType = 'A01,A02,A03,A05,A06,A07,A08,A12,A13,B01,B02,B03,B04,B05,B06,B07,B08,B09,C01,C02';
    } else if (strRole.indexOf('R0010') != -1 || strRole.indexOf('R0030') != -1) {
      // 小微
      this.strBizType = 'A01,A02,A03,A05,A06,A07,A08,A12,A13,B01,B02,B03,B04,B05,B06,B07,B08,B09,C01,C02';
    } else {
      // 其他
      this.strBizType = 'A01,A02,A03,A09,A10,A11,A12,A13,B01,B02,B03,B04,B05,B06,B07,B08,B09,C01,C02';
    }
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;

      // 对公客户任务操作类型
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusmanatask/',
        data: {condition: JSON.stringify({ taskStatus: '1', bizType: 'A04,A05,A06,A07,A08,A09,A10,A11', inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode')})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.count = response.total;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            // exit;// ajax中return不生效，可以用exit
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      // var orgCode = YuXPUtil.getLoginUserInfo().orgCode;
      // //假设orgCode = 10为村镇经理
      // //var orgCode = "10"
      // if(orgCode == "10"){
      //     //公司客户转正
      //     //d1_B_BillCard.setItemValue("biz_type", "A04;A09;A10;A11")
      //     d1_B_BillCard.setSelectOptions('biz_type', 'hidden', 'A12,A13,B01,B02,B03,B04,B05,B06,B07,B08,B09,C01,C02');
      // }else{
      //     //公司客户转正（集中作业）
      //     //d1_B_BillCard.setItemValue("biz_type", "A04;A05;A06;A07;A08")
      //     d1_B_BillCard.setSelectOptions('biz_type', 'hidden', 'A12,A13,B01,B02,B03,B04,B05,B06,B07,B08,B09,C01,C02');
      // }
    },
    // 待处理
    batchApply () {
      const json = this.d1_B_BillCard.getBillCardValue();
      // this.$dialog.open('对公客户日常任务', 'cusmanage/cusCorp/cusCorpMaintain/cusCorpMaintainManaTaskListIndex', -1, -1, json, () => {});
      let name = 'cusmanage/cusCorp/cusCorpMaintain/cusCorpMaintainManaTaskListIndex';
      let key = 'cusCorpMaintainManaTaskListIndex4';
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '对公客户日常任务',
        // 传递的业务数据，可选配置
        data: json
      });
    },
    // 历史查看
    viewHistory () {
      const json = this.d1_B_BillCard.getBillCardValue();
      // this.$dialog.open('客户日常任务历史', 'cusmanage/cusCorp/cusCorpCreation/cusManaTaskCropListHisIndex', -1, -1, json, () => {});
      let name = 'cusmanage/cusCorp/cusCorpCreation/cusManaTaskCropListHisIndex';
      let key = 'cusManaTaskCropListHisIndexhis';
      json.key = `/${name}/${key}`;
      json.inType = 'DEFEND';
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '客户日常任务历史',
        // 传递的业务数据，可选配置
        data: json
      });
    },
    doNext () {
      var _this = this;
      const json = this.d1_B_BillCard.getBillCardValue();
      // 判断必输项
      const saveFlag = this.d1_B_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      // this.nextPage(json);
      let task = {};
      yufp.clone(json, task);
      task['oprType'] = '4';
      task.taskStatus = '1';
      yufp.service.request({
        method: 'POST',
        url: `${backend.workflowService}/api/custom/bench/querycusflow?cusId=${task.cusId}`,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.length == 0) {
              _this.saveTask(task);
            } else {
              _this.$message({ message: '有在途的【' + response.data[0].flowName + '】审批流程，不能发起客户信息维护！', type: 'error' });
            }
          } else {
            _this.$message({ message: message, type: 'error' });
            return;
          }
        }
      });
    },
    // 保存任务
    saveTask (task) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisCus}/api/cusmanatask/create`,
        data: JSON.stringify(task),
        callback: function (code, message, response) {
          if (response.code == '0') {
            task.serno = response.data.serno;
            _this.nextPage(task);
          } else {
            _this.$message({ message: message, type: 'error' });
            return;
          }
        }
      });
    },
    /** 下一个页面 */
    nextPage (json) {
      let _this = this;
      let updateSuccess = false;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisCus + '/api/cusbase/updateSelective',
        data: {'cusId': this.d1_B_BillCard.formdata.cusId, 'cusState': '1'},
        success: (response) => {
          if (response.code == '0') {
            updateSuccess = true;
            console.log('更新客户状态成功！');
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
      if (!updateSuccess) {
        return;
      }
      const biz_type = json.bizType;
      if (biz_type == 'A04') {
        json['modelGroupNo'] = 'CMG000275';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = 'A04';
        let name = 'zrcbank/cus/cuscom/cusCorpMaintain/cusTempMaintainA04';
        let key = 'cusTempMaintainA04' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户维护（临时）',
          // 传递的业务数据，可选配置
          data: json
        });

        // this.$dialog.open("公司客户维护（临时）", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      } else if (biz_type == 'A05') {
        json['modelGroupNo'] = 'CMG000296';
        // json["op"] = "VIEW";
        // json["op_type"] = "view";
        json['biz_type'] = 'A05';

        let name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        let key = 'formalCusMaintainA05' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司正式客户主观信息维护',
          // 传递的业务数据，可选配置
          data: json
        });

        // this.$dialog.open("公司正式客户主观信息维护", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      } else if (biz_type == 'A06') {
        json['bizType'] = 'A06';
        let name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        let key = 'formalCusMaintainA06' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司正式客户客观信息维护（集中作业）',
          // 传递的业务数据，可选配置
          data: json
        });
        // this.$dialog.open("公司正式客户客观信息维护（集中作业）", "cusmanage/cusCorp/cusCorpFocusWork/cusCorpOffiCreateObjeListIndex", -1, -1, json, () => {});
      } else if (biz_type == 'A07') {
        this.$router.addTab({
          // 路由名称
          name: 'cusmanage/fincReport/fincReportQuery/fincReportQuery',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'custom_report_' + json.cusId + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户财务报表新增（集中作业）',
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (biz_type == 'A08') {
        this.$router.addTab({
          // 路由名称
          name: 'cusmanage/fincReport/fincReportQuery/fincReportQuery',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'custom_report_' + json.cusId + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户财务报表修改（集中作业）',
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (biz_type == 'A09') {
        json['modelGroupNo'] = 'CMG000281';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = 'A09';
        let name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA09';
        let key = 'formalCusMaintainA05' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司正式客户信息维护',
          // 传递的业务数据，可选配置
          data: json
        });
        // this.$dialog.open("公司正式客户信息维护", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      } else if (biz_type == 'A10') {
        this.$router.addTab({
          // 路由名称
          name: 'cusmanage/fincReport/fincReportQuery/fincReportQuery',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'custom_report_' + json.cusId + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户财务报表新增',
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (biz_type == 'A11') {
        this.$router.addTab({
          // 路由名称
          name: 'cusmanage/fincReport/fincReportQuery/fincReportQuery',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: 'custom_report_' + json.cusId + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户财务报表修改',
          // 传递的业务数据，可选配置
          data: json
        });
      }
    },
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
