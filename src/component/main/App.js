import React, {Component} from 'react';

import './App.less';

import GeZi from '../tu/GeZi';
import Operator from '../op/Operator';
import Qi from '../qi/Qi';

import qi from '../../server/qi.json';// 静态拿一个json，如果在此之上需要服务器验证或者交流，就要通过这个东西

import Zoufa from '../../util/Zoufa';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qi: [],
            someOneSelected: false,
            whoStep: 2,
            selectItem: []
        };
    }

    // 走位交换
    changePosition = (item) => {
        //调用走位判断机制
        if (Zoufa.methodRun(this.state.selectItem, item, this.state.qi) === 1) {

            // 交换position
            for (let i in qi) {
                if (qi[i].name === this.state.selectItem[1].name && i + '' === this.state.selectItem[0] + '') {
                    const temp = qi[i].position;
                    qi[i].position = item.position;
                    item.position = temp;
                    qi[i].selected = false;
                }
            }
            this.stepChange(this.state.whoStep);// 交换棋手

        } else {
            alert('走位有问题');
        }
    };

    // 交换选手
    stepChange = (whoStep) => {
        if (whoStep === 0) {
            this.setState({
                someOneSelected: false,
                whoStep: 1
            });
        } else {
            this.setState({
                someOneSelected: false,
                whoStep: 0
            });
        }
    };

    startHandle() {
        this.setState({whoStep: 0});
    }

    selectHandle(item, id) {
        if (this.state.whoStep !== 2) {
            // 判断是否开始了

            if ((!this.state.someOneSelected && item.power === 2) || (!this.state.someOneSelected && item.power !== this.state.whoStep)) {
                // 如果没有选择棋子且该棋子是空棋或者选的不是自己的棋子

                alert('选你的棋子啊');

            } else if (!this.state.someOneSelected && item.power !== 2) {
                // 如果没有选择棋子且该棋子不为空棋

                this.setState({
                    someOneSelected: true,
                    selectItem: [id, item]
                });
                for (let i in qi) {
                    qi[i].name === item.name && i + '' === id + '' ? qi[i].selected = true : qi[i].selected = false;
                }

            } else if (this.state.someOneSelected && item.power === this.state.whoStep) {
                // 如果选了棋子,那么再选相同阵营的棋子就会更换棋子

                this.setState({
                    selectItem: [id, item]
                });
                for (let i in qi) {
                    qi[i].name === item.name && i + '' === id + '' ? qi[i].selected = true : qi[i].selected = false;
                }

            } else if (this.state.someOneSelected && item.power === 2) {
                // 如果选了棋子,那么再选空棋就会开始走位
                console.log('开始移动');
                this.changePosition(item);// 调用位置交换方法

            } else if (this.state.someOneSelected && item.power !== this.state.whoStep) {
                // 如果选了棋子,那么再选敌方棋子就会开始能否吃到
                console.log('开始吃掉别人');

                // Zoufa.methodChi();

                this.stepChange(this.state.whoStep);// 交换棋手
            }
            this.setState({qi: qi});

        } else {
            // 这是没开始

            alert('麻烦看提示信息点<开始>按钮');

        }
    }

    componentWillMount() {
        for (let i in qi) {
            qi[i].selected = false;
        }
        this.setState({qi: qi});
    }

    render() {

        const shangQipan = [];
        for (let i = 0; i < 32; i++) {
            if (i === 3 || i === 12) {
                shangQipan.push(<GeZi key={i} xian={1}/>);
            } else if (i === 4 || i === 11) {
                shangQipan.push(<GeZi key={i} xian={2}/>);
            } else {
                shangQipan.push(<GeZi key={i} xian={0}/>);
            }
        }
        const xiaQipan = [];
        for (let i = 0; i < 32; i++) {
            if (i === 19 || i === 28) {
                xiaQipan.push(<GeZi key={i} xian={1}/>);
            } else if (i === 20 || i === 27) {
                xiaQipan.push(<GeZi key={i} xian={2}/>);
            } else {
                xiaQipan.push(<GeZi key={i} xian={0}/>);
            }
        }


        return (
            <div className={`${'App'}`}>
                <div className={`${'container'}`}>
                    <div className={`${'container-qipan'}`}>
                        <div className={`${'shang-qipan'}`}>
                            {shangQipan}
                        </div>
                        <div className={`${'chuhe-hanjie'}`}>
                            楚河汉界
                        </div>
                        <div className={`${'xia-qipan'}`}>
                            {xiaQipan}
                        </div>
                        {
                            this.state.qi.map((item, id) => {
                                return <Qi
                                    item={item}
                                    key={id}
                                    selectHandle={this.selectHandle.bind(this, item, id)}
                                />
                            })
                        }
                    </div>
                    <Operator
                        step={this.state.whoStep}
                        start={this.startHandle.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default App;
