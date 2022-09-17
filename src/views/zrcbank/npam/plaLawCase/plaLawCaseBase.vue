<template>
  <div class="blank_template">
    <yu-row>
      <yu-col :sm="4" :xs="24">
        <yu-xtree :local-data="dataIcon" data-id="id" data-label="label" data-pid="pid" data-root="0" default-expand-all="true" @node-click="nodeClick"></yu-xtree>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <yu-tabs v-if="nodeId == '1'" v-model="activeName">
          <yu-tab-pane label="基本信息" name="first">
            <plaCaseInfo ref="plaCaseInfo" :cusCorp="cusCorp"></plaCaseInfo>
          </yu-tab-pane>
          <yu-tab-pane label="被告信息" name="second">
            <plaCaseAccused ref="plaCaseAccused" :cusCorp="cusCorp" :viewType="viewType"></plaCaseAccused>
          </yu-tab-pane>
          <yu-tab-pane label="涉诉业务信息" name="third">
            <plaCaseYewu ref="plaCaseYewu" :cusCorp="cusCorp" :viewType="viewType"></plaCaseYewu>
          </yu-tab-pane>
        </yu-tabs>
        <yu-tabs v-if="nodeId == '2'" v-model="activeName">
          <yu-tab-pane label="抵（质）押物信息登记" name="first">
            <plaCaseAssert ref="plaCaseAssert" :cusCorp="cusCorp" ></plaCaseAssert>
          </yu-tab-pane>
          <yu-tab-pane label="抵（质）押以外的保全资产" name="second">
            <plaCaseAssertOther ref="plaCaseAssertOther" :cusCorp="cusCorp"></plaCaseAssertOther>
          </yu-tab-pane>
        </yu-tabs>
        <yu-tabs v-if="nodeId == '3'" v-model="activeName">
          <yu-tab-pane label="实现担保物权" name="first">
            <plaCaseGuar ref="plaCaseGuar" :cusCorp="cusCorp"></plaCaseGuar>
          </yu-tab-pane>
        </yu-tabs>
        <yu-tabs v-if="nodeId == '4'" v-model="activeName">
          <yu-tab-pane label="一审信息" name="first">
            <plaCaseFirst ref="plaCaseFirst" :cusCorp="cusCorp" ></plaCaseFirst>
          </yu-tab-pane>
        </yu-tabs>
        <yu-tabs v-if="nodeId == '5'" v-model="activeName">
          <yu-tab-pane label="二审信息" name="first">
            <plaCaseSec ref="plaCaseSec" :cusCorp="cusCorp"></plaCaseSec>
          </yu-tab-pane>
        </yu-tabs>
        <yu-tabs v-if="nodeId == '6'" v-model="activeName">
          <yu-tab-pane label="再审信息" name="first">
            <plaCaseRet ref="plaCaseRet" :cusCorp="cusCorp"></plaCaseRet>
          </yu-tab-pane>
        </yu-tabs>
        <yu-tabs v-if="nodeId == '7'" v-model="activeName">
          <yu-tab-pane label="执行情况" name="first">
            <plaCasePre ref="plaCasePre" :cusCorp="cusCorp"></plaCasePre>
          </yu-tab-pane>
        </yu-tabs>
        <yu-tabs v-if="nodeId == '8'" v-model="activeName">
          <yu-tab-pane label="回收情况" name="first">
            <plaCaseRec ref="plaCaseRec" :cusCorp="cusCorp" ></plaCaseRec>
          </yu-tab-pane>
        </yu-tabs>
         <yu-tabs v-if="nodeId == '9'" v-model="activeName">
          <yu-tab-pane label="影像资料" name="first">
            <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
          </yu-tab-pane>
        </yu-tabs>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
import plaCaseRet from './plaCaseNode/plaCaseRet.vue';
import plaCasePre from './plaCaseNode/plaCasePre.vue';
import plaCaseSec from './plaCaseNode/plaCaseSec.vue';
import plaCaseRec from './plaCaseNode/plaCaseRec.vue';
import plaCaseFirst from './plaCaseNode/plaCasefirst.vue';
import plaCaseGuar from './plaCaseNode/plaCaseGuar.vue';
import plaCaseAssert from './plaCaseNode/plaCaseAssert';
import plaCaseAssertOther from './plaCaseNode/plaCaseAssertOther';
import plaCaseInfo from './plaCaseNode/plaCaseInfo';
import plaCaseAccused from './plaCaseNode/plaCaseAccused';
import plaCaseYewu from './plaCaseNode/plaCaseYewu';
import imageSystem from '@/views/imageManage/imageSystem';

yufp.lookup.reg('STD_ZB_CUR_TYP,STD_CASE_REASON,STD_PRESERVE_CASE,STD_LAW_CASE_PROCESS,STD_LAWSUIT_TYPE,STD_PARTY_ROLE,STD_ZB_YES_NO,STD_ZB_CERT_TYP,STD_ACCUSED_ROLE,STD_WITHDRAW_RESN,STD_BANK_PRES_CASE,STD_CASE_PROCESS_STATUS,STD_AGT_MODE,STD_CLOSE_CASE_TYPE');
export default {
  components: { plaCaseRet, plaCasePre, plaCaseRec, plaCaseSec, plaCaseFirst, plaCaseGuar, plaCaseAssert, plaCaseAssertOther, plaCaseInfo, plaCaseAccused, plaCaseYewu, imageSystem },
  data: function () {
    return {
      cusCorp: {},
      dataIcon: [
        { id: '0', label: '案件进展登记', pid: '-1', children: [{ id: '1', label: '案件信息', pid: '0' }, { id: '2', label: '保全明细', pid: '0' }, { id: '3', label: '实现担保物权', pid: '0' }, { id: '4', label: '一审信息', pid: '0' }, { id: '5', label: '二审信息', pid: '0' }, { id: '6', label: '再审信息', pid: '0' }, { id: '7', label: '执行情况', pid: '0' }, { id: '8', label: '回收情况', pid: '0' }] },
        {
          id: '9',
          label: '影像资料',
          pid: '-1'
        }
      ],
      nodeId: '1',
      image: '1',
      caseSerno: this.$route.meta.params.caseSerno,
      viewType: '',
      activeName: 'first',
      key: '',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ01',
          'index': {
            'businessid': this.$route.meta.params.caseSerno
          }
        }
      ]
    };
  },

  created () {
    this.afterInt();
  },
  methods: {
    /*
      页面初始化
    */
    afterInt () {
      var _this = this;
      // 案件编号
      var caseSerno = _this.$route.meta.params.caseSerno;
      // 案件类型
      _this.viewType = _this.$route.meta.params.viewType;
      if (_this.viewType == 'DETAIL') {
        _this.image = '2';
      }
      let data = {};
      data.caseSerno = caseSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawcaseinfo/queryPlaLawCaseInfo',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            // _this.cusCorp = response.data;
            yufp.clone(response.data, _this.cusCorp);
            _this.cusCorp.viewType = _this.viewType;
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /**
     * 目录选择
     */
    nodeClick: function (data) {
      var _this = this;
      _this.nodeId = data.id;
      _this.activeName = 'first';
    },
    saveGuar: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm7.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({ message: '请先将表格填写完整', type: 'warning' });
        return;
      }
      _this.formdata1.caseSerno = _this.caseSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawguar/batchInsert',
        data: JSON.stringify(_this.formdata1),
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$message('保存成功');
          } else {
            _this.$message({ message: response.message, type: 'error' });
          }
        }
      });
    }
  }
};
</script>
