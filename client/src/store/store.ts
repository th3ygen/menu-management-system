import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu/menu-slice";
import navigationReducer from "./navigation/navigation-slice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			menu: menuReducer,
			navigation: navigationReducer,
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
