import { Layout, Row, Col } from 'antd';
const { Header, Content } = Layout;

export interface PageLayoutProps {
    header: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
    return (
        <Layout className="page">
            <style global jsx>{`
                html, body, #__next {
                    height: 100%;
                    background-color: var(--main-background-color);
                }

                .page-content {
                    margin-top: 120px;
                }

            `}</style>
            <Header>{props.header}</Header>
            <Layout>
                <Content className="page-content">
                    <Row justify="center">
                        <Col md={12} sm={16} xs={22}>
                            {props.children}
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    )
}
