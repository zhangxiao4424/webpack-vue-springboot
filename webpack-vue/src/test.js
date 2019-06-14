// node中向外暴露成员的方式
// module.exports = {}

// 在ES6中也通过规范的形式，规定了ES6中如何导入和导出模块
// ES6中导入模块，使用import 模块名称 from '模块标识符'

// 在ES6中 用export default 和 export 向外暴露成员：
export default {
    name: 'lllllll'
}

// 注意： export default 向外暴露的成员可以用任意变量来接收
// 注意：在一个模块中export default只能向外爱暴露成员一次 
// 注意：使用export向外暴露的成员，只能用 { } 的形式来接受，着自己哦那个形式较【按需导出】
// 注意：export可以向外暴露多个成员