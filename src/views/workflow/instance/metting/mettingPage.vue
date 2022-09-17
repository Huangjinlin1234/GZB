
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会办详情</span>
      </div>
      <el-table-x ref="gatherList" :data-url="urls.dataUrl" :pageable="false" :request-type="requestType" :base-params="dataParams" :table-columns="tableColumns" ></el-table-x>
    </el-card>
  </div>
</template>
<script>
const data = {};
export default {
  props: {
    bizPageData: {
      // 评论信息
      type: Array,
      default: function () {
        return null;
      }
    }
  },
  data: function () {
    return {
      urls: {
        dataUrl: backend.workflowService + '/api/metting/voteAll'
      },
      requestType: 'GET',
      dataParams: {
        condition: JSON.stringify({
        })
      },
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true,
        align: 'center'
      }, {
        label: '会议标题',
        prop: 'mettingSub',
        resizable: true,
        align: 'center'
      }, {
        label: '会议年份',
        prop: 'mettingYear',
        resizable: true,
        align: 'center'
      }, {
        label: '会议期号',
        prop: 'mettingNo',
        resizable: true,
        align: 'center'
      }, {
        label: '投票人',
        prop: 'userId',
        resizable: true,
        align: 'center'
      }, {
        label: '投票人姓名',
        prop: 'userName',
        resizable: true,
        align: 'center'
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true,
        align: 'center'
      }, {
        label: '结束时间',
        prop: 'endTime',
        resizable: true,
        align: 'center'
      }, {
        label: '投票结果',
        prop: 'mettingSts',
        resizable: true,
        align: 'center',
        template: function () {
          return '<template slot-scope="scope">\
                <span style="color:green;" v-if="scope.row.mettingSts==\'Y\'">同意</span>\
                <span style="color:red;" v-if="scope.row.mettingSts==\'N\'">否决</span>\
                <span style="color:orange;" v-if="scope.row.mettingSts==\'G\'">再议</span>\
                <span style="color:#20A0FF;" v-if="scope.row.mettingSts==null">未投票</span>\
                </template>';
        }
      }, {
        label: '会议意见',
        prop: 'mettingComment',
        resizable: true,
        align: 'center'
      }]
    };
  },
  // watch: {
  //   bizPageData(val, newVal) {
  //     if (newVal && newVal.instanceId) {
  //       var param = {
  //         condition: JSON.stringify({
  //           instanceId: newVal.instanceId
  //         })
  //       }
  //       this.$refs.reftable.remoteData(param);
  //     }
  //   }
  // },
  created: function () {
    var params = this.bizPageData == null ? this.$routes.params : this.bizPageData;
    if (params != null) {
      this.dataParams = {
        condition: JSON.stringify({
          instanceId: params.instanceId,
          bizId: params.bizId,
          meetId: params.meetId
        })
      };
    }
  },
  mounted: function () {
  },
  methods: {}

};
</script>
