
<template>
   <!--
    @created by wcx
    @updated by  2021-6-17 修改代码规范
    @updated by  2021-6-17 更新组件内容及标签
    @description 模板示例——档案销毁
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="refTable" ref="searchForm" v-model="searchFormdata" label-width="90px">
          <yu-xform-group :column="4">
             <yu-xform-item label="业务流水号"  name="ddalSerno"></yu-xform-item>
            <yu-xform-item label="登记人" name="inputId" :colspan="7" ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'inputId':'inputId'}" label-width="110px" ></yu-xform-item>
            <yu-xform-item placeholder="登记日期" ctype="datepicker" name="inputDate"  label="登记日期" ref="inputDate" value-format="yyyy-MM-dd"></yu-xform-item>
          </yu-xform-group>
          <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFn()" >查询</yu-button>
                    <yu-button type="primary" @click="resetFn()">重置</yu-button>
                </div>
        </yu-xform>
    </yu-panel>
    <yu-panel title="档案销毁列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <div>
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('addFn')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('modifyFn')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('deleteFn')">删除</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('infoFn')">查看</yu-button>
        <yu-button type="primary" @click="printFn" v-if="checkCtrl('printFn')">打印</yu-button>
        <yu-button type="primary" @click="destoryFn" v-if="checkCtrl('destoryFn')">更改为已销毁</yu-button>
      </div>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" >
        <yu-xtable-column align="center" label="业务流水号" prop="ddalSerno" width="280"></yu-xtable-column>
        <yu-xtable-column align="center" label="销毁户数" prop="destroyCus" width="150"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="250"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" width="280"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate" width="200"></yu-xtable-column>
        <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="150"></yu-xtable-column>
        <yu-xtable-column align="center" label="销毁状态" prop="destroyStatus" data-code="STD_DESTROY_STATUS" width="150"></yu-xtable-column>

      </yu-xtable>
    </yu-panel>
  </div>
</template>

