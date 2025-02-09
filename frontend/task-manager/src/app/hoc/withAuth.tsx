import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if ( !user) {
        router.replace("/login");
      }
    }, [user, router]);


    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
