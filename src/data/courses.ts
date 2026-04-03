export type CourseLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

export interface CourseModule {
  title: string;
  lessons: string[];
  duration: string;
}

export interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  level: string;
  levelEn: CourseLevel;
  duration: string;
  image: string;
  students: number;
  rating: number;
  outcomes: string[];
  audience: string;
  isPopular?: boolean;
  pathStep?: number;
  // Detail page extras
  certLevel: 'L1' | 'L2' | 'L3';
  prerequisites: string[];
  tools: string[];
  modules: CourseModule[];
  faq: { q: string; a: string }[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'Python AI 编程基础',
    subtitle: 'Python for AI Development',
    description: '从零开始掌握 Python 在人工智能领域的核心应用，建立扎实的编程与数据处理基础。',
    longDescription:
      '本课程面向零基础学员，系统讲授 Python 语言基础、数据结构、函数式编程，以及在 AI 工程中最常用的 NumPy、Pandas、Matplotlib 工具链。课程以实战项目贯穿，帮助学员在完成课程后具备独立完成数据处理与基础建模任务的能力，是通过 L1 认证的核心备考课程。',
    level: '初级',
    levelEn: 'beginner',
    duration: '12 小时',
    image: 'https://cdn.wegic.ai/assets/onepage/agent/images/1774168249661.jpg?imageMogr2/format/webp',
    students: 15420,
    rating: 4.8,
    outcomes: [
      'Python 核心语法与数据结构',
      'NumPy / Pandas 数据处理',
      'Matplotlib 数据可视化',
      'AI 项目基础工程能力',
      '3 个完整实战项目',
    ],
    audience: '零基础学员 / 转型开发者',
    isPopular: true,
    pathStep: 1,
    certLevel: 'L1',
    prerequisites: ['无需先修要求，有基础编程经验者学习效果更佳'],
    tools: ['Python 3.10+', 'Jupyter Notebook', 'NumPy', 'Pandas', 'Matplotlib'],
    modules: [
      {
        title: 'Python 核心语法',
        duration: '2.5 小时',
        lessons: [
          '变量、数据类型与运算符',
          '控制流：条件与循环',
          '函数定义与作用域',
          '列表、字典、集合操作',
          '文件读写与异常处理',
        ],
      },
      {
        title: 'NumPy 数值计算',
        duration: '2.5 小时',
        lessons: [
          'ndarray 创建与基本操作',
          '数组索引、切片与广播',
          '线性代数基础运算',
          '随机数生成与统计函数',
          '实战：矩阵运算加速案例',
        ],
      },
      {
        title: 'Pandas 数据处理',
        duration: '3 小时',
        lessons: [
          'Series 与 DataFrame 结构',
          '数据读取：CSV / Excel / JSON',
          '数据清洗：缺失值与异常值',
          '分组聚合与数据透视',
          '实战：用户行为数据分析',
        ],
      },
      {
        title: 'AI 项目工程实践',
        duration: '4 小时',
        lessons: [
          'AI 项目目录结构规范',
          '数据集划分与预处理流程',
          '模型训练脚本编写',
          '结果可视化与报告输出',
          '综合实战项目：房价预测',
        ],
      },
    ],
    faq: [
      { q: '完全没有编程基础可以学吗？', a: '可以。课程从最基础的语法讲起，配有详细的环境搭建指南，零基础学员完成课程平均需要 3—4 周。' },
      { q: '学完这门课能参加 L1 认证考试吗？', a: '本课程是 L1 认证的核心备考课，完成课程并通过随堂测试后，建议再配合认证考纲系统复习 1—2 周后报名考试。' },
      { q: '课程内容会更新吗？', a: '是的，课程内容随智谱 AI 平台版本迭代定期更新，已购学员可永久访问最新版本。' },
    ],
  },
  {
    id: 2,
    title: '机器学习核心算法',
    subtitle: 'Machine Learning Fundamentals',
    description: '系统学习监督学习、无监督学习核心算法，掌握模型选择与评估方法，建立完整的 ML 工程能力。',
    longDescription:
      '本课程系统讲解机器学习中最核心的算法体系，涵盖线性模型、树模型、支持向量机、聚类算法等。课程注重理论与工程结合，以 Scikit-learn 为主要工具，通过真实数据集的完整建模流程帮助学员掌握从数据到模型的全链路工程能力，是 L1 认证考试的重点内容之一。',
    level: '中级',
    levelEn: 'intermediate',
    duration: '18 小时',
    image: 'https://cdn.wegic.ai/assets/onepage/agent/images/1774168249726.jpg?imageMogr2/format/webp',
    students: 9830,
    rating: 4.9,
    outcomes: [
      '监督 / 无监督核心算法原理',
      'Scikit-learn 工程实践',
      '模型选择与性能评估',
      '特征工程方法论',
      '2 个完整建模项目',
    ],
    audience: '有 Python 基础的开发者',
    pathStep: 2,
    certLevel: 'L1',
    prerequisites: ['Python 基础（变量、循环、函数）', '基础数学：线性代数、概率统计'],
    tools: ['Python 3.10+', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter Notebook'],
    modules: [
      {
        title: '监督学习基础',
        duration: '5 小时',
        lessons: [
          '线性回归与梯度下降',
          '逻辑回归与分类边界',
          '决策树与信息增益',
          '随机森林与集成方法',
          '支持向量机原理',
        ],
      },
      {
        title: '模型评估与选择',
        duration: '4 小时',
        lessons: [
          '偏差—方差权衡',
          '交叉验证方法',
          '评估指标：AUC / F1 / RMSE',
          '超参数调优：Grid Search',
          '实战：信用风险评估模型',
        ],
      },
      {
        title: '无监督学习',
        duration: '4 小时',
        lessons: [
          'K-Means 聚类算法',
          '层次聚类与 DBSCAN',
          'PCA 主成分分析',
          't-SNE 可视化降维',
          '实战：用户分群分析',
        ],
      },
      {
        title: '特征工程实践',
        duration: '5 小时',
        lessons: [
          '特征选择方法',
          '类别特征编码',
          '数值特征归一化',
          '时间序列特征提取',
          '综合实战：房产价值预测',
        ],
      },
    ],
    faq: [
      { q: '需要提前学 Python 吗？', a: '是的，建议先完成《Python AI 编程基础》课程，或具备相当基础后再学本课程。' },
      { q: '课程中的数学要求高吗？', a: '需要了解基础线性代数和概率统计概念，课程开始时会有简短复习，不需要推导公式。' },
      { q: '与 L1 认证的关系是什么？', a: '本课程覆盖 L1 认证考纲的 40% 内容，建议与 Python 基础课搭配学习备考。' },
    ],
  },
  {
    id: 3,
    title: '自然语言处理入门',
    subtitle: 'NLP Foundations',
    description: '从文本预处理到 Transformer 架构，掌握 NLP 核心技术，具备构建文本理解应用的工程能力。',
    longDescription:
      '本课程从文本数据的基础处理出发，逐步深入词向量、RNN 序列模型，直至当前主流的 Transformer 注意力机制。学员将通过文本分类、情感分析、问答系统等真实项目，掌握 NLP 工程的完整开发流程。本课程是备考 L2 认证的重要基础课程。',
    level: '中级',
    levelEn: 'intermediate',
    duration: '16 小时',
    image: 'https://cdn.wegic.ai/assets/onepage/agent/images/1774168249791.jpg?imageMogr2/format/webp',
    students: 7640,
    rating: 4.7,
    outcomes: [
      '文本预处理与特征工程',
      'Word2Vec / BERT 词向量',
      'Transformer 架构原理',
      '文本分类与情感分析',
      '问答系统基础实现',
    ],
    audience: '机器学习工程师 / 算法研究员',
    pathStep: 3,
    certLevel: 'L2',
    prerequisites: ['机器学习基础', 'Python 中级水平', '基础线性代数与概率论'],
    tools: ['Python 3.10+', 'HuggingFace Transformers', 'PyTorch', 'NLTK', 'spaCy'],
    modules: [
      {
        title: '文本预处理基础',
        duration: '3 小时',
        lessons: [
          '分词、停用词、词干化',
          'TF-IDF 特征表示',
          '正则表达式文本清洗',
          '中文分词工具实践',
          '实战：新闻文本分类',
        ],
      },
      {
        title: '词向量与语义表示',
        duration: '4 小时',
        lessons: [
          'Word2Vec 原理与训练',
          'GloVe 与 FastText',
          '词向量可视化分析',
          '句向量与文档表示',
          '实战：语义相似度计算',
        ],
      },
      {
        title: 'Transformer 架构',
        duration: '5 小时',
        lessons: [
          '注意力机制原理',
          'Multi-Head Attention',
          'BERT 预训练与微调',
          'HuggingFace 实践',
          '实战：情感分析系统',
        ],
      },
      {
        title: 'NLP 应用开发',
        duration: '4 小时',
        lessons: [
          '问答系统架构设计',
          '信息抽取：NER 与关系',
          '文本生成基础',
          '模型部署与 API 封装',
          '综合实战：智能客服 Demo',
        ],
      },
    ],
    faq: [
      { q: '没学过深度学习可以直接学这门课吗？', a: '建议先了解基础神经网络概念，但课程会在 Transformer 部分提供足够的背景知识复习。' },
      { q: '课程使用中文还是英文材料？', a: '讲解以中文为主，代码和技术术语保留英文，数据集中英文均有覆盖。' },
      { q: '与 L2 认证有什么关系？', a: '本课程是 L2 备考的基础课之一，建议搭配《大语言模型应用开发》一起学习。' },
    ],
  },
  {
    id: 4,
    title: '大语言模型应用开发',
    subtitle: 'LLM Application Engineering',
    description: '基于 GLM 系列模型，掌握 Prompt 工程、RAG 架构、Agent 设计，构建生产级 AI 应用。',
    longDescription:
      '本课程以智谱 AI GLM 系列模型为核心，系统讲授大语言模型的工程化应用方法。内容涵盖 Prompt 工程设计、检索增强生成（RAG）架构实现、智能 Agent 设计模式，以及应用的生产级优化。是 L2 Prompt 工程师认证最直接相关的备考课程，也是通往 L3 架构能力的重要衔接。',
    level: '高级',
    levelEn: 'advanced',
    duration: '20 小时',
    image: 'https://cdn.wegic.ai/assets/onepage/agent/images/1774168249845.jpg?imageMogr2/format/webp',
    students: 5210,
    rating: 4.9,
    outcomes: [
      'Prompt 工程设计方法论',
      '链式调用与 Function Calling',
      'RAG 架构与向量数据库',
      'AI Agent 设计与实现',
      '生产级 LLM 应用优化',
    ],
    audience: '有 NLP 基础的高级工程师',
    isPopular: true,
    pathStep: 4,
    certLevel: 'L2',
    prerequisites: ['NLP 基础或同等工程经验', 'Python 中高级水平', 'REST API 调用经验'],
    tools: ['GLM API', 'LangChain', 'Chroma / Faiss', 'FastAPI', 'Python 3.10+'],
    modules: [
      {
        title: 'Prompt 工程基础',
        duration: '4 小时',
        lessons: [
          'LLM 工作原理与局限性',
          '零样本、少样本提示设计',
          '思维链（CoT）与结构化输出',
          '提示词模板工程化管理',
          '实战：内容生成 Prompt 优化',
        ],
      },
      {
        title: '链式调用与工具使用',
        duration: '5 小时',
        lessons: [
          'Function Calling 机制',
          'LangChain Chain 构建',
          '多步骤任务编排',
          '外部工具集成实践',
          '实战：自动化研究助手',
        ],
      },
      {
        title: 'RAG 架构实现',
        duration: '6 小时',
        lessons: [
          '检索增强生成原理',
          '文档切块与向量化策略',
          'Chroma 向量数据库实践',
          '混合检索与重排序',
          '实战：企业知识库问答系统',
        ],
      },
      {
        title: 'AI Agent 设计',
        duration: '5 小时',
        lessons: [
          'ReAct Agent 框架',
          '多 Agent 协作模式',
          '记忆与状态管理',
          '安全边界与输出控制',
          '综合实战：智能任务助手',
        ],
      },
    ],
    faq: [
      { q: '需要有 GLM API 账号吗？', a: '是的，课程实战部分需要调用 GLM API，智谱学习中心学员可申请课程专用免费额度。' },
      { q: '这门课和 L2 认证考试的关系？', a: '本课程覆盖 L2 Prompt 工程师认证的核心考点，是最直接的备考课程。' },
      { q: '完成后能做什么类型的项目？', a: '可以独立开发企业级知识库问答系统、多轮对话机器人、AI 辅助工作流等生产级应用。' },
    ],
  },
  {
    id: 5,
    title: '深度学习实战',
    subtitle: 'Deep Learning in Practice',
    description: '从神经网络基础到 CNN/RNN 架构，结合 PyTorch 框架进行图像识别与序列建模实战。',
    longDescription:
      '本课程以 PyTorch 为主要框架，系统讲解深度学习的核心概念与工程实践。从感知机和反向传播出发，逐步覆盖卷积神经网络（CNN）用于图像识别、循环神经网络（RNN/LSTM）用于序列建模，并结合真实数据集进行完整的训练、调优与评估流程。本课程是 L3 高级认证的重要技术基础。',
    level: '高级',
    levelEn: 'advanced',
    duration: '22 小时',
    image: 'https://cdn.wegic.ai/assets/onepage/agent/images/1774168249916.jpg?imageMogr2/format/webp',
    students: 4380,
    rating: 4.8,
    outcomes: [
      'PyTorch 深度学习框架使用',
      'CNN 图像识别模型构建',
      'RNN/LSTM 序列建模',
      '模型训练技巧与调参方法',
      'GPU 训练与性能优化',
    ],
    audience: '有机器学习基础的算法工程师',
    pathStep: 5,
    certLevel: 'L3',
    prerequisites: ['机器学习基础算法', 'Python 中高级', '线性代数与微积分基础'],
    tools: ['PyTorch 2.x', 'torchvision', 'CUDA（可选）', 'Weights & Biases', 'Jupyter'],
    modules: [
      {
        title: '神经网络基础',
        duration: '4 小时',
        lessons: [
          '感知机与多层网络',
          '激活函数：ReLU / Sigmoid / GELU',
          '反向传播算法推导',
          'PyTorch 张量与自动微分',
          '实战：手写数字识别 MLP',
        ],
      },
      {
        title: '卷积神经网络',
        duration: '6 小时',
        lessons: [
          '卷积操作原理与感受野',
          '经典架构：VGG / ResNet',
          '数据增强策略',
          '迁移学习与 Fine-tuning',
          '实战：图像分类 Top-5 准确率优化',
        ],
      },
      {
        title: 'RNN 与序列建模',
        duration: '6 小时',
        lessons: [
          'RNN 展开与梯度消失问题',
          'LSTM / GRU 门控机制',
          'Seq2Seq 架构',
          '注意力机制引入',
          '实战：时间序列预测',
        ],
      },
      {
        title: '训练优化与工程',
        duration: '6 小时',
        lessons: [
          '优化器：Adam / AdamW / SGD',
          '学习率调度策略',
          '正则化：Dropout / BatchNorm',
          '混合精度训练',
          '综合实战：端到端情感分类系统',
        ],
      },
    ],
    faq: [
      { q: '没有 GPU 能完成这门课吗？', a: '可以，课程实验规模设计在 CPU 可运行范围内，GPU 用于加速可选，课程提供 Colab 配置文件。' },
      { q: '与 L3 认证的关系？', a: '本课程是 L3 架构师认证的技术基础课之一，建议配合《AI 模型部署与工程化》一起备考。' },
      { q: '完成后能应用于哪些方向？', a: '计算机视觉、时间序列分析、NLP 预处理模型等工业方向均可直接应用。' },
    ],
  },
  {
    id: 6,
    title: 'AI 模型部署与工程化',
    subtitle: 'AI Model Deployment',
    description: '掌握模型压缩、量化、服务化部署全流程，具备将 AI 模型推向生产环境的完整工程能力。',
    longDescription:
      '本课程专注于 AI 工程化落地的最后一公里：如何将训练好的模型高效、稳定地部署到生产环境。内容涵盖模型量化与压缩、ONNX 导出、FastAPI 服务封装、Triton 推理服务器、Docker 容器化，以及 MLOps 监控体系。是 L3 AI 解决方案架构师认证的核心备考课程。',
    level: '高级',
    levelEn: 'advanced',
    duration: '14 小时',
    image: 'https://cdn.wegic.ai/assets/onepage/agent/images/1774168249974.jpg?imageMogr2/format/webp',
    students: 3120,
    rating: 4.7,
    outcomes: [
      '模型量化与压缩（INT8 / FP16）',
      'ONNX 跨框架模型导出',
      'FastAPI 推理服务封装',
      'Triton 推理服务器部署',
      'MLOps 监控与模型迭代',
    ],
    audience: '后端工程师 / MLOps 工程师',
    pathStep: 6,
    certLevel: 'L3',
    prerequisites: ['深度学习基础（PyTorch）', 'Linux 命令行与 Docker 基础', 'Python 中高级水平'],
    tools: ['FastAPI', 'Triton Inference Server', 'ONNX Runtime', 'Docker', 'Prometheus'],
    modules: [
      {
        title: '模型优化基础',
        duration: '3 小时',
        lessons: [
          '模型推理性能瓶颈分析',
          '量化：动态量化 vs 静态量化',
          '剪枝与知识蒸馏概述',
          'ONNX 导出与验证',
          '实战：ResNet 推理加速 3×',
        ],
      },
      {
        title: 'API 服务封装',
        duration: '3.5 小时',
        lessons: [
          'FastAPI 异步推理接口',
          '批处理与请求队列',
          'GPU 资源管理',
          '接口文档与版本管理',
          '实战：图像分类服务 API',
        ],
      },
      {
        title: '生产级推理部署',
        duration: '4 小时',
        lessons: [
          'Triton Inference Server 配置',
          '多模型并发调度',
          'Docker 容器化打包',
          'Kubernetes 基础部署',
          '实战：多模型推理服务集群',
        ],
      },
      {
        title: 'MLOps 与持续迭代',
        duration: '3.5 小时',
        lessons: [
          '模型版本管理：MLflow',
          '推理监控：Prometheus + Grafana',
          '数据漂移检测',
          'A/B 测试与灰度发布',
          '综合实战：完整 MLOps 流水线',
        ],
      },
    ],
    faq: [
      { q: '需要有服务器运维经验吗？', a: '不需要，但需要了解 Linux 基础命令和 Docker 概念，课程提供详细的环境搭建文档。' },
      { q: '课程是否涉及云平台部署？', a: '主要以本地和 Docker 环境为主，附录提供阿里云 / AWS 上的部署参考流程。' },
      { q: '与 L3 认证的关系？', a: '本课程是 L3 架构师认证的核心备考课，考纲中 MLOps 与部署方向的内容主要来自本课程。' },
    ],
  },
];
