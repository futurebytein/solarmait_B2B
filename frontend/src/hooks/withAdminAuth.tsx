import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
// Define the HOC using function syntax to support generics properly
function withAdminAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const { user, logout, loading } = useAuth();
    // const { user, loading, loggedOut } = useCurrentUser();

    useEffect(() => {
      // console.log("user at the time of admin", user?.role);
      if (loading) return;

      if (!loading) {
        if (!user || (user && !["admin", "vendor"].includes(user.role))) {
          logout();
        }
      }
    }, [user, loading, logout, router]);

    // if (loading || loggedOut) {
    //   return <div>Loading...</div>; // Or a proper loading spinner
    // }

    if (user && ["admin", "vendor"].includes(user.role)) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return ComponentWithAuth;
}

export default withAdminAuth;
