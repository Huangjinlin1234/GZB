<template>
  <!--
    @created by zlf
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata">
    <yu-panel title="其他收入" :hideFilter="false" :collapseHide="false" :disabled="disabledflg">
        <yu-form-buttons align="left">
          <yu-button @click="repayAdd" type="primary" round :disabled="disabledflg">新增</yu-button>
        </yu-form-buttons>
        <yu-xtable ref="refRepayTable"  row-number :base-params="params" border :data="repayData" width="800" v-model="tabledata" :data-url="dataUrl">
          <yu-xtable-column label="月收入主键" prop="incomePk" align="center" ctype="input" hide-column></yu-xtable-column>
          <yu-xtable-column label="申请流水号" prop="iqpSerno" align="center" ctype="input" hide-column></yu-xtable-column>
          <yu-xtable-column label="收入来源" prop="incomeSour" align="center" ctype="input"></yu-xtable-column>
          <yu-xtable-column label="收入（元）" prop="mearn" align="center" ctype="input"></yu-xtable-column>
          <yu-xtable-column label="小计（元）" prop="subtotal" align="center" ctype="input"></yu-xtable-column>
          <yu-xtable-column label="调查核实情况说明" prop="indgtExpl" align="center" ctype="input"></yu-xtable-column>
          <yu-xtable-column label="操作" prop="opr" align="center">
            <template slot-scope="repayScope">
              <yu-button size="small" type="primary" :disabled="disabledflg" @click="incomeSave(repayScope.$index, repayScope.row)">保存</yu-button>
              <yu-button size="small" type="danger" :disabled="disabledflg" @click="incomeDelete(repayScope.$index, repayScope.row)">删除</yu-button>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="还款能力分析" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="家庭合计月收入" name="fearnMearn" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="该笔贷款月支出与家庭月收入比为" name="incomePerc1" ctype="input"></yu-xform-item>
          <yu-xform-item label="所有消费贷款月支出与家庭月收入比"  name="incomePerc2" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款能力" name="repayAbi" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="save">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      tabledata: {},
      formdata: {},
      params: {
        condition: {iqpSerno: this.getFactory().contextData.iqp_serno}},
      // dataUrl: backend.cmisBiz + '/api/iqpdisassetconinfo/',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      repayData: []
    };
  },
  mounted () {
    var _this = this;
    var iqpSerno = _this.getFactory().contextData.iqp_serno;
    // let data = _this.$route.meta.params;
    // 进入初始化
    yufp.service.request({
      method: 'Post',
      url: backend.cmisBiz + '/api/iqpdisassetincome/selectmorebyiqpserno/' + iqpSerno,
      data: { iqpSerno: iqpSerno },
      callback: function (code, message, response) {
        _this.repayData = response.data;
      }
    });
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpdisassetconinfo/show/' + iqpSerno,
      data: { iqpSerno: iqpSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    // 保存
    // save: function () {
    //   var _this = this;
    //   let postData = {};
    //   yufp.clone(_this.formdata, postData);
    //   // 发送请求修改数据;
    //   this.$request({
    //     data: postData,
    //     method: 'POST',
    //     url: backend.cmisBiz + '/api/iqpdisassetincome/update'
    //   }).then(({code, message, data}) => {
    //     if (code == 0) {
    //       if (data != null) {
    //         yufp.clone(data, _this.formdata);
    //         this.$message({ message: '保存成功', type: 'success' });
    //       } else {
    //         this.$message({ message: '保存失败,请重试', type: 'warning' });
    //       }
    //     }
    //   });
    // },
    /**
     * 经营性收入新增
     */
    repayAdd: function () {
      var _this = this;
      var iqpSerno = _this.getFactory().contextData.iqp_serno;
      _this.repayData.push({
        incomePk: '',
        iqpSerno: iqpSerno,
        dataSour: '1',
        analyTime: '',
        saleAmt: ''
      });
    },
    /**
     * 经营性收入保存
     */
    incomeSave: function (index, row) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpdisassetincome/create',
        data: row,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/iqpdisassetincome/selectmore',
              data: row,
              callback: function (code, message, response) {
                if (response.data.length > 0) {
                  _this.repayData = response.data;
                }
              }
            });
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },
    /**
     * 经营性收入删除
     */
    incomeDelete: function (index, row) {
      var _this = this;
      if (!row.incomePk) {
        _this.repayData.splice(index, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/iqpdisassetincome/deleteByPrimaryKey',
          data: {incomePk: row.incomePk},
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.$message('删除成功');
              _this.repayData.splice(index, 1);
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }
    }

  }
};
</script>
