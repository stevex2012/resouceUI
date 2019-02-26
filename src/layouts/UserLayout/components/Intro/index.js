import React from 'react';

const LoginIntro = () => {
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div style={styles.title}>{process.env.REACT_APP_NAME}</div>
                {/* <p style={styles.description}></p>
                <p style={styles.description}></p> */}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    content: {
        width: '400px',
        color: '#fff',
    },
    title: {
        marginBottom: '20px',
        fontWeight: '700',
        fontSize: '48px',
        lineHeight: '1.5',
    },
    description: {
        margin: '0',
        fontSize: '14px',
        color: '#fff',
        letterSpacing: '0.45px',
        lineHeight: '32px',
    },
};

export default LoginIntro;
