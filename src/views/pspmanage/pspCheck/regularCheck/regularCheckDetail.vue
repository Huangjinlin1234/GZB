/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspCheckRst">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="检查任务信息" :collapse-hide="false">
        <yu-xform ref="pspTaskListForm" v-model="taskData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo"></yu-xform-item>
            <!--任务类型 taskType-->
            <yu-xform-item label="任务类型" disabled name="taskType" ctype="select" data-code="STD_ZB_TASK_TYPE"></yu-xform-item>
            <yu-xform-item label="检查类型" disabled name="checkType" ctype="select" data-code="STD_ZB_CHECK_TYPE" v-show="autoFlag"></yu-xform-item>
            <yu-xform-item label="报告类型" disabled name="rptType" ctype="select" data-code="STD_ZB_RPT_TYPE" v-show="false"></yu-xform-item>
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button @click="checkFn" type="primary">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="担保方式" disabled name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY" v-show="autoFlag && !smallFlag"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
            <yu-xform-item label="任务生成日期" disabled name="taskStartDt"></yu-xform-item>
            <yu-xform-item label="任务要求完成日期" disabled name="taskEndDt"></yu-xform-item>
            <yu-xform-item label="检查状态" disabled name="checkStatus" ctype="select" data-code="STD_ZB_CHECK_STATUS"></yu-xform-item>
            <yu-xform-item label="检查日期" disabled name="checkDate"></yu-xform-item>
            <yu-xform-item label="检查方式" :disabled="viewFlag||approveFlag||assistFlag||autoFlag" name="checkMode" rules="required" ctype="select" data-code="STD_ZB_JCFS_TYPE"></yu-xform-item>
            <yu-xform-item label="报告类型" disabled name="rptType" ctype="select" data-code="STD_ZB_RPT_TYPE" :v-show="!autoFlag"></yu-xform-item>
            <yu-xform-item label="约见人" :disabled="viewFlag||approveFlag||assistFlag||autoFlag" rules="required" name="relatedPersonnel" :v-show="!autoFlag"></yu-xform-item>
            <yu-xform-item label="约见人职务" :disabled="viewFlag||approveFlag||assistFlag||autoFlag" rules="required" ctype="select" data-code="STD_ZB_JOB_TTL" name="relatedJobTtl" :v-show="!autoFlag && !smallFlag"></yu-xform-item>
            <yu-xform-item label="检查地点" :disabled="viewFlag||approveFlag||assistFlag||autoFlag" :colspan="24" rules="required" name="checkPlace" :v-show="!autoFlag"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
yufp.lookup.reg('STD_ZB_RPT_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_TASK_TYPE,STD_ZB_GUAR_WAY,STD_ZB_JOB_TTL,STD_ZB_JCFS_TYPE, STD_ZB_CHECK_TYPE');
export default {
  name: 'PspCheckRst',
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      smallFlag: false, // 是否小微
      autoFlag: false, // 是否自动检查
      taskData: {}
    };
  },
  created () {
    //
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      const data = _this.$route.params;
      // if (_this.bizPageData) {
      //   _this.viewFlag = true;
      // } else {
      _this.viewFlag = data.opType === 'view';
      // }
      _this.autoFlag = data.pspTask.taskType == '2';
      const taskNo = data.pspTask == undefined ? data.taskNo : data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取贷后检查结果
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/psptasklist/selectTaskAndRst',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            console.log('taskData', response);
            if (data != null) {
              yufp.clone(data, _this.taskData);
              _this.updateFlag = data.isSaved != 0;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 查看
    checkFn: function () {
      console.log('查看！');
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: _this.taskData.cusId,
        callback: function (code, message, response) {
          if (code == 0) {
            let json = {};
            let title = '';
            let name = '';
            let key = '';
            json['cusId'] = _this.taskData.cusId;
            if (response.data.cusCatalog == '1') {
              json['op'] = 'VIEW';
              title = '个人客户查看';
              name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
              // 个人正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            } else if (response.data.cusCatalog == '2') {
              json['viewType'] = 'VIEW';
              title = '对公客户查看';
              name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
              // 对公正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            }
            _this.$router.addTab({
              // 路由名称
              name: name,
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: key,
              // 页签名称
              title: title,
              // 传递的业务数据，可选配置
              data: json
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
