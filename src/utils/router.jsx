// import React, { useState, useEffect } from "react";

// export const Router = ({ children }) => {
//   const [currentPath, setCurrentPath] = useState(window.location.pathname);

//   useEffect(() => {
//     const handleLocationChange = () => {
//       setCurrentPath(window.location.pathname);
//     };

//     window.addEventListener("popstate", handleLocationChange);
//     return () => window.removeEventListener("popstate", handleLocationChange);
//   }, []);

//   // CRITICAL: Render only the FIRST matching route
//   let matchFound = false;
  
//   return React.Children.map(children, (child) => {
//     if (React.isValidElement(child) && !matchFound) {
//       const clonedChild = React.cloneElement(child, { currentPath });
      
//       // Check if this route will render (not null)
//       if (clonedChild.type({ ...clonedChild.props, currentPath }) !== null) {
//         matchFound = true;
//         return clonedChild;
//       }
//     }
//     return null;
//   });
// };

// export const Route = ({ path, element, currentPath }) => {
//   // Remove trailing slashes for consistent matching
//   const normalizedPath = path.replace(/\/$/, '');
//   const normalizedCurrent = currentPath.replace(/\/$/, '');

//   // exact match (HIGHEST PRIORITY)
//   if (normalizedCurrent === normalizedPath) {
//     return element;
//   }

//   // dynamic route support (LOWER PRIORITY)
//   if (normalizedPath.includes(":")) {
//     const pathParts = normalizedPath.split("/").filter(Boolean);
//     const currentParts = normalizedCurrent.split("/").filter(Boolean);

//     if (pathParts.length !== currentParts.length) return null;

//     const params = {};
//     const isMatch = pathParts.every((part, index) => {
//       if (part.startsWith(":")) {
//         params[part.slice(1)] = currentParts[index];
//         return true;
//       }
//       return part === currentParts[index];
//     });

//     if (isMatch) {
//       return React.cloneElement(element, { params });
//     }
//   }

//   return null;
// };

// export const useNavigate = () => {
//   return (to) => {
//     window.history.pushState({}, "", to);
//     window.dispatchEvent(new PopStateEvent("popstate"));
//   };
// };


import React, { useState, useEffect, useMemo, createContext, useContext } from "react";

// Create context for params and navigation
const RouterContext = createContext({ params: {}, currentPath: '' });

export const useParams = () => {
  const context = useContext(RouterContext);
  return context.params || {};
};

export const useLocation = () => {
  const context = useContext(RouterContext);
  return { pathname: context.currentPath };
};

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [params, setParams] = useState({});

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Memoize route matching to prevent unnecessary re-renders
  const { activeRoute, matchedParams } = useMemo(() => {
    const routes = React.Children.toArray(children);
    
    for (const child of routes) {
      if (!React.isValidElement(child)) continue;
      
      const { path } = child.props;
      const normalizedPath = path?.replace(/\/$/, '') || '';
      const normalizedCurrent = currentPath.replace(/\/$/, '');

      // Exact match (highest priority)
      if (normalizedCurrent === normalizedPath) {
        return { activeRoute: child, matchedParams: {} };
      }

      // Dynamic route support
      if (normalizedPath.includes(":")) {
        const pathParts = normalizedPath.split("/").filter(Boolean);
        const currentParts = normalizedCurrent.split("/").filter(Boolean);

        if (pathParts.length === currentParts.length) {
          const routeParams = {};
          const isMatch = pathParts.every((part, index) => {
            if (part.startsWith(":")) {
              routeParams[part.slice(1)] = currentParts[index];
              return true;
            }
            return part === currentParts[index];
          });

          if (isMatch) {
            return { activeRoute: child, matchedParams: routeParams };
          }
        }
      }
    }
    
    return { activeRoute: null, matchedParams: {} };
  }, [currentPath, children]);

  // Update params when they change
  useEffect(() => {
    setParams(matchedParams);
  }, [matchedParams]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    params,
    currentPath
  }), [params, currentPath]);

  return (
    <RouterContext.Provider value={contextValue}>
      {activeRoute}
    </RouterContext.Provider>
  );
};

export const Route = ({ element }) => {
  // Simply render the element - params are available via useParams hook
  return element;
};

export const useNavigate = () => {
  return useMemo(() => (to) => {
    // Prevent navigation to same path
    if (window.location.pathname === to) return;
    
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);
};