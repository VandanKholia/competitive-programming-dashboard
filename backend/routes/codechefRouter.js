// codechefRouter.js
import express from 'express';
import { JSDOM } from 'jsdom';
const router = express.Router();
import fecher from '../controller/codechefController.js';

router.get("/handle/:handle", async (req, res) => {
  try {
    if (req.params.handle === "favicon.ico")
      return res.send({ success: false, error: "invalid handle" });

    let resd = await fecher(req.params.handle);
    while (resd.status === 429) {
      for (let i = 0; i < 1000000; i++) {}
      resd = await fecher(req.params.handle);
    }
    res.send(resd);
  } catch (err) {
    res.send({ success: false, error: err });
  }
});

export default router;
