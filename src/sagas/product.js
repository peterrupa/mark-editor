import { call, put } from 'redux-saga/effects';
import ProductActions from '../redux/product';

export function* getProducts(api, { userId }) {
    const response = yield call(api.getProducts, userId);

    if (response.ok) {
        const products = response.data;

        yield put(ProductActions.setProducts(products));
    } else {
        // @TODO: error handling
    }
}

export function* getProduct(api, { productId }) {
    const response = yield call(api.getProduct, productId);

    if (response.ok) {
        const product = response.data;

        yield put(ProductActions.setProduct(product));
        yield put(ProductActions.requestManuals(productId));
    } else {
        // @TODO: error handling
    }
}

export function* getManuals(api, { productId }) {
    const response = yield call(api.getManuals, productId);

    if (response.ok) {
        const manuals = response.data;

        yield put(ProductActions.setManuals(productId, manuals));
    } else {
        // @TODO: error handling
    }
}