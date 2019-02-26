import '../style/_default.scss';

export default ({ children }) => {
    window.__removeLoading();
    return children;
};
