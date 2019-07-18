
/*
* 菜单数据 返回Promise各式，支持前端硬编码、异步获取菜单数据
* */
export default function getMenus(userId) {
  // TODO 根据userId获取菜单数据 或在此文件中前端硬编码菜单
  return Promise.resolve([
    { key: 'user-center', local: 'user-center', text: '用户管理', icon: 'user', path: '/user-center', order: 600 },
    { key: 'news', local: 'news', text: '新闻管理中心', icon: 'file-text', path: '/news', order: 600 },
    { key: 'artical', local: 'artical', text: '文章管理中心', icon: 'read', path: '/article', order: 600 },
    { key: 'player', local: 'player', text: '球员管理中心', icon: 'user', path: '/user-center', order: 600 },
    { key: 'player-data', local: 'player-data', text: '球员数据管理中心', icon: 'user', path: '/user-center', order: 600 },
    { key: 'team', local: 'team', text: '球队数据管理中心', icon: 'user', path: '/user-center', order: 600 },
    { key: '反馈管理', local: 'tickling', text: '反馈管理中心', icon: 'user', path: '/user-center', order: 600 },
    { key: '用户笔记', local: 'user-note', text: '用户笔记管理', icon: 'user', path: '/user-center', order: 600 },
  ]);
}
