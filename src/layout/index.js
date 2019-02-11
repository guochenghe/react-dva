

import React from 'react'
import { Layout } from 'antd'

const { Header, Footer, Sider, Content } = Layout

class KLayout extends React.Component {
    render() {
        return <Layout>
            <Sider width="200" style={{height:"100vh",color:"#fff"}}>Sider</Sider>
            <Layout>
                <Header style={{color:"#fff"}}>Header</Header>
                <Content style={{margin:"20px"}}>
                    <div style={{padding:24,background:"#fff",minHeight:"300px"}}>{this.props.children}</div>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    }
}

export default KLayout
