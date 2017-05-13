import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setProductName: ['productName'],
    addStep: null,
    setStepIndex: ['i'],
    setStepInstruction: ['i', 'instruction'],
    addObject: ['id', 'name', 'img', 'pos'],
    removeObject: ['id'],
    setImageTarget: ['blob', 'dimensions'],
    setSelectedObject: ['id'],
    updateObjectPosition: ['id', 'pos']
});

export const EditorTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    steps: [
        {
            instruction: ''
        }
    ],
    currentStepIndex: 0,
    productName: null,
    imageTargets: [null],
    objects: [[]],
    assets: [
        {
            name: 'arrow',
            modelFilename: 'arrow.babylon',
            icon: '/models/arrow/arrow.png'
        }
    ],
    selectedObject: null
});

/* ------------- Reducers ------------- */

export const setProductName = (state, { productName }) =>
    state.merge({ productName });

export const addStep = state =>
    state.merge({
        steps: [
            ...state.steps,
            {
                instruction: ''
            }
        ],
        currentStepIndex: state.steps.length,
        objects: [...state.objects, []],
        imageTargets: [...state.imageTargets, null]
    });

export const setStepIndex = (state, { i }) =>
    state.merge({ currentStepIndex: i, selectedObject: null });

export const setStepInstruction = (state, { i, instruction }) =>
    state.merge({
        steps: state.steps.map((step, j) => {
            if (i === j) {
                return { ...step, instruction };
            }

            return step;
        })
    });

export const addObject = (state, { id, name, img, pos }) =>
    state.merge({
        objects: state.objects.map((step, i) => {
            if (state.currentStepIndex === i) {
                return [
                    ...step,
                    {
                        id,
                        name,
                        img,
                        pos
                    }
                ];
            }

            return step;
        }),
        selectedObject: id
    });

export const removeObject = (state, { id }) =>
    state.merge({
        objects: state.objects.map(step => {
            return step.filter(object => object.id !== id);
        }),
        selectedObject: null
    });

export const setImageTarget = (state, { blob, dimensions }) =>
    state.merge({
        imageTargets: state.imageTargets.map((imageTarget, i) => {
            if (state.currentStepIndex === i) {
                return { blob, dimensions };
            }

            return imageTarget;
        })
    });

export const setSelectedObject = (state, { id }) =>
    state.merge({
        selectedObject: id
    });

export const updateObjectPosition = (state, { id, pos }) =>
    state.merge({
        objects: state.objects.map(step => {
            return step.map(object => {
                if (object.id === id) {
                    return { ...object, pos };
                }

                return object;
            });
        })
    });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_PRODUCT_NAME]: setProductName,
    [Types.ADD_STEP]: addStep,
    [Types.SET_STEP_INDEX]: setStepIndex,
    [Types.SET_STEP_INSTRUCTION]: setStepInstruction,
    [Types.ADD_OBJECT]: addObject,
    [Types.REMOVE_OBJECT]: removeObject,
    [Types.SET_IMAGE_TARGET]: setImageTarget,
    [Types.SET_SELECTED_OBJECT]: setSelectedObject,
    [Types.UPDATE_OBJECT_POSITION]: updateObjectPosition
});
