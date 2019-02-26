const DeviceName = () => {
    const device = navigator.userAgent.toLowerCase();
    if (device.indexOf('iphone') !== -1) {
        return 'iphone-device';
    }
    return 'android-device';
};

export default DeviceName;
