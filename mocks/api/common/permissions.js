import Mock from 'mockjs';
import backend from '../../../src/config/constant/app.data.service';
import demoLookups from './data/data.lookup';
import permissions from './data/permissions';

const getUsersList = config => {
  return {
    code: '0',
    message: '处理成功',
    rows: [
      {age: 18, userCode: '00063', userName: '李四'}
    ]
  };
};

export default [
  {
    url: 'console/api/users',
    type: 'post',
    response: getUsersList
  }
];