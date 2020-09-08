import {
  TYPE_MASTER_ITEM_SKU,
  HANDLE_MODE,
  NEW,
  REQUEST,
  INSERT,
  UPDATE,
  DELETE,
} from "../global.action.type";

const initialState = {
  isMode: NEW,
  data: [],
  model: {
    id: "",
    item_code: "",
    item_color: "",
    item_color_name: "",
    item_size: "",
    item_size_name: "",
    item_sku: "",
    basic_unit_code: "",
    basic_unit_name: "",
    basic_unit_qty: 0.0,
    alternate_unit_code: "",
    alternate_unit_name: "",
    alternate_unit_qty: 0.0,
    alternate_factor: "",
    receive_unit_type: "",
    issue_unit_type: "",
    min_qty: 0.0,
    alert_qty: 0.0,
    max_qty: 0.0,
    shelf_life: 0,
    sku_barcode_enable: false,
  },
};

export const reducerMasterItemSku = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_MASTER_ITEM_SKU) {
    switch (handle) {
      case HANDLE_MODE:
        return {
          ...state,
          isMode: payload.isMode,
          model: payload.isMode === NEW ? state.model : payload.model,
        };
      case REQUEST:
        return {
          ...state,
          data: payload,
        };
      case INSERT:
        return {
          ...state,
          data: [...state.data, payload],
        };
      case UPDATE:
        return {
          ...state,
          data: [
            ...state.data.map((e) => {
              if (e.code !== payload.code) {
                return e;
              }
              return payload;
            }),
          ],
        };
      case DELETE:
        return {
          ...state,
          data: [...state.data.filter((e) => e.code !== payload.code)],
        };
      default:
        return state;
    }
  } else {
    return state;
  }
};
