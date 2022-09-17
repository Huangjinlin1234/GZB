<template>
  <!--
    @created by
    @updated by zhoumw
    @description 个人客户申请向导
  -->
  <div>
    <yu-row>
      <yu-form-buttons class="yubfp-button-group">
        <yu-button type="primary" @click="batchApply">待处理 {{ count }} 笔</yu-button>
        <yu-button type="primary" @click="viewHistory">历史查看</yu-button>
      </yu-form-buttons>
    </yu-row>
    <yu-row>
      <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    </yu-row>
  </div>
</template>
<script>
import d1BBillcard from './cusIndivCreate_d1_B_BillCard.vue';
export default {
  components: {d1BBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      count: 0,
      d1_B_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 个人客户向导界面
       * @constructor
       */
    AfterInit () {
      // 个人客户创建
      this.$xutils.request({
        // 异步请求 获取待处理条数
        async: true,
        url: this.$backend.cmisCus + '/api/cusmanatask/',
        data: {condition: JSON.stringify({ taskStatus: '1', bizType: 'B01,B02', inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode')})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.count = response.total;
            this.d1_B_BillCard = this.$refs.d1_B_BillCard;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 客户创建申请界面(待处理)
    batchApply () {
      let _this = this;
      let json = {};
      json.inType = 'CREATE';
      let name = 'cusmanage/indivCus/indivCusCreate/cusIndivManaTaskIndex';
      let key = 'cusIndivManaTaskIndex';
      json.key = `/${name}/${key}`;
      _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();

      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '个人客户管理任务',
        // 传递的业务数据，可选配置
        data: json
      });
      // var currentPath = _this.$route.path;
      // setTimeout(function () {
      //   yufp.router.removeTab(currentPath);
      // }, 100);
    },

    // 历史查看
    viewHistory () {
      let _this = this;
      let json = {};
      let name = 'cusmanage/indivCus/indivCusCreate/cusIndivManaTaskHisIndex';
      let key = 'cusIndivManaTaskIndex';
      json.inType = 'CREATE';
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
      var _this = this;
      const json = this.d1_B_BillCard.getBillCardValue();
      // 判断必输项
      const saveFlag = _this.d1_B_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      /*
      * 发送ecif
      */
      this.$request({
        method: 'POST',
        data: json,
        url: _this.$backend.cmisCus + '/api/cusindiv/sendEcif'
      }).then((response) => {
        if (response.code == '0') {
          // 解析返回值
          if (response.data) {
            if (response.data.isEcif == '1') {
              _this.isEcif(response.data, json, '该客户为我行存量客户');
            } else {
              _this.isEcif(response.data, json, '客户创建成功');
            }
          } else {
            this.$xutils.showMsgBox('提示', '客户创建失败：' + response.code + ',错误信息：' + response.message);
          }
        } else {
          this.$xutils.showMsgBox('提示', '客户创建失败');
        }
      });
      // _this.$xutils.request({
      //   // 同步请求
      //   async: true,
      //   url: _this.$backend.cmisCus + '/api/cusindiv/sendEcif',
      //   data: JSON.stringify(_this.$xutils.toUpperCase(json, true)),
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       // 解析返回值
      //       if (response.data != null && response.data != 'undefined' && response.data != '') {
      //         var data = response.data;
      //         if (data.isEcif == '1') {
      //           _this.isEcif(data, json, '该客户为我行存量客户');
      //         } else {
      //           _this.isEcif(data, json, '客户创建成功');
      //         }
      //       } else {
      //         this.$xutils.showMsgBox('提示', '客户创建失败：' + response.code + ',错误信息：' + response.message);
      //       }
      //     } else {
      //       this.$xutils.showMsgBox('提示', '客户创建失败');
      //     }
      //   },
      //   error: (result) => {
      //     const messageText = result.response.request.responseText;
      //     const messageJson = JSON.parse(messageText);
      //     // this.$xutils.showMsgBox('提示', messageJson.message + '；错误信息：' + messageJson.status); // 弹出提示
      //     //
      //   }
      // });
    },
    isEcif (data, json, message) {
      var _this = this;
      // 自动刷新列表数据
      _this.$xutils.showMsgBox('提示', message, 280, 140, () => {
        // 业务条线
        const bizType = json.bizType;
        let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
        let title = '';
        let key = '';
        // op 查看权限
        data.op = 'EDIT';
        data.bizType = bizType;
        // 个人正式客户创建 B01
        if (bizType == 'B01') {
          key = 'tempCusIndiv' + new Date().getTime();
          title = '个人正式客户创建';
          data.cusRankCls = '01';
        // 个人临时客户创建 B02
        } else if (bizType == 'B02') {
          key = 'tempCusIndivTemp' + new Date().getTime();
          title = '个人临时客户创建';
          data.cusRankCls = '02';
        }
        var currentPath = _this.$route.path;
        yufp.router.removeTab(currentPath);
        data.key = `/${name}/${key}`;
        _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
        _this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: data
        });
      });
    },
    // 返回
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
