/**
 * @created by helin3 2019-04-10
 * @updated by
 * @description 演示示例路由
 * 路由参数配置，详见@/router/constant-routes 文件头注释
 */
/* Layout */
import Layout from '@/components/layout';

const permissionsRoutes = [
  {
    path: '/',
    component: Layout,
    meta: { title: '系统管理', icon: 'component' },
    children: [
      {
        path: '/sysConfig/user',
        component: () => import('@/views/permissions/sysConfig/user'),
        name: 'user',
        meta: { title: '用户管理' }
      }]
  }
];
export default permissionsRoutes;
