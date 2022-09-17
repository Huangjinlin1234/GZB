<template>
  <div class="container">
      <el-row>
        <el-col :span="3">
          <yu-tree class="filter-tree" :data="menu" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" default-expand-all ref="tree2" node-key="id" highlight-current>
          </yu-tree>
        </el-col>
        <el-col :span="21">
          <div ref="refChildren" :is="currentView" :children="children"></div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_PRD_BIZ_TYPE');
import lmtIntBankApprBaseInfo from './lmtIntBankApprBaseInfo';
import lmtIntBankApprSubInfo from './lmtIntBankApprSubInfo';
import lmtIntBankApprSubjects from './lmtIntBankApprSubjects';
import lmtIntBankApprReview from './lmtIntBankApprReview';
import lmtIntBankApprBaseBack from './lmtIntBankApprBaseBack';
import customer from '../subjectCredit/bussinessInformation/customer';
import guarantSituation from '../subjectCredit/guarantSituation';
import stockSituation from '../subjectCredit/stockSituation/stockSituation';
import mainAnalyse from '../subjectCredit/subjectAnalyse/bondInvest';
import coopApprovalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex'
import { imageSystem } from '@/utils/unitchange';
export default {
  name: 'Templetfactory',
  components: {
    lmtIntBankApprBaseInfo,
    lmtIntBankApprSubInfo,
    lmtIntBankApprSubjects,
    lmtIntBankApprReview,
    lmtIntBankApprBaseBack,
    customer,
    guarantSituation,
    stockSituation,
    mainAnalyse,
    coopApprovalIndex
  },
  props: {
    pageParams: Object,
    dialogId: String,
    modelGroupNo: String
  },
  data () {
    return {
      menu: [
        {
          id: '1',
          label: '同业客户授信申报',
          children: [
            {
              id: '2',
              label: '授信方案信息',
              children: [
                {
                  id: '2-1',
                  label: '授信基本信息'
                },
                {
                  id: '2-2',
                  label: '授信分项明细'
                },
                {
                  id: '2-3',
                  label: '主体分析'
                },
                {
                  id: '2-4',
                  label: '复议申请表'
                }
              ]
            },
            {
              id: '3',
              label: '关联信息',
              children: [
                {
                  id: '3-1',
                  label: '企业基本情况'
                },
                {
                  id: '3-2',
                  label: '调查报告'
                },
                {
                  id: '3-3',
                  label: '存量授信情况'
                },
                {
                  id: '3-4',
                  label: '影像资料'
                },
                {
                  id: '3-5',
                  label: '流程轨迹'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      show: true,
      dataUrl: backend.cmisBiz + '/api/intbankorgadmitappr/selectByModel',
      Param: {
        condition: JSON.stringify({ oprType: '01', appType: '02' })
      },
      saveBtnShow: false,
      customer: 1,
      activeName: 'first',
      currentView: 'lmtIntBankApprBaseInfo',
      children: Object
    };
  },
  mounted: function () {
    // 初始化参数
    if (this.pageParams) {
      this.serno = this.pageParams.serno;
      this.op = this.pageParams.op; // 按钮状态
      this.op == 'update' ? this.saveBtnShow = true : this.saveBtnShow = false;
      this.cusId = this.pageParams.cusId;
      this.selectType = this.pageParams.selectType;
    } else if (this.$route.meta.params) {
      this.serno = this.$route.meta.params.serno;
      this.op = this.$route.meta.params.op;
      this.op == 'update' ? this.saveBtnShow = true : this.saveBtnShow = false;
      this.cusId = this.$route.meta.params.cusId;
      this.selectType = this.$route.meta.params.selectType;
    }
    if (this.selectType == 'Info') {
      // 隐藏复议申请表菜单
      this.menu.children[0].children[0].children.splice(3, 1);
    }

    // 默认展示第一个
    let data = {};
    data.id = '2-1';
    this.handleNodeClick(data);
  },
  methods: {
    // 菜单栏点击事件
    handleNodeClick (data) {
      if (data.id == '2-1') {
        this.children = {
          serno: this.serno,
          op: this.op
        };
        this.currentView = 'lmtIntBankApprBaseInfo';
        if (this.selectType == 'Back') {
          // 同业客户授信申报-复议授信基本信息
          this.currentView = 'lmtIntBankApprBaseBack';
        }
      } else if (data.id == '2-2') {
        this.children = {
          serno: this.serno,
          op: this.op,
          guarDescExt: this.guarDescExt
        };
        this.currentView = 'lmtIntBankApprSubInfo';
      } else if (data.id == '2-3') {
        this.children = {
          serno: this.serno,
          cusId: this.cusId,
          op: this.op
        };
        this.currentView = 'lmtIntBankApprSubjects';
      } else if (data.id == '2-4') {
        this.children = {
          serno: this.serno,
          op: this.op
        };
        this.currentView = 'lmtIntBankApprReview';
      } else if (data.id == '3-1') {
        this.children = {
          serno: this.serno,
          cusId: this.cusId,
          op: this.op
        };
        this.currentView = 'customer';
      } else if (data.id == '3-3') {
        this.children = {
          serno: this.serno,
          cusId: this.cusId,
          op: this.op,
          customer: 3, // 同业客户3
          group: 1
        };
        this.currentView = 'stockSituation';
      } else if (data.id == '3-4') {
        let params;
        this.pageParams ? params = this.pageParams['obj'] : params = this.$route.meta.params['obj'];
        console.log('===============params', params);
        let imageBizParam = [
          {
          // TODO 根据实际业务场景修正
            top_outsystem_code: 'XXD_ZJTY',
            index: {
              businessid: params.serno,
              custtype: params.curType,
              custconductid: params.inputId,
              custconductname: params.inputIdName,
              orgid: params.inputBrId,
              orgname: params.inputBrIdName,
              opername: params.updIdName,
              custid: params.cusId,
              custname: params.cusName,
              custconduct: '',
              operid: '',
              maintaindate: '',
              contid: "",
              billno: ""
            }
          }
        ];
        imageSystem (imageBizParam, "1", "import;download").then(res => {
          window.open(res);
        })
      } else if (data.id == '3-5') {
        this.children = {
          serno: this.serno,
        };
        this.currentView = 'coopApprovalIndex';
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
