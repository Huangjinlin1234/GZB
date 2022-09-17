<!-- 
  @Created by zhuly8@yusys.com.cn 2021-03-18
  @updated by
  @description test
-->
<template>
  <div class="notice-info">
    <yu-panel :title="$t('notice.ggxq')" panel-type="simple" is-collapse>
      <h3 class="title">{{ formdata.noticeTitle }}</h3>
      <div class="status">
        <span>重要程度：<i>{{ formdata.noticeLevel | formatLevel }}</i></span>
        <span>状态：<i>{{ formdata.pubSts | formatPubSts }}</i></span>
        <span v-if="formdata.pubTime">发布：<i>{{ formdata.pubTime }}</i></span>
      </div>
      <div class="content" v-html="formdata.context"></div>
      <div class="org">接收机构：<span>{{ reciveOrgMap || '全部机构' }}</span></div>
      <div class="org">接收角色：<span>{{ reciveRoleMap || '全部角色' }}</span></div>
    </yu-panel>
    <yu-form-buttons :padding-left="16">
      <yu-button v-if="formdata.pubSts === 'C'" type="primary" @click="editFn">{{ $t('notice.xg') }}</yu-button>
      <yu-button v-if="formdata.pubSts === 'C'" @click="pusblishFn">{{ $t('notice.fb') }}</yu-button>
      <yu-button v-if="formdata.pubSts === 'C'" @click="deleteFn">{{ $t('notice.sc') }}</yu-button>
      <yu-button @click="cancleFn">{{ $t('notice.qx') }}</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import { lookup } from '@/utils'
lookup.reg('NOTICE_LEVEL, PUB_STS')

export default {
  
  filters: {
    formatLevel(val) {
      if(val) {
        return lookup.convertKey('NOTICE_LEVEL', val);
      }
    },
    formatPubSts(val) {
      if(val) {
        return lookup.convertKey('PUB_STS', val);
      }
    }
  },
  data() {
    return {
      // noticeId: this.$route.meta.params && this.$route.meta.params.noticeId,
      noticeId: this.$route.query.noticeId,
      formdata: {
        noticeTitle: '',
        noticeLevel: '',
        pubSts: '',
        pubTime: '',
        context: '',
        reciveOrgMap: '',
        reciveRoleMap: ''
      }
    }
  },
  mounted() {
    this.getNotice();
  },
  methods: {
    cancleFn() {
      this.$route.query.isGetNotice === 'true' && yufp.globalEventBus.$emit('GetNoticeList');
      this.$router.back();
      yufp.router.removeTab(this.$route.path);
    },
    
    /**
    * 发布公告
    */
    pusblishFn(row) {
      const _this = this;
      if(!_this.noticeId) {
        return;
      }
      _this.$request({
        method: 'POST',
        url: backend.appOcaService + '/api/adminsmnotice/pub',
        data: [_this.noticeId]
      }).then(({code, message, data}) => {
        if (code === '0') {
          _this.$message({
            message: message,
            type: 'success'
          });
          yufp.globalEventBus.$emit('addNoticeFinish');
          _this.$router.back();
          yufp.router.removeTab(this.$route.path);
        } else {
          _this.$message({
            message: message || this.$t('notice.scsb'),
            type: 'error'
          });
        }
      });
    },

    editFn() {
      const route = 'content/systemManager/notice/editNotice';
      yufp.router.removeTab(this.$route.path);
      this.$router.addRoute(route, this.$t('notice.editgg'), {}, '/editNotice'); // 第三个参数meta详情见VUE官方的router参数
      this.$router.push({ path: '/editNotice', query: {noticeId: this.noticeId, isEdit: 'edit'} }); // query 可传递新页面初始化加载的参数
    },

    getNotice() {
      var _this = this;
      if(!_this.noticeId) {
        return;
      }
      this.$request({
        method: 'GET',
        url: backend.appOcaService + `/api/adminsmnotice/info/${_this.noticeId}`,
        data: {},
      }).then(({code, message, data}) => {
        if (code === '0') {
          const roleNames = [], orgNames = [];
          Object.keys(data.reciveRoleMap).forEach((key, item) => {
            roleNames.push(data.reciveRoleMap[key]);
          })
          Object.keys(data.reciveOrgMap).forEach((key, item) => {
            orgNames.push(data.reciveOrgMap[key]);
          })
          this.formdata.roleNames = roleNames.join();
          this.formdata.orgNames = orgNames.join();
          this.formdata.noticeTitle = data.noticeTitle;
          this.formdata.context = data.context;
          this.formdata.pubSts = data.pubSts;
          this.formdata.noticeLevel = data.noticeLevel;
          this.formdata.pubTime = data.pubTime && (data.creatorName + '（' + data.pubTime + '）') || '';

        } else {
          _this.$message({
            message: message || this.$t('notice.bcsb'),
            type: 'error'
          });
        }
      });
    },

    /**
    * 删除公告
    */
    deleteFn: function(row) {
      const _this = this;
      if(!_this.noticeId) {
        return;
      }
      _this.$request({
        method: 'POST',
        url: backend.appOcaService + '/api/adminsmnotice/delete',
        data: [_this.noticeId]
      }).then(({code, message, data}) => {
        if (code === '0') {
          _this.$message({
            message: _this.$t('notice.sccg'),
            type: 'success'
          });
          yufp.globalEventBus.$emit('addNoticeFinish');
          _this.$router.back();
          yufp.router.removeTab(this.$route.path);
        } else {
          _this.$message({
            message: message || this.$t('notice.scsb'),
            type: 'error'
          });
        }
      });
    }
    
  }
}
</script>
<style scoped>
 .notice-info .title{
   text-align: center;
   font-size: 16px;
   color: #333333;
 }
.notice-info .status{
  background: #eeeeee;
  height: 48px;
  margin: 16px;
  text-align: center;
  line-height: 48px;
}
.notice-info .status span {
  padding: 0 10px;
}
.notice-info .status>span i{
  color: #333333;
  font-style: normal;
}
.notice-info .content{
  margin: 0 16px;
  padding-bottom: 24px;
  padding-top: 12px;
  border-bottom: 1px solid #eee;
}
.notice-info .org{
  margin: 16px;
}
.notice-info .org>span{
  color: #333333;
}

</style>

