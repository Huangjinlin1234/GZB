<template>
  <div class="credit-apply">
    <yu-panel title="信用卡申请" :collapse-hide="false">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="待处理申请" name="todo"></yu-tab-pane>
        <yu-tab-pane label="申请历史" name="history"></yu-tab-pane>
      </yu-tabs>
      <yu-xform v-model="applyFormdata" related-table-name="yutable" form-type="search" :remove-empty="true">
        <yu-xform-group :column="4">
         <yu-xform-item label="业务流水" placeholder="业务流水" ctype="input" name="serno" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户姓名" placeholder="客户姓名" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件类型" placeholder="证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" name="certType"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" ctype="input" name="certCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-toolbar>
        <yu-button @click="addFn"  v-if="checkCtrl('add')"  v-show="viewButtonHidden">新增</yu-button>
        <yu-button @click="editFn" v-if="checkCtrl('edit')"  v-show="viewButtonHidden">修改</yu-button>
        <yu-button @click="deleteFn"  v-if="checkCtrl('delete')" v-show="viewButtonHidden">删除</yu-button>
        <yu-button @click="viewFn(null)"  v-if="checkCtrl('view')" >查看</yu-button>
        <yu-button @click="submitFn(null)"   v-if="checkCtrl('repeat')" v-show="!viewButtonHidden">复议</yu-button>
      </yu-toolbar>
      <yu-xtable index selection-type="radio" ref="yutable" :data-url="urls.listUrl" style="width: 100%"
          condition-key="condition" request-type="POST" :base-params="searchData">
        <yu-xtable-column label="申请流水号" prop="serno" width="170">
          <template slot-scope="scope">
            <a class="underline" @click="viewFn(scope.row)">{{ scope.row.serno }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="申请类型" prop="applyType" data-code="STD_CARD_APPLY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="申请卡产品" prop="applyCardPrd" data-code="STD_CARD_APPLY_CARD_PRD"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="手机号码" prop="phone"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="appChnl" data-code="STD_CARD_APP_CHNL"></yu-xtable-column>
        <yu-xtable-column label="业务阶段" prop="businessStage" data-code="STD_CRAD_BUSINESS_STAGE"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yufpNwfInit ref="yufpNwfInit" @success-click="successCbFn"></yufpNwfInit>
  </div>
</template>
<script>
import { lookup } from '@/utils';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
lookup.reg('STD_ZB_YES_NO,STD_ZB_CERT_TYP,STD_CARD_APPLY_TYPE,STD_CARD_APPLY_CARD_PRD');
lookup.reg('STD_CARD_APP_CHNL,STD_ZB_APPR_STATUS,STD_CRAD_BUSINESS_STAGE');
export default {
  data () {
    return {
      activeName: 'todo',
      activeName2: 'preIn',
      applyFormdata: {},
      urls: {
        listUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/querybycondition',
        deleteUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/delete/', // /api/creditcardappinfo/delete/{serno}
        reconsiderUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/reconsider'
      },
      preformdata: {},
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false), // ADD EDIT DETAIL
      dialogVisible: false,
      viewButtonHidden: true,
      searchData: {
        condition: {
          applyExistsStatus: '000,992',
          oprType: '01'
        }
      }
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.yutable.remoteData();
    }
  },
  methods: {
    // 标签页切换
    handleClick (e) {
      if (e.name === 'history') {
        this.viewButtonHidden = false;
        this.searchData = {
          condition: {
            applyExistsStatus: '111,990,991,993,997,998',
            oprType: '01'
          }
        };
      } else {
        this.viewButtonHidden = true;
        this.searchData = {
          condition: {
            inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
            applyExistsStatus: '000,992'
          }
        };
      }
    },
    // 新增
    addFn () {
      const route = 'zrcbank/biz/creditcardmanage/creditApply/applyInfo/applyInfo';
      var serno = this.$xutils.getDefaultformulaData('SEQ:LMT_COOP_APP_SERNO');
      this.$router.addRoute(route, '新增', {}, '/' + route);
      this.$router.push({ path: '/' + route, query: {name: this.$route.name, type: 'add', serno: serno, appChnl: '02'}});
    },
    // 修改
    editFn () {
      let selections = this.$refs.yutable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (selections[0].approveStatus !== '000' && selections[0].approveStatus !== '992') {
        return this.$message({ message: '当前审批状态不允许修改!', type: 'warning' });
      }
      const route = 'zrcbank/biz/creditcardmanage/creditApply/applyInfo/applyInfo';
      // this.$router.addRoute(route, selections[0].serno, {}, '/' + route);
      this.$router.addRoute(route, '修改', {}, '/' + route);
      this.$router.push({ path: '/' + route, query: {name: this.$route.name, serno: selections[0].serno, title: '修改', type: 'edit', appChnl: selections[0].appChnl}});
    },
    // 删除
    deleteFn () {
      let selections = this.$refs.yutable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: this.urls.deleteUrl,
          data: {serno: selections[0].serno}
        }).then(({code, message, data}) => {
          if (code == '0') {
            this.$message({ message: '删除成功', type: 'success' });
            this.$refs.yutable.remoteData();
          } else {
            this.$message({ message: message || '删除失败', type: 'error' });
          }
        });
      });
    },
    // 查看
    viewFn (row) {
      let selections, serno;
      if (!row) {
        selections = this.$refs.yutable.selections;
        if (selections.length !== 1) {
          this.$message({ message: '请先选择一条记录', type: 'warning' });
          return;
        }
        serno = selections[0].serno;
      } else {
        serno = row.serno;
      }
      const route = 'zrcbank/biz/creditcardmanage/creditApply/applyInfo/applyInfo';
      // this.$router.addRoute(route, selections[0].serno, {}, '/' + route);
      this.$router.addRoute(route, '查看', {}, '/' + route);
      this.$router.push({ path: '/' + route, query: {name: this.$route.name, serno, title: '查看', type: 'detail'}});
    },
    // 提交
    submitFn () {
      let selections = this.$refs.yutable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      var approveStatus = selections[0].approveStatus;
      var serno = selections[0].serno;
      if (approveStatus != '998') {
        this.$message({ message: '只有否决业务才可发起复议！', type: 'warning' });
        return;
      }

      this.$request({
        method: 'POST',
        url: this.urls.reconsiderUrl,
        data: {'serno': serno}
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.$message({ message: '复议成功！', type: 'warning' });
        } else {
          this.$message({ message: message || '删除失败', type: 'error' });
        }
      });
    }

  }
};
</script>
<style scoped>
.credit-apply {
  height: 100%;
}
</style>
