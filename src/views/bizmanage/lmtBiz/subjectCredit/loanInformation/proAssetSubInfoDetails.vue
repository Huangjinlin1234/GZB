<template>
  <div class="container">
    <el-row>
      <el-col :span="3">
        <yu-tree class="filter-tree" :data="menu" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" default-expand-all ref="tree2" node-key="id" highlight-current>
        </yu-tree>
      </el-col>
      <el-col :span="21">
        <div ref="refChildren" :is="currentViewbasic" :children="children" @changed="cancelFn"></div>
        <div v-show="show">
          <iframe :src="printUrl" width="1000px" height="700px" frameborder="0"></iframe>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_PRD_BIZ_TYPE');
import proAssetSubInfoUpd from './proAssetSubInfoUpd';
import lmtCoopProject from './lmtCoopProject';
import basicConcluSubjects from './basicConcluSubjects';
import basicMainInfoSubjects from './basicMainInfoSubjects';
import bussiness from '../bussinessInformation/bussiness';
import customer from '../bussinessInformation/customer';
import guarantSituation from '../guarantSituation';
import stockSituation from '../stockSituation/stockSituation';

export default {
  name: 'Templetfactory',
  components: {
    proAssetSubInfoUpd,
    lmtCoopProject,
    basicConcluSubjects,
    basicMainInfoSubjects,
    bussiness,
    customer,
    guarantSituation,
    stockSituation
  },
  props: {
    pageParams: {
      type: Object,
      default: function () {
        return {};
      }
    },
    dialogId: String,
    modelGroupNo: String
  },
  data () {
    return {
      menu: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      show: false,
      saveBtnShow: false,
      customer: '',
      currentViewbasic: '',
      children: Object,
      serno: String,
      guarDescExt: ''
    };
  },
  mounted () {
    if (this.pageParams) {
      let pageParams = this.pageParams;
      this.basicSerno = pageParams.basicSerno;
      this.basicCusId = pageParams.basicCusId;
      this.lmtAmt = pageParams.lmtAmt;
      this.prdTotalAmt = pageParams.prdTotalAmt;
      this.serno = pageParams.serno;
      this.cusId = pageParams.cusId;
      this.customer = Number(pageParams.basicCusCatalog); // 2企业法人 3同业客户
      this.op = pageParams.op; // 按钮状态
      this.isAppBasicLmt = pageParams.isAppBasicLmt; // 申请类型
    } else {
      // 标签页
      let params = this.$route.meta.params;
      this.basicSerno = params.basicSerno;
      this.basicCusId = params.basicCusId;
      this.lmtAmt = params.lmtAmt;
      this.prdTotalAmt = params.prdTotalAmt;
      this.serno = params.serno;
      this.cusId = params.cusId;
      this.customer = Number(params.basiccusCatalog); // 2企业法人 3同业客户
      this.op = params.op; // 按钮状态
      this.isAppBasicLmt = params.isAppBasicLmt; // 产品类型
    }
    // 默认展示第一个
    let data = {};
    data.id = '1';
    this.handleNodeClick(data);
    this.menuRecursion();
  },
  created () {},
  methods: {
    // 菜单栏
    menuRecursion () {
      if (this.isAppBasicLmt == '1') {
        this.menu = [
          {
            id: '1',
            label: '底层关联信息'
          },
          {
            id: '2',
            label: '额度申报详情',
            children: [
              {
                id: '2-1',
                label: '企业基本情况'
              },
              {
                id: '2-2',
                label: '授信方案'
              },
              // {
              //   id: '2-3',
              //   label: '担保及增信情况'
              // },
              {
                id: '2-4',
                label: '存量业务情况'
              },
              {
                id: '2-5',
                label: '主体分析'
              },
              {
                id: '2-6',
                label: '调查结论'
              },
              // {
              //   id: '2-7',
              //   label: '调查报告'
              // }
            ]
          }
        ];
      } else if (this.isAppBasicLmt == '0') {
        this.menu = [
          {
            id: '1',
            label: '底层关联信息'
          }
        ];
      }
    },
    // 菜单栏点击事件
    handleNodeClick (data) {
      this.children = {
        basicSerno: this.basicSerno,
        basicCusId: this.basicCusId,
        basicSernoFlag: true,
        lmtAmt: this.lmtAmt,
        prdTotalAmt: this.prdTotalAmt,
        serno: this.serno,
        cusId: this.cusId,
        op: this.op,
        customer: this.customer // 企业法人2 同业客户3
      };
      this.show = false;
      if (this.guarDescExt) {
        this.children.guarDescExt = this.guarDescExt;
      }
      if (data.id == '1') {
        this.currentViewbasic = 'proAssetSubInfoUpd';
      } else if (data.id == '2-1') {
        this.currentViewbasic = this.customer == 2 ? 'bussiness' : 'customer'; // 企业法人2 同业客户3
      } else if (data.id == '2-2') {
        this.currentViewbasic = 'lmtCoopProject';
      } else if (data.id == '2-3') {
        this.children.serno = this.basicSerno;
        this.currentViewbasic = 'guarantSituation';
      } else if (data.id == '2-4') {
        this.children.serno = this.basicSerno;
        this.currentViewbasic = 'stockSituation';
      } else if (data.id == '2-5') {
        this.currentViewbasic = 'basicMainInfoSubjects';
      } else if (data.id == '2-6') {
        this.currentViewbasic = 'basicConcluSubjects';
      } else if (data.id == '2-7') {
        debugger;
        this.show = true;
        this.currentViewbasic = '';
        var _this = this;
        this.printUrl =
          backend.frptRptService + 'zjty-tcbg08.cpt&serno=' + _this.serno + '&cusId=' + _this.basicCusId;
      }
    },

    currentViewbasicLoanChange () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestbasicinfo/selectBySerno',
        data: {
          serno: _this.serno,
          cusId: _this.cusId
        },
        callback: function (code, message, response) {
          if (code == '0') {
            if (response.data == null || response.data == '') {
              _this.currentViewbasic = 'addLoanProject';
            } else if (response.data.basicAssetType == '40') {
              _this.currentViewbasic = 'loanProject';
            } else {
              _this.currentViewbasic = 'nonLoanProject';
            }
          }
        }
      });
    },

    cancelFn (msg) {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>

<style scoped>
/* .container {
  display: flex;
  padding: 20px;
}
.right {
  flex: 1;
} */
</style>
