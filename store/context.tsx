import {
  useEffect,
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";

interface IContext {
  canvasState: boolean;
  setCanvasState: (value: boolean) => void;
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
}

const LoadedContext = createContext<IContext>({
  canvasState: true,
  isLoaded: false,
  setLoaded: () => null,
  setCanvasState: () => null,
});

export const ContextProvider: React.FC<{}> = (props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [canvasState, setCanvasState] = useState<boolean>(true);
  const canvasHandler = () => setIsLoaded(true);

  const value: IContext = {
    canvasState,
    isLoaded,
    setLoaded: setIsLoaded,
    setCanvasState,
  };

  return (
    <LoadedContext.Provider value={value}>
      {props.children}
    </LoadedContext.Provider>
  );
};

export function useLoaded() {
  return useContext(LoadedContext);
}
