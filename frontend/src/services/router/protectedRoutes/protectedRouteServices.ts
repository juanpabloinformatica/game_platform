// import Cookies from "js-cookie";
// const cookieName = "token";
// const generateAccessTokenEndpoint = "http://localhost:3000/generateaccesstoken";
// const validateAccessTokenEndpoint = "http://localhost:3000/validateaccesstoken";
// // function handleCookies() {
// //
// // }
// function getCookieToken() {
//   let token = Cookies.get(cookieName);
//   if (!token) {
//     return null;
//   }
//   return token;
// }
// async function validateTokenRequest(token: string) {
//   try {
//     const response = await fetch(validateAccessTokenEndpoint, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ token: token }),
//     });
//     if (response.ok) {
//       let data = await response.json();
//       if (data.validToken) {
//         return true;
//       } else {
//         return true;
//       }
//     }
//   } catch (error) {
//     console.log("error at validating accessToken");
//   }
// }
// async function sendGenerateAccessToken(userId) {
//   try {
//     const response = await fetch(generateAccessTokenEndpoint, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: userId }),
//     });
//     if (response.ok) {
//       console.log(response);
//       return true;
//     }
//   } catch (error) {
//     console.log("error at validating accessToken");
//   }
// }
// function removeToken(){
//     
// }
//
// async function handleToken(idle = false, userId) {
//   try {
//     let token = getCookieToken();
//     if (!token) {
//       if (!idle) {
//         sendGenerateAccessToken(userId);
//         token = getCookieToken();
//       } else {
//           console.log("here in handleToken")
//           return false;
//       }
//     }
//     console.log("helloooo")
//     return await validateTokenRequest(token);
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }
// // function handleUserPersitance(idle, userId) {
// //
// // }
// // export { handleUserPersitance };
// export { handleToken };
