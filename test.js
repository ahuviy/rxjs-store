const Store = require('./index').Store;

const instance = Store({ name: 'Jeff Wright' });

instance.stream.subscribe(val => {
    console.log('got instance value:', val);
});

instance.publish(val => val.name = 'Dean Harvey');
