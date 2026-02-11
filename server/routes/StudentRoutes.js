const express = require("express");
const router = express.Router();

const StudentData = require("../models/StudentData");

/* ================= GET / CREATE STUDENT ================= */
router.get("/:userId", async (req, res) => {

  let data = await StudentData.findOne({
    userId: req.params.userId
  });

  if (!data) {
    data = await StudentData.create({
      userId: req.params.userId,
      courses: [],
      goals: []
    });
  }

  res.json(data);
});

/* ================= ADD GOAL ================= */
router.post("/goal/:userId", async (req, res) => {
  const data = await StudentData.findOne({ userId: req.params.userId });
  data.goals.push(req.body);
  await data.save();
  res.json(data);
});

/* ================= UPDATE COURSES ================= */
router.put("/courses/:userId", async (req, res) => {
  const data = await StudentData.findOne({ userId: req.params.userId });
  data.courses = req.body;
  await data.save();
  res.json(data);
});

/* ================= UPDATE GOALS ================= */
router.put("/updateGoals/:userId", async (req, res) => {
  const data = await StudentData.findOne({ userId: req.params.userId });
  data.goals = req.body;
  await data.save();
  res.json(data);
});

module.exports = router;
