import {
  useEffect,
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";

interface IContext {
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
}

const LoadedContext = createContext<IContext>({
  isLoaded: false,
  setLoaded: () => null,
});

export const ContextProvider: React.FC<{}> = (props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isLoadedHandler = () => setIsLoaded(true);

  const authValue: IContext = {
    isLoaded,
    setLoaded: setIsLoaded,
  };

  return (
    <LoadedContext.Provider value={authValue}>
      {props.children}
    </LoadedContext.Provider>
  );
};

export function useLoaded() {
  return useContext(LoadedContext);
}
