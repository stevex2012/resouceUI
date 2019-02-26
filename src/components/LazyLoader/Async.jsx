import React from 'react';
import Async from 'react-code-splitting';

export const asyncLoad = (func) => () => <Async load={func} />;
