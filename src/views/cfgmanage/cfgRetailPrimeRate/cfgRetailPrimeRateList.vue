<template>
    <div>
        <yu-panel title="零售优惠利率权限配置" :collapse-hide="false">
            <yu-xform ref="refForm" form-type="search" v-model="searchFormdata"  label-width="120px" related-table-name="yutable" >
                <yu-xform-group :column="4">
                    <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
                    <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" fuzzy-query="both"></yu-xform-item>
                    <yu-xform-item label="岗位名称" ctype="input" placeholder="岗位名称" name="dutyName" fuzzy-query="both"></yu-xform-item>
                    <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" fuzzy-query="both"></yu-xform-item>
                </yu-xform-group>
            </yu-xform>
            <yu-button-drop>
                <yu-button ref="btn_addFn" @click="addFn()">新增</yu-button>
                <yu-button ref="btn_editFn" @click="editFn()">修改</yu-button>
                <yu-button ref="btn_deleteFn" @click="deleteFn()">删除</yu-button>
                <yu-button ref="btn_viewFn" @click="viewFn()">查看</yu-button>
            </yu-button-drop>
            <yu-xtable index selection-type="radio" ref="yutable" :data-url="dataUrl" style="width: 100%"
                row-number condition-key="condition" :base-params="searchData" row-key="pkId" request-type="POST">
                <!-- <yu-xtable-column prop="pkId" hidden></yu-xtable-column> -->
                <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
                <yu-xtable-column label="产品代码" prop="prdId" ></yu-xtable-column>
                <yu-xtable-column label="机构代码" prop="orgCode" ></yu-xtable-column>
                <yu-xtable-column label="机构名称" prop="orgName"></yu-xtable-column>
                <yu-xtable-column label="岗位代码" prop="dutyCode"></yu-xtable-column>
                <yu-xtable-column label="岗位名称" prop="dutyName"></yu-xtable-column>
                <yu-xtable-column label="报价利率" prop="offerRate" sign="%" :multiple="100"></yu-xtable-column>
                <yu-xtable-column label="利率下调上限" prop="rateMax"></yu-xtable-column>
                <yu-xtable-column label="利率下调下限" prop="rateMin"></yu-xtable-column>
                <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
                <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
                <yu-xtable-column label="最后修改日期" prop="updDate"></yu-xtable-column>
            </yu-xtable>
        </yu-panel>

    </div>
</template>

<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_ZB_GUAR_WAY,STD_ZB_TERM_TYPE');
lookup.reg('STD_CARD_APP_CHNL,STD_ZB_APPR_STATUS,STD_CRAD_BUSINESS_STAGE');
export default {
  data () {
    return {
      dataUrl: this.$backend.cmisCfg + '/api/cfgretailprimerate/show/',
      searchFormdata: {}
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.yutable.remoteData();
    }
  },
  methods: {

    /** 新增方法 */
    addFn () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/cfgRetailPrimeRate/cfgRetailPrimeRateInsert', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_cfgRetailPrimeRateInsert', // 必传
        // 页签名称
        title: '新增零售优惠利率配置',
        // 传递的业务数据，可选配置
        data: {
          pageType: 1 // 新增,
        },
        afterTabClose: () => {
          this.$refs.yutable.remoteData();
        }
      });
    },
    /** 修改方法 */
    editFn () {
      var _this = this;
      let selections = this.$refs.yutable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      _this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/cfgRetailPrimeRate/cfgRetailPrimeRateUpdate', // 菜单路径
        // 自定义唯一页签key
        key: 'cfgRetailPrimeRateUpdate', // 必传
        // 页签名称
        title: '修改零售优惠利率配置',
        // 传递的业务数据，可选配置
        data: {
          pageType: 2,
          selection: selections[0] // 修改,
        }
      });
    },
    /** 删除方法 */
    deleteFn () {
      var _this = this;
      let selections = _this.$refs.yutable.selections;
      if (selections.length !== 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var row = _this.$refs.yutable.selections[0];
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            _this.$request({
              url: _this.$backend.cmisCfg + '/api/cfgretailprimerate/delete/' + row.pkId,
              method: 'post',
              data: row
            }).then((response) => {
              if (response.code === '0') {
                _this.$xutils.showMsgBox('提示', '删除成功', 350, 150);
                _this.$refs.yutable.remoteData();
              } else {
                _this.$xutils.showMsgBox('提示', response.message, 350, 150);
              }
            });
          }
        }
      });
    },
    /** 查看详情方法 */
    viewFn () {
      var _this = this;
      let selections = _this.$refs.yutable.selections;
      if (selections.length !== 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'cfgmanage/cfgRetailPrimeRate/cfgRetailPrimeRateView', // 菜单路径
        // 自定义唯一页签key
        key: 'custom_cfgRetailPrimeRateView', // 必传
        // 页签名称
        title: '查看零售优惠利率配置',
        // 传递的业务数据，可选配置
        data: {
          pageType: 3,
          selection: selections[0] // 详情,
        }
      });
    }
  }
};
</script>