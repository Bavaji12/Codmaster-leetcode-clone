const Problem = require("../models/Problem");

const getProblems = async (req, res) => {
  try {
    const { difficulty, search, category } = req.query;

    const filter = {
      isPublished: true
    };

    if (difficulty && ["Easy", "Medium", "Hard"].includes(difficulty)) {
      filter.difficulty = difficulty;
    }

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { topics: { $regex: search, $options: "i" } }
      ];
    }

    const problems = await Problem.find(filter)
      .select(
        "title slug difficulty category topics acceptanceRate totalSubmissions"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: problems.length,
      problems
    });
  } catch (error) {
    console.error("Get problems error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch problems"
    });
  }
};

const getProblemBySlug = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      slug: req.params.slug,
      isPublished: true
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found"
      });
    }

    res.json({
      success: true,
      problem
    });
  } catch (error) {
    console.error("Get problem error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch problem"
    });
  }
};

const createProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem
    });
  } catch (error) {
    console.error("Create problem error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create problem"
    });
  }
};

module.exports = {
  getProblems,
  getProblemBySlug,
  createProblem
};
