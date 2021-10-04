import express from "express"

import healthRouter from "./healthRouter"
// Don't forget to import new routers above

const router = express.Router()

router.use("/health", healthRouter)
router.use("/game", gameRouter)
// Add new routers above

export default router