<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_DESTROY_STATUS');
import { dateFormat } from '@/utils';
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/docDestroyAppList/query/pageList'
    };
  },

  // 监听路由,刷新页面
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    // '$route.path': function () {
    //   this.$refs.refTable.remoteData();
    // },
    'this.$refs.refTable.selections[0].destroyStatus': function () {
      this.$refs.refTable.selections[0].destroyDate = new Date();
    }
  },
  methods: {


    // 条件查询
    searchFn: function () {
      this.$refs.refTable.remoteData({
        condition: JSON.stringify(this.searchFormdata)
      });
    },

    // 重置
    resetFn: function () {
      // 清空条件
      this.$refs.searchForm.resetFields();
    },

    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'inputId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          }
        }
      }
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      // console.log('查看数据', this.searchFormdata.ddalSerno);
      // let serno = this.$xutils.getUUID();
      var _this = this;
      var ddalSerno = '';
      var loading = _this.openLoading();
      var time = _this.formatTime();
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docDestroyAppList/create',
        data: {inputDate: time},
        callback: function (code, message, response) {
          if (response.code == 0) {
            // yufp.clone(response.data.ddalSerno, ddalSerno);
            ddalSerno = response.data.ddalSerno;
            _this.$router.addTab({
              // 路由名称
              name: 'zrcbank/biz/fileManage/destroyAppList/destroyAppListAdd',
              // 自定义唯一页签key
              key: 1 + new Date().getTime(), // 必传
              // 页签名称
              title: '档案销毁列表新增',
              // 传递的业务数据，可选配置
              data: {
                // ruleId: this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'),
                viewType: 'ADD',
                ddalSerno: ddalSerno
                // time: time

              }
            });
            loading.close();
          } else {
            // _this.$message({ message: '操作失败：', type: 'error' });
            _this.$message.error(response.message);
          }
        }

      });
    },


    /**
       * 页面loading
       */
    openLoading () {
      var dom = this.dialogId ? this.$parent.$refs.dialog : this.$parent.$el;
      var options = {
        target: dom, // Loading 需要覆盖的 DOM 节点
        body: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
        fullscreen: false,
        text: '拼命加载中' // 显示在加载图标下方的加载文案
      };
      var loadingInstance = this.$loading(options);
      return loadingInstance;
    },

    /**
     * 更改为已销毁
     */
    destoryFn: function () {
      var _this = this;
      var result = '';
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // selectionsAry[0].destroyStatus = '02';
      var ddalSerno = selectionsAry[0].ddalSerno;
      var approveStatus = selectionsAry[0].approveStatus;
      var destroyStatus = selectionsAry[0].destroyStatus;
      if (approveStatus !== '997' || destroyStatus !== '01') {
        this.$message({
          message: '只有审批通过并且为待销毁状态的才能变更为已销毁！！',
          type: 'warning'
        });
        return;
      }
      // 先请求明细表，判断是否有明细内容再去进行更改为已销毁操作
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docDestroyDetailList/query/pageList',
        data: {condition: JSON.stringify({ ddalSerno: ddalSerno })},
        callback: function (code, message, response) {
          if (response.code == 0) {
            result = response.data;
            if (result.length != 0) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisBiz + '/api/docDestroyAppList/changeDestroyed',
                data: ddalSerno,
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    yufp.clone(response.data, _this.formdata);
                    _this.$message('操作成功');
                    _this.$refs.refTable.remoteData();
                  } else {
                    // _this.$message({ message: '操作失败：', type: 'error' });
                    _this.$message.error(response.message);
                  }
                }
              });
            } else {
              _this.$message.error('该列表没有明细内容,无法更改为已销毁');
            }
          } else {
            // _this.$message({ message: '操作失败：', type: 'error' });
            _this.$message.error(response.message);
          }
        }
      });
    },


    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      // let serno = _this.$xutils.getUUID();
      // console.log(serno);
      // 选取的表格数据
      var selectionsAry = _this.$refs.refTable.selections;

      // console.log(selectionsAry[0].destroyStatus = '已销毁');
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var ddalSerno = selectionsAry[0].ddalSerno;
      var approveStatus = selectionsAry[0].approveStatus;
      if (approveStatus !== '000' && approveStatus !== '992') {
        this.$message({
          message: '只有待发起和打回的信息才可以修改！！',
          type: 'warning'
        });
        return;
      }

      _this.$router.addTab({
      // 路由名称
        name: 'zrcbank/biz/fileManage/destroyAppList/destroyAppListAdd',
        // 自定义唯一页签key
        key: 'cfgAssistantUpdate' + new Date().getTime(), // 必传
        // 页签名称
        title: '档案销毁列表修改',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          ddalSerno: ddalSerno
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      // let serno = _this.$xutils.getUUID();
      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var ddalSerno = selectionsAry[0].ddalSerno;
      // var ddalSerno = selectionsAry[0].ddalSerno;
      this.$router.addTab({
      // 路由名称
        name: 'zrcbank/biz/fileManage/destroyAppList/destroyListDetail',
        // 自定义唯一页签key
        key: 'cfgAssistant' + new Date().getTime(), // 必传
        // 页签名称
        title: '档案销毁列表查看',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'VIEW',
          ddalSerno: ddalSerno

        }
      });
    },

    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    },


    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      var approveStatus = selectionsAry[0].approveStatus;
      var ddalSerno = selectionsAry[0].ddalSerno;
      // console.log('查看', _this.searchFormdata.ddalSerno);
      if (approveStatus !== '000' && approveStatus !== '992') {
        _this.$message({
          message: '仅待发起状态或打回的的数据才可以删除',
          type: 'warning'
        });
        return;
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/docDestroyAppList/delete',
              data: ddalSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },

    /** 打印 **/
    printFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let params = {};
      params.ddalSerno = selectionsAry[0].ddalSerno;
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      params.src = _this.$backend.frptRptService + 'dagl-daxh.cpt&ddalSerno=' + params.ddalSerno;
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
    }
  }
};
</script>
