import React, {Fragment} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

import {
    TabContent, TabPane, Nav, NavItem, NavLink,
    Row, Col,
    Card, CardBody,
    CardTitle, Button, ButtonGroup
} from 'reactstrap';



export default class TabsExample extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (

                <TransitionGroup>
                    <CSSTransition
                        component="div"
                        className="TabsAnimation"
                        appear={true}
                        timeout={0}
                        enter={false}
                        exit={false}>
                        <Row>
                            <Col md="6">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Basic</CardTitle>
                                        <Nav tabs="true">
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '1'})}
                                                        onClick={() => {
                                                            this.toggle('1');
                                                        }}
                                                >
                                                    Tab 1
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '2'})}
                                                        onClick={() => {
                                                            this.toggle('2');
                                                        }}
                                                >
                                                    Tab 2
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '3'})}
                                                        onClick={() => {
                                                            this.toggle('3');
                                                        }}
                                                >
                                                    Tab 3
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <p>It was popularised in the 1960s with the release of Letraset sheets
                                                    containing Lorem Ipsum passages, and more recently with desktop
                                                    publishing software like Aldus PageMaker including versions of Lorem
                                                    Ipsum.</p>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                    since the 1500s, when an unknown printer took a galley of type and
                                                    scrambled it to make a type specimen book. It has survived not only five
                                                    centuries, but also the leap into electronic typesetting, remaining
                                                    essentially unchanged. </p>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the
                                                    1500s, when an unknown printer took a galley of type and scrambled it to
                                                    make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially
                                                    unchanged. </p>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Justified Alignment</CardTitle>
                                        <Nav tabs="true" justified>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '1'})}
                                                        onClick={() => {
                                                            this.toggle('1');
                                                        }}
                                                >
                                                    Tab 1
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '2'})}
                                                        onClick={() => {
                                                            this.toggle('2');
                                                        }}
                                                >
                                                    Tab 2
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '3'})}
                                                        onClick={() => {
                                                            this.toggle('3');
                                                        }}
                                                >
                                                    Tab 3
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <p>It was popularised in the 1960s with the release of Letraset sheets
                                                    containing Lorem Ipsum passages, and more recently with desktop
                                                    publishing software like Aldus PageMaker including versions of Lorem
                                                    Ipsum.</p>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                    since the 1500s, when an unknown printer took a galley of type and
                                                    scrambled it to make a type specimen book. It has survived not only five
                                                    centuries, but also the leap into electronic typesetting, remaining
                                                    essentially unchanged. </p>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the
                                                    1500s, when an unknown printer took a galley of type and scrambled it to
                                                    make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially
                                                    unchanged. </p>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Tabs Variations</CardTitle>
                                        <div className="mb-3" tabs="true">
                                            <ButtonGroup size="sm">
                                                <Button caret="true" color="warning"
                                                        className={"btn-pill ps-3 " + classnames({active: this.state.activeTab === '1'})}
                                                        onClick={() => {
                                                            this.toggle('1');
                                                        }}
                                                >Tab 1</Button>
                                                <Button color="warning"
                                                        className={classnames({active: this.state.activeTab === '2'})}
                                                        onClick={() => {
                                                            this.toggle('2');
                                                        }}
                                                >Tab 2</Button>
                                                <Button color="warning"
                                                        className={"btn-pill pe-3 " + classnames({active: this.state.activeTab === '3'})}
                                                        onClick={() => {
                                                            this.toggle('3');
                                                        }}
                                                >Tab 3</Button>
                                            </ButtonGroup>
                                        </div>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <p>It was popularised in the 1960s with the release of Letraset sheets
                                                    containing Lorem Ipsum passages, and more recently with desktop
                                                    publishing software like Aldus PageMaker including versions of Lorem
                                                    Ipsum.</p>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                    since the 1500s, when an unknown printer took a galley of type and
                                                    scrambled it to make a type specimen book. It has survived not only five
                                                    centuries, but also the leap into electronic typesetting, remaining
                                                    essentially unchanged. </p>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the
                                                    1500s, when an unknown printer took a galley of type and scrambled it to
                                                    make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially
                                                    unchanged. </p>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="6">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Pills</CardTitle>
                                        <Nav pills>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '1'})}
                                                        onClick={() => {
                                                            this.toggle('1');
                                                        }}
                                                >
                                                    Pill 1
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '2'})}
                                                        onClick={() => {
                                                            this.toggle('2');
                                                        }}
                                                >
                                                    Pill 2
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '3'})}
                                                        onClick={() => {
                                                            this.toggle('3');
                                                        }}
                                                >
                                                    Pill 3
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <p>It was popularised in the 1960s with the release of Letraset sheets
                                                    containing Lorem Ipsum passages, and more recently with desktop
                                                    publishing software like Aldus PageMaker including versions of Lorem
                                                    Ipsum.</p>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                    since the 1500s, when an unknown printer took a galley of type and
                                                    scrambled it to make a type specimen book. It has survived not only five
                                                    centuries, but also the leap into electronic typesetting, remaining
                                                    essentially unchanged. </p>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the
                                                    1500s, when an unknown printer took a galley of type and scrambled it to
                                                    make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially
                                                    unchanged. </p>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Pills</CardTitle>
                                        <Nav pills fill>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '1'})}
                                                        onClick={() => {
                                                            this.toggle('1');
                                                        }}
                                                >
                                                    Pill 1
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '2'})}
                                                        onClick={() => {
                                                            this.toggle('2');
                                                        }}
                                                >
                                                    Pill 2
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#"
                                                        className={classnames({active: this.state.activeTab === '3'})}
                                                        onClick={() => {
                                                            this.toggle('3');
                                                        }}
                                                >
                                                    Pill 3
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <p>It was popularised in the 1960s with the release of Letraset sheets
                                                    containing Lorem Ipsum passages, and more recently with desktop
                                                    publishing software like Aldus PageMaker including versions of Lorem
                                                    Ipsum.</p>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                    since the 1500s, when an unknown printer took a galley of type and
                                                    scrambled it to make a type specimen book. It has survived not only five
                                                    centuries, but also the leap into electronic typesetting, remaining
                                                    essentially unchanged. </p>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the
                                                    1500s, when an unknown printer took a galley of type and scrambled it to
                                                    make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially
                                                    unchanged. </p>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Button Group Tabs</CardTitle>
                                        <div className="mb-3 text-center">
                                            <ButtonGroup size="sm">
                                                <Button caret="true" color="primary"
                                                        className={"btn-shadow " + classnames({active: this.state.activeTab === '1'})}
                                                        onClick={() => {
                                                            this.toggle('1');
                                                        }}
                                                >Tab 1</Button>
                                                <Button color="primary"
                                                        className={"btn-shadow " + classnames({active: this.state.activeTab === '2'})}
                                                        onClick={() => {
                                                            this.toggle('2');
                                                        }}
                                                >Tab 2</Button>
                                                <Button color="primary"
                                                        className={"btn-shadow " + classnames({active: this.state.activeTab === '3'})}
                                                        onClick={() => {
                                                            this.toggle('3');
                                                        }}
                                                >Tab 3</Button>
                                            </ButtonGroup>
                                        </div>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <p>It was popularised in the 1960s with the release of Letraset sheets
                                                    containing Lorem Ipsum passages, and more recently with desktop
                                                    publishing software like Aldus PageMaker including versions of Lorem
                                                    Ipsum.</p>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the
                                                    1500s, when an unknown printer took a galley of type and scrambled it to
                                                    make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially
                                                    unchanged. </p>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the
                                                    1500s, when an unknown printer took a galley of type and scrambled it to
                                                    make a type specimen book. It has survived not only five centuries, but
                                                    also the leap into electronic typesetting, remaining essentially
                                                    unchanged. </p>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </CSSTransition>
                </TransitionGroup>

        );
    }
}