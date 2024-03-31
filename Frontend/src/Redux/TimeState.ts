export class TimeState {
    public isIn: boolean = false;
    
}

export enum TimeActionType {
    isIn = "isIn"
}

export interface TimeAction {
    type: TimeActionType;
    payload?: boolean;
}

// 4. Action Creators
export function isInAction(isIn: boolean): TimeAction {
    const action: TimeAction = { type: TimeActionType.isIn, payload: isIn };
    return action;
}

// 5. Reducer
export function timeReducer(currentState = new TimeState(), action: TimeAction): TimeState {

    const newState = { ...currentState };

    switch (action.type) {
        case TimeActionType.isIn:
            newState.isIn = action.payload;
            break;
    }

    return newState;
}