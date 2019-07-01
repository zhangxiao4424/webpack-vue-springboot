const path = require('path')
// 启动热更新的第二步
const webpack = require('webpack')
// 导入在内存中生成HTML页面的插件， 只要是插件都一定要放到plugin节点中
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 这个配置文件 就是一个js文件通过node中的模块操作，向外暴露了一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'), // 入口 表示要使用webpack打包那个文件
    output: { //输出文件相关的配置
        path: path.join(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' // 指定 输出文件的名称
    },
    devServer: { // 这是配置dev-server命令参数的第二种形式，相对来说麻烦一些
        open: true, // 自动打开浏览器
        port: 3000, // 设置启动的运行端口
        contentBase: 'src', // 指定托管根目录
        hot: true, // 启动热更新的第一步
    },
    plugins: [ // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(), // new 一个热更新的对象， 启用热更新的第三步
        new htmlWebpackPlugin({ // 创建一个在内存中生成HTML的插件
            template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html', // 指定生成的页面名称
        }),
        new VueLoaderPlugin() //make sure to include the plugin for the magic
    ],
    module: { // 这个节点，用于配置所有的第三方模块加载器
        rules: [ // 所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 配置处理.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|gif|bmp|kpeg)$/, use: 'url-loader?limit=75984&name=[hash:8]-[name].[ext]' }, // 处理图片路径  limit给定的值是图片的大小， 单位是byte， 如果引用的图片大于或等于给定的limit值
            // 这不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: "url-loader" }, //处理字体
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //配置Babel来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader'},
            { test: /mxClient\.js$/, use: 'exports-loader?mxClient,mxGraphModel,mxActor,mxShape,mxEventObject,mxGraph,mxPrintPreview,mxEventSource,mxRectangle,mxVertexHandler,mxMouseEvent,mxGraphView,mxImage,mxGeometry,mxRubberband,mxKeyHandler,mxDragSource,mxGraphModel,mxEvent,mxUtils,mxWindow,mxEvent,mxCodec,mxCell,mxConstants,mxPoint,mxGraphHandler,mxCylinder,mxCellRenderer,mxEvent,mxUndoManager'}
        ]
    },
    // , loader: 'exports-loader?mxClient,mxGraphModel,mxActor,mxShape,mxEventObject,mxGraph,mxPrintPreview,mxEventSource,mxRectangle,mxVertexHandler,mxMouseEvent,mxGraphView,mxImage,mxGeometry,mxRubberband,mxKeyHandler,mxDragSource,mxGraphModel,mxEvent,mxUtils,mxWindow,mxEvent,mxCodec,mxCell,mxConstants,mxPoint,mxGraphHandler,mxCylinder,mxCellRenderer,mxEvent,mxUndoManager'
    resolve: {
        alias: {
            // " vue$": "vue/dist/vue.js" // 修改Vue被导入时候的包的路径
        }
    }
}