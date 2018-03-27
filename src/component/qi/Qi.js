import React, {Component} from 'react';
import './Qi.less';

class Qi extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const color = () => {
            if (this.props.item.power === 0) {
                return 'black';
            } else if (this.props.item.power === 1) {
                return 'white';
            } else {
                return 'transparent';
            }
        };

        return (
            <div className={`${'qi'}`}
                 style={{
                     left: this.props.item.position.left * 75 - 20 + 'px',
                     top: this.props.item.position.top > 4 ? this.props.item.position.top * 75 - 65 + 'px' : this.props.item.position.top * 75 - 20 + 'px',
                     background: color(),
                     color: this.props.item.power === 0 ? 'white' : 'black',
                     animation: this.props.item.selected && this.props.item.power !== 2 ? 'qizi 1s linear infinite' : ''
                 }}
                 onClick={this.props.selectHandle}>
                {this.props.item.name}
            </div>
        );
    }
}

export default Qi;