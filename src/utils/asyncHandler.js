// It defines a higher-order function (a function that returns another function) called asyncHandler.
// Its purpose is to wrap asynchronous route handlers (or middleware) in Express 
// so you don’t need to write repetitive try/catch blocks in every route.   <<<<======

const asyncHandler = (requestHandler) => {
   return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}


export { asyncHandler }

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}
 
//    ANOTHER METHOD 
// [[[[[[   

// const asyncHandler =(fn) => async (req, res, next ) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// ]]]]]]