import React, { FC, useCallback, useMemo } from "react";

export interface State {
  displayLineup: boolean;
  displayMenu: boolean;
  lineupView: string;
  menuView: string;
}

const initialState = {
  displayLineup: false,
  displayMenu: false,
  lineupView: "LINEUP_VIEW",
  menuView: "MENU_VIEW",
};

type Action =
  | {
      type: "OPEN_MENU";
    }
  | {
      type: "CLOSE_MENU";
    }
  | {
      type: "OPEN_LINEUP";
    }
  | {
      type: "CLOSE_LINEUP";
    };

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MENU": {
      return {
        ...state,
        displayMenu: true,
      };
    }
    case "CLOSE_MENU": {
      return {
        ...state,
        displayMenu: false,
      };
    }
    case "OPEN_LINEUP": {
      return {
        ...state,
        displayLineup: true,
      };
    }
    case "CLOSE_LINEUP": {
      return {
        ...state,
        displayLineup: false,
      };
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openMenu = useCallback<() => void>(
    () => dispatch({ type: "OPEN_MENU" }),
    [dispatch]
  );
  const closeMenu = useCallback<() => void>(
    () => dispatch({ type: "CLOSE_MENU" }),
    [dispatch]
  );
  const openLineup = useCallback<() => void>(
    () => dispatch({ type: "OPEN_LINEUP" }),
    [dispatch]
  );
  const closeLineup = useCallback<() => void>(
    () => dispatch({ type: "CLOSE_LINEUP" }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openLineup,
      closeLineup,
      openMenu,
      closeMenu,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
