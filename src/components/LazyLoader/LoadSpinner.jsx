import React from 'react';
import Loader from 'react-loader-spinner';
// import { ClipLoader } from 'react-spinners';

const styles = {
    wrapper: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        display: 'block',
        margin: '0 auto',
        borderColor: 'red',
    },
};

// 加载新页面的过度loader
export const spinner = (isLoading = true, error) => {
    if (isLoading) {
        return (
            <div style={styles.wrapper}>
                <Loader type="Triangle" color="#fff" height="50" width="50" />
                {/* <ClipLoader
                    style={styles.spinner}
                    sizeUnit={'px'}
                    size={40}
                    color={'#fff'}
                    loading={isLoading}
                /> */}
            </div>
        );
    }
    if (error) {
        return <div>加载页面出错，请刷新</div>;
    }
    return null;
};
