import React, {Component} from 'react';
import './GeZi.less';

class GeZi extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${'gezi'}`}>
                <div className={`${'xian1'}`} style={{display: this.props.xian === 1 ? 'block' : 'none'}}>
                </div>
                <div className={`${'xian2'}`} style={{display: this.props.xian === 2 ? 'block' : 'none'}}>
                </div>
            </div>
        );
    }
}

export default GeZi;
