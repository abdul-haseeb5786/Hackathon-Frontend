// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router';

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', formData);
//       navigate('/login'); // Redirect to login after successful signup
//     } catch (error) {
//       setError('Error signing up, please try again');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#F4EDD3]">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-[#4C585B] text-center mb-6">Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Full Name"
//               required
//               className="w-full px-4 py-3 border border-[#A5BFCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E99A3]"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               required
//               className="w-full px-4 py-3 border border-[#A5BFCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E99A3]"
//             />
//           </div>
//           <div className="mb-6">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//               className="w-full px-4 py-3 border border-[#A5BFCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E99A3]"
//             />
//           </div>
//           <div className="mb-4">
//             <button
//               type="submit"
//               className="w-full px-4 py-3 bg-[#4C585B] text-white font-semibold rounded-lg hover:bg-[#7E99A3] focus:outline-none focus:ring-2 focus:ring-[#A5BFCC]"
//             >
//               Signup
//             </button>
//           </div>
//         </form>
//         {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         <p className="text-center text-[#7E99A3] mt-4">
//           Already have an account?{' '}
//           <a href="/login" className="text-[#4C585B] hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
