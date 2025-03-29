"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  cart?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  defaultAddress: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserAndSync: (updatedUser: User) => void;
  setDefaultAddressAndSync: (addressId: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [defaultAddress, setDefaultAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedAddress = localStorage.getItem("defaultAddress");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setDefaultAddress(storedAddress || null);
      }
      setLoading(false);
    }
  }, []);

  const setUserAndSync = (updatedUser: User) => {
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const setDefaultAddressAndSync = (addressId: string | null) => {
    setDefaultAddress(addressId);
    if (typeof window !== "undefined") {
      if (addressId) {
        localStorage.setItem("defaultAddress", addressId);
      } else {
        localStorage.removeItem("defaultAddress");
      }
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/v1/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (data.success) {
      const token = data.token;
      const user = data.user;
      const default_address = data.default_address;

      setToken(token);
      setUserAndSync(user);
      setDefaultAddressAndSync(default_address);

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        Cookies.set("token", token, { expires: 7 });
      }
      setLoading(false);
      router.push("/");
    } else {
      setLoading(false);
      throw new Error(data.message || "Login failed");
    }
  };

  const logout = () => {
    setLoading(true);
    setToken(null);
    setUser(null);
    setDefaultAddress(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("defaultAddress");
      Cookies.remove("token");
    }
    setLoading(false);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        defaultAddress,
        loading,
        login,
        logout,
        setUserAndSync,
        setDefaultAddressAndSync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
