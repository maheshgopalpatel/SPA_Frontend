// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { User, Lock, Mail, Phone, UserPlus } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { useAuth } from '@/contexts/AuthContext'; // ✅ added

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { login } = useAuth(); // ✅ use login function from context

//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [signupForm, setSignupForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ LOGIN HANDLER (uses context-based login)
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const { email, password } = loginForm;

//     if (email === 'admin@abspa.com' && password === 'admin123') {
//       toast({ title: "Login successful!", description: "Welcome Admin!" });
//       login("admin"); // save role in context + localStorage
//       onClose();
//       setTimeout(() => navigate('/admin'), 800);
//     }
//     else if (email === 'staff@abspa.com' && password === 'staff123') {
//       toast({ title: "Login successful!", description: "Welcome Staff!" });
//       login("staff");
//       onClose();
//       setTimeout(() => navigate('/staff'), 800);
//     }
//     else if (email === 'customer@abspa.com' && password === 'customer123') {
//       toast({ title: "Login successful!", description: "Welcome Customer!" });
//       login("customer");
//       onClose();
//       setTimeout(() => navigate('/customer'), 800);
//     }
//     else {
//       toast({
//         title: "Login failed",
//         description: "Invalid email or password. Try demo credentials.",
//         variant: "destructive",
//       });
//     }

//     setIsLoading(false);
//   };

//   // ✅ SIGNUP HANDLER
//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const { name, email, phone, password, confirmPassword } = signupForm;

//     if (!name || !email || !phone || !password) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill all fields",
//         variant: "destructive",
//       });
//       setIsLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast({
//         title: "Validation Error",
//         description: "Passwords do not match",
//         variant: "destructive",
//       });
//       setIsLoading(false);
//       return;
//     }

//     toast({
//       title: "Account created!",
//       description: "Your account has been created successfully. You can now login.",
//     });

//     setSignupForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
//     setIsLoading(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md bg-gradient-card border-0 shadow-strong">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-center text-foreground">
//             Welcome to AB Spa
//           </DialogTitle>
//         </DialogHeader>

//         <Tabs defaultValue="login" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-6">
//             <TabsTrigger value="login" className="flex items-center gap-2">
//               <User className="w-4 h-4" />
//               Login
//             </TabsTrigger>
//             <TabsTrigger value="signup" className="flex items-center gap-2">
//               <UserPlus className="w-4 h-4" />
//               Sign Up
//             </TabsTrigger>
//           </TabsList>

//           {/* ---------------- LOGIN TAB ---------------- */}
//           <TabsContent value="login">
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     className="pl-10"
//                     value={loginForm.email}
//                     onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="Enter your password"
//                     className="pl-10"
//                     value={loginForm.password}
//                     onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-amber-600 hover:opacity-90"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Signing in...' : 'Login'}
//               </Button>

//               <div className="text-center space-y-2">
//                 <button type="button" className="text-sm text-primary hover:underline">
//                   Forgot Password?
//                 </button>

//                 <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg">
//                   <p className="font-semibold mb-1">Demo Credentials:</p>
//                   <p>Admin: admin@abspa.com / admin123</p>
//                   <p>Staff: staff@abspa.com / staff123</p>
//                   <p>Customer: customer@abspa.com / customer123</p>
//                 </div>
//               </div>
//             </form>
//           </TabsContent>

//           {/* ---------------- SIGNUP TAB ---------------- */}
//           <TabsContent value="signup">
//             <form onSubmit={handleSignup} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="name"
//                     placeholder="Enter your full name"
//                     className="pl-10"
//                     value={signupForm.name}
//                     onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="signup-email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="signup-email"
//                     type="email"
//                     placeholder="Enter your email"
//                     className="pl-10"
//                     value={signupForm.email}
//                     onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="Enter your phone number"
//                     className="pl-10"
//                     value={signupForm.phone}
//                     onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="signup-password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="signup-password"
//                     type="password"
//                     placeholder="Create a password"
//                     className="pl-10"
//                     value={signupForm.password}
//                     onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="confirm-password">Confirm Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="confirm-password"
//                     type="password"
//                     placeholder="Confirm your password"
//                     className="pl-10"
//                     value={signupForm.confirmPassword}
//                     onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-amber-600 hover:opacity-90"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Creating account...' : 'Create Account'}
//               </Button>
//             </form>
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default LoginModal;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Mail, Phone, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import CryptoJS from "crypto-js";
import axios from "axios";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Encrypted passwords (SHA-256)
  const encryptedAdminPassword = CryptoJS.SHA256("Ab#Spa&136").toString();
  const encryptedStaffPassword = CryptoJS.SHA256("staff123").toString();
  const encryptedCustomerPassword = CryptoJS.SHA256("customer123").toString();

  // ---------------- LOGIN HANDLER ----------------
  // ---------------- LOGIN HANDLER ----------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = loginForm;

    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Call backend

      const res = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      });

      const { token, msg, user } = res.data;
      localStorage.setItem("userId", user.id);
      // Store token locally (optional)
      localStorage.setItem("authToken", token);
      // localStorage.setItem("usermail", email);

      // Decode JWT (optional) if you want to extract role
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role || "user";
      console.log(payload);

      toast({ title: "Login successful!", description: msg });
      login(role); 

      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else if (role === "staff") navigate("/staff");
        else navigate("/customer");
      }, 800);
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.response?.data?.msg || "Invalid username or password.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email, phone, password, confirmPassword } = signupForm;

    if (!name || !email || !phone || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        username: name,
        email,
        phone,
        password,
        role: "user",
      });

      toast({
        title: "Account created!",
        description:
          "Your account has been created successfully. You can now login.",
      });

      setSignupForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast({
        title: "Signup failed",
        description: err.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  // ---------------- RENDER ----------------
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-0 shadow-strong">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Welcome to AB Spa
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <User className="w-4 h-4" /> Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Sign Up
            </TabsTrigger>
            
          </TabsList>

          {/* ---------------- LOGIN TAB ---------------- */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>

              <div className="text-center space-y-2">
                {/* <button type="button" className="text-sm text-primary hover:underline">Forgot Password?</button> */}

                {/* <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg"> */}
                {/* <p className="font-semibold mb-1">Demo Credentials:</p>
                  <p>Admin: admin@abspa.com / Ab#Spa&136</p>
                  <p>Staff: staff@abspa.com / staff123</p>
                  <p>Customer: customer@abspa.com / customer123</p> */}

                <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg">
                  <p>
                    Admin access only. Please keep your credentials secure and
                    do not share them.
                  </p>
                  <p>
                    If you face login issues, contact the system administrator.
                  </p>
                </div>

                {/* </div> */}
              </div>
            </form>
          </TabsContent>

          {/* ---------------- SIGNUP TAB ---------------- */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={signupForm.name}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={signupForm.email}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={signupForm.phone}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-10"
                    value={signupForm.password}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10"
                    value={signupForm.confirmPassword}
                    onChange={(e) =>
                      setSignupForm({
                        ...signupForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
