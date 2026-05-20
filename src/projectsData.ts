export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  delay?: number;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Unsupervised Industrial Defect Detection on MVTec AD Benchmark',
    subtitle: 'Comparative Analysis of Reconstruction-Based and Memory-Bank Approaches with Anomaly Localization',
    description: 'A complete end-to-end ML pipeline implementing and comparing PatchCore (memory-bank) and Convolutional Autoencoder (reconstruction-based) for unsupervised industrial anomaly detection on the MVTec AD benchmark — covering feature extraction, anomaly scoring, pixel-level localization, evaluation, and error analysis.',
    image: 'project 1.png',
    tags: ['Python', 'PyTorch', 'PatchCore', 'Autoencoder', 'Computer Vision'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
  },
  {
    id: '2',
    title: 'Optimizing Indonesian Sentence Embeddings for Semantic Textual Similarity',
    subtitle: 'A Contrastive Fine-Tuning Study with Hard Negative Mining',
    description: 'A systematic empirical study on improving Indonesian sentence embeddings using contrastive learning and hard negative mining for Semantic Textual Similarity (STS) tasks. The project explores sentence-level representation learning for Bahasa Indonesia using transformer-based architectures, aiming to improve semantic search, duplicate detection, question answering, and recommendation systems while preserving linguistic and cultural nuance.',
    image: 'project 2.png',
    tags: ['NLP', 'Sentence Transformers', 'IndoBERT', 'Contrastive Learning', 'Semantic Similarity'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
    delay: 100,
  },
  {
    id: '3',
    title: 'Modeling Emoji as Pragmatic Signals in Social Media Text Using a Hybrid Transformer–Graph Neural Network Architecture',
    subtitle: 'EPGT: Emoji-aware Graph Neural Network + Transformer for Hate Speech Detection',
    description: 'EPGT (Emoji Pragmatic Graph Transformer) investigates the role of emoji as pragmatic signals in social media hate speech detection. Instead of treating emoji as flat appended tokens, the framework constructs an emoji interaction graph capturing co-occurrence patterns, positional relationships, and semantic similarity between emoji, then fuses these structural signals with contextual transformer representations through cross-attention mechanisms. The model aims to improve detection of sarcasm-mediated hate speech, irony, and implicit hostility frequently missed by conventional text-only classifiers.',
    image: 'project 3.png',
    tags: ['NLP', 'Graph Neural Network', 'Transformers', 'Hate Speech Detection', 'Emoji Semantics'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
    delay: 200,
  },
  {
    id: '4',
    title: 'Multi-Level Sarcasm Intensity Classification in Indonesian Social Media Using Hybrid Weak Supervision and Transformer-Based Models',
    subtitle: 'HSIL Framework for Indonesian Sarcasm Intensity Modeling',
    description: 'An end-to-end multi-level sarcasm intensity classification framework for Indonesian social media using HSIL (Hybrid Sarcasm Intensity Labeling) combined with Transformer-based architectures including IndoBERT, XLM-R, and BiLSTM. The project reformulates sarcasm detection beyond binary classification into four intensity levels, enabling more nuanced modeling of implicit sentiment and pragmatic expression. Using a 16,790-instance Twitter and Reddit dataset, the framework transforms binary-labeled sarcasm corpora into multi-level annotations without requiring exhaustive manual labeling or external LLM APIs.',
    image: 'project 4.png',
    tags: ['NLP', 'IndoBERT', 'XLM-R', 'Weak Supervision', 'Sarcasm Detection'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
    delay: 300,
  },
  {
    id: '5',
    title: 'Evaluasi Robustness Model Sentimen Bahasa Indonesia terhadap Noise Sintetis Menggunakan Arsitektur Hybrid Word-Character Lightweight',
    subtitle: 'Hybrid Word-Character Architecture for Noise-Robust Sentiment Classification',
    description: 'This research develops and evaluates a robust Indonesian sentiment classification system against typographical noise using a lightweight Hybrid Word-Character architecture. The model was tested across four synthetic noise levels commonly found in Indonesian Twitter text (0%, 10%, 20%, and 30%) and compared against a BiLSTM word-only baseline. Experimental results show that the hybrid architecture reduced the accuracy drop rate by 58.82% at 30% noise level (from 3.06% to 1.26%) while achieving a higher robustness score of 0.9874 compared to 0.9694 for the baseline model.',
    image: 'project 5.png',
    tags: ['NLP', 'BiLSTM', 'Character-Level Modeling', 'Robust NLP', 'Sentiment Analysis'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
    delay: 400,
  },
  {
    id: '6',
    title: 'Klasifikasi Penyakit Daun Tanaman Menggunakan Convolutional Neural Network dengan Preprocessing Citra Digital',
    subtitle: 'Comparative Study of MobileNetV2 and EfficientNet-B0 on PlantVillage Dataset',
    description: 'An end-to-end plant leaf disease classification pipeline using Convolutional Neural Networks with Transfer Learning and digital image preprocessing based on CLAHE in LAB color space. The study empirically compares MobileNetV2 and EfficientNet-B0 architectures on 10 selected classes from the PlantVillage dataset containing 13,826 leaf images across three plant species. Experimental results show that MobileNetV2 achieved the highest test accuracy of 94.09% with an inference time of 50.11 ms/image, outperforming EfficientNet-B0 which achieved 92.89% accuracy with 97.09 ms/image.',
    image: 'project 6.png',
    tags: ['Computer Vision', 'CNN', 'MobileNetV2', 'EfficientNet-B0', 'PlantVillage'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
    delay: 500,
  },
  {
    id: '7',
    title: 'Multi-Class News Article Classification System Using an RNN-Based Bidirectional LSTM Model',
    subtitle: 'BiLSTM-Based Sequential Modeling for Automated News Categorization',
    description: 'This project presents a multi-class news article classification system using a Bidirectional Long Short-Term Memory (BiLSTM) neural network architecture. The model automatically categorizes news articles into predefined classes by learning contextual and sequential semantic dependencies from textual data. The system leverages sequential representation learning to improve contextual understanding and is evaluated using a dedicated test set to ensure objective performance assessment and generalization capability.',
    image: 'project 7.png',
    tags: ['NLP', 'BiLSTM', 'RNN', 'Text Classification', 'News Categorization'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
    delay: 600,
  },
  {
    id: '8',
    title: 'Sistem Rekomendasi Buku Berbasis Collaborative Filtering dengan Pendekatan Deep Learning',
    subtitle: 'Neural Collaborative Filtering for Personalized Book Recommendations',
    description: 'A book recommendation system built using Neural Collaborative Filtering (NCF) that combines matrix factorization with deep neural networks to capture complex user-item interactions. The system learns latent representations of users and books from historical rating data, enabling personalized recommendations. Implemented with PyTorch and evaluated on the Book-Crossing dataset, achieving significant improvements in recommendation accuracy compared to traditional collaborative filtering methods.',
    image: 'project 8.png',
    tags: ['Recommender Systems', 'Deep Learning', 'Collaborative Filtering', 'PyTorch', 'NCF'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
    delay: 100,
  },
  {
    id: '9',
    title: 'Prediksi Harga Saham Menggunakan LSTM dan Analisis Sentimen Berita Finansial',
    subtitle: 'Multimodal Stock Price Prediction with LSTM and News Sentiment Analysis',
    description: 'A multimodal stock price prediction system that combines LSTM neural networks for time series forecasting with sentiment analysis of financial news articles. The model integrates historical stock prices, technical indicators, and sentiment scores extracted from news headlines using BERT-based models. Evaluated on Indonesian stock market data (IDX), the hybrid approach demonstrates improved prediction accuracy compared to using price data alone, particularly during periods of high market volatility.',
    image: 'project 9.png',
    tags: ['Time Series', 'LSTM', 'Sentiment Analysis', 'Financial ML', 'Multimodal AI'],
    githubUrl: 'https://github.com/f4tahitsYours',
    liveDemoUrl: '',
    delay: 200,
  },
];
