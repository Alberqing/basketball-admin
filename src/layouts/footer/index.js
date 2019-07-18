import React from 'react';
import {Icon} from 'antd';
import './style.less';

export default function (props) {
    return (
        <div styleName="footer" {...props}>
            Copyright <Icon type="copyright"/> 辽宁男篮 2019
        </div>
    );
}
