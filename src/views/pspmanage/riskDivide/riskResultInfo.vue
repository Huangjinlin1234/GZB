/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="初分信息" panel-type="simple">
      <yu-xform ref="riskResultForm" v-model="rstData" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="机评分类结果" disabled ctype="select" data-code="STD_FIVE_CLASS" name="autoClass" rules="required"></yu-xform-item>
            <yu-button v-if="!viewFlag" @click="calFn" type="primary">获取</yu-button>
            <yu-xform-item label="机评分类理由" disabled ctype="textarea" name="autoClassReason" data-code="STD_FIVE_CLASS" colspan="24"></yu-xform-item>
            <yu-xform-item label="上次五级分类结果" disabled  ctype="select" data-code="STD_FIVE_CLASS" name="lastClassRst"></yu-xform-item>
            <yu-xform-item label="上次十级分类结果" disabled  ctype="select" data-code="STD_TEN_CLASS" v-if="type == 'corpRiskDivideList' ? true : false" name="lastTenClassRst"></yu-xform-item>
            <yu-xform-item label="上次分类日期" disabled ctype="datepicker" name="lastCheckDate" colspan="24" width="100"></yu-xform-item>
            <yu-xform-item label="手工五级分类结果" :disabled="viewFlag||!classFlag"  ctype="select"  name="manualClass" :options="dicOptions.TypeOptions" rules="required"></yu-xform-item>
            <yu-xform-item label="手工十级分类结果" :disabled="viewFlag" v-if="type == 'corpRiskDivideList' ? true : false"  ctype="select"  name="manualTenClass" @change="manualTenSelect" :options="dicOptions.docTypeOptions" rules="required"></yu-xform-item>
            <yu-xform-item label="人工分类理由" :disabled="viewFlag" ctype="textarea" name="manualClassReason" colspan="24" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_FIVE_CLASS,STD_TEN_CLASS');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    type: String
  },
  data: function () {
    return {
      guarntrData: {}, // 担保基本信息
      taskNo: '', // 任务编号
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      badFlag: false, // 是否不良
      classFlag: false,
      dicOptions: {docTypeOptions: [{key: '11', value: '正常1'}, {key: '12', value: '正常2'}, {key: '13', value: '正常3'}, {key: '21', value: '关注1'}, {key: '22', value: '关注2'}, {key: '23', value: '关注3'}, {key: '31', value: '次级1'}, {key: '32', value: '次级2'}, {key: '40', value: '可疑'}, {key: '50', value: '损失'}],
        TypeOptions: [{key: '10', value: '正常'}, {key: '20', value: '关注'}, {key: '30', value: '次级'}, {key: '40', value: '可疑'}, {key: '50', value: '损失'}]}
    };
  },
  created () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.riskTask.taskNo;
    _this.init();
  },
  methods: {
    manuaSelect () {
      if (this.rstData.manualClass == '10') {
        if (this.rstData.manualTenClass != '11' && this.rstData.manualTenClass != '12' && this.rstData.manualTenClass != '13') {
          this.rstData.manualTenClass = '';
        }
        this.dicOptions.docTypeOptions = [{key: '11', value: '正常1'}, {key: '12', value: '正常2'}, {key: '13', value: '正常3'}];
      } else if (this.rstData.manualClass == '20') {
        if (this.rstData.manualTenClass != '21' && this.rstData.manualTenClass != '22' && this.rstData.manualTenClass != '23') {
          this.rstData.manualTenClass = '';
        }
        this.dicOptions.docTypeOptions = [{key: '21', value: '关注1'}, {key: '22', value: '关注2'}, {key: '23', value: '关注3'}];
      } else if (this.rstData.manualClass == '30') {
        if (this.rstData.manualTenClass != '31' && this.rstData.manualTenClass != '32') {
          this.rstData.manualTenClass = '';
        }
        this.dicOptions.docTypeOptions = [{key: '31', value: '次级1'}, {key: '32', value: '次级2'}];
      } else if (this.rstData.manualClass == '40') {
        if (this.rstData.manualTenClass != '40') {
          this.rstData.manualTenClass = '';
        }
        this.dicOptions.docTypeOptions = [{key: '40', value: '可疑'}];
      } else if (this.rstData.manualClass == '50') {
        if (this.rstData.manualTenClass != '50') {
          this.rstData.manualTenClass = '';
        }
        this.dicOptions.docTypeOptions = [{key: '50', value: '损失'}];
      }
    },
    manualTenSelect () {
      if (this.rstData.manualTenClass == '11' || this.rstData.manualTenClass == '12' || this.rstData.manualTenClass == '13') {
        this.rstData.manualClass = '10';
      } else if (this.rstData.manualTenClass == '21' || this.rstData.manualTenClass == '22' || this.rstData.manualTenClass == '23') {
        this.rstData.manualClass = '20';
      } else if (this.rstData.manualTenClass == '31' || this.rstData.manualTenClass == '32') {
        this.rstData.manualClass = '30';
      } else if (this.rstData.manualTenClass == '40') {
        this.rstData.manualClass = '40';
      } else if (this.rstData.manualTenClass == '50') {
        this.rstData.manualClass = '50';
      }
    },
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      _this.badFlag = data.riskTask.rptType == '3';
      _this.classFlag = data.type != 'corpRiskDivideList';
      // 任务编号
      const taskNo = data.riskTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取贷款信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/risktasklist/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.rstData);
              _this.updateFlag = true;
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
    calFn () {
      const _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisPsp + '/api/risktasklist/getSaveInfo',
        data: _this.taskNo,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data == '0') {
            const data = _this.$route.params.riskTask.pkId;
            // console.log('params', _this.$route.params);
            _this.$xutils.request({
              url: _this.$backend.cmisPsp + '/api/risktasklist/calculatePoint',
              data: data,
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  // 解析返回值
                  if (response.data != null) {
                    const point = response.data.point == 0 ? '' : response.data.point;
                    const reason = response.data.reason;
                    _this.rstData.autoClass = `${point}`;
                    _this.rstData.autoClassReason = `${reason}`;
                    // _this.rstData.autoClassReason = String(reason);
                    // _this.rstData.autoClassReason = yufp.lookup.convertKey('STD_FIVE_CLASS', `${point}`);
                  }
                } else {
                  _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
                }
              },
              error: (result, b) => {
                _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          } else {
            _this.$message({
              message: response.data,
              type: 'warning'
            });
          }
        }
      });
      // const data = _this.$route.params.riskTask.pkId;
      // // console.log('params', _this.$route.params);
      // _this.$xutils.request({
      //   url: _this.$backend.cmisPsp + '/api/risktasklist/calculatePoint',
      //   data: data,
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       // 解析返回值
      //       if (response.data != null) {
      //         const point = response.data.point == 0 ? '' : response.data.point;
      //         const reason = response.data.reason;
      //         _this.rstData.autoClass = `${point}`;
      //         _this.rstData.autoClassReason = `${reason}`;
      //         // _this.rstData.autoClassReason = String(reason);
      //         // _this.rstData.autoClassReason = yufp.lookup.convertKey('STD_FIVE_CLASS', `${point}`);
      //       }
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
      //     }
      //   },
      //   error: (result, b) => {
      //     _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //   }
      // });
    }
  }
};
</script>
