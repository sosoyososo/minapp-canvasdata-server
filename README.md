简单的小程序canvas可视化数据配置-服务端

## 目的
1. 配合minapp-canvas-preview可视化的对canvas进行可视化配置
2. 生成json数据，用于小程序canvas展示

## 原理
1. 简单的react-app生成一份json数据
2. 将数据传到一个简单的http-server中
3. 小程序请求这份数据，进行绘制

## 详细说明
1. http-server 代码在 src/main.go 下，依赖 github.com/gin-gonic/gin，直接运行 go run main.go 即可(或者去releas去下载我编译好的)
2. 前端项目是react-app，直接运行yarn start可以启动
3. http-server 只提供两个服务 /save 用于保存一份json数据，/get 用于获取一份json数据，
4. http-server 默认端口3005，可以使用 ./main 3006 换端口