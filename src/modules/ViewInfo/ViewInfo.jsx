import React from 'react';
import { Card, IceContainer } from '@components';

const ViewInfo = ({ title, children, extra, ...props }) => {
    const commonProps = {
        title: title || '标题',
    };
    return (
        <IceContainer>
            <Card {...commonProps} contentHeight="auto" showHeadDivider={false} style={{ border: '0 none' }}>
                {children}
            </Card>
        </IceContainer>
    );
};

export default ViewInfo;
