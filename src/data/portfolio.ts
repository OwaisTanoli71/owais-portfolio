export const portfolio = {
  header: {
    name: "Muhammad Owais Arshad",
    title: "AI Engineer | Computer Vision | ML Pipelines | Freelance Designer",
    location: "Abbottabad, Pakistan",
    email: "muhammadowaisarshad721@gmail.com",
    links: [
      { name: "LinkedIn", url: "https://linkedin.com/in/muhammad-owais-b66353391" },
      { name: "Behance", url: "https://www.behance.net/gallery/242522555/The-Creative-Edge-of-Owais" }
    ]
  },
  about: "I am a BS Artificial Intelligence student at PAF-IAST, building end-to-end AI systems with a focus on Computer Vision, Machine Learning, and Workflow Automation. My work ranges from medical imaging pipelines and automated recruitment systems to classical regression and classification models, all documented, reproducible, and built to solve real problems. Alongside technical work, I bring 2+ years of freelance graphic design experience, giving me a practical edge in visual communication and professional presentation.",
  interests: [
    { name: "Computer Vision", description: "Object detection and segmentation using YOLOv11 and SAM2 for medical imaging applications" },
    { name: "Machine Learning", description: "Classification, regression, and deep learning pipelines with Scikit-learn and TensorFlow/Keras" },
    { name: "AI Automation", description: "Agentic workflow systems using n8n, GPT-4, and Google Workspace APIs" },
    { name: "Data Science", description: "EDA, feature engineering, and visualization with Pandas, Seaborn, and Matplotlib" },
    { name: "Embedded AI", description: "Sensor-based safety systems using Arduino and C++ firmware" }
  ],
  projects: [
    {
      title: "Deadlock Detection & Recovery Simulator",
      description: "Interactive Operating Systems simulator detecting and recovering from deadlocks using 3 classic algorithms and 4 strategies. Features a live animated Resource Allocation Graph.",
      link: "https://github.com/OwaisTanoli71/Deadlock-Simulator",
      image: "/assets/deadlock.png"
    },
    {
      title: "Smart Hostel Management System",
      description: "Full-stack PHP & MySQL hostel management system with dual-role portals for Admin & Student. Features room allocation, fee tracking, complaint management, and notifications.",
      link: "https://github.com/OwaisTanoli71/Hostel-Management-System",
      image: "/assets/hostel maangement system.png"
    },
    {
      title: "AI HR Screening Agent",
      description: "3-workflow end-to-end recruitment automation using n8n, GPT-4, and Google APIs for candidate CV screening to interview booking in under 90 seconds, with zero human involvement. IEEE paper published.",
      link: "https://github.com/OwaisTanoli71/ai-hr-screening-agent",
      image: "/assets/ai hr screening agent.png"
    },
    {
      title: "maxN · 3-Player Game Tree Simulator",
      description: "Full-stack Python/Flask web app for visualising 3-player Minimax and Alpha-Beta Pruning with a complete alliance system. Features glassmorphic UI and 6 built-in examples.",
      link: "https://maxn-simulator.vercel.app",
      image: "/assets/maxn3.png"
    },
    {
      title: "Brain Tumor Segmentation (YOLOv11 + SAM2)",
      description: "Medical imaging pipeline detecting Glioma, Meningioma, and Pituitary tumors from MRI scans with 95%+ accuracy. Deployed via Streamlit dashboard.",
      link: "https://github.com/OwaisTanoli71/Brain-Tumor-Segmentation-Using-Yolo11-SAM2",
      image: "/assets/brain-tumor-scan.jpg"
    },
    {
      title: "MNIST Handwritten Digit Classifier",
      description: "97%+ accuracy digit recognition using SGD and Random Forest with detailed error analysis and visualizations.",
      link: "https://github.com/OwaisTanoli71/MNIST-Classifier",
      image: "/assets/minist dgit.png"
    },
  ],
  skills: [
    { category: "Languages", items: ["Python", "C++", "PHP", "MySQL", "HTML & CSS"] },
    { category: "AI / ML", items: ["TensorFlow", "Keras", "Scikit-learn", "OpenCV", "NumPy", "Pandas", "Matplotlib", "Seaborn"] },
    { category: "Computer Vision", items: ["YOLOv11", "SAM2", "image preprocessing", "segmentation pipelines"] },
    { category: "Automation", items: ["n8n", "GPT-4 API", "Google Workspace APIs"] },
    { category: "Web Development", items: ["Flask", "PHP 8", "PDO", "Jinja2", "REST APIs"] },
    { category: "Tools", items: ["Jupyter Notebook", "Google Colab", "Docker", "Git/GitHub", "Streamlit", "Vercel"] },
    { category: "Design", items: ["Adobe Photoshop", "Adobe Illustrator", "branding", "identity systems"] }
  ],
  experience: [
    {
      title: "Director of Graphic Design",
      company: "PAMUN '26, PAF-IAST",
      location: "Haripur, Pakistan",
      date: "JAN 2026 – FEB 2026",
      type: "Leadership",
      description: "Spearheaded visual branding strategy for PAMUN '26, delivering high-impact promotional assets and campus branding.",
      highlights: [
        "Delivered a comprehensive suite of promotional assets including posters, banners, and social media campaigns.",
        "Designed and produced 20+ high-fidelity standees serving as key campus wayfinding and event branding elements.",
        "Executed multi-channel design plan producing tailored Instagram content boosting event engagement.",
        "Maintained strict brand identity cohesion across print and digital media in coordination with event logistics."
      ]
    },
    {
      title: "Graphic Design Intern",
      company: "NextGen Learners",
      location: "Islamabad, Pakistan",
      date: "JUL 2025",
      type: "Remote Internship",
      description: "Created complete brand identity packages, flat vector illustrations, and marketing collateral.",
      highlights: [
        "Developed full branding packages: logos, business cards, standees, social media templates, and typography guidelines.",
        "Designed clean, scalable logos for fictional and real brands with consistent brand-aligned visuals.",
        "Produced flat vector illustrations, creative posters, and photo editing (retouching, color adjustment) in Illustrator & Photoshop."
      ]
    },
    {
      title: "Machine Learning Intern",
      company: "Arch Technologies",
      location: "Islamabad, Pakistan",
      date: "JUN 2025 – JUL 2025",
      type: "Remote Internship",
      description: "Developed and deployed end-to-end deep learning & regression pipelines with full EDA workflows.",
      highlights: [
        "Developed & deployed MNIST digit classification models (SGD & Random Forest) achieving 97%+ accuracy through error analysis.",
        "Implemented California Housing Price Prediction deep learning pipelines for real estate dataset analytics.",
        "Engineered Wine Quality Prediction systems applying Linear, Ridge, and Lasso regression with GridSearchCV hyperparameter tuning.",
        "Optimized data workflows by conducting EDA and visualizations using Pandas, Seaborn, and Matplotlib."
      ]
    },
    {
      title: "Freelance Graphic & Web Designer",
      company: "Self-Employed",
      location: "Abbottabad, Pakistan",
      date: "MAR 2023 – PRESENT",
      type: "Self-Employed",
      description: "Building brand identity, digital collateral, and web assets for clients across concurrent engagements.",
      highlights: [
        "Delivered end-to-end client projects spanning brand identity, print collateral, and digital media.",
        "Optimized creative workflows by implementing standardized design systems, reducing turnaround time by 15%.",
        "Strategized and delivered impactful design solutions (logos, thumbnails, illustrations) boosting client brand visibility."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Artificial Intelligence",
      institution: "PAF-IAST (Pak-Austria Fachhochschule)",
      location: "Haripur, Pakistan",
      date: "OCT 2024 – PRESENT",
      description: "Focusing on Computer Vision (YOLOv11, SAM2), Deep Learning, ML pipelines, and Agentic Automation."
    },
    {
      degree: "Intermediate in Computer Science (HSSC)",
      institution: "Tameer-i-Wattan Public School & College",
      location: "Abbottabad, Pakistan",
      date: "APR 2023 – SEP 2024",
      description: "Core Computer Science, Mathematics, and Physics foundation."
    },
    {
      degree: "Matriculation in Science (SSC)",
      institution: "Wisdom House Public School & College",
      location: "Abbottabad, Pakistan",
      date: "MAR 2021 – AUG 2022",
      description: "Science stream matriculation with high distinction."
    }
  ],
  certifications: [
    {
      title: "Getting Started with Microsoft Excel",
      issuer: "Coursera Project Network",
      date: "JUL 2026",
      image: "/assets/Coursera DKZUVABF2351_page-0001.jpg"
    },
    {
      title: "GenAI Job Simulation",
      issuer: "BCG X, via Forage",
      date: "JUN 2026",
      image: "/assets/gabev3vXhuACr48eb_SKZxezskWgmFjRvj9_6a22730672661c5fa042f15c_1780653366883_completion_certificate_page-0001.jpg"
    },
    {
      title: "Director of Graphic Design Certificate",
      issuer: "PAMUN '26, PAF-IAST",
      date: "FEB 2026",
      image: "/assets/PAMUN Director Certificates-13.jpg.jpeg"
    },
    {
      title: "Introduction to Generative AI",
      issuer: "Google Cloud, via Coursera",
      date: "JUN 2025",
      image: "/assets/Coursera FO00LQP9U9MC_page-0001.jpg"
    },
    {
      title: "AI For Everyone",
      issuer: "DeepLearning.AI, via Coursera",
      date: "JUN 2025",
      image: "/assets/Coursera KDJEYHXEBJH8_page-0001.jpg"
    },
    {
      title: "Management and Financial Accounting: Know Your Numbers 1",
      issuer: "Macquarie University, via Coursera",
      date: "JUN 2025",
      image: "/assets/Coursera X325UZZEED2B_page-0001.jpg"
    }
  ]
};
