<template>
  <div>
    <div v-if="!activeIndex">
      <yu-row >
        <yu-form-buttons class="yubfp-button-group">
          <yu-button type="primary" @click="batchApply">待处理 {{ count }} 笔</yu-button>
          <yu-button type="primary" @click="viewHistory">历史查看</yu-button>
        </yu-form-buttons>
      </yu-row>
      <yu-row>
        <d1-b-billcard ref="d1_B_BillCard" :loadKey="strBizType"></d1-b-billcard>
      </yu-row>
    </div>
    <div v-else>
      <d1-billlist ref="d1_BillList" :activeIndex="activeIndex"></d1-billlist>
    </div>
  </div>
</template>
<script>
import d1BBillcard from './indivCusDefend_d1_B_BillCard.vue';
import d1Billlist from '../indivCusCreate/cusIndivManaTask_d1_BillList.vue';
export default {
  components: {d1BBillcard, d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String,
    activeIndex: String
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
      this.strBizType = 'A01,A02,A03,A04,A05,A06,A07,A08,A09,A10,A11,A12,A13,B01,B02,B07,B08,B09,C01,C02';
    } else if (strRole.indexOf('R0010') != -1 || strRole.indexOf('R0030') != -1) {
      // 小微
      this.strBizType = 'A01,A02,A03,A04,A05,A06,A07,A08,A09,A10,A11,A12,A13,B01,B02,B05,B06,B07,B08,B09,C01,C02';
    } else {
      // 其他
      this.strBizType = 'A01,A02,A03,A04,A05,A06,A07,A08,A09,A10,A11,A12,A13,B01,B02,B05,B06,B09,C01,C02';
    }
  },
  mounted () {  
    if(this.activeIndex) {
      //从工作台页面个人客户维护进入
    } else {
      this.AfterInit();
    }
  },
  methods: {
    /**
       * 个人客户向导界面
       * @constructor
       */
    AfterInit () {
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;

      this.$xutils.request({
        // 异步请求 获取待处理条数
        async: true,
        url: this.$backend.cmisCus + '/api/cusmanatask/',
        data: {condition: JSON.stringify({ taskStatusList: '1,2', bizType: 'B03,B04,B05,B06,B07,B08', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.count = response.total;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 客户维护申请界面(待处理)
    batchApply () {
      let _this = this;
      let json = {};
      let name = 'cusmanage/indivCus/indivCusDefend/indivCusManaTaskDefendIndex';
      let key = 'cusIndivManaTaskIndexDefend';
      json.key = `/${name}/${key}`;
      _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传bizType
        // 页签名称
        title: '个人客户管理任务',
        // 传递的业务数据，可选配置
        data: json
      });
      var currentPath = _this.$route.path;
      setTimeout(function () {
        yufp.router.removeTab(currentPath);
      }, 100);
    },
    // 历史查看
    viewHistory () {
      let _this = this;
      let json = {};
      // 操作类型 2：个人客户维护
      let name = 'cusmanage/indivCus/indivCusCreate/cusIndivManaTaskHisIndex';
      let key = 'cusIndivManaTaskIndexDefendHis';
      json.inType = 'DEFEND';
      json.key = `/${name}/${key}`;
      _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '个人客户任务历史',
        // 传递的业务数据，可选配置
        data: json
      });
      var currentPath = _this.$route.path;
      setTimeout(function () {
        yufp.router.removeTab(currentPath);
      }, 100);
    },
    // 下一步
    doNext () {
      let _this = this;
      // 判断必输项
      const saveFlag = _this.d1_B_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      var cusRankCls = _this.$refs.d1_B_BillCard.formdata.cusRankCls;
      var bizType = _this.$refs.d1_B_BillCard.formdata.bizType;
      if(cusRankCls == '01' && bizType == 'B04'){
         _this.$message({ message: '正式客户无法发起临时客户维护', type: 'error' });
        return;
      }
      if(cusRankCls == '02' && bizType == 'B03'){
         _this.$message({ message: '临时客户无法发起正式客户维护', type: 'error' });
        return;
      }
      let data = _this.$refs.d1_B_BillCard.formdata;
      let json = {};
      yufp.clone(data, json);

      // 下一步的时候先判断是否有无在途任务
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.workflowService + '/api/custom/bench/querycusflow?cusId=' + data.cusId,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.length == 0) {
              _this.saveTask(data, json);
            } else {
              var flowName = response.data[0].flowName;
              var bizId = response.data[0].bizId;
              _this.$message({ message: '该客户存在流水号为【' + bizId + '】的' + flowName + '，不可修改', type: 'error' });
            }
          } else {
            _this.$message({ message: response.message, type: 'error' });
            return;
          }
        }
      });
    },
    // 保存任务
    saveTask (data, json) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisCus + '/api/cusmanatask/save',
        data: JSON.stringify(_this.$xutils.toUpperCase(json, true)),
        callback: function (code, message, response) {
          if (response.code == '0') {
            json.serno = response.data;
            _this.nextPage(data, json);
          } else {
            _this.$message({ message: response.message, type: 'error' });
            return;
          }
        }
      });
    },
    nextPage (data, json) {
      var _this = this;
      let updateSuccess = false;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisCus + '/api/cusbase/updateSelective',
        data: {'cusId': data.cusId, 'cusState': '1'},
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
      // 业务条线
      const bizType = json.bizType;
      json['op'] = 'EDIT';
      // 客戶号
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndivDefend';
      let title = '';
      let key = '';
      let currentPath = _this.$route.path;
      if (bizType == 'B03') {
        key = 'tempCusIndivDefend';
        title = '个人正式客户信息维护';
        json.key = `/${name}/${key}`;
        _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: json
        });
        setTimeout(function () {
          yufp.router.removeTab(currentPath);
        }, 100);
      } else if (bizType == 'B04') {
        key = 'tempCusIndivDefendTemp';
        title = '个人临时客户信息维护';
        json.key = `/${name}/${key}`;
        _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: json
        });
        setTimeout(function () {
          yufp.router.removeTab(currentPath);
        }, 100);
        // 3、个人客户新增财报报表
      } else if (bizType == 'B05') {
        key = 'tempCusIndivDefend';
        name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        title = '个人客户财务报表新增';
        json.key = `/${name}/${key}`;
        _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: json
        });
        setTimeout(function () {
          yufp.router.removeTab(currentPath);
        }, 100);
      } else if (bizType == 'B06') {
        key = 'tempCusIndivDefend';
        name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        title = '个人客户财务报表修改';
        json.key = `/${name}/${key}`;
        _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: json
        });
        setTimeout(function () {
          yufp.router.removeTab(currentPath);
        }, 100);
      } else if (bizType == 'B07') {
        key = 'tempCusIndivDefend';
        name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        title = '个人客户财务报表新增（集中作业）';
        json.key = `/${name}/${key}`;
        _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: json
        });
        setTimeout(function () {
          yufp.router.removeTab(currentPath);
        }, 100);
        // 6、个人客户修改财报报表（集中作业）
      } else if (bizType == 'B08') {
        key = 'tempCusIndivDefend';
        name = 'cusmanage/fincReport/fincReportQuery/fincReportQuery';
        title = '个人客户财务报表修改（集中作业）';
        json.key = `/${name}/${key}`;
        _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: json
        });
        setTimeout(function () {
          yufp.router.removeTab(currentPath);
        }, 100);
      }
    },
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
