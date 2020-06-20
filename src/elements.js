import Vue from 'vue'
import { Pagination, MessageBox, Message,Button } from 'element-ui'

// 注册全局组件
Vue.component(Pagination.name, Pagination)  // el-pagination
Vue.component(Button .name,Button )  // el-pagination
// 也可使用 Vue.use(Pagination)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message