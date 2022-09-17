/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspCusBase">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="基本情况" :collapse-hide="false">
        <yu-xform ref="pspCusBaseCaseForm" v-model="cusData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button @click="checkFn" type="primary">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="所属集团" disabled ctype="input" name="belongGrpId"></yu-xform-item>
            <yu-xform-item label="准入时内部主体评级" disabled ctype="select" data-code="STD_ZB_GRADE_RANK" name="evalResultInner"></yu-xform-item>
            <yu-xform-item label="准入时外部主体评级" disabled ctype="select" data-code="STD_ZB_EVAL_RST" name="evalResultOuter"></yu-xform-item>
            <yu-xform-item label="最新内部主体评级" disabled ctype="select" data-code="STD_ZB_GRADE_RANK" name="curtEvalResultInner"></yu-xform-item>
            <yu-xform-item label="最新外部主体评级" disabled ctype="select" data-code="STD_ZB_EVAL_RST" name="curtEvalResultOuter"></yu-xform-item>
            <yu-xform-item label="授信批复编号" disabled name="lmtReplyNo"></yu-xform-item>
            <yu-xform-item label="项目名称" disabled name="proName"></yu-xform-item>
            <yu-xform-item label="授信金额" disabled name="lmtAmt"></yu-xform-item>
            <yu-xform-item label="已用额度" disabled name="outstndAmt"></yu-xform-item>
            <yu-xform-item label="业务起始日" disabled name="busiStartDate"></yu-xform-item>
            <yu-xform-item label="业务到期日" disabled name="busiEndDate"></yu-xform-item>
            <yu-xform-item label="业务类型" disabled name="busiType" ctype="select" data-code="STD_PSP_PRD_CATALOG"></yu-xform-item>
            <yu-xform-item label="业务管辖机构" disabled name="busiOrgIdName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
yufp.lookup.reg('STD_PSP_PRD_CATALOG');
export default {
  name: 'PspCusBase',
  data: function () {
    return {
      cusData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
    };
  },
  created () {

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
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取客户信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspcapcusbasecase/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              _this.$nextTick(() => {
                yufp.clone(data, _this.cusData);
                _this.updateFlag = true;
              });
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
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>

<style scoped>

</style>
