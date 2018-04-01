import React, {Component} from 'react';
import './Operator.less';

class Operator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const message = () => {
            if (this.props.step === 0) {
                return '黑走';
            }
            if (this.props.step === 1) {
                return '白走';
            }
            if (this.props.step === 2) {
                return '请先按开始，开始后黑棋先走';//懒得回去判断强制要求谁走就可以了
            }
        };
        return (
            <div className={`${'op'}`}>
                <div style={{color: 'red'}}>提示信息：{message()}</div>
                <button onClick={this.props.start}>开始</button>
                <button onClick={this.props.goBack}>悔棋</button>
            </div>
        );
    }
}

export default Operator;
