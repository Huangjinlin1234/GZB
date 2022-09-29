<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import DefaultDashboard from './default';
import OtherDashboard from './other/index.vue';
import staticPage from './static';
import { mapGetters } from 'vuex';
export default {
  name: 'Dashboard',
  components: { DefaultDashboard, OtherDashboard, staticPage, mapGetters },
  data () {
    return {
      currentRole: 'DefaultDashboard'
    };
  },
  computed: {
    ...mapGetters(['roles', 'loginCode'])
  },
  created () {
    // 此处，可根据用户角色信息，动态绑定对应的组件
    // this.currentRole = 'DefaultDashboard';
    // for (let i = 0; i < this.roles.length; i++) {
    //   // 判断是否包含客户经理角色
    //   if (this.roles[i].code == 'R0010' || this.roles[i].code == 'R0020' || this.roles[i].code == 'R0030' || this.roles[i].code == 'R00 ||
    //  oles[i].code == 'R0200' || this.roles[i].code == 'RDH01' || this.roles[i].code == 'RSG01') {
    //   // if (this.loginCode == '54188') {
    //     this.currentRole = 'DefaultDashboard';
    //   }
    // }
  }
};
</script>
