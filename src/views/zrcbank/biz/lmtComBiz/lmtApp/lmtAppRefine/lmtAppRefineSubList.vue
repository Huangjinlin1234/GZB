<template>
  <div>
    <yu-panel title="预授信细化分项明细" :hideFilter="false" :collapseHide="false">
      <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border
                 :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false" row-number>
        <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
        <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" width="200px">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewSubOrPrd(scope.row)">{{ scope.row.subPrdSerno }}</a>
            </template>
        </yu-xtable-column>
        <yu-xtable-column prop="pkId" label="主键" hide-column></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdNo" label="授信分项额度编号" hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeName" label="授信品种" width="200px"></yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeProp" label="授信品种类型属性" width="180" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
        <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO" width="120px"></yu-xtable-column>
        <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO" width="120px"></yu-xtable-column>
        <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdAmt" label="原授信额度" hide-column :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column prop="lmtAmt" label="授信额度" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdTerm" label="原额度期限（月）" hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtTerm" label="额度期限（月）" width="120px"></yu-xtable-column>
        <yu-xtable-column prop="chgFlag" label="变更标识" hide-column></yu-xtable-column>
        <yu-xtable-column prop="isCurtRefine" label="是否本次细化"></yu-xtable-column>
        <yu-xtable-column prop="todo" label="操作">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" v-if="scope.row.chgFlag !='2'&&scope.row.chgFlag !='1'&&scope.row.chgFlag !='0'&&type!='VIEW'" @click="editSub(scope.row)">细化</a>
                <a class="underline" style="text-decoration:none" v-if="scope.row.chgFlag !='2'&&scope.row.chgFlag !='1'&&scope.row.chgFlag !='0'" @click="viewSub(scope.row)">查看</a>
            </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>

</template>

<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_PRD_TYPE_PROP,STD_ZB_GUAR_WAY');
import mixin from '@/utils/mixin';

export default {
  mixins: [mixin],
  data: function () {
    return {
      lmtAppSubList: [],
      formDisabled: false,
      dialogVisibleSelected: false,
      type: '',
      serno: ''
    };
  },
  mounted () {
    if (this.getFactory().contextData.serno) {
      this.serno = this.getFactory().contextData.serno;
      this.type = this.getFactory().contextData.op;
      this.getSubAndPrd(this.getFactory().contextData.serno);
    } else {
      this.serno = this.$route.meta.params.serno;
      this.type = this.$route.meta.params.op;
      this.getSubAndPrd(this.$route.meta.params.serno);
    }
  },
  methods: {
    addFn: function () {
      var _this = this;
      _this.dialogVisible = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreply/getchangeablereplyno',
        callback: function (code, message, response) {
          _this.replies = response.data.lmtReplies;
        }
      });
    },
    getSubAndPrd: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsub/getsubandprd',
        data: serno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data.subList;
        }
      });
    },

    /**
      *查看分项信息
      */
    viewSub: function (data) {
      data['model_group_no'] = 'CMG000696';
      data['op'] = 'VIEW';
      data['subSerno'] = data.subPrdSerno;
      data['disAble'] = true;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        data,
        null,
        true,
        true
      );
    },
    /**
     *通过分项或产品流水号查看对应详情
     */
    viewSubOrPrd: function (data) {
      var _this = this;
      if (data.isRevolvLimit != '1' && data.isRevolvLimit != '0') {
        _this.viewSub(data);
      } else {
        var json = {};
        json['op'] = 'VIEW';
        json['subPrdSerno'] = data.subPrdSerno;
        json['model_group_no'] = 'CMG000700';
        this.$dialog.open(
          '单一客户授信申报',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          1600,
          800,
          json,
          null,
          true,
          true
        );
      }
    },

    /**
      *修改分项信息
      */
    editSub: function (data) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccsub/getlmtreplyaccsubbyaccsubno',
        data: {accSubNo: data.origiLmtAccSubPrdNo},
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data) {
              var ifPreOrigin = response.data.isPreLmt;
              if (ifPreOrigin != '1') {
                _this.$xutils.showMsgBox('提示', '当前分项不可进行细化');
                return;
              } else {
                data['model_group_no'] = 'CMG000696';
                data['op'] = 'REFINE';
                data['disAble'] = true;
                data['subSerno'] = data.subPrdSerno;
                data['guarModel'] = data.guarMode;
                _this.$dialog.open(
                  '',
                  'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                  1600,
                  800,
                  data,
                  function () {
                    _this.getSubAndPrd(_this.serno);
                  },
                  true,
                  true
                );
              }
            }
          }
        }
      });
    }
  }
};
</script>
