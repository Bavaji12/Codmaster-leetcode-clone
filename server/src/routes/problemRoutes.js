const express = require("express");

const {
  getProblems,
  getProblemBySlug,
  createProblem
} = require("../controllers/problemController");

const router = express.Router();

router.get("/", getProblems);

router.get("/:slug", getProblemBySlug);

router.post("/", createProblem);

module.exports = router;
