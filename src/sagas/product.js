import { call, put } from 'redux-saga/effects';
import ProductActions from '../redux/product';
import EditorActions from '../redux/editor';

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

export function* addProduct(
    api,
    { userId, name, descriptionSummary, descriptionDetail, image }
) {
    const response = yield call(
        api.addProduct,
        userId,
        name,
        descriptionSummary,
        descriptionDetail,
        image
    );

    if (response.ok) {
        const product = response.data;

        yield put(ProductActions.doneAddProduct());
        yield put(ProductActions.setProduct(product));
    } else {
        // @TODO: error handling
    }
}

export function* addManual(api, { productId, name, description }) {
    const response = yield call(api.addManual, productId, name, description);

    if (response.ok) {
        const manual = response.data;

        yield put(ProductActions.doneAddManual());
        yield put(ProductActions.setManual(productId, manual));
    } else {
        // @TODO: error handling
    }
}

export function* getManual(api, { productId, manualId }) {
    const response = yield call(api.getManual, productId, manualId);

    if (response.ok) {
        const manual = response.data;
        yield put(ProductActions.setManual(parseInt(productId, 10), manual));
    } else {
        // @TODO: error handling
    }
}

export function* getProductAndManual(api, { productId, manualId }) {
    const response = yield call(api.getProduct, productId);

    if (response.ok) {
        const product = response.data;

        product.manuals = [];

        yield put(ProductActions.setProduct(product));
        yield put(ProductActions.requestManual(productId, manualId));
    } else {
        // @TODO: error handling
    }
}

export function* uploadImageTarget(api, { productId, image }) {
    const response = yield call(api.uploadImageTarget, productId, image);

    if (response.ok) {
        const imageTarget = response.data;

        yield put(ProductActions.addImageTarget(productId, imageTarget));
        yield put(EditorActions.setImageTarget(imageTarget.url));
    } else {
        // @TODO: error handling
    }
}
