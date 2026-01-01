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



// src/utils/router.jsx - FIXED VERSION
import React, { useState, useEffect, useMemo } from "react";

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // OPTIMIZED: Only evaluate routes when path changes
  const activeRoute = useMemo(() => {
    for (const child of React.Children.toArray(children)) {
      if (!React.isValidElement(child)) continue;
      
      const { path } = child.props;
      const normalizedPath = path?.replace(/\/$/, '') || '';
      const normalizedCurrent = currentPath.replace(/\/$/, '');

      // Exact match (highest priority)
      if (normalizedCurrent === normalizedPath) {
        return React.cloneElement(child, { currentPath });
      }

      // Dynamic route support
      if (normalizedPath.includes(":")) {
        const pathParts = normalizedPath.split("/").filter(Boolean);
        const currentParts = normalizedCurrent.split("/").filter(Boolean);

        if (pathParts.length === currentParts.length) {
          const params = {};
          const isMatch = pathParts.every((part, index) => {
            if (part.startsWith(":")) {
              params[part.slice(1)] = currentParts[index];
              return true;
            }
            return part === currentParts[index];
          });

          if (isMatch) {
            return React.cloneElement(child, { currentPath, params });
          }
        }
      }
    }
    return null;
  }, [currentPath, children]);

  return activeRoute;
};

export const Route = ({ element, currentPath, params }) => {
  // Simply render the element with params if provided
  return params ? React.cloneElement(element, { params }) : element;
};

export const useNavigate = () => {
  return (to) => {
    // Prevent navigation to same path
    if (window.location.pathname === to) return;
    
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
};