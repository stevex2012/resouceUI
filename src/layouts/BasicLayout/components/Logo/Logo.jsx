import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
    render() {
        return (
            <Link to="/" style={{ ...styles.logoStyle, ...this.props.style }}>
                {process.env.REACT_APP_NAME}
            </Link>
        );
    }
}

const styles = {
    logoStyle: {
        display: 'block',
        maxWidth: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '20px',
        color: '#fff',
        fontWeight: 'bold',
        textDecoration: 'none',
        flexShrink: 0,
        marginRight: '20px',
    },
};
