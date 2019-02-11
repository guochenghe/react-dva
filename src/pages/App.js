
import React from 'react'
import {connect} from 'dva'
import {TagSelect} from 'ant-design-pro'
import {Row,Col,Card} from 'antd'
import './App.css'

@connect(
    //state . models 下面的命名空间
    //和 dispatch中的type结构类似
    state=>({
        tags:state.goods.tags,
        courses:state.goods.courses
    })
)
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tags:[],
            displayCourses:[]
        }
    }

    componentDidMount(){

        this.getList()

    }
    getList(){
        this.props.dispatch({
            type:'goods/getList'
        })
    }
    handleTagChange=(tags)=>{
        //重新计算 需要显示的最新课程
        let newCourses = []
        tags.forEach(tag=>{
            //newCourses.concat([...this.props.courses[tag]])
            newCourses = [...newCourses,...this.props.courses[tag]]
        })
        console.log(tags,newCourses)
        this.setState({
            tags,
            displayCourses:newCourses
        })

    }
    render(){
        return <div>
            <h2>App component</h2>
            <TagSelect onChange={this.handleTagChange}>
                {this.props.tags.map(tag=>{
                    return <TagSelect.Option value={tag} key={tag}>{tag}</TagSelect.Option>
                })}
            </TagSelect>
            
            <Row>
                {this.state.displayCourses.map(course=>{
                    // /course 直接 访问项目下 public 文件夹下面的东西
                    return <Col span={4} key={course.name}>
                        <Card title={course.name}>
                            <img width="100%" src={'/course/'+course.img}/>
                            <p>价格: ¥{course.price}</p>
                            <p>已售: {course.solded}</p>
                        </Card>
                    </Col>
                })}
                
            </Row>
            
            
        </div>
    }
}

export default App