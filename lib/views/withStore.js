import React, { useEffect, useState } from "react";

const vs = (value, store) => {
  if (store.name) {
    return {
       [store.name]: store,
      ...value
    }
  }
  return {
    store,
    ...value
  }
}

export default function withStore (Component, storeFactory, valueReducer = vs, onPropsChange = null ) {
  return (props) => {
    const [storeProps, setStoreProps] = useState({});
    const [store, setStore] = useState(false);
    useEffect(() =>
      {
        const store = typeof storeFactory === 'function' ? storeFactory(props) : storeFactory;
        setStore(store);
        const sub = store.subscribe({
          next(value) {
            setStoreProps(valueReducer(value, store, props));
          },
        });

        return () => sub.unsubscribe();
      },

      []);

    useEffect(() => {
      if (store && typeof onPropsChange === 'function') onPropsChange(props, store)
    }, [props, !!store])

    if (store) return <Component {...props} {...storeProps} />;
    return '';
  }

}
