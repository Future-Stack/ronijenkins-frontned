import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { toast } from "react-toastify";
import { Eye, EyeOff, Hash, Lock } from "lucide-react";
import { useResetPasswordMutation } from "../redux/features/auth/authAPi";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data passed from the previous step (Forgot Password / OTP sent screen)
  const email = (location.state as any)?.email || "";
  const initialOtp = (location.state as any)?.code || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // State managed to match API structure
  const [otp, setOtp] = useState(initialOtp);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); 

  const handleReset = async () => {
    // 1. Validation Logic
    if (!otp || !password || !confirm) {
      toast.error("All fields (OTP and Passwords) are required.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // 2. Call Mutation with mapped keys: newPass, email, otp
      const res = await resetPassword({
        newPass: password,
        email: email,
        otp: otp,
      }).unwrap();

      // Based on your screenshot, success returns 'true'
      if (res === true) {
        toast.success("Password reset successfully!");
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to reset password. Check your OTP.");
      console.log(err)
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-[12px] md:rounded-[3rem] border border-stone-100 shadow-sm p-4 md:p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-titleColor text-2xl md:text-[30px] font-extrabold">
            New Credentials
          </h2>
          <p className="text-subTitleColor text-sm font-medium">
            Resetting password for <span className="text-[#845E84] font-bold">{email}</span>
          </p>
        </div>

        <div className="space-y-4">
          {/* OTP Input Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block ml-1">
              Reset Code (OTP)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400">
                <Hash size={18} />
              </span>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-borderColor bg-[#F9F7F5] text-stone-600 font-bold tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-[#845E84]/10 focus:border-[#845E84] transition-all"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block ml-1">
              New Password
            </label>
            <div className="relative">
               <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 rounded-2xl border border-borderColor bg-[#F9F7F5] text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#845E84]/10 focus:border-[#845E84] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block ml-1">
              Confirm New Password
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400">
                <Lock size={18} />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-4 rounded-2xl border bg-[#F9F7F5] text-stone-600 font-medium focus:outline-none transition-all ${
                  confirm && password !== confirm 
                    ? "border-red-300 ring-2 ring-red-50" 
                    : "border-borderColor focus:ring-2 focus:ring-[#845E84]/10 focus:border-[#845E84]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirm && password !== confirm && (
              <p className="text-red-500 text-[11px] font-bold ml-1 animate-pulse">
                Passwords do not match!
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={isLoading || !password || password !== confirm}
          className="w-full py-5 rounded-2xl bg-[#845E84] text-white font-black uppercase tracking-widest text-sm shadow-lg shadow-[#845E84]/20 hover:bg-[#6d4d6d] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
        >
          {isLoading ? "Updating Security..." : "Reset Password"}
        </button>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;









// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AuthLayout from "./AuthLayout";
// import { toast } from "react-toastify";

// import { Eye, EyeOff } from "lucide-react";
// import { useResetPasswordMutation } from "../redux/features/auth/authAPi";

// const ResetPasswordPage: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const email = (location.state as any)?.email || "";
//   const token = (location.state as any)?.code || "";

//   const [resetPassword, { isLoading }] = useResetPasswordMutation();

//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleReset = async () => {
//     if (!password || !confirm) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters.");
//       return;
//     }

//     if (password !== confirm) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     if (!token) {
//       toast.error("Reset token missing. Please restart the process.");
//       navigate("/forgot-password");
//       return;
//     }

//     try {
//       const res = await resetPassword({
//         newPass: password,
//         // token: token,
//           email: email,   // from location.state
//   otp: token,
//       }).unwrap();

//       if (res === true) {
//         toast.success("Password reset successful! Please log in.");
//         navigate("/login");
//       } else {
//         toast.error("Failed to reset password. Please try again.");
//       }
//     } catch (err: any) {
//       console.log(err)
//       toast.error(
//         err?.message ||
//           err?.data?.errors?.[0]?.message ||
//           "Something went wrong."
//       );
//     }
//   };

//   return (
//     <AuthLayout>
//       <div className="bg-white rounded-[12px] md:rounded-[3rem] border border-stone-100 shadow-sm p-4 md:p-8 space-y-6">
//         <h2 className="text-titleColor text-2xl md:text-[30px] font-extrabold">
//           Reset Password
//         </h2>
//         <p className="text-subTitleColor text-sm font-medium">
//           Enter a new password for{" "}
//           <span className="font-bold">{email}</span>.
//         </p>

//         {/* New Password */}
//         <div className="space-y-2">
//           <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block ml-1">
//             New Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter new password"
//               className="w-full px-6 py-4 rounded-2xl border border-borderColor bg-[#F9F7F5] text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#845E84]/10 focus:border-[#845E84] transition-all pr-12"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>

//         {/* Confirm Password */}
//         <div className="space-y-2">
//           <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block ml-1">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               type={showConfirm ? "text" : "password"}
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               placeholder="Confirm new password"
//               className="w-full px-6 py-4 rounded-2xl border border-borderColor bg-[#F9F7F5] text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#845E84]/10 focus:border-[#845E84] transition-all pr-12"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirm((prev) => !prev)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
//             >
//               {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* Mismatch warning */}
//           {confirm && password !== confirm && (
//             <p className="text-red-400 text-xs ml-1 mt-1">
//               Passwords do not match.
//             </p>
//           )}
//         </div>

//         <button
//           onClick={handleReset}
//           disabled={isLoading}
//           className="w-full py-5 rounded-2xl bg-[#845E84] text-white font-black uppercase tracking-widest text-sm shadow-lg shadow-[#845E84]/20 hover:bg-[#6d4d6d] transition-all disabled:opacity-50 cursor-pointer"
//         >
//           {isLoading ? "Resetting..." : "Reset Password"}
//         </button>
//       </div>
//     </AuthLayout>
//   );
// };

// export default ResetPasswordPage;





// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AuthLayout from './AuthLayout';

// const ResetPasswordPage: React.FC = () => {
//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = (location.state as any)?.email || '';

//   const handleReset = () => {
//     // এখানে API call করে password reset হবে
//     alert(`Password reset for ${email} successful!`);
//     navigate('/');
//   };

//   return (
//     <AuthLayout>
//       <div className="bg-white rounded-[3rem] border border-stone-100 shadow-sm p-6 md:p-8 space-y-6">
//         <h2 className="text-titleColor text-2xl md:text-[30px] font-extrabold">
//           Reset Password
//         </h2>
//         <p className="text-subTitleColor text-sm font-medium">
//           Enter a new password for <span className="font-bold">{email}</span>.
//         </p>

//         <div className="space-y-4">
//           <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block ml-1">
//             New Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="New Password"
//             className="w-full px-6 py-4 rounded-2xl border border-borderColor bg-[#F9F7F5] text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#845E84]/10 focus:border-[#845E84] transition-all"
//           />
//         </div>

//         <div className="space-y-4">
//           <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block ml-1">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//             placeholder="Confirm Password"
//             className="w-full px-6 py-4 rounded-2xl border border-borderColor bg-[#F9F7F5] text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#845E84]/10 focus:border-[#845E84] transition-all"
//           />
//         </div>

//         <button
//           onClick={handleReset}
//           className="w-full py-5 rounded-2xl bg-[#845E84] text-white font-black uppercase tracking-widest cursor-pointer text-sm shadow-lg shadow-[#845E84]/20 hover:bg-[#6d4d6d] transition-all"
//         >
//           Reset Password
//         </button>
//       </div>
//     </AuthLayout>
//   );
// };

// export default ResetPasswordPage;