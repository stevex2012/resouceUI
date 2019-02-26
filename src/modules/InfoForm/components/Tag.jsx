import React from 'react';
import { Button, Tag } from '@components';

const { Group: TagGroup, Closeable: CloseableTag } = Tag;

export default (data, type, options) => {
    const { value, name } = data;
    if (type !== 'edit') {
        return (
            <div style={styles.tagGroup}>
                <TagGroup>
                    {value.map((item) => {
                        return <Tag key={item.code}>{item.name}</Tag>;
                    })}
                </TagGroup>
            </div>
        );
    } else {
        return (
            <div style={styles.tagGroup}>
                <TagGroup>
                    {value.map((item) => {
                        return (
                            <CloseableTag
                                key={item.code}
                                onClose={(from) => {
                                    if (from === 'tail') {
                                        options.tagChange(name, 'id', item.id);
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }}
                            >
                                {item.name}
                            </CloseableTag>
                        );
                    })}
                </TagGroup>
                <Button text style={{ color: '#48f', lineHeight: '28px' }} onClick={options[`edit${name}`]}>
                    修改
                </Button>
            </div>
        );
    }
};

const styles = {
    tagGroup: {},
};
