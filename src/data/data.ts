export const branches = [
    {
      id: "AI/ML",
      name: "AI/ML",
      fullName: "Artificial Intelligence & Machine Learning",
      icon: "Brain",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      description: "Explore the future of intelligent systems and automated learning algorithms."
    },
    {
      id: "CSE",
      name: "CSE", 
      fullName: "Computer Science Engineering",
      icon: "Cpu",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200", 
      textColor: "text-blue-700",
      description: "Master programming, algorithms, and software development fundamentals."
    },
    {
      id: "ECE",
      name: "ECE",
      fullName: "Electronics & Communication Engineering", 
      icon: "Radio",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      description: "Dive deep into electronics, communication systems, and signal processing."
    },
    {
      id: "EEE",
      name: "EEE",
      fullName: "Electrical & Electronics Engineering",
      icon: "Zap"   ,
      color: "from-orange-500 to-red-500", 
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      description: "Power systems, control engineering, and electrical machine fundamentals."
    }
  ];

  export const branchMap = {
    "AI/ML": {
      name: "AI/ML",
      fullName: "Artificial Intelligence & Machine Learning",
      color: "from-purple-500 to-pink-500",
    },
    "CSE": {
      name: "CSE",
      fullName: "Computer Science Engineering",
      color: "from-blue-500 to-cyan-500",
    },
    "ECE": {
      name: "ECE",
      fullName: "Electronics & Communication Engineering",
      color: "from-green-500 to-emerald-500",
    },
    "EEE": {
      name: "EEE",
      fullName: "Electrical & Electronics Engineering",
      color: "from-orange-500 to-red-500",
    },
  };

  export const semesters = [
    { number: 1, year: "1st Year", subjects: ["Engineering Mathematics-I", "Engineering Physics", "Engineering Chemistry", "Programming in C", "Engineering Graphics"] },
    { number: 2, year: "1st Year", subjects: ["Engineering Mathematics-II", "Engineering Physics-II", "Engineering Chemistry-II", "Data Structures", "Digital Logic Design"] },
    { number: 3, year: "2nd Year", subjects: ["Engineering Mathematics-III", "Discrete Mathematics", "Computer Organization", "Database Management", "Object Oriented Programming"] },
    { number: 4, year: "2nd Year", subjects: ["Engineering Mathematics-IV", "Theory of Computation", "Computer Networks", "Operating Systems", "Software Engineering"] },
    { number: 5, year: "3rd Year", subjects: ["Machine Learning", "Compiler Design", "Web Technologies", "Mobile Computing", "Information Security"] },
    { number: 6, year: "3rd Year", subjects: ["Artificial Intelligence", "Cloud Computing", "Big Data Analytics", "Internet of Things", "Project Management"] },
    { number: 7, year: "4th Year", subjects: ["Advanced Algorithms", "Distributed Systems", "Blockchain Technology", "Deep Learning", "Research Methodology"] },
    { number: 8, year: "4th Year", subjects: ["Industry Internship", "Major Project", "Professional Ethics", "Entrepreneurship", "Seminar"] },
  ]


  export  const subjectMap = {
    "AI/ML": {
      1: [
        { name: "Engineering Mathematics-I", code: "MA101", questions: 45 },
        { name: "Engineering Physics", code: "PH101", questions: 38 },
      ],
      5: [
        { name: "Machine Learning", code: "AI301", questions: 85 },
        { name: "Artificial Intelligence", code: "AI302", questions: 78 },
      ],
    },
    "CSE": {
      1: [
        { name: "Data Structures", code: "CS102", questions: 65 },
        { name: "Digital Logic", code: "EC102", questions: 44 },
      ],
    },
  };

  export type Question = {
  id: number;
  unit: number;
  text: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  repeat_count: number;
  youtube_url?: string | null;
};

export const questionsByBranch: Record<string, Question[]> = {
  "AI/ML": [
    {
      id: 101,
      unit: 1,
      text: "Explain the difference between supervised and unsupervised learning.",
      answer: "Supervised learning uses labeled data to train models; unsupervised learning finds structure in unlabeled data (clustering, dimensionality reduction).",
      difficulty: "easy",
      repeat_count: 3,
      youtube_url: "https://www.youtube.com/watch?v=ukzFI9rgwfU"
    },
    {
      id: 102,
      unit: 2,
      text: "What is overfitting and how can it be prevented?",
      answer: "Overfitting occurs when a model fits training noise. Prevent using cross-validation, regularization (L1/L2), dropout, simpler models, more data.",
      difficulty: "medium",
      repeat_count: 5,
      youtube_url: "https://www.youtube.com/watch?v=PYJ3v3ejmGc"
    }
  ],
  "CSE": [
    {
      id: 201,
      unit: 1,
      text: "Explain stack vs queue data structures.",
      answer: "Stack: LIFO - push/pop. Queue: FIFO - enqueue/dequeue. Use stack for recursion/backtracking, queue for BFS and buffering.",
      difficulty: "easy",
      repeat_count: 2,
      youtube_url: "https://www.youtube.com/watch?v=wjI1WNcIntg"
    },
    {
      id: 202,
      unit: 4,
      text: "Describe time complexity of quicksort in average and worst case.",
      answer: "Average: O(n log n) using good pivots; Worst: O(n^2) with bad pivots (e.g., already sorted without randomized pivot).",
      difficulty: "medium",
      repeat_count: 4,
      youtube_url: "https://www.youtube.com/watch?v=SLauY6PpjW4"
    }
  ],
  "ECE": [
    {
      id: 301,
      unit: 2,
      text: "What is modulation and why is it required?",
      answer: "Modulation varies a carrier to transmit info; it allows frequency-division multiplexing, reduces antenna size, and improves SNR for long-distance comms.",
      difficulty: "medium",
      repeat_count: 4,
      youtube_url: "https://www.youtube.com/watch?v=8L_wg4t1WnI"
    }
  ],
  "EE": [
    {
      id: 401,
      unit: 3,
      text: "Explain working principle of a transformer.",
      answer: "Transformer uses electromagnetic induction; alternating current in primary produces changing flux that induces voltage in secondary, transferring power.",
      difficulty: "hard",
      repeat_count: 6,
      youtube_url: "https://www.youtube.com/watch?v=V2zKP3YxJDU"
    }
  ]
}; 