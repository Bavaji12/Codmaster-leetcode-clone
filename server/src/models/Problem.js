const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true
    },

    category: {
      type: String,
      default: "Algorithms"
    },

    topics: {
      type: [String],
      default: []
    },

    examples: {
      type: [
        {
          input: String,
          output: String,
          explanation: String
        }
      ],
      default: []
    },

    constraints: {
      type: [String],
      default: []
    },

    starterCode: {
      javascript: {
        type: String,
        default: ""
      },
      python: {
        type: String,
        default: ""
      },
      java: {
        type: String,
        default: ""
      },
      cpp: {
        type: String,
        default: ""
      }
    },

    solution: {
      javascript: {
        type: String,
        default: ""
      },
      python: {
        type: String,
        default: ""
      },
      java: {
        type: String,
        default: ""
      },
      cpp: {
        type: String,
        default: ""
      }
    },

    testCases: {
      type: [
        {
          input: String,
          expectedOutput: String
        }
      ],
      default: []
    },

    acceptanceRate: {
      type: Number,
      default: 0
    },

    totalSubmissions: {
      type: Number,
      default: 0
    },

    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Problem", problemSchema);
