<template>
    <div class="addItem">
        <!-- <h1>Accout</h1> -->
        <!-- <router-link to="/accout/login">登录</router-link>
        <router-link to="/accout/register">注册</router-link>

        <router-view/> -->
        <form class="content">
            <div class="form-group">
                <label>LastName</label>
                <input type="text" v-model="addItem.lastName" class="form-control" placeholder="zhangsan">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="addItem.email" class="form-control" placeholder="zhangsan@atguigu.com">
            </div>
            <div class="form-group">
                <label>Gender</label><br/>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" v-model="addItem.gender"  value="1">
                    <label class="form-check-label">男</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" v-model="addItem.gender" value="0">
                    <label class="form-check-label">女</label>
                </div>
            </div>
            <div class="form-group">
                <label>department</label>
                <select class="form-control" v-model="addItem.department">
                    <option v-for="item in departmentList" :key="item.id" :label="item.departmentName" :value="item"></option>
                </select>
            </div>
            <div class="form-group">
                <label>Birth</label>
                <input type="text" v-model="addItem.birth" class="form-control" placeholder="zhangsan">
            </div>
        </form>
        <div>
            <button class="btn btn-primary" v-if="!$route.query.itemId" @click="enter">添加</button>
            <button class="btn btn-primary" v-if="!!$route.query.itemId" @click="edit">修改</button>
            <button class="btn btn-danger" @click="cancel">取消</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            addItem: {
                lastName: '',
                email: '',
                birth: '',
                department: '',
                gender: 1
            },
            departmentList: []
        }
    },
    mounted() {
        if (!!this.$route.query.itemId) {
            console.log(this.$route.query.itemId);
            this.getItemById();
        }
        this.getDepartment();
        let ht = require("ht");
        console.log(ht.DataModel);
        // 创建数据模型容器  
        var dataModel = new ht.DataModel();  
        
        // 创建拓扑图组件  
        var graphView = new ht.graph.GraphView(dataModel);  
        
        // 创建一个起始节点，设置名字和位置属性，添加到数据模型容器  
        var source = new ht.Node();  
        source.setName('source');  
        source.setPosition(100, 70);                  
        dataModel.add(source);  
        
        // 创建一个结束节点，设置名字和位置属性，添加到数据模型容器  
        var target = new ht.Node();  
        target.setName('target');    
        target.setPosition(260, 70);  
        dataModel.add(target);  
        
        // 创建一条连线，设置起始和结束节点，添加到数据模型容器             
        var edge = new ht.Edge();  
        edge.setSource(source);  
        edge.setTarget(target);  
        dataModel.add(edge); 
    },
    methods: {
        enter() {
            this.$http({
                method: "POST",
                url: 'http://localhost:9500/addItem',
                data: this.addItem
            }).then(res => {
                if (res.data.status === 'success') {
                    this.$router.push({path: '/goodsList'});
                }
            })
        },
        edit() {
            this.$http({
                method: "POST",
                url: 'http://localhost:9500/editItem',
                data: this.addItem
            }).then(res => {
                if (res.data.status === 'success') {
                    this.$router.push({path: '/goodsList'});
                }
            })
        },
        cancel() {
            this.$router.push({path: '/goodsList'});
        },
        getDepartment() {
            this.$http({
                method: 'GET',
                url: 'http://localhost:9500/getDepartment'
            }).then(res => {
                this.departmentList = res.data.departmentList;
                this.addItem.department = this.departmentList[0];
            })
        },
        getItemById() {
            this.$http({
                method: 'GET',
                url: `http://localhost:9500/getItemById?Id=${this.$route.query.itemId}`
            }).then(res => {
                console.log(res.data.dataItem);
                this.addItem = res.data.dataItem;
            })
        }
    }
}
</script>
<style lang="scss">
    .addItem {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .content {
            margin-top: 100px;
            width: 500px;
        }
    }
</style>
